/**
 * WebNest Couple & Love — Moderate level extras (WN-CL-MOD-001)
 * Adds: click-to-spawn hearts, hero parallax, letter type-in effect
 */
(function () {
  'use strict';

  // ========================================
  // Click anywhere to spawn a floating heart
  // ========================================
  function spawnHeart(x, y) {
    var heart = document.createElement('span');
    heart.className = 'cl-heart-float';
    heart.textContent = '\u2764';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.zIndex = '3000';
    heart.style.fontSize = (14 + Math.random() * 22) + 'px';
    heart.style.opacity = '0';
    heart.style.transition = 'transform 1.4s cubic-bezier(0.22,1,0.36,1), opacity 1.4s ease';
    document.body.appendChild(heart);

    requestAnimationFrame(function () {
      heart.style.opacity = '0.9';
      heart.style.transform = 'translateY(-140px) rotate(20deg) scale(1.3)';
    });

    setTimeout(function () {
      heart.style.opacity = '0';
      setTimeout(function () { heart.remove(); }, 1400);
    }, 900);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('a, button')) return;
    if (e.target.closest('.cl-photo, .cl-lightbox')) return;
    spawnHeart(e.clientX, e.clientY);
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
        var depth = (i + 1) * 18;
        orb.style.transform = 'translate(' + (cx * depth) + 'px, ' + (cy * depth) + 'px)';
      });
    });
  }

  // ========================================
  // Type-in effect for final message page
  // ========================================
  var typeEl = document.querySelector('[data-type]');
  if (typeEl) {
    var full = typeEl.getAttribute('data-type');
    var i = 0;
    var typing = setInterval(function () {
      i++;
      typeEl.textContent = full.slice(0, i);
      if (i >= full.length) clearInterval(typing);
    }, 26);
  }
})();
