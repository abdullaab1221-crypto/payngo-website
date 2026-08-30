/**
 * WebNest Digital Gifts — Shared Base JS
 * Applies to WN-DG-BAS-001, WN-DG-MOD-001, WN-DG-EXP-001
 */
(function() {
  'use strict';

  /* ============ Header scroll ============ */
  var header = document.querySelector('.dg-header');
  if (header) {
    var onScroll = function() {
      header.classList.toggle('scrolled', window.pageYOffset > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============ Burger / Mobile menu ============ */
  var burger = document.querySelector('.dg-burger');
  var mobile = document.querySelector('.dg-mobile');
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
  var navLinks = document.querySelectorAll('.dg-nav a, .dg-footer__nav a, .dg-mobile a[data-link]');
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    }
  });

  /* ============ Reveal on scroll ============ */
  var reveals = document.querySelectorAll('.dg-reveal-anim');
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
  var lightbox = document.querySelector('.dg-lightbox');
  var lbImg = lightbox ? lightbox.querySelector('img') : null;
  var photos = document.querySelectorAll('.dg-photo, .dg-surprise__back-img');

  photos.forEach(function(photo) {
    photo.addEventListener('click', function(e) {
      if (e.target.closest('.dg-surprise')) return;
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
    lightbox.querySelector('.dg-lightbox__close').addEventListener('click', function() {
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
  var entrance = document.querySelector('.dg-entrance');
  var entranceBtn = document.querySelector('.dg-entrance__btn');
  if (entrance && entranceBtn) {
    entranceBtn.addEventListener('click', function() {
      entrance.classList.add('hidden');
      document.body.style.overflow = '';
    });
    document.body.style.overflow = 'hidden';
  }

  /* ============ Gift box click (Basic opening) ============ */
  var giftBox = document.querySelector('.dg-gift-box');
  if (giftBox) {
    giftBox.addEventListener('click', function() {
      var target = giftBox.getAttribute('data-target');
      if (target) {
        window.location.href = target;
      }
    });
  }

  /* ============ Surprise card flip ============ */
  var surpriseCards = document.querySelectorAll('.dg-surprise');
  surpriseCards.forEach(function(card) {
    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
    });
  });

  /* ============ Lightbox with navigation (Gallery) ============ */
  var galleryGrid = document.getElementById('dgGalleryGrid');
  var lbPrev = document.getElementById('dgLbPrev');
  var lbNext = document.getElementById('dgLbNext');
  var lbCounter = document.getElementById('dgLbCounter');
  var currentLbIndex = 0;
  var galleryImages = [];

  if (galleryGrid) {
    var galleryPhotos = galleryGrid.querySelectorAll('.dg-photo');
    galleryPhotos.forEach(function(photo, i) {
      var img = photo.querySelector('img');
      if (img) {
        galleryImages.push({ src: img.src, alt: img.alt });
        photo.addEventListener('click', function() {
          currentLbIndex = i;
          openGalleryLightbox();
        });
      }
    });
  }

  function openGalleryLightbox() {
    if (!galleryImages[currentLbIndex] || !lbImg) return;
    lbImg.src = galleryImages[currentLbIndex].src;
    lbImg.alt = galleryImages[currentLbIndex].alt;
    if (lbCounter) lbCounter.textContent = (currentLbIndex + 1) + ' / ' + galleryImages.length;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentLbIndex = (currentLbIndex - 1 + galleryImages.length) % galleryImages.length;
    openGalleryLightbox();
  }

  function showNext() {
    currentLbIndex = (currentLbIndex + 1) % galleryImages.length;
    openGalleryLightbox();
  }

  if (lbPrev) lbPrev.addEventListener('click', showPrev);
  if (lbNext) lbNext.addEventListener('click', showNext);

  document.addEventListener('keydown', function(e) {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'Escape') closeGalleryLightbox();
  });

})();
