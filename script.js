/**
 * ============================================================================
 * MY SHOP — SCRIPT PRINCIPAL DU SITE VITRINE
 * ============================================================================
 * Gère l'injection de la configuration centralisée (config.js), la navigation
 * mobile, le filtrage de la galerie d'aperçus, l'agrandissement des captures
 * d'écran (Lightbox accessible) et les actions de contact.
 */

(function () {
  "use strict";

  const defaultConfig = {
    brand: {
      name: "MY SHOP",
      logo: "./assets/logo.svg",
      favicon: "./assets/favicon.svg",
      heroIllustration: "./assets/illustrations/hero-ordinateur.jpg",
      shopIllustration: "./assets/illustrations/commerce-comptoir.jpg"
    },
    software: {
      version: "Version à renseigner (ex. 1.0)",
      operatingSystem: "Windows (PC de bureau & ordinateur portable)",
      editionLabel: "Logiciel de gestion commerciale",
      confirmations: {
        offlineMode: true,
        localDataStorage: true
      }
    },
    contact: {
      email: "apploumproject@gmail.com",
      isPlaceholder: false,
      subject: "Contact MY SHOP",
      body: "Bonjour,\n\nJe souhaite obtenir des renseignements complémentaires concernant MY SHOP.\n\nCordialement,"
    },
    screenshots: []
  };

  const config = Object.assign({}, defaultConfig, window.MYSHOP_CONFIG || {});

  /* -------------------------------------------------------------------------
   * 1. Construction sécurisée du lien e-mail
   * ------------------------------------------------------------------------- */
  function buildMailtoUrl(subjectOverride, bodyOverride) {
    const email =
      (config.contact && config.contact.email) || "apploumproject@gmail.com";
    const subject = subjectOverride || (config.contact && config.contact.subject) || "Contact MY SHOP";
    const body = bodyOverride || (config.contact && config.contact.body) || "";

    const params = [];
    if (subject) params.push("subject=" + encodeURIComponent(subject));
    if (body) params.push("body=" + encodeURIComponent(body));

    return "mailto:" + email + (params.length ? "?" + params.join("&") : "");
  }

  /* -------------------------------------------------------------------------
   * 2. Gestion résiliente des images (Politique zéro image cassée)
   * ------------------------------------------------------------------------- */
  function bindImageFallback(imgElement) {
    if (!imgElement) return;
    imgElement.addEventListener("error", function () {
      const slot = imgElement.closest(".media-slot");
      if (slot) {
        slot.classList.add("has-error");
      }
    });
  }

  /* -------------------------------------------------------------------------
   * 3. Hydratation des données depuis config.js
   * ------------------------------------------------------------------------- */
  function applyConfiguration() {
    // Logos
    document.querySelectorAll("[data-brand-logo]").forEach(function (img) {
      if (config.brand && config.brand.logo) {
        img.setAttribute("src", config.brand.logo);
      }
    });

    // Illustrations principales
    const heroImg = document.getElementById("hero-illustration");
    if (heroImg) {
      if (config.brand && config.brand.heroIllustration) {
        heroImg.setAttribute("src", config.brand.heroIllustration);
      }
      bindImageFallback(heroImg);
    }

    const shopImg = document.getElementById("shop-illustration");
    if (shopImg) {
      if (config.brand && config.brand.shopIllustration) {
        shopImg.setAttribute("src", config.brand.shopIllustration);
      }
      bindImageFallback(shopImg);
    }

    // Informations de version et système
    document.querySelectorAll("[data-software-version]").forEach(function (el) {
      el.textContent = (config.software && config.software.version) || "À renseigner";
    });

    document.querySelectorAll("[data-software-os]").forEach(function (el) {
      el.textContent = (config.software && config.software.operatingSystem) || "Windows";
    });

    // Affichage conditionnel des garanties (« si confirmée »)
    const confirmations = (config.software && config.software.confirmations) || {};
    if (confirmations.offlineMode === false) {
      const offlineItem = document.querySelector('[data-confirmation="offlineMode"]');
      if (offlineItem) offlineItem.style.display = "none";
    }
    if (confirmations.localDataStorage === false) {
      const localItem = document.querySelector('[data-confirmation="localDataStorage"]');
      if (localItem) localItem.style.display = "none";
    }

    // Contact et demandes du logiciel exclusivement par e-mail
    const emailAddress =
      (config.contact && config.contact.email) || "apploumproject@gmail.com";
    const mailtoUrl = buildMailtoUrl();
    const requestMailtoUrl = buildMailtoUrl(
      "Demande du logiciel MY SHOP",
      "Bonjour,\n\nJe souhaite obtenir des informations sur le logiciel MY SHOP et connaître les modalités pour l'obtenir.\n\nCordialement,"
    );

    document.querySelectorAll("[data-contact-email]").forEach(function (el) {
      el.textContent = emailAddress;
    });

    document.querySelectorAll("[data-mailto-link]").forEach(function (link) {
      link.setAttribute("href", requestMailtoUrl);
    });

    document.querySelectorAll("[data-mailto-general]").forEach(function (link) {
      link.setAttribute("href", mailtoUrl);
    });

    const emailPlaceholderNote = document.getElementById("email-placeholder-note");
    if (emailPlaceholderNote) {
      emailPlaceholderNote.style.display =
        config.contact && config.contact.isPlaceholder ? "block" : "none";
    }
  }

  /* -------------------------------------------------------------------------
   * 4. Copie rapide de l'adresse e-mail dans le presse-papiers
   * ------------------------------------------------------------------------- */
  function setupEmailCopy() {
    const copyBtn = document.getElementById("copy-email-btn");
    const copyLabel = document.getElementById("copy-email-label");
    if (!copyBtn || !copyLabel) return;

    let resetTimer = null;

    copyBtn.addEventListener("click", function () {
      const email =
        (config.contact && config.contact.email) || "apploumproject@gmail.com";

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          copyLabel.textContent = "Adresse copiée";
          if (resetTimer) clearTimeout(resetTimer);
          resetTimer = setTimeout(function () {
            copyLabel.textContent = "Copier l'adresse";
          }, 2200);
        });
      }
    });
  }

  /* -------------------------------------------------------------------------
   * 5. Galerie de captures d'écran & Modale d'agrandissement (Lightbox)
   * ------------------------------------------------------------------------- */
  function setupGalleryAndLightbox() {
    const galleryGrid = document.getElementById("gallery-grid");
    const filterButtons = document.querySelectorAll(".filter-tab");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    if (!galleryGrid) return;

    const allScreenshots = Array.isArray(config.screenshots) ? config.screenshots : [];
    let filteredScreenshots = allScreenshots.slice();
    let activeIndex = 0;
    let lastFocusedElement = null;

    function createScreenshotCard(item, index) {
      const article = document.createElement("article");
      article.className = "screenshot-card";

      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "screenshot-trigger media-slot";
      trigger.setAttribute(
        "aria-label",
        "Agrandir la capture : " + (item.title || "Aperçu MY SHOP")
      );

      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt || item.title || "Capture d'écran du logiciel MY SHOP";
      img.loading = "lazy";
      img.setAttribute("referrerpolicy", "no-referrer");

      const fallback = document.createElement("div");
      fallback.className = "media-fallback";
      fallback.innerHTML =
        "<strong>" +
        escapeHtml(item.title || "Capture MY SHOP") +
        "</strong><span style=\"font-size:13px;margin-top:6px;\">Remplacez l'image dans " +
        escapeHtml(item.src || "./assets/captures/") +
        "</span>";

      const zoomHint = document.createElement("span");
      zoomHint.className = "screenshot-zoom-hint";
      zoomHint.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>' +
        "<span>Cliquer pour agrandir</span>";

      trigger.appendChild(img);
      trigger.appendChild(fallback);
      trigger.appendChild(zoomHint);
      bindImageFallback(img);

      trigger.addEventListener("click", function () {
        openLightbox(index, trigger);
      });

      const body = document.createElement("div");
      body.className = "screenshot-body";

      const meta = document.createElement("p");
      meta.className = "screenshot-meta";
      meta.textContent = item.categoryLabel || "Module MY SHOP";

      const title = document.createElement("h3");
      title.className = "screenshot-title";
      title.textContent = item.title || "Aperçu MY SHOP";

      const desc = document.createElement("p");
      desc.className = "screenshot-desc";
      desc.textContent = item.description || "";

      body.appendChild(meta);
      body.appendChild(title);
      body.appendChild(desc);

      article.appendChild(trigger);
      article.appendChild(body);

      return article;
    }

    function renderGallery(filterValue) {
      if (!filterValue || filterValue === "all") {
        filteredScreenshots = allScreenshots.slice();
      } else {
        filteredScreenshots = allScreenshots.filter(function (s) {
          return s.category === filterValue;
        });
      }

      galleryGrid.innerHTML = "";

      if (filteredScreenshots.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.style.color = "var(--text-muted)";
        emptyMsg.textContent = "Aucune capture d'écran disponible dans cette catégorie.";
        galleryGrid.appendChild(emptyMsg);
        return;
      }

      filteredScreenshots.forEach(function (item, idx) {
        galleryGrid.appendChild(createScreenshotCard(item, idx));
      });
    }

    function updateLightboxContent() {
      if (!filteredScreenshots.length || !lightboxImg) return;
      const item = filteredScreenshots[activeIndex];
      if (!item) return;

      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt || item.title || "Capture d'écran agrandie MY SHOP";
      if (lightboxTitle) lightboxTitle.textContent = item.title || "Aperçu MY SHOP";
      if (lightboxCaption) lightboxCaption.textContent = item.description || "";
      if (lightboxCounter) {
        lightboxCounter.textContent =
          activeIndex + 1 + " / " + filteredScreenshots.length;
      }
    }

    function openLightbox(index, triggerEl) {
      if (!lightbox || !filteredScreenshots.length) return;
      activeIndex = index;
      lastFocusedElement = triggerEl || document.activeElement;
      updateLightboxContent();
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      if (!lightbox || !lightbox.classList.contains("is-open")) return;
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    }

    function showPrev() {
      if (!filteredScreenshots.length) return;
      activeIndex =
        (activeIndex - 1 + filteredScreenshots.length) % filteredScreenshots.length;
      updateLightboxContent();
    }

    function showNext() {
      if (!filteredScreenshots.length) return;
      activeIndex = (activeIndex + 1) % filteredScreenshots.length;
      updateLightboxContent();
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const filterVal = btn.getAttribute("data-filter") || "all";
        filterButtons.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        renderGallery(filterVal);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", showPrev);
    if (nextBtn) nextBtn.addEventListener("click", showNext);

    if (lightbox) {
      lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
          closeLightbox();
        }
      });
    }

    document.addEventListener("keydown", function (event) {
      if (!lightbox || !lightbox.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showPrev();
      } else if (event.key === "ArrowRight") {
        showNext();
      }
    });

    renderGallery("all");
  }

  /* -------------------------------------------------------------------------
   * 6. Menu mobile & Repérage de la section active au défilement
   * ------------------------------------------------------------------------- */
  function setupNavigation() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileNav = document.getElementById("mobile-nav");

    if (menuToggle && mobileNav) {
      menuToggle.addEventListener("click", function () {
        const isOpen = mobileNav.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      mobileNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mobileNav.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
        });
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && mobileNav.classList.contains("is-open")) {
          mobileNav.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.focus();
        }
      });
    }

    // Mise en évidence discrète du lien de menu correspondant à la section visible
    const navLinks = document.querySelectorAll(".primary-nav .nav-link");
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window && sections.length && navLinks.length) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const activeId = "#" + entry.target.id;
              navLinks.forEach(function (link) {
                link.classList.toggle(
                  "is-active",
                  link.getAttribute("href") === activeId
                );
              });
            }
          });
        },
        {
          rootMargin: "-35% 0px -55% 0px",
          threshold: 0
        }
      );

      sections.forEach(function (sec) {
        observer.observe(sec);
      });
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* -------------------------------------------------------------------------
   * Initialisation au chargement du DOM
   * ------------------------------------------------------------------------- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    applyConfiguration();
    setupEmailCopy();
    setupGalleryAndLightbox();
    setupNavigation();
  }
})();
