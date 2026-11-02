/**
 * ============================================================================
 * MY SHOP — FICHIER DE CONFIGURATION CENTRALISÉE
 * ============================================================================
 * Modifiez uniquement les valeurs ci-dessous pour personnaliser les coordonnées,
 * les informations de version du logiciel et les captures d'écran du site.
 * Aucun outil de compilation n'est requis pour la publication sur GitHub Pages.
 */

window.MYSHOP_CONFIG = {
  /* -------------------------------------------------------------------------
   * 1. IDENTITÉ & RESSOURCES VISUELLES
   * ------------------------------------------------------------------------- */
  brand: {
    name: "MY SHOP",
    logo: "./assets/logo.svg",
    favicon: "./assets/favicon.svg",
    heroIllustration: "./assets/illustrations/hero-ordinateur.jpg",
    shopIllustration: "./assets/illustrations/commerce-comptoir.jpg"
  },

  /* -------------------------------------------------------------------------
   * 2. INFORMATIONS DE VERSION & CARACTÉRISTIQUES DU LOGICIEL
   * -------------------------------------------------------------------------
   * Remplacez la valeur "version" par le numéro réel de votre logiciel
   * (exemple : "1.2.0" ou "2026.1").
   */
  software: {
    version: "Version à renseigner (ex. 1.0)",
    operatingSystem: "Windows (PC de bureau & ordinateur portable)",
    editionLabel: "Logiciel de gestion commerciale",
    /**
     * Points conditionnels de la section « Pourquoi choisir MY SHOP ? » :
     * Passez une option à `false` si elle n'est pas proposée dans votre version,
     * ou laissez `true` si elle est bien confirmée.
     */
    confirmations: {
      offlineMode: true,      // Utilisation hors connexion, si confirmée
      localDataStorage: true  // Conservation locale des données, si confirmée
    }
  },

  /* -------------------------------------------------------------------------
   * 3. CONTACT ET DEMANDE DU LOGICIEL (EXCLUSIVEMENT PAR E-MAIL)
   * -------------------------------------------------------------------------
   * Passez `isPlaceholder` à `false` une fois votre adresse officielle saisie.
   */
  contact: {
    email: "apploumproject@gmail.com",
    isPlaceholder: false,
    subject: "Contact MY SHOP",
    body: "Bonjour,\n\nJe souhaite obtenir des renseignements complémentaires concernant MY SHOP.\n\nCordialement,"
  },

  /* -------------------------------------------------------------------------
   * 4. GALERIE D'APERÇU DU LOGICIEL (CAPTURES D'ÉCRAN)
   * -------------------------------------------------------------------------
   * Pour remplacer une capture d'écran :
   * 1. Déposez votre image (.png, .jpg, .webp ou .svg) dans `./assets/captures/`
   * 2. Mettez à jour le chemin `src`, le `title` et la `description` ci-dessous.
   * Catégories disponibles pour le filtre : "caisse-ventes", "articles-stock", "rapports"
   */
  screenshots: [
    {
      id: "caisse-ventes",
      category: "caisse-ventes",
      categoryLabel: "Caisse & Ventes",
      src: "./assets/captures/capture-01-caisse-ventes.svg",
      title: "Gestion de caisse et enregistrement des ventes",
      description:
        "Saisie rapide des articles au comptoir, calcul automatique du total à encaisser et suivi de la session de caisse.",
      alt: "Capture d'écran MY SHOP montrant l'enregistrement d'une vente et le récapitulatif de caisse"
    },
    {
      id: "catalogue-articles",
      category: "articles-stock",
      categoryLabel: "Articles & Stock",
      src: "./assets/captures/capture-02-articles.svg",
      title: "Gestion structurée des articles",
      description:
        "Organisation claire du catalogue produits avec références, désignations, catégories et prix de vente.",
      alt: "Capture d'écran MY SHOP présentant la liste des articles et leurs tarifs"
    },
    {
      id: "suivi-stock",
      category: "articles-stock",
      categoryLabel: "Articles & Stock",
      src: "./assets/captures/capture-03-stock.svg",
      title: "Suivi et gestion du stock",
      description:
        "Consultation immédiate des quantités disponibles en magasin, enregistrement des entrées et repérage des stocks faibles.",
      alt: "Capture d'écran MY SHOP affichant l'état des quantités en stock par référence"
    },
    {
      id: "historique-rapports",
      category: "rapports",
      categoryLabel: "Historique & Rapports",
      src: "./assets/captures/capture-04-historique-rapports.svg",
      title: "Historique des ventes et consultation des rapports",
      description:
        "Journal chronologique des transactions enregistrées et synthèse lisible de l'activité commerciale sur la période choisie.",
      alt: "Capture d'écran MY SHOP illustrant les rapports de ventes et l'historique des tickets"
    }
  ]
};
