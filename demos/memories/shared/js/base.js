/**
 * WebNest Memories — Shared Base JS
 * Applies to WN-ME-BAS-001, WN-ME-MOD-001, WN-ME-EXP-001
 */
(function() {
  'use strict';

  /* ============ Header scroll ============ */
  var header = document.querySelector('.me-header');
  if (header) {
    var onScroll = function() {
      header.classList.toggle('scrolled', window.pageYOffset > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============ Burger / Mobile menu ============ */
  var burger = document.querySelector('.me-burger');
  var mobile = document.querySelector('.me-mobile');
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
  var navLinks = document.querySelectorAll('.me-nav a, .me-footer__nav a, .me-mobile a[data-link]');
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    }
  });

  /* ============ Reveal on scroll ============ */
  var reveals = document.querySelectorAll('.me-reveal');
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
  var lightbox = document.querySelector('.me-lightbox');
  var lbImg = lightbox ? lightbox.querySelector('img') : null;
  var photos = document.querySelectorAll('.me-photo, .me-memory__image');

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
    lightbox.querySelector('.me-lightbox__close').addEventListener('click', function() {
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

  /* ============ Entrance animation (Expert) ============ */
  var entrance = document.querySelector('.me-entrance');
  var entranceBtn = document.querySelector('.me-entrance__btn');
  if (entrance && entranceBtn) {
    entranceBtn.addEventListener('click', function() {
      entrance.classList.add('hidden');
      document.body.style.overflow = '';
    });
    document.body.style.overflow = 'hidden';
  }

  /* ============ Memory card flip (Expert) ============ */
  var memoryCards = document.querySelectorAll('.me-memory--flip');
  memoryCards.forEach(function(card) {
    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
    });
  });

})();
