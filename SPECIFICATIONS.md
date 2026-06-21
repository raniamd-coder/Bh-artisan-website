# Spécifications techniques et fonctionnelles — Back-office BH Artisan

**Projet :** Site vitrine & back-office pour Bandar Hamoud, artisan plâtrier-peintre  
**Date :** Juin 2026  
**Version :** 1.0  

---

## 1. Présentation générale

Le back-office de BH Artisan permet à l'artisan de gérer en autonomie les demandes de rendez-vous et les messages reçus via le site vitrine. Il est accessible à l'adresse `/admin` et protégé par un mot de passe.

---

## 2. Accès et authentification

### 2.1 Spécifications fonctionnelles

- L'accès au back-office est réservé à l'administrateur (l'artisan)
- Un mot de passe unique protège l'ensemble des pages `/admin`
- La session est maintenue pendant 7 jours sans reconnexion
- Un bouton "Déconnexion" est disponible sur toutes les pages admin

### 2.2 Spécifications techniques

| Élément | Détail |
|---|---|
| Authentification | JWT (JSON Web Token) signé avec `jose` |
| Stockage token | Cookie `admin_token` — httpOnly, SameSite=Lax |
| Durée de session | 7 jours (`maxAge: 604800`) |
| Protection des routes | Middleware Next.js (`src/middleware.ts`) |
| Mot de passe | Stocké en clair dans `.env.local` (`ADMIN_PASSWORD`) |
| Route login | `POST /api/admin/login` |
| Route logout | `POST /api/admin/logout` |

### 2.3 Flux d'authentification

```
Utilisateur accède à /admin
    → Middleware vérifie cookie admin_token
    → Cookie absent ou invalide → redirect vers /admin/login
    → Cookie valide → accès accordé

Page /admin/login
    → Saisie mot de passe → POST /api/admin/login
    → Mot de passe correct → JWT signé → cookie posé → redirect /admin
    → Mot de passe incorrect → message d'erreur affiché
```

---

## 3. Tableau de bord (Dashboard)

### 3.1 Spécifications fonctionnelles

Le dashboard affiche en temps réel :
- **5 indicateurs** : Total RDV, En attente, Confirmés, Annulés, Messages
- **Onglet Réservations** : liste de tous les RDVs avec actions
- **Onglet Messages** : liste de tous les messages de contact

### 3.2 Gestion des réservations

Chaque réservation affiche : nom, email, téléphone, date souhaitée, type de travaux, message, statut, actions.

**Statuts possibles :**

| Statut | Signification | Affiché |
|---|---|---|
| `en_attente` | RDV soumis, non traité | ⏳ Badge orange |
| `confirmé` | RDV accepté par l'artisan | ✓ Badge vert |
| `annulé` | RDV refusé ou annulé | ✗ Badge rouge |

**Actions disponibles :**

| Action | Déclencheurs | Effets |
|---|---|---|
| Confirmer | Depuis `en_attente` ou `annulé` | Statut → `confirmé` + événement Google Calendar + email client |
| Annuler | Depuis `en_attente` ou `confirmé` | Statut → `annulé` + email client |
| Supprimer 🗑 | Toujours disponible | Suppression définitive en base |

### 3.3 Gestion des messages

Chaque message affiche : nom, email, contenu, date de réception.

**Actions disponibles :**
- Suppression définitive via bouton 🗑 (confirmation requise)

---

## 4. Intégrations externes

### 4.1 Google Calendar

| Élément | Détail |
|---|---|
| Type d'accès | Service Account (accès serveur-à-serveur, sans OAuth utilisateur) |
| Bibliothèque | `googleapis` (npm) |
| Calendrier cible | Calendrier personnel de l'artisan, partagé avec le service account |
| Déclencheur | Confirmation d'un RDV par l'admin |
| Événement créé | Événement "toute la journée" avec nom + type de travaux + coordonnées |
| Credentials | Fichier JSON service account (`google-service-account.json`, hors Git) |

### 4.2 Emails transactionnels (Resend)

| Événement | Destinataire | Objet |
|---|---|---|
| Nouvelle réservation | Admin (`NOTIFICATION_EMAIL`) | `Nouvelle réservation — [Nom]` |
| Nouveau message contact | Admin (`NOTIFICATION_EMAIL`) | `Nouveau message — [Nom]` |
| RDV confirmé | Client (email fourni) | `✅ Votre rendez-vous est confirmé — BH Artisan` |
| RDV annulé | Client (email fourni) | `❌ Votre rendez-vous a été annulé — BH Artisan` |

---

## 5. API Routes

| Méthode | Route | Accès | Description |
|---|---|---|---|
| POST | `/api/admin/login` | Public | Authentification admin |
| POST | `/api/admin/logout` | Admin | Suppression du cookie |
| POST | `/api/bookings` | Public | Créer une réservation |
| GET | `/api/bookings` | Admin | Lister toutes les réservations |
| PATCH | `/api/bookings/[id]` | Admin | Confirmer ou annuler |
| DELETE | `/api/bookings/[id]` | Admin | Supprimer une réservation |
| POST | `/api/contact` | Public | Soumettre un message |
| GET | `/api/contact` | Admin | Lister tous les messages |
| DELETE | `/api/messages/[id]` | Admin | Supprimer un message |

---

## 6. Modèle de données

### Table `Booking`

| Champ | Type | Contrainte | Description |
|---|---|---|---|
| `id` | String | PK, cuid() | Identifiant unique |
| `name` | String | NOT NULL | Nom du client |
| `email` | String | NOT NULL | Email du client |
| `phone` | String | NOT NULL | Téléphone |
| `date` | String | NOT NULL | Date souhaitée (YYYY-MM-DD) |
| `workType` | String | NOT NULL | Type de travaux |
| `message` | String | NULLABLE | Message optionnel |
| `status` | String | DEFAULT `en_attente` | Statut du RDV |
| `createdAt` | DateTime | DEFAULT now() | Date de création |

### Table `Message`

| Champ | Type | Contrainte | Description |
|---|---|---|---|
| `id` | String | PK, cuid() | Identifiant unique |
| `name` | String | NOT NULL | Nom de l'expéditeur |
| `email` | String | NOT NULL | Email |
| `message` | String | NOT NULL | Contenu du message |
| `createdAt` | DateTime | DEFAULT now() | Date de réception |

---

## 7. Variables d'environnement

| Variable | Rôle | Obligatoire |
|---|---|---|
| `DATABASE_URL` | Connexion Neon PostgreSQL | ✅ |
| `RESEND_API_KEY` | Clé API Resend | ✅ |
| `NOTIFICATION_EMAIL` | Email de l'artisan (notifications) | ✅ |
| `ADMIN_PASSWORD` | Mot de passe du back-office | ✅ |
| `GOOGLE_CALENDAR_ID` | ID du calendrier Google | ✅ |
| `google-service-account.json` | Credentials service account (fichier) | ✅ |

---

## 8. Sécurité

- Cookie JWT `httpOnly` : inaccessible depuis JavaScript côté client
- `SameSite=Lax` : protection CSRF
- `secure=true` en production : transmission HTTPS uniquement
- Fichier credentials Google hors Git (`.gitignore`)
- Variables sensibles dans `.env.local` (hors Git)
- Middleware de protection sur toutes les routes `/admin/*`
