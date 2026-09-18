/* =========================================================
   SAYEEM AKBER PORTFOLIO — FAST / SMOOTH / RESPONSIVE ENGINE
   One scroll scheduler • one reveal observer • one cursor RAF
========================================================= */
(() => {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  const desktop = () => window.innerWidth > 900;

  /* ---------- Page loader: remove quickly after assets are ready ---------- */
  const loader = $("#pageLoader");
  const hideLoader = () => {
    if (!loader) return;
    loader.classList.add("loaded");
    window.setTimeout(() => { loader.hidden = true; }, 420);
  };
  if (document.readyState === "complete") {
    requestAnimationFrame(hideLoader);
  } else {
    window.addEventListener("load", () => requestAnimationFrame(hideLoader), { once: true, passive: true });
  }

  /* ---------- Elements ---------- */
  const header = $("#siteHeader");
  const backTop = $("#backToTop");
  const menuToggle = $("#mobileMenuToggle");
  const navigation = $("#mainNavigation");

  /* ---------- ONE scroll scheduler ---------- */
  let scrollTick = false;
  let lastScrolled = null;
  let lastBackTop = null;

  const updateScrollUI = () => {
    scrollTick = false;
    const y = window.scrollY || window.pageYOffset || 0;

    if (header) {
      const scrolled = y > 40;
      if (scrolled !== lastScrolled) {
        header.classList.toggle("scrolled", scrolled);
        lastScrolled = scrolled;
      }
    }

    if (backTop) {
      const visible = y > 650;
      if (visible !== lastBackTop) {
        backTop.classList.toggle("visible", visible);
        lastBackTop = visible;
      }
    }
  };

  const onScroll = () => {
    if (!scrollTick) {
      scrollTick = true;
      requestAnimationFrame(updateScrollUI);
    }
  };

  updateScrollUI();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  const closeMenu = () => {
    if (!navigation || !menuToggle) return;
    navigation.classList.remove("mobile-open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const open = !navigation.classList.contains("mobile-open");
      navigation.classList.toggle("mobile-open", open);
      menuToggle.classList.toggle("active", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });

    navigation.addEventListener("click", e => {
      if (e.target.closest("a")) closeMenu();
    });
  }

  /* ---------- Fast native smooth anchors ---------- */
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = $(id);
      if (!target) return;

      e.preventDefault();
      const offset = header ? header.getBoundingClientRect().height : 0;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset - 8);

      if (reduceMotion.matches) {
        window.scrollTo(0, top);
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }

      history.replaceState(null, "", id);
    });
  });

  /* ---------- Active navigation: IntersectionObserver, no scroll measurements ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$(".main-navigation .nav-link");

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const linkMap = new Map(
      navLinks.map(link => [link.getAttribute("href")?.slice(1), link])
    );

    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      navLinks.forEach(link => link.classList.remove("active"));
      linkMap.get(visible.target.id)?.classList.add("active");
    }, {
      rootMargin: "-20% 0px -65% 0px",
      threshold: [0, 0.15, 0.35, 0.6]
    });

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ---------- Experience filter: class-only, no layout animation ---------- */
  const filterButtons = $$(".filter-btn");
  const experienceItems = $$(".experience-item");

  const applyFilter = filter => {
    experienceItems.forEach(item => {
      const show = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hidden", !show);
      if (show) item.removeAttribute("aria-hidden");
      else item.setAttribute("aria-hidden", "true");
    });
  };

  if (filterButtons.length) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter || "all";
        filterButtons.forEach(btn => btn.classList.toggle("active", btn === button));
        applyFilter(filter);
      });
    });
    applyFilter("all");
  }

  /* ---------- Single lightweight reveal observer ---------- */
  const revealItems = $$(".reveal-up");
  if (revealItems.length) {
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      revealItems.forEach(el => el.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.04,
        rootMargin: "0px 0px 80px 0px"
      });
      revealItems.forEach(el => revealObserver.observe(el));
    }
  }

  /* ---------- Stagger via CSS variable only ---------- */
  [".competency-grid", ".competencies-grid", ".certification-grid",
   ".certifications-grid", ".projects-grid", ".awards-grid"].forEach(selector => {
    const group = $(selector);
    if (!group) return;
    [...group.children].forEach((child, i) => {
      child.style.setProperty("--stagger-delay", `${Math.min(i * 45, 180)}ms`);
    });
  });

  /* ---------- Contact form ---------- */
  const form = $("#contactForm");
  const message = $("#formMessage");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const name = $("#name")?.value.trim();
      const email = $("#email")?.value.trim();
      const subject = $("#subject")?.value.trim();
      const body = $("#message")?.value.trim();

      if (!name || !email || !subject || !body) {
        if (message) {
          message.textContent = "Please complete all fields.";
          message.style.color = "#ff6b6b";
        }
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (message) {
          message.textContent = "Please enter a valid email address.";
          message.style.color = "#ff6b6b";
        }
        return;
      }

      if (message) {
        message.textContent = "Thanks! Your message is ready to send.";
        message.style.color = "#82ff1f";
      }
      form.reset();
    });
  }

  /* ---------- Back to top ---------- */
  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion.matches ? "auto" : "smooth"
      });
    });
  }

  /* ---------- Desktop-only card tilt: one RAF per card ---------- */
  if (finePointer.matches && desktop() && !reduceMotion.matches) {
    $$(".profile-card").forEach(card => {
      let raf = 0;
      let px = 0, py = 0;

      const render = () => {
        raf = 0;
        const r = card.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (px - r.left) / r.width)) - 0.5;
        const y = Math.max(0, Math.min(1, (py - r.top) / r.height)) - 0.5;
        card.style.transform =
          `perspective(1000px) rotateX(${-y * 2.5}deg) rotateY(${x * 3.5}deg) translateY(-3px)`;
      };

      card.addEventListener("pointermove", e => {
        px = e.clientX; py = e.clientY;
        if (!raf) raf = requestAnimationFrame(render);
      }, { passive: true });

      card.addEventListener("pointerleave", () => {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        card.style.transform = "";
      }, { passive: true });
    });
  }

  /* ---------- Single cinematic cursor: desktop only, transform-only ---------- */
  if (finePointer.matches && desktop() && !reduceMotion.matches) {
    const cursor = document.createElement("div");
    cursor.className = "cinematic-cursor";
    cursor.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursor);

    let targetX = -100, targetY = -100;
    let x = targetX, y = targetY;
    let raf = 0;

    const renderCursor = () => {
      x += (targetX - x) * 0.28;
      y += (targetY - y) * 0.28;
      cursor.style.transform =
        `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;

      if (Math.abs(targetX - x) > 0.15 || Math.abs(targetY - y) > 0.15) {
        raf = requestAnimationFrame(renderCursor);
      } else {
        raf = 0;
      }
    };

    window.addEventListener("pointermove", e => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursor.classList.add("is-visible");
      if (!raf) raf = requestAnimationFrame(renderCursor);
    }, { passive: true });

    document.addEventListener("pointerover", e => {
      if (e.target.closest("a,button,input,textarea,select,.btn,.skill-tag,.filter-btn,.project-card,.competency-card,.certification-card,.award-item,.experience-main")) {
        cursor.classList.add("is-hover");
      }
    }, { passive: true });

    document.addEventListener("pointerout", e => {
      if (e.target.closest("a,button,input,textarea,select,.btn,.skill-tag,.filter-btn,.project-card,.competency-card,.certification-card,.award-item,.experience-main")) {
        cursor.classList.remove("is-hover");
      }
    }, { passive: true });
  }

  /* ---------- Current year ---------- */
  const year = $("#currentYear");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Clean up on resize ---------- */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  }, { passive: true });
})();
