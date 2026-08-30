/* ========================================
   PayNGo — Main Application JS
   Homepage Redesign
   ======================================== */

(function () {
  'use strict';

  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

  const EXCHANGE_RATE = 53.42;

  /* ----------------------------------------
     Header — sticky + scroll
  ---------------------------------------- */
  const header = $('#header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------
     Mobile Menu
  ---------------------------------------- */
  const burger = $('#burgerBtn');
  const drawer = $('#mobileMenu');

  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const open = drawer.classList.toggle('on');
      burger.classList.toggle('on', open);
      burger.setAttribute('aria-expanded', open);
      drawer.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    $$('.drawer__link', drawer).forEach(a => {
      a.addEventListener('click', () => {
        drawer.classList.remove('on');
        burger.classList.remove('on');
        burger.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------
     Smooth scroll + Active nav link
  ---------------------------------------- */
  const sections = $$('section[id]');
  const navLinks = $$('.hdr__link');

  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#' || id === '#before-login' || id === '#converter' || id === '#showcase' || id === '#trust' || id === '#contact') return;
      const el = $(id);
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top: y, behavior: 'smooth' });

      navLinks.forEach(l => l.classList.toggle('on', l.getAttribute('href') === id));
    });
  });

  /* ----------------------------------------
     Calculator
  ---------------------------------------- */
  const calcInput = $('#calcSendInput');
  const calcOutVal = $('.conv__out-val');
  const calcOutCur = $('.conv__out-cur');
  const calcSwapBtn = $('#calcSwapBtn');

  let fromCurrency = 'MYR';
  let toCurrency = 'PKR';

  function updateCalculator() {
    const amount = parseFloat(calcInput.value) || 0;
    const converted = Math.round(amount * EXCHANGE_RATE);
    if (calcOutVal) calcOutVal.textContent = converted.toLocaleString('en-US');
    if (calcOutCur) calcOutCur.textContent = toCurrency;
  }

  if (calcInput) {
    calcInput.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  if (calcSwapBtn) {
    calcSwapBtn.addEventListener('click', () => {
      [fromCurrency, toCurrency] = [toCurrency, fromCurrency];
      const ccyEl = $('.conv__ccy');
      if (ccyEl) ccyEl.textContent = (fromCurrency === 'MYR' ? '\uD83C\uDDF2\uD83C\uDDFE ' : '\uD83C\uDDF5\uD83C\uDDF0 ') + fromCurrency;
      updateCalculator();
    });
  }

  /* ----------------------------------------
     Exchange Rate Data — Auto-update
  ---------------------------------------- */
  const erVal = $('#exchangeRateValue');
  const erChg = $('#exchangeRateChange');
  const erUpd = $('#exchangeRateUpdated');
  const erHigh = $('#exchangeRateHigh');
  const erLow = $('#exchangeRateLow');
  const erAvg = $('#exchangeRateAvg');

  function updateExchangeRate() {
    const delta = (Math.random() - 0.5) * 0.08;
    const newRate = EXCHANGE_RATE + delta;
    const chg = ((delta / EXCHANGE_RATE) * 100);
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
  setInterval(updateExchangeRate, 10000);

  /* ----------------------------------------
     Exchange Rate Chart — Canvas
  ---------------------------------------- */
  const chartCanvas = $('#rateChart');
  const chartTip = $('#chartTip');
  let chartData = [];
  let chartDays = 7;

  function generateChartData(days) {
    const data = [];
    const points = Math.min(days * 4, 120);
    let rate = EXCHANGE_RATE;
    for (let i = 0; i < points; i++) {
      rate += (Math.random() - 0.48) * 0.15;
      rate = Math.max(EXCHANGE_RATE - 1.2, Math.min(EXCHANGE_RATE + 1.2, rate));
      data.push(rate);
    }
    return data;
  }

  function drawChart() {
    if (!chartCanvas) return;
    const ctx = chartCanvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = chartCanvas.parentElement.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    chartCanvas.width = w * dpr;
    chartCanvas.height = h * dpr;
    chartCanvas.style.width = w + 'px';
    chartCanvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    if (chartData.length < 2) return;

    const min = Math.min(...chartData) - 0.1;
    const max = Math.max(...chartData) + 0.1;
    const range = max - min || 1;
    const pad = { top: 20, bottom: 30, left: 0, right: 0 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (ch / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(w - pad.right, y);
      ctx.stroke();
    }

    // Y-axis labels
    ctx.fillStyle = 'rgba(148,163,184,0.5)';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'left';
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (ch / 4) * i;
      const val = max - (range / 4) * i;
      ctx.fillText(val.toFixed(2), pad.left + 4, y - 4);
    }

    // Line
    const isUp = chartData[chartData.length - 1] >= chartData[0];
    const lineColor = isUp ? '#10b981' : '#f43f5e';
    const fillColor = isUp ? 'rgba(16,185,129,0.08)' : 'rgba(244,63,94,0.08)';

    const step = cw / (chartData.length - 1);

    // Fill
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top + ch - ((chartData[0] - min) / range) * ch);
    for (let i = 1; i < chartData.length; i++) {
      const x = pad.left + step * i;
      const y = pad.top + ch - ((chartData[i] - min) / range) * ch;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(pad.left + step * (chartData.length - 1), pad.top + ch);
    ctx.lineTo(pad.left, pad.top + ch);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.moveTo(pad.left, pad.top + ch - ((chartData[0] - min) / range) * ch);
    for (let i = 1; i < chartData.length; i++) {
      const x = pad.left + step * i;
      const y = pad.top + ch - ((chartData[i] - min) / range) * ch;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();

    // End dot
    const lastX = pad.left + step * (chartData.length - 1);
    const lastY = pad.top + ch - ((chartData[chartData.length - 1] - min) / range) * ch;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lastX, lastY, 7, 0, Math.PI * 2);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.3;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Tooltip on hover
    chartCanvas.onmousemove = (e) => {
      const r = chartCanvas.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const idx = Math.round((mx - pad.left) / step);
      if (idx < 0 || idx >= chartData.length) {
        if (chartTip) chartTip.classList.remove('show');
        return;
      }
      const val = chartData[idx];
      const tipX = pad.left + step * idx;
      const tipY = pad.top + ch - ((val - min) / range) * ch;

      if (chartTip) {
        chartTip.classList.add('show');
        chartTip.style.left = Math.min(tipX + 8, w - 100) + 'px';
        chartTip.style.top = (tipY - 40) + 'px';
        const tipT = chartTip.querySelector('.xr__tip-t');
        const tipV = chartTip.querySelector('.xr__tip-v');
        if (tipT) tipT.textContent = idx + '/' + (chartData.length - 1);
        if (tipV) tipV.textContent = 'PKR ' + val.toFixed(2);
      }
    };

    chartCanvas.onmouseleave = () => {
      if (chartTip) chartTip.classList.remove('show');
    };
  }

  function initChart(days) {
    chartDays = days;
    chartData = generateChartData(days);
    drawChart();
  }

  // Expose for timeframe controls
  window.PayNGoGraph = {
    setDays: function (days) {
      initChart(days);
    }
  };

  // Initialize chart
  initChart(7);

  // Redraw on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawChart, 100);
  });

  /* ----------------------------------------
     Exchange Graph — Timeframe controls
  ---------------------------------------- */
  $$('.xr__tf').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.xr__tf').forEach(b => { b.classList.remove('on'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('on');
      btn.setAttribute('aria-selected', 'true');

      const days = parseInt(btn.dataset.days, 10);
      if (window.PayNGoGraph && window.PayNGoGraph.setDays) {
        window.PayNGoGraph.setDays(days);
      }
    });
  });

  /* ----------------------------------------
     FAQ Accordion
  ---------------------------------------- */
  $$('.faq__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const isOpen = item.classList.contains('on');
      $$('.faq__item.on').forEach(i => i.classList.remove('on'));
      if (!isOpen) item.classList.add('on');
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });

  /* ----------------------------------------
     Scroll Reveal
  ---------------------------------------- */
  const reveals = $$('.rv');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ----------------------------------------
     Active nav link on scroll
  ---------------------------------------- */
  const scrollSpy = () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => {
          l.classList.toggle('on', l.getAttribute('href') === '#' + id);
        });
      }
    });
  };
  window.addEventListener('scroll', scrollSpy, { passive: true });

})();
