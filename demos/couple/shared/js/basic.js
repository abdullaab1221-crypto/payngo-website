/**
 * WebNest Couple & Love — Basic level extras (WN-CL-BAS-001)
 */
(function () {
  'use strict';

  // Gentle parallax on the hero script title
  var script = document.querySelector('.cl-hero__script');
  if (script) {
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset;
      if (y < window.innerHeight) {
        script.style.transform = 'translateY(' + y * 0.22 + 'px)';
      }
    }, { passive: true });
  }
})();
