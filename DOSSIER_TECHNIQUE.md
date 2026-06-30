# Dossier Technique — BH Artisan

---

> **Étudiante :** Rania M'Hamdi
> **Formation :** Développement Web & Web Mobile
> **Projet :** Site vitrine & back-office pour un artisan plâtrier-peintre
> **Client :** Bandar Hamoud — Plâtrerie & Peinture
> **Date de réalisation :** Juin 2026

---

## Liens du projet

| Ressource | URL |
|-----------|-----|
| Site en production | https://bh-artisan-website.vercel.app |
| Interface admin | https://bh-artisan-website.vercel.app/admin |
| Code source (GitHub) | https://github.com/raniamd-coder/Bh-artisan-website |

---

## Table des matières

1. [Présentation du projet](#1-présentation-du-projet)
2. [Cahier des charges et livrables](#2-cahier-des-charges-et-livrables)
3. [Architecture générale](#3-architecture-générale)
4. [Technologies utilisées](#4-technologies-utilisées)
5. [Structure du projet](#5-structure-du-projet)
6. [Base de données](#6-base-de-données)
7. [API et routes serveur](#7-api-et-routes-serveur)
8. [Authentification et sécurité](#8-authentification-et-sécurité)
9. [Intégrations externes](#9-intégrations-externes)
10. [Tests](#10-tests)
11. [Déploiement et hébergement](#11-déploiement-et-hébergement)
12. [Variables d'environnement](#12-variables-denvironnement)
13. [Bilan et retour d'expérience](#13-bilan-et-retour-dexpérience)

---

## 1. Présentation du projet

### Contexte client

Bandar Hamoud est un artisan plâtrier-peintre indépendant basé à Saint-Priest (Rhône),
intervenant sur Lyon et sa métropole. Son activité reposait uniquement sur le bouche-à-oreille,
sans aucune présence numérique.

L'objectif de ce projet était de lui créer une identité en ligne professionnelle,
accompagnée d'un système autonome de gestion des demandes clients — sans abonnement
à un outil tiers (Calendly, Doctolib, etc.).

### Périmètre fonctionnel

**Site vitrine (public)**

- Présentation de l'artisan et de ses services (plâtrerie, peinture, rénovation)
- Galerie photo des réalisations
- Formulaire de prise de rendez-vous en ligne
- Formulaire de contact
- Zone d'intervention géographique

**Back-office (privé, réservé à l'artisan)**

- Tableau de bord avec indicateurs (RDV en attente, confirmés, annulés, messages)
- Gestion des réservations : confirmer, annuler, supprimer
- Gestion des messages de contact : consulter, supprimer
- Synchronisation automatique avec Google Calendar à la confirmation
- Notifications email automatiques (artisan et client)

---

## 2. Cahier des charges et livrables

### Livrables réalisés

| Livrable | Description | Accès |
|----------|-------------|-------|
| Site en production | Application Next.js déployée sur Vercel | https://bh-artisan-website.vercel.app |
| Code source | Dépôt Git complet, commits historisés | https://github.com/raniamd-coder/Bh-artisan-website |
| Spécifications | Spécifications fonctionnelles et techniques du back-office | `SPECIFICATIONS.md` |
| Plan de recettage | Scénarios de tests manuels avec résultats | `RECETTAGE.md` |
| Tests automatisés | Tests unitaires Jest + tests E2E Playwright | `TEST.md` |
| Dossier technique | Ce document | `DOSSIER_TECHNIQUE.md` |

### Fonctionnalités livrées

| Fonctionnalité | Statut |
|----------------|--------|
| Site vitrine responsive (mobile / tablette / desktop) | OK |
| Galerie photos scrollable | OK |
| Formulaire de réservation + sauvegarde BDD | OK |
| Formulaire de contact + sauvegarde BDD | OK |
| Emails automatiques à l'artisan (nouvelle résa, nouveau message) | OK |
| Emails automatiques au client (confirmation / annulation) | OK |
| Interface admin protégée par authentification JWT | OK |
| Dashboard avec statistiques en temps réel | OK |
| Actions sur les réservations (confirmer / annuler / supprimer) | OK |
| Actions sur les messages (supprimer) | OK |
| Synchronisation Google Calendar à la confirmation | OK |
| Déploiement Vercel avec CI/CD automatique | OK |
| Tests unitaires Jest — 10 tests, 3 suites | OK |
| Tests End-to-End Playwright — 4 fichiers | OK |

---

## 3. Architecture générale

L'application suit une architecture **full-stack monolithique** basée sur Next.js App Router.
Le frontend et le backend cohabitent dans le même dépôt, déployés ensemble sur Vercel.

```
Navigateur client
       |
       | HTTP/HTTPS
       v
Next.js App (Vercel)
  +-----------+     +---------------------------+
  | Frontend  |     | API Routes (backend)      |
  | React     |     | /api/bookings             |
  | site      |     | /api/contact              |
  | vitrine   |     | /api/admin/login          |
  | dashboard |     | /api/bookings/[id]        |
  +-----------+     +---------------------------+
                              |
           +------------------+------------------+
           |                  |                  |
    Neon PostgreSQL      Resend (email)    Google Calendar API
    (cloud EU)
```

**Choix de cette architecture :**

- Un seul dépôt, un seul déploiement : simplicité de maintenance
- Next.js App Router co-localise l'UI et les endpoints
- La base de données est découplée (Neon cloud) : si l'app est redéployée, les données sont préservées

---

## 4. Technologies utilisées

### Frontend

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 16.2.7 | Framework React, App Router, SSR |
| React | 19 | Bibliothèque UI |
| TypeScript | 5 | Typage statique |
| Tailwind CSS | v4 | Framework CSS utilitaire |

Note : Tailwind v4 a une syntaxe différente de v3. `bg-gradient-to-t` devient `bg-linear-to-t`.
Les inline styles sont interdits (règle ESLint stricte).

### Backend

| Technologie | Version | Rôle |
|---|---|---|
| Next.js API Routes | — | Endpoints REST serveur |
| Prisma | 7.8.0 | ORM base de données |
| @prisma/adapter-pg | — | Adaptateur PostgreSQL pour Prisma 7 |
| jose | — | Création et vérification des JWT |

Note : Prisma 7 breaking change — le champ `url` dans `datasource db` n'est plus dans
`schema.prisma` mais dans `prisma.config.ts`.

### Services externes

| Service | Rôle |
|---|---|
| Neon | PostgreSQL serverless cloud (EU Frankfurt) |
| Resend | Emails transactionnels (gratuit jusqu'à 100/jour) |
| Google Calendar API | Création d'événements à la confirmation RDV |

### Tests

| Outil | Rôle |
|---|---|
| Jest + ts-jest | Tests unitaires (API routes) |
| @testing-library/react | Tests de composants React |
| Playwright | Tests End-to-End (parcours utilisateur complets) |

### Déploiement

| Outil | Rôle |
|---|---|
| Vercel | Hébergement + CI/CD automatique via GitHub |
| GitHub | Versioning, déclencheur de déploiement |

---

## 5. Structure du projet

```
d:\Nouveau dossier\
|
+-- src/
|   +-- app/
|   |   +-- layout.tsx                # Layout racine
|   |   +-- page.tsx                  # Page principale (site vitrine)
|   |   +-- globals.css               # Styles globaux + animations
|   |   +-- admin/
|   |   |   +-- page.tsx              # Dashboard (Server Component)
|   |   |   +-- AdminDashboard.tsx    # UI du dashboard (Client Component)
|   |   |   +-- BookingActions.tsx    # Boutons Confirmer/Annuler/Supprimer
|   |   |   +-- login/page.tsx        # Page de connexion admin
|   |   +-- api/
|   |       +-- bookings/route.ts         # GET + POST
|   |       +-- bookings/[id]/route.ts    # PATCH + DELETE
|   |       +-- contact/route.ts          # POST + GET
|   |       +-- messages/[id]/route.ts    # DELETE
|   |       +-- admin/login/route.ts      # POST /login
|   |       +-- admin/logout/route.ts     # POST /logout
|   |
|   +-- components/
|   |   +-- Navbar.tsx, Hero.tsx, About.tsx, Services.tsx
|   |   +-- Gallery.tsx, Booking.tsx, Contact.tsx
|   |   +-- ServiceArea.tsx, Footer.tsx
|   |
|   +-- lib/
|   |   +-- prisma.ts                 # Client Prisma singleton
|   |   +-- calendar.ts               # Intégration Google Calendar
|   |
|   +-- middleware.ts                 # Protection routes /admin (JWT)
|
+-- prisma/
|   +-- schema.prisma                 # Schéma de la base de données
+-- prisma.config.ts                  # Config Prisma 7 (DATABASE_URL)
|
+-- __tests__/api/
|   +-- bookings.test.ts
|   +-- contact.test.ts
|   +-- admin-login.test.ts
|
+-- e2e/
|   +-- home.spec.ts
|   +-- booking.spec.ts
|   +-- contact.spec.ts
|   +-- admin.spec.ts
|
+-- public/gallery/                   # 13 photos de réalisations
+-- jest.config.ts
+-- playwright.config.ts
+-- .env.local                        # Variables d'environnement (non versionné)
+-- google-service-account.json       # Credentials Google (non versionné)
+-- SPECIFICATIONS.md
+-- RECETTAGE.md
+-- TEST.md
+-- DOSSIER_TECHNIQUE.md
```

---

## 6. Base de données

### Hébergement

Base de données PostgreSQL hébergée sur Neon (cloud serverless). Région : EU Frankfurt.
Connexion via SSL (`sslmode=require`).

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

Le champ `status` peut prendre trois valeurs : `en_attente`, `confirme`, `annule`.

### Commandes

```bash
# Appliquer le schéma sur la base
npx prisma db push

# Régénérer le client TypeScript
npx prisma generate

# Explorer les données en local
npx prisma studio
```

---

## 7. API et routes serveur

### Réservations

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | /api/bookings | Créer une réservation + email artisan |
| GET | /api/bookings | Lister toutes les réservations |
| PATCH | /api/bookings/[id] | Confirmer ou annuler + email client + Google Calendar |
| DELETE | /api/bookings/[id] | Supprimer définitivement |

### Messages de contact

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | /api/contact | Enregistrer un message + email artisan |
| GET | /api/contact | Lister tous les messages |
| DELETE | /api/messages/[id] | Supprimer définitivement |

### Authentification

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | /api/admin/login | Vérifier le mot de passe, poser le cookie JWT |
| POST | /api/admin/logout | Invalider le cookie |

---

## 8. Authentification et sécurité

### Flux d'authentification

```
Accès à /admin/*
  -> Middleware (src/middleware.ts)
  -> Vérifie le cookie admin_token (jwtVerify)
  -> Valide  -> accès accordé
  -> Invalide / absent -> redirect /admin/login

Page /admin/login
  -> POST /api/admin/login avec { password }
  -> Mot de passe correct -> JWT signé HS256 -> cookie admin_token (httpOnly)
  -> Mot de passe incorrect -> 401 + message d'erreur
```

### Mesures de sécurité

| Mesure | Justification |
|--------|--------------|
| Cookie httpOnly | Inaccessible depuis JavaScript (protection XSS) |
| Cookie SameSite=Lax | Protection CSRF |
| Cookie secure=true en production | HTTPS uniquement |
| JWT signé HS256 | Infalsifiable sans la clé secrète |
| Variables d'environnement hors Git | Aucun secret exposé dans le code source |
| Fichier service account hors Git | Clé privée Google non versionnée |

---

## 9. Intégrations externes

### Resend (emails transactionnels)

Resend est utilisé pour l'ensemble des notifications email via la bibliothèque npm officielle.
Les emails sont envoyés depuis `onboarding@resend.dev`.

Emails envoyés :

- Artisan <- nouvelle réservation
- Artisan <- nouveau message de contact
- Client <- confirmation de son rendez-vous
- Client <- annulation de son rendez-vous

### Google Calendar API

L'intégration utilise un compte de service (service account) Google,
permettant un accès serveur-à-serveur sans OAuth côté utilisateur.

Flux :
1. L'admin confirme un RDV dans le dashboard
2. PATCH /api/bookings/[id] appelle src/lib/calendar.ts
3. Un événement "toute la journée" est créé dans le calendrier de l'artisan

Configuration côté Google Cloud :
1. Projet `bandarhamoud` créé sur Google Cloud Console
2. API Google Calendar activée
3. Service account `bh-calendar@bandarhamoud.iam.gserviceaccount.com` créé
4. Clé JSON privée stockée localement (hors Git)
5. Calendrier Google partagé avec le service account (rôle : modifier les événements)

Sur Vercel : le fichier JSON est transmis via la variable `GOOGLE_SERVICE_ACCOUNT_JSON`
(contenu JSON stringifié).

---

## 10. Tests

La stratégie de test couvre deux niveaux complémentaires.
Documentation complète : `TEST.md`

### Tests unitaires — Jest

Configuration : `jest.config.ts`

```bash
npm test                   # Lancer tous les tests
npm run test:watch         # Mode watch
npm run test:coverage      # Avec couverture de code
```

Résultats :

```
Test Suites: 3 passed, 3 total
Tests:       10 passed, 10 total
```

| Fichier | Cas testés |
|---------|-----------|
| __tests__/api/bookings.test.ts | POST 400 (champs manquants), POST 200 (création), POST 500 (DB error), GET liste |
| __tests__/api/contact.test.ts | POST 400, POST 200, POST 500, GET liste |
| __tests__/api/admin-login.test.ts | POST 401 (mauvais mdp), POST 200 + cookie JWT |

Les dépendances externes (Prisma, Resend, jose) sont intégralement mockées.
Aucune connexion réseau requise pour les tests unitaires.

### Tests End-to-End — Playwright

Configuration : `playwright.config.ts`
URL cible : https://bh-artisan-website.vercel.app

```bash
npm run test:e2e           # Tous les tests (Chromium)
npm run test:e2e:ui        # Interface graphique Playwright
BASE_URL=http://localhost:3000 npm run test:e2e   # En local
```

| Fichier | Scénarios |
|---------|-----------|
| e2e/home.spec.ts | Chargement page, titre, menu, navigation par ancres |
| e2e/booking.spec.ts | Affichage formulaire, validation HTML5, soumission réussie |
| e2e/contact.spec.ts | Affichage formulaire, soumission réussie |
| e2e/admin.spec.ts | Redirection non authentifié, affichage login, erreur mauvais mdp |

---

## 11. Déploiement et hébergement

### Vercel (production)

Le projet est connecté au dépôt GitHub.
Chaque `git push` sur la branche `main` déclenche automatiquement un build et déploiement (CI/CD).

Variables d'environnement configurées sur Vercel :

| Variable | Usage |
|----------|-------|
| DATABASE_URL | Connexion Neon PostgreSQL |
| RESEND_API_KEY | Clé API Resend |
| NOTIFICATION_EMAIL | Email de notification artisan |
| ADMIN_PASSWORD | Mot de passe admin |
| GOOGLE_CALENDAR_ID | ID du calendrier Google |
| GOOGLE_SERVICE_ACCOUNT_JSON | Contenu JSON du service account Google |

Points de vigilance résolus lors du déploiement :

| Problème | Solution |
|----------|----------|
| `prisma generate` non exécuté à la build | Ajout dans package.json : `"build": "prisma generate && next build"` et `"postinstall": "prisma generate"` |
| Page /admin requête DB au build | Ajout de `export const dynamic = "force-dynamic"` |
| Clé privée Google mal parsée | Lecture du JSON complet via GOOGLE_SERVICE_ACCOUNT_JSON |

### Docker (alternative)

L'application est dockerisable pour un hébergement self-hosted.

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

---

## 12. Variables d'environnement

Fichier `.env.local` à la racine (non versionné) :

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

---

## 13. Bilan et retour d'expérience

### Ce qui a bien fonctionné

- **Next.js App Router** : la cohabitation frontend/backend dans un seul projet est un gain
  de productivité réel. Plus besoin de gérer deux serveurs distincts.

- **Prisma + Neon** : l'ORM simplifie les requêtes et la gestion du schéma.
  Neon offre un PostgreSQL cloud gratuit et fiable sans configuration serveur.

- **Vercel** : le déploiement continu via GitHub est transparent.
  Chaque push déclenche automatiquement un build, ce qui facilite les corrections rapides.

- **Resend** : API email très simple à intégrer, bien documentée,
  le tier gratuit couvre largement les besoins d'un artisan indépendant.

### Difficultés rencontrées et solutions

| Difficulté | Cause | Solution apportée |
|-----------|-------|-------------------|
| Build Vercel échoue | `prisma generate` non exécuté | Script `postinstall` + ajout dans `build` |
| Page admin plante au build | Requête DB pendant SSR statique | `export const dynamic = "force-dynamic"` |
| Clé privée Google illisible | `\n` mal interprétés en variable d'env | Lecture du JSON complet via GOOGLE_SERVICE_ACCOUNT_JSON |
| Tests Jest échouent sur jose | Librairie ESM non supportée par Jest | Mock complet de jose dans les tests admin |
| Tailwind v4 vs v3 | Classes renommées | Consultation documentation v4, adaptation |
| Prisma 7 breaking change | `url` retiré de schema.prisma | Migration vers prisma.config.ts |

### Compétences mobilisées

- Développement full-stack avec Next.js (App Router, Server Components, API Routes)
- Conception et gestion d'une base de données relationnelle (PostgreSQL + Prisma)
- Authentification JWT stateless (jose, cookies httpOnly)
- Intégration d'APIs tierces (Resend, Google Calendar)
- Déploiement et CI/CD (Vercel, GitHub)
- Tests automatisés unitaires et E2E (Jest, Playwright)
- Sécurité OWASP : XSS, CSRF, injection SQL (via ORM), secrets hors versioning

### Perspectives d'évolution

- Rappel email automatique 24h avant le rendez-vous
- Tableau de bord avec graphiques (évolution des réservations)
- Gestion multi-artisans avec rôles
- Internationalisation (français / arabe)

---

*Dossier rédigé par Rania M'Hamdi — Juin 2026*
