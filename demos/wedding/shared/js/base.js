/**
 * WebNest Wedding — Shared Base JS
 * Applies to WN-WD-BAS-001, WN-WD-MOD-001, WN-WD-EXP-001
 */
(function() {
  'use strict';

  /* ============ Header scroll ============ */
  var header = document.querySelector('.wd-header');
  if (header) {
    var onScroll = function() {
      header.classList.toggle('scrolled', window.pageYOffset > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============ Burger / Mobile menu ============ */
  var burger = document.querySelector('.wd-burger');
  var mobile = document.querySelector('.wd-mobile');
  if (burger && mobile) {
    var toggleMenu = function(force) {
      var open = force !== undefined ? force : !mobile.classList.contains('active');
      mobile.classList.toggle('active', open);
      burger.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function() { toggleMenu(); });
    mobile.addEventListener('click', function(e) {
      if (e.target.closest('a')) toggleMenu(false);
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') toggleMenu(false);
    });
  }

  /* ============ Active nav link ============ */
  var page = location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.wd-nav a, .wd-footer__nav a, .wd-mobile a[data-link]');
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    }
  });

  /* ============ Reveal on scroll ============ */
  var reveals = document.querySelectorAll('.wd-reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-delay');
          if (delay) {
            setTimeout(function() {
              entry.target.classList.add('visible');
            }, parseInt(delay) * 120);
          } else {
            entry.target.classList.add('visible');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function(el) { observer.observe(el); });
  } else {
    reveals.forEach(function(el) { el.classList.add('visible'); });
  }

  /* ============ Lightbox ============ */
  var lightbox = document.querySelector('.wd-lightbox');
  var lbImg = lightbox ? lightbox.querySelector('img') : null;
  var photos = document.querySelectorAll('.wd-photo');

  photos.forEach(function(photo) {
    photo.addEventListener('click', function() {
      var img = photo.querySelector('img');
      if (img && lbImg) {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightbox) {
    lightbox.querySelector('.wd-lightbox__close').addEventListener('click', function() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ============ Countdown ============ */
  var countdownEl = document.querySelector('.wd-countdown');
  if (countdownEl) {
    var targetDate = countdownEl.getAttribute('data-date');
    if (targetDate) {
      var target = new Date(targetDate).getTime();
      var updateCountdown = function() {
        var now = new Date().getTime();
        var diff = target - now;
        if (diff <= 0) {
          countdownEl.querySelectorAll('.wd-countdown__num').forEach(function(el) {
            el.textContent = '0';
          });
          return;
        }
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((diff % (1000 * 60)) / 1000);
        var items = countdownEl.querySelectorAll('.wd-countdown__num');
        if (items[0]) items[0].textContent = days;
        if (items[1]) items[1].textContent = hours;
        if (items[2]) items[2].textContent = mins;
        if (items[3]) items[3].textContent = secs;
      };
      updateCountdown();
      setInterval(updateCountdown, 1000);
    }
  }

  /* ============ Entrance animation (Expert) ============ */
  var entrance = document.querySelector('.wd-entrance');
  var entranceBtn = document.querySelector('.wd-entrance__btn');
  if (entrance && entranceBtn) {
    entranceBtn.addEventListener('click', function() {
      entrance.classList.add('hidden');
      document.body.style.overflow = '';
    });
    // Prevent scroll while entrance is visible
    document.body.style.overflow = 'hidden';
  }

  /* ============ RSVP form demo ============ */
  var rsvpForm = document.querySelector('.wd-rsvp__form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var submitBtn = rsvpForm.querySelector('.wd-rsvp__submit');
      if (submitBtn) {
        submitBtn.textContent = 'Thank You!';
        submitBtn.style.background = 'var(--whatsapp)';
        submitBtn.style.color = '#fff';
        setTimeout(function() {
          submitBtn.textContent = 'Send RSVP';
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          rsvpForm.reset();
        }, 3000);
      }
    });
  }

  /* ============ Petal particles (Expert) ============ */
  var petalContainer = document.querySelector('.wd-hero');
  if (petalContainer && document.querySelector('.wd-hero--premium')) {
    var colors = ['rgba(201,169,110,0.3)', 'rgba(196,162,135,0.25)', 'rgba(212,188,138,0.2)'];
    for (var i = 0; i < 15; i++) {
      var petal = document.createElement('div');
      petal.style.cssText = 'position:absolute;width:8px;height:8px;border-radius:50%;opacity:0.4;animation:wdFall linear infinite;pointer-events:none;';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.background = colors[Math.floor(Math.random() * colors.length)];
      petal.style.animationDuration = (6 + Math.random() * 8) + 's';
      petal.style.animationDelay = (Math.random() * 6) + 's';
      petalContainer.appendChild(petal);
    }

    // Add keyframes dynamically
    var style = document.createElement('style');
    style.textContent = '@keyframes wdFall{0%{transform:translateY(-10vh) rotate(0deg);opacity:0.6}100%{transform:translateY(110vh) rotate(360deg);opacity:0}}';
    document.head.appendChild(style);
  }

})();
