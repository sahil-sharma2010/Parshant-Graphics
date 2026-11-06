/* ==========================================================================
   PARSHANT GRAPHICS — Luxury Architectural Minimalism Interactive Script
   Mobile & WhatsApp: +91 79883 00872 | Email: sahilvats0009@gmail.com
   Address: Kishanpura Road, opp. New Anaj Mandi, New Anaj Mandi, Jind, Haryana 126114
   ========================================================================== */

const OWNER_WHATSAPP_NUMBER = "917988300872";
const OWNER_PHONE_DISPLAY = "+91 79883 00872";
const OWNER_EMAIL = "sahilvats0009@gmail.com";
const OWNER_ADDRESS = "Kishanpura Road, opp. New Anaj Mandi, New Anaj Mandi, Jind, Haryana 126114";

// 0. Automatic Image Path Fallback (Checks images/filename first, then root filename)
function handleImageFallback(imgEl, rootFileName) {
    if (!imgEl) return;
    if (!imgEl.dataset.triedRoot && rootFileName) {
        imgEl.dataset.triedRoot = "true";
        imgEl.src = rootFileName;
    } else {
        imgEl.dataset.fallback = "true";
    }
}

// 1. In-Page Toast Notification
function showToast(message, iconClass = "fa-solid fa-circle-check") {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="${iconClass}" style="color: var(--gold-light);"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.25s ease";
        setTimeout(() => toast.remove(), 260);
    }, 3200);
}

// 2. Copy to Clipboard Helper (Preserved for compatibility)
function copyToClipboard(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`${label} copied to clipboard!`);
        }).catch(() => fallbackCopy(text, label));
    } else {
        fallbackCopy(text, label);
    }
}

function fallbackCopy(text, label) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand("copy");
        showToast(`${label} copied to clipboard!`);
    } catch (err) {
        showToast(`Could not copy ${label}.`, "fa-solid fa-circle-info");
    }
    document.body.removeChild(ta);
}

// 3. Bidirectional Smooth Scroll Reveal Observer (Animates Every Time on Scroll Up & Down)
function initScrollReveal() {
    // Also add .reveal to individual cards so every card animates smoothly on scroll up/down
    const autoRevealSelectors = ".service-card, .portfolio-card, .c-card, .stat-box";
    document.querySelectorAll(autoRevealSelectors).forEach((el, idx) => {
        if (!el.classList.contains("reveal")) {
            el.classList.add("reveal");
        }
        el.style.transitionDelay = `${(idx % 4) * 55}ms`;
    });

    const revealEls = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                entry.target.classList.remove("reveal-pending-down", "reveal-pending-up");
            } else {
                entry.target.classList.remove("reveal-visible");
                // Set directional class based on whether element is above or below viewport
                if (entry.boundingClientRect.top < 0) {
                    entry.target.classList.add("reveal-pending-up");
                    entry.target.classList.remove("reveal-pending-down");
                } else {
                    entry.target.classList.add("reveal-pending-down");
                    entry.target.classList.remove("reveal-pending-up");
                }
            }
        });
    }, {
        threshold: 0.10,
        rootMargin: "0px 0px -30px 0px"
    });

    revealEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
            el.classList.add("reveal-pending-down");
        } else if (rect.bottom < 0) {
            el.classList.add("reveal-pending-up");
        } else {
            el.classList.add("reveal-visible");
        }
        observer.observe(el);
    });
}
initScrollReveal();

// 4. Mobile Navigation Menu Toggle & Active ScrollSpy Underline ("Danda" Follows Scroll)
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const mainNavbar = document.getElementById("mainNavbar");
const navAnchorItems = document.querySelectorAll(".nav-links a[href^='#']");
const trackedSections = Array.from(navAnchorItems)
    .map(link => {
        const id = link.getAttribute("href").slice(1);
        return document.getElementById(id);
    })
    .filter(Boolean);

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    navAnchorItems.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
            navAnchorItems.forEach(a => a.classList.remove("active"));
            link.classList.add("active");
        });
    });
}

function updateActiveNavOnScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (mainNavbar) {
        mainNavbar.classList.toggle("scrolled", scrollY > 20);
    }

    // Determine which section is currently active at the top/middle of viewport
    const triggerLine = scrollY + 150;
    let currentSectionId = trackedSections.length > 0 ? trackedSections[0].id : "home";

    for (let i = 0; i < trackedSections.length; i++) {
        const sec = trackedSections[i];
        if (sec.offsetTop <= triggerLine) {
            currentSectionId = sec.id;
        }
    }

    // If scrolled to the very bottom of page, highlight the last nav section
    if ((window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 30)) {
        if (trackedSections.length > 0) {
            currentSectionId = trackedSections[trackedSections.length - 1].id;
        }
    }

    navAnchorItems.forEach(link => {
        const targetId = link.getAttribute("href").slice(1);
        if (targetId === currentSectionId) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavOnScroll, { passive: true });
window.addEventListener("resize", updateActiveNavOnScroll);
updateActiveNavOnScroll();

// 5. Charcoal Dark / Warm White Light Theme Switcher
const themeToggleBtn = document.getElementById("themeToggleBtn");
if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");
        themeToggleBtn.innerHTML = isLight
            ? '<i class="fa-solid fa-moon"></i>'
            : '<i class="fa-solid fa-sun"></i>';
        showToast(isLight ? "Switched to Warm White Theme" : "Switched to Charcoal & Champagne Gold Theme");
    });
}

// 6. Hero Signboard Finish Preset Switcher
const heroPresets = {
    gold: {
        title: "PARSHANT GRAPHICS",
        sub: "3D LIGHT BOARD FACTORY • CHAMPAGNE GOLD",
        color: "#faf8f5",
        shadow: "0 2px 10px rgba(0,0,0,0.9), 0 0 16px rgba(197,160,89,0.65)",
        badgeBg: "linear-gradient(90deg, #e0c283, #c5a059)",
        badgeColor: "#111215"
    },
    warmwhite: {
        title: "PARSHANT STUDIO",
        sub: "WARM WHITE HALO ILLUMINATION",
        color: "#ffffff",
        shadow: "0 2px 10px rgba(0,0,0,0.9), 0 0 18px rgba(250,248,245,0.7)",
        badgeBg: "linear-gradient(90deg, #faf8f5, #d6d1c7)",
        badgeColor: "#111215"
    },
    bronze: {
        title: "PARSHANT LUXE",
        sub: "ARCHITECTURAL BRONZE & CHARCOAL",
        color: "#f5ebe0",
        shadow: "0 2px 10px rgba(0,0,0,0.9), 0 0 16px rgba(217,146,82,0.6)",
        badgeBg: "linear-gradient(90deg, #e6b88a, #b87b43)",
        badgeColor: "#111215"
    }
};

document.querySelectorAll(".preset-pill").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".preset-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const key = btn.getAttribute("data-preset");
        const p = heroPresets[key];
        if (!p) return;
        const heroTitle = document.getElementById("heroSignTitle");
        const heroSub = document.getElementById("heroSignSub");
        if (heroTitle) {
            heroTitle.textContent = p.title;
            heroTitle.style.color = p.color;
            heroTitle.style.textShadow = p.shadow;
        }
        if (heroSub) {
            heroSub.textContent = p.sub;
            heroSub.style.background = p.badgeBg;
            heroSub.style.color = p.badgeColor;
        }
    });
});

// 7. Upgraded Interactive 3D Sign Studio Pro Logic
const shopNameInput = document.getElementById("shopNameInput");
const shopSubInput = document.getElementById("shopSubInput");
const fontSelect = document.getElementById("fontSelect");
const boardWidthInput = document.getElementById("boardWidthInput");
const boardHeightInput = document.getElementById("boardHeightInput");
const previewShopName = document.getElementById("previewShopName");
const previewShopSub = document.getElementById("previewShopSub");
const previewSubBar = document.getElementById("previewSubBar");
const acpBoard = document.getElementById("acpBoard");
const boardBorder = document.getElementById("boardBorder");
const colorBtns = document.querySelectorAll(".color-btn");
const bgBtns = document.querySelectorAll(".bg-btn");
const sizePresetBtns = document.querySelectorAll(".size-preset-btn");
const lightingBtns = document.querySelectorAll(".lighting-btn");
const borderBtns = document.querySelectorAll(".border-btn");
const emblemBtns = document.querySelectorAll(".emblem-btn");
const glowRangeInput = document.getElementById("glowRangeInput");
const glowPercentText = document.getElementById("glowPercentText");
const selectedColorLabel = document.getElementById("selectedColorLabel");
const previewEmblemWrap = document.getElementById("previewEmblemWrap");
const previewEmblemIcon = document.getElementById("previewEmblemIcon");
const toggleDayNight = document.getElementById("toggleDayNight");
const toggleSubBarBtn = document.getElementById("toggleSubBarBtn");
const signboardStage = document.getElementById("signboardStage");
const calcAreaText = document.getElementById("calcAreaText");
const calcFinishText = document.getElementById("calcFinishText");

let selectedColor = "#e0c283";
let selectedColorName = "Champagne Gold Halo";
let selectedBgName = "Matte Charcoal ACP";
let selectedLightingName = "3D Halo Lit";
let selectedBorderName = "Gold Frame";
let isSubBarVisible = true;

const acpBackgroundStyles = {
    charcoal: "#111215",
    bronze: "linear-gradient(135deg, #261e16, #14100c)",
    walnut: "linear-gradient(135deg, #32221a, #18100c)",
    slate: "linear-gradient(135deg, #1e232d, #0f1218)",
    marble: "radial-gradient(circle at 20% 20%, #2b2927 0%, #0d0d0f 60%, #1f1b14 100%)",
    navy: "linear-gradient(135deg, #0f1b33, #070d19)",
    silver: "linear-gradient(135deg, #3a3f47, #1d2026)",
    emerald: "linear-gradient(135deg, #0d2b22, #071410)"
};

function updateBoardSpecs() {
    const w = Math.max(1, parseFloat(boardWidthInput ? boardWidthInput.value : 8) || 8);
    const h = Math.max(1, parseFloat(boardHeightInput ? boardHeightInput.value : 3) || 3);
    const sqFt = Math.round(w * h * 10) / 10;
    if (calcAreaText) {
        calcAreaText.textContent = `${w} ft × ${h} ft (${sqFt} sq.ft.) • ${selectedLightingName}`;
    }
    if (calcFinishText) {
        calcFinishText.textContent = `${selectedColorName} • ${selectedBgName}`;
    }
}

if (shopNameInput) {
    shopNameInput.addEventListener("input", (e) => {
        const val = e.target.value.trim();
        previewShopName.textContent = val ? val.toUpperCase() : "YOUR BRAND NAME";
    });
}

if (shopSubInput) {
    shopSubInput.addEventListener("input", (e) => {
        const val = e.target.value.trim();
        previewShopSub.textContent = val ? val : "Architectural Signage | Ph: +91 79883 00872";
    });
}

if (fontSelect) {
    fontSelect.addEventListener("change", (e) => {
        document.documentElement.style.setProperty("--sign-font", e.target.value);
    });
}

if (boardWidthInput) boardWidthInput.addEventListener("input", updateBoardSpecs);
if (boardHeightInput) boardHeightInput.addEventListener("input", updateBoardSpecs);

// Quick Size Preset Buttons
sizePresetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        sizePresetBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const w = btn.getAttribute("data-w");
        const h = btn.getAttribute("data-h");
        if (boardWidthInput) boardWidthInput.value = w;
        if (boardHeightInput) boardHeightInput.value = h;
        updateBoardSpecs();
    });
});

// 10 Illumination & Metallic Colours
colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        colorBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedColor = btn.getAttribute("data-color");
        selectedColorName = btn.getAttribute("title") || "Champagne Gold Halo";
        if (selectedColorLabel) selectedColorLabel.textContent = selectedColorName;
        document.documentElement.style.setProperty("--sign-glow", selectedColor);
        updateBoardSpecs();
    });
});

// 8 ACP Base Finishes
bgBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        bgBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const bgType = btn.getAttribute("data-bg");
        selectedBgName = btn.textContent.trim();
        if (acpBoard && acpBackgroundStyles[bgType]) {
            acpBoard.style.background = acpBackgroundStyles[bgType];
        }
        updateBoardSpecs();
    });
});

// 4 3D Lighting Effect Modes
lightingBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        lightingBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.getAttribute("data-lighting");
        selectedLightingName = btn.textContent.trim();
        if (previewShopName) {
            previewShopName.classList.remove("mode-frontlit", "mode-duallit", "mode-neon");
            if (mode === "frontlit") previewShopName.classList.add("mode-frontlit");
            if (mode === "duallit") previewShopName.classList.add("mode-duallit");
            if (mode === "neon") previewShopName.classList.add("mode-neon");
        }
        updateBoardSpecs();
    });
});

// 4 Frame / Border Styles
borderBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        borderBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const borderType = btn.getAttribute("data-border");
        selectedBorderName = btn.textContent.trim();
        if (boardBorder) {
            boardBorder.classList.remove("border-double", "border-ledtube", "border-none");
            if (borderType === "double") boardBorder.classList.add("border-double");
            if (borderType === "ledtube") boardBorder.classList.add("border-ledtube");
            if (borderType === "none") boardBorder.classList.add("border-none");
        }
    });
});

// 3D Brand Emblem Selector
emblemBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        emblemBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const iconClasses = btn.getAttribute("data-emblem");
        if (previewEmblemWrap && previewEmblemIcon) {
            if (iconClasses) {
                previewEmblemIcon.className = iconClasses;
                previewEmblemWrap.style.display = "block";
            } else {
                previewEmblemWrap.style.display = "none";
            }
        }
    });
});

// Glow Brightness Slider
if (glowRangeInput) {
    glowRangeInput.addEventListener("input", (e) => {
        const pct = parseInt(e.target.value, 10) || 100;
        if (glowPercentText) glowPercentText.textContent = `${pct}%`;
        const spreadPx = Math.round((pct / 100) * 18);
        document.documentElement.style.setProperty("--glow-spread", `${spreadPx}px`);
    });
}

// Show / Hide Subtitle Tagline Bar
if (toggleSubBarBtn && previewSubBar) {
    toggleSubBarBtn.addEventListener("click", () => {
        isSubBarVisible = !isSubBarVisible;
        previewSubBar.style.display = isSubBarVisible ? "inline-block" : "none";
        toggleSubBarBtn.innerHTML = isSubBarVisible
            ? '<i class="fa-solid fa-grip-lines"></i> Tagline On'
            : '<i class="fa-solid fa-grip-lines"></i> Tagline Off';
    });
}

if (toggleDayNight) {
    toggleDayNight.addEventListener("click", () => {
        signboardStage.classList.toggle("day-mode");
        const isDay = signboardStage.classList.contains("day-mode");
        toggleDayNight.innerHTML = isDay
            ? '<i class="fa-solid fa-sun"></i> Daylight View'
            : '<i class="fa-solid fa-moon"></i> Night Illumination';
    });
}

function resetSignStudio() {
    if (shopNameInput) shopNameInput.value = "PRESTIGE EMPORIUM";
    if (shopSubInput) shopSubInput.value = "Bespoke Retail & Luxury Goods | Ph: +91 79883 00872";
    if (previewShopName) {
        previewShopName.textContent = "PRESTIGE EMPORIUM";
        previewShopName.classList.remove("mode-frontlit", "mode-duallit", "mode-neon");
    }
    if (previewShopSub) previewShopSub.textContent = "Bespoke Retail & Luxury Goods | Ph: +91 79883 00872";
    if (boardWidthInput) boardWidthInput.value = "8";
    if (boardHeightInput) boardHeightInput.value = "3";
    if (fontSelect) fontSelect.selectedIndex = 0;
    document.documentElement.style.setProperty("--sign-font", "'Plus Jakarta Sans', sans-serif");
    document.documentElement.style.setProperty("--sign-glow", "#e0c283");
    document.documentElement.style.setProperty("--glow-spread", "18px");
    if (glowRangeInput) glowRangeInput.value = "100";
    if (glowPercentText) glowPercentText.textContent = "100%";

    selectedColor = "#e0c283";
    selectedColorName = "Champagne Gold Halo";
    selectedBgName = "Matte Charcoal ACP";
    selectedLightingName = "3D Halo Lit";
    selectedBorderName = "Gold Frame";

    if (selectedColorLabel) selectedColorLabel.textContent = selectedColorName;
    if (acpBoard) acpBoard.style.background = "#111215";
    if (boardBorder) boardBorder.classList.remove("border-double", "border-ledtube", "border-none");
    if (previewEmblemWrap) previewEmblemWrap.style.display = "none";

    colorBtns.forEach((b, i) => b.classList.toggle("active", i === 0));
    bgBtns.forEach((b, i) => b.classList.toggle("active", i === 0));
    sizePresetBtns.forEach((b, i) => b.classList.toggle("active", i === 0));
    lightingBtns.forEach((b, i) => b.classList.toggle("active", i === 0));
    borderBtns.forEach((b, i) => b.classList.toggle("active", i === 0));
    emblemBtns.forEach((b, i) => b.classList.toggle("active", i === 0));

    updateBoardSpecs();
    showToast("3D Sign Studio reset to default settings.");
}

function sendCustomBoardToQuote() {
    const customName = (shopNameInput && shopNameInput.value.trim()) || "PARSHANT STUDIO";
    const customSub = (shopSubInput && shopSubInput.value.trim()) || "";
    const w = (boardWidthInput && boardWidthInput.value) || "8";
    const h = (boardHeightInput && boardHeightInput.value) || "3";

    const custShopInput = document.getElementById("custShopName");
    const custServiceSelect = document.getElementById("custService");
    const custSizeInput = document.getElementById("custSize");
    const custMsgInput = document.getElementById("custMsg");

    if (custShopInput) custShopInput.value = customName;
    if (custServiceSelect) custServiceSelect.value = "3D Acrylic & Champagne Gold Signage";
    if (custSizeInput) custSizeInput.value = `${w} x ${h} Feet`;
    if (custMsgInput) {
        custMsgInput.value =
            `3D Sign Studio Pro Design:\n` +
            `- Sign Text: ${customName}\n` +
            `- Subtitle: ${customSub}\n` +
            `- Lighting Mode: ${selectedLightingName}\n` +
            `- Finish & Colour: ${selectedColorName}\n` +
            `- Base ACP Panel: ${selectedBgName}\n` +
            `- Frame Style: ${selectedBorderName}\n` +
            `- Dimensions: ${w} ft × ${h} ft`;
    }

    const quoteSection = document.getElementById("quote");
    if (quoteSection) quoteSection.scrollIntoView({ behavior: "smooth" });
    const custNameInput = document.getElementById("custName");
    if (custNameInput) setTimeout(() => custNameInput.focus(), 450);
    showToast("Custom 3D board specs loaded into the Quotation Form!");
}

function selectService(serviceName, defaultSize = "8 x 3 Feet") {
    const serviceDropdown = document.getElementById("custService");
    const sizeInput = document.getElementById("custSize");
    if (serviceDropdown) serviceDropdown.value = serviceName;
    if (sizeInput) sizeInput.value = defaultSize;
    const quoteSection = document.getElementById("quote");
    if (quoteSection) quoteSection.scrollIntoView({ behavior: "smooth" });
    showToast(`Category selected: ${serviceName}`);
}

function setQuoteSize(sizeVal) {
    const sizeInput = document.getElementById("custSize");
    if (sizeInput) {
        sizeInput.value = sizeVal;
        showToast(`Board size set to: ${sizeVal}`);
    }
}

// 8. Portfolio Filtering & Detail Modal
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        portfolioCards.forEach(card => {
            const cat = card.getAttribute("data-category");
            if (filter === "all" || cat === filter) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});

function openProjectModal(title, badge, specs, size, warranty, imageId = "") {
    const modal = document.getElementById("projectModal");
    if (!modal) return;
    document.getElementById("modalProjTitle").textContent = title;
    document.getElementById("modalProjBadge").textContent = badge;
    document.getElementById("modalProjSpecs").textContent = specs;
    document.getElementById("modalProjSize").textContent = size;
    document.getElementById("modalProjWarranty").textContent = warranty;

    const viewPhotoBtn = document.getElementById("modalViewPhotoBtn");
    if (viewPhotoBtn) {
        const targetImg = imageId ? document.getElementById(imageId) : null;
        if (targetImg) {
            viewPhotoBtn.style.display = "inline-flex";
            viewPhotoBtn.onclick = () => {
                closeProjectModal();
                openImageLightbox(targetImg);
            };
        } else {
            viewPhotoBtn.style.display = "none";
        }
    }

    const orderBtn = document.getElementById("modalOrderSimilarBtn");
    if (orderBtn) {
        orderBtn.onclick = () => {
            closeProjectModal();
            selectService(badge, size);
        };
    }
    modal.classList.add("open");
}

function closeProjectModal() {
    const modal = document.getElementById("projectModal");
    if (modal) modal.classList.remove("open");
}

// 8B. Full-Screen Image Lightbox Viewer (Click Any Image to Open on Screen)
let lightboxGallery = [];
let currentLightboxIndex = 0;

function collectGalleryImages() {
    const imgs = Array.from(document.querySelectorAll("img.clickable-img"));
    const uniqueMap = new Map();
    imgs.forEach(img => {
        const key = img.getAttribute("src") || img.src;
        if (key && !uniqueMap.has(key)) {
            uniqueMap.set(key, {
                src: img.src || key,
                attrSrc: key,
                title: img.getAttribute("data-title") || img.alt || "Parshant Graphics",
                caption: img.getAttribute("data-caption") || "3D Sign Studio & Architectural Signage"
            });
        }
    });
    lightboxGallery = Array.from(uniqueMap.values());
}

function openImageLightbox(imgElement) {
    if (!imgElement) return;
    collectGalleryImages();
    const targetSrc = imgElement.getAttribute("src") || imgElement.src;
    const foundIdx = lightboxGallery.findIndex(item => item.attrSrc === targetSrc || item.src === imgElement.src);
    currentLightboxIndex = foundIdx >= 0 ? foundIdx : 0;

    if (lightboxGallery.length === 0) {
        lightboxGallery = [{
            src: imgElement.src || targetSrc,
            attrSrc: targetSrc,
            title: imgElement.getAttribute("data-title") || imgElement.alt || "Parshant Graphics",
            caption: imgElement.getAttribute("data-caption") || ""
        }];
        currentLightboxIndex = 0;
    }

    renderLightboxSlide();
    const modal = document.getElementById("imageLightboxModal");
    if (modal) {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
    }
}

function openImageLightboxBySrc(src, title, caption) {
    collectGalleryImages();
    const foundIdx = lightboxGallery.findIndex(item => item.attrSrc === src || item.src.endsWith(src));
    if (foundIdx >= 0) {
        currentLightboxIndex = foundIdx;
    } else {
        lightboxGallery.push({
            src: src,
            attrSrc: src,
            title: title || "Parshant Graphics",
            caption: caption || ""
        });
        currentLightboxIndex = lightboxGallery.length - 1;
    }
    renderLightboxSlide();
    const modal = document.getElementById("imageLightboxModal");
    if (modal) {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
    }
}

function renderLightboxSlide() {
    const item = lightboxGallery[currentLightboxIndex];
    if (!item) return;
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxCounter = document.getElementById("lightboxCounter");
    const zoomBtn = document.getElementById("lightboxZoomBtn");

    if (lightboxImg) {
        lightboxImg.classList.remove("zoomed");
        lightboxImg.src = item.src;
        lightboxImg.alt = item.title;
    }
    if (zoomBtn) {
        zoomBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i>';
    }
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
    if (lightboxCounter) {
        lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${lightboxGallery.length} • ${item.title}`;
    }
}

function navigateLightbox(direction) {
    if (lightboxGallery.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + direction + lightboxGallery.length) % lightboxGallery.length;
    renderLightboxSlide();
}

function toggleLightboxZoom() {
    const lightboxImg = document.getElementById("lightboxImg");
    const zoomBtn = document.getElementById("lightboxZoomBtn");
    if (!lightboxImg) return;
    const isZoomed = lightboxImg.classList.toggle("zoomed");
    if (zoomBtn) {
        zoomBtn.innerHTML = isZoomed
            ? '<i class="fa-solid fa-magnifying-glass-minus"></i>'
            : '<i class="fa-solid fa-magnifying-glass-plus"></i>';
    }
}

function closeImageLightbox() {
    const modal = document.getElementById("imageLightboxModal");
    const lightboxImg = document.getElementById("lightboxImg");
    if (lightboxImg) lightboxImg.classList.remove("zoomed");
    if (modal) {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
    }
}

// Attach click listeners to all images so clicking ANY image opens it on screen
function initClickableImages() {
    document.querySelectorAll("img").forEach(img => {
        if (img.id === "lightboxImg") return;
        img.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            openImageLightbox(img);
        });
    });

    const lightboxModal = document.getElementById("imageLightboxModal");
    const lightboxImg = document.getElementById("lightboxImg");

    if (lightboxImg) {
        lightboxImg.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleLightboxZoom();
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal || e.target.id === "lightboxStage") {
                closeImageLightbox();
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains("open")) return;
        if (e.key === "Escape") closeImageLightbox();
        if (e.key === "ArrowRight") navigateLightbox(1);
        if (e.key === "ArrowLeft") navigateLightbox(-1);
    });
}
initClickableImages();

// 9. Upgraded Quotation Form — WhatsApp & Email Dispatch
const whatsappQuoteForm = document.getElementById("whatsappQuoteForm");
const sendEmailQuoteBtn = document.getElementById("sendEmailQuoteBtn");

function buildQuoteDetails() {
    const name = (document.getElementById("custName").value || "").trim() || "Valued Client";
    const phone = (document.getElementById("custPhone").value || "").trim() || "Not provided";
    const shopName = (document.getElementById("custShopName").value || "").trim() || "Custom Signage";
    const cityEl = document.getElementById("custCity");
    const city = (cityEl && cityEl.value ? cityEl.value.trim() : "") || "Jind / Haryana";
    const service = document.getElementById("custService").value;
    const finishEl = document.getElementById("custFinish");
    const finish = finishEl ? finishEl.value : "Standard 3D LED Finish";
    const size = (document.getElementById("custSize").value || "").trim() || "Standard Size";
    const mountingEl = document.getElementById("custMounting");
    const mounting = mountingEl ? mountingEl.value : "Storefront Fascia";
    const msg = (document.getElementById("custMsg").value || "").trim() || "Please share 3D design mockup and quotation.";

    const formattedText =
        `Hello *PARSHANT GRAPHICS*,\n` +
        `I would like to request a quotation for a signage project:\n\n` +
        `*Client Name:* ${name}\n` +
        `*Contact Number:* ${phone}\n` +
        `*City / Location:* ${city}\n` +
        `*Signboard Name:* ${shopName}\n` +
        `*Board Category:* ${service}\n` +
        `*Preferred Finish:* ${finish}\n` +
        `*Approx. Size:* ${size}\n` +
        `*Mounting Location:* ${mounting}\n` +
        `*Additional Details:* ${msg}\n\n` +
        `Please share the 3D design options and quotation.`;

    return { name, phone, city, shopName, service, finish, size, mounting, msg, formattedText };
}

if (whatsappQuoteForm) {
    whatsappQuoteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = buildQuoteDetails();
        const waUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(data.formattedText)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
        showToast("Opening WhatsApp chat with +91 79883 00872...");
    });
}

if (sendEmailQuoteBtn) {
    sendEmailQuoteBtn.addEventListener("click", () => {
        const nameInput = document.getElementById("custName");
        if (nameInput && !nameInput.value.trim()) {
            nameInput.focus();
            showToast("Please enter your name first.", "fa-solid fa-circle-exclamation");
            return;
        }
        const data = buildQuoteDetails();
        const subject = `Signage Quotation Inquiry — ${data.shopName} (${data.city})`;
        const plainBody = data.formattedText.replace(/\*/g, "");
        window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainBody)}`;
        showToast(`Opening email client for ${OWNER_EMAIL}...`, "fa-solid fa-envelope");
    });
}

// 10. Interactive WhatsApp Live Chat Widget
const waToggleBtn = document.getElementById("waToggleBtn");
const waChatBox = document.getElementById("waChatBox");
const waCloseBtn = document.getElementById("waCloseBtn");
const waQuickInput = document.getElementById("waQuickInput");
const waSendBtn = document.getElementById("waSendBtn");

if (waToggleBtn && waChatBox) {
    waToggleBtn.addEventListener("click", () => {
        waChatBox.classList.toggle("open");
    });
}

if (waCloseBtn && waChatBox) {
    waCloseBtn.addEventListener("click", () => {
        waChatBox.classList.remove("open");
    });
}

document.querySelectorAll(".wa-chip").forEach(chip => {
    chip.addEventListener("click", () => {
        const text = chip.getAttribute("data-msg") || chip.textContent;
        if (waQuickInput) waQuickInput.value = text;
        launchQuickWhatsApp(text);
    });
});

function launchQuickWhatsApp(customText) {
    const message = (customText || (waQuickInput && waQuickInput.value) || "").trim() ||
        "Hello Parshant Graphics! I would like to inquire about 3D Signage & Branding services.";
    const waUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    showToast("Launching WhatsApp chat with +91 79883 00872...");
}

if (waSendBtn) {
    waSendBtn.addEventListener("click", () => launchQuickWhatsApp());
}

if (waQuickInput) {
    waQuickInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            launchQuickWhatsApp();
        }
    });
}

window.handleImageFallback = handleImageFallback;
window.resetSignStudio = resetSignStudio;
window.sendCustomBoardToQuote = sendCustomBoardToQuote;
window.selectService = selectService;
window.setQuoteSize = setQuoteSize;
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.openImageLightbox = openImageLightbox;
window.openImageLightboxBySrc = openImageLightboxBySrc;
window.navigateLightbox = navigateLightbox;
window.toggleLightboxZoom = toggleLightboxZoom;
window.closeImageLightbox = closeImageLightbox;
window.copyToClipboard = copyToClipboard;

updateBoardSpecs();