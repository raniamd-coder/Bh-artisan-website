# Plan de recettage — BH Artisan

**Projet :** Site vitrine & back-office BH Artisan  
**Date :** Juin 2026  
**Testeur :** Bandar Hamoud  
**Environnement :** `http://localhost:3000`

---

## Légende

| Statut | Signification |
|---|---|
| ✅ OK | Test réussi |
| ❌ KO | Test échoué |
| ⚠️ Partiel | Fonctionne avec réserve |

---

## 1. Site vitrine — Navigation & affichage

| # | Test | Résultat attendu | Statut |
|---|---|---|---|
| 1.1 | Ouvrir `http://localhost:3000` | Page d'accueil affichée, blobs animés visibles | ✅ OK |
| 1.2 | Vérifier la Navbar sur desktop | Logo ℬℋ + liens + téléphone visibles | ✅ OK |
| 1.3 | Scroller vers le bas | Navbar passe de transparente à blanche | ✅ OK |
| 1.4 | Ouvrir sur mobile (< 768px) | Menu hamburger visible, liens cachés | ✅ OK |
| 1.5 | Cliquer le hamburger | Menu déroulant s'ouvre avec les liens | ✅ OK |
| 1.6 | Cliquer un lien de navigation | Scroll fluide vers la section correspondante | ✅ OK |
| 1.7 | Vérifier la section Services | 3 services avec photos et layout alterné | ✅ OK |
| 1.8 | Vérifier la galerie | Carousel horizontal scrollable, 13 photos | ✅ OK |
| 1.9 | Cliquer les flèches de la galerie | Défilement gauche/droite fonctionnel | ✅ OK |
| 1.10 | Vérifier le Footer | Logo, liens, téléphone affichés | ✅ OK |

---

## 2. Formulaire de réservation

| # | Test | Résultat attendu | Statut |
|---|---|---|---|
| 2.1 | Soumettre le formulaire vide | Message d'erreur sur les champs requis | ✅ OK |
| 2.2 | Remplir tous les champs et soumettre | Écran de succès "Demande envoyée !" | ✅ OK |
| 2.3 | Vérifier la réception d'email admin | Email de notification reçu sur `NOTIFICATION_EMAIL` | ✅ OK |
| 2.4 | Vérifier en base de données | Entrée créée avec statut `en_attente` | ✅ OK |
| 2.5 | Tester sans message (champ optionnel) | Soumission réussie sans erreur | ✅ OK |
| 2.6 | Tester avec un email invalide | Validation HTML bloque la soumission | ✅ OK |

---

## 3. Formulaire de contact

| # | Test | Résultat attendu | Statut |
|---|---|---|---|
| 3.1 | Soumettre le formulaire vide | Champs requis bloquent la soumission | ✅ OK |
| 3.2 | Remplir et soumettre | Écran de succès affiché | ✅ OK |
| 3.3 | Vérifier la réception d'email admin | Email de notification reçu | ✅ OK |
| 3.4 | Vérifier en base de données | Message enregistré dans la table `Message` | ✅ OK |

---

## 4. Authentification admin

| # | Test | Résultat attendu | Statut |
|---|---|---|---|
| 4.1 | Accéder à `/admin` sans être connecté | Redirection vers `/admin/login` | ✅ OK |
| 4.2 | Saisir un mot de passe incorrect | Message "Mot de passe incorrect" affiché | ✅ OK |
| 4.3 | Saisir le bon mot de passe | Redirection vers `/admin` | ✅ OK |
| 4.4 | Vérifier la persistance de session | Actualiser `/admin` → toujours connecté | ✅ OK |
| 4.5 | Cliquer "Déconnexion" | Redirection vers `/admin/login` | ✅ OK |
| 4.6 | Accéder à `/admin` après déconnexion | Redirection vers `/admin/login` | ✅ OK |

---

## 5. Back-office — Gestion des réservations

| # | Test | Résultat attendu | Statut |
|---|---|---|---|
| 5.1 | Ouvrir `/admin` | Dashboard affiché avec stats et onglets | ✅ OK |
| 5.2 | Vérifier les stats | Compteurs corrects par rapport à la base | ✅ OK |
| 5.3 | Cliquer onglet "Réservations" | Liste des RDVs affichée avec badges de statut | ✅ OK |
| 5.4 | Cliquer "Confirmer" sur un RDV | Statut passe à `confirmé` (badge vert) | ✅ OK |
| 5.5 | Vérifier email envoyé au client | Email "✅ Votre rendez-vous est confirmé" reçu | ✅ OK |
| 5.6 | Vérifier Google Calendar | Événement créé sur la date du RDV | ✅ OK |
| 5.7 | Cliquer "Annuler" sur un RDV confirmé | Statut passe à `annulé` (badge rouge) | ✅ OK |
| 5.8 | Vérifier email envoyé au client | Email "❌ Votre rendez-vous a été annulé" reçu | ✅ OK |
| 5.9 | Re-confirmer un RDV annulé | Statut repasse à `confirmé` | ✅ OK |
| 5.10 | Cliquer 🗑 sur un RDV | Confirmation demandée → suppression → RDV disparu | ✅ OK |
| 5.11 | Vérifier les stats après suppression | Compteur décrémenté | ✅ OK |

---

## 6. Back-office — Gestion des messages

| # | Test | Résultat attendu | Statut |
|---|---|---|---|
| 6.1 | Cliquer onglet "Messages" | Liste des messages affichée | ✅ OK |
| 6.2 | Vérifier le contenu des messages | Nom, email, message, date affichés correctement | ✅ OK |
| 6.3 | Cliquer 🗑 sur un message | Confirmation → suppression → message disparu | ✅ OK |

---

## 7. Responsive & compatibilité mobile

| # | Test | Résultat attendu | Statut |
|---|---|---|---|
| 7.1 | Site vitrine sur iPhone (375px) | Toutes les sections lisibles, pas de débordement | ✅ OK |
| 7.2 | Formulaire de réservation sur mobile | Champs empilés, bouton accessible | ✅ OK |
| 7.3 | Galerie sur mobile | Scroll horizontal fonctionnel au doigt | ✅ OK |
| 7.4 | Page admin sur mobile | Dashboard lisible, tableau scrollable horizontalement | ✅ OK |
| 7.5 | Navigation mobile | Menu hamburger fonctionnel | ✅ OK |

---

## 8. Corrections réalisées

| # | Anomalie | Correction apportée |
|---|---|---|
| C.1 | Client Prisma non regénéré après ajout du champ `status` | `npx prisma generate` exécuté, cache `.next` vidé |
| C.2 | Clé privée Google mal parsée via `GOOGLE_PRIVATE_KEY` | Remplacement par lecture directe du fichier JSON |
| C.3 | Boutons Confirmer/Annuler sans effet | Cause : cache Turbopack avec ancien client Prisma — résolu en vidant `.next` |
| C.4 | Champ `url` dans `schema.prisma` (Prisma 7) | Déplacé dans `prisma.config.ts` |

---

## Bilan

**Total tests :** 37  
**Tests réussis :** 37  
**Tests échoués :** 0  
**Taux de réussite :** 100%
