/* =========================================================
   SAYEEM AKBER PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. PAGE LOADER
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("loaded");
            }

        }, 500);

    });


    /* =====================================================
       02. HEADER SCROLL EFFECT
    ===================================================== */

    const siteHeader = document.getElementById("siteHeader");

    const handleHeaderScroll = () => {

        if (!siteHeader) return;

        if (window.scrollY > 50) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    };

    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );


    /* =====================================================
       03. MOBILE NAVIGATION
    ===================================================== */

    const mobileMenuToggle =
        document.getElementById("mobileMenuToggle");

    const mainNavigation =
        document.getElementById("mainNavigation");

    if (mobileMenuToggle && mainNavigation) {

        mobileMenuToggle.addEventListener("click", () => {

            const isOpen =
                mainNavigation.classList.toggle("mobile-open");

            mobileMenuToggle.classList.toggle(
                "active",
                isOpen
            );

            mobileMenuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        /* Close menu when clicking a navigation link */

        const navLinks =
            mainNavigation.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNavigation.classList.remove(
                    "mobile-open"
                );

                mobileMenuToggle.classList.remove(
                    "active"
                );

                mobileMenuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });

    }


    /* =====================================================
       04. SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                siteHeader
                    ? siteHeader.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       05. ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".main-navigation .nav-link"
        );

    const updateActiveNavigation = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY +
            (siteHeader
                ? siteHeader.offsetHeight + 100
                : 120);

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };

    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* =====================================================
       06. EXPERIENCE FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const experienceItems =
        document.querySelectorAll(".experience-item");

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;


            /* Active button */

            filterButtons.forEach((btn) => {

                btn.classList.remove("active");

            });

            button.classList.add("active");


            /* Filter items */

            experienceItems.forEach((item) => {

                const category =
                    item.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    item.classList.remove("hidden");

                } else {

                    item.classList.add("hidden");

                }

            });

        });

    });


    /* =====================================================
       07. REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-header, " +
            ".section-title, " +
            ".about-text, " +
            ".detail-item, " +
            ".competency-card, " +
            ".experience-item, " +
            ".education-item, " +
            ".certification-card, " +
            ".award-item, " +
            ".project-card, " +
            ".contact-info, " +
            ".contact-form-wrapper, " +
            ".hire-box"
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       08. STAGGER ANIMATION
    ===================================================== */

    const staggerGroups = [
        ".competency-grid",
        ".certification-grid",
        ".projects-grid"
    ];


    staggerGroups.forEach((selector) => {

        const group =
            document.querySelector(selector);

        if (!group) return;

        const children =
            group.children;

        Array.from(children).forEach(
            (child, index) => {

                child.style.transitionDelay =
                    `${index * 0.08}s`;

            }
        );

    });


    /* =====================================================
       09. CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        ?.value.trim();

                const email =
                    document
                        .getElementById("email")
                        ?.value.trim();

                const subject =
                    document
                        .getElementById("subject")
                        ?.value.trim();

                const message =
                    document
                        .getElementById("message")
                        ?.value.trim();


                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please complete all fields.";

                        formMessage.style.color =
                            "#ff6b6b";

                    }

                    return;

                }


                /* Basic email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please enter a valid email address.";

                        formMessage.style.color =
                            "#ff6b6b";

                    }

                    return;

                }


                /*
                 * Demo success state.
                 *
                 * Later you can connect this form
                 * to Formspree, EmailJS, PHP, WPForms,
                 * or your own backend.
                 */

                if (formMessage) {

                    formMessage.textContent =
                        "Thanks! Your message is ready to send.";

                    formMessage.style.color =
                        "#82ff1f";

                }


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       10. BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    if (backToTop) {

        const toggleBackToTop = () => {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        };


        toggleBackToTop();

        window.addEventListener(
            "scroll",
            toggleBackToTop,
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       11. CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       12. PROFILE CARD MOUSE EFFECT
    ===================================================== */

    const profileCard =
        document.querySelector(".profile-card");


    if (
        profileCard &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        profileCard.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    profileCard.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -3;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    3;


                profileCard.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        profileCard.addEventListener(
            "mouseleave",
            () => {

                profileCard.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       13. HERO PARALLAX
    ===================================================== */

    const heroGlowOne =
        document.querySelector(
            ".hero-glow-one"
        );

    const heroGlowTwo =
        document.querySelector(
            ".hero-glow-two"
        );


    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;


            if (heroGlowOne) {

                heroGlowOne.style.transform =
                    `translate3d(
                        0,
                        ${scroll * 0.12}px,
                        0
                    )`;

            }


            if (heroGlowTwo) {

                heroGlowTwo.style.transform =
                    `translate3d(
                        0,
                        ${scroll * -0.06}px,
                        0
                    )`;

            }

        },
        { passive: true }
    );


    /* =====================================================
       14. PROJECT IMAGE FALLBACK
    ===================================================== */

    const projectImages =
        document.querySelectorAll(
            ".project-image img"
        );


    projectImages.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.style.display = "none";

                const parent =
                    image.closest(".project-image");

                if (parent) {

                    parent.style.background =
                        "linear-gradient(135deg, #101010, #171717)";

                }

            }
        );

    });


    /* =====================================================
       15. PROFILE IMAGE FALLBACK
    ===================================================== */

    const profileImage =
        document.querySelector(
            ".profile-image"
        );


    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                profileImage.style.display =
                    "none";

            }
        );

    }


    /* =====================================================
       16. ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                mainNavigation &&
                mainNavigation.classList.contains(
                    "mobile-open"
                )
            ) {

                mainNavigation.classList.remove(
                    "mobile-open"
                );

                mobileMenuToggle?.classList.remove(
                    "active"
                );

                mobileMenuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =====================================================
       17. RESIZE HANDLER
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                mainNavigation
            ) {

                mainNavigation.classList.remove(
                    "mobile-open"
                );

                mobileMenuToggle?.classList.remove(
                    "active"
                );

                mobileMenuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =====================================================
       18. CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cSayeem Akber Portfolio",
        "color:#82ff1f;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cBrand Designer • WordPress Developer • AI Developer",
        "color:#aaa;font-size:12px;"
    );

});

/* =========================================================
   08. PERFORMANCE-OPTIMIZED MOTION SYSTEM
   One RAF loop + throttled scroll + one cursor
========================================================= */

(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    /* ---------- Reveal: single observer ---------- */
    const revealItems = document.querySelectorAll(
        ".reveal-up,.about-text,.detail-item,.competency-card," +
        ".experience-item,.education-item,.certification-card," +
        ".award-item,.project-card,.contact-form,.contact-form-wrapper,.hire-box"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible", "visible", "journey-in-view");
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

        revealItems.forEach((el, i) => {
            el.classList.add("reveal");
            if (!reduce) el.style.transitionDelay = `${Math.min((i % 6) * 55, 275)}ms`;
            observer.observe(el);
        });
    } else {
        revealItems.forEach(el => el.classList.add("is-visible", "visible", "journey-in-view"));
    }

    /* ---------- Experience filter ---------- */
    const list = document.querySelector(".cinematic-timeline");
    if (list) {
        const items = [...list.querySelectorAll(".experience-item")];
        const buttons = [...document.querySelectorAll(".experience-filters .filter-btn")];

        const applyFilter = filter => {
            items.forEach((item, i) => {
                const show = filter === "all" || item.dataset.category === filter;
                item.classList.toggle("hidden", !show);
                if (show && !reduce) {
                    item.style.animationDelay = `${Math.min(i * 60, 240)}ms`;
                }
            });
        };

        buttons.forEach(btn => btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.toggle("active", b === btn));
            applyFilter(btn.dataset.filter || "all");
        }));

        applyFilter("all");
    }

    if (reduce) return;

    /* ---------- Single cinematic cursor ---------- */
    if (finePointer) {
        const cursor = document.createElement("div");
        cursor.className = "cinematic-cursor";
        document.body.appendChild(cursor);

        let tx = -100, ty = -100;
        let x = tx, y = ty;
        let raf = 0;

        window.addEventListener("pointermove", e => {
            tx = e.clientX;
            ty = e.clientY;
            cursor.classList.add("is-visible");
            if (!raf) raf = requestAnimationFrame(updateCursor);
        }, { passive: true });

        function updateCursor() {
            x += (tx - x) * 0.20;
            y += (ty - y) * 0.20;
            cursor.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;

            if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) {
                raf = requestAnimationFrame(updateCursor);
            } else {
                raf = 0;
            }
        }

        document.addEventListener("pointerover", e => {
            if (e.target.closest("a,button,input,textarea,select,.btn,.skill-tag,.nav-link,.competency-card,.certification-card,.experience-main,.project-card,.award-item,.filter-btn")) {
                cursor.classList.add("is-hover");
            }
        }, { passive: true });

        document.addEventListener("pointerout", e => {
            if (e.target.closest("a,button,input,textarea,select,.btn,.skill-tag,.nav-link,.competency-card,.certification-card,.experience-main,.project-card,.award-item,.filter-btn")) {
                cursor.classList.remove("is-hover");
            }
        }, { passive: true });
    }

    /* ---------- Lightweight card tilt: only active card ---------- */
    if (finePointer) {
        const tiltCards = document.querySelectorAll(".profile-card");
        tiltCards.forEach(card => {
            let raf = 0;
            let lastX = 0, lastY = 0;

            card.addEventListener("pointermove", e => {
                lastX = e.clientX;
                lastY = e.clientY;
                if (raf) return;

                raf = requestAnimationFrame(() => {
                    const r = card.getBoundingClientRect();
                    const px = (lastX - r.left) / r.width - 0.5;
                    const py = (lastY - r.top) / r.height - 0.5;
                    card.style.transform =
                        `perspective(1000px) rotateX(${-py * 3}deg) rotateY(${px * 4}deg) translateY(-5px)`;
                    raf = 0;
                });
            }, { passive: true });

            card.addEventListener("pointerleave", () => {
                card.style.transform = "";
            }, { passive: true });
        });
    }

    /* ---------- Stagger without extra observers ---------- */
    [".competency-grid", ".competencies-grid", ".certification-grid",
     ".certifications-grid", ".projects-grid", ".awards-grid"].forEach(selector => {
        const group = document.querySelector(selector);
        if (!group) return;
        [...group.children].forEach((child, i) => {
            child.style.setProperty("--stagger-delay", `${Math.min(i * 55, 275)}ms`);
        });
    });
})();

/* =========================================================
   END PERFORMANCE MOTION SYSTEM
========================================================= */
