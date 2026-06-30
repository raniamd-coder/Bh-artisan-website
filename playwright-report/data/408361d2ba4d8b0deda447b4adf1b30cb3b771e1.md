# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Page d'accueil >> charge correctement et affiche le nom de l'artisan
- Location: e2e\home.spec.ts:7:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Bandar Hamoud')
Expected: visible
Error: strict mode violation: locator('text=Bandar Hamoud') resolved to 3 elements:
    1) <h2 class="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 mb-5">Bandar Hamoud</h2> aka getByRole('heading', { name: 'Bandar Hamoud' })
    2) <p class="text-gray-600 leading-relaxed mb-4">…</p> aka getByText('Artisan plâtrier-peintre avec')
    3) <p>…</p> aka getByText('© 2026 Bandar Hamoud — Plâ')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Bandar Hamoud')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - navigation [ref=e3]:
      - link "ℬℋ Artisan" [ref=e4] [cursor=pointer]:
        - /url: "#hero"
        - generic [ref=e6]: ℬℋ
        - generic [ref=e7]: Artisan
      - list [ref=e8]:
        - listitem [ref=e9]:
          - link "Accueil" [ref=e10] [cursor=pointer]:
            - /url: "#hero"
        - listitem [ref=e11]:
          - link "À propos" [ref=e12] [cursor=pointer]:
            - /url: "#about"
        - listitem [ref=e13]:
          - link "Services" [ref=e14] [cursor=pointer]:
            - /url: "#services"
        - listitem [ref=e15]:
          - link "Réalisations" [ref=e16] [cursor=pointer]:
            - /url: "#gallery"
        - listitem [ref=e17]:
          - link "Rendez-vous" [ref=e18] [cursor=pointer]:
            - /url: "#booking"
        - listitem [ref=e19]:
          - link "Contact" [ref=e20] [cursor=pointer]:
            - /url: "#contact"
      - link "07 58 10 59 44" [ref=e21] [cursor=pointer]:
        - /url: tel:+33758105944
        - img [ref=e23]
        - generic [ref=e25]: 07 58 10 59 44
  - main [ref=e26]:
    - generic [ref=e28]:
      - generic [ref=e31]: Artisan qualifié · Partout en France
      - heading "Plâtrerie & Peinture" [level=1] [ref=e33]:
        - text: Plâtrerie
        - generic [ref=e34]: "& Peinture"
      - paragraph [ref=e35]: Finitions soignées, délais respectés — votre intérieur mérite le meilleur.
      - generic [ref=e36]:
        - link "Prendre rendez-vous" [ref=e37] [cursor=pointer]:
          - /url: "#booking"
        - link "Voir nos réalisations" [ref=e38] [cursor=pointer]:
          - /url: "#gallery"
      - generic [ref=e39]:
        - generic [ref=e40]: Scroll
        - img [ref=e41]
    - generic [ref=e44]:
      - generic [ref=e47]: BH
      - generic [ref=e48]:
        - text: À propos
        - heading "Bandar Hamoud" [level=2] [ref=e49]
        - paragraph [ref=e50]:
          - text: Artisan plâtrier-peintre avec plus de
          - strong [ref=e51]: 10 ans d'expérience
          - text: ", Bandar Hamoud réalise des travaux de plâtrerie, peinture et rénovation pour les particuliers et les professionnels, partout en France."
        - paragraph [ref=e52]: Passionné par la qualité des finitions et le respect des délais, Bandar met son savoir-faire au service de vos projets avec sérieux et professionnalisme.
    - generic [ref=e54]:
      - generic [ref=e55]:
        - text: Ce que nous faisons
        - heading "Nos Services" [level=2] [ref=e56]
      - generic [ref=e57]:
        - generic [ref=e59]:
          - img "Chantier plâtrerie" [ref=e61]
          - generic [ref=e62]:
            - paragraph [ref=e63]: "01"
            - heading "Plâtrerie" [level=3] [ref=e64]
            - paragraph [ref=e65]: Pose de plaques de plâtre, cloisons, doublages, enduits de finition. Travaux soignés pour des murs et plafonds parfaitement lisses.
            - link "Demander un devis →" [ref=e66] [cursor=pointer]:
              - /url: "#booking"
              - text: Demander un devis
              - generic [ref=e67]: →
        - generic [ref=e69]:
          - img "Travaux de peinture" [ref=e71]
          - generic [ref=e72]:
            - paragraph [ref=e73]: "02"
            - heading "Peinture" [level=3] [ref=e74]
            - paragraph [ref=e75]: Peinture intérieure et extérieure, lasure, vernis. Préparation des surfaces, choix des couleurs, application professionnelle.
            - link "Demander un devis →" [ref=e76] [cursor=pointer]:
              - /url: "#booking"
              - text: Demander un devis
              - generic [ref=e77]: →
        - generic [ref=e79]:
          - img "Rénovation plafond LED" [ref=e81]
          - generic [ref=e82]:
            - paragraph [ref=e83]: "03"
            - heading "Rénovation" [level=3] [ref=e84]
            - paragraph [ref=e85]: "Rénovation complète de pièces ou d'appartements : démolition, remise à neuf, coordination des travaux du début à la fin."
            - link "Demander un devis →" [ref=e86] [cursor=pointer]:
              - /url: "#booking"
              - text: Demander un devis
              - generic [ref=e87]: →
    - generic [ref=e88]:
      - generic [ref=e90]:
        - text: Portfolio
        - heading "Nos Réalisations" [level=2] [ref=e91]
        - paragraph [ref=e92]: Faites glisser pour découvrir nos chantiers.
      - generic [ref=e93]:
        - button "Précédent" [ref=e94]:
          - img [ref=e95]
        - button "Suivant" [ref=e97]:
          - img [ref=e98]
        - generic [ref=e100]:
          - generic [ref=e101] [cursor=pointer]:
            - img "Finitions intérieures" [ref=e102]
            - generic [ref=e104]: Finitions intérieures
          - generic [ref=e105] [cursor=pointer]:
            - img "Plafond design LED" [ref=e106]
            - generic [ref=e108]: Plafond design LED
          - generic [ref=e109] [cursor=pointer]:
            - img "Grand chantier" [ref=e110]
            - generic [ref=e112]: Grand chantier
          - generic [ref=e113] [cursor=pointer]:
            - img "Pose de cloisons" [ref=e114]
            - generic [ref=e116]: Pose de cloisons
          - generic [ref=e117] [cursor=pointer]:
            - img "Travaux intérieurs" [ref=e118]
            - generic [ref=e120]: Travaux intérieurs
          - generic [ref=e121] [cursor=pointer]:
            - img "Rénovation" [ref=e122]
            - generic [ref=e124]: Rénovation
          - generic [ref=e125] [cursor=pointer]:
            - img "Plâtrerie" [ref=e126]
            - generic [ref=e128]: Plâtrerie
          - generic [ref=e129] [cursor=pointer]:
            - img "Chantier" [ref=e130]
            - generic [ref=e132]: Chantier
          - generic [ref=e133] [cursor=pointer]:
            - img "Pose de plaques" [ref=e134]
            - generic [ref=e136]: Pose de plaques
          - generic [ref=e137] [cursor=pointer]:
            - img "Finitions" [ref=e138]
            - generic [ref=e140]: Finitions
          - generic [ref=e141] [cursor=pointer]:
            - img "Réalisation" [ref=e142]
            - generic [ref=e144]: Réalisation
          - generic [ref=e145] [cursor=pointer]:
            - img "Travaux" [ref=e146]
            - generic [ref=e148]: Travaux
          - generic [ref=e149] [cursor=pointer]:
            - img "Plafond" [ref=e150]
            - generic [ref=e152]: Plafond
    - generic [ref=e154]:
      - generic [ref=e155]:
        - text: Contactez-nous
        - heading "Prendre rendez-vous" [level=2] [ref=e156]
        - paragraph [ref=e157]: Réponse garantie sous 24h.
      - generic [ref=e158]:
        - generic [ref=e160]:
          - heading "PSS Bâtiment" [level=3] [ref=e161]
          - paragraph [ref=e162]: Artisan qualifié disponible partout en France. Devis gratuit, réponse rapide.
          - generic [ref=e163]:
            - generic [ref=e164]:
              - img [ref=e166]
              - generic [ref=e168]: 07 58 10 59 44
            - generic [ref=e169]:
              - img [ref=e171]
              - generic [ref=e173]: contact@bh-platrier.fr
            - generic [ref=e174]:
              - img [ref=e176]
              - generic [ref=e179]: Partout en France
        - generic [ref=e180]:
          - generic [ref=e181]:
            - generic [ref=e182]:
              - generic [ref=e183]: Nom complet *
              - textbox "Jean Dupont" [ref=e184]
            - generic [ref=e185]:
              - generic [ref=e186]: Email *
              - textbox "jean@email.com" [ref=e187]
            - generic [ref=e188]:
              - generic [ref=e189]: Téléphone *
              - textbox "06 12 34 56 78" [ref=e190]
            - generic [ref=e191]:
              - generic [ref=e192]: Date souhaitée *
              - textbox "Date souhaitée" [ref=e193]
          - generic [ref=e194]:
            - generic [ref=e195]: Type de travaux *
            - combobox "Type de travaux" [ref=e196]:
              - option "Sélectionner…" [disabled] [selected]
              - option "Plâtrerie"
              - option "Peinture intérieure"
              - option "Peinture extérieure"
              - option "Rénovation complète"
              - option "Autre"
          - generic [ref=e197]:
            - generic [ref=e198]: Message
            - textbox "Décrivez votre projet…" [ref=e199]
          - button "Envoyer la demande" [ref=e200]
    - generic [ref=e202]:
      - generic [ref=e203]:
        - text: Déplacement
        - heading "Zone d'intervention" [level=2] [ref=e204]
        - paragraph [ref=e205]:
          - text: Bandar intervient
          - strong [ref=e206]: partout en France
          - text: ", chez les particuliers comme les professionnels. Déplacement sur devis."
      - generic [ref=e207]:
        - generic [ref=e208]: Paris
        - generic [ref=e209]: Lyon
        - generic [ref=e210]: Marseille
        - generic [ref=e211]: Toulouse
        - generic [ref=e212]: Bordeaux
        - generic [ref=e213]: Nantes
        - generic [ref=e214]: Strasbourg
        - generic [ref=e215]: Saint-Priest
        - generic [ref=e216]: Villeurbanne
        - generic [ref=e217]: Et partout en France
      - iframe [ref=e219]:
        
    - generic [ref=e221]:
      - generic [ref=e222]:
        - text: On est à l’écoute
        - heading "Contactez-nous" [level=2] [ref=e223]
        - paragraph [ref=e224]: Une question ? Envoyez-nous un message.
      - generic [ref=e225]:
        - generic [ref=e227]:
          - paragraph [ref=e228]: Informations
          - generic [ref=e229]:
            - link "Téléphone 07 58 10 59 44" [ref=e230] [cursor=pointer]:
              - /url: tel:+33758105944
              - img [ref=e232]
              - generic [ref=e234]:
                - paragraph [ref=e235]: Téléphone
                - paragraph [ref=e236]: 07 58 10 59 44
            - link "Email contact@bh-platrier.fr" [ref=e237] [cursor=pointer]:
              - /url: mailto:contact@bh-platrier.fr
              - img [ref=e239]
              - generic [ref=e241]:
                - paragraph [ref=e242]: Email
                - paragraph [ref=e243]: contact@bh-platrier.fr
            - generic [ref=e244]:
              - img [ref=e246]
              - generic [ref=e249]:
                - paragraph [ref=e250]: Zone
                - paragraph [ref=e251]: Partout en France
        - generic [ref=e252]:
          - generic [ref=e253]:
            - generic [ref=e254]: Nom *
            - textbox "Votre nom" [ref=e255]
          - generic [ref=e256]:
            - generic [ref=e257]: Email *
            - textbox "votre@email.fr" [ref=e258]
          - generic [ref=e259]:
            - generic [ref=e260]: Message *
            - textbox "Votre message…" [ref=e261]
          - button "Envoyer le message" [ref=e262]
  - contentinfo [ref=e263]:
    - generic [ref=e264]:
      - generic [ref=e265]:
        - paragraph [ref=e266]: ℬℋ
        - paragraph [ref=e267]: Artisan
        - paragraph [ref=e268]:
          - text: Artisan plâtrier-peintre à Saint-Priest.
          - text: Finitions soignées, délais respectés.
        - link "07 58 10 59 44" [ref=e269] [cursor=pointer]:
          - /url: tel:+33758105944
      - generic [ref=e270]:
        - paragraph [ref=e271]: Navigation
        - list [ref=e272]:
          - listitem [ref=e273]:
            - link "À propos" [ref=e274] [cursor=pointer]:
              - /url: "#about"
          - listitem [ref=e275]:
            - link "Services" [ref=e276] [cursor=pointer]:
              - /url: "#services"
          - listitem [ref=e277]:
            - link "Réalisations" [ref=e278] [cursor=pointer]:
              - /url: "#gallery"
          - listitem [ref=e279]:
            - link "Rendez-vous" [ref=e280] [cursor=pointer]:
              - /url: "#booking"
          - listitem [ref=e281]:
            - link "Contact" [ref=e282] [cursor=pointer]:
              - /url: "#contact"
    - generic [ref=e284]:
      - paragraph [ref=e285]: © 2026 Bandar Hamoud — Plâtrerie & Peinture
      - paragraph [ref=e286]: Saint-Priest · Lyon · Rhône
      - paragraph [ref=e287]: Design & développement ℛℳ
  - alert [ref=e288]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | /**
  4  |  * Tests E2E — Page d'accueil
  5  |  */
  6  | test.describe("Page d'accueil", () => {
  7  |   test("charge correctement et affiche le nom de l'artisan", async ({ page }) => {
  8  |     await page.goto("/");
  9  |     await expect(page).toHaveTitle(/Bandar Hamoud/i);
> 10 |     await expect(page.locator("text=Bandar Hamoud")).toBeVisible();
     |                                                      ^ Error: expect(locator).toBeVisible() failed
  11 |   });
  12 | 
  13 |   test("le menu de navigation est visible", async ({ page }) => {
  14 |     await page.goto("/");
  15 |     await expect(page.locator("nav")).toBeVisible();
  16 |   });
  17 | 
  18 |   test("la section Services est accessible depuis le menu", async ({ page }) => {
  19 |     await page.goto("/");
  20 |     await page.click("text=Services");
  21 |     await expect(page.locator("#services")).toBeVisible();
  22 |   });
  23 | 
  24 |   test("la section Contact est accessible depuis le menu", async ({ page }) => {
  25 |     await page.goto("/");
  26 |     await page.click("text=Contact");
  27 |     await expect(page.locator("#contact")).toBeVisible();
  28 |   });
  29 | });
  30 | 
```