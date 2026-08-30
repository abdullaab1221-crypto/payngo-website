/**
 * WebNest Couple & Love — Shared Base JS
 * Used by WN-CL-BAS-001, WN-CL-MOD-001, WN-CL-EXP-001
 */
(function () {
  'use strict';

  var CONFIG = {
    whatsappNumber: '923281190004'
  };

  // ========================================
  // Header scroll effect
  // ========================================
  var header = document.querySelector('.cl-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.pageYOffset > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ========================================
  // Mobile menu
  // ========================================
  var burger = document.querySelector('.cl-burger');
  var mobile = document.querySelector('.cl-mobile');
  if (burger && mobile) {
    var toggleMenu = function (force) {
      var open = force !== undefined ? force : !mobile.classList.contains('active');
      mobile.classList.toggle('active', open);
      burger.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () { toggleMenu(); });
    mobile.addEventListener('click', function (e) {
      if (e.target.closest('a')) toggleMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') toggleMenu(false);
    });
  }

  // ========================================
  // Active nav link
  // ========================================
  var page = location.pathname.split('/').pop() || 'index.html';
  var navLinks = document.querySelectorAll('.cl-nav a, .cl-footer__nav a, .cl-mobile a[data-link]');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href') || '';
    if (href === page) link.classList.add('active');
  });

  // ========================================
  // Scroll reveal
  // ========================================
  var revealEls = document.querySelectorAll('.cl-reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ========================================
  // Floating hearts (hero + optional overlay)
  // ========================================
  var heartLayer = document.querySelector('.cl-hearts');
  if (heartLayer) {
    var COUNT = window.innerWidth < 768 ? 10 : 18;
    for (var h = 0; h < COUNT; h++) {
      var heart = document.createElement('i');
      heart.innerHTML = '\u2764';
      var size = 10 + Math.random() * 16;
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = size + 'px';
      heart.style.animationDuration = 9 + Math.random() * 10 + 's';
      heart.style.animationDelay = Math.random() * 8 + 's';
      heartLayer.appendChild(heart);
    }
  }

  // ========================================
  // Smooth scroll for anchors
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var y = target.getBoundingClientRect().top + window.pageYOffset - 76;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ========================================
  // Photo fade-in (graceful fallback art)
  // ========================================
  document.querySelectorAll('.cl-photo img').forEach(function (img) {
    img.addEventListener('load', function () { img.classList.add('loaded'); });
    if (img.complete && img.naturalWidth > 0) img.classList.add('loaded');
  });

  // ========================================
  // Lightbox for gallery
  // ========================================
  var lightbox = document.querySelector('.cl-lightbox');
  var lightboxImg = document.querySelector('.cl-lightbox img');
  var lightboxCap = document.querySelector('.cl-lightbox__cap');
  var photoEls = document.querySelectorAll('.cl-photo');
  var photos = Array.prototype.slice.call(photoEls).map(function (el) {
    var img = el.querySelector('img');
    return { src: img ? img.getAttribute('src') : '', cap: el.getAttribute('data-cap') || '' };
  });
  var current = 0;

  if (lightbox && lightboxImg) {
    var openLightbox = function (i) {
      current = i;
      if (lightboxImg) lightboxImg.setAttribute('src', photos[i].src || '');
      if (lightboxCap) lightboxCap.textContent = photos[i].cap || '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    var closeLightbox = function () {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    photoEls.forEach(function (el, i) {
      el.addEventListener('click', function () { openLightbox(i); });
    });

    lightbox.querySelector('.cl-lightbox__close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight' && photos.length) openLightbox((current + 1) % photos.length);
      if (e.key === 'ArrowLeft' && photos.length) openLightbox((current - 1 + photos.length) % photos.length);
    });
  }

  // ========================================
  // WhatsApp order buttons
  // ========================================
  document.querySelectorAll('[data-whatsapp]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var product = this.getAttribute('data-product') || 'Couple & Love website';
      var msg = 'Hi WebNest, I am interested in the "' + product + '" website. Please tell me about the available packages.';
      var base = CONFIG.whatsappNumber === 'YOUR_WHATSAPP_NUMBER'
        ? 'https://wa.me/?text=' + encodeURIComponent(msg)
        : 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(msg);
      window.open(base, '_blank', 'noopener,noreferrer');
    });
  });

  // ========================================
  // Footer year
  // ========================================
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

})();
