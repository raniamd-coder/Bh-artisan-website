# Dossier Technique — BH Artisan

**Projet :** Site vitrine & back-office pour un artisan plâtrier-peintre  
**Client :** Bandar Hamoud  
**Date de réalisation :** Juin 2026  
**Auteur :** Bandar Hamoud  

---

## Table des matières

1. [Contexte et objectifs](#1-contexte-et-objectifs)
2. [Architecture générale](#2-architecture-générale)
3. [Technologies utilisées](#3-technologies-utilisées)
4. [Structure du projet](#4-structure-du-projet)
5. [Base de données](#5-base-de-données)
6. [API et routes serveur](#6-api-et-routes-serveur)
7. [Authentification et sécurité](#7-authentification-et-sécurité)
8. [Intégrations externes](#8-intégrations-externes)
9. [Déploiement et hébergement](#9-déploiement-et-hébergement)
10. [Variables d'environnement](#10-variables-denvironnement)

---

## 1. Contexte et objectifs

### Contexte

Bandar Hamoud est un artisan plâtrier-peintre indépendant qui intervenait uniquement par bouche-à-oreille. L'objectif de ce projet était de lui créer une présence en ligne professionnelle avec un système de prise de rendez-vous en ligne, sans passer par un prestataire tiers (type Calendly ou Doctolib).

### Objectifs fonctionnels

- Présenter les services de l'artisan (plâtrerie, peinture, rénovation)
- Permettre aux clients de prendre rendez-vous en ligne
- Permettre aux clients de laisser un message de contact
- Donner à l'artisan un espace d'administration pour gérer les demandes
- Envoyer des notifications email automatiques (client et artisan)
- Synchroniser les rendez-vous confirmés avec Google Calendar

### Objectifs techniques

- Application web full-stack moderne
- Interface responsive (mobile, tablette, desktop)
- Base de données cloud persistante
- Système d'authentification sécurisé
- Déployable sur Vercel ou Docker

---

## 2. Architecture générale

L'application suit une architecture **full-stack monolithique** basée sur Next.js avec le pattern App Router. Le frontend et le backend cohabitent dans le même projet.

```
┌─────────────────────────────────────────────────────┐
│                  Navigateur client                  │
│         (site vitrine + formulaires)                │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP / HTTPS
┌──────────────────────▼──────────────────────────────┐
│              Next.js App (Vercel / Docker)          │
│                                                     │
│  ┌─────────────┐    ┌──────────────────────────┐   │
│  │   Frontend  │    │     API Routes (backend) │   │
│  │  (React)    │    │  /api/bookings           │   │
│  │             │    │  /api/contact            │   │
│  │  site vitrine    │  /api/admin/login        │   │
│  │  + dashboard│    │  /api/bookings/[id]      │   │
│  └─────────────┘    └──────────┬───────────────┘   │
└─────────────────────────────────┼───────────────────┘
                                  │
          ┌───────────────────────┼───────────────────┐
          │                       │                   │
┌─────────▼──────┐  ┌────────────▼──────┐  ┌────────▼────────┐
│  Neon (cloud)  │  │  Resend (emails)  │  │ Google Calendar │
│  PostgreSQL    │  │                   │  │ API             │
└────────────────┘  └───────────────────┘  └─────────────────┘
```

---

## 3. Technologies utilisées

### Frontend

| Technologie | Version | Rôle |
|---|---|---|
| **Next.js** | 16.2.7 | Framework React, App Router, SSR |
| **React** | 19 | Bibliothèque UI |
| **TypeScript** | 5 | Typage statique |
| **Tailwind CSS** | v4 | Framework CSS utilitaire |

> ⚠️ **Tailwind v4** : syntaxe différente de v3. `bg-gradient-to-t` devient `bg-linear-to-t`, les classes `bg-white/[0.02]` s'écrivent `bg-white/2`.

### Backend

| Technologie | Version | Rôle |
|---|---|---|
| **Next.js API Routes** | — | Endpoints REST serveur |
| **Prisma** | 7.8.0 | ORM base de données |
| **@prisma/adapter-pg** | — | Adaptateur PostgreSQL pour Prisma 7 |
| **jose** | — | Création et vérification des JWT |

> ⚠️ **Prisma 7** : breaking change — le champ `url` dans `datasource db` n'existe plus dans `schema.prisma`. Il doit être déclaré dans `prisma.config.ts`.

### Base de données

| Technologie | Rôle |
|---|---|
| **Neon** | PostgreSQL serverless cloud (EU Frankfurt) |

### Services externes

| Service | Rôle |
|---|---|
| **Resend** | Envoi d'emails transactionnels (gratuit jusqu'à 100 emails/jour) |
| **Google Calendar API** | Création d'événements lors de la confirmation d'un RDV |

---

## 4. Structure du projet

```
d:\Nouveau dossier\
│
├── src/
│   ├── app/                          # App Router Next.js
│   │   ├── layout.tsx                # Layout racine (font Inter)
│   │   ├── page.tsx                  # Page principale (site vitrine)
│   │   ├── globals.css               # Styles globaux + animations
│   │   │
│   │   ├── admin/                    # Back-office
│   │   │   ├── page.tsx              # Dashboard (Server Component)
│   │   │   ├── AdminDashboard.tsx    # UI du dashboard (Client Component)
│   │   │   ├── BookingActions.tsx    # Boutons Confirmer/Annuler/Supprimer
│   │   │   └── login/
│   │   │       └── page.tsx          # Page de connexion admin
│   │   │
│   │   └── api/                      # Routes API
│   │       ├── bookings/
│   │       │   ├── route.ts          # GET + POST /api/bookings
│   │       │   └── [id]/
│   │       │       └── route.ts      # PATCH + DELETE /api/bookings/[id]
│   │       ├── contact/
│   │       │   └── route.ts          # POST /api/contact
│   │       ├── messages/
│   │       │   └── [id]/
│   │       │       └── route.ts      # DELETE /api/messages/[id]
│   │       └── admin/
│   │           ├── login/
│   │           │   └── route.ts      # POST /api/admin/login
│   │           └── logout/
│   │               └── route.ts      # POST /api/admin/logout
│   │
│   ├── components/                   # Composants React
│   │   ├── Navbar.tsx                # Navigation fixe avec hamburger mobile
│   │   ├── Hero.tsx                  # Section hero avec blobs animés
│   │   ├── About.tsx                 # Présentation artisan
│   │   ├── Services.tsx              # 3 services en layout alterné
│   │   ├── Gallery.tsx               # Galerie carousel horizontal
│   │   ├── Booking.tsx               # Formulaire de réservation
│   │   ├── Contact.tsx               # Formulaire de contact
│   │   ├── ServiceArea.tsx           # Zone d'intervention + carte
│   │   ├── Footer.tsx                # Pied de page
│   │   └── FadeIn.tsx                # Animation scroll-reveal
│   │
│   ├── lib/
│   │   ├── prisma.ts                 # Client Prisma singleton
│   │   └── calendar.ts               # Intégration Google Calendar
│   │
│   ├── middleware.ts                 # Protection routes /admin (JWT)
│   └── generated/
│       └── prisma/                   # Client Prisma généré (npx prisma generate)
│
├── prisma/
│   └── schema.prisma                 # Schéma de la base de données
│
├── prisma.config.ts                  # Config Prisma 7 (DATABASE_URL)
├── public/
│   └── gallery/                      # 13 photos WhatsApp de réalisations
│
├── google-service-account.json       # Credentials Google (hors Git)
├── .env.local                        # Variables d'environnement (hors Git)
├── .gitignore
├── next.config.ts
├── tsconfig.json
├── package.json
├── README.md
├── SPECIFICATIONS.md                 # Spécifications back-office
└── RECETTAGE.md                      # Plan de tests
```

---

## 5. Base de données

### Hébergement

Base de données **PostgreSQL** hébergée sur **Neon** (cloud serverless). Région : EU Frankfurt. Connexion via SSL (`sslmode=require`).

Avantage : entièrement découplée du code. Si l'application est redéployée ou dockerisée, les données sont conservées.

### Schéma

```prisma
model Booking {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String
  date      String           // format YYYY-MM-DD
  workType  String
  message   String?          // optionnel
  status    String   @default("en_attente")
  createdAt DateTime @default(now())
}

model Message {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}
```

### Gestion du schéma

```bash
# Appliquer les changements de schéma sur la base
npx prisma db push

# Regénérer le client TypeScript Prisma
npx prisma generate
```

> ⚠️ Les deux commandes sont indépendantes. `db push` met à jour la base, `generate` met à jour le code. Il faut toujours exécuter les deux après modification du schéma.

---

## 6. API et routes serveur

### Réservations

**`POST /api/bookings`** — Créer une réservation  
- Valide les champs obligatoires (name, email, phone, date, workType)  
- Sauvegarde en base (status: `en_attente`)  
- Envoie un email de notification à l'artisan via Resend  

**`GET /api/bookings`** — Lister toutes les réservations  
- Retourne la liste triée par date de création décroissante  

**`PATCH /api/bookings/[id]`** — Confirmer ou annuler  
- Body: `{ action: "confirmer" | "annuler" }`  
- Met à jour le statut en base  
- Si `confirmer` → crée un événement Google Calendar  
- Envoie un email au client (confirmation ou annulation)  

**`DELETE /api/bookings/[id]`** — Supprimer une réservation  
- Suppression définitive en base  

### Messages de contact

**`POST /api/contact`** — Soumettre un message  
- Sauvegarde en base  
- Envoie un email de notification à l'artisan  

**`DELETE /api/messages/[id]`** — Supprimer un message  

### Authentification

**`POST /api/admin/login`** — Connexion admin  
- Compare le mot de passe à `process.env.ADMIN_PASSWORD`  
- Si correct : signe un JWT avec `jose` → posé en cookie `admin_token` (httpOnly)  
- Durée : 7 jours  

**`POST /api/admin/logout`** — Déconnexion  
- Écrase le cookie avec une date d'expiration passée  

---

## 7. Authentification et sécurité

### Middleware de protection

Le fichier `src/middleware.ts` intercepte toutes les requêtes vers `/admin/*`. Il vérifie la présence et la validité du cookie `admin_token` via `jwtVerify` (bibliothèque `jose`). Si le token est absent ou expiré, l'utilisateur est redirigé vers `/admin/login`. La route `/admin/login` elle-même est exclue du middleware.

```
Requête vers /admin/xxx
    → Middleware vérifie admin_token
    → Valide → Accès accordé
    → Invalide / Absent → Redirect /admin/login
```

### Choix techniques sécurité

| Choix | Justification |
|---|---|
| Cookie `httpOnly` | Inaccessible depuis JavaScript (XSS) |
| Cookie `SameSite=Lax` | Protection contre les attaques CSRF |
| Cookie `secure=true` en prod | Transmission HTTPS uniquement |
| JWT signé (HS256) | Token infalsifiable sans la clé secrète |
| Clé = `ADMIN_PASSWORD` | Réutilisation de la variable existante |
| Credentials Google hors Git | Évite la fuite de clé privée |
| `.env.local` hors Git | Variables sensibles non versionnées |

---

## 8. Intégrations externes

### 8.1 Resend (emails)

Resend est utilisé pour les emails transactionnels. La bibliothèque officielle `resend` est installée via npm. Les emails sont envoyés depuis `onboarding@resend.dev` (domaine de test gratuit).

**Emails envoyés :**
- À l'artisan : nouvelle réservation, nouveau message de contact
- Au client : confirmation ou annulation de son rendez-vous

### 8.2 Google Calendar API

L'intégration utilise un **service account** Google (accès serveur-à-serveur, sans authentification OAuth utilisateur). Lorsqu'un admin confirme un RDV, un événement "toute la journée" est automatiquement créé dans le calendrier de l'artisan.

**Configuration :**
1. Création d'un projet sur Google Cloud Console
2. Activation de l'API Google Calendar
3. Création d'un service account `bh-calendar@bandarhamoud.iam.gserviceaccount.com`
4. Téléchargement de la clé JSON privée
5. Partage du calendrier Google avec l'email du service account (rôle : modifier les événements)

Le fichier JSON est lu directement depuis le disque (`google-service-account.json`) pour éviter les problèmes d'échappement des caractères `\n` dans les variables d'environnement.

---

## 9. Déploiement et hébergement

### Option 1 — Vercel (recommandé)

Vercel est la plateforme officielle de Next.js. Le déploiement se fait en connectant le dépôt Git.

**Variables à configurer dans Vercel :**
```
DATABASE_URL
RESEND_API_KEY
NOTIFICATION_EMAIL
ADMIN_PASSWORD
GOOGLE_CALENDAR_ID
GOOGLE_SERVICE_ACCOUNT_JSON   ← contenu JSON du fichier service account
```

Pour Vercel, le fichier `google-service-account.json` ne peut pas être uploadé. Il faut adapter `src/lib/calendar.ts` pour lire depuis une variable d'environnement `GOOGLE_SERVICE_ACCOUNT_JSON` (JSON stringifié).

### Option 2 — Docker

L'application Next.js peut être containerisée. La base de données reste sur Neon (cloud), seul le serveur applicatif est dockerisé.

**`Dockerfile` :**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**`docker-compose.yml` :**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: ${DATABASE_URL}
      RESEND_API_KEY: ${RESEND_API_KEY}
      NOTIFICATION_EMAIL: ${NOTIFICATION_EMAIL}
      ADMIN_PASSWORD: ${ADMIN_PASSWORD}
      GOOGLE_CALENDAR_ID: ${GOOGLE_CALENDAR_ID}
    volumes:
      - ./google-service-account.json:/app/google-service-account.json:ro
```

---

## 10. Variables d'environnement

Fichier `.env.local` à créer à la racine (non versionné) :

```env
# Base de données Neon
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

# Emails Resend
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
NOTIFICATION_EMAIL="email-artisan@exemple.fr"

# Authentification admin
ADMIN_PASSWORD="MotDePasseSecret"

# Google Calendar
GOOGLE_CALENDAR_ID="email-artisan@gmail.com"
```

Fichier `google-service-account.json` à placer à la racine (non versionné) :
```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "xxx@yyy.iam.gserviceaccount.com",
  ...
}
```

---

## Commandes utiles

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Appliquer le schéma sur la base
npx prisma db push

# Regénérer le client Prisma
npx prisma generate

# Build de production
npm run build

# Lancer en production
npm start

# Vider le cache Next.js (si problème de hot reload)
Remove-Item -Recurse -Force .next
```
