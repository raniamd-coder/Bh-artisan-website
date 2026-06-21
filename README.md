# BH Artisan — Site vitrine & back-office

Site web professionnel pour **Bandar Hamoud**, artisan plâtrier-peintre. Projet réalisé dans le cadre de mes études, de A à Z — du design jusqu'au déploiement.

---

## Présentation

L'idée de départ était simple : créer un site vitrine qui soit vraiment utilisable par un vrai artisan. Pas juste un template avec des données fictives, mais quelque chose de fonctionnel avec un vrai système de réservation, des emails automatiques, et une gestion des rendez-vous via Google Calendar.

Le projet m'a pris du temps notamment sur la partie Prisma 7 (breaking changes assez casse-pieds) et l'intégration Google Calendar avec un service account.

---

## Fonctionnalités

**Côté client (site vitrine)**
- Page d'accueil avec hero animé (blobs CSS)
- Présentation des services avec photos réelles
- Galerie photo en carousel horizontal
- Formulaire de réservation de rendez-vous
- Formulaire de contact
- Zone d'intervention avec carte intégrée

**Côté admin (back-office)**
- Login sécurisé par mot de passe (JWT en cookie httpOnly)
- Dashboard avec stats (RDVs en attente / confirmés / annulés / messages)
- Confirmation ou annulation d'un RDV
- Email automatique envoyé au client à chaque changement de statut
- Création automatique d'un événement dans Google Calendar à la confirmation
- Suppression des RDVs et messages

---

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Prisma 7** + **Neon** (PostgreSQL cloud)
- **Resend** (emails transactionnels)
- **jose** (JWT)
- **Google Calendar API** (service account)

---

## Installation

```bash
npm install
```

Créer un fichier `.env.local` :

```env
DATABASE_URL=...
RESEND_API_KEY=...
NOTIFICATION_EMAIL=...
ADMIN_PASSWORD=...
GOOGLE_CALENDAR_ID=...
```

Placer le fichier JSON du service account Google à la racine sous le nom `google-service-account.json`.

Puis :

```bash
npx prisma db push
npx prisma generate
npm run dev
```

---

## Structure

```
src/
  app/
    page.tsx             # Page principale (site vitrine)
    admin/               # Dashboard admin
    api/
      bookings/          # CRUD réservations
      contact/           # Messages de contact
      admin/             # Login / Logout
  components/            # Tous les composants (Navbar, Hero, etc.)
  lib/
    prisma.ts            # Client Prisma singleton
    calendar.ts          # Intégration Google Calendar
```

---

## Modèles de données

```prisma
model Booking {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String
  date      String
  workType  String
  message   String?
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

---

## Notes

- Le champ `url` dans `datasource db` n'existe plus dans Prisma 7, il faut passer par `prisma.config.ts`
- Tailwind v4 utilise `bg-linear-to-*` au lieu de `bg-gradient-to-*`
- Le fichier `google-service-account.json` est dans `.gitignore`, ne pas le committer


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
