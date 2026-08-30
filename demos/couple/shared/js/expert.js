/**
 * WebNest Couple & Love — Expert level extras (WN-CL-EXP-001)
 * Advanced animations, gallery filters, heart burst, hero parallax
 */
(function () {
  'use strict';

  // ========================================
  // Gallery filter tabs
  // ========================================
  var filterButtons = document.querySelectorAll('.cl-filter');
  if (filterButtons.length) {
    var galleryItems = document.querySelectorAll('.cl-gallery__item');

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          var match = filter === 'all' || item.getAttribute('data-group') === filter;
          item.classList.toggle('hidden', !match);
        });
      });
    });
  }

  // ========================================
  // Heart burst (final surprise + click)
  // ========================================
  var symbols = ['\u2764', '\u2665', '\u2764\uFE0F', '\u2728', '\u1F339'];

  function burstHearts(x, y, count) {
    count = count || 18;
    for (var i = 0; i < count; i++) {
      var h = document.createElement('span');
      h.className = 'cl-burst-heart';
      h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      h.style.left = x + 'px';
      h.style.top = y + 'px';
      h.style.fontSize = (14 + Math.random() * 22) + 'px';
      var angle = Math.random() * Math.PI * 2;
      var dist = 80 + Math.random() * 160;
      h.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      h.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      document.body.appendChild(h);
      setTimeout(function () { h.remove(); }, 1500);
    }
  }

  var surpriseBtn = document.querySelector('.cl-surprise__heart-btn');
  if (surpriseBtn) {
    var surpriseText = document.querySelector('.cl-surprise__text--reveal');
    var surpriseCount = 0;
    surpriseBtn.addEventListener('click', function (e) {
      var rect = surpriseBtn.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      burstHearts(cx, cy, 24);
      surpriseCount++;
      if (surpriseText && surpriseCount === 1) {
        setTimeout(function () { surpriseText.classList.add('show'); }, 400);
      }
    });
  }

  // ========================================
  // Click anywhere for a heart (outside UI)
  // ========================================
  document.addEventListener('click', function (e) {
    if (e.target.closest('a, button')) return;
    if (e.target.closest('.cl-photo, .cl-lightbox, .cl-flip')) return;
    burstHearts(e.clientX, e.clientY, 6);
  });

  // ========================================
  // Hero parallax on mouse move
  // ========================================
  var hero = document.querySelector('.cl-hero');
  if (hero && window.matchMedia('(pointer:fine)').matches) {
    var orbs = hero.querySelectorAll('.cl-hero__orb');
    hero.addEventListener('mousemove', function (e) {
      var cx = e.clientX / window.innerWidth - 0.5;
      var cy = e.clientY / window.innerHeight - 0.5;
      orbs.forEach(function (orb, i) {
        var depth = (i + 1) * 22;
        orb.style.transform = 'translate(' + (cx * depth) + 'px, ' + (cy * depth) + 'px)';
      });
    });
  }

  // ========================================
  // Type-in effect
  // ========================================
  var typeEl = document.querySelector('[data-type]');
  if (typeEl) {
    var full = typeEl.getAttribute('data-type');
    var i = 0;
    var typing = setInterval(function () {
      i++;
      typeEl.textContent = full.slice(0, i);
      if (i >= full.length) clearInterval(typing);
    }, 22);
  }
})();
