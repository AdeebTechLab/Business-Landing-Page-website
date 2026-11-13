/**
 * ADEEB TECHNOLOGY LAB - INTERACTIVE JAVASCRIPT
 * Bahawalpur, Pakistan | WhatsApp: 0309-2333121 | info_adeebTechlab@gmail.com
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. STICKY NAVBAR & NAVBAR BACKGROUND ON SCROLL
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header Background Change
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section Link Highlight
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  /* --------------------------------------------------------------------------
     2. MOBILE HAMBURGER MENU (OPEN / CLOSE WITH JS)
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. DARK MODE TOGGLE (RICH NAVY-SLATE THEME WITH LOCALSTORAGE CACHE)
     -------------------------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const themeIcon = themeToggle.querySelector('i');

  // Load saved theme preference
  const savedTheme = localStorage.getItem('atl-theme');
  if (savedTheme === 'dark') {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('atl-theme', 'light');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('atl-theme', 'dark');
    }
  });

  /* --------------------------------------------------------------------------
     4. HERO HEADLINE ANIMATED TEXT ROTATION
     -------------------------------------------------------------------------- */
  const animatedWords = document.querySelectorAll('.animated-word');
  let currentWordIndex = 0;

  if (animatedWords.length > 0) {
    setInterval(() => {
      animatedWords[currentWordIndex].classList.remove('active');
      currentWordIndex = (currentWordIndex + 1) % animatedWords.length;
      animatedWords[currentWordIndex].classList.add('active');
    }, 2800);
  }

  /* --------------------------------------------------------------------------
     5. SCROLL REVEAL OBSERVER (Smooth Entrance)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --------------------------------------------------------------------------
     6. ANIMATED STATS COUNTERS (Count Up From 0 to Target When Visible)
     -------------------------------------------------------------------------- */
  const statsCounters = document.querySelectorAll('.counter-number');
  let counted = false;

  const countUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statsCounters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // 2 seconds
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const counterTimer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out quart
            const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 4)));

            counter.innerText = currentCount;

            if (frame === totalFrames) {
              counter.innerText = target;
              clearInterval(counterTimer);
            }
          }, frameDuration);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });

  const statsSection = document.getElementById('stats-counter-section');
  if (statsSection) {
    countUpObserver.observe(statsSection);
  }

  /* --------------------------------------------------------------------------
     7. SERVICES FILTERING
     -------------------------------------------------------------------------- */
  const serviceFilterBtns = document.querySelectorAll('#services-filter .filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     8. PORTFOLIO FILTERING & LIGHTBOX
     -------------------------------------------------------------------------- */
  const portfolioFilterBtns = document.querySelectorAll('#portfolio-filter .filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  portfolioFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      portfolioFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger-btn');

  const openLightbox = (src, title, category) => {
    lightboxImg.src = src;
    lightboxTitle.innerText = title;
    lightboxTag.innerText = category;
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  };

  lightboxTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const title = btn.getAttribute('data-title');
      const category = btn.getAttribute('data-category');
      openLightbox(src, title, category);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  /* --------------------------------------------------------------------------
     9. PRICING PLANS TOGGLE (Monthly / Yearly in PKR)
     -------------------------------------------------------------------------- */
  const pricingToggle = document.getElementById('pricing-toggle');
  const monthlyLabel = document.querySelector('.billing-label.monthly');
  const yearlyLabel = document.querySelector('.billing-label.yearly');
  const priceAmounts = document.querySelectorAll('.pricing-card .amount');
  const billedNotes = document.querySelectorAll('.pricing-card .billed-note');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isYearly = pricingToggle.checked;

      if (isYearly) {
        monthlyLabel.classList.remove('active');
        yearlyLabel.classList.add('active');

        priceAmounts.forEach(amt => {
          amt.innerText = amt.getAttribute('data-yearly');
        });

        billedNotes.forEach(note => {
          note.innerText = note.getAttribute('data-yearly');
        });
      } else {
        yearlyLabel.classList.remove('active');
        monthlyLabel.classList.add('active');

        priceAmounts.forEach(amt => {
          amt.innerText = amt.getAttribute('data-monthly');
        });

        billedNotes.forEach(note => {
          note.innerText = note.getAttribute('data-monthly');
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. FAQ ACCORDION (One Open at a Time)
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    // Set initial maxHeight for active item
    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* --------------------------------------------------------------------------
     11. TESTIMONIALS SLIDER / CAROUSEL (Auto-play 5s + Prev/Next + Dots)
     -------------------------------------------------------------------------- */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  let currentSlide = 0;
  let slideInterval = null;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (dots[i]) dots[i].classList.remove('active');
    });

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetSlideTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetSlideTimer(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(index);
      resetSlideTimer();
    });
  });

  const startSlideTimer = () => {
    slideInterval = setInterval(nextSlide, 5000);
  };

  const resetSlideTimer = () => {
    clearInterval(slideInterval);
    startSlideTimer();
  };

  startSlideTimer();

  /* --------------------------------------------------------------------------
     12. CONTACT FORM JAVASCRIPT VALIDATION & SUBMISSION
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const phoneInput = document.getElementById('contact-phone');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const successAlert = document.getElementById('form-success-alert');

  const setError = (input, errorId, message) => {
    const parentWrapper = input.closest('.input-wrapper');
    const errorEl = document.getElementById(errorId);
    if (parentWrapper) parentWrapper.classList.add('error');
    if (errorEl) errorEl.innerText = message;
  };

  const clearError = (input, errorId) => {
    const parentWrapper = input.closest('.input-wrapper');
    const errorEl = document.getElementById(errorId);
    if (parentWrapper) parentWrapper.classList.remove('error');
    if (errorEl) errorEl.innerText = '';
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Live input error cleanup
  [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        clearError(inp, `${inp.name}-error`);
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // 1. Name Check
      if (!nameInput.value.trim()) {
        setError(nameInput, 'name-error', 'Full Name is required.');
        isValid = false;
      } else {
        clearError(nameInput, 'name-error');
      }

      // 2. Email Check
      if (!emailInput.value.trim()) {
        setError(emailInput, 'email-error', 'Email address is required.');
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        setError(emailInput, 'email-error', 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearError(emailInput, 'email-error');
      }

      // 3. Phone Check (Minimum 10 digits for Pakistan / International)
      const cleanPhone = phoneInput.value.replace(/[^0-9]/g, '');
      if (!phoneInput.value.trim()) {
        setError(phoneInput, 'phone-error', 'Phone number is required.');
        isValid = false;
      } else if (cleanPhone.length < 10) {
        setError(phoneInput, 'phone-error', 'Phone number must have at least 10 digits.');
        isValid = false;
      } else {
        clearError(phoneInput, 'phone-error');
      }

      // 4. Subject Check
      if (!subjectInput.value.trim()) {
        setError(subjectInput, 'subject-error', 'Subject is required.');
        isValid = false;
      } else {
        clearError(subjectInput, 'subject-error');
      }

      // 5. Message Check
      if (!messageInput.value.trim()) {
        setError(messageInput, 'message-error', 'Message cannot be empty.');
        isValid = false;
      } else if (messageInput.value.trim().length < 15) {
        setError(messageInput, 'message-error', 'Please provide at least 15 characters describing your project.');
        isValid = false;
      } else {
        clearError(messageInput, 'message-error');
      }

      // On Successful Validation
      if (isValid) {
        const submitBtn = document.getElementById('contact-submit-btn');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent Successfully!';
          successAlert.style.display = 'flex';
          contactForm.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
          }, 3500);
        }, 1200);
      }
    });
  }

  /* --------------------------------------------------------------------------
     13. NEWSLETTER FORM VALIDATION
     -------------------------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterEmail = document.getElementById('newsletter-email');
  const newsletterMsg = document.getElementById('newsletter-msg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = newsletterEmail.value.trim();

      if (!val) {
        newsletterMsg.innerText = 'Please enter your email.';
        newsletterMsg.className = 'newsletter-msg error';
      } else if (!validateEmail(val)) {
        newsletterMsg.innerText = 'Enter a valid email address.';
        newsletterMsg.className = 'newsletter-msg error';
      } else {
        newsletterMsg.innerText = 'Subscribed successfully! Thank you.';
        newsletterMsg.className = 'newsletter-msg success';
        newsletterEmail.value = '';
        setTimeout(() => { newsletterMsg.innerText = ''; }, 4000);
      }
    });
  }

  /* --------------------------------------------------------------------------
     14. CHATTERBOT AI ASSISTANT (DRAWER TOGGLE & INTERACTIVE RESPONSES)
     -------------------------------------------------------------------------- */
  const chatterbotLauncher = document.getElementById('chatterbot-launcher');
  const chatterbotDrawer = document.getElementById('chatterbot-drawer');
  const chatterbotClose = document.getElementById('chatterbot-close');
  const chatterbotMessages = document.getElementById('chatterbot-messages');
  const botChips = document.querySelectorAll('.bot-chip');

  if (chatterbotLauncher && chatterbotDrawer) {
    chatterbotLauncher.addEventListener('click', () => {
      const isActive = chatterbotDrawer.classList.contains('active');
      if (isActive) {
        chatterbotDrawer.classList.remove('active');
      } else {
        chatterbotDrawer.classList.add('active');
      }
    });

    if (chatterbotClose) {
      chatterbotClose.addEventListener('click', () => {
        chatterbotDrawer.classList.remove('active');
      });
    }

    // Bot Quick Chips Responses
    const botReplies = {
      'Services': 'We specialize in UI/UX Product Design, Custom Web Applications, E-Commerce Stores, and SEO/Paid Marketing. Would you like a quote for a specific service?',
      'Pricing': 'Our starter package begins at PKR 15,000/mo, Business Growth at PKR 35,000/mo, and Corporate Scale at PKR 75,000/mo with 20% annual discounts!',
      'Location': 'Our office is located at Bhatta No#1 Chowk, Gulberg Road, Abbas Colony St No# 2, Bahawalpur. You are welcome to visit us!',
      'WhatsApp': 'You can chat directly with our engineering lead on WhatsApp at 0309-2333121 (+92 309 2333121) for instantaneous project coordination.'
    };

    botChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        
        // Append user selection
        const userMsg = document.createElement('div');
        userMsg.className = 'user-msg';
        userMsg.style.textAlign = 'right';
        userMsg.innerHTML = `<div class="msg-bubble" style="background:var(--primary);color:#fff;display:inline-block;margin-left:auto;">${chip.innerText}</div>`;
        chatterbotMessages.appendChild(userMsg);

        // Append bot reply
        setTimeout(() => {
          const botMsg = document.createElement('div');
          botMsg.className = 'bot-msg';
          botMsg.innerHTML = `<div class="msg-bubble">${botReplies[query] || 'Feel free to connect on WhatsApp directly at 0309-2333121!'}</div>`;
          chatterbotMessages.appendChild(botMsg);
          chatterbotMessages.scrollTop = chatterbotMessages.scrollHeight;

          if (query === 'WhatsApp') {
            window.open('https://wa.me/923092333121?text=Hello%20Adeeb%20Technology%20Lab!%20I%20contacted%20via%20Axon AI%20AI.', '_blank');
          }
        }, 400);

        chatterbotMessages.scrollTop = chatterbotMessages.scrollHeight;
      });
    });
  }

  // Dynamic Current Year in Footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.innerText = new Date().getFullYear();
  }
});
