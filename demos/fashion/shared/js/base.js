/* ========================================
   WN Fashion — Shared E-Commerce JS
   ======================================== */
(function() {
  'use strict';

  /* --- Product Data (shared across all pages) --- */
  var PRODUCTS = window.EC_PRODUCTS || [];

  /* --- Cart System (localStorage) --- */
  var Cart = {
    KEY: 'wn_fashion_cart',
    get: function() {
      try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
      catch(e) { return []; }
    },
    save: function(items) {
      localStorage.setItem(this.KEY, JSON.stringify(items));
      this.updateUI();
    },
    add: function(product, variant, qty) {
      var items = this.get();
      var key = product.id + '-' + (variant.size || '') + '-' + (variant.color || '');
      var existing = items.find(function(i) { return i.key === key; });
      if (existing) {
        existing.qty += qty || 1;
      } else {
        items.push({
          key: key,
          id: product.id,
          name: product.name,
          price: product.salePrice || product.price,
          image: product.image,
          size: variant.size || '',
          color: variant.color || '',
          qty: qty || 1
        });
      }
      this.save(items);
      showToast('Added to cart', 'success');
    },
    remove: function(key) {
      var items = this.get().filter(function(i) { return i.key !== key; });
      this.save(items);
    },
    updateQty: function(key, qty) {
      var items = this.get();
      var item = items.find(function(i) { return i.key === key; });
      if (item) {
        if (qty <= 0) { this.remove(key); return; }
        item.qty = qty;
      }
      this.save(items);
    },
    getTotal: function() {
      return this.get().reduce(function(sum, i) { return sum + (i.price * i.qty); }, 0);
    },
    getCount: function() {
      return this.get().reduce(function(sum, i) { return sum + i.qty; }, 0);
    },
    clear: function() {
      localStorage.removeItem(this.KEY);
      this.updateUI();
    },
    updateUI: function() {
      var count = this.getCount();
      document.querySelectorAll('.ec-cart-btn__count').forEach(function(el) {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
      });
      var drawer = document.querySelector('.ec-cart-drawer');
      if (drawer) renderCartDrawer();
    }
  };

  function renderCartDrawer() {
    var items = Cart.get();
    var itemsEl = document.querySelector('.ec-cart-drawer__items');
    var footerEl = document.querySelector('.ec-cart-drawer__footer');
    if (!itemsEl) return;

    if (items.length === 0) {
      itemsEl.innerHTML = '<div class="ec-cart-drawer__empty"><div class="ec-cart-drawer__empty-icon">🛒</div><p>Your cart is empty</p></div>';
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    if (footerEl) footerEl.style.display = 'block';
    itemsEl.innerHTML = items.map(function(item) {
      return '<div class="ec-cart-item">' +
        '<div class="ec-cart-item__image"><img src="' + item.image + '" alt="' + item.name + '"></div>' +
        '<div class="ec-cart-item__info">' +
          '<div class="ec-cart-item__name">' + item.name + '</div>' +
          '<div class="ec-cart-item__variant">' + [item.size, item.color].filter(Boolean).join(' / ') + '</div>' +
          '<div class="ec-cart-item__bottom">' +
            '<span class="ec-cart-item__price">Rs. ' + item.price.toLocaleString() + '</span>' +
            '<span class="ec-cart-item__remove" data-cart-remove="' + item.key + '">Remove</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    var total = Cart.getTotal();
    var subtotalEl = document.querySelector('.ec-cart-drawer__subtotal-val');
    var totalEl = document.querySelector('.ec-cart-drawer__total-val');
    if (subtotalEl) subtotalEl.textContent = 'Rs. ' + total.toLocaleString();
    if (totalEl) totalEl.textContent = 'Rs. ' + total.toLocaleString();
  }

  /* --- Wishlist --- */
  var Wishlist = {
    KEY: 'wn_fashion_wishlist',
    get: function() {
      try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
      catch(e) { return []; }
    },
    toggle: function(productId) {
      var items = this.get();
      var idx = items.indexOf(productId);
      if (idx > -1) { items.splice(idx, 1); showToast('Removed from wishlist'); }
      else { items.push(productId); showToast('Added to wishlist', 'success'); }
      localStorage.setItem(this.KEY, JSON.stringify(items));
      this.updateUI();
    },
    has: function(productId) {
      return this.get().indexOf(productId) > -1;
    },
    updateUI: function() {
      document.querySelectorAll('.ec-product__wishlist').forEach(function(btn) {
        var id = btn.getAttribute('data-wishlist');
        if (Wishlist.has(id)) btn.classList.add('active');
        else btn.classList.remove('active');
      });
      var countEls = document.querySelectorAll('.ec-wishlist-count');
      countEls.forEach(function(el) { el.textContent = Wishlist.get().length; });
    }
  };

  /* --- Toast --- */
  function showToast(msg, type) {
    var toast = document.querySelector('.ec-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'ec-toast ec-toast--' + (type || 'success') + ' show';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function() { toast.classList.remove('show'); }, 2500);
  }
  window.ecShowToast = showToast;

  /* --- Header Scroll --- */
  var header = document.querySelector('.ec-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* --- Burger / Mobile --- */
  var burger = document.querySelector('.ec-burger');
  var mobile = document.querySelector('.ec-mobile');
  if (burger && mobile) {
    burger.addEventListener('click', function() { mobile.classList.add('open'); document.body.style.overflow = 'hidden'; });
    function closeMobile() { mobile.classList.remove('open'); document.body.style.overflow = ''; }
    var mClose = mobile.querySelector('.ec-mobile__close');
    if (mClose) mClose.addEventListener('click', closeMobile);
    mobile.querySelectorAll('.ec-mobile__link').forEach(function(l) { l.addEventListener('click', closeMobile); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeMobile(); });
  }

  /* --- Active Nav --- */
  var curPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.ec-nav__link, .ec-mobile__link').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href && href.split('/').pop() === curPage) link.classList.add('active');
  });

  /* --- Cart Drawer Toggle --- */
  var cartBtn = document.querySelector('.ec-cart-btn');
  var cartDrawer = document.querySelector('.ec-cart-drawer');
  var cartOverlay = document.querySelector('.ec-cart-drawer__overlay');
  var cartClose = document.querySelector('.ec-cart-drawer__close');

  function openCart() {
    if (cartDrawer) { cartDrawer.classList.add('open'); document.body.style.overflow = 'hidden'; }
    if (cartOverlay) cartOverlay.classList.add('open');
    renderCartDrawer();
  }
  function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  /* --- Cart Remove Delegation --- */
  document.addEventListener('click', function(e) {
    var rm = e.target.closest('[data-cart-remove]');
    if (rm) { Cart.remove(rm.getAttribute('data-cart-remove')); renderCartDrawer(); }
    var qtyBtn = e.target.closest('[data-cart-qty]');
    if (qtyBtn) {
      var key = qtyBtn.getAttribute('data-cart-qty');
      var dir = qtyBtn.getAttribute('data-dir');
      var items = Cart.get();
      var item = items.find(function(i) { return i.key === key; });
      if (item) {
        item.qty += dir === 'up' ? 1 : -1;
        if (item.qty <= 0) Cart.remove(key);
        else Cart.save(items);
        renderCartDrawer();
      }
    }
  });

  /* --- Search Overlay --- */
  var searchBtn = document.querySelector('.ec-search-btn');
  var searchOverlay = document.querySelector('.ec-search-overlay');
  var searchInput = document.querySelector('.ec-search-box__input');
  var searchClose = document.querySelector('.ec-search-box__close');

  function openSearch() {
    if (searchOverlay) { searchOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
    if (searchInput) { searchInput.focus(); searchInput.value = ''; }
    var results = document.querySelector('.ec-search-results');
    if (results) results.innerHTML = '';
  }
  function closeSearch() {
    if (searchOverlay) searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchOverlay) searchOverlay.addEventListener('click', function(e) { if (e.target === searchOverlay) closeSearch(); });

  /* --- Search Functionality --- */
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var q = this.value.toLowerCase().trim();
      var results = document.querySelector('.ec-search-results');
      if (!results) return;
      if (q.length < 2) { results.innerHTML = ''; return; }
      var matches = PRODUCTS.filter(function(p) {
        return p.name.toLowerCase().indexOf(q) > -1 ||
               (p.category && p.category.toLowerCase().indexOf(q) > -1) ||
               (p.tags && p.tags.join(' ').toLowerCase().indexOf(q) > -1);
      }).slice(0, 6);
      if (matches.length === 0) {
        results.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-dim)">No products found</div>';
        return;
      }
      results.innerHTML = matches.map(function(p) {
        var href = location.pathname.indexOf('WN-ECOM') > -1 ?
          'product.html?id=' + p.id : 'product.html?id=' + p.id;
        return '<a href="' + href + '" class="ec-search-result">' +
          '<div class="ec-search-result__image"><img src="' + p.image + '" alt="' + p.name + '"></div>' +
          '<div><div class="ec-search-result__name">' + p.name + '</div>' +
          '<div class="ec-search-result__price">Rs. ' + (p.salePrice || p.price).toLocaleString() + '</div></div></a>';
      }).join('');
    });
  }

  /* --- Scroll Reveal --- */
  var reveals = document.querySelectorAll('.ec-reveal');
  if (reveals.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(function() { entry.target.classList.add('visible'); }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(function(el) { observer.observe(el); });
  }

  /* --- Product Filters (Shop Page) --- */
  window.ecFilterProducts = function(products, filters) {
    return products.filter(function(p) {
      if (filters.category && filters.category !== 'all' && p.category !== filters.category) return false;
      if (filters.priceMin && p.price < filters.priceMin) return false;
      if (filters.priceMax && p.price > filters.priceMax) return false;
      if (filters.size && filters.size !== 'all' && p.sizes && p.sizes.indexOf(filters.size) === -1) return false;
      if (filters.color && filters.color !== 'all' && p.colors && p.colors.indexOf(filters.color) === -1) return false;
      if (filters.search) {
        var q = filters.search.toLowerCase();
        if (p.name.toLowerCase().indexOf(q) === -1 &&
            (p.category || '').toLowerCase().indexOf(q) === -1) return false;
      }
      return true;
    });
  };

  window.ecSortProducts = function(products, sort) {
    var sorted = products.slice();
    switch(sort) {
      case 'price-low': sorted.sort(function(a,b) { return (a.salePrice||a.price) - (b.salePrice||b.price); }); break;
      case 'price-high': sorted.sort(function(a,b) { return (b.salePrice||b.price) - (a.salePrice||a.price); }); break;
      case 'newest': sorted.sort(function(a,b) { return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); }); break;
      case 'rating': sorted.sort(function(a,b) { return (b.rating || 0) - (a.rating || 0); }); break;
      default: sorted.sort(function(a,b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    }
    return sorted;
  };

  /* --- Admin Panel --- */
  var adminPanel = document.querySelector('.ec-admin');
  var adminToggle = document.querySelector('.ec-admin-toggle');
  var adminCloseBtn = document.querySelector('.ec-admin__close');

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
  document.querySelectorAll('.ec-admin__nav-item[data-section]').forEach(function(item) {
    item.addEventListener('click', function() {
      document.querySelectorAll('.ec-admin__nav-item').forEach(function(i) { i.classList.remove('active'); });
      item.classList.add('active');
      var target = item.getAttribute('data-section');
      if (target) {
        document.querySelectorAll('.ec-admin__section').forEach(function(s) { s.style.display = 'none'; });
        var section = document.getElementById('admin-' + target);
        if (section) section.style.display = 'block';
        var topbarTitle = document.querySelector('.ec-admin__topbar-title');
        if (topbarTitle) topbarTitle.textContent = item.querySelector('.ec-admin__nav-icon').nextSibling.textContent.trim();
      }
    });
  });

  /* --- Wishlist Click Delegation --- */
  document.addEventListener('click', function(e) {
    var wishBtn = e.target.closest('[data-wishlist]');
    if (wishBtn) {
      e.preventDefault();
      e.stopPropagation();
      Wishlist.toggle(wishBtn.getAttribute('data-wishlist'));
    }
  });

  /* --- Add to Cart Click Delegation --- */
  document.addEventListener('click', function(e) {
    var addBtn = e.target.closest('[data-add-cart]');
    if (addBtn) {
      e.preventDefault();
      var productId = addBtn.getAttribute('data-add-cart');
      var product = PRODUCTS.find(function(p) { return p.id === productId; });
      if (!product) return;
      var sizeEl = document.querySelector('.ec-size.active');
      var colorEl = document.querySelector('.ec-color.active');
      var qtyEl = document.querySelector('.ec-qty__value');
      Cart.add(product, {
        size: sizeEl ? sizeEl.textContent : '',
        color: colorEl ? colorEl.getAttribute('data-color') : ''
      }, qtyEl ? parseInt(qtyEl.value) || 1 : 1);
    }
  });

  /* --- Quick Add to Cart (from product card) --- */
  document.addEventListener('click', function(e) {
    var quickBtn = e.target.closest('[data-quick-add]');
    if (quickBtn) {
      e.preventDefault();
      e.stopPropagation();
      var productId = quickBtn.getAttribute('data-quick-add');
      var product = PRODUCTS.find(function(p) { return p.id === productId; });
      if (product) {
        Cart.add(product, { size: product.sizes ? product.sizes[0] : '', color: '' }, 1);
      }
    }
  });

  /* --- Quantity Controls --- */
  document.addEventListener('click', function(e) {
    var qtyBtn = e.target.closest('.ec-qty__btn');
    if (qtyBtn) {
      var input = qtyBtn.parentElement.querySelector('.ec-qty__value');
      if (!input) return;
      var val = parseInt(input.value) || 1;
      if (qtyBtn.classList.contains('ec-qty__minus')) { if (val > 1) input.value = val - 1; }
      else { input.value = val + 1; }
      var event = new Event('change', { bubbles: true });
      input.dispatchEvent(event);
    }
  });

  /* --- Gallery Thumbnails --- */
  document.addEventListener('click', function(e) {
    var thumb = e.target.closest('.ec-gallery__thumb');
    if (thumb) {
      var mainImg = document.querySelector('.ec-gallery__main img');
      if (mainImg) mainImg.src = thumb.querySelector('img').src;
      document.querySelectorAll('.ec-gallery__thumb').forEach(function(t) { t.classList.remove('active'); });
      thumb.classList.add('active');
    }
  });

  /* --- Lightbox --- */
  var lightbox = document.querySelector('.ec-lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('.ec-lightbox__img');
    var lbClose = lightbox.querySelector('.ec-lightbox__close');
    document.querySelectorAll('[data-lightbox]').forEach(function(el) {
      el.addEventListener('click', function() {
        if (lbImg) lbImg.src = el.getAttribute('data-lightbox') || el.querySelector('img')?.src;
        lightbox.classList.add('open');
      });
    });
    if (lbClose) lbClose.addEventListener('click', function() { lightbox.classList.remove('open'); });
    lightbox.addEventListener('click', function(e) { if (e.target === lightbox) lightbox.classList.remove('open'); });
  }

  /* --- Product Page Size/Color Selection --- */
  document.addEventListener('click', function(e) {
    var sizeBtn = e.target.closest('.ec-size:not(.disabled)');
    if (sizeBtn) {
      document.querySelectorAll('.ec-size').forEach(function(s) { s.classList.remove('active'); });
      sizeBtn.classList.add('active');
    }
    var colorBtn = e.target.closest('.ec-color');
    if (colorBtn) {
      document.querySelectorAll('.ec-color').forEach(function(c) { c.classList.remove('active'); });
      colorBtn.classList.add('active');
    }
  });

  /* --- Checkout Form --- */
  document.querySelectorAll('.ec-checkout__form form, .ec-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      if (btn) {
        btn.textContent = 'Processing...';
        btn.disabled = true;
        setTimeout(function() {
          Cart.clear();
          var confPage = 'confirmation.html';
          if (location.pathname.indexOf('WN-ECOM') > -1) confPage = 'confirmation.html';
          window.location.href = confPage;
        }, 1200);
      }
    });
  });

  /* --- Tab Switching --- */
  document.querySelectorAll('.ec-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      var group = tab.getAttribute('data-group') || 'default';
      document.querySelectorAll('.ec-tab[data-group="' + group + '"]').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var target = tab.getAttribute('data-tab');
      if (target) {
        document.querySelectorAll('[data-tabcontent]').forEach(function(c) {
          c.style.display = c.getAttribute('data-tabcontent') === target ? '' : 'none';
        });
      }
    });
  });

  /* --- Account Sidebar Nav --- */
  document.querySelectorAll('.ec-account__nav-item[data-section]').forEach(function(item) {
    item.addEventListener('click', function() {
      document.querySelectorAll('.ec-account__nav-item').forEach(function(i) { i.classList.remove('active'); });
      item.classList.add('active');
      var target = item.getAttribute('data-section');
      if (target) {
        document.querySelectorAll('.ec-account__section').forEach(function(s) { s.style.display = 'none'; });
        var section = document.getElementById('account-' + target);
        if (section) section.style.display = 'block';
      }
    });
  });

  /* --- WhatsApp --- */
  function buildWhatsAppUrl(productName) {
    var msg = 'Hello WebNest, I am interested in ' + productName + '.';
    return 'https://wa.me/923281190004?text=' + encodeURIComponent(msg);
  }
  document.querySelectorAll('[data-whatsapp]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var product = btn.getAttribute('data-product') || 'Fashion E-commerce Website';
      window.open(buildWhatsAppUrl(product), '_blank');
    });
  });

  /* --- Init --- */
  Cart.updateUI();
  Wishlist.updateUI();

  /* --- Footer Year --- */
  var yearEl = document.querySelector('.ec-footer__year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Expose for other scripts --- */
  window.EC_Cart = Cart;
  window.EC_Wishlist = Wishlist;

})();
