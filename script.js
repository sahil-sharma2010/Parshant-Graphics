/* ==========================================================================
   PARSHANT GRAPHICS — Luxury Architectural Minimalism Interactive Script
   Brand: PARSHANT GRAPHICS | Tagline: MAKE YOUR BRAND VISIBLE.
   Theme: Charcoal Black + Champagne Gold + Warm White
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. CENTRAL CONFIGURATION (WhatsApp, Google Maps & Google Rating Config)
   -------------------------------------------------------------------------- */
const SITE_CONFIG = {
    whatsappNumber: "917988300872",
    phoneDisplay: "+91 79883 00872",
    email: "sahilvats0009@gmail.com",
    address: "Kishanpura Road, opp. New Anaj Mandi, New Anaj Mandi, Jind, Haryana 126114",
    whatsappDefaultMessage:
        "Hello PARSHANT GRAPHICS! 👋\n" +
        "I visited your website and I'm interested in your signage services.\n" +
        "I would like to know more about your services and pricing.\n" +
        "Please share the details.\n" +
        "Thank you!"
};

const OWNER_WHATSAPP_NUMBER = SITE_CONFIG.whatsappNumber;
const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Prashant+Graphics+Kishanpura+Road+Jind+Haryana";

// Configurable Google Maps Business Rating (Easily updatable in the future)
const GOOGLE_RATING_CONFIG = {
    businessName: "PARSHANT GRAPHICS",
    rating: "4.8",
    maxRating: "5",
    totalReviews: "409",
    category: "Graphic Designer",
    stars: 5,
    googleMapsUrl: GOOGLE_MAPS_URL
};

/* --------------------------------------------------------------------------
   2. RECENT PROJECTS DATA & GENUINE GOOGLE CUSTOMER REVIEWS (3 Projects)
   -------------------------------------------------------------------------- */
const RECENT_PROJECTS_DATA = [
    {
        id: 0,
        name: "BRAND HUT — 3D LED Storefront Signage",
        badge: "3D Acrylic LED Showroom",
        image: "images/service1.png",
        fallbackFile: "service1.png",
        size: "12 x 3.5 Feet",
        warranty: "3 Years Comprehensive Warranty",
        inquiryTopic: "BRAND HUT Style 3D Acrylic LED Signage",
        description:
            "Custom laser-cut red and warm-white 3D acrylic channel letters with an illuminated rooftop house emblem mounted on a weatherproof 4mm matte charcoal ACP storefront fascia.",
        reviews: [
            {
                stars: 5,
                text: "Thankyou so much for this beautiful 3d letters",
                source: "Google Reviews"
            },
            {
                stars: 5,
                text: "Bahut badiya kaam ker rakha bhaio ne dil khus hai bilkul 😊",
                source: "Google Reviews"
            }
        ]
    },
    {
        id: 1,
        name: "SHER - E - PUNJAB — 3D Outdoor LED Fascia",
        badge: "3D Warm White Highway LED",
        image: "images/service2.png",
        fallbackFile: "service2.png",
        size: "20 x 4 Feet",
        warranty: "5 Years Outdoor LED Warranty",
        inquiryTopic: "SHER-E-PUNJAB Style 3D Highway LED Signage",
        description:
            "Large-scale weatherproof warm-white and champagne gold 3D illuminated channel letters with custom backlit emblem, metallic returns, top floodlights, and full elevation cladding engineered for long-distance highway and night visibility.",
        reviews: [
            {
                stars: 5,
                text: "Excellent service. I Am totally satisfied. Behavior is also good.",
                source: "Google Reviews"
            },
            {
                stars: 5,
                text: "Very excellent service very good cooperative staff and best work in best prices",
                source: "Google Reviews"
            }
        ]
    },
    {
        id: 2,
        name: "AAROHI MODEL SR. SEC. SCHOOL — Gate Signage",
        badge: "Architectural Gate ACP & Gold",
        image: "images/service3.png",
        fallbackFile: "service3.png",
        size: "22 x 4.5 Feet",
        warranty: "5 Years Structural & LED Warranty",
        inquiryTopic: "AAROHI MODEL SR. SEC. SCHOOL Style Gate ACP & 3D Signage",
        description:
            "Complete institutional entrance gate ACP pillar cladding and matte black fascia with champagne gold 3D lettering, warm-white LED border tubing, and recessed spot downlights installed at Kheri Lohchab (Hansi).",
        reviews: [
            {
                stars: 5,
                text: "Very impressive work..best services",
                source: "Google Reviews"
            },
            {
                stars: 5,
                text: "fully satisfied work and fully experienced worked best graphics in jind",
                source: "Google Reviews"
            }
        ]
    }
];

// Automatic Image Path Fallback
function handleImageFallback(imgEl, rootFileName) {
    if (!imgEl) return;
    if (!imgEl.dataset.triedRoot && rootFileName) {
        imgEl.dataset.triedRoot = "true";
        imgEl.src = rootFileName;
    } else {
        imgEl.dataset.fallback = "true";
    }
}

// In-Page Toast Notification
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

// Copy to Clipboard Helper
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

// Central WhatsApp Click-to-Chat Builder & Direct Launcher
function getWhatsAppClickToChatUrl(customMessage) {
    const textToSend = customMessage || SITE_CONFIG.whatsappDefaultMessage;
    return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(textToSend)}`;
}

function openDirectWhatsApp() {
    const url = getWhatsAppClickToChatUrl(SITE_CONFIG.whatsappDefaultMessage);
    window.open(url, "_blank", "noopener,noreferrer");
}

function initCentralConfigAndRating() {
    // Wire floating WhatsApp button to central config Click-to-Chat URL
    const waFloatingBtn = document.getElementById("waFloatingBtn");
    if (waFloatingBtn) {
        waFloatingBtn.href = getWhatsAppClickToChatUrl(SITE_CONFIG.whatsappDefaultMessage);
    }

    // Populate Why Choose Us Google Rating Card from GOOGLE_RATING_CONFIG
    const grBusinessName = document.getElementById("grBusinessName");
    const grBusinessCategory = document.getElementById("grBusinessCategory");
    const grRatingValue = document.getElementById("grRatingValue");
    const grRatingMax = document.getElementById("grRatingMax");
    const grTotalReviews = document.getElementById("grTotalReviews");

    if (grBusinessName) grBusinessName.textContent = GOOGLE_RATING_CONFIG.businessName;
    if (grBusinessCategory) grBusinessCategory.textContent = GOOGLE_RATING_CONFIG.category;
    if (grRatingValue) grRatingValue.textContent = GOOGLE_RATING_CONFIG.rating;
    if (grRatingMax) grRatingMax.textContent = GOOGLE_RATING_CONFIG.maxRating;
    if (grTotalReviews) grTotalReviews.textContent = GOOGLE_RATING_CONFIG.totalReviews;

    // Wire all Google Maps links to central GOOGLE_MAPS_URL
    document.querySelectorAll(".js-google-maps-link").forEach(link => {
        link.href = GOOGLE_MAPS_URL;
    });
}
initCentralConfigAndRating();

// Bidirectional Smooth Scroll Reveal Observer
function initScrollReveal() {
    const autoRevealSelectors = ".service-card, .portfolio-card, .why-card, .process-card, .c-card, .stat-box, .about-metric-item, .google-rating-card";
    document.querySelectorAll(autoRevealSelectors).forEach((el, idx) => {
        if (!el.classList.contains("reveal")) {
            el.classList.add("reveal");
        }
        el.style.transitionDelay = `${(idx % 4) * 50}ms`;
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
        threshold: 0.08,
        rootMargin: "0px 0px -24px 0px"
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

// Mobile Navigation Menu Toggle & Active ScrollSpy Underline
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

    const triggerLine = scrollY + 140;
    let currentSectionId = trackedSections.length > 0 ? trackedSections[0].id : "home";

    for (let i = 0; i < trackedSections.length; i++) {
        const sec = trackedSections[i];
        if (sec.offsetTop <= triggerLine) {
            currentSectionId = sec.id;
        }
    }

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

// Charcoal Dark / Warm White Light Theme Switcher
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

// Hero Signboard Finish Preset Switcher
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

// Direct Service Inquiry on WhatsApp
function selectService(serviceName) {
    const message =
        `Hello PARSHANT GRAPHICS! 👋\n` +
        `I visited your website and I'm interested in your signage services (${serviceName}).\n` +
        `I would like to know more about your services and pricing.\n` +
        `Please share the details.\n` +
        `Thank you!`;
    const waUrl = getWhatsAppClickToChatUrl(message);
    window.open(waUrl, "_blank", "noopener,noreferrer");
    showToast(`Opening WhatsApp inquiry for: ${serviceName}`);
}

// Portfolio Category Filtering
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

// --------------------------------------------------------------------------
// DEDICATED FULL-PAGE VIEW 1: RECENT PROJECTS DETAIL PAGE (3 Projects)
// --------------------------------------------------------------------------
let currentProjectIndex = 0;

function renderStarsHtml(count = 5) {
    let html = "";
    for (let i = 0; i < count; i++) {
        html += '<i class="fa-solid fa-star"></i>';
    }
    return html;
}

function renderProjectDetailView(index) {
    const total = RECENT_PROJECTS_DATA.length;
    currentProjectIndex = ((index % total) + total) % total;
    const project = RECENT_PROJECTS_DATA[currentProjectIndex];
    if (!project) return;

    const detailImg = document.getElementById("detailProjImg");
    const detailBadge = document.getElementById("detailProjBadge");
    const detailCounter = document.getElementById("detailProjCounter");
    const detailName = document.getElementById("detailProjName");
    const detailDesc = document.getElementById("detailProjDesc");
    const detailSize = document.getElementById("detailProjSize");
    const detailWarranty = document.getElementById("detailProjWarranty");
    const detailReviewsList = document.getElementById("detailReviewsList");
    const detailInquireBtn = document.getElementById("detailInquireBtn");

    if (detailImg) {
        const domCardImg = document.getElementById(`serviceImg${currentProjectIndex + 1}`);
        detailImg.removeAttribute("data-tried-root");
        detailImg.removeAttribute("data-fallback");
        detailImg.src = (domCardImg && domCardImg.getAttribute("src")) ? domCardImg.getAttribute("src") : project.image;
        detailImg.alt = project.name;
        detailImg.onerror = function () {
            handleImageFallback(this, project.fallbackFile);
        };
    }

    if (detailBadge) detailBadge.textContent = project.badge;
    if (detailCounter) detailCounter.textContent = `PROJECT ${currentProjectIndex + 1} OF ${total}`;
    if (detailName) detailName.textContent = project.name;
    if (detailDesc) detailDesc.textContent = project.description;
    if (detailSize) detailSize.textContent = project.size;
    if (detailWarranty) detailWarranty.textContent = project.warranty;

    if (detailInquireBtn) {
        detailInquireBtn.onclick = () => {
            selectService(project.inquiryTopic);
        };
    }

    if (detailReviewsList) {
        detailReviewsList.innerHTML = project.reviews.map(rev => `
            <div class="detail-review-card">
                <div class="detail-review-card-top">
                    <span class="detail-review-stars" aria-label="${rev.stars} Golden Stars">
                        ${renderStarsHtml(rev.stars)}
                    </span>
                    <span class="detail-review-source">
                        <span class="g-icon-multicolor" aria-hidden="true">G</span>
                        <span>${rev.source}</span>
                    </span>
                </div>
                <p class="detail-review-text">"${rev.text}"</p>
            </div>
        `).join("");
    }
}

function openProjectDetail(index) {
    renderProjectDetailView(index);
    const pageView = document.getElementById("projectDetailModal");
    if (pageView) {
        pageView.classList.add("open");
        pageView.setAttribute("aria-hidden", "false");
        pageView.scrollTop = 0;
        document.body.style.overflow = "hidden";
    }
}

function closeProjectDetail() {
    const pageView = document.getElementById("projectDetailModal");
    if (pageView) {
        pageView.classList.remove("open");
        pageView.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }
}

function navigateProjectDetail(direction) {
    const total = RECENT_PROJECTS_DATA.length;
    const nextIdx = (currentProjectIndex + direction + total) % total;
    renderProjectDetailView(nextIdx);
}

// --------------------------------------------------------------------------
// DEDICATED FULL-PAGE VIEW 2: SHOP IMAGE PAGE (main.png Only + Back Button)
// --------------------------------------------------------------------------
function openShopImagePage() {
    const shopPage = document.getElementById("shopImageViewPage");
    const shopDedicatedImg = document.getElementById("shopDedicatedImg");
    const heroMainImg = document.getElementById("heroMainImg");

    if (shopDedicatedImg && heroMainImg && heroMainImg.getAttribute("src")) {
        shopDedicatedImg.src = heroMainImg.getAttribute("src");
    }

    if (shopPage) {
        shopPage.classList.add("open");
        shopPage.setAttribute("aria-hidden", "false");
        shopPage.scrollTop = 0;
        document.body.style.overflow = "hidden";
    }
}

function closeShopImagePage() {
    const shopPage = document.getElementById("shopImageViewPage");
    if (shopPage) {
        shopPage.classList.remove("open");
        shopPage.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }
}

// Keyboard & Touch Interactions
function initPageInteractions() {
    const projPage = document.getElementById("projectDetailModal");
    const shopPage = document.getElementById("shopImageViewPage");
    const card = document.getElementById("projectDetailCard");

    document.addEventListener("keydown", (e) => {
        if (projPage && projPage.classList.contains("open")) {
            if (e.key === "Escape") closeProjectDetail();
            if (e.key === "ArrowRight") navigateProjectDetail(1);
            if (e.key === "ArrowLeft") navigateProjectDetail(-1);
        } else if (shopPage && shopPage.classList.contains("open")) {
            if (e.key === "Escape") closeShopImagePage();
        }
    });

    // Touch swipe left/right on mobile inside Project Detail Page
    let touchStartX = 0;
    let touchEndX = 0;
    if (card) {
        card.addEventListener("touchstart", (e) => {
            if (e.changedTouches && e.changedTouches.length > 0) {
                touchStartX = e.changedTouches[0].screenX;
            }
        }, { passive: true });

        card.addEventListener("touchend", (e) => {
            if (e.changedTouches && e.changedTouches.length > 0) {
                touchEndX = e.changedTouches[0].screenX;
                const diffX = touchStartX - touchEndX;
                if (Math.abs(diffX) > 55) {
                    if (diffX > 0) {
                        navigateProjectDetail(1);
                    } else {
                        navigateProjectDetail(-1);
                    }
                }
            }
        }, { passive: true });
    }

    // Keyboard accessibility for clickable cards
    document.querySelectorAll(".portfolio-photo-wrap.project-clickable").forEach((wrap, idx) => {
        wrap.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openProjectDetail(idx);
            }
        });
    });

    document.querySelectorAll(".shop-img-clickable").forEach(wrap => {
        wrap.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openShopImagePage();
            }
        });
    });
}
initPageInteractions();

// Export global handlers
window.handleImageFallback = handleImageFallback;
window.selectService = selectService;
window.openDirectWhatsApp = openDirectWhatsApp;
window.openProjectDetail = openProjectDetail;
window.closeProjectDetail = closeProjectDetail;
window.navigateProjectDetail = navigateProjectDetail;
window.openShopImagePage = openShopImagePage;
window.closeShopImagePage = closeShopImagePage;
window.copyToClipboard = copyToClipboard;
