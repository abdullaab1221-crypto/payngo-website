/**
 * WebNest Birthday — Shared Base JS
 * Used by WN-BD-BAS-001, WN-BD-MOD-001, WN-BD-EXP-001
 */
(function () {
  'use strict';

  // ========================================
  // Header scroll effect
  // ========================================
  var header = document.querySelector('.bd-header');
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
  var burger = document.querySelector('.bd-burger');
  var mobile = document.querySelector('.bd-mobile');
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
  var navLinks = document.querySelectorAll('.bd-nav a, .bd-footer__nav a, .bd-mobile a[data-link]');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    }
  });

  // ========================================
  // Reveal on scroll (IntersectionObserver)
  // ========================================
  var reveals = document.querySelectorAll('.bd-reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-delay');
          if (delay) {
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, parseInt(delay) * 120);
          } else {
            entry.target.classList.add('visible');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // ========================================
  // Lightbox
  // ========================================
  var lightbox = document.querySelector('.bd-lightbox');
  var lbImg = lightbox ? lightbox.querySelector('img') : null;
  var photos = document.querySelectorAll('.bd-photo');

  photos.forEach(function (photo) {
    photo.addEventListener('click', function () {
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
    lightbox.querySelector('.bd-lightbox__close').addEventListener('click', function () {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ========================================
  // Countdown
  // ========================================
  var countdownEl = document.querySelector('.bd-countdown');
  if (countdownEl) {
    var targetDate = countdownEl.getAttribute('data-date');
    if (targetDate) {
      var target = new Date(targetDate).getTime();
      var updateCountdown = function () {
        var now = new Date().getTime();
        var diff = target - now;
        if (diff <= 0) {
          countdownEl.querySelectorAll('.bd-countdown__num').forEach(function (el) {
            el.textContent = '0';
          });
          return;
        }
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((diff % (1000 * 60)) / 1000);
        var items = countdownEl.querySelectorAll('.bd-countdown__num');
        if (items[0]) items[0].textContent = days;
        if (items[1]) items[1].textContent = hours;
        if (items[2]) items[2].textContent = mins;
        if (items[3]) items[3].textContent = secs;
      };
      updateCountdown();
      setInterval(updateCountdown, 1000);
    }
  }

  // ========================================
  // Confetti particles
  // ========================================
  var confettiContainer = document.querySelector('.bd-hero');
  if (confettiContainer) {
    var colors = ['#f5a623', '#ffd97d', '#ff6b6b', '#a855f7', '#2dd4bf', '#ffbe0b'];
    for (var i = 0; i < 20; i++) {
      var particle = document.createElement('div');
      particle.className = 'bd-confetti';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDuration = (4 + Math.random() * 6) + 's';
      particle.style.animationDelay = (Math.random() * 5) + 's';
      particle.style.width = (4 + Math.random() * 6) + 'px';
      particle.style.height = (4 + Math.random() * 6) + 'px';
      confettiContainer.appendChild(particle);
    }
  }

})();
