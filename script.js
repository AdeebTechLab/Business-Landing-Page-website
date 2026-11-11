/**
 * ApexDigital - Interactive Landing Page Logic
 * Pure ES6+ JavaScript - Zero External Framework Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Sticky Navbar & Scroll Background Adaptation
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScrollEffects = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header background change
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top visibility
    if (scrollY > 450) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }

    // Active link highlighting on scroll
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects(); // Run on initial load

  // Back to Top action
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ==========================================================================
     2. Mobile Hamburger Drawer Menu
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  const toggleMobileMenu = () => {
    const isActive = navMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    document.body.style.overflow = isActive ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    navMenu.classList.remove('active');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', toggleMobileMenu);

  // Close when tapping menu links
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  });

  /* ==========================================================================
     3. Dark / Light Theme Toggle
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  // Check saved preference or OS default
  const savedTheme = localStorage.getItem('apex_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (isDark) => {
    if (isDark) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  };

  if (savedTheme) {
    applyTheme(savedTheme === 'dark');
  } else if (prefersDark) {
    applyTheme(true);
  }

  themeToggle.addEventListener('click', () => {
    const isCurrentlyDark = document.body.classList.contains('dark-theme');
    const newTheme = !isCurrentlyDark;
    applyTheme(newTheme);
    localStorage.setItem('apex_theme', newTheme ? 'dark' : 'light');
  });

  /* ==========================================================================
     4. Animated Hero Headline (Rotating Words Fade/Slide)
     ========================================================================== */
  const animatedWords = document.querySelectorAll('.animated-word');
  let currentWordIndex = 0;

  if (animatedWords.length > 0) {
    setInterval(() => {
      animatedWords[currentWordIndex].classList.remove('active');
      currentWordIndex = (currentWordIndex + 1) % animatedWords.length;
      animatedWords[currentWordIndex].classList.add('active');
    }, 2800);
  }

  /* ==========================================================================
     5. Scroll Reveal Animations (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ==========================================================================
     6. Stats Number Counters (Animated Count-Up)
     ========================================================================== */
  const counterElements = document.querySelectorAll('.counter-number, .stat-number');
  let countersAnimated = false;

  const animateCounters = () => {
    counterElements.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        // Ease out quadratic function for smooth slowdown
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeOutQuad * target);

        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsSection = document.getElementById('stats-counter-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  }

  /* ==========================================================================
     7. Services Category Filtering
     ========================================================================== */
  const serviceFilterBtns = document.querySelectorAll('#services-filter .filter-btn');
  const serviceCards = document.querySelectorAll('.services-grid .service-card');

  serviceFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      serviceFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      serviceCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  /* ==========================================================================
     8. Portfolio Gallery Filtering & Lightbox Modal
     ========================================================================== */
  const portfolioFilterBtns = document.querySelectorAll('#portfolio-filter .filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-grid .portfolio-card');

  portfolioFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      portfolioFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      portfolioCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // Lightbox Modal Logic
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const triggerBtns = document.querySelectorAll('.lightbox-trigger-btn');

  const openLightbox = (src, title, category) => {
    lightboxImg.src = src;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxTag.textContent = category;
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImg.src = '';
    }, 250);
  };

  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = btn.getAttribute('data-src');
      const title = btn.getAttribute('data-title');
      const category = btn.getAttribute('data-category');
      openLightbox(src, title, category);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  /* ==========================================================================
     9. Pricing Monthly / Yearly Plan Toggle
     ========================================================================== */
  const pricingToggle = document.getElementById('pricing-toggle');
  const billingLabels = document.querySelectorAll('.billing-label');
  const priceAmounts = document.querySelectorAll('.plan-price .amount');
  const billedNotes = document.querySelectorAll('.billed-note');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isYearly = pricingToggle.checked;

      // Update labels highlight
      billingLabels[0].classList.toggle('active', !isYearly);
      billingLabels[1].classList.toggle('active', isYearly);

      // Transition prices smoothly
      priceAmounts.forEach((amt) => {
        amt.style.transform = 'scale(0.85)';
        setTimeout(() => {
          amt.textContent = isYearly ? amt.getAttribute('data-yearly') : amt.getAttribute('data-monthly');
          amt.style.transform = 'scale(1)';
        }, 120);
      });

      // Update billed notes
      billedNotes.forEach((note) => {
        note.textContent = isYearly ? note.getAttribute('data-yearly') : note.getAttribute('data-monthly');
      });
    });
  }

  /* ==========================================================================
     10. Testimonials Carousel / Slider (5-Second Auto-play)
     ========================================================================== */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  let currentSlide = 0;
  let autoplayTimer = null;

  const showSlide = (index) => {
    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
    }
  };

  if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay(); // Reset timer after manual click
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const slideIdx = parseInt(dot.getAttribute('data-index'), 10);
        showSlide(slideIdx);
        startAutoplay();
      });
    });

    // Pause on hover
    const carouselWrapper = document.querySelector('.testimonial-carousel-wrapper');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', stopAutoplay);
      carouselWrapper.addEventListener('mouseleave', startAutoplay);
    }

    startAutoplay();
  }

  /* ==========================================================================
     11. FAQ Accordion (Single Active Expanded)
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    // Set initial maxHeight for pre-opened item
    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    questionBtn.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Close all accordion items
      faqItems.forEach((other) => {
        other.classList.remove('active');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Toggle clicked item
      if (!isAlreadyActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     12. Contact Form Full Validation & Feedback
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const phoneInput = document.getElementById('contact-phone');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const successAlert = document.getElementById('form-success-alert');

  // Error container elements
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  const setError = (input, errorEl, message) => {
    const group = input.closest('.form-group');
    group.classList.add('has-error');
    errorEl.textContent = message;
  };

  const clearError = (input, errorEl) => {
    const group = input.closest('.form-group');
    group.classList.remove('has-error');
    errorEl.textContent = '';
  };

  // Real-time input clearing
  [
    { input: nameInput, error: nameError },
    { input: emailInput, error: emailError },
    { input: phoneInput, error: phoneError },
    { input: subjectInput, error: subjectError },
    { input: messageInput, error: messageError }
  ].forEach(({ input, error }) => {
    input.addEventListener('input', () => clearError(input, error));
  });

  // Email format regex RFC compliant
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(String(email).trim().toLowerCase());
  };

  // Phone validation: numbers, +, dashes, min 8 digits
  const isValidPhone = (phone) => {
    const cleanNumber = phone.replace(/[^0-9]/g, '');
    return cleanNumber.length >= 8;
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    // 1. Name check
    if (!nameInput.value.trim()) {
      setError(nameInput, nameError, 'Please enter your full name.');
      hasError = true;
    } else if (nameInput.value.trim().length < 2) {
      setError(nameInput, nameError, 'Name must contain at least 2 characters.');
      hasError = true;
    }

    // 2. Email check
    if (!emailInput.value.trim()) {
      setError(emailInput, emailError, 'Email address is required.');
      hasError = true;
    } else if (!isValidEmail(emailInput.value)) {
      setError(emailInput, emailError, 'Please enter a valid email format (e.g. user@domain.com).');
      hasError = true;
    }

    // 3. Phone check
    if (!phoneInput.value.trim()) {
      setError(phoneInput, phoneError, 'Phone number is required.');
      hasError = true;
    } else if (!isValidPhone(phoneInput.value)) {
      setError(phoneInput, phoneError, 'Please provide a valid phone number (minimum 8 digits).');
      hasError = true;
    }

    // 4. Subject check
    if (!subjectInput.value.trim()) {
      setError(subjectInput, subjectError, 'Please enter a subject line.');
      hasError = true;
    }

    // 5. Message check
    if (!messageInput.value.trim()) {
      setError(messageInput, messageError, 'Please provide your message or project requirements.');
      hasError = true;
    } else if (messageInput.value.trim().length < 15) {
      setError(messageInput, messageError, 'Please write at least 15 characters describing your project.');
      hasError = true;
    }

    if (!hasError) {
      // Simulate successful asynchronous dispatch
      const submitBtn = document.getElementById('contact-submit-btn');
      const originalBtnHTML = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;

        // Show confirmation banner
        successAlert.style.display = 'flex';
        contactForm.reset();

        // Scroll smoothly to alert
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto-dismiss after 8 seconds
        setTimeout(() => {
          successAlert.style.display = 'none';
        }, 8000);
      }, 700);
    }
  });

  /* ==========================================================================
     13. Footer Newsletter Form Validation
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterMsg = document.getElementById('newsletter-msg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailVal = newsletterEmail.value.trim();

      if (!emailVal) {
        newsletterMsg.className = 'newsletter-msg error';
        newsletterMsg.textContent = 'Please provide an email address.';
        return;
      }

      if (!isValidEmail(emailVal)) {
        newsletterMsg.className = 'newsletter-msg error';
        newsletterMsg.textContent = 'Please enter a valid email format.';
        return;
      }

      newsletterMsg.className = 'newsletter-msg success';
      newsletterMsg.textContent = 'Subscribed successfully! Welcome aboard.';
      newsletterEmail.value = '';

      setTimeout(() => {
        newsletterMsg.textContent = '';
      }, 5000);
    });
  }

  /* ==========================================================================
     14. Current Year Dynamic Auto-Update
     ========================================================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
