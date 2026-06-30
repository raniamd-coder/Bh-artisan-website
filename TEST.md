# Documentation des Tests — BH Artisan Website

## Vue d'ensemble

Le projet dispose de deux niveaux de tests :

| Type | Outil | Portée | Commande |
|------|-------|--------|----------|
| Tests unitaires / API | Jest + Testing Library | Logique serveur, routes API | `npm test` |
| Tests End-to-End (E2E) | Playwright | Parcours utilisateur complets | `npm run test:e2e` |

---

## Tests unitaires — Jest

### Installation & Configuration

- **Fichier de config :** `jest.config.ts`
- **Environnement par défaut :** `jsdom` (pour les composants React)
- **Environnement API :** `node` (via `@jest-environment node` par fichier)
- **Alias :** `@/*` → `src/*`

### Lancer les tests

```bash
# Lancer tous les tests une fois
npm test

# Mode watch (relance à chaque modification)
npm run test:watch

# Avec rapport de couverture
npm run test:coverage
```

### Fichiers de tests

#### `__tests__/api/bookings.test.ts`

Teste la route `POST /api/bookings` et `GET /api/bookings`.

| Test | Scénario | Résultat attendu |
|------|----------|-----------------|
| POST — champs manquants | Envoi sans email, phone, date, workType | `400` + message d'erreur |
| POST — données valides | Envoi complet avec tous les champs | `200` + `{ success: true, id }` |
| POST — erreur Prisma | La BDD lève une exception | `500` |
| GET — liste réservations | Récupération de toutes les réservations | `200` + tableau |

**Mocks :** Prisma (`@/lib/prisma`) et Resend sont mockés — aucune connexion réelle à la BDD ni envoi d'email.

---

#### `__tests__/api/contact.test.ts`

Teste la route `POST /api/contact` et `GET /api/contact`.

| Test | Scénario | Résultat attendu |
|------|----------|-----------------|
| POST — champs manquants | Envoi sans message | `400` + message d'erreur |
| POST — données valides | name + email + message complets | `200` + `{ success: true, id }` |
| POST — erreur Prisma | La BDD lève une exception | `500` |
| GET — liste messages | Récupération de tous les messages | `200` + tableau |

**Mocks :** Prisma et Resend mockés.

---

#### `__tests__/api/admin-login.test.ts`

Teste la route `POST /api/admin/login`.

| Test | Scénario | Résultat attendu |
|------|----------|-----------------|
| Mauvais mot de passe | `password: "mauvais_mdp"` | `401` + `{ error: "Mot de passe incorrect" }` |
| Bon mot de passe | `password: "testpassword123"` | `200` + cookie `admin_token` HttpOnly |

**Mocks :** `jose` est mocké (SignJWT retourne un faux token).  
**Variable d'env :** `ADMIN_PASSWORD=testpassword123` fixé en dur pour les tests.

---

### Résultats attendus

```
Test Suites: 3 passed, 3 total
Tests:       10 passed, 10 total
```

---

## Tests End-to-End — Playwright

### Configuration

- **Fichier de config :** `playwright.config.ts`
- **URL cible :** `https://bh-artisan-website.vercel.app` (ou `BASE_URL` si défini)
- **Navigateur :** Chromium (headless)
- **Rapport :** HTML (`playwright-report/`)

### Lancer les tests

```bash
# Lancer tous les tests E2E
npm run test:e2e

# Mode interface graphique (recommandé pour débugger)
npm run test:e2e:ui

# Sur un environnement local (dev)
BASE_URL=http://localhost:3000 npm run test:e2e
```

### Fichiers de tests

#### `e2e/home.spec.ts` — Page d'accueil

| Test | Action | Résultat attendu |
|------|--------|-----------------|
| Chargement | `GET /` | Titre contient "Bandar Hamoud", nom visible |
| Navigation | Cliquer "Services" | Section `#services` visible |
| Navigation | Cliquer "Contact" | Section `#contact` visible |
| Menu | Affichage initial | `<nav>` visible |

---

#### `e2e/booking.spec.ts` — Formulaire de réservation

| Test | Action | Résultat attendu |
|------|--------|-----------------|
| Affichage | `GET /#booking` | Champs name, email, phone visibles |
| Validation | Soumettre vide | Message de validation HTML5 affiché |
| Soumission | Remplir tous les champs + submit | Message de succès visible ("succès", "confirmé", "merci"…) |

---

#### `e2e/contact.spec.ts` — Formulaire de contact

| Test | Action | Résultat attendu |
|------|--------|-----------------|
| Affichage | `GET /#contact` | Section contact + textarea visibles |
| Soumission | name + email + message + submit | Message de succès visible ("envoyé", "merci"…) |

---

#### `e2e/admin.spec.ts` — Protection admin

| Test | Action | Résultat attendu |
|------|--------|-----------------|
| Redirection | `GET /admin` sans cookie | Redirigé vers `/admin/login` |
| Page login | `GET /admin/login` | Champ password + bouton submit visibles |
| Mauvais mdp | Saisir un mauvais mot de passe | Message d'erreur visible |

---

## Architecture des mocks (Jest)

```
__tests__/
└── api/
    ├── bookings.test.ts      → mock: prisma.booking, resend
    ├── contact.test.ts       → mock: prisma.message, resend
    └── admin-login.test.ts   → mock: jose (SignJWT)
```

Les mocks isolent chaque test de :
- La base de données Neon (PostgreSQL)
- L'API Resend (emails)
- La librairie JWT (jose)

Aucun test ne requiert de connexion réseau ni de variables d'environnement réelles.

---

## Bonnes pratiques

- **Toujours mocker** les dépendances externes (BDD, email, auth) dans les tests unitaires
- **Utiliser `BASE_URL=http://localhost:3000`** pour les tests E2E en local avant de pousser
- **Ne jamais utiliser** le vrai `ADMIN_PASSWORD` de production dans les tests
- Les tests E2E peuvent échouer si Vercel est en train de redéployer — attendre la fin du déploiement

---

*Tests rédigés par ℛℳ — Juin 2026*
