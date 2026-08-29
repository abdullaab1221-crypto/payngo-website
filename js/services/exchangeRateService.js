/**
 * PayNGo Exchange Rate Service
 * Demo data with API-ready architecture
 */

var ExchangeRateService = (function () {
  'use strict';

  var BASE_RATE = 52.85;
  var RATE_VOLATILITY = 0.003;
  var UPDATE_INTERVAL = 3000;

  var _currentRate = BASE_RATE;
  var _listeners = [];
  var _updateTimer = null;
  var _isRunning = false;

  function generateSmoothWalk(currentRate, volatility) {
    var drift = (BASE_RATE - currentRate) * 0.002;
    var noise = (Math.random() - 0.5) * 2 * volatility * currentRate;
    var newRate = currentRate + drift + noise;
    return Math.max(BASE_RATE * 0.92, Math.min(BASE_RATE * 1.08, newRate));
  }

  function generateHistoricalData(timeframe) {
    var points = [];
    var now = Date.now();
    var rate = BASE_RATE;
    var pointsCount, intervalMs;

    switch (timeframe) {
      case '24H':
        pointsCount = 96;
        intervalMs = 15 * 60 * 1000;
        break;
      case '7D':
        pointsCount = 84;
        intervalMs = 2 * 60 * 60 * 1000;
        break;
      case '30D':
        pointsCount = 90;
        intervalMs = 8 * 60 * 60 * 1000;
        break;
      case '90D':
        pointsCount = 90;
        intervalMs = 24 * 60 * 60 * 1000;
        break;
      default:
        pointsCount = 96;
        intervalMs = 15 * 60 * 1000;
    }

    var history = [];
    var tempRate = _currentRate;
    for (var i = 0; i < pointsCount; i++) {
      history.unshift(tempRate);
      tempRate = generateSmoothWalk(tempRate, RATE_VOLATILITY * 1.5);
    }

    for (var j = 0; j < pointsCount; j++) {
      points.push({
        time: now - (pointsCount - 1 - j) * intervalMs,
        rate: history[j]
      });
    }

    return points;
  }

  function getCurrentRate() {
    var change24h = ((_currentRate - BASE_RATE) / BASE_RATE) * 100;
    return {
      rate: _currentRate,
      change24h: change24h,
      lastUpdated: new Date().toISOString(),
      from: 'MYR',
      to: 'PKR'
    };
  }

  function getHistoricalRates(timeframe) {
    return generateHistoricalData(timeframe || '24H');
  }

  function calculateConversion(amount, direction) {
    if (typeof amount !== 'number' || isNaN(amount)) return 0;

    if (direction === 'PKR_to_MYR') {
      return amount / _currentRate;
    }
    return amount * _currentRate;
  }

  function getRateStats(timeframe) {
    var data = generateHistoricalData(timeframe || '24H');
    var rates = data.map(function (d) { return d.rate; });
    var high = Math.max.apply(null, rates);
    var low = Math.min.apply(null, rates);
    var sum = rates.reduce(function (a, b) { return a + b; }, 0);
    var average = sum / rates.length;
    var change = ((rates[rates.length - 1] - rates[0]) / rates[0]) * 100;

    return {
      high: high,
      low: low,
      average: average,
      change: change,
      timeframe: timeframe
    };
  }

  function onUpdate(callback) {
    if (typeof callback === 'function') {
      _listeners.push(callback);
    }
  }

  function offUpdate(callback) {
    _listeners = _listeners.filter(function (cb) { return cb !== callback; });
  }

  function _notifyListeners() {
    var data = getCurrentRate();
    for (var i = 0; i < _listeners.length; i++) {
      try {
        _listeners[i](data);
      } catch (e) {
        console.error('ExchangeRateService listener error:', e);
      }
    }
  }

  function startDemo() {
    if (_isRunning) return;
    _isRunning = true;

    _updateTimer = setInterval(function () {
      _currentRate = generateSmoothWalk(_currentRate, RATE_VOLATILITY);
      _notifyListeners();
    }, UPDATE_INTERVAL);
  }

  function stopDemo() {
    _isRunning = false;
    if (_updateTimer) {
      clearInterval(_updateTimer);
      _updateTimer = null;
    }
  }

  return {
    getCurrentRate: getCurrentRate,
    getHistoricalRates: getHistoricalRates,
    calculateConversion: calculateConversion,
    getRateStats: getRateStats,
    onUpdate: onUpdate,
    offUpdate: offUpdate,
    startDemo: startDemo,
    stopDemo: stopDemo,
    BASE_RATE: BASE_RATE
  };

})();
