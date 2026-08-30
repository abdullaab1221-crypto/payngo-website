/**
 * PayNGo Exchange Rate Graph
 * Canvas-based professional financial chart
 */

var ExchangeGraph = (function () {
  'use strict';

  var CONFIG = {
    lineColor: '#10b981',
    lineColorRGB: '16,185,129',
    gradientTop: 'rgba(16,185,129,0.15)',
    gradientBottom: 'rgba(16,185,129,0.01)',
    gridColor: 'rgba(255,255,255,0.04)',
    textColor: '#475569',
    textColorLight: '#64748b',
    dotColor: '#10b981',
    dotGlow: 'rgba(16,185,129,0.4)',
    crosshairColor: 'rgba(255,255,255,0.1)',
    padding: { top: 20, right: 16, bottom: 36, left: 56 },
    mobilePadding: { top: 16, right: 8, bottom: 32, left: 44 },
    dotRadius: 4,
    lineWidth: 2.5,
    curveSmoothing: 0.2
  };

  var _canvas = null;
  var _ctx = null;
  var _tooltip = null;
  var _data = [];
  var _currentFrame = null;
  var _isVisible = true;
  var _observer = null;
  var _animFrame = null;
  var _hoveredPoint = -1;
  var _isMobile = false;
  var _dpr = 1;
  var _currentRate = null;
  var _onDotHover = null;
  var _currentDays = 1;

  function init(canvasId, tooltipId) {
    _canvas = document.getElementById(canvasId);
    _tooltip = document.getElementById(tooltipId);
    if (!_canvas) return;

    _ctx = _canvas.getContext('2d');
    _dpr = window.devicePixelRatio || 1;
    _isMobile = window.innerWidth < 768;

    resize();
    _setupIntersectionObserver();
    _setupResizeListener();
    _setupInteraction();
  }

  function _setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    _observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        _isVisible = entry.isIntersecting;
        if (_isVisible && _data.length > 0) {
          _animateChart();
        }
      });
    }, { threshold: 0.1 });

    _observer.observe(_canvas);
  }

  function _setupResizeListener() {
    var resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        _isMobile = window.innerWidth < 768;
        resize();
        if (_data.length > 0) {
          _draw();
        }
      }, 150);
    });
  }

  function _setupInteraction() {
    if (!_canvas) return;

    function getPointerPos(e) {
      var rect = _canvas.getBoundingClientRect();
      var x = (e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || 0) - rect.left;
      var y = (e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY) || 0) - rect.top;
      return { x: x, y: y };
    }

    function findNearestPoint(pos) {
      if (!_data.length || !_canvas) return -1;
      var w = _canvas.width / _dpr;
      var p = _isMobile ? CONFIG.mobilePadding : CONFIG.padding;
      var chartW = w - p.left - p.right;
      var step = chartW / Math.max(1, _data.length - 1);

      var minDist = Infinity;
      var nearest = -1;

      for (var i = 0; i < _data.length; i++) {
        var px = p.left + i * step;
        var dist = Math.abs(pos.x - px);
        if (dist < minDist) {
          minDist = dist;
          nearest = i;
        }
      }

      return minDist < 30 ? nearest : -1;
    }

    function handleMove(e) {
      e.preventDefault();
      var pos = getPointerPos(e);
      var idx = findNearestPoint(pos);
      if (idx !== _hoveredPoint) {
        _hoveredPoint = idx;
        _draw();
        _showTooltip(idx, pos);
      }
    }

    function handleLeave() {
      _hoveredPoint = -1;
      _draw();
      _hideTooltip();
    }

    _canvas.addEventListener('mousemove', handleMove);
    _canvas.addEventListener('mouseleave', handleLeave);

    _canvas.addEventListener('touchstart', function (e) {
      handleMove(e);
    }, { passive: false });

    _canvas.addEventListener('touchmove', function (e) {
      handleMove(e);
    }, { passive: false });

    _canvas.addEventListener('touchend', handleLeave);
  }

  function resize() {
    if (!_canvas) return;
    var rect = _canvas.parentElement.getBoundingClientRect();
    _canvas.width = rect.width * _dpr;
    _canvas.height = rect.height * _dpr;
    _canvas.style.width = rect.width + 'px';
    _canvas.style.height = rect.height + 'px';
    _ctx.scale(_dpr, _dpr);
  }

  function setData(data, currentRate) {
    _data = data || [];
    _currentRate = currentRate || null;
    _draw();
  }

  function updateLastPoint(rate) {
    if (_data.length === 0) return;
    _data[_data.length - 1].rate = rate;
    _currentRate = rate;
    if (_isVisible) {
      _draw();
    }
  }

  function _draw() {
    if (!_ctx || !_canvas) return;

    var w = _canvas.width / _dpr;
    var h = _canvas.height / _dpr;
    var p = _isMobile ? CONFIG.mobilePadding : CONFIG.padding;

    _ctx.clearRect(0, 0, w, h);

    if (_data.length === 0) {
      _drawEmpty(w, h);
      return;
    }

    var chartW = w - p.left - p.right;
    var chartH = h - p.top - p.bottom;

    var rates = _data.map(function (d) { return d.rate; });
    var minRate = Math.min.apply(null, rates);
    var maxRate = Math.max.apply(null, rates);
    var range = maxRate - minRate || 1;
    var pad = range * 0.1;
    minRate -= pad;
    maxRate += pad;
    range = maxRate - minRate;

    _drawGrid(w, h, p, chartW, chartH, minRate, maxRate);
    _drawArea(chartW, chartH, p, minRate, range);
    _drawLine(chartW, chartH, p, minRate, range);

    if (_hoveredPoint >= 0 && _hoveredPoint < _data.length) {
      _drawHoverPoint(chartW, chartH, p, minRate, range);
    }

    if (_currentRate !== null) {
      _drawCurrentRateIndicator(chartW, chartH, p, minRate, range);
    }

    _drawAxisLabels(w, h, p, chartW, chartH, minRate, maxRate);
  }

  function _drawGrid(w, h, p, chartW, chartH, minRate, maxRate) {
    var gridLines = _isMobile ? 4 : 5;
    _ctx.strokeStyle = CONFIG.gridColor;
    _ctx.lineWidth = 1;

    for (var i = 0; i <= gridLines; i++) {
      var y = p.top + (chartH / gridLines) * i;
      _ctx.beginPath();
      _ctx.moveTo(p.left, y);
      _ctx.lineTo(p.left + chartW, y);
      _ctx.stroke();
    }
  }

  function _drawArea(chartW, chartH, p, minRate, range) {
    var step = chartW / Math.max(1, _data.length - 1);

    _ctx.beginPath();
    _ctx.moveTo(p.left, p.top + chartH);

    for (var i = 0; i < _data.length; i++) {
      var x = p.left + i * step;
      var y = p.top + chartH - ((_data[i].rate - minRate) / range) * chartH;

      if (i === 0) {
        _ctx.lineTo(x, y);
      } else {
        var prevX = p.left + (i - 1) * step;
        var prevY = p.top + chartH - ((_data[i - 1].rate - minRate) / range) * chartH;
        var cpx1 = prevX + (x - prevX) * CONFIG.curveSmoothing;
        var cpx2 = x - (x - prevX) * CONFIG.curveSmoothing;
        _ctx.bezierCurveTo(cpx1, prevY, cpx2, y, x, y);
      }
    }

    _ctx.lineTo(p.left + chartW, p.top + chartH);
    _ctx.closePath();

    var gradient = _ctx.createLinearGradient(0, p.top, 0, p.top + chartH);
    gradient.addColorStop(0, CONFIG.gradientTop);
    gradient.addColorStop(1, CONFIG.gradientBottom);
    _ctx.fillStyle = gradient;
    _ctx.fill();
  }

  function _drawLine(chartW, chartH, p, minRate, range) {
    var step = chartW / Math.max(1, _data.length - 1);

    _ctx.beginPath();
    _ctx.strokeStyle = CONFIG.lineColor;
    _ctx.lineWidth = CONFIG.lineWidth;
    _ctx.lineJoin = 'round';
    _ctx.lineCap = 'round';

    for (var i = 0; i < _data.length; i++) {
      var x = p.left + i * step;
      var y = p.top + chartH - ((_data[i].rate - minRate) / range) * chartH;

      if (i === 0) {
        _ctx.moveTo(x, y);
      } else {
        var prevX = p.left + (i - 1) * step;
        var prevY = p.top + chartH - ((_data[i - 1].rate - minRate) / range) * chartH;
        var cpx1 = prevX + (x - prevX) * CONFIG.curveSmoothing;
        var cpx2 = x - (x - prevX) * CONFIG.curveSmoothing;
        _ctx.bezierCurveTo(cpx1, prevY, cpx2, y, x, y);
      }
    }
    _ctx.stroke();
  }

  function _drawHoverPoint(chartW, chartH, p, minRate, range) {
    var step = chartW / Math.max(1, _data.length - 1);
    var i = _hoveredPoint;
    var x = p.left + i * step;
    var y = p.top + chartH - ((_data[i].rate - minRate) / range) * chartH;

    _ctx.strokeStyle = CONFIG.crosshairColor;
    _ctx.lineWidth = 1;
    _ctx.setLineDash([4, 4]);
    _ctx.beginPath();
    _ctx.moveTo(x, p.top);
    _ctx.lineTo(x, p.top + chartH);
    _ctx.stroke();
    _ctx.setLineDash([]);

    _ctx.beginPath();
    _ctx.arc(x, y, CONFIG.dotRadius * 3, 0, Math.PI * 2);
    _ctx.fillStyle = CONFIG.dotGlow;
    _ctx.fill();

    _ctx.beginPath();
    _ctx.arc(x, y, CONFIG.dotRadius, 0, Math.PI * 2);
    _ctx.fillStyle = CONFIG.dotColor;
    _ctx.fill();
    _ctx.strokeStyle = '#06090f';
    _ctx.lineWidth = 2;
    _ctx.stroke();
  }

  function _drawCurrentRateIndicator(chartW, chartH, p, minRate, range) {
    if (_data.length === 0) return;
    var lastRate = _data[_data.length - 1].rate;
    var y = p.top + chartH - ((lastRate - minRate) / range) * chartH;

    _ctx.fillStyle = CONFIG.dotColor;
    _ctx.beginPath();
    _ctx.arc(p.left + chartW, y, 3, 0, Math.PI * 2);
    _ctx.fill();
  }

  function _drawAxisLabels(w, h, p, chartW, chartH, minRate, maxRate) {
    _ctx.fillStyle = CONFIG.textColor;
    _ctx.font = '11px Inter, system-ui, sans-serif';
    _ctx.textAlign = 'right';
    _ctx.textBaseline = 'middle';

    var gridLines = _isMobile ? 4 : 5;
    for (var i = 0; i <= gridLines; i++) {
      var val = maxRate - (i / gridLines) * (maxRate - minRate);
      var y = p.top + (chartH / gridLines) * i;
      _ctx.fillText(val.toFixed(2), p.left - 8, y);
    }

    _ctx.textAlign = 'center';
    _ctx.textBaseline = 'top';
    var labelCount = _isMobile ? 3 : 5;
    var step = Math.floor(_data.length / labelCount);

    for (var j = 0; j < _data.length; j += step) {
      if (j >= _data.length) break;
      var px = p.left + (j / Math.max(1, _data.length - 1)) * chartW;
      _ctx.fillText(_formatTime(_data[j].time), px, p.top + chartH + 10);
    }
  }

  function _drawEmpty(w, h) {
    _ctx.fillStyle = CONFIG.textColor;
    _ctx.font = '13px Inter, system-ui, sans-serif';
    _ctx.textAlign = 'center';
    _ctx.textBaseline = 'middle';
    _ctx.fillText('Loading chart data...', w / 2, h / 2);
  }

  function _showTooltip(idx, pos) {
    if (!_tooltip || idx < 0 || idx >= _data.length) return;

    var point = _data[idx];
    var tipTime = _tooltip.querySelector('.xr__tip-t');
    var tipVal = _tooltip.querySelector('.xr__tip-v');

    if (tipTime) tipTime.textContent = _formatDateTime(point.time);
    if (tipVal) tipVal.textContent = 'PKR ' + point.rate.toFixed(4);

    var rect = _canvas.getBoundingClientRect();
    var tipW = _tooltip.offsetWidth;
    var tipH = _tooltip.offsetHeight;

    var tx = pos.x + 12;
    var ty = pos.y - tipH - 8;

    if (tx + tipW > rect.width) tx = pos.x - tipW - 12;
    if (ty < 0) ty = pos.y + 16;

    _tooltip.style.left = tx + 'px';
    _tooltip.style.top = ty + 'px';
    _tooltip.classList.add('show');
  }

  function _hideTooltip() {
    if (_tooltip) _tooltip.classList.remove('show');
  }

  function _formatTime(ts) {
    var date = new Date(ts);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  function _formatDateTime(ts) {
    var date = new Date(ts);
    var options = _isMobile
      ? { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }
      : { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    return date.toLocaleDateString('en-US', options);
  }

  function _animateChart() {
    if (!_isVisible || !_ctx) return;
    _draw();
    _animFrame = requestAnimationFrame(_animateChart);
  }

  function startAnimation() {
    if (_animFrame) cancelAnimationFrame(_animFrame);
    _animateChart();
  }

  function stopAnimation() {
    if (_animFrame) {
      cancelAnimationFrame(_animFrame);
      _animFrame = null;
    }
  }

  return {
    init: init,
    setData: setData,
    updateLastPoint: updateLastPoint,
    resize: resize,
    startAnimation: startAnimation,
    stopAnimation: stopAnimation,
    draw: _draw
  };

})();

// Auto-Initialize on DOM Ready
(function () {
  'use strict';

  function _daysToTimeframe(days) {
    if (days <= 1) return '24H';
    if (days <= 7) return '7D';
    if (days <= 30) return '30D';
    return '90D';
  }

  function loadGraph(days) {
    var tf = _daysToTimeframe(days || 1);
    if (typeof ExchangeRateService === 'undefined') return;

    var data = ExchangeRateService.getHistoricalRates(tf);
    var current = ExchangeRateService.getCurrentRate();
    ExchangeGraph.setData(data, current.rate);
    ExchangeGraph.resize();
  }

  function initGraph() {
    if (typeof ExchangeRateService === 'undefined' || typeof ExchangeGraph === 'undefined') return;

    ExchangeGraph.init('exchangeChart', 'exchangeTooltip');
    loadGraph(1);
  }

  window.PayNGoGraph = {
    setDays: function (days) {
      loadGraph(days);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGraph);
  } else {
    initGraph();
  }
})();
