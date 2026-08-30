/* ========================================
   WebNest Business — Shared Base JS
   ======================================== */
(function() {
  'use strict';

  const CONFIG = {
    whatsappNumber: '923281190004',
    prefix: 'biz'
  };

  /* --- Header Scroll --- */
  const header = document.querySelector('.biz-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* --- Burger / Mobile --- */
  const burger = document.querySelector('.biz-burger');
  const mobile = document.querySelector('.biz-mobile');
  const mobileClose = document.querySelector('.biz-mobile__close');
  if (burger && mobile) {
    burger.addEventListener('click', function() {
      mobile.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    function closeMobile() {
      mobile.classList.remove('open');
      document.body.style.overflow = '';
    }
    if (mobileClose) mobileClose.addEventListener('click', closeMobile);
    mobile.querySelectorAll('.biz-mobile__link').forEach(function(link) {
      link.addEventListener('click', closeMobile);
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMobile();
    });
  }

  /* --- Active Nav --- */
  var currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.biz-nav__link, .biz-mobile__link').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href && href.split('/').pop() === currentPath) {
      link.classList.add('active');
    }
  });

  /* --- Reveal on Scroll --- */
  var reveals = document.querySelectorAll('.biz-reveal');
  if (reveals.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(function() {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function(el) { observer.observe(el); });
  }

  /* --- Lightbox --- */
  var lightbox = document.querySelector('.biz-lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('.biz-lightbox__img') : null;
  var photos = [];
  var currentPhotoIndex = 0;

  document.querySelectorAll('.biz-gallery__item').forEach(function(item, i) {
    var img = item.querySelector('img');
    if (!img) return;
    photos.push(img.src);
    item.addEventListener('click', function() {
      currentPhotoIndex = i;
      openLightbox(img.src);
    });
  });

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (lightbox) {
    var closeBtn = lightbox.querySelector('.biz-lightbox__close');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });
    var prevBtn = lightbox.querySelector('.biz-lightbox__prev');
    var nextBtn = lightbox.querySelector('.biz-lightbox__next');
    if (prevBtn) prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
      lightboxImg.src = photos[currentPhotoIndex];
    });
    if (nextBtn) nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
      lightboxImg.src = photos[currentPhotoIndex];
    });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', function(e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && photos.length) {
      currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
      lightboxImg.src = photos[currentPhotoIndex];
    }
    if (e.key === 'ArrowRight' && photos.length) {
      currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
      lightboxImg.src = photos[currentPhotoIndex];
    }
  });

  /* --- WhatsApp --- */
  function buildWhatsAppUrl(productName) {
    var msg = 'Hello WebNest, I am interested in ' + productName + '.';
    return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent(msg);
  }

  document.querySelectorAll('[data-whatsapp]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var product = btn.getAttribute('data-product') || btn.getAttribute('data-whatsapp') || 'Business Website';
      window.open(buildWhatsAppUrl(product), '_blank');
    });
  });

  /* --- Admin Panel --- */
  var adminPanel = document.querySelector('.biz-admin');
  var adminToggle = document.querySelector('.biz-admin-toggle');
  var adminCloseBtn = document.querySelector('.biz-admin__close');

  if (adminToggle && adminPanel) {
    adminToggle.addEventListener('click', function() {
      adminPanel.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (adminCloseBtn && adminPanel) {
    adminCloseBtn.addEventListener('click', function() {
      adminPanel.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  /* Admin Nav */
  document.querySelectorAll('.biz-admin__nav-item').forEach(function(item) {
    item.addEventListener('click', function() {
      document.querySelectorAll('.biz-admin__nav-item').forEach(function(i) { i.classList.remove('active'); });
      item.classList.add('active');
      var target = item.getAttribute('data-section');
      if (target) {
        document.querySelectorAll('.biz-admin__section').forEach(function(s) { s.style.display = 'none'; });
        var section = document.getElementById('admin-' + target);
        if (section) section.style.display = 'block';
        var topbarTitle = document.querySelector('.biz-admin__topbar-title');
        if (topbarTitle) topbarTitle.textContent = item.querySelector('.biz-admin__nav-label').textContent;
      }
    });
  });

  /* Admin Tabs */
  document.querySelectorAll('.biz-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      var group = tab.getAttribute('data-group') || 'default';
      document.querySelectorAll('.biz-tab[data-group="' + group + '"]').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var target = tab.getAttribute('data-tab');
      if (target) {
        document.querySelectorAll('[data-tabcontent]').forEach(function(c) {
          c.style.display = c.getAttribute('data-tabcontent') === target ? '' : 'none';
        });
      }
    });
  });

  /* --- Form Handling (Demo) --- */
  document.querySelectorAll('.biz-form, .biz-reservation').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      if (btn) {
        var orig = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(function() {
          btn.textContent = 'Sent!';
          btn.style.background = 'var(--primary)';
          setTimeout(function() {
            btn.textContent = orig;
            btn.disabled = false;
            btn.style.background = '';
            form.reset();
          }, 2000);
        }, 1000);
      }
    });
  });

  /* --- Footer Year --- */
  var yearEl = document.querySelector('.biz-footer__year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
