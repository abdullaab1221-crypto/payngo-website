/* ========================================
   PayNGo — Main Application JS
   ======================================== */

(function () {
  'use strict';

  var $ = function (s, p) { return (p || document).querySelector(s); };
  var $$ = function (s, p) { return Array.prototype.slice.call((p || document).querySelectorAll(s)); };

  var EXCHANGE_RATE = 53.42;

  /* ----------------------------------------
     Header — sticky + scroll
  ---------------------------------------- */
  var header = $('#header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------
     Mobile Menu
  ---------------------------------------- */
  var burger = $('#burgerBtn');
  var drawer = $('#mobileMenu');

  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = drawer.classList.toggle('on');
      burger.classList.toggle('on', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    $$('.drawer__link', drawer).forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.classList.remove('on');
        burger.classList.remove('on');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------
     Smooth scroll + Active nav link
  ---------------------------------------- */
  var navLinks = $$('.hdr__link');

  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      var el = $(id);
      if (!el) return;
      e.preventDefault();
      var y = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: y, behavior: 'smooth' });
      navLinks.forEach(function (l) { l.classList.toggle('on', l.getAttribute('href') === id); });
    });
  });

  /* ----------------------------------------
     Hero Rate — auto-update (index only)
  ---------------------------------------- */
  var heroRateEl = $('#heroRate');
  var heroRateCardEl = $('#heroRateCard');
  var heroHighEl = $('#heroHigh');
  var heroLowEl = $('#heroLow');
  var heroSendEl = $('#heroSend');
  var heroRateChangeEl = $('#heroRateChange');

  function updateHeroRate() {
    var delta = (Math.random() - 0.5) * 0.06;
    var newRate = EXCHANGE_RATE + delta;
    var chg = ((delta / EXCHANGE_RATE) * 100);
    if (heroRateEl) heroRateEl.textContent = newRate.toFixed(2);
    if (heroRateCardEl) heroRateCardEl.textContent = newRate.toFixed(2);
    if (heroHighEl) heroHighEl.textContent = (EXCHANGE_RATE + Math.random() * 0.3).toFixed(2);
    if (heroLowEl) heroLowEl.textContent = (EXCHANGE_RATE - Math.random() * 0.3).toFixed(2);
    if (heroSendEl) {
      var sendAmt = 1000;
      var val = Math.round(sendAmt * newRate);
      heroSendEl.textContent = 'PKR ' + val.toLocaleString('en-US');
    }
    if (heroRateChangeEl) {
      heroRateChangeEl.textContent = (chg >= 0 ? '+' : '') + chg.toFixed(2) + '%';
    }
  }
  if (heroRateEl || heroRateCardEl) {
    setInterval(updateHeroRate, 8000);
  }

  /* ----------------------------------------
     Calculator (index only)
  ---------------------------------------- */
  var calcInput = $('#calcSendInput');
  var calcOutVal = $('.conv__out-val');
  var calcOutCur = $('.conv__out-cur');
  var calcSwapBtn = $('#calcSwapBtn');

  var fromCurrency = 'MYR';
  var toCurrency = 'PKR';

  function updateCalculator() {
    if (!calcInput) return;
    var amount = parseFloat(calcInput.value) || 0;
    var converted = Math.round(amount * EXCHANGE_RATE);
    if (calcOutVal) calcOutVal.textContent = converted.toLocaleString('en-US');
    if (calcOutCur) calcOutCur.textContent = toCurrency;
  }

  if (calcInput) {
    calcInput.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  if (calcSwapBtn) {
    calcSwapBtn.addEventListener('click', function () {
      var temp = fromCurrency;
      fromCurrency = toCurrency;
      toCurrency = temp;
      var ccyEl = $('.conv__ccy');
      if (ccyEl) ccyEl.textContent = (fromCurrency === 'MYR' ? '\uD83C\uDDF2\uD83C\uDDFE ' : '\uD83C\uDDF5\uD83C\uDDF0 ') + fromCurrency;
      updateCalculator();
    });
  }

  /* ----------------------------------------
     Exchange Rate Data — Auto-update (index only)
  ---------------------------------------- */
  var erVal = $('#exchangeRateValue');
  var erChg = $('#exchangeRateChange');
  var erUpd = $('#exchangeRateUpdated');
  var erHigh = $('#exchangeRateHigh');
  var erLow = $('#exchangeRateLow');
  var erAvg = $('#exchangeRateAvg');

  function updateExchangeRate() {
    var delta = (Math.random() - 0.5) * 0.08;
    var newRate = EXCHANGE_RATE + delta;
    var chg = ((delta / EXCHANGE_RATE) * 100);
    if (erVal) erVal.textContent = newRate.toFixed(2);
    if (erChg) {
      erChg.textContent = (chg >= 0 ? '+' : '') + chg.toFixed(2) + '%';
      erChg.className = 'xr__chg ' + (chg >= 0 ? 'xr__chg--up' : 'xr__chg--dn');
    }
    if (erUpd) erUpd.textContent = 'just now';
    if (erHigh) erHigh.textContent = (EXCHANGE_RATE + Math.random() * 0.5).toFixed(2);
    if (erLow) erLow.textContent = (EXCHANGE_RATE - Math.random() * 0.5).toFixed(2);
    if (erAvg) erAvg.textContent = EXCHANGE_RATE.toFixed(2);
  }
  if (erVal) {
    setInterval(updateExchangeRate, 10000);
  }

  /* ----------------------------------------
     FAQ Accordion
  ---------------------------------------- */
  $$('.faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      if (!item) return;
      var isOpen = item.classList.contains('on');
      $$('.faq__item.on').forEach(function (i) { i.classList.remove('on'); });
      if (!isOpen) item.classList.add('on');
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });

  /* ----------------------------------------
     Exchange Graph — Timeframe controls
  ---------------------------------------- */
  $$('.xr__tf').forEach(function (btn) {
    btn.addEventListener('click', function () {
      $$('.xr__tf').forEach(function (b) { b.classList.remove('on'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('on');
      btn.setAttribute('aria-selected', 'true');
      var days = parseInt(btn.dataset.days, 10);
      if (window.PayNGoGraph && window.PayNGoGraph.setDays) {
        window.PayNGoGraph.setDays(days);
      }
    });
  });

  /* ----------------------------------------
     Account Deletion — Form success display
  ---------------------------------------- */
  if (window.location.search.indexOf('submitted=true') !== -1) {
    var delForm = $('.page-form');
    var delSuccess = $('#formSuccess');
    if (delForm) delForm.style.display = 'none';
    if (delSuccess) delSuccess.style.display = '';
  }

})();
