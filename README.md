# MY SHOP — Site Vitrine Officiel

Site vitrine statique officiel du logiciel de gestion commerciale **MY SHOP**, conçu en **HTML5, CSS3 et JavaScript** sans aucun backend, entièrement responsive (ordinateur, tablette, smartphone) et directement compatible avec **GitHub Pages**.

---

## 1. Structure du projet

```text
.
├── index.html                              # Page principale du site vitrine (HTML5 + SEO)
├── style.css                               # Feuille de style principale (CSS3 responsive)
├── config.js                               # Configuration centralisée (e-mail, version, captures)
├── script.js                               # Interactions (galerie filtrable, agrandissement Lightbox, menu mobile)
├── README.md                               # Guide de personnalisation et de publication GitHub Pages
└── assets/
    ├── logo.svg                            # Logo officiel MY SHOP (panier blanc + nom blanc sur fond bleu)
    ├── favicon.svg                         # Icône d'onglet (favicon) MY SHOP
    ├── illustrations/
    │   ├── hero-ordinateur.jpg             # Illustration principale du logiciel sur ordinateur
    │   └── commerce-comptoir.jpg           # Visuel d'environnement boutique / comptoir Windows
    └── captures/
        ├── capture-01-caisse-ventes.svg    # Capture remplaçable : Caisse & Enregistrement des ventes
        ├── capture-02-articles.svg         # Capture remplaçable : Gestion des articles
        ├── capture-03-stock.svg            # Capture remplaçable : Gestion du stock
        └── capture-04-historique-rapports.svg # Capture remplaçable : Historique & Rapports
```

---

## 2. Personnalisation rapide (`config.js`)

Toutes les informations modifiables sont regroupées dans le fichier **`config.js`**. Ouvrez-le avec n'importe quel éditeur de texte (Bloc-notes, VS Code, ou directement sur GitHub) :

### A. Configurer votre adresse e-mail
Dans la section `contact` de `config.js` :
```js
contact: {
  email: "apploumproject@gmail.com",
  isPlaceholder: false,
  subject: "Demande du logiciel MY SHOP",
  body: "Bonjour,\n\nJe souhaite obtenir des informations sur le logiciel MY SHOP et connaître les modalités pour l'obtenir.\n\nCordialement,"
}
```

### B. Mettre à jour la version et les spécificités confirmées
Dans la section `software` de `config.js` :
```js
software: {
  version: "Version 1.0",
  operatingSystem: "Windows 10 / Windows 11",
  editionLabel: "Logiciel de gestion commerciale",
  confirmations: {
    offlineMode: true,      // Mettre à false si le mode hors connexion n'est pas inclus
    localDataStorage: true  // Mettre à false si le stockage local n'est pas inclus
  }
}
```

### C. Remplacer le logo ou les captures d'écran
1. **Logo officiel** : remplacez `assets/logo.svg` par votre propre fichier (ex. `assets/logo.png`) puis mettez à jour `brand.logo: "./assets/logo.png"` dans `config.js`.
2. **Captures d'écran du logiciel** :
   - Placez vos vraies captures (`.png`, `.jpg` ou `.webp`) dans le dossier `assets/captures/`.
   - Mettez à jour le tableau `screenshots` dans `config.js` avec les chemins correspondants (`./assets/captures/ma-capture-1.png`, etc.).

---

## 3. Publier gratuitement sur GitHub Pages

Tous les chemins de ressources (`./style.css`, `./config.js`, `./script.js`, `./assets/...`) sont **relatifs**, ce qui garantit un fonctionnement immédiat aussi bien sur un sous-dossier `https://<utilisateur>.github.io/<nom-du-depot>/` que sur un nom de domaine personnalisé.

### Méthode 1 — Depuis l'interface web de GitHub (sans ligne de commande)

1. Connectez-vous à votre compte [GitHub](https://github.com) et cliquez sur **New repository**.
2. Nommez votre dépôt (par exemple `my-shop`), choisissez **Public**, puis cliquez sur **Create repository**.
3. Cliquez sur **uploading an existing file** et glissez-déposez à la racine du dépôt :
   - `index.html`
   - `style.css`
   - `config.js`
   - `script.js`
   - `README.md`
   - le dossier complet `assets/`
4. Cliquez sur **Commit changes**.
5. Dans votre dépôt GitHub, ouvrez l'onglet **Settings** → menu de gauche **Pages**.
6. Sous **Build and deployment** :
   - **Source** : sélectionnez `Deploy from a branch`.
   - **Branch** : sélectionnez `main` (ou `master`) et le dossier `/ (root)`, puis cliquez sur **Save**.
7. Patientez 1 à 2 minutes : GitHub affiche l'adresse publique officielle de votre site vitrine :
   `https://<votre-identifiant>.github.io/my-shop/`

### Méthode 2 — Avec Git en ligne de commande

```bash
git init
git add index.html style.css config.js script.js assets README.md
git commit -m "Publication initiale du site vitrine officiel MY SHOP"
git branch -M main
git remote add origin https://github.com/<votre-identifiant>/my-shop.git
git push -u origin main
```

Activez ensuite **Settings → Pages → Deploy from a branch (`main` / `root`)** comme indiqué ci-dessus.

---

## 4. Aperçu en local

- **Double-clic direct** : ouvrez simplement `index.html` dans votre navigateur (Chrome, Edge, Firefox, Safari).
- **Serveur local optionnel** : lancez `npx serve .` ou `npm run dev` pour prévisualiser avec rechargement local.
