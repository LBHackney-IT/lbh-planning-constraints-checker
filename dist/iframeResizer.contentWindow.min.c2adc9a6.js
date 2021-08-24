// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"iframeResizer.contentWindow.min.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! iFrame Resizer (iframeSizer.contentWindow.min.js) - v4.3.1 - 2021-01-11
 *  Desc: Include this file in any page being loaded into an iframe
 *        to force the iframe to resize to the content size.
 *  Requires: iframeResizer.min.js on host page.
 *  Copyright: (c) 2021 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */
!function (u) {
  if ("undefined" != typeof window) {
    var n = !0,
        o = 10,
        i = "",
        r = 0,
        a = "",
        t = null,
        c = "",
        s = !1,
        d = {
      resize: 1,
      click: 1
    },
        l = 128,
        f = !0,
        m = 1,
        h = "bodyOffset",
        g = h,
        p = !0,
        v = "",
        y = {},
        w = 32,
        b = null,
        T = !1,
        E = !1,
        O = "[iFrameSizer]",
        S = O.length,
        M = "",
        I = {
      max: 1,
      min: 1,
      bodyScroll: 1,
      documentElementScroll: 1
    },
        N = "child",
        A = !0,
        C = window.parent,
        z = "*",
        k = 0,
        R = !1,
        e = null,
        x = 16,
        L = 1,
        F = "scroll",
        P = F,
        D = window,
        j = function j() {
      ae("onMessage function not defined");
    },
        q = function q() {},
        H = function H() {},
        W = {
      height: function height() {
        return ae("Custom height calculation function not defined"), document.documentElement.offsetHeight;
      },
      width: function width() {
        return ae("Custom width calculation function not defined"), document.body.scrollWidth;
      }
    },
        B = {},
        J = !1;

    try {
      var U = Object.create({}, {
        passive: {
          get: function get() {
            J = !0;
          }
        }
      });
      window.addEventListener("test", te, U), window.removeEventListener("test", te, U);
    } catch (e) {}

    var V,
        X,
        Y,
        K,
        Q,
        G,
        Z = Date.now || function () {
      return new Date().getTime();
    },
        $ = {
      bodyOffset: function bodyOffset() {
        return document.body.offsetHeight + ve("marginTop") + ve("marginBottom");
      },
      offset: function offset() {
        return $.bodyOffset();
      },
      bodyScroll: function bodyScroll() {
        return document.body.scrollHeight;
      },
      custom: function custom() {
        return W.height();
      },
      documentElementOffset: function documentElementOffset() {
        return document.documentElement.offsetHeight;
      },
      documentElementScroll: function documentElementScroll() {
        return document.documentElement.scrollHeight;
      },
      max: function max() {
        return Math.max.apply(null, we($));
      },
      min: function min() {
        return Math.min.apply(null, we($));
      },
      grow: function grow() {
        return $.max();
      },
      lowestElement: function lowestElement() {
        return Math.max($.bodyOffset() || $.documentElementOffset(), ye("bottom", Te()));
      },
      taggedElement: function taggedElement() {
        return be("bottom", "data-iframe-height");
      }
    },
        _ = {
      bodyScroll: function bodyScroll() {
        return document.body.scrollWidth;
      },
      bodyOffset: function bodyOffset() {
        return document.body.offsetWidth;
      },
      custom: function custom() {
        return W.width();
      },
      documentElementScroll: function documentElementScroll() {
        return document.documentElement.scrollWidth;
      },
      documentElementOffset: function documentElementOffset() {
        return document.documentElement.offsetWidth;
      },
      scroll: function scroll() {
        return Math.max(_.bodyScroll(), _.documentElementScroll());
      },
      max: function max() {
        return Math.max.apply(null, we(_));
      },
      min: function min() {
        return Math.min.apply(null, we(_));
      },
      rightMostElement: function rightMostElement() {
        return ye("right", Te());
      },
      taggedElement: function taggedElement() {
        return be("right", "data-iframe-width");
      }
    },
        ee = (V = Ee, Q = null, G = 0, function () {
      var e = Z(),
          t = x - (e - (G = G || e));
      return X = this, Y = arguments, t <= 0 || x < t ? (Q && (clearTimeout(Q), Q = null), G = e, K = V.apply(X, Y), Q || (X = Y = null)) : Q = Q || setTimeout(Oe, t), K;
    });

    ne(window, "message", function (t) {
      var n = {
        init: function init() {
          v = t.data, C = t.source, ue(), f = !1, setTimeout(function () {
            p = !1;
          }, l);
        },
        reset: function reset() {
          p ? re("Page reset ignored by init") : (re("Page size reset by host page"), Ie("resetPage"));
        },
        resize: function resize() {
          Se("resizeParent", "Parent window requested size check");
        },
        moveToAnchor: function moveToAnchor() {
          y.findTarget(i());
        },
        inPageLink: function inPageLink() {
          this.moveToAnchor();
        },
        pageInfo: function pageInfo() {
          var e = i();
          re("PageInfoFromParent called from parent: " + e), H(JSON.parse(e)), re(" --");
        },
        message: function message() {
          var e = i();
          re("onMessage called from parent: " + e), j(JSON.parse(e)), re(" --");
        }
      };

      function o() {
        return t.data.split("]")[1].split(":")[0];
      }

      function i() {
        return t.data.substr(t.data.indexOf(":") + 1);
      }

      function r() {
        return t.data.split(":")[2] in {
          true: 1,
          false: 1
        };
      }

      function e() {
        var e = o();
        e in n ? n[e]() : ("undefined" == typeof module || !module.exports) && "iFrameResize" in window || "jQuery" in window && "iFrameResize" in window.jQuery.prototype || r() || ae("Unexpected message (" + t.data + ")");
      }

      O === ("" + t.data).substr(0, S) && (!1 === f ? e() : r() ? n.init() : re('Ignored message of type "' + o() + '". Received before initialization.'));
    }), ne(window, "readystatechange", Ce), Ce();
  }

  function te() {}

  function ne(e, t, n, o) {
    e.addEventListener(t, n, !!J && (o || {}));
  }

  function oe(e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  }

  function ie(e) {
    return O + "[" + M + "] " + e;
  }

  function re(e) {
    T && "object" == _typeof(window.console) && console.log(ie(e));
  }

  function ae(e) {
    "object" == _typeof(window.console) && console.warn(ie(e));
  }

  function ue() {
    !function () {
      function e(e) {
        return "true" === e;
      }

      var t = v.substr(S).split(":");
      M = t[0], r = u !== t[1] ? Number(t[1]) : r, s = u !== t[2] ? e(t[2]) : s, T = u !== t[3] ? e(t[3]) : T, w = u !== t[4] ? Number(t[4]) : w, n = u !== t[6] ? e(t[6]) : n, a = t[7], g = u !== t[8] ? t[8] : g, i = t[9], c = t[10], k = u !== t[11] ? Number(t[11]) : k, y.enable = u !== t[12] && e(t[12]), N = u !== t[13] ? t[13] : N, P = u !== t[14] ? t[14] : P, E = u !== t[15] ? Boolean(t[15]) : E;
    }(), re("Initialising iFrame (" + window.location.href + ")"), function () {
      function e(e, t) {
        return "function" == typeof e && (re("Setup custom " + t + "CalcMethod"), W[t] = e, e = "custom"), e;
      }

      "iFrameResizer" in window && Object === window.iFrameResizer.constructor && (function () {
        var e = window.iFrameResizer;
        re("Reading data from page: " + JSON.stringify(e)), Object.keys(e).forEach(ce, e), j = "onMessage" in e ? e.onMessage : j, q = "onReady" in e ? e.onReady : q, z = "targetOrigin" in e ? e.targetOrigin : z, g = "heightCalculationMethod" in e ? e.heightCalculationMethod : g, P = "widthCalculationMethod" in e ? e.widthCalculationMethod : P;
      }(), g = e(g, "height"), P = e(P, "width"));
      re("TargetOrigin for parent set to: " + z);
    }(), function () {
      u === a && (a = r + "px");
      se("margin", function (e, t) {
        -1 !== t.indexOf("-") && (ae("Negative CSS value ignored for " + e), t = "");
        return t;
      }("margin", a));
    }(), se("background", i), se("padding", c), function () {
      var e = document.createElement("div");
      e.style.clear = "both", e.style.display = "block", e.style.height = "0", document.body.appendChild(e);
    }(), me(), he(), document.documentElement.style.height = "", document.body.style.height = "", re('HTML & body height set to "auto"'), re("Enable public methods"), D.parentIFrame = {
      autoResize: function autoResize(e) {
        return !0 === e && !1 === n ? (n = !0, ge()) : !1 === e && !0 === n && (n = !1, le("remove"), null !== t && t.disconnect(), clearInterval(b)), Ae(0, 0, "autoResize", JSON.stringify(n)), n;
      },
      close: function close() {
        Ae(0, 0, "close");
      },
      getId: function getId() {
        return M;
      },
      getPageInfo: function getPageInfo(e) {
        "function" == typeof e ? (H = e, Ae(0, 0, "pageInfo")) : (H = function H() {}, Ae(0, 0, "pageInfoStop"));
      },
      moveToAnchor: function moveToAnchor(e) {
        y.findTarget(e);
      },
      reset: function reset() {
        Ne("parentIFrame.reset");
      },
      scrollTo: function scrollTo(e, t) {
        Ae(t, e, "scrollTo");
      },
      scrollToOffset: function scrollToOffset(e, t) {
        Ae(t, e, "scrollToOffset");
      },
      sendMessage: function sendMessage(e, t) {
        Ae(0, 0, "message", JSON.stringify(e), t);
      },
      setHeightCalculationMethod: function setHeightCalculationMethod(e) {
        g = e, me();
      },
      setWidthCalculationMethod: function setWidthCalculationMethod(e) {
        P = e, he();
      },
      setTargetOrigin: function setTargetOrigin(e) {
        re("Set targetOrigin: " + e), z = e;
      },
      size: function size(e, t) {
        Se("size", "parentIFrame.size(" + ((e || "") + (t ? "," + t : "")) + ")", e, t);
      }
    }, function () {
      if (!0 !== E) return;

      function n(e) {
        Ae(0, 0, e.type, e.screenY + ":" + e.screenX);
      }

      function e(e, t) {
        re("Add event listener: " + t), ne(window.document, e, n);
      }

      e("mouseenter", "Mouse Enter"), e("mouseleave", "Mouse Leave");
    }(), ge(), y = function () {
      function r(e) {
        var t = e.getBoundingClientRect(),
            n = {
          x: window.pageXOffset !== u ? window.pageXOffset : document.documentElement.scrollLeft,
          y: window.pageYOffset !== u ? window.pageYOffset : document.documentElement.scrollTop
        };
        return {
          x: parseInt(t.left, 10) + parseInt(n.x, 10),
          y: parseInt(t.top, 10) + parseInt(n.y, 10)
        };
      }

      function n(e) {
        var t,
            n = e.split("#")[1] || e,
            o = decodeURIComponent(n),
            i = document.getElementById(o) || document.getElementsByName(o)[0];
        u !== i ? (t = r(i), re("Moving to in page link (#" + n + ") at x: " + t.x + " y: " + t.y), Ae(t.y, t.x, "scrollToOffset")) : (re("In page link (#" + n + ") not found in iFrame, so sending to parent"), Ae(0, 0, "inPageLink", "#" + n));
      }

      function e() {
        var e = window.location.hash,
            t = window.location.href;
        "" !== e && "#" !== e && n(t);
      }

      function t() {
        Array.prototype.forEach.call(document.querySelectorAll('a[href^="#"]'), function (e) {
          "#" !== e.getAttribute("href") && ne(e, "click", function (e) {
            e.preventDefault(), n(this.getAttribute("href"));
          });
        });
      }

      y.enable ? Array.prototype.forEach && document.querySelectorAll ? (re("Setting up location.hash handlers"), t(), ne(window, "hashchange", e), setTimeout(e, l)) : ae("In page linking not fully supported in this browser! (See README.md for IE8 workaround)") : re("In page linking not enabled");
      return {
        findTarget: n
      };
    }(), Se("init", "Init message from host page"), q();
  }

  function ce(e) {
    var t = e.split("Callback");

    if (2 === t.length) {
      var n = "on" + t[0].charAt(0).toUpperCase() + t[0].slice(1);
      this[n] = this[e], delete this[e], ae("Deprecated: '" + e + "' has been renamed '" + n + "'. The old method will be removed in the next major version.");
    }
  }

  function se(e, t) {
    u !== t && "" !== t && "null" !== t && re("Body " + e + ' set to "' + (document.body.style[e] = t) + '"');
  }

  function de(n) {
    var e = {
      add: function add(e) {
        function t() {
          Se(n.eventName, n.eventType);
        }

        B[e] = t, ne(window, e, t, {
          passive: !0
        });
      },
      remove: function remove(e) {
        var t = B[e];
        delete B[e], function (e, t, n) {
          e.removeEventListener(t, n, !1);
        }(window, e, t);
      }
    };
    n.eventNames && Array.prototype.map ? (n.eventName = n.eventNames[0], n.eventNames.map(e[n.method])) : e[n.method](n.eventName), re(oe(n.method) + " event listener: " + n.eventType);
  }

  function le(e) {
    de({
      method: e,
      eventType: "Animation Start",
      eventNames: ["animationstart", "webkitAnimationStart"]
    }), de({
      method: e,
      eventType: "Animation Iteration",
      eventNames: ["animationiteration", "webkitAnimationIteration"]
    }), de({
      method: e,
      eventType: "Animation End",
      eventNames: ["animationend", "webkitAnimationEnd"]
    }), de({
      method: e,
      eventType: "Input",
      eventName: "input"
    }), de({
      method: e,
      eventType: "Mouse Up",
      eventName: "mouseup"
    }), de({
      method: e,
      eventType: "Mouse Down",
      eventName: "mousedown"
    }), de({
      method: e,
      eventType: "Orientation Change",
      eventName: "orientationchange"
    }), de({
      method: e,
      eventType: "Print",
      eventName: ["afterprint", "beforeprint"]
    }), de({
      method: e,
      eventType: "Ready State Change",
      eventName: "readystatechange"
    }), de({
      method: e,
      eventType: "Touch Start",
      eventName: "touchstart"
    }), de({
      method: e,
      eventType: "Touch End",
      eventName: "touchend"
    }), de({
      method: e,
      eventType: "Touch Cancel",
      eventName: "touchcancel"
    }), de({
      method: e,
      eventType: "Transition Start",
      eventNames: ["transitionstart", "webkitTransitionStart", "MSTransitionStart", "oTransitionStart", "otransitionstart"]
    }), de({
      method: e,
      eventType: "Transition Iteration",
      eventNames: ["transitioniteration", "webkitTransitionIteration", "MSTransitionIteration", "oTransitionIteration", "otransitioniteration"]
    }), de({
      method: e,
      eventType: "Transition End",
      eventNames: ["transitionend", "webkitTransitionEnd", "MSTransitionEnd", "oTransitionEnd", "otransitionend"]
    }), "child" === N && de({
      method: e,
      eventType: "IFrame Resized",
      eventName: "resize"
    });
  }

  function fe(e, t, n, o) {
    return t !== e && (e in n || (ae(e + " is not a valid option for " + o + "CalculationMethod."), e = t), re(o + ' calculation method set to "' + e + '"')), e;
  }

  function me() {
    g = fe(g, h, $, "height");
  }

  function he() {
    P = fe(P, F, _, "width");
  }

  function ge() {
    !0 === n ? (le("add"), function () {
      var e = w < 0;
      window.MutationObserver || window.WebKitMutationObserver ? e ? pe() : t = function () {
        function t(e) {
          function t(e) {
            !1 === e.complete && (re("Attach listeners to " + e.src), e.addEventListener("load", i, !1), e.addEventListener("error", r, !1), u.push(e));
          }

          "attributes" === e.type && "src" === e.attributeName ? t(e.target) : "childList" === e.type && Array.prototype.forEach.call(e.target.querySelectorAll("img"), t);
        }

        function o(e) {
          re("Remove listeners from " + e.src), e.removeEventListener("load", i, !1), e.removeEventListener("error", r, !1), function (e) {
            u.splice(u.indexOf(e), 1);
          }(e);
        }

        function n(e, t, n) {
          o(e.target), Se(t, n + ": " + e.target.src);
        }

        function i(e) {
          n(e, "imageLoad", "Image loaded");
        }

        function r(e) {
          n(e, "imageLoadFailed", "Image load failed");
        }

        function a(e) {
          Se("mutationObserver", "mutationObserver: " + e[0].target + " " + e[0].type), e.forEach(t);
        }

        var u = [],
            c = window.MutationObserver || window.WebKitMutationObserver,
            s = function () {
          var e = document.querySelector("body");
          return s = new c(a), re("Create body MutationObserver"), s.observe(e, {
            attributes: !0,
            attributeOldValue: !1,
            characterData: !0,
            characterDataOldValue: !1,
            childList: !0,
            subtree: !0
          }), s;
        }();

        return {
          disconnect: function disconnect() {
            "disconnect" in s && (re("Disconnect body MutationObserver"), s.disconnect(), u.forEach(o));
          }
        };
      }() : (re("MutationObserver not supported in this browser!"), pe());
    }()) : re("Auto Resize disabled");
  }

  function pe() {
    0 !== w && (re("setInterval: " + w + "ms"), b = setInterval(function () {
      Se("interval", "setInterval: " + w);
    }, Math.abs(w)));
  }

  function ve(e, t) {
    var n = 0;
    return t = t || document.body, n = null !== (n = document.defaultView.getComputedStyle(t, null)) ? n[e] : 0, parseInt(n, o);
  }

  function ye(e, t) {
    for (var n = t.length, o = 0, i = 0, r = oe(e), a = Z(), u = 0; u < n; u++) {
      i < (o = t[u].getBoundingClientRect()[e] + ve("margin" + r, t[u])) && (i = o);
    }

    return a = Z() - a, re("Parsed " + n + " HTML elements"), re("Element position calculated in " + a + "ms"), function (e) {
      x / 2 < e && re("Event throttle increased to " + (x = 2 * e) + "ms");
    }(a), i;
  }

  function we(e) {
    return [e.bodyOffset(), e.bodyScroll(), e.documentElementOffset(), e.documentElementScroll()];
  }

  function be(e, t) {
    var n = document.querySelectorAll("[" + t + "]");
    return 0 === n.length && (ae("No tagged elements (" + t + ") found on page"), document.querySelectorAll("body *")), ye(e, n);
  }

  function Te() {
    return document.querySelectorAll("body *");
  }

  function Ee(e, t, n, o) {
    var i, r;

    function a(e, t) {
      return !(Math.abs(e - t) <= k);
    }

    i = u !== n ? n : $[g](), r = u !== o ? o : _[P](), a(m, i) || s && a(L, r) || "init" === e ? (Me(), Ae(m = i, L = r, e)) : e in {
      init: 1,
      interval: 1,
      size: 1
    } || !(g in I || s && P in I) ? e in {
      interval: 1
    } || re("No change in size detected") : Ne(t);
  }

  function Oe() {
    G = Z(), Q = null, K = V.apply(X, Y), Q || (X = Y = null);
  }

  function Se(e, t, n, o) {
    R && e in d ? re("Trigger event cancelled: " + e) : (e in {
      reset: 1,
      resetPage: 1,
      init: 1
    } || re("Trigger event: " + t), "init" === e ? Ee(e, t, n, o) : ee(e, t, n, o));
  }

  function Me() {
    R || (R = !0, re("Trigger event lock on")), clearTimeout(e), e = setTimeout(function () {
      R = !1, re("Trigger event lock off"), re("--");
    }, l);
  }

  function Ie(e) {
    m = $[g](), L = _[P](), Ae(m, L, e);
  }

  function Ne(e) {
    var t = g;
    g = h, re("Reset trigger event: " + e), Me(), Ie("reset"), g = t;
  }

  function Ae(e, t, n, o, i) {
    var r;
    !0 === A && (u === i ? i = z : re("Message targetOrigin: " + i), re("Sending message to host page (" + (r = M + ":" + (e + ":" + t) + ":" + n + (u !== o ? ":" + o : "")) + ")"), C.postMessage(O + r, i));
  }

  function Ce() {
    "loading" !== document.readyState && window.parent.postMessage("[iFrameResizerChild]Ready", "*");
  }
}();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59042" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","iframeResizer.contentWindow.min.js"], null)
//# sourceMappingURL=/iframeResizer.contentWindow.min.c2adc9a6.js.map