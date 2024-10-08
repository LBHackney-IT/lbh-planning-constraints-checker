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
})({"../node_modules/govuk-frontend/govuk/all.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define('GOVUKFrontend', ['exports'], factory) : factory(global.GOVUKFrontend = {});
})(this, function (exports) {
  'use strict';
  /**
   * TODO: Ideally this would be a NodeList.prototype.forEach polyfill
   * This seems to fail in IE8, requires more investigation.
   * See: https://github.com/imagitama/nodelist-foreach-polyfill
   */

  function nodeListForEach(nodes, callback) {
    if (window.NodeList.prototype.forEach) {
      return nodes.forEach(callback);
    }

    for (var i = 0; i < nodes.length; i++) {
      callback.call(window, nodes[i], i, nodes);
    }
  } // Used to generate a unique string, allows multiple instances of the component without
  // Them conflicting with each other.
  // https://stackoverflow.com/a/8809472


  function generateUniqueID() {
    var d = new Date().getTime();

    if (typeof window.performance !== 'undefined' && typeof window.performance.now === 'function') {
      d += window.performance.now(); // use high-precision timer if available
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
  }

  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
    var detect = // In IE8, defineProperty could only act on DOM elements, so full support
    // for the feature requires the ability to set a property on an arbitrary object
    'defineProperty' in Object && function () {
      try {
        var a = {};
        Object.defineProperty(a, 'test', {
          value: 42
        });
        return true;
      } catch (e) {
        return false;
      }
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always

    (function (nativeDefineProperty) {
      var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
      var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
      var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

      Object.defineProperty = function defineProperty(object, property, descriptor) {
        // Where native support exists, assume it
        if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
          return nativeDefineProperty(object, property, descriptor);
        }

        if (object === null || !(object instanceof Object || _typeof(object) === 'object')) {
          throw new TypeError('Object.defineProperty called on non-object');
        }

        if (!(descriptor instanceof Object)) {
          throw new TypeError('Property description must be an object');
        }

        var propertyString = String(property);
        var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;

        var getterType = 'get' in descriptor && _typeof(descriptor.get);

        var setterType = 'set' in descriptor && _typeof(descriptor.set); // handle descriptor.get


        if (getterType) {
          if (getterType !== 'function') {
            throw new TypeError('Getter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineGetter__.call(object, propertyString, descriptor.get);
        } else {
          object[propertyString] = descriptor.value;
        } // handle descriptor.set


        if (setterType) {
          if (setterType !== 'function') {
            throw new TypeError('Setter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineSetter__.call(object, propertyString, descriptor.set);
        } // OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above


        if ('value' in descriptor) {
          object[propertyString] = descriptor.value;
        }

        return object;
      };
    })(Object.defineProperty);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Function/prototype/bind/detect.js
    var detect = ('bind' in Function.prototype);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Function.prototype.bind&flags=always

    Object.defineProperty(Function.prototype, 'bind', {
      value: function bind(that) {
        // .length is 1
        // add necessary es5-shim utilities
        var $Array = Array;
        var $Object = Object;
        var ObjectPrototype = $Object.prototype;
        var ArrayPrototype = $Array.prototype;

        var Empty = function Empty() {};

        var to_string = ObjectPrototype.toString;
        var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
        var isCallable;
        /* inlined from https://npmjs.com/is-callable */

        var fnToStr = Function.prototype.toString,
            tryFunctionObject = function tryFunctionObject(value) {
          try {
            fnToStr.call(value);
            return true;
          } catch (e) {
            return false;
          }
        },
            fnClass = '[object Function]',
            genClass = '[object GeneratorFunction]';

        isCallable = function isCallable(value) {
          if (typeof value !== 'function') {
            return false;
          }

          if (hasToStringTag) {
            return tryFunctionObject(value);
          }

          var strClass = to_string.call(value);
          return strClass === fnClass || strClass === genClass;
        };

        var array_slice = ArrayPrototype.slice;
        var array_concat = ArrayPrototype.concat;
        var array_push = ArrayPrototype.push;
        var max = Math.max; // /add necessary es5-shim utilities
        // 1. Let Target be the this value.

        var target = this; // 2. If IsCallable(Target) is false, throw a TypeError exception.

        if (!isCallable(target)) {
          throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        } // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used


        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.

        var bound;

        var binder = function () {
          if (this instanceof bound) {
            // 15.3.4.5.2 [[Construct]]
            // When the [[Construct]] internal method of a function object,
            // F that was created using the bind function is called with a
            // list of arguments ExtraArgs, the following steps are taken:
            // 1. Let target be the value of F's [[TargetFunction]]
            //   internal property.
            // 2. If target has no [[Construct]] internal method, a
            //   TypeError exception is thrown.
            // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Construct]] internal
            //   method of target providing args as the arguments.
            var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));

            if ($Object(result) === result) {
              return result;
            }

            return this;
          } else {
            // 15.3.4.5.1 [[Call]]
            // When the [[Call]] internal method of a function object, F,
            // which was created using the bind function is called with a
            // this value and a list of arguments ExtraArgs, the following
            // steps are taken:
            // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 2. Let boundThis be the value of F's [[BoundThis]] internal
            //   property.
            // 3. Let target be the value of F's [[TargetFunction]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Call]] internal method
            //   of target providing boundThis as the this value and
            //   providing args as the arguments.
            // equiv: target.call(this, ...boundArgs, ...args)
            return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
          }
        }; // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.


        var boundLength = max(0, target.length - args.length); // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.

        var boundArgs = [];

        for (var i = 0; i < boundLength; i++) {
          array_push.call(boundArgs, '$' + i);
        } // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.


        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
          Empty.prototype = target.prototype;
          bound.prototype = new Empty(); // Clean up dangling references.

          Empty.prototype = null;
        } // TODO
        // 18. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.
        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.
        // 22. Return F.


        return bound;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/detect.js
    var detect = 'DOMTokenList' in this && function (x) {
      return 'classList' in x ? !x.classList.toggle('x', false) && !x.className : true;
    }(document.createElement('x'));

    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/polyfill.js

    (function (global) {
      var nativeImpl = "DOMTokenList" in global && global.DOMTokenList;

      if (!nativeImpl || !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg') && !(document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList)) {
        global.DOMTokenList = function () {
          // eslint-disable-line no-unused-vars
          var dpSupport = true;

          var defineGetter = function (object, name, fn, configurable) {
            if (Object.defineProperty) Object.defineProperty(object, name, {
              configurable: false === dpSupport ? true : !!configurable,
              get: fn
            });else object.__defineGetter__(name, fn);
          };
          /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */


          try {
            defineGetter({}, "support");
          } catch (e) {
            dpSupport = false;
          }

          var _DOMTokenList = function (el, prop) {
            var that = this;
            var tokens = [];
            var tokenMap = {};
            var length = 0;
            var maxLength = 0;

            var addIndexGetter = function (i) {
              defineGetter(that, i, function () {
                preop();
                return tokens[i];
              }, false);
            };

            var reindex = function () {
              /** Define getter functions for array-like access to the tokenList's contents. */
              if (length >= maxLength) for (; maxLength < length; ++maxLength) {
                addIndexGetter(maxLength);
              }
            };
            /** Helper function called at the start of each class method. Internal use only. */


            var preop = function () {
              var error;
              var i;
              var args = arguments;
              var rSpace = /\s+/;
              /** Validate the token/s passed to an instance method, if any. */

              if (args.length) for (i = 0; i < args.length; ++i) if (rSpace.test(args[i])) {
                error = new SyntaxError('String "' + args[i] + '" ' + "contains" + ' an invalid character');
                error.code = 5;
                error.name = "InvalidCharacterError";
                throw error;
              }
              /** Split the new value apart by whitespace*/

              if (_typeof(el[prop]) === "object") {
                tokens = ("" + el[prop].baseVal).replace(/^\s+|\s+$/g, "").split(rSpace);
              } else {
                tokens = ("" + el[prop]).replace(/^\s+|\s+$/g, "").split(rSpace);
              }
              /** Avoid treating blank strings as single-item token lists */


              if ("" === tokens[0]) tokens = [];
              /** Repopulate the internal token lists */

              tokenMap = {};

              for (i = 0; i < tokens.length; ++i) tokenMap[tokens[i]] = true;

              length = tokens.length;
              reindex();
            };
            /** Populate our internal token list if the targeted attribute of the subject element isn't empty. */


            preop();
            /** Return the number of tokens in the underlying string. Read-only. */

            defineGetter(that, "length", function () {
              preop();
              return length;
            });
            /** Override the default toString/toLocaleString methods to return a space-delimited list of tokens when typecast. */

            that.toLocaleString = that.toString = function () {
              preop();
              return tokens.join(" ");
            };

            that.item = function (idx) {
              preop();
              return tokens[idx];
            };

            that.contains = function (token) {
              preop();
              return !!tokenMap[token];
            };

            that.add = function () {
              preop.apply(that, args = arguments);

              for (var args, token, i = 0, l = args.length; i < l; ++i) {
                token = args[i];

                if (!tokenMap[token]) {
                  tokens.push(token);
                  tokenMap[token] = true;
                }
              }
              /** Update the targeted attribute of the attached element if the token list's changed. */


              if (length !== tokens.length) {
                length = tokens.length >>> 0;

                if (_typeof(el[prop]) === "object") {
                  el[prop].baseVal = tokens.join(" ");
                } else {
                  el[prop] = tokens.join(" ");
                }

                reindex();
              }
            };

            that.remove = function () {
              preop.apply(that, args = arguments);
              /** Build a hash of token names to compare against when recollecting our token list. */

              for (var args, ignore = {}, i = 0, t = []; i < args.length; ++i) {
                ignore[args[i]] = true;
                delete tokenMap[args[i]];
              }
              /** Run through our tokens list and reassign only those that aren't defined in the hash declared above. */


              for (i = 0; i < tokens.length; ++i) if (!ignore[tokens[i]]) t.push(tokens[i]);

              tokens = t;
              length = t.length >>> 0;
              /** Update the targeted attribute of the attached element. */

              if (_typeof(el[prop]) === "object") {
                el[prop].baseVal = tokens.join(" ");
              } else {
                el[prop] = tokens.join(" ");
              }

              reindex();
            };

            that.toggle = function (token, force) {
              preop.apply(that, [token]);
              /** Token state's being forced. */

              if (undefined !== force) {
                if (force) {
                  that.add(token);
                  return true;
                } else {
                  that.remove(token);
                  return false;
                }
              }
              /** Token already exists in tokenList. Remove it, and return FALSE. */


              if (tokenMap[token]) {
                that.remove(token);
                return false;
              }
              /** Otherwise, add the token and return TRUE. */


              that.add(token);
              return true;
            };

            return that;
          };

          return _DOMTokenList;
        }();
      } // Add second argument to native DOMTokenList.toggle() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.toggle('x', false);
        if (!e.classList.contains('x')) return;

        e.classList.constructor.prototype.toggle = function toggle(token
        /*, force*/
        ) {
          var force = arguments[1];

          if (force === undefined) {
            var add = !this.contains(token);
            this[add ? 'add' : 'remove'](token);
            return add;
          }

          force = !!force;
          this[force ? 'add' : 'remove'](token);
          return force;
        };
      })(); // Add multiple arguments to native DOMTokenList.add() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.add('a', 'b');
        if (e.classList.contains('b')) return;
        var native = e.classList.constructor.prototype.add;

        e.classList.constructor.prototype.add = function () {
          var args = arguments;
          var l = arguments.length;

          for (var i = 0; i < l; i++) {
            native.call(this, args[i]);
          }
        };
      })(); // Add multiple arguments to native DOMTokenList.remove() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.add('a');
        e.classList.add('b');
        e.classList.remove('a', 'b');
        if (!e.classList.contains('b')) return;
        var native = e.classList.constructor.prototype.remove;

        e.classList.constructor.prototype.remove = function () {
          var args = arguments;
          var l = arguments.length;

          for (var i = 0; i < l; i++) {
            native.call(this, args[i]);
          }
        };
      })();
    })(this);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Document/detect.js
    var detect = ("Document" in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Document&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      if (this.HTMLDocument) {
        // IE8
        // HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
        this.Document = this.HTMLDocument;
      } else {
        // Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
        this.Document = this.HTMLDocument = document.constructor = new Function('return function Document() {}')();
        this.Document.prototype = document;
      }
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Element/detect.js
    var detect = 'Element' in this && 'HTMLElement' in this;
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element&flags=always

    (function () {
      // IE8
      if (window.Element && !window.HTMLElement) {
        window.HTMLElement = window.Element;
        return;
      } // create Element constructor


      window.Element = window.HTMLElement = new Function('return function Element() {}')(); // generate sandboxed iframe

      var vbody = document.appendChild(document.createElement('body'));
      var frame = vbody.appendChild(document.createElement('iframe')); // use sandboxed iframe to replicate Element functionality

      var frameDocument = frame.contentWindow.document;
      var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
      var cache = {}; // polyfill Element.prototype on an element

      var shiv = function (element, deep) {
        var childNodes = element.childNodes || [],
            index = -1,
            key,
            value,
            childNode;

        if (element.nodeType === 1 && element.constructor !== Element) {
          element.constructor = Element;

          for (key in cache) {
            value = cache[key];
            element[key] = value;
          }
        }

        while (childNode = deep && childNodes[++index]) {
          shiv(childNode, deep);
        }

        return element;
      };

      var elements = document.getElementsByTagName('*');
      var nativeCreateElement = document.createElement;
      var interval;
      var loopLimit = 100;
      prototype.attachEvent('onpropertychange', function (event) {
        var propertyName = event.propertyName,
            nonValue = !cache.hasOwnProperty(propertyName),
            newValue = prototype[propertyName],
            oldValue = cache[propertyName],
            index = -1,
            element;

        while (element = elements[++index]) {
          if (element.nodeType === 1) {
            if (nonValue || element[propertyName] === oldValue) {
              element[propertyName] = newValue;
            }
          }
        }

        cache[propertyName] = newValue;
      });
      prototype.constructor = Element;

      if (!prototype.hasAttribute) {
        // <Element>.hasAttribute
        prototype.hasAttribute = function hasAttribute(name) {
          return this.getAttribute(name) !== null;
        };
      } // Apply Element prototype to the pre-existing DOM as soon as the body element appears.


      function bodyCheck() {
        if (!loopLimit--) clearTimeout(interval);

        if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
          shiv(document, true);
          if (interval && document.body.prototype) clearTimeout(interval);
          return !!document.body.prototype;
        }

        return false;
      }

      if (!bodyCheck()) {
        document.onreadystatechange = bodyCheck;
        interval = setInterval(bodyCheck, 25);
      } // Apply to any new elements created after load


      document.createElement = function createElement(nodeName) {
        var element = nativeCreateElement(String(nodeName).toLowerCase());
        return shiv(element);
      }; // remove sandboxed iframe


      document.removeChild(vbody);
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/8717a9e04ac7aff99b4980fbedead98036b0929a/packages/polyfill-library/polyfills/Element/prototype/classList/detect.js
    var detect = 'document' in this && "classList" in document.documentElement && 'Element' in this && 'classList' in Element.prototype && function () {
      var e = document.createElement('span');
      e.classList.add('a', 'b');
      return e.classList.contains('b');
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element.prototype.classList&flags=always

    (function (global) {
      var dpSupport = true;

      var defineGetter = function (object, name, fn, configurable) {
        if (Object.defineProperty) Object.defineProperty(object, name, {
          configurable: false === dpSupport ? true : !!configurable,
          get: fn
        });else object.__defineGetter__(name, fn);
      };
      /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */


      try {
        defineGetter({}, "support");
      } catch (e) {
        dpSupport = false;
      }
      /** Polyfills a property with a DOMTokenList */


      var addProp = function (o, name, attr) {
        defineGetter(o.prototype, name, function () {
          var tokenList;
          var THIS = this,

          /** Prevent this from firing twice for some reason. What the hell, IE. */
          gibberishProperty = "__defineGetter__" + "DEFINE_PROPERTY" + name;
          if (THIS[gibberishProperty]) return tokenList;
          THIS[gibberishProperty] = true;
          /**
           * IE8 can't define properties on native JavaScript objects, so we'll use a dumb hack instead.
           *
           * What this is doing is creating a dummy element ("reflection") inside a detached phantom node ("mirror")
           * that serves as the target of Object.defineProperty instead. While we could simply use the subject HTML
           * element instead, this would conflict with element types which use indexed properties (such as forms and
           * select lists).
           */

          if (false === dpSupport) {
            var visage;
            var mirror = addProp.mirror || document.createElement("div");
            var reflections = mirror.childNodes;
            var l = reflections.length;

            for (var i = 0; i < l; ++i) if (reflections[i]._R === THIS) {
              visage = reflections[i];
              break;
            }
            /** Couldn't find an element's reflection inside the mirror. Materialise one. */


            visage || (visage = mirror.appendChild(document.createElement("div")));
            tokenList = DOMTokenList.call(visage, THIS, attr);
          } else tokenList = new DOMTokenList(THIS, attr);

          defineGetter(THIS, name, function () {
            return tokenList;
          });
          delete THIS[gibberishProperty];
          return tokenList;
        }, true);
      };

      addProp(global.Element, "classList", "className");
      addProp(global.HTMLElement, "classList", "className");
      addProp(global.HTMLLinkElement, "relList", "rel");
      addProp(global.HTMLAnchorElement, "relList", "rel");
      addProp(global.HTMLAreaElement, "relList", "rel");
    })(this);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});

  function Accordion($module) {
    this.$module = $module;
    this.moduleId = $module.getAttribute('id');
    this.$sections = $module.querySelectorAll('.govuk-accordion__section');
    this.$openAllButton = '';
    this.browserSupportsSessionStorage = helper.checkForSessionStorage();
    this.controlsClass = 'govuk-accordion__controls';
    this.openAllClass = 'govuk-accordion__open-all';
    this.iconClass = 'govuk-accordion__icon';
    this.sectionHeaderClass = 'govuk-accordion__section-header';
    this.sectionHeaderFocusedClass = 'govuk-accordion__section-header--focused';
    this.sectionHeadingClass = 'govuk-accordion__section-heading';
    this.sectionSummaryClass = 'govuk-accordion__section-summary';
    this.sectionButtonClass = 'govuk-accordion__section-button';
    this.sectionExpandedClass = 'govuk-accordion__section--expanded';
  } // Initialize component


  Accordion.prototype.init = function () {
    // Check for module
    if (!this.$module) {
      return;
    }

    this.initControls();
    this.initSectionHeaders(); // See if "Open all" button text should be updated

    var areAllSectionsOpen = this.checkIfAllSectionsOpen();
    this.updateOpenAllButton(areAllSectionsOpen);
  }; // Initialise controls and set attributes


  Accordion.prototype.initControls = function () {
    // Create "Open all" button and set attributes
    this.$openAllButton = document.createElement('button');
    this.$openAllButton.setAttribute('type', 'button');
    this.$openAllButton.innerHTML = 'Open all <span class="govuk-visually-hidden">sections</span>';
    this.$openAllButton.setAttribute('class', this.openAllClass);
    this.$openAllButton.setAttribute('aria-expanded', 'false');
    this.$openAllButton.setAttribute('type', 'button'); // Create control wrapper and add controls to it

    var accordionControls = document.createElement('div');
    accordionControls.setAttribute('class', this.controlsClass);
    accordionControls.appendChild(this.$openAllButton);
    this.$module.insertBefore(accordionControls, this.$module.firstChild); // Handle events for the controls

    this.$openAllButton.addEventListener('click', this.onOpenOrCloseAllToggle.bind(this));
  }; // Initialise section headers


  Accordion.prototype.initSectionHeaders = function () {
    // Loop through section headers
    nodeListForEach(this.$sections, function ($section, i) {
      // Set header attributes
      var header = $section.querySelector('.' + this.sectionHeaderClass);
      this.initHeaderAttributes(header, i);
      this.setExpanded(this.isExpanded($section), $section); // Handle events

      header.addEventListener('click', this.onSectionToggle.bind(this, $section)); // See if there is any state stored in sessionStorage and set the sections to
      // open or closed.

      this.setInitialState($section);
    }.bind(this));
  }; // Set individual header attributes


  Accordion.prototype.initHeaderAttributes = function ($headerWrapper, index) {
    var $module = this;
    var $span = $headerWrapper.querySelector('.' + this.sectionButtonClass);
    var $heading = $headerWrapper.querySelector('.' + this.sectionHeadingClass);
    var $summary = $headerWrapper.querySelector('.' + this.sectionSummaryClass); // Copy existing span element to an actual button element, for improved accessibility.

    var $button = document.createElement('button');
    $button.setAttribute('type', 'button');
    $button.setAttribute('id', this.moduleId + '-heading-' + (index + 1));
    $button.setAttribute('aria-controls', this.moduleId + '-content-' + (index + 1)); // Copy all attributes (https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes) from $span to $button

    for (var i = 0; i < $span.attributes.length; i++) {
      var attr = $span.attributes.item(i);
      $button.setAttribute(attr.nodeName, attr.nodeValue);
    }

    $button.addEventListener('focusin', function (e) {
      if (!$headerWrapper.classList.contains($module.sectionHeaderFocusedClass)) {
        $headerWrapper.className += ' ' + $module.sectionHeaderFocusedClass;
      }
    });
    $button.addEventListener('blur', function (e) {
      $headerWrapper.classList.remove($module.sectionHeaderFocusedClass);
    });

    if (typeof $summary !== 'undefined' && $summary !== null) {
      $button.setAttribute('aria-describedby', this.moduleId + '-summary-' + (index + 1));
    } // $span could contain HTML elements (see https://www.w3.org/TR/2011/WD-html5-20110525/content-models.html#phrasing-content)


    $button.innerHTML = $span.innerHTML;
    $heading.removeChild($span);
    $heading.appendChild($button); // Add "+/-" icon

    var icon = document.createElement('span');
    icon.className = this.iconClass;
    icon.setAttribute('aria-hidden', 'true');
    $button.appendChild(icon);
  }; // When section toggled, set and store state


  Accordion.prototype.onSectionToggle = function ($section) {
    var expanded = this.isExpanded($section);
    this.setExpanded(!expanded, $section); // Store the state in sessionStorage when a change is triggered

    this.storeState($section);
  }; // When Open/Close All toggled, set and store state


  Accordion.prototype.onOpenOrCloseAllToggle = function () {
    var $module = this;
    var $sections = this.$sections;
    var nowExpanded = !this.checkIfAllSectionsOpen();
    nodeListForEach($sections, function ($section) {
      $module.setExpanded(nowExpanded, $section); // Store the state in sessionStorage when a change is triggered

      $module.storeState($section);
    });
    $module.updateOpenAllButton(nowExpanded);
  }; // Set section attributes when opened/closed


  Accordion.prototype.setExpanded = function (expanded, $section) {
    var $button = $section.querySelector('.' + this.sectionButtonClass);
    $button.setAttribute('aria-expanded', expanded);

    if (expanded) {
      $section.classList.add(this.sectionExpandedClass);
    } else {
      $section.classList.remove(this.sectionExpandedClass);
    } // See if "Open all" button text should be updated


    var areAllSectionsOpen = this.checkIfAllSectionsOpen();
    this.updateOpenAllButton(areAllSectionsOpen);
  }; // Get state of section


  Accordion.prototype.isExpanded = function ($section) {
    return $section.classList.contains(this.sectionExpandedClass);
  }; // Check if all sections are open


  Accordion.prototype.checkIfAllSectionsOpen = function () {
    // Get a count of all the Accordion sections
    var sectionsCount = this.$sections.length; // Get a count of all Accordion sections that are expanded

    var expandedSectionCount = this.$module.querySelectorAll('.' + this.sectionExpandedClass).length;
    var areAllSectionsOpen = sectionsCount === expandedSectionCount;
    return areAllSectionsOpen;
  }; // Update "Open all" button


  Accordion.prototype.updateOpenAllButton = function (expanded) {
    var newButtonText = expanded ? 'Close all' : 'Open all';
    newButtonText += '<span class="govuk-visually-hidden"> sections</span>';
    this.$openAllButton.setAttribute('aria-expanded', expanded);
    this.$openAllButton.innerHTML = newButtonText;
  }; // Check for `window.sessionStorage`, and that it actually works.


  var helper = {
    checkForSessionStorage: function () {
      var testString = 'this is the test string';
      var result;

      try {
        window.sessionStorage.setItem(testString, testString);
        result = window.sessionStorage.getItem(testString) === testString.toString();
        window.sessionStorage.removeItem(testString);
        return result;
      } catch (exception) {
        if (typeof console === 'undefined' || typeof console.log === 'undefined') {
          console.log('Notice: sessionStorage not available.');
        }
      }
    }
  }; // Set the state of the accordions in sessionStorage

  Accordion.prototype.storeState = function ($section) {
    if (this.browserSupportsSessionStorage) {
      // We need a unique way of identifying each content in the accordion. Since
      // an `#id` should be unique and an `id` is required for `aria-` attributes
      // `id` can be safely used.
      var $button = $section.querySelector('.' + this.sectionButtonClass);

      if ($button) {
        var contentId = $button.getAttribute('aria-controls');
        var contentState = $button.getAttribute('aria-expanded');

        if (typeof contentId === 'undefined' && (typeof console === 'undefined' || typeof console.log === 'undefined')) {
          console.error(new Error('No aria controls present in accordion section heading.'));
        }

        if (typeof contentState === 'undefined' && (typeof console === 'undefined' || typeof console.log === 'undefined')) {
          console.error(new Error('No aria expanded present in accordion section heading.'));
        } // Only set the state when both `contentId` and `contentState` are taken from the DOM.


        if (contentId && contentState) {
          window.sessionStorage.setItem(contentId, contentState);
        }
      }
    }
  }; // Read the state of the accordions from sessionStorage


  Accordion.prototype.setInitialState = function ($section) {
    if (this.browserSupportsSessionStorage) {
      var $button = $section.querySelector('.' + this.sectionButtonClass);

      if ($button) {
        var contentId = $button.getAttribute('aria-controls');
        var contentState = contentId ? window.sessionStorage.getItem(contentId) : null;

        if (contentState !== null) {
          this.setExpanded(contentState === 'true', $section);
        }
      }
    }
  };

  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Window/detect.js
    var detect = ('Window' in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Window&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      (function (global) {
        if (global.constructor) {
          global.Window = global.constructor;
        } else {
          (global.Window = global.constructor = new Function('return function Window() {}')()).prototype = this;
        }
      })(this);
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Event/detect.js
    var detect = function (global) {
      if (!('Event' in global)) return false;
      if (typeof global.Event === 'function') return true;

      try {
        // In IE 9-11, the Event object exists but cannot be instantiated
        new Event('click');
        return true;
      } catch (e) {
        return false;
      }
    }(this);

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Event&flags=always

    (function () {
      var unlistenableWindowEvents = {
        click: 1,
        dblclick: 1,
        keyup: 1,
        keypress: 1,
        keydown: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1,
        mouseover: 1,
        mouseenter: 1,
        mouseleave: 1,
        mouseout: 1,
        storage: 1,
        storagecommit: 1,
        textinput: 1
      }; // This polyfill depends on availability of `document` so will not run in a worker
      // However, we asssume there are no browsers with worker support that lack proper
      // support for `Event` within the worker

      if (typeof document === 'undefined' || typeof window === 'undefined') return;

      function indexOf(array, element) {
        var index = -1,
            length = array.length;

        while (++index < length) {
          if (index in array && array[index] === element) {
            return index;
          }
        }

        return -1;
      }

      var existingProto = window.Event && window.Event.prototype || null;

      window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
        if (!type) {
          throw new Error('Not enough arguments');
        }

        var event; // Shortcut if browser supports createEvent

        if ('createEvent' in document) {
          event = document.createEvent('Event');
          var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
          var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
          event.initEvent(type, bubbles, cancelable);
          return event;
        }

        event = document.createEventObject();
        event.type = type;
        event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
        event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
        return event;
      };

      if (existingProto) {
        Object.defineProperty(window.Event, 'prototype', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: existingProto
        });
      }

      if (!('createEvent' in document)) {
        window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1];

          if (element === window && type in unlistenableWindowEvents) {
            throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
          }

          if (!element._events) {
            element._events = {};
          }

          if (!element._events[type]) {
            element._events[type] = function (event) {
              var list = element._events[event.type].list,
                  events = list.slice(),
                  index = -1,
                  length = events.length,
                  eventElement;

              event.preventDefault = function preventDefault() {
                if (event.cancelable !== false) {
                  event.returnValue = false;
                }
              };

              event.stopPropagation = function stopPropagation() {
                event.cancelBubble = true;
              };

              event.stopImmediatePropagation = function stopImmediatePropagation() {
                event.cancelBubble = true;
                event.cancelImmediate = true;
              };

              event.currentTarget = element;
              event.relatedTarget = event.fromElement || null;
              event.target = event.target || event.srcElement || element;
              event.timeStamp = new Date().getTime();

              if (event.clientX) {
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
              }

              while (++index < length && !event.cancelImmediate) {
                if (index in events) {
                  eventElement = events[index];

                  if (indexOf(list, eventElement) !== -1 && typeof eventElement === 'function') {
                    eventElement.call(element, event);
                  }
                }
              }
            };

            element._events[type].list = [];

            if (element.attachEvent) {
              element.attachEvent('on' + type, element._events[type]);
            }
          }

          element._events[type].list.push(listener);
        };

        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1],
              index;

          if (element._events && element._events[type] && element._events[type].list) {
            index = indexOf(element._events[type].list, listener);

            if (index !== -1) {
              element._events[type].list.splice(index, 1);

              if (!element._events[type].list.length) {
                if (element.detachEvent) {
                  element.detachEvent('on' + type, element._events[type]);
                }

                delete element._events[type];
              }
            }
          }
        };

        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
          if (!arguments.length) {
            throw new Error('Not enough arguments');
          }

          if (!event || typeof event.type !== 'string') {
            throw new Error('DOM Events Exception 0');
          }

          var element = this,
              type = event.type;

          try {
            if (!event.bubbles) {
              event.cancelBubble = true;

              var cancelBubbleEvent = function (event) {
                event.cancelBubble = true;
                (element || window).detachEvent('on' + type, cancelBubbleEvent);
              };

              this.attachEvent('on' + type, cancelBubbleEvent);
            }

            this.fireEvent('on' + type, event);
          } catch (error) {
            event.target = element;

            do {
              event.currentTarget = element;

              if ('_events' in element && typeof element._events[type] === 'function') {
                element._events[type].call(element, event);
              }

              if (typeof element['on' + type] === 'function') {
                element['on' + type].call(element, event);
              }

              element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
            } while (element && !event.cancelBubble);
          }

          return true;
        }; // Add the DOMContentLoaded Event


        document.attachEvent('onreadystatechange', function () {
          if (document.readyState === 'complete') {
            document.dispatchEvent(new Event('DOMContentLoaded', {
              bubbles: true
            }));
          }
        });
      }
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  var KEY_SPACE = 32;
  var DEBOUNCE_TIMEOUT_IN_SECONDS = 1;

  function Button($module) {
    this.$module = $module;
    this.debounceFormSubmitTimer = null;
  }
  /**
  * JavaScript 'shim' to trigger the click event of element(s) when the space key is pressed.
  *
  * Created since some Assistive Technologies (for example some Screenreaders)
  * will tell a user to press space on a 'button', so this functionality needs to be shimmed
  * See https://github.com/alphagov/govuk_elements/pull/272#issuecomment-233028270
  *
  * @param {object} event event
  */


  Button.prototype.handleKeyDown = function (event) {
    // get the target element
    var target = event.target; // if the element has a role='button' and the pressed key is a space, we'll simulate a click

    if (target.getAttribute('role') === 'button' && event.keyCode === KEY_SPACE) {
      event.preventDefault(); // trigger the target's click event

      target.click();
    }
  };
  /**
  * If the click quickly succeeds a previous click then nothing will happen.
  * This stops people accidentally causing multiple form submissions by
  * double clicking buttons.
  */


  Button.prototype.debounce = function (event) {
    var target = event.target; // Check the button that is clicked on has the preventDoubleClick feature enabled

    if (target.getAttribute('data-prevent-double-click') !== 'true') {
      return;
    } // If the timer is still running then we want to prevent the click from submitting the form


    if (this.debounceFormSubmitTimer) {
      event.preventDefault();
      return false;
    }

    this.debounceFormSubmitTimer = setTimeout(function () {
      this.debounceFormSubmitTimer = null;
    }.bind(this), DEBOUNCE_TIMEOUT_IN_SECONDS * 1000);
  };
  /**
  * Initialise an event listener for keydown at document level
  * this will help listening for later inserted elements with a role="button"
  */


  Button.prototype.init = function () {
    this.$module.addEventListener('keydown', this.handleKeyDown);
    this.$module.addEventListener('click', this.debounce);
  };
  /**
   * JavaScript 'polyfill' for HTML5's <details> and <summary> elements
   * and 'shim' to add accessiblity enhancements for all browsers
   *
   * http://caniuse.com/#feat=details
   */


  var KEY_ENTER = 13;
  var KEY_SPACE$1 = 32;

  function Details($module) {
    this.$module = $module;
  }

  Details.prototype.init = function () {
    if (!this.$module) {
      return;
    } // If there is native details support, we want to avoid running code to polyfill native behaviour.


    var hasNativeDetails = typeof this.$module.open === 'boolean';

    if (hasNativeDetails) {
      return;
    }

    this.polyfillDetails();
  };

  Details.prototype.polyfillDetails = function () {
    var $module = this.$module; // Save shortcuts to the inner summary and content elements

    var $summary = this.$summary = $module.getElementsByTagName('summary').item(0);
    var $content = this.$content = $module.getElementsByTagName('div').item(0); // If <details> doesn't have a <summary> and a <div> representing the content
    // it means the required HTML structure is not met so the script will stop

    if (!$summary || !$content) {
      return;
    } // If the content doesn't have an ID, assign it one now
    // which we'll need for the summary's aria-controls assignment


    if (!$content.id) {
      $content.id = 'details-content-' + generateUniqueID();
    } // Add ARIA role="group" to details


    $module.setAttribute('role', 'group'); // Add role=button to summary

    $summary.setAttribute('role', 'button'); // Add aria-controls

    $summary.setAttribute('aria-controls', $content.id); // Set tabIndex so the summary is keyboard accessible for non-native elements
    //
    // We have to use the camelcase `tabIndex` property as there is a bug in IE6/IE7 when we set the correct attribute lowercase:
    // See http://web.archive.org/web/20170120194036/http://www.saliences.com/browserBugs/tabIndex.html for more information.

    $summary.tabIndex = 0; // Detect initial open state

    var openAttr = $module.getAttribute('open') !== null;

    if (openAttr === true) {
      $summary.setAttribute('aria-expanded', 'true');
      $content.setAttribute('aria-hidden', 'false');
    } else {
      $summary.setAttribute('aria-expanded', 'false');
      $content.setAttribute('aria-hidden', 'true');
      $content.style.display = 'none';
    } // Bind an event to handle summary elements


    this.polyfillHandleInputs($summary, this.polyfillSetAttributes.bind(this));
  };
  /**
  * Define a statechange function that updates aria-expanded and style.display
  * @param {object} summary element
  */


  Details.prototype.polyfillSetAttributes = function () {
    var $module = this.$module;
    var $summary = this.$summary;
    var $content = this.$content;
    var expanded = $summary.getAttribute('aria-expanded') === 'true';
    var hidden = $content.getAttribute('aria-hidden') === 'true';
    $summary.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    $content.setAttribute('aria-hidden', hidden ? 'false' : 'true');
    $content.style.display = expanded ? 'none' : '';
    var hasOpenAttr = $module.getAttribute('open') !== null;

    if (!hasOpenAttr) {
      $module.setAttribute('open', 'open');
    } else {
      $module.removeAttribute('open');
    }

    return true;
  };
  /**
  * Handle cross-modal click events
  * @param {object} node element
  * @param {function} callback function
  */


  Details.prototype.polyfillHandleInputs = function (node, callback) {
    node.addEventListener('keypress', function (event) {
      var target = event.target; // When the key gets pressed - check if it is enter or space

      if (event.keyCode === KEY_ENTER || event.keyCode === KEY_SPACE$1) {
        if (target.nodeName.toLowerCase() === 'summary') {
          // Prevent space from scrolling the page
          // and enter from submitting a form
          event.preventDefault(); // Click to let the click event do all the necessary action

          if (target.click) {
            target.click();
          } else {
            // except Safari 5.1 and under don't support .click() here
            callback(event);
          }
        }
      }
    }); // Prevent keyup to prevent clicking twice in Firefox when using space key

    node.addEventListener('keyup', function (event) {
      var target = event.target;

      if (event.keyCode === KEY_SPACE$1) {
        if (target.nodeName.toLowerCase() === 'summary') {
          event.preventDefault();
        }
      }
    });
    node.addEventListener('click', callback);
  };

  function CharacterCount($module) {
    this.$module = $module;
    this.$textarea = $module.querySelector('.govuk-js-character-count');

    if (this.$textarea) {
      this.$countMessage = $module.querySelector('[id="' + this.$textarea.id + '-info"]');
    }
  }

  CharacterCount.prototype.defaults = {
    characterCountAttribute: 'data-maxlength',
    wordCountAttribute: 'data-maxwords'
  }; // Initialize component

  CharacterCount.prototype.init = function () {
    // Check for module
    var $module = this.$module;
    var $textarea = this.$textarea;
    var $countMessage = this.$countMessage;

    if (!$textarea || !$countMessage) {
      return;
    } // We move count message right after the field
    // Kept for backwards compatibility


    $textarea.insertAdjacentElement('afterend', $countMessage); // Read options set using dataset ('data-' values)

    this.options = this.getDataset($module); // Determine the limit attribute (characters or words)

    var countAttribute = this.defaults.characterCountAttribute;

    if (this.options.maxwords) {
      countAttribute = this.defaults.wordCountAttribute;
    } // Save the element limit


    this.maxLength = $module.getAttribute(countAttribute); // Check for limit

    if (!this.maxLength) {
      return;
    } // Remove hard limit if set


    $module.removeAttribute('maxlength'); // When the page is restored after navigating 'back' in some browsers the
    // state of the character count is not restored until *after* the DOMContentLoaded
    // event is fired, so we need to sync after the pageshow event in browsers
    // that support it.

    if ('onpageshow' in window) {
      window.addEventListener('pageshow', this.sync.bind(this));
    } else {
      window.addEventListener('DOMContentLoaded', this.sync.bind(this));
    }

    this.sync();
  };

  CharacterCount.prototype.sync = function () {
    this.bindChangeEvents();
    this.updateCountMessage();
  }; // Read data attributes


  CharacterCount.prototype.getDataset = function (element) {
    var dataset = {};
    var attributes = element.attributes;

    if (attributes) {
      for (var i = 0; i < attributes.length; i++) {
        var attribute = attributes[i];
        var match = attribute.name.match(/^data-(.+)/);

        if (match) {
          dataset[match[1]] = attribute.value;
        }
      }
    }

    return dataset;
  }; // Counts characters or words in text


  CharacterCount.prototype.count = function (text) {
    var length;

    if (this.options.maxwords) {
      var tokens = text.match(/\S+/g) || []; // Matches consecutive non-whitespace chars

      length = tokens.length;
    } else {
      length = text.length;
    }

    return length;
  }; // Bind input propertychange to the elements and update based on the change


  CharacterCount.prototype.bindChangeEvents = function () {
    var $textarea = this.$textarea;
    $textarea.addEventListener('keyup', this.checkIfValueChanged.bind(this)); // Bind focus/blur events to start/stop polling

    $textarea.addEventListener('focus', this.handleFocus.bind(this));
    $textarea.addEventListener('blur', this.handleBlur.bind(this));
  }; // Speech recognition software such as Dragon NaturallySpeaking will modify the
  // fields by directly changing its `value`. These changes don't trigger events
  // in JavaScript, so we need to poll to handle when and if they occur.


  CharacterCount.prototype.checkIfValueChanged = function () {
    if (!this.$textarea.oldValue) this.$textarea.oldValue = '';

    if (this.$textarea.value !== this.$textarea.oldValue) {
      this.$textarea.oldValue = this.$textarea.value;
      this.updateCountMessage();
    }
  }; // Update message box


  CharacterCount.prototype.updateCountMessage = function () {
    var countElement = this.$textarea;
    var options = this.options;
    var countMessage = this.$countMessage; // Determine the remaining number of characters/words

    var currentLength = this.count(countElement.value);
    var maxLength = this.maxLength;
    var remainingNumber = maxLength - currentLength; // Set threshold if presented in options

    var thresholdPercent = options.threshold ? options.threshold : 0;
    var thresholdValue = maxLength * thresholdPercent / 100;

    if (thresholdValue > currentLength) {
      countMessage.classList.add('govuk-character-count__message--disabled'); // Ensure threshold is hidden for users of assistive technologies

      countMessage.setAttribute('aria-hidden', true);
    } else {
      countMessage.classList.remove('govuk-character-count__message--disabled'); // Ensure threshold is visible for users of assistive technologies

      countMessage.removeAttribute('aria-hidden');
    } // Update styles


    if (remainingNumber < 0) {
      countElement.classList.add('govuk-textarea--error');
      countMessage.classList.remove('govuk-hint');
      countMessage.classList.add('govuk-error-message');
    } else {
      countElement.classList.remove('govuk-textarea--error');
      countMessage.classList.remove('govuk-error-message');
      countMessage.classList.add('govuk-hint');
    } // Update message


    var charVerb = 'remaining';
    var charNoun = 'character';
    var displayNumber = remainingNumber;

    if (options.maxwords) {
      charNoun = 'word';
    }

    charNoun = charNoun + (remainingNumber === -1 || remainingNumber === 1 ? '' : 's');
    charVerb = remainingNumber < 0 ? 'too many' : 'remaining';
    displayNumber = Math.abs(remainingNumber);
    countMessage.innerHTML = 'You have ' + displayNumber + ' ' + charNoun + ' ' + charVerb;
  };

  CharacterCount.prototype.handleFocus = function () {
    // Check if value changed on focus
    this.valueChecker = setInterval(this.checkIfValueChanged.bind(this), 1000);
  };

  CharacterCount.prototype.handleBlur = function () {
    // Cancel value checking on blur
    clearInterval(this.valueChecker);
  };

  function Checkboxes($module) {
    this.$module = $module;
    this.$inputs = $module.querySelectorAll('input[type="checkbox"]');
  }
  /**
   * Initialise Checkboxes
   *
   * Checkboxes can be associated with a 'conditionally revealed' content block –
   * for example, a checkbox for 'Phone' could reveal an additional form field for
   * the user to enter their phone number.
   *
   * These associations are made using a `data-aria-controls` attribute, which is
   * promoted to an aria-controls attribute during initialisation.
   *
   * We also need to restore the state of any conditional reveals on the page (for
   * example if the user has navigated back), and set up event handlers to keep
   * the reveal in sync with the checkbox state.
   */


  Checkboxes.prototype.init = function () {
    var $module = this.$module;
    var $inputs = this.$inputs;
    nodeListForEach($inputs, function ($input) {
      var target = $input.getAttribute('data-aria-controls'); // Skip checkboxes without data-aria-controls attributes, or where the
      // target element does not exist.

      if (!target || !$module.querySelector('#' + target)) {
        return;
      } // Promote the data-aria-controls attribute to a aria-controls attribute
      // so that the relationship is exposed in the AOM


      $input.setAttribute('aria-controls', target);
      $input.removeAttribute('data-aria-controls');
    }); // When the page is restored after navigating 'back' in some browsers the
    // state of form controls is not restored until *after* the DOMContentLoaded
    // event is fired, so we need to sync after the pageshow event in browsers
    // that support it.

    if ('onpageshow' in window) {
      window.addEventListener('pageshow', this.syncAllConditionalReveals.bind(this));
    } else {
      window.addEventListener('DOMContentLoaded', this.syncAllConditionalReveals.bind(this));
    } // Although we've set up handlers to sync state on the pageshow or
    // DOMContentLoaded event, init could be called after those events have fired,
    // for example if they are added to the page dynamically, so sync now too.


    this.syncAllConditionalReveals();
    $module.addEventListener('click', this.handleClick.bind(this));
  };
  /**
   * Sync the conditional reveal states for all inputs in this $module.
   */


  Checkboxes.prototype.syncAllConditionalReveals = function () {
    nodeListForEach(this.$inputs, this.syncConditionalRevealWithInputState.bind(this));
  };
  /**
   * Sync conditional reveal with the input state
   *
   * Synchronise the visibility of the conditional reveal, and its accessible
   * state, with the input's checked state.
   *
   * @param {HTMLInputElement} $input Checkbox input
   */


  Checkboxes.prototype.syncConditionalRevealWithInputState = function ($input) {
    var $target = this.$module.querySelector('#' + $input.getAttribute('aria-controls'));

    if ($target && $target.classList.contains('govuk-checkboxes__conditional')) {
      var inputIsChecked = $input.checked;
      $input.setAttribute('aria-expanded', inputIsChecked);
      $target.classList.toggle('govuk-checkboxes__conditional--hidden', !inputIsChecked);
    }
  };
  /**
   * Uncheck other checkboxes
   *
   * Find any other checkbox inputs with the same name value, and uncheck them.
   * This is useful for when a “None of these" checkbox is checked.
   */


  Checkboxes.prototype.unCheckAllInputsExcept = function ($input) {
    var allInputsWithSameName = document.querySelectorAll('input[type="checkbox"][name="' + $input.name + '"]');
    nodeListForEach(allInputsWithSameName, function ($inputWithSameName) {
      var hasSameFormOwner = $input.form === $inputWithSameName.form;

      if (hasSameFormOwner && $inputWithSameName !== $input) {
        $inputWithSameName.checked = false;
      }
    });
    this.syncAllConditionalReveals();
  };
  /**
   * Uncheck exclusive inputs
   *
   * Find any checkbox inputs with the same name value and the 'exclusive' behaviour,
   * and uncheck them. This helps prevent someone checking both a regular checkbox and a
   * "None of these" checkbox in the same fieldset.
   */


  Checkboxes.prototype.unCheckExclusiveInputs = function ($input) {
    var allInputsWithSameNameAndExclusiveBehaviour = document.querySelectorAll('input[data-behaviour="exclusive"][type="checkbox"][name="' + $input.name + '"]');
    nodeListForEach(allInputsWithSameNameAndExclusiveBehaviour, function ($exclusiveInput) {
      var hasSameFormOwner = $input.form === $exclusiveInput.form;

      if (hasSameFormOwner) {
        $exclusiveInput.checked = false;
      }
    });
    this.syncAllConditionalReveals();
  };
  /**
   * Click event handler
   *
   * Handle a click within the $module – if the click occurred on a checkbox, sync
   * the state of any associated conditional reveal with the checkbox state.
   *
   * @param {MouseEvent} event Click event
   */


  Checkboxes.prototype.handleClick = function (event) {
    var $target = event.target; // Ignore clicks on things that aren't checkbox inputs

    if ($target.type !== 'checkbox') {
      return;
    } // If the checkbox conditionally-reveals some content, sync the state


    var hasAriaControls = $target.getAttribute('aria-controls');

    if (hasAriaControls) {
      this.syncConditionalRevealWithInputState($target);
    } // No further behaviour needed for unchecking


    if (!$target.checked) {
      return;
    } // Handle 'exclusive' checkbox behaviour (ie "None of these")


    var hasBehaviourExclusive = $target.getAttribute('data-behaviour') === 'exclusive';

    if (hasBehaviourExclusive) {
      this.unCheckAllInputsExcept($target);
    } else {
      this.unCheckExclusiveInputs($target);
    }
  };

  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/1f3c09b402f65bf6e393f933a15ba63f1b86ef1f/packages/polyfill-library/polyfills/Element/prototype/matches/detect.js
    var detect = 'document' in this && "matches" in document.documentElement;
    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/1f3c09b402f65bf6e393f933a15ba63f1b86ef1f/packages/polyfill-library/polyfills/Element/prototype/matches/polyfill.js

    Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function matches(selector) {
      var element = this;
      var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      var index = 0;

      while (elements[index] && elements[index] !== element) {
        ++index;
      }

      return !!elements[index];
    };
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/1f3c09b402f65bf6e393f933a15ba63f1b86ef1f/packages/polyfill-library/polyfills/Element/prototype/closest/detect.js
    var detect = 'document' in this && "closest" in document.documentElement;
    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/1f3c09b402f65bf6e393f933a15ba63f1b86ef1f/packages/polyfill-library/polyfills/Element/prototype/closest/polyfill.js

    Element.prototype.closest = function closest(selector) {
      var node = this;

      while (node) {
        if (node.matches(selector)) return node;else node = 'SVGElement' in window && node instanceof SVGElement ? node.parentNode : node.parentElement;
      }

      return null;
    };
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});

  function ErrorSummary($module) {
    this.$module = $module;
  }

  ErrorSummary.prototype.init = function () {
    var $module = this.$module;

    if (!$module) {
      return;
    }

    $module.focus();
    $module.addEventListener('click', this.handleClick.bind(this));
  };
  /**
  * Click event handler
  *
  * @param {MouseEvent} event - Click event
  */


  ErrorSummary.prototype.handleClick = function (event) {
    var target = event.target;

    if (this.focusTarget(target)) {
      event.preventDefault();
    }
  };
  /**
   * Focus the target element
   *
   * By default, the browser will scroll the target into view. Because our labels
   * or legends appear above the input, this means the user will be presented with
   * an input without any context, as the label or legend will be off the top of
   * the screen.
   *
   * Manually handling the click event, scrolling the question into view and then
   * focussing the element solves this.
   *
   * This also results in the label and/or legend being announced correctly in
   * NVDA (as tested in 2018.3.2) - without this only the field type is announced
   * (e.g. "Edit, has autocomplete").
   *
   * @param {HTMLElement} $target - Event target
   * @returns {boolean} True if the target was able to be focussed
   */


  ErrorSummary.prototype.focusTarget = function ($target) {
    // If the element that was clicked was not a link, return early
    if ($target.tagName !== 'A' || $target.href === false) {
      return false;
    }

    var inputId = this.getFragmentFromUrl($target.href);
    var $input = document.getElementById(inputId);

    if (!$input) {
      return false;
    }

    var $legendOrLabel = this.getAssociatedLegendOrLabel($input);

    if (!$legendOrLabel) {
      return false;
    } // Scroll the legend or label into view *before* calling focus on the input to
    // avoid extra scrolling in browsers that don't support `preventScroll` (which
    // at time of writing is most of them...)


    $legendOrLabel.scrollIntoView();
    $input.focus({
      preventScroll: true
    });
    return true;
  };
  /**
   * Get fragment from URL
   *
   * Extract the fragment (everything after the hash) from a URL, but not including
   * the hash.
   *
   * @param {string} url - URL
   * @returns {string} Fragment from URL, without the hash
   */


  ErrorSummary.prototype.getFragmentFromUrl = function (url) {
    if (url.indexOf('#') === -1) {
      return false;
    }

    return url.split('#').pop();
  };
  /**
   * Get associated legend or label
   *
   * Returns the first element that exists from this list:
   *
   * - The `<legend>` associated with the closest `<fieldset>` ancestor, as long
   *   as the top of it is no more than half a viewport height away from the
   *   bottom of the input
   * - The first `<label>` that is associated with the input using for="inputId"
   * - The closest parent `<label>`
   *
   * @param {HTMLElement} $input - The input
   * @returns {HTMLElement} Associated legend or label, or null if no associated
   *                        legend or label can be found
   */


  ErrorSummary.prototype.getAssociatedLegendOrLabel = function ($input) {
    var $fieldset = $input.closest('fieldset');

    if ($fieldset) {
      var legends = $fieldset.getElementsByTagName('legend');

      if (legends.length) {
        var $candidateLegend = legends[0]; // If the input type is radio or checkbox, always use the legend if there
        // is one.

        if ($input.type === 'checkbox' || $input.type === 'radio') {
          return $candidateLegend;
        } // For other input types, only scroll to the fieldset’s legend (instead of
        // the label associated with the input) if the input would end up in the
        // top half of the screen.
        //
        // This should avoid situations where the input either ends up off the
        // screen, or obscured by a software keyboard.


        var legendTop = $candidateLegend.getBoundingClientRect().top;
        var inputRect = $input.getBoundingClientRect(); // If the browser doesn't support Element.getBoundingClientRect().height
        // or window.innerHeight (like IE8), bail and just link to the label.

        if (inputRect.height && window.innerHeight) {
          var inputBottom = inputRect.top + inputRect.height;

          if (inputBottom - legendTop < window.innerHeight / 2) {
            return $candidateLegend;
          }
        }
      }
    }

    return document.querySelector("label[for='" + $input.getAttribute('id') + "']") || $input.closest('label');
  };

  function NotificationBanner($module) {
    this.$module = $module;
  }
  /**
   * Initialise the component
   */


  NotificationBanner.prototype.init = function () {
    var $module = this.$module; // Check for module

    if (!$module) {
      return;
    }

    this.setFocus();
  };
  /**
   * Focus the element
   *
   * If `role="alert"` is set, focus the element to help some assistive technologies
   * prioritise announcing it.
   *
   * You can turn off the auto-focus functionality by setting `data-disable-auto-focus="true"` in the
   * component HTML. You might wish to do this based on user research findings, or to avoid a clash
   * with another element which should be focused when the page loads.
   */


  NotificationBanner.prototype.setFocus = function () {
    var $module = this.$module;

    if ($module.getAttribute('data-disable-auto-focus') === 'true') {
      return;
    }

    if ($module.getAttribute('role') !== 'alert') {
      return;
    } // Set tabindex to -1 to make the element focusable with JavaScript.
    // Remove the tabindex on blur as the component doesn't need to be focusable after the page has
    // loaded.


    if (!$module.getAttribute('tabindex')) {
      $module.setAttribute('tabindex', '-1');
      $module.addEventListener('blur', function () {
        $module.removeAttribute('tabindex');
      });
    }

    $module.focus();
  };

  function Header($module) {
    this.$module = $module;
    this.$menuButton = $module && $module.querySelector('.govuk-js-header-toggle');
    this.$menu = this.$menuButton && $module.querySelector('#' + this.$menuButton.getAttribute('aria-controls'));
  }
  /**
   * Initialise header
   *
   * Check for the presence of the header, menu and menu button – if any are
   * missing then there's nothing to do so return early.
   */


  Header.prototype.init = function () {
    if (!this.$module || !this.$menuButton || !this.$menu) {
      return;
    }

    this.syncState(this.$menu.classList.contains('govuk-header__navigation--open'));
    this.$menuButton.addEventListener('click', this.handleMenuButtonClick.bind(this));
  };
  /**
   * Sync menu state
   *
   * Sync the menu button class and the accessible state of the menu and the menu
   * button with the visible state of the menu
   *
   * @param {boolean} isVisible Whether the menu is currently visible
   */


  Header.prototype.syncState = function (isVisible) {
    this.$menuButton.classList.toggle('govuk-header__menu-button--open', isVisible);
    this.$menuButton.setAttribute('aria-expanded', isVisible);
  };
  /**
   * Handle menu button click
   *
   * When the menu button is clicked, change the visibility of the menu and then
   * sync the accessibility state and menu button state
   */


  Header.prototype.handleMenuButtonClick = function () {
    var isVisible = this.$menu.classList.toggle('govuk-header__navigation--open');
    this.syncState(isVisible);
  };

  function Radios($module) {
    this.$module = $module;
    this.$inputs = $module.querySelectorAll('input[type="radio"]');
  }
  /**
   * Initialise Radios
   *
   * Radios can be associated with a 'conditionally revealed' content block – for
   * example, a radio for 'Phone' could reveal an additional form field for the
   * user to enter their phone number.
   *
   * These associations are made using a `data-aria-controls` attribute, which is
   * promoted to an aria-controls attribute during initialisation.
   *
   * We also need to restore the state of any conditional reveals on the page (for
   * example if the user has navigated back), and set up event handlers to keep
   * the reveal in sync with the radio state.
   */


  Radios.prototype.init = function () {
    var $module = this.$module;
    var $inputs = this.$inputs;
    nodeListForEach($inputs, function ($input) {
      var target = $input.getAttribute('data-aria-controls'); // Skip radios without data-aria-controls attributes, or where the
      // target element does not exist.

      if (!target || !$module.querySelector('#' + target)) {
        return;
      } // Promote the data-aria-controls attribute to a aria-controls attribute
      // so that the relationship is exposed in the AOM


      $input.setAttribute('aria-controls', target);
      $input.removeAttribute('data-aria-controls');
    }); // When the page is restored after navigating 'back' in some browsers the
    // state of form controls is not restored until *after* the DOMContentLoaded
    // event is fired, so we need to sync after the pageshow event in browsers
    // that support it.

    if ('onpageshow' in window) {
      window.addEventListener('pageshow', this.syncAllConditionalReveals.bind(this));
    } else {
      window.addEventListener('DOMContentLoaded', this.syncAllConditionalReveals.bind(this));
    } // Although we've set up handlers to sync state on the pageshow or
    // DOMContentLoaded event, init could be called after those events have fired,
    // for example if they are added to the page dynamically, so sync now too.


    this.syncAllConditionalReveals(); // Handle events

    $module.addEventListener('click', this.handleClick.bind(this));
  };
  /**
   * Sync the conditional reveal states for all inputs in this $module.
   */


  Radios.prototype.syncAllConditionalReveals = function () {
    nodeListForEach(this.$inputs, this.syncConditionalRevealWithInputState.bind(this));
  };
  /**
   * Sync conditional reveal with the input state
   *
   * Synchronise the visibility of the conditional reveal, and its accessible
   * state, with the input's checked state.
   *
   * @param {HTMLInputElement} $input Radio input
   */


  Radios.prototype.syncConditionalRevealWithInputState = function ($input) {
    var $target = document.querySelector('#' + $input.getAttribute('aria-controls'));

    if ($target && $target.classList.contains('govuk-radios__conditional')) {
      var inputIsChecked = $input.checked;
      $input.setAttribute('aria-expanded', inputIsChecked);
      $target.classList.toggle('govuk-radios__conditional--hidden', !inputIsChecked);
    }
  };
  /**
   * Click event handler
   *
   * Handle a click within the $module – if the click occurred on a radio, sync
   * the state of the conditional reveal for all radio buttons in the same form
   * with the same name (because checking one radio could have un-checked a radio
   * in another $module)
   *
   * @param {MouseEvent} event Click event
   */


  Radios.prototype.handleClick = function (event) {
    var $clickedInput = event.target; // Ignore clicks on things that aren't radio buttons

    if ($clickedInput.type !== 'radio') {
      return;
    } // We only need to consider radios with conditional reveals, which will have
    // aria-controls attributes.


    var $allInputs = document.querySelectorAll('input[type="radio"][aria-controls]');
    nodeListForEach($allInputs, function ($input) {
      var hasSameFormOwner = $input.form === $clickedInput.form;
      var hasSameName = $input.name === $clickedInput.name;

      if (hasSameName && hasSameFormOwner) {
        this.syncConditionalRevealWithInputState($input);
      }
    }.bind(this));
  };

  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-library/master/polyfills/Element/prototype/nextElementSibling/detect.js
    var detect = 'document' in this && "nextElementSibling" in document.documentElement;
    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-library/master/polyfills/Element/prototype/nextElementSibling/polyfill.js

    Object.defineProperty(Element.prototype, "nextElementSibling", {
      get: function () {
        var el = this.nextSibling;

        while (el && el.nodeType !== 1) {
          el = el.nextSibling;
        }

        return el;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-library/master/polyfills/Element/prototype/previousElementSibling/detect.js
    var detect = 'document' in this && "previousElementSibling" in document.documentElement;
    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-library/master/polyfills/Element/prototype/previousElementSibling/polyfill.js

    Object.defineProperty(Element.prototype, 'previousElementSibling', {
      get: function () {
        var el = this.previousSibling;

        while (el && el.nodeType !== 1) {
          el = el.previousSibling;
        }

        return el;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});

  function Tabs($module) {
    this.$module = $module;
    this.$tabs = $module.querySelectorAll('.govuk-tabs__tab');
    this.keys = {
      left: 37,
      right: 39,
      up: 38,
      down: 40
    };
    this.jsHiddenClass = 'govuk-tabs__panel--hidden';
  }

  Tabs.prototype.init = function () {
    if (typeof window.matchMedia === 'function') {
      this.setupResponsiveChecks();
    } else {
      this.setup();
    }
  };

  Tabs.prototype.setupResponsiveChecks = function () {
    this.mql = window.matchMedia('(min-width: 40.0625em)');
    this.mql.addListener(this.checkMode.bind(this));
    this.checkMode();
  };

  Tabs.prototype.checkMode = function () {
    if (this.mql.matches) {
      this.setup();
    } else {
      this.teardown();
    }
  };

  Tabs.prototype.setup = function () {
    var $module = this.$module;
    var $tabs = this.$tabs;
    var $tabList = $module.querySelector('.govuk-tabs__list');
    var $tabListItems = $module.querySelectorAll('.govuk-tabs__list-item');

    if (!$tabs || !$tabList || !$tabListItems) {
      return;
    }

    $tabList.setAttribute('role', 'tablist');
    nodeListForEach($tabListItems, function ($item) {
      $item.setAttribute('role', 'presentation');
    });
    nodeListForEach($tabs, function ($tab) {
      // Set HTML attributes
      this.setAttributes($tab); // Save bounded functions to use when removing event listeners during teardown

      $tab.boundTabClick = this.onTabClick.bind(this);
      $tab.boundTabKeydown = this.onTabKeydown.bind(this); // Handle events

      $tab.addEventListener('click', $tab.boundTabClick, true);
      $tab.addEventListener('keydown', $tab.boundTabKeydown, true); // Remove old active panels

      this.hideTab($tab);
    }.bind(this)); // Show either the active tab according to the URL's hash or the first tab

    var $activeTab = this.getTab(window.location.hash) || this.$tabs[0];
    this.showTab($activeTab); // Handle hashchange events

    $module.boundOnHashChange = this.onHashChange.bind(this);
    window.addEventListener('hashchange', $module.boundOnHashChange, true);
  };

  Tabs.prototype.teardown = function () {
    var $module = this.$module;
    var $tabs = this.$tabs;
    var $tabList = $module.querySelector('.govuk-tabs__list');
    var $tabListItems = $module.querySelectorAll('.govuk-tabs__list-item');

    if (!$tabs || !$tabList || !$tabListItems) {
      return;
    }

    $tabList.removeAttribute('role');
    nodeListForEach($tabListItems, function ($item) {
      $item.removeAttribute('role', 'presentation');
    });
    nodeListForEach($tabs, function ($tab) {
      // Remove events
      $tab.removeEventListener('click', $tab.boundTabClick, true);
      $tab.removeEventListener('keydown', $tab.boundTabKeydown, true); // Unset HTML attributes

      this.unsetAttributes($tab);
    }.bind(this)); // Remove hashchange event handler

    window.removeEventListener('hashchange', $module.boundOnHashChange, true);
  };

  Tabs.prototype.onHashChange = function (e) {
    var hash = window.location.hash;
    var $tabWithHash = this.getTab(hash);

    if (!$tabWithHash) {
      return;
    } // Prevent changing the hash


    if (this.changingHash) {
      this.changingHash = false;
      return;
    } // Show either the active tab according to the URL's hash or the first tab


    var $previousTab = this.getCurrentTab();
    this.hideTab($previousTab);
    this.showTab($tabWithHash);
    $tabWithHash.focus();
  };

  Tabs.prototype.hideTab = function ($tab) {
    this.unhighlightTab($tab);
    this.hidePanel($tab);
  };

  Tabs.prototype.showTab = function ($tab) {
    this.highlightTab($tab);
    this.showPanel($tab);
  };

  Tabs.prototype.getTab = function (hash) {
    return this.$module.querySelector('.govuk-tabs__tab[href="' + hash + '"]');
  };

  Tabs.prototype.setAttributes = function ($tab) {
    // set tab attributes
    var panelId = this.getHref($tab).slice(1);
    $tab.setAttribute('id', 'tab_' + panelId);
    $tab.setAttribute('role', 'tab');
    $tab.setAttribute('aria-controls', panelId);
    $tab.setAttribute('aria-selected', 'false');
    $tab.setAttribute('tabindex', '-1'); // set panel attributes

    var $panel = this.getPanel($tab);
    $panel.setAttribute('role', 'tabpanel');
    $panel.setAttribute('aria-labelledby', $tab.id);
    $panel.classList.add(this.jsHiddenClass);
  };

  Tabs.prototype.unsetAttributes = function ($tab) {
    // unset tab attributes
    $tab.removeAttribute('id');
    $tab.removeAttribute('role');
    $tab.removeAttribute('aria-controls');
    $tab.removeAttribute('aria-selected');
    $tab.removeAttribute('tabindex'); // unset panel attributes

    var $panel = this.getPanel($tab);
    $panel.removeAttribute('role');
    $panel.removeAttribute('aria-labelledby');
    $panel.classList.remove(this.jsHiddenClass);
  };

  Tabs.prototype.onTabClick = function (e) {
    if (!e.target.classList.contains('govuk-tabs__tab')) {
      // Allow events on child DOM elements to bubble up to tab parent
      return false;
    }

    e.preventDefault();
    var $newTab = e.target;
    var $currentTab = this.getCurrentTab();
    this.hideTab($currentTab);
    this.showTab($newTab);
    this.createHistoryEntry($newTab);
  };

  Tabs.prototype.createHistoryEntry = function ($tab) {
    var $panel = this.getPanel($tab); // Save and restore the id
    // so the page doesn't jump when a user clicks a tab (which changes the hash)

    var id = $panel.id;
    $panel.id = '';
    this.changingHash = true;
    window.location.hash = this.getHref($tab).slice(1);
    $panel.id = id;
  };

  Tabs.prototype.onTabKeydown = function (e) {
    switch (e.keyCode) {
      case this.keys.left:
      case this.keys.up:
        this.activatePreviousTab();
        e.preventDefault();
        break;

      case this.keys.right:
      case this.keys.down:
        this.activateNextTab();
        e.preventDefault();
        break;
    }
  };

  Tabs.prototype.activateNextTab = function () {
    var currentTab = this.getCurrentTab();
    var nextTabListItem = currentTab.parentNode.nextElementSibling;

    if (nextTabListItem) {
      var nextTab = nextTabListItem.querySelector('.govuk-tabs__tab');
    }

    if (nextTab) {
      this.hideTab(currentTab);
      this.showTab(nextTab);
      nextTab.focus();
      this.createHistoryEntry(nextTab);
    }
  };

  Tabs.prototype.activatePreviousTab = function () {
    var currentTab = this.getCurrentTab();
    var previousTabListItem = currentTab.parentNode.previousElementSibling;

    if (previousTabListItem) {
      var previousTab = previousTabListItem.querySelector('.govuk-tabs__tab');
    }

    if (previousTab) {
      this.hideTab(currentTab);
      this.showTab(previousTab);
      previousTab.focus();
      this.createHistoryEntry(previousTab);
    }
  };

  Tabs.prototype.getPanel = function ($tab) {
    var $panel = this.$module.querySelector(this.getHref($tab));
    return $panel;
  };

  Tabs.prototype.showPanel = function ($tab) {
    var $panel = this.getPanel($tab);
    $panel.classList.remove(this.jsHiddenClass);
  };

  Tabs.prototype.hidePanel = function (tab) {
    var $panel = this.getPanel(tab);
    $panel.classList.add(this.jsHiddenClass);
  };

  Tabs.prototype.unhighlightTab = function ($tab) {
    $tab.setAttribute('aria-selected', 'false');
    $tab.parentNode.classList.remove('govuk-tabs__list-item--selected');
    $tab.setAttribute('tabindex', '-1');
  };

  Tabs.prototype.highlightTab = function ($tab) {
    $tab.setAttribute('aria-selected', 'true');
    $tab.parentNode.classList.add('govuk-tabs__list-item--selected');
    $tab.setAttribute('tabindex', '0');
  };

  Tabs.prototype.getCurrentTab = function () {
    return this.$module.querySelector('.govuk-tabs__list-item--selected .govuk-tabs__tab');
  }; // this is because IE doesn't always return the actual value but a relative full path
  // should be a utility function most prob
  // http://labs.thesedays.com/blog/2010/01/08/getting-the-href-value-with-jquery-in-ie/


  Tabs.prototype.getHref = function ($tab) {
    var href = $tab.getAttribute('href');
    var hash = href.slice(href.indexOf('#'), href.length);
    return hash;
  };

  function initAll(options) {
    // Set the options to an empty object by default if no options are passed.
    options = typeof options !== 'undefined' ? options : {}; // Allow the user to initialise GOV.UK Frontend in only certain sections of the page
    // Defaults to the entire document if nothing is set.

    var scope = typeof options.scope !== 'undefined' ? options.scope : document;
    var $buttons = scope.querySelectorAll('[data-module="govuk-button"]');
    nodeListForEach($buttons, function ($button) {
      new Button($button).init();
    });
    var $accordions = scope.querySelectorAll('[data-module="govuk-accordion"]');
    nodeListForEach($accordions, function ($accordion) {
      new Accordion($accordion).init();
    });
    var $details = scope.querySelectorAll('[data-module="govuk-details"]');
    nodeListForEach($details, function ($detail) {
      new Details($detail).init();
    });
    var $characterCounts = scope.querySelectorAll('[data-module="govuk-character-count"]');
    nodeListForEach($characterCounts, function ($characterCount) {
      new CharacterCount($characterCount).init();
    });
    var $checkboxes = scope.querySelectorAll('[data-module="govuk-checkboxes"]');
    nodeListForEach($checkboxes, function ($checkbox) {
      new Checkboxes($checkbox).init();
    }); // Find first error summary module to enhance.

    var $errorSummary = scope.querySelector('[data-module="govuk-error-summary"]');
    new ErrorSummary($errorSummary).init(); // Find first header module to enhance.

    var $toggleButton = scope.querySelector('[data-module="govuk-header"]');
    new Header($toggleButton).init();
    var $notificationBanners = scope.querySelectorAll('[data-module="govuk-notification-banner"]');
    nodeListForEach($notificationBanners, function ($notificationBanner) {
      new NotificationBanner($notificationBanner).init();
    });
    var $radios = scope.querySelectorAll('[data-module="govuk-radios"]');
    nodeListForEach($radios, function ($radio) {
      new Radios($radio).init();
    });
    var $tabs = scope.querySelectorAll('[data-module="govuk-tabs"]');
    nodeListForEach($tabs, function ($tabs) {
      new Tabs($tabs).init();
    });
  }

  exports.initAll = initAll;
  exports.Accordion = Accordion;
  exports.Button = Button;
  exports.Details = Details;
  exports.CharacterCount = CharacterCount;
  exports.Checkboxes = Checkboxes;
  exports.ErrorSummary = ErrorSummary;
  exports.Header = Header;
  exports.Radios = Radios;
  exports.Tabs = Tabs;
});
},{}],"../node_modules/govuk-frontend/govuk/components/accordion/accordion.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('GOVUKFrontend', factory) : global.GOVUKFrontend = factory();
})(this, function () {
  'use strict';
  /**
   * TODO: Ideally this would be a NodeList.prototype.forEach polyfill
   * This seems to fail in IE8, requires more investigation.
   * See: https://github.com/imagitama/nodelist-foreach-polyfill
   */

  function nodeListForEach(nodes, callback) {
    if (window.NodeList.prototype.forEach) {
      return nodes.forEach(callback);
    }

    for (var i = 0; i < nodes.length; i++) {
      callback.call(window, nodes[i], i, nodes);
    }
  }

  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
    var detect = // In IE8, defineProperty could only act on DOM elements, so full support
    // for the feature requires the ability to set a property on an arbitrary object
    'defineProperty' in Object && function () {
      try {
        var a = {};
        Object.defineProperty(a, 'test', {
          value: 42
        });
        return true;
      } catch (e) {
        return false;
      }
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always

    (function (nativeDefineProperty) {
      var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
      var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
      var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

      Object.defineProperty = function defineProperty(object, property, descriptor) {
        // Where native support exists, assume it
        if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
          return nativeDefineProperty(object, property, descriptor);
        }

        if (object === null || !(object instanceof Object || _typeof(object) === 'object')) {
          throw new TypeError('Object.defineProperty called on non-object');
        }

        if (!(descriptor instanceof Object)) {
          throw new TypeError('Property description must be an object');
        }

        var propertyString = String(property);
        var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;

        var getterType = 'get' in descriptor && _typeof(descriptor.get);

        var setterType = 'set' in descriptor && _typeof(descriptor.set); // handle descriptor.get


        if (getterType) {
          if (getterType !== 'function') {
            throw new TypeError('Getter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineGetter__.call(object, propertyString, descriptor.get);
        } else {
          object[propertyString] = descriptor.value;
        } // handle descriptor.set


        if (setterType) {
          if (setterType !== 'function') {
            throw new TypeError('Setter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineSetter__.call(object, propertyString, descriptor.set);
        } // OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above


        if ('value' in descriptor) {
          object[propertyString] = descriptor.value;
        }

        return object;
      };
    })(Object.defineProperty);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Function/prototype/bind/detect.js
    var detect = ('bind' in Function.prototype);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Function.prototype.bind&flags=always

    Object.defineProperty(Function.prototype, 'bind', {
      value: function bind(that) {
        // .length is 1
        // add necessary es5-shim utilities
        var $Array = Array;
        var $Object = Object;
        var ObjectPrototype = $Object.prototype;
        var ArrayPrototype = $Array.prototype;

        var Empty = function Empty() {};

        var to_string = ObjectPrototype.toString;
        var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
        var isCallable;
        /* inlined from https://npmjs.com/is-callable */

        var fnToStr = Function.prototype.toString,
            tryFunctionObject = function tryFunctionObject(value) {
          try {
            fnToStr.call(value);
            return true;
          } catch (e) {
            return false;
          }
        },
            fnClass = '[object Function]',
            genClass = '[object GeneratorFunction]';

        isCallable = function isCallable(value) {
          if (typeof value !== 'function') {
            return false;
          }

          if (hasToStringTag) {
            return tryFunctionObject(value);
          }

          var strClass = to_string.call(value);
          return strClass === fnClass || strClass === genClass;
        };

        var array_slice = ArrayPrototype.slice;
        var array_concat = ArrayPrototype.concat;
        var array_push = ArrayPrototype.push;
        var max = Math.max; // /add necessary es5-shim utilities
        // 1. Let Target be the this value.

        var target = this; // 2. If IsCallable(Target) is false, throw a TypeError exception.

        if (!isCallable(target)) {
          throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        } // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used


        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.

        var bound;

        var binder = function () {
          if (this instanceof bound) {
            // 15.3.4.5.2 [[Construct]]
            // When the [[Construct]] internal method of a function object,
            // F that was created using the bind function is called with a
            // list of arguments ExtraArgs, the following steps are taken:
            // 1. Let target be the value of F's [[TargetFunction]]
            //   internal property.
            // 2. If target has no [[Construct]] internal method, a
            //   TypeError exception is thrown.
            // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Construct]] internal
            //   method of target providing args as the arguments.
            var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));

            if ($Object(result) === result) {
              return result;
            }

            return this;
          } else {
            // 15.3.4.5.1 [[Call]]
            // When the [[Call]] internal method of a function object, F,
            // which was created using the bind function is called with a
            // this value and a list of arguments ExtraArgs, the following
            // steps are taken:
            // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 2. Let boundThis be the value of F's [[BoundThis]] internal
            //   property.
            // 3. Let target be the value of F's [[TargetFunction]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Call]] internal method
            //   of target providing boundThis as the this value and
            //   providing args as the arguments.
            // equiv: target.call(this, ...boundArgs, ...args)
            return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
          }
        }; // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.


        var boundLength = max(0, target.length - args.length); // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.

        var boundArgs = [];

        for (var i = 0; i < boundLength; i++) {
          array_push.call(boundArgs, '$' + i);
        } // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.


        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
          Empty.prototype = target.prototype;
          bound.prototype = new Empty(); // Clean up dangling references.

          Empty.prototype = null;
        } // TODO
        // 18. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.
        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.
        // 22. Return F.


        return bound;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/detect.js
    var detect = 'DOMTokenList' in this && function (x) {
      return 'classList' in x ? !x.classList.toggle('x', false) && !x.className : true;
    }(document.createElement('x'));

    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/polyfill.js

    (function (global) {
      var nativeImpl = "DOMTokenList" in global && global.DOMTokenList;

      if (!nativeImpl || !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg') && !(document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList)) {
        global.DOMTokenList = function () {
          // eslint-disable-line no-unused-vars
          var dpSupport = true;

          var defineGetter = function (object, name, fn, configurable) {
            if (Object.defineProperty) Object.defineProperty(object, name, {
              configurable: false === dpSupport ? true : !!configurable,
              get: fn
            });else object.__defineGetter__(name, fn);
          };
          /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */


          try {
            defineGetter({}, "support");
          } catch (e) {
            dpSupport = false;
          }

          var _DOMTokenList = function (el, prop) {
            var that = this;
            var tokens = [];
            var tokenMap = {};
            var length = 0;
            var maxLength = 0;

            var addIndexGetter = function (i) {
              defineGetter(that, i, function () {
                preop();
                return tokens[i];
              }, false);
            };

            var reindex = function () {
              /** Define getter functions for array-like access to the tokenList's contents. */
              if (length >= maxLength) for (; maxLength < length; ++maxLength) {
                addIndexGetter(maxLength);
              }
            };
            /** Helper function called at the start of each class method. Internal use only. */


            var preop = function () {
              var error;
              var i;
              var args = arguments;
              var rSpace = /\s+/;
              /** Validate the token/s passed to an instance method, if any. */

              if (args.length) for (i = 0; i < args.length; ++i) if (rSpace.test(args[i])) {
                error = new SyntaxError('String "' + args[i] + '" ' + "contains" + ' an invalid character');
                error.code = 5;
                error.name = "InvalidCharacterError";
                throw error;
              }
              /** Split the new value apart by whitespace*/

              if (_typeof(el[prop]) === "object") {
                tokens = ("" + el[prop].baseVal).replace(/^\s+|\s+$/g, "").split(rSpace);
              } else {
                tokens = ("" + el[prop]).replace(/^\s+|\s+$/g, "").split(rSpace);
              }
              /** Avoid treating blank strings as single-item token lists */


              if ("" === tokens[0]) tokens = [];
              /** Repopulate the internal token lists */

              tokenMap = {};

              for (i = 0; i < tokens.length; ++i) tokenMap[tokens[i]] = true;

              length = tokens.length;
              reindex();
            };
            /** Populate our internal token list if the targeted attribute of the subject element isn't empty. */


            preop();
            /** Return the number of tokens in the underlying string. Read-only. */

            defineGetter(that, "length", function () {
              preop();
              return length;
            });
            /** Override the default toString/toLocaleString methods to return a space-delimited list of tokens when typecast. */

            that.toLocaleString = that.toString = function () {
              preop();
              return tokens.join(" ");
            };

            that.item = function (idx) {
              preop();
              return tokens[idx];
            };

            that.contains = function (token) {
              preop();
              return !!tokenMap[token];
            };

            that.add = function () {
              preop.apply(that, args = arguments);

              for (var args, token, i = 0, l = args.length; i < l; ++i) {
                token = args[i];

                if (!tokenMap[token]) {
                  tokens.push(token);
                  tokenMap[token] = true;
                }
              }
              /** Update the targeted attribute of the attached element if the token list's changed. */


              if (length !== tokens.length) {
                length = tokens.length >>> 0;

                if (_typeof(el[prop]) === "object") {
                  el[prop].baseVal = tokens.join(" ");
                } else {
                  el[prop] = tokens.join(" ");
                }

                reindex();
              }
            };

            that.remove = function () {
              preop.apply(that, args = arguments);
              /** Build a hash of token names to compare against when recollecting our token list. */

              for (var args, ignore = {}, i = 0, t = []; i < args.length; ++i) {
                ignore[args[i]] = true;
                delete tokenMap[args[i]];
              }
              /** Run through our tokens list and reassign only those that aren't defined in the hash declared above. */


              for (i = 0; i < tokens.length; ++i) if (!ignore[tokens[i]]) t.push(tokens[i]);

              tokens = t;
              length = t.length >>> 0;
              /** Update the targeted attribute of the attached element. */

              if (_typeof(el[prop]) === "object") {
                el[prop].baseVal = tokens.join(" ");
              } else {
                el[prop] = tokens.join(" ");
              }

              reindex();
            };

            that.toggle = function (token, force) {
              preop.apply(that, [token]);
              /** Token state's being forced. */

              if (undefined !== force) {
                if (force) {
                  that.add(token);
                  return true;
                } else {
                  that.remove(token);
                  return false;
                }
              }
              /** Token already exists in tokenList. Remove it, and return FALSE. */


              if (tokenMap[token]) {
                that.remove(token);
                return false;
              }
              /** Otherwise, add the token and return TRUE. */


              that.add(token);
              return true;
            };

            return that;
          };

          return _DOMTokenList;
        }();
      } // Add second argument to native DOMTokenList.toggle() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.toggle('x', false);
        if (!e.classList.contains('x')) return;

        e.classList.constructor.prototype.toggle = function toggle(token
        /*, force*/
        ) {
          var force = arguments[1];

          if (force === undefined) {
            var add = !this.contains(token);
            this[add ? 'add' : 'remove'](token);
            return add;
          }

          force = !!force;
          this[force ? 'add' : 'remove'](token);
          return force;
        };
      })(); // Add multiple arguments to native DOMTokenList.add() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.add('a', 'b');
        if (e.classList.contains('b')) return;
        var native = e.classList.constructor.prototype.add;

        e.classList.constructor.prototype.add = function () {
          var args = arguments;
          var l = arguments.length;

          for (var i = 0; i < l; i++) {
            native.call(this, args[i]);
          }
        };
      })(); // Add multiple arguments to native DOMTokenList.remove() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.add('a');
        e.classList.add('b');
        e.classList.remove('a', 'b');
        if (!e.classList.contains('b')) return;
        var native = e.classList.constructor.prototype.remove;

        e.classList.constructor.prototype.remove = function () {
          var args = arguments;
          var l = arguments.length;

          for (var i = 0; i < l; i++) {
            native.call(this, args[i]);
          }
        };
      })();
    })(this);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Document/detect.js
    var detect = ("Document" in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Document&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      if (this.HTMLDocument) {
        // IE8
        // HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
        this.Document = this.HTMLDocument;
      } else {
        // Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
        this.Document = this.HTMLDocument = document.constructor = new Function('return function Document() {}')();
        this.Document.prototype = document;
      }
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Element/detect.js
    var detect = 'Element' in this && 'HTMLElement' in this;
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element&flags=always

    (function () {
      // IE8
      if (window.Element && !window.HTMLElement) {
        window.HTMLElement = window.Element;
        return;
      } // create Element constructor


      window.Element = window.HTMLElement = new Function('return function Element() {}')(); // generate sandboxed iframe

      var vbody = document.appendChild(document.createElement('body'));
      var frame = vbody.appendChild(document.createElement('iframe')); // use sandboxed iframe to replicate Element functionality

      var frameDocument = frame.contentWindow.document;
      var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
      var cache = {}; // polyfill Element.prototype on an element

      var shiv = function (element, deep) {
        var childNodes = element.childNodes || [],
            index = -1,
            key,
            value,
            childNode;

        if (element.nodeType === 1 && element.constructor !== Element) {
          element.constructor = Element;

          for (key in cache) {
            value = cache[key];
            element[key] = value;
          }
        }

        while (childNode = deep && childNodes[++index]) {
          shiv(childNode, deep);
        }

        return element;
      };

      var elements = document.getElementsByTagName('*');
      var nativeCreateElement = document.createElement;
      var interval;
      var loopLimit = 100;
      prototype.attachEvent('onpropertychange', function (event) {
        var propertyName = event.propertyName,
            nonValue = !cache.hasOwnProperty(propertyName),
            newValue = prototype[propertyName],
            oldValue = cache[propertyName],
            index = -1,
            element;

        while (element = elements[++index]) {
          if (element.nodeType === 1) {
            if (nonValue || element[propertyName] === oldValue) {
              element[propertyName] = newValue;
            }
          }
        }

        cache[propertyName] = newValue;
      });
      prototype.constructor = Element;

      if (!prototype.hasAttribute) {
        // <Element>.hasAttribute
        prototype.hasAttribute = function hasAttribute(name) {
          return this.getAttribute(name) !== null;
        };
      } // Apply Element prototype to the pre-existing DOM as soon as the body element appears.


      function bodyCheck() {
        if (!loopLimit--) clearTimeout(interval);

        if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
          shiv(document, true);
          if (interval && document.body.prototype) clearTimeout(interval);
          return !!document.body.prototype;
        }

        return false;
      }

      if (!bodyCheck()) {
        document.onreadystatechange = bodyCheck;
        interval = setInterval(bodyCheck, 25);
      } // Apply to any new elements created after load


      document.createElement = function createElement(nodeName) {
        var element = nativeCreateElement(String(nodeName).toLowerCase());
        return shiv(element);
      }; // remove sandboxed iframe


      document.removeChild(vbody);
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/8717a9e04ac7aff99b4980fbedead98036b0929a/packages/polyfill-library/polyfills/Element/prototype/classList/detect.js
    var detect = 'document' in this && "classList" in document.documentElement && 'Element' in this && 'classList' in Element.prototype && function () {
      var e = document.createElement('span');
      e.classList.add('a', 'b');
      return e.classList.contains('b');
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element.prototype.classList&flags=always

    (function (global) {
      var dpSupport = true;

      var defineGetter = function (object, name, fn, configurable) {
        if (Object.defineProperty) Object.defineProperty(object, name, {
          configurable: false === dpSupport ? true : !!configurable,
          get: fn
        });else object.__defineGetter__(name, fn);
      };
      /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */


      try {
        defineGetter({}, "support");
      } catch (e) {
        dpSupport = false;
      }
      /** Polyfills a property with a DOMTokenList */


      var addProp = function (o, name, attr) {
        defineGetter(o.prototype, name, function () {
          var tokenList;
          var THIS = this,

          /** Prevent this from firing twice for some reason. What the hell, IE. */
          gibberishProperty = "__defineGetter__" + "DEFINE_PROPERTY" + name;
          if (THIS[gibberishProperty]) return tokenList;
          THIS[gibberishProperty] = true;
          /**
           * IE8 can't define properties on native JavaScript objects, so we'll use a dumb hack instead.
           *
           * What this is doing is creating a dummy element ("reflection") inside a detached phantom node ("mirror")
           * that serves as the target of Object.defineProperty instead. While we could simply use the subject HTML
           * element instead, this would conflict with element types which use indexed properties (such as forms and
           * select lists).
           */

          if (false === dpSupport) {
            var visage;
            var mirror = addProp.mirror || document.createElement("div");
            var reflections = mirror.childNodes;
            var l = reflections.length;

            for (var i = 0; i < l; ++i) if (reflections[i]._R === THIS) {
              visage = reflections[i];
              break;
            }
            /** Couldn't find an element's reflection inside the mirror. Materialise one. */


            visage || (visage = mirror.appendChild(document.createElement("div")));
            tokenList = DOMTokenList.call(visage, THIS, attr);
          } else tokenList = new DOMTokenList(THIS, attr);

          defineGetter(THIS, name, function () {
            return tokenList;
          });
          delete THIS[gibberishProperty];
          return tokenList;
        }, true);
      };

      addProp(global.Element, "classList", "className");
      addProp(global.HTMLElement, "classList", "className");
      addProp(global.HTMLLinkElement, "relList", "rel");
      addProp(global.HTMLAnchorElement, "relList", "rel");
      addProp(global.HTMLAreaElement, "relList", "rel");
    })(this);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});

  function Accordion($module) {
    this.$module = $module;
    this.moduleId = $module.getAttribute('id');
    this.$sections = $module.querySelectorAll('.govuk-accordion__section');
    this.$openAllButton = '';
    this.browserSupportsSessionStorage = helper.checkForSessionStorage();
    this.controlsClass = 'govuk-accordion__controls';
    this.openAllClass = 'govuk-accordion__open-all';
    this.iconClass = 'govuk-accordion__icon';
    this.sectionHeaderClass = 'govuk-accordion__section-header';
    this.sectionHeaderFocusedClass = 'govuk-accordion__section-header--focused';
    this.sectionHeadingClass = 'govuk-accordion__section-heading';
    this.sectionSummaryClass = 'govuk-accordion__section-summary';
    this.sectionButtonClass = 'govuk-accordion__section-button';
    this.sectionExpandedClass = 'govuk-accordion__section--expanded';
  } // Initialize component


  Accordion.prototype.init = function () {
    // Check for module
    if (!this.$module) {
      return;
    }

    this.initControls();
    this.initSectionHeaders(); // See if "Open all" button text should be updated

    var areAllSectionsOpen = this.checkIfAllSectionsOpen();
    this.updateOpenAllButton(areAllSectionsOpen);
  }; // Initialise controls and set attributes


  Accordion.prototype.initControls = function () {
    // Create "Open all" button and set attributes
    this.$openAllButton = document.createElement('button');
    this.$openAllButton.setAttribute('type', 'button');
    this.$openAllButton.innerHTML = 'Open all <span class="govuk-visually-hidden">sections</span>';
    this.$openAllButton.setAttribute('class', this.openAllClass);
    this.$openAllButton.setAttribute('aria-expanded', 'false');
    this.$openAllButton.setAttribute('type', 'button'); // Create control wrapper and add controls to it

    var accordionControls = document.createElement('div');
    accordionControls.setAttribute('class', this.controlsClass);
    accordionControls.appendChild(this.$openAllButton);
    this.$module.insertBefore(accordionControls, this.$module.firstChild); // Handle events for the controls

    this.$openAllButton.addEventListener('click', this.onOpenOrCloseAllToggle.bind(this));
  }; // Initialise section headers


  Accordion.prototype.initSectionHeaders = function () {
    // Loop through section headers
    nodeListForEach(this.$sections, function ($section, i) {
      // Set header attributes
      var header = $section.querySelector('.' + this.sectionHeaderClass);
      this.initHeaderAttributes(header, i);
      this.setExpanded(this.isExpanded($section), $section); // Handle events

      header.addEventListener('click', this.onSectionToggle.bind(this, $section)); // See if there is any state stored in sessionStorage and set the sections to
      // open or closed.

      this.setInitialState($section);
    }.bind(this));
  }; // Set individual header attributes


  Accordion.prototype.initHeaderAttributes = function ($headerWrapper, index) {
    var $module = this;
    var $span = $headerWrapper.querySelector('.' + this.sectionButtonClass);
    var $heading = $headerWrapper.querySelector('.' + this.sectionHeadingClass);
    var $summary = $headerWrapper.querySelector('.' + this.sectionSummaryClass); // Copy existing span element to an actual button element, for improved accessibility.

    var $button = document.createElement('button');
    $button.setAttribute('type', 'button');
    $button.setAttribute('id', this.moduleId + '-heading-' + (index + 1));
    $button.setAttribute('aria-controls', this.moduleId + '-content-' + (index + 1)); // Copy all attributes (https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes) from $span to $button

    for (var i = 0; i < $span.attributes.length; i++) {
      var attr = $span.attributes.item(i);
      $button.setAttribute(attr.nodeName, attr.nodeValue);
    }

    $button.addEventListener('focusin', function (e) {
      if (!$headerWrapper.classList.contains($module.sectionHeaderFocusedClass)) {
        $headerWrapper.className += ' ' + $module.sectionHeaderFocusedClass;
      }
    });
    $button.addEventListener('blur', function (e) {
      $headerWrapper.classList.remove($module.sectionHeaderFocusedClass);
    });

    if (typeof $summary !== 'undefined' && $summary !== null) {
      $button.setAttribute('aria-describedby', this.moduleId + '-summary-' + (index + 1));
    } // $span could contain HTML elements (see https://www.w3.org/TR/2011/WD-html5-20110525/content-models.html#phrasing-content)


    $button.innerHTML = $span.innerHTML;
    $heading.removeChild($span);
    $heading.appendChild($button); // Add "+/-" icon

    var icon = document.createElement('span');
    icon.className = this.iconClass;
    icon.setAttribute('aria-hidden', 'true');
    $button.appendChild(icon);
  }; // When section toggled, set and store state


  Accordion.prototype.onSectionToggle = function ($section) {
    var expanded = this.isExpanded($section);
    this.setExpanded(!expanded, $section); // Store the state in sessionStorage when a change is triggered

    this.storeState($section);
  }; // When Open/Close All toggled, set and store state


  Accordion.prototype.onOpenOrCloseAllToggle = function () {
    var $module = this;
    var $sections = this.$sections;
    var nowExpanded = !this.checkIfAllSectionsOpen();
    nodeListForEach($sections, function ($section) {
      $module.setExpanded(nowExpanded, $section); // Store the state in sessionStorage when a change is triggered

      $module.storeState($section);
    });
    $module.updateOpenAllButton(nowExpanded);
  }; // Set section attributes when opened/closed


  Accordion.prototype.setExpanded = function (expanded, $section) {
    var $button = $section.querySelector('.' + this.sectionButtonClass);
    $button.setAttribute('aria-expanded', expanded);

    if (expanded) {
      $section.classList.add(this.sectionExpandedClass);
    } else {
      $section.classList.remove(this.sectionExpandedClass);
    } // See if "Open all" button text should be updated


    var areAllSectionsOpen = this.checkIfAllSectionsOpen();
    this.updateOpenAllButton(areAllSectionsOpen);
  }; // Get state of section


  Accordion.prototype.isExpanded = function ($section) {
    return $section.classList.contains(this.sectionExpandedClass);
  }; // Check if all sections are open


  Accordion.prototype.checkIfAllSectionsOpen = function () {
    // Get a count of all the Accordion sections
    var sectionsCount = this.$sections.length; // Get a count of all Accordion sections that are expanded

    var expandedSectionCount = this.$module.querySelectorAll('.' + this.sectionExpandedClass).length;
    var areAllSectionsOpen = sectionsCount === expandedSectionCount;
    return areAllSectionsOpen;
  }; // Update "Open all" button


  Accordion.prototype.updateOpenAllButton = function (expanded) {
    var newButtonText = expanded ? 'Close all' : 'Open all';
    newButtonText += '<span class="govuk-visually-hidden"> sections</span>';
    this.$openAllButton.setAttribute('aria-expanded', expanded);
    this.$openAllButton.innerHTML = newButtonText;
  }; // Check for `window.sessionStorage`, and that it actually works.


  var helper = {
    checkForSessionStorage: function () {
      var testString = 'this is the test string';
      var result;

      try {
        window.sessionStorage.setItem(testString, testString);
        result = window.sessionStorage.getItem(testString) === testString.toString();
        window.sessionStorage.removeItem(testString);
        return result;
      } catch (exception) {
        if (typeof console === 'undefined' || typeof console.log === 'undefined') {
          console.log('Notice: sessionStorage not available.');
        }
      }
    }
  }; // Set the state of the accordions in sessionStorage

  Accordion.prototype.storeState = function ($section) {
    if (this.browserSupportsSessionStorage) {
      // We need a unique way of identifying each content in the accordion. Since
      // an `#id` should be unique and an `id` is required for `aria-` attributes
      // `id` can be safely used.
      var $button = $section.querySelector('.' + this.sectionButtonClass);

      if ($button) {
        var contentId = $button.getAttribute('aria-controls');
        var contentState = $button.getAttribute('aria-expanded');

        if (typeof contentId === 'undefined' && (typeof console === 'undefined' || typeof console.log === 'undefined')) {
          console.error(new Error('No aria controls present in accordion section heading.'));
        }

        if (typeof contentState === 'undefined' && (typeof console === 'undefined' || typeof console.log === 'undefined')) {
          console.error(new Error('No aria expanded present in accordion section heading.'));
        } // Only set the state when both `contentId` and `contentState` are taken from the DOM.


        if (contentId && contentState) {
          window.sessionStorage.setItem(contentId, contentState);
        }
      }
    }
  }; // Read the state of the accordions from sessionStorage


  Accordion.prototype.setInitialState = function ($section) {
    if (this.browserSupportsSessionStorage) {
      var $button = $section.querySelector('.' + this.sectionButtonClass);

      if ($button) {
        var contentId = $button.getAttribute('aria-controls');
        var contentState = contentId ? window.sessionStorage.getItem(contentId) : null;

        if (contentState !== null) {
          this.setExpanded(contentState === 'true', $section);
        }
      }
    }
  };

  return Accordion;
});
},{}],"../node_modules/lbh-frontend/lbh/components/lbh-accordion/accordion.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _accordion = _interopRequireDefault(require("govuk-frontend/govuk/components/accordion/accordion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _accordion.default;
exports.default = _default;
},{"govuk-frontend/govuk/components/accordion/accordion":"../node_modules/govuk-frontend/govuk/components/accordion/accordion.js"}],"../node_modules/underscore/modules/_setup.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAX_ARRAY_INDEX = exports.nonEnumerableProps = exports.hasEnumBug = exports._isFinite = exports._isNaN = exports.nativeIsView = exports.nativeCreate = exports.nativeKeys = exports.nativeIsArray = exports.supportsDataView = exports.supportsArrayBuffer = exports.hasOwnProperty = exports.toString = exports.slice = exports.push = exports.SymbolProto = exports.ObjProto = exports.ArrayProto = exports.root = exports.VERSION = void 0;
// Current version.
var VERSION = '1.13.1'; // Establish the root object, `window` (`self`) in the browser, `global`
// on the server, or `this` in some virtual machines. We use `self`
// instead of `window` for `WebWorker` support.

exports.VERSION = VERSION;
var root = typeof self == 'object' && self.self === self && self || typeof global == 'object' && global.global === global && global || Function('return this')() || {}; // Save bytes in the minified (but not gzipped) version:

exports.root = root;
var ArrayProto = Array.prototype,
    ObjProto = Object.prototype;
exports.ObjProto = ObjProto;
exports.ArrayProto = ArrayProto;
var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null; // Create quick reference variables for speed access to core prototypes.

exports.SymbolProto = SymbolProto;
var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty; // Modern feature detection.

exports.hasOwnProperty = hasOwnProperty;
exports.toString = toString;
exports.slice = slice;
exports.push = push;
var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
    supportsDataView = typeof DataView !== 'undefined'; // All **ECMAScript 5+** native function implementations that we hope to use
// are declared here.

exports.supportsDataView = supportsDataView;
exports.supportsArrayBuffer = supportsArrayBuffer;
var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeCreate = Object.create,
    nativeIsView = supportsArrayBuffer && ArrayBuffer.isView; // Create references to these builtin functions because we override them.

exports.nativeIsView = nativeIsView;
exports.nativeCreate = nativeCreate;
exports.nativeKeys = nativeKeys;
exports.nativeIsArray = nativeIsArray;
var _isNaN = isNaN,
    _isFinite = isFinite; // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.

exports._isFinite = _isFinite;
exports._isNaN = _isNaN;
var hasEnumBug = !{
  toString: null
}.propertyIsEnumerable('toString');
exports.hasEnumBug = hasEnumBug;
var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // The largest integer that can be represented exactly.

exports.nonEnumerableProps = nonEnumerableProps;
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
exports.MAX_ARRAY_INDEX = MAX_ARRAY_INDEX;
},{}],"../node_modules/underscore/modules/restArguments.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = restArguments;

// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function () {
    var length = Math.max(arguments.length - startIndex, 0),
        rest = Array(length),
        index = 0;

    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }

    switch (startIndex) {
      case 0:
        return func.call(this, rest);

      case 1:
        return func.call(this, arguments[0], rest);

      case 2:
        return func.call(this, arguments[0], arguments[1], rest);
    }

    var args = Array(startIndex + 1);

    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }

    args[startIndex] = rest;
    return func.apply(this, args);
  };
}
},{}],"../node_modules/underscore/modules/isObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;

// Is a given variable an object?
function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
}
},{}],"../node_modules/underscore/modules/isNull.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNull;

// Is a given value equal to null?
function isNull(obj) {
  return obj === null;
}
},{}],"../node_modules/underscore/modules/isUndefined.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUndefined;

// Is a given variable undefined?
function isUndefined(obj) {
  return obj === void 0;
}
},{}],"../node_modules/underscore/modules/isBoolean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBoolean;

var _setup = require("./_setup.js");

// Is a given value a boolean?
function isBoolean(obj) {
  return obj === true || obj === false || _setup.toString.call(obj) === '[object Boolean]';
}
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js"}],"../node_modules/underscore/modules/isElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isElement;

// Is a given value a DOM element?
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}
},{}],"../node_modules/underscore/modules/_tagTester.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tagTester;

var _setup = require("./_setup.js");

// Internal function for creating a `toString`-based type tester.
function tagTester(name) {
  var tag = '[object ' + name + ']';
  return function (obj) {
    return _setup.toString.call(obj) === tag;
  };
}
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js"}],"../node_modules/underscore/modules/isString.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('String');

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js"}],"../node_modules/underscore/modules/isNumber.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Number');

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js"}],"../node_modules/underscore/modules/isDate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Date');

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js"}],"../node_modules/underscore/modules/isRegExp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('RegExp');

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js"}],"../node_modules/underscore/modules/isError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Error');

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js"}],"../node_modules/underscore/modules/isSymbol.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Symbol');

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js"}],"../node_modules/underscore/modules/isArrayBuffer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('ArrayBuffer');

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js"}],"../node_modules/underscore/modules/isFunction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _setup = require("./_setup.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isFunction = (0, _tagTester.default)('Function'); // Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
// v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).

var nodelist = _setup.root.document && _setup.root.document.childNodes;

if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
  isFunction = function (obj) {
    return typeof obj == 'function' || false;
  };
}

var _default = isFunction;
exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js","./_setup.js":"../node_modules/underscore/modules/_setup.js"}],"../node_modules/underscore/modules/_hasObjectTag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('Object');

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js"}],"../node_modules/underscore/modules/_stringTagBug.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIE11 = exports.hasStringTagBug = void 0;

var _setup = require("./_setup.js");

var _hasObjectTag = _interopRequireDefault(require("./_hasObjectTag.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// In IE 10 - Edge 13, `DataView` has string tag `'[object Object]'`.
// In IE 11, the most common among them, this problem also applies to
// `Map`, `WeakMap` and `Set`.
var hasStringTagBug = _setup.supportsDataView && (0, _hasObjectTag.default)(new DataView(new ArrayBuffer(8))),
    isIE11 = typeof Map !== 'undefined' && (0, _hasObjectTag.default)(new Map());
exports.isIE11 = isIE11;
exports.hasStringTagBug = hasStringTagBug;
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js","./_hasObjectTag.js":"../node_modules/underscore/modules/_hasObjectTag.js"}],"../node_modules/underscore/modules/isDataView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _isArrayBuffer = _interopRequireDefault(require("./isArrayBuffer.js"));

var _stringTagBug = require("./_stringTagBug.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDataView = (0, _tagTester.default)('DataView'); // In IE 10 - Edge 13, we need a different heuristic
// to determine whether an object is a `DataView`.

function ie10IsDataView(obj) {
  return obj != null && (0, _isFunction.default)(obj.getInt8) && (0, _isArrayBuffer.default)(obj.buffer);
}

var _default = _stringTagBug.hasStringTagBug ? ie10IsDataView : isDataView;

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js","./isFunction.js":"../node_modules/underscore/modules/isFunction.js","./isArrayBuffer.js":"../node_modules/underscore/modules/isArrayBuffer.js","./_stringTagBug.js":"../node_modules/underscore/modules/_stringTagBug.js"}],"../node_modules/underscore/modules/isArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _setup = require("./_setup.js");

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is a given value an array?
// Delegates to ECMA5's native `Array.isArray`.
var _default = _setup.nativeIsArray || (0, _tagTester.default)('Array');

exports.default = _default;
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js","./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js"}],"../node_modules/underscore/modules/_has.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = has;

var _setup = require("./_setup.js");

// Internal function to check whether `key` is an own property name of `obj`.
function has(obj, key) {
  return obj != null && _setup.hasOwnProperty.call(obj, key);
}
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js"}],"../node_modules/underscore/modules/isArguments.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isArguments = (0, _tagTester.default)('Arguments'); // Define a fallback version of the method in browsers (ahem, IE < 9), where
// there isn't any inspectable "Arguments" type.

(function () {
  if (!isArguments(arguments)) {
    isArguments = function (obj) {
      return (0, _has.default)(obj, 'callee');
    };
  }
})();

var _default = isArguments;
exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js","./_has.js":"../node_modules/underscore/modules/_has.js"}],"../node_modules/underscore/modules/isFinite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFinite;

var _setup = require("./_setup.js");

var _isSymbol = _interopRequireDefault(require("./isSymbol.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is a given object a finite number?
function isFinite(obj) {
  return !(0, _isSymbol.default)(obj) && (0, _setup._isFinite)(obj) && !isNaN(parseFloat(obj));
}
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js","./isSymbol.js":"../node_modules/underscore/modules/isSymbol.js"}],"../node_modules/underscore/modules/isNaN.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNaN;

var _setup = require("./_setup.js");

var _isNumber = _interopRequireDefault(require("./isNumber.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is the given value `NaN`?
function isNaN(obj) {
  return (0, _isNumber.default)(obj) && (0, _setup._isNaN)(obj);
}
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js","./isNumber.js":"../node_modules/underscore/modules/isNumber.js"}],"../node_modules/underscore/modules/constant.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = constant;

// Predicate-generating function. Often useful outside of Underscore.
function constant(value) {
  return function () {
    return value;
  };
}
},{}],"../node_modules/underscore/modules/_createSizePropertyCheck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSizePropertyCheck;

var _setup = require("./_setup.js");

// Common internal logic for `isArrayLike` and `isBufferLike`.
function createSizePropertyCheck(getSizeProperty) {
  return function (collection) {
    var sizeProperty = getSizeProperty(collection);
    return typeof sizeProperty == 'number' && sizeProperty >= 0 && sizeProperty <= _setup.MAX_ARRAY_INDEX;
  };
}
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js"}],"../node_modules/underscore/modules/_shallowProperty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shallowProperty;

// Internal helper to generate a function to obtain property `key` from `obj`.
function shallowProperty(key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key];
  };
}
},{}],"../node_modules/underscore/modules/_getByteLength.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shallowProperty = _interopRequireDefault(require("./_shallowProperty.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to obtain the `byteLength` property of an object.
var _default = (0, _shallowProperty.default)('byteLength');

exports.default = _default;
},{"./_shallowProperty.js":"../node_modules/underscore/modules/_shallowProperty.js"}],"../node_modules/underscore/modules/_isBufferLike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createSizePropertyCheck = _interopRequireDefault(require("./_createSizePropertyCheck.js"));

var _getByteLength = _interopRequireDefault(require("./_getByteLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to determine whether we should spend extensive checks against
// `ArrayBuffer` et al.
var _default = (0, _createSizePropertyCheck.default)(_getByteLength.default);

exports.default = _default;
},{"./_createSizePropertyCheck.js":"../node_modules/underscore/modules/_createSizePropertyCheck.js","./_getByteLength.js":"../node_modules/underscore/modules/_getByteLength.js"}],"../node_modules/underscore/modules/isTypedArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _setup = require("./_setup.js");

var _isDataView = _interopRequireDefault(require("./isDataView.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

var _isBufferLike = _interopRequireDefault(require("./_isBufferLike.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is a given value a typed array?
var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;

function isTypedArray(obj) {
  // `ArrayBuffer.isView` is the most future-proof, so use it when available.
  // Otherwise, fall back on the above regular expression.
  return _setup.nativeIsView ? (0, _setup.nativeIsView)(obj) && !(0, _isDataView.default)(obj) : (0, _isBufferLike.default)(obj) && typedArrayPattern.test(_setup.toString.call(obj));
}

var _default = _setup.supportsArrayBuffer ? isTypedArray : (0, _constant.default)(false);

exports.default = _default;
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js","./isDataView.js":"../node_modules/underscore/modules/isDataView.js","./constant.js":"../node_modules/underscore/modules/constant.js","./_isBufferLike.js":"../node_modules/underscore/modules/_isBufferLike.js"}],"../node_modules/underscore/modules/_getLength.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shallowProperty = _interopRequireDefault(require("./_shallowProperty.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to obtain the `length` property of an object.
var _default = (0, _shallowProperty.default)('length');

exports.default = _default;
},{"./_shallowProperty.js":"../node_modules/underscore/modules/_shallowProperty.js"}],"../node_modules/underscore/modules/_collectNonEnumProps.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = collectNonEnumProps;

var _setup = require("./_setup.js");

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to create a simple lookup structure.
// `collectNonEnumProps` used to depend on `_.contains`, but this led to
// circular imports. `emulatedSet` is a one-off solution that only works for
// arrays of strings.
function emulatedSet(keys) {
  var hash = {};

  for (var l = keys.length, i = 0; i < l; ++i) hash[keys[i]] = true;

  return {
    contains: function (key) {
      return hash[key];
    },
    push: function (key) {
      hash[key] = true;
      return keys.push(key);
    }
  };
} // Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
// be iterated by `for key in ...` and thus missed. Extends `keys` in place if
// needed.


function collectNonEnumProps(obj, keys) {
  keys = emulatedSet(keys);
  var nonEnumIdx = _setup.nonEnumerableProps.length;
  var constructor = obj.constructor;

  var proto = (0, _isFunction.default)(constructor) && constructor.prototype || _setup.ObjProto; // Constructor is a special case.


  var prop = 'constructor';
  if ((0, _has.default)(obj, prop) && !keys.contains(prop)) keys.push(prop);

  while (nonEnumIdx--) {
    prop = _setup.nonEnumerableProps[nonEnumIdx];

    if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
      keys.push(prop);
    }
  }
}
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js","./isFunction.js":"../node_modules/underscore/modules/isFunction.js","./_has.js":"../node_modules/underscore/modules/_has.js"}],"../node_modules/underscore/modules/keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keys;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _setup = require("./_setup.js");

var _has = _interopRequireDefault(require("./_has.js"));

var _collectNonEnumProps = _interopRequireDefault(require("./_collectNonEnumProps.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Retrieve the names of an object's own properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`.
function keys(obj) {
  if (!(0, _isObject.default)(obj)) return [];
  if (_setup.nativeKeys) return (0, _setup.nativeKeys)(obj);
  var keys = [];

  for (var key in obj) if ((0, _has.default)(obj, key)) keys.push(key); // Ahem, IE < 9.


  if (_setup.hasEnumBug) (0, _collectNonEnumProps.default)(obj, keys);
  return keys;
}
},{"./isObject.js":"../node_modules/underscore/modules/isObject.js","./_setup.js":"../node_modules/underscore/modules/_setup.js","./_has.js":"../node_modules/underscore/modules/_has.js","./_collectNonEnumProps.js":"../node_modules/underscore/modules/_collectNonEnumProps.js"}],"../node_modules/underscore/modules/isEmpty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmpty;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _isString = _interopRequireDefault(require("./isString.js"));

var _isArguments = _interopRequireDefault(require("./isArguments.js"));

var _keys = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
function isEmpty(obj) {
  if (obj == null) return true; // Skip the more expensive `toString`-based type checks if `obj` has no
  // `.length`.

  var length = (0, _getLength.default)(obj);
  if (typeof length == 'number' && ((0, _isArray.default)(obj) || (0, _isString.default)(obj) || (0, _isArguments.default)(obj))) return length === 0;
  return (0, _getLength.default)((0, _keys.default)(obj)) === 0;
}
},{"./_getLength.js":"../node_modules/underscore/modules/_getLength.js","./isArray.js":"../node_modules/underscore/modules/isArray.js","./isString.js":"../node_modules/underscore/modules/isString.js","./isArguments.js":"../node_modules/underscore/modules/isArguments.js","./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/isMatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMatch;

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns whether an object has a given set of `key:value` pairs.
function isMatch(object, attrs) {
  var _keys = (0, _keys2.default)(attrs),
      length = _keys.length;

  if (object == null) return !length;
  var obj = Object(object);

  for (var i = 0; i < length; i++) {
    var key = _keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }

  return true;
}
},{"./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/underscore.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _;

var _setup = require("./_setup.js");

// If Underscore is called as a function, it returns a wrapped object that can
// be used OO-style. This wrapper holds altered versions of all functions added
// through `_.mixin`. Wrapped objects may be chained.
function _(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
}

_.VERSION = _setup.VERSION; // Extracts the result from a wrapped and chained object.

_.prototype.value = function () {
  return this._wrapped;
}; // Provide unwrapping proxies for some methods used in engine operations
// such as arithmetic and JSON stringification.


_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

_.prototype.toString = function () {
  return String(this._wrapped);
};
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js"}],"../node_modules/underscore/modules/_toBufferView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toBufferView;

var _getByteLength = _interopRequireDefault(require("./_getByteLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal function to wrap or shallow-copy an ArrayBuffer,
// typed array or DataView to a new view, reusing the buffer.
function toBufferView(bufferSource) {
  return new Uint8Array(bufferSource.buffer || bufferSource, bufferSource.byteOffset || 0, (0, _getByteLength.default)(bufferSource));
}
},{"./_getByteLength.js":"../node_modules/underscore/modules/_getByteLength.js"}],"../node_modules/underscore/modules/isEqual.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEqual;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _setup = require("./_setup.js");

var _getByteLength = _interopRequireDefault(require("./_getByteLength.js"));

var _isTypedArray = _interopRequireDefault(require("./isTypedArray.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _stringTagBug = require("./_stringTagBug.js");

var _isDataView = _interopRequireDefault(require("./isDataView.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

var _has = _interopRequireDefault(require("./_has.js"));

var _toBufferView = _interopRequireDefault(require("./_toBufferView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// We use this string twice, so give it a name for minification.
var tagDataView = '[object DataView]'; // Internal recursive comparison function for `_.isEqual`.

function eq(a, b, aStack, bStack) {
  // Identical objects are equal. `0 === -0`, but they aren't identical.
  // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
  if (a === b) return a !== 0 || 1 / a === 1 / b; // `null` or `undefined` only equal to itself (strict comparison).

  if (a == null || b == null) return false; // `NaN`s are equivalent, but non-reflexive.

  if (a !== a) return b !== b; // Exhaust primitive checks

  var type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
  return deepEq(a, b, aStack, bStack);
} // Internal recursive comparison function for `_.isEqual`.


function deepEq(a, b, aStack, bStack) {
  // Unwrap any wrapped objects.
  if (a instanceof _underscore.default) a = a._wrapped;
  if (b instanceof _underscore.default) b = b._wrapped; // Compare `[[Class]]` names.

  var className = _setup.toString.call(a);

  if (className !== _setup.toString.call(b)) return false; // Work around a bug in IE 10 - Edge 13.

  if (_stringTagBug.hasStringTagBug && className == '[object Object]' && (0, _isDataView.default)(a)) {
    if (!(0, _isDataView.default)(b)) return false;
    className = tagDataView;
  }

  switch (className) {
    // These types are compared by value.
    case '[object RegExp]': // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')

    case '[object String]':
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return '' + a === '' + b;

    case '[object Number]':
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN.
      if (+a !== +a) return +b !== +b; // An `egal` comparison is performed for other numeric values.

      return +a === 0 ? 1 / +a === 1 / b : +a === +b;

    case '[object Date]':
    case '[object Boolean]':
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;

    case '[object Symbol]':
      return _setup.SymbolProto.valueOf.call(a) === _setup.SymbolProto.valueOf.call(b);

    case '[object ArrayBuffer]':
    case tagDataView:
      // Coerce to typed array so we can fall through.
      return deepEq((0, _toBufferView.default)(a), (0, _toBufferView.default)(b), aStack, bStack);
  }

  var areArrays = className === '[object Array]';

  if (!areArrays && (0, _isTypedArray.default)(a)) {
    var byteLength = (0, _getByteLength.default)(a);
    if (byteLength !== (0, _getByteLength.default)(b)) return false;
    if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
    areArrays = true;
  }

  if (!areArrays) {
    if (typeof a != 'object' || typeof b != 'object') return false; // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.

    var aCtor = a.constructor,
        bCtor = b.constructor;

    if (aCtor !== bCtor && !((0, _isFunction.default)(aCtor) && aCtor instanceof aCtor && (0, _isFunction.default)(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
      return false;
    }
  } // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.


  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;

  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) return bStack[length] === b;
  } // Add the first object to the stack of traversed objects.


  aStack.push(a);
  bStack.push(b); // Recursively compare objects and arrays.

  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length;
    if (length !== b.length) return false; // Deep compare the contents, ignoring non-numeric properties.

    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    // Deep compare objects.
    var _keys = (0, _keys2.default)(a),
        key;

    length = _keys.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

    if ((0, _keys2.default)(b).length !== length) return false;

    while (length--) {
      // Deep compare each member
      key = _keys[length];
      if (!((0, _has.default)(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  } // Remove the first object from the stack of traversed objects.


  aStack.pop();
  bStack.pop();
  return true;
} // Perform a deep comparison to check if two objects are equal.


function isEqual(a, b) {
  return eq(a, b);
}
},{"./underscore.js":"../node_modules/underscore/modules/underscore.js","./_setup.js":"../node_modules/underscore/modules/_setup.js","./_getByteLength.js":"../node_modules/underscore/modules/_getByteLength.js","./isTypedArray.js":"../node_modules/underscore/modules/isTypedArray.js","./isFunction.js":"../node_modules/underscore/modules/isFunction.js","./_stringTagBug.js":"../node_modules/underscore/modules/_stringTagBug.js","./isDataView.js":"../node_modules/underscore/modules/isDataView.js","./keys.js":"../node_modules/underscore/modules/keys.js","./_has.js":"../node_modules/underscore/modules/_has.js","./_toBufferView.js":"../node_modules/underscore/modules/_toBufferView.js"}],"../node_modules/underscore/modules/allKeys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = allKeys;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _setup = require("./_setup.js");

var _collectNonEnumProps = _interopRequireDefault(require("./_collectNonEnumProps.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Retrieve all the enumerable property names of an object.
function allKeys(obj) {
  if (!(0, _isObject.default)(obj)) return [];
  var keys = [];

  for (var key in obj) keys.push(key); // Ahem, IE < 9.


  if (_setup.hasEnumBug) (0, _collectNonEnumProps.default)(obj, keys);
  return keys;
}
},{"./isObject.js":"../node_modules/underscore/modules/isObject.js","./_setup.js":"../node_modules/underscore/modules/_setup.js","./_collectNonEnumProps.js":"../node_modules/underscore/modules/_collectNonEnumProps.js"}],"../node_modules/underscore/modules/_methodFingerprint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ie11fingerprint = ie11fingerprint;
exports.setMethods = exports.weakMapMethods = exports.mapMethods = void 0;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Since the regular `Object.prototype.toString` type tests don't work for
// some types in IE 11, we use a fingerprinting heuristic instead, based
// on the methods. It's not great, but it's the best we got.
// The fingerprint method lists are defined below.
function ie11fingerprint(methods) {
  var length = (0, _getLength.default)(methods);
  return function (obj) {
    if (obj == null) return false; // `Map`, `WeakMap` and `Set` have no enumerable keys.

    var keys = (0, _allKeys.default)(obj);
    if ((0, _getLength.default)(keys)) return false;

    for (var i = 0; i < length; i++) {
      if (!(0, _isFunction.default)(obj[methods[i]])) return false;
    } // If we are testing against `WeakMap`, we need to ensure that
    // `obj` doesn't have a `forEach` method in order to distinguish
    // it from a regular `Map`.


    return methods !== weakMapMethods || !(0, _isFunction.default)(obj[forEachName]);
  };
} // In the interest of compact minification, we write
// each string in the fingerprints only once.


var forEachName = 'forEach',
    hasName = 'has',
    commonInit = ['clear', 'delete'],
    mapTail = ['get', hasName, 'set']; // `Map`, `WeakMap` and `Set` each have slightly different
// combinations of the above sublists.

var mapMethods = commonInit.concat(forEachName, mapTail),
    weakMapMethods = commonInit.concat(mapTail),
    setMethods = ['add'].concat(commonInit, forEachName, hasName);
exports.setMethods = setMethods;
exports.weakMapMethods = weakMapMethods;
exports.mapMethods = mapMethods;
},{"./_getLength.js":"../node_modules/underscore/modules/_getLength.js","./isFunction.js":"../node_modules/underscore/modules/isFunction.js","./allKeys.js":"../node_modules/underscore/modules/allKeys.js"}],"../node_modules/underscore/modules/isMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _stringTagBug = require("./_stringTagBug.js");

var _methodFingerprint = require("./_methodFingerprint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _stringTagBug.isIE11 ? (0, _methodFingerprint.ie11fingerprint)(_methodFingerprint.mapMethods) : (0, _tagTester.default)('Map');

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js","./_stringTagBug.js":"../node_modules/underscore/modules/_stringTagBug.js","./_methodFingerprint.js":"../node_modules/underscore/modules/_methodFingerprint.js"}],"../node_modules/underscore/modules/isWeakMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _stringTagBug = require("./_stringTagBug.js");

var _methodFingerprint = require("./_methodFingerprint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _stringTagBug.isIE11 ? (0, _methodFingerprint.ie11fingerprint)(_methodFingerprint.weakMapMethods) : (0, _tagTester.default)('WeakMap');

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js","./_stringTagBug.js":"../node_modules/underscore/modules/_stringTagBug.js","./_methodFingerprint.js":"../node_modules/underscore/modules/_methodFingerprint.js"}],"../node_modules/underscore/modules/isSet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

var _stringTagBug = require("./_stringTagBug.js");

var _methodFingerprint = require("./_methodFingerprint.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _stringTagBug.isIE11 ? (0, _methodFingerprint.ie11fingerprint)(_methodFingerprint.setMethods) : (0, _tagTester.default)('Set');

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js","./_stringTagBug.js":"../node_modules/underscore/modules/_stringTagBug.js","./_methodFingerprint.js":"../node_modules/underscore/modules/_methodFingerprint.js"}],"../node_modules/underscore/modules/isWeakSet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tagTester = _interopRequireDefault(require("./_tagTester.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _tagTester.default)('WeakSet');

exports.default = _default;
},{"./_tagTester.js":"../node_modules/underscore/modules/_tagTester.js"}],"../node_modules/underscore/modules/values.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = values;

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Retrieve the values of an object's properties.
function values(obj) {
  var _keys = (0, _keys2.default)(obj);

  var length = _keys.length;
  var values = Array(length);

  for (var i = 0; i < length; i++) {
    values[i] = obj[_keys[i]];
  }

  return values;
}
},{"./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/pairs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pairs;

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convert an object into a list of `[key, value]` pairs.
// The opposite of `_.object` with one argument.
function pairs(obj) {
  var _keys = (0, _keys2.default)(obj);

  var length = _keys.length;
  var pairs = Array(length);

  for (var i = 0; i < length; i++) {
    pairs[i] = [_keys[i], obj[_keys[i]]];
  }

  return pairs;
}
},{"./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/invert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invert;

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Invert the keys and values of an object. The values must be serializable.
function invert(obj) {
  var result = {};

  var _keys = (0, _keys2.default)(obj);

  for (var i = 0, length = _keys.length; i < length; i++) {
    result[obj[_keys[i]]] = _keys[i];
  }

  return result;
}
},{"./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = functions;

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a sorted list of the function names available on the object.
function functions(obj) {
  var names = [];

  for (var key in obj) {
    if ((0, _isFunction.default)(obj[key])) names.push(key);
  }

  return names.sort();
}
},{"./isFunction.js":"../node_modules/underscore/modules/isFunction.js"}],"../node_modules/underscore/modules/_createAssigner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createAssigner;

// An internal function for creating assigner functions.
function createAssigner(keysFunc, defaults) {
  return function (obj) {
    var length = arguments.length;
    if (defaults) obj = Object(obj);
    if (length < 2 || obj == null) return obj;

    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;

      for (var i = 0; i < l; i++) {
        var key = keys[i];
        if (!defaults || obj[key] === void 0) obj[key] = source[key];
      }
    }

    return obj;
  };
}
},{}],"../node_modules/underscore/modules/extend.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createAssigner = _interopRequireDefault(require("./_createAssigner.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Extend a given object with all the properties in passed-in object(s).
var _default = (0, _createAssigner.default)(_allKeys.default);

exports.default = _default;
},{"./_createAssigner.js":"../node_modules/underscore/modules/_createAssigner.js","./allKeys.js":"../node_modules/underscore/modules/allKeys.js"}],"../node_modules/underscore/modules/extendOwn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createAssigner = _interopRequireDefault(require("./_createAssigner.js"));

var _keys = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Assigns a given object with all the own properties in the passed-in
// object(s).
// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
var _default = (0, _createAssigner.default)(_keys.default);

exports.default = _default;
},{"./_createAssigner.js":"../node_modules/underscore/modules/_createAssigner.js","./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/defaults.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createAssigner = _interopRequireDefault(require("./_createAssigner.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Fill in a given object with default properties.
var _default = (0, _createAssigner.default)(_allKeys.default, true);

exports.default = _default;
},{"./_createAssigner.js":"../node_modules/underscore/modules/_createAssigner.js","./allKeys.js":"../node_modules/underscore/modules/allKeys.js"}],"../node_modules/underscore/modules/_baseCreate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = baseCreate;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _setup = require("./_setup.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a naked function reference for surrogate-prototype-swapping.
function ctor() {
  return function () {};
} // An internal function for creating a new object that inherits from another.


function baseCreate(prototype) {
  if (!(0, _isObject.default)(prototype)) return {};
  if (_setup.nativeCreate) return (0, _setup.nativeCreate)(prototype);
  var Ctor = ctor();
  Ctor.prototype = prototype;
  var result = new Ctor();
  Ctor.prototype = null;
  return result;
}
},{"./isObject.js":"../node_modules/underscore/modules/isObject.js","./_setup.js":"../node_modules/underscore/modules/_setup.js"}],"../node_modules/underscore/modules/create.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _baseCreate = _interopRequireDefault(require("./_baseCreate.js"));

var _extendOwn = _interopRequireDefault(require("./extendOwn.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Creates an object that inherits from the given prototype object.
// If additional properties are provided then they will be added to the
// created object.
function create(prototype, props) {
  var result = (0, _baseCreate.default)(prototype);
  if (props) (0, _extendOwn.default)(result, props);
  return result;
}
},{"./_baseCreate.js":"../node_modules/underscore/modules/_baseCreate.js","./extendOwn.js":"../node_modules/underscore/modules/extendOwn.js"}],"../node_modules/underscore/modules/clone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clone;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _extend = _interopRequireDefault(require("./extend.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a (shallow-cloned) duplicate of an object.
function clone(obj) {
  if (!(0, _isObject.default)(obj)) return obj;
  return (0, _isArray.default)(obj) ? obj.slice() : (0, _extend.default)({}, obj);
}
},{"./isObject.js":"../node_modules/underscore/modules/isObject.js","./isArray.js":"../node_modules/underscore/modules/isArray.js","./extend.js":"../node_modules/underscore/modules/extend.js"}],"../node_modules/underscore/modules/tap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tap;

// Invokes `interceptor` with the `obj` and then returns `obj`.
// The primary purpose of this method is to "tap into" a method chain, in
// order to perform operations on intermediate results within the chain.
function tap(obj, interceptor) {
  interceptor(obj);
  return obj;
}
},{}],"../node_modules/underscore/modules/toPath.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toPath;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Normalize a (deep) property `path` to array.
// Like `_.iteratee`, this function can be customized.
function toPath(path) {
  return (0, _isArray.default)(path) ? path : [path];
}

_underscore.default.toPath = toPath;
},{"./underscore.js":"../node_modules/underscore/modules/underscore.js","./isArray.js":"../node_modules/underscore/modules/isArray.js"}],"../node_modules/underscore/modules/_toPath.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toPath;

var _underscore = _interopRequireDefault(require("./underscore.js"));

require("./toPath.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal wrapper for `_.toPath` to enable minification.
// Similar to `cb` for `_.iteratee`.
function toPath(path) {
  return _underscore.default.toPath(path);
}
},{"./underscore.js":"../node_modules/underscore/modules/underscore.js","./toPath.js":"../node_modules/underscore/modules/toPath.js"}],"../node_modules/underscore/modules/_deepGet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepGet;

// Internal function to obtain a nested property in `obj` along `path`.
function deepGet(obj, path) {
  var length = path.length;

  for (var i = 0; i < length; i++) {
    if (obj == null) return void 0;
    obj = obj[path[i]];
  }

  return length ? obj : void 0;
}
},{}],"../node_modules/underscore/modules/get.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = get;

var _toPath = _interopRequireDefault(require("./_toPath.js"));

var _deepGet = _interopRequireDefault(require("./_deepGet.js"));

var _isUndefined = _interopRequireDefault(require("./isUndefined.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get the value of the (deep) property on `path` from `object`.
// If any property in `path` does not exist or if the value is
// `undefined`, return `defaultValue` instead.
// The `path` is normalized through `_.toPath`.
function get(object, path, defaultValue) {
  var value = (0, _deepGet.default)(object, (0, _toPath.default)(path));
  return (0, _isUndefined.default)(value) ? defaultValue : value;
}
},{"./_toPath.js":"../node_modules/underscore/modules/_toPath.js","./_deepGet.js":"../node_modules/underscore/modules/_deepGet.js","./isUndefined.js":"../node_modules/underscore/modules/isUndefined.js"}],"../node_modules/underscore/modules/has.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = has;

var _has2 = _interopRequireDefault(require("./_has.js"));

var _toPath = _interopRequireDefault(require("./_toPath.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Shortcut function for checking if an object has a given property directly on
// itself (in other words, not on a prototype). Unlike the internal `has`
// function, this public version can also traverse nested properties.
function has(obj, path) {
  path = (0, _toPath.default)(path);
  var length = path.length;

  for (var i = 0; i < length; i++) {
    var key = path[i];
    if (!(0, _has2.default)(obj, key)) return false;
    obj = obj[key];
  }

  return !!length;
}
},{"./_has.js":"../node_modules/underscore/modules/_has.js","./_toPath.js":"../node_modules/underscore/modules/_toPath.js"}],"../node_modules/underscore/modules/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = identity;

// Keep the identity function around for default iteratees.
function identity(value) {
  return value;
}
},{}],"../node_modules/underscore/modules/matcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matcher;

var _extendOwn = _interopRequireDefault(require("./extendOwn.js"));

var _isMatch = _interopRequireDefault(require("./isMatch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a predicate for checking whether an object has a given set of
// `key:value` pairs.
function matcher(attrs) {
  attrs = (0, _extendOwn.default)({}, attrs);
  return function (obj) {
    return (0, _isMatch.default)(obj, attrs);
  };
}
},{"./extendOwn.js":"../node_modules/underscore/modules/extendOwn.js","./isMatch.js":"../node_modules/underscore/modules/isMatch.js"}],"../node_modules/underscore/modules/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = property;

var _deepGet = _interopRequireDefault(require("./_deepGet.js"));

var _toPath = _interopRequireDefault(require("./_toPath.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Creates a function that, when passed an object, will traverse that object’s
// properties down the given `path`, specified as an array of keys or indices.
function property(path) {
  path = (0, _toPath.default)(path);
  return function (obj) {
    return (0, _deepGet.default)(obj, path);
  };
}
},{"./_deepGet.js":"../node_modules/underscore/modules/_deepGet.js","./_toPath.js":"../node_modules/underscore/modules/_toPath.js"}],"../node_modules/underscore/modules/_optimizeCb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = optimizeCb;

// Internal function that returns an efficient (for current engines) version
// of the passed-in callback, to be repeatedly applied in other Underscore
// functions.
function optimizeCb(func, context, argCount) {
  if (context === void 0) return func;

  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function (value) {
        return func.call(context, value);
      };
    // The 2-argument case is omitted because we’re not using it.

    case 3:
      return function (value, index, collection) {
        return func.call(context, value, index, collection);
      };

    case 4:
      return function (accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
  }

  return function () {
    return func.apply(context, arguments);
  };
}
},{}],"../node_modules/underscore/modules/_baseIteratee.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = baseIteratee;

var _identity = _interopRequireDefault(require("./identity.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

var _property = _interopRequireDefault(require("./property.js"));

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// An internal function to generate callbacks that can be applied to each
// element in a collection, returning the desired result — either `_.identity`,
// an arbitrary callback, a property matcher, or a property accessor.
function baseIteratee(value, context, argCount) {
  if (value == null) return _identity.default;
  if ((0, _isFunction.default)(value)) return (0, _optimizeCb.default)(value, context, argCount);
  if ((0, _isObject.default)(value) && !(0, _isArray.default)(value)) return (0, _matcher.default)(value);
  return (0, _property.default)(value);
}
},{"./identity.js":"../node_modules/underscore/modules/identity.js","./isFunction.js":"../node_modules/underscore/modules/isFunction.js","./isObject.js":"../node_modules/underscore/modules/isObject.js","./isArray.js":"../node_modules/underscore/modules/isArray.js","./matcher.js":"../node_modules/underscore/modules/matcher.js","./property.js":"../node_modules/underscore/modules/property.js","./_optimizeCb.js":"../node_modules/underscore/modules/_optimizeCb.js"}],"../node_modules/underscore/modules/iteratee.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = iteratee;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _baseIteratee = _interopRequireDefault(require("./_baseIteratee.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// External wrapper for our callback generator. Users may customize
// `_.iteratee` if they want additional predicate/iteratee shorthand styles.
// This abstraction hides the internal-only `argCount` argument.
function iteratee(value, context) {
  return (0, _baseIteratee.default)(value, context, Infinity);
}

_underscore.default.iteratee = iteratee;
},{"./underscore.js":"../node_modules/underscore/modules/underscore.js","./_baseIteratee.js":"../node_modules/underscore/modules/_baseIteratee.js"}],"../node_modules/underscore/modules/_cb.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cb;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _baseIteratee = _interopRequireDefault(require("./_baseIteratee.js"));

var _iteratee = _interopRequireDefault(require("./iteratee.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The function we call internally to generate a callback. It invokes
// `_.iteratee` if overridden, otherwise `baseIteratee`.
function cb(value, context, argCount) {
  if (_underscore.default.iteratee !== _iteratee.default) return _underscore.default.iteratee(value, context);
  return (0, _baseIteratee.default)(value, context, argCount);
}
},{"./underscore.js":"../node_modules/underscore/modules/underscore.js","./_baseIteratee.js":"../node_modules/underscore/modules/_baseIteratee.js","./iteratee.js":"../node_modules/underscore/modules/iteratee.js"}],"../node_modules/underscore/modules/mapObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapObject;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the results of applying the `iteratee` to each element of `obj`.
// In contrast to `_.map` it returns an object.
function mapObject(obj, iteratee, context) {
  iteratee = (0, _cb.default)(iteratee, context);

  var _keys = (0, _keys2.default)(obj),
      length = _keys.length,
      results = {};

  for (var index = 0; index < length; index++) {
    var currentKey = _keys[index];
    results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
  }

  return results;
}
},{"./_cb.js":"../node_modules/underscore/modules/_cb.js","./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/noop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = noop;

// Predicate-generating function. Often useful outside of Underscore.
function noop() {}
},{}],"../node_modules/underscore/modules/propertyOf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = propertyOf;

var _noop = _interopRequireDefault(require("./noop.js"));

var _get = _interopRequireDefault(require("./get.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Generates a function for a given object that returns a given property.
function propertyOf(obj) {
  if (obj == null) return _noop.default;
  return function (path) {
    return (0, _get.default)(obj, path);
  };
}
},{"./noop.js":"../node_modules/underscore/modules/noop.js","./get.js":"../node_modules/underscore/modules/get.js"}],"../node_modules/underscore/modules/times.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = times;

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Run a function **n** times.
function times(n, iteratee, context) {
  var accum = Array(Math.max(0, n));
  iteratee = (0, _optimizeCb.default)(iteratee, context, 1);

  for (var i = 0; i < n; i++) accum[i] = iteratee(i);

  return accum;
}
},{"./_optimizeCb.js":"../node_modules/underscore/modules/_optimizeCb.js"}],"../node_modules/underscore/modules/random.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = random;

// Return a random integer between `min` and `max` (inclusive).
function random(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }

  return min + Math.floor(Math.random() * (max - min + 1));
}
},{}],"../node_modules/underscore/modules/now.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// A (possibly faster) way to get the current timestamp as an integer.
var _default = Date.now || function () {
  return new Date().getTime();
};

exports.default = _default;
},{}],"../node_modules/underscore/modules/_createEscaper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createEscaper;

var _keys = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to generate functions for escaping and unescaping strings
// to/from HTML interpolation.
function createEscaper(map) {
  var escaper = function (match) {
    return map[match];
  }; // Regexes for identifying a key that needs to be escaped.


  var source = '(?:' + (0, _keys.default)(map).join('|') + ')';
  var testRegexp = RegExp(source);
  var replaceRegexp = RegExp(source, 'g');
  return function (string) {
    string = string == null ? '' : '' + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  };
}
},{"./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/_escapeMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Internal list of HTML entities for escaping.
var _default = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};
exports.default = _default;
},{}],"../node_modules/underscore/modules/escape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createEscaper = _interopRequireDefault(require("./_createEscaper.js"));

var _escapeMap = _interopRequireDefault(require("./_escapeMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Function for escaping strings to HTML interpolation.
var _default = (0, _createEscaper.default)(_escapeMap.default);

exports.default = _default;
},{"./_createEscaper.js":"../node_modules/underscore/modules/_createEscaper.js","./_escapeMap.js":"../node_modules/underscore/modules/_escapeMap.js"}],"../node_modules/underscore/modules/_unescapeMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invert = _interopRequireDefault(require("./invert.js"));

var _escapeMap = _interopRequireDefault(require("./_escapeMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal list of HTML entities for unescaping.
var _default = (0, _invert.default)(_escapeMap.default);

exports.default = _default;
},{"./invert.js":"../node_modules/underscore/modules/invert.js","./_escapeMap.js":"../node_modules/underscore/modules/_escapeMap.js"}],"../node_modules/underscore/modules/unescape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createEscaper = _interopRequireDefault(require("./_createEscaper.js"));

var _unescapeMap = _interopRequireDefault(require("./_unescapeMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Function for unescaping strings from HTML interpolation.
var _default = (0, _createEscaper.default)(_unescapeMap.default);

exports.default = _default;
},{"./_createEscaper.js":"../node_modules/underscore/modules/_createEscaper.js","./_unescapeMap.js":"../node_modules/underscore/modules/_unescapeMap.js"}],"../node_modules/underscore/modules/templateSettings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// By default, Underscore uses ERB-style template delimiters. Change the
// following template settings to use alternative delimiters.
var _default = _underscore.default.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};

exports.default = _default;
},{"./underscore.js":"../node_modules/underscore/modules/underscore.js"}],"../node_modules/underscore/modules/template.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = template;

var _defaults = _interopRequireDefault(require("./defaults.js"));

var _underscore = _interopRequireDefault(require("./underscore.js"));

require("./templateSettings.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// When customizing `_.templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
var noMatch = /(.)^/; // Certain characters need to be escaped so that they can be put into a
// string literal.

var escapes = {
  "'": "'",
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};
var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

function escapeChar(match) {
  return '\\' + escapes[match];
} // In order to prevent third-party code injection through
// `_.templateSettings.variable`, we test it against the following regular
// expression. It is intentionally a bit more liberal than just matching valid
// identifiers, but still prevents possible loopholes through defaults or
// destructuring assignment.


var bareIdentifier = /^\s*(\w|\$)+\s*$/; // JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
// NB: `oldSettings` only exists for backwards compatibility.

function template(text, settings, oldSettings) {
  if (!settings && oldSettings) settings = oldSettings;
  settings = (0, _defaults.default)({}, settings, _underscore.default.templateSettings); // Combine delimiters into one regular expression via alternation.

  var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g'); // Compile the template source, escaping string literals appropriately.

  var index = 0;
  var source = "__p+='";
  text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
    source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
    index = offset + match.length;

    if (escape) {
      source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
    } else if (interpolate) {
      source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
    } else if (evaluate) {
      source += "';\n" + evaluate + "\n__p+='";
    } // Adobe VMs need the match returned to produce the correct offset.


    return match;
  });
  source += "';\n";
  var argument = settings.variable;

  if (argument) {
    // Insure against third-party code injection. (CVE-2021-23358)
    if (!bareIdentifier.test(argument)) throw new Error('variable is not a bare identifier: ' + argument);
  } else {
    // If a variable is not specified, place data values in local scope.
    source = 'with(obj||{}){\n' + source + '}\n';
    argument = 'obj';
  }

  source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';
  var render;

  try {
    render = new Function(argument, '_', source);
  } catch (e) {
    e.source = source;
    throw e;
  }

  var template = function (data) {
    return render.call(this, data, _underscore.default);
  }; // Provide the compiled source as a convenience for precompilation.


  template.source = 'function(' + argument + '){\n' + source + '}';
  return template;
}
},{"./defaults.js":"../node_modules/underscore/modules/defaults.js","./underscore.js":"../node_modules/underscore/modules/underscore.js","./templateSettings.js":"../node_modules/underscore/modules/templateSettings.js"}],"../node_modules/underscore/modules/result.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = result;

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _toPath = _interopRequireDefault(require("./_toPath.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Traverses the children of `obj` along `path`. If a child is a function, it
// is invoked with its parent as context. Returns the value of the final
// child, or `fallback` if any child is undefined.
function result(obj, path, fallback) {
  path = (0, _toPath.default)(path);
  var length = path.length;

  if (!length) {
    return (0, _isFunction.default)(fallback) ? fallback.call(obj) : fallback;
  }

  for (var i = 0; i < length; i++) {
    var prop = obj == null ? void 0 : obj[path[i]];

    if (prop === void 0) {
      prop = fallback;
      i = length; // Ensure we don't continue iterating.
    }

    obj = (0, _isFunction.default)(prop) ? prop.call(obj) : prop;
  }

  return obj;
}
},{"./isFunction.js":"../node_modules/underscore/modules/isFunction.js","./_toPath.js":"../node_modules/underscore/modules/_toPath.js"}],"../node_modules/underscore/modules/uniqueId.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniqueId;
// Generate a unique integer id (unique within the entire client session).
// Useful for temporary DOM ids.
var idCounter = 0;

function uniqueId(prefix) {
  var id = ++idCounter + '';
  return prefix ? prefix + id : id;
}
},{}],"../node_modules/underscore/modules/chain.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chain;

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Start chaining a wrapped Underscore object.
function chain(obj) {
  var instance = (0, _underscore.default)(obj);
  instance._chain = true;
  return instance;
}
},{"./underscore.js":"../node_modules/underscore/modules/underscore.js"}],"../node_modules/underscore/modules/_executeBound.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = executeBound;

var _baseCreate = _interopRequireDefault(require("./_baseCreate.js"));

var _isObject = _interopRequireDefault(require("./isObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal function to execute `sourceFunc` bound to `context` with optional
// `args`. Determines whether to execute a function as a constructor or as a
// normal function.
function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
  if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
  var self = (0, _baseCreate.default)(sourceFunc.prototype);
  var result = sourceFunc.apply(self, args);
  if ((0, _isObject.default)(result)) return result;
  return self;
}
},{"./_baseCreate.js":"../node_modules/underscore/modules/_baseCreate.js","./isObject.js":"../node_modules/underscore/modules/isObject.js"}],"../node_modules/underscore/modules/partial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _executeBound = _interopRequireDefault(require("./_executeBound.js"));

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. `_` acts
// as a placeholder by default, allowing any combination of arguments to be
// pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
var partial = (0, _restArguments.default)(function (func, boundArgs) {
  var placeholder = partial.placeholder;

  var bound = function () {
    var position = 0,
        length = boundArgs.length;
    var args = Array(length);

    for (var i = 0; i < length; i++) {
      args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
    }

    while (position < arguments.length) args.push(arguments[position++]);

    return (0, _executeBound.default)(func, bound, this, this, args);
  };

  return bound;
});
partial.placeholder = _underscore.default;
var _default = partial;
exports.default = _default;
},{"./restArguments.js":"../node_modules/underscore/modules/restArguments.js","./_executeBound.js":"../node_modules/underscore/modules/_executeBound.js","./underscore.js":"../node_modules/underscore/modules/underscore.js"}],"../node_modules/underscore/modules/bind.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _executeBound = _interopRequireDefault(require("./_executeBound.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Create a function bound to a given object (assigning `this`, and arguments,
// optionally).
var _default = (0, _restArguments.default)(function (func, context, args) {
  if (!(0, _isFunction.default)(func)) throw new TypeError('Bind must be called on a function');
  var bound = (0, _restArguments.default)(function (callArgs) {
    return (0, _executeBound.default)(func, bound, context, this, args.concat(callArgs));
  });
  return bound;
});

exports.default = _default;
},{"./restArguments.js":"../node_modules/underscore/modules/restArguments.js","./isFunction.js":"../node_modules/underscore/modules/isFunction.js","./_executeBound.js":"../node_modules/underscore/modules/_executeBound.js"}],"../node_modules/underscore/modules/_isArrayLike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createSizePropertyCheck = _interopRequireDefault(require("./_createSizePropertyCheck.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper for collection methods to determine whether a collection
// should be iterated as an array or as an object.
// Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
var _default = (0, _createSizePropertyCheck.default)(_getLength.default);

exports.default = _default;
},{"./_createSizePropertyCheck.js":"../node_modules/underscore/modules/_createSizePropertyCheck.js","./_getLength.js":"../node_modules/underscore/modules/_getLength.js"}],"../node_modules/underscore/modules/_flatten.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatten;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _isArguments = _interopRequireDefault(require("./isArguments.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal implementation of a recursive `flatten` function.
function flatten(input, depth, strict, output) {
  output = output || [];

  if (!depth && depth !== 0) {
    depth = Infinity;
  } else if (depth <= 0) {
    return output.concat(input);
  }

  var idx = output.length;

  for (var i = 0, length = (0, _getLength.default)(input); i < length; i++) {
    var value = input[i];

    if ((0, _isArrayLike.default)(value) && ((0, _isArray.default)(value) || (0, _isArguments.default)(value))) {
      // Flatten current level of array or arguments object.
      if (depth > 1) {
        flatten(value, depth - 1, strict, output);
        idx = output.length;
      } else {
        var j = 0,
            len = value.length;

        while (j < len) output[idx++] = value[j++];
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }

  return output;
}
},{"./_getLength.js":"../node_modules/underscore/modules/_getLength.js","./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./isArray.js":"../node_modules/underscore/modules/isArray.js","./isArguments.js":"../node_modules/underscore/modules/isArguments.js"}],"../node_modules/underscore/modules/bindAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

var _bind = _interopRequireDefault(require("./bind.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Bind a number of an object's methods to that object. Remaining arguments
// are the method names to be bound. Useful for ensuring that all callbacks
// defined on an object belong to it.
var _default = (0, _restArguments.default)(function (obj, keys) {
  keys = (0, _flatten.default)(keys, false, false);
  var index = keys.length;
  if (index < 1) throw new Error('bindAll must be passed function names');

  while (index--) {
    var key = keys[index];
    obj[key] = (0, _bind.default)(obj[key], obj);
  }

  return obj;
});

exports.default = _default;
},{"./restArguments.js":"../node_modules/underscore/modules/restArguments.js","./_flatten.js":"../node_modules/underscore/modules/_flatten.js","./bind.js":"../node_modules/underscore/modules/bind.js"}],"../node_modules/underscore/modules/memoize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = memoize;

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Memoize an expensive function by storing its results.
function memoize(func, hasher) {
  var memoize = function (key) {
    var cache = memoize.cache;
    var address = '' + (hasher ? hasher.apply(this, arguments) : key);
    if (!(0, _has.default)(cache, address)) cache[address] = func.apply(this, arguments);
    return cache[address];
  };

  memoize.cache = {};
  return memoize;
}
},{"./_has.js":"../node_modules/underscore/modules/_has.js"}],"../node_modules/underscore/modules/delay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
var _default = (0, _restArguments.default)(function (func, wait, args) {
  return setTimeout(function () {
    return func.apply(null, args);
  }, wait);
});

exports.default = _default;
},{"./restArguments.js":"../node_modules/underscore/modules/restArguments.js"}],"../node_modules/underscore/modules/defer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _partial = _interopRequireDefault(require("./partial.js"));

var _delay = _interopRequireDefault(require("./delay.js"));

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Defers a function, scheduling it to run after the current call stack has
// cleared.
var _default = (0, _partial.default)(_delay.default, _underscore.default, 1);

exports.default = _default;
},{"./partial.js":"../node_modules/underscore/modules/partial.js","./delay.js":"../node_modules/underscore/modules/delay.js","./underscore.js":"../node_modules/underscore/modules/underscore.js"}],"../node_modules/underscore/modules/throttle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;

var _now2 = _interopRequireDefault(require("./now.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : (0, _now2.default)();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function () {
    var _now = (0, _now2.default)();

    if (!previous && options.leading === false) previous = _now;
    var remaining = wait - (_now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = _now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
},{"./now.js":"../node_modules/underscore/modules/now.js"}],"../node_modules/underscore/modules/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _now = _interopRequireDefault(require("./now.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// When a sequence of calls of the returned function ends, the argument
// function is triggered. The end of a sequence is defined by the `wait`
// parameter. If `immediate` is passed, the argument function will be
// triggered at the beginning of the sequence instead of at the end.
function debounce(func, wait, immediate) {
  var timeout, previous, args, result, context;

  var later = function () {
    var passed = (0, _now.default)() - previous;

    if (wait > passed) {
      timeout = setTimeout(later, wait - passed);
    } else {
      timeout = null;
      if (!immediate) result = func.apply(context, args); // This check is needed because `func` can recursively invoke `debounced`.

      if (!timeout) args = context = null;
    }
  };

  var debounced = (0, _restArguments.default)(function (_args) {
    context = this;
    args = _args;
    previous = (0, _now.default)();

    if (!timeout) {
      timeout = setTimeout(later, wait);
      if (immediate) result = func.apply(context, args);
    }

    return result;
  });

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = args = context = null;
  };

  return debounced;
}
},{"./restArguments.js":"../node_modules/underscore/modules/restArguments.js","./now.js":"../node_modules/underscore/modules/now.js"}],"../node_modules/underscore/modules/wrap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrap;

var _partial = _interopRequireDefault(require("./partial.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the first function passed as an argument to the second,
// allowing you to adjust arguments, run code before and after, and
// conditionally execute the original function.
function wrap(func, wrapper) {
  return (0, _partial.default)(wrapper, func);
}
},{"./partial.js":"../node_modules/underscore/modules/partial.js"}],"../node_modules/underscore/modules/negate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = negate;

// Returns a negated version of the passed-in predicate.
function negate(predicate) {
  return function () {
    return !predicate.apply(this, arguments);
  };
}
},{}],"../node_modules/underscore/modules/compose.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;

// Returns a function that is the composition of a list of functions, each
// consuming the return value of the function that follows.
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);

    while (i--) result = args[i].call(this, result);

    return result;
  };
}
},{}],"../node_modules/underscore/modules/after.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = after;

// Returns a function that will only be executed on and after the Nth call.
function after(times, func) {
  return function () {
    if (--times < 1) {
      return func.apply(this, arguments);
    }
  };
}
},{}],"../node_modules/underscore/modules/before.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = before;

// Returns a function that will only be executed up to (but not including) the
// Nth call.
function before(times, func) {
  var memo;
  return function () {
    if (--times > 0) {
      memo = func.apply(this, arguments);
    }

    if (times <= 1) func = null;
    return memo;
  };
}
},{}],"../node_modules/underscore/modules/once.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _partial = _interopRequireDefault(require("./partial.js"));

var _before = _interopRequireDefault(require("./before.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a function that will be executed at most one time, no matter how
// often you call it. Useful for lazy initialization.
var _default = (0, _partial.default)(_before.default, 2);

exports.default = _default;
},{"./partial.js":"../node_modules/underscore/modules/partial.js","./before.js":"../node_modules/underscore/modules/before.js"}],"../node_modules/underscore/modules/findKey.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findKey;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the first key on an object that passes a truth test.
function findKey(obj, predicate, context) {
  predicate = (0, _cb.default)(predicate, context);

  var _keys = (0, _keys2.default)(obj),
      key;

  for (var i = 0, length = _keys.length; i < length; i++) {
    key = _keys[i];
    if (predicate(obj[key], key, obj)) return key;
  }
}
},{"./_cb.js":"../node_modules/underscore/modules/_cb.js","./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/_createPredicateIndexFinder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPredicateIndexFinder;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal function to generate `_.findIndex` and `_.findLastIndex`.
function createPredicateIndexFinder(dir) {
  return function (array, predicate, context) {
    predicate = (0, _cb.default)(predicate, context);
    var length = (0, _getLength.default)(array);
    var index = dir > 0 ? 0 : length - 1;

    for (; index >= 0 && index < length; index += dir) {
      if (predicate(array[index], index, array)) return index;
    }

    return -1;
  };
}
},{"./_cb.js":"../node_modules/underscore/modules/_cb.js","./_getLength.js":"../node_modules/underscore/modules/_getLength.js"}],"../node_modules/underscore/modules/findIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createPredicateIndexFinder = _interopRequireDefault(require("./_createPredicateIndexFinder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the first index on an array-like that passes a truth test.
var _default = (0, _createPredicateIndexFinder.default)(1);

exports.default = _default;
},{"./_createPredicateIndexFinder.js":"../node_modules/underscore/modules/_createPredicateIndexFinder.js"}],"../node_modules/underscore/modules/findLastIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createPredicateIndexFinder = _interopRequireDefault(require("./_createPredicateIndexFinder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns the last index on an array-like that passes a truth test.
var _default = (0, _createPredicateIndexFinder.default)(-1);

exports.default = _default;
},{"./_createPredicateIndexFinder.js":"../node_modules/underscore/modules/_createPredicateIndexFinder.js"}],"../node_modules/underscore/modules/sortedIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortedIndex;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Use a comparator function to figure out the smallest index at which
// an object should be inserted so as to maintain order. Uses binary search.
function sortedIndex(array, obj, iteratee, context) {
  iteratee = (0, _cb.default)(iteratee, context, 1);
  var value = iteratee(obj);
  var low = 0,
      high = (0, _getLength.default)(array);

  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
  }

  return low;
}
},{"./_cb.js":"../node_modules/underscore/modules/_cb.js","./_getLength.js":"../node_modules/underscore/modules/_getLength.js"}],"../node_modules/underscore/modules/_createIndexFinder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createIndexFinder;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _setup = require("./_setup.js");

var _isNaN = _interopRequireDefault(require("./isNaN.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal function to generate the `_.indexOf` and `_.lastIndexOf` functions.
function createIndexFinder(dir, predicateFind, sortedIndex) {
  return function (array, item, idx) {
    var i = 0,
        length = (0, _getLength.default)(array);

    if (typeof idx == 'number') {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(idx + length, i);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      return array[idx] === item ? idx : -1;
    }

    if (item !== item) {
      idx = predicateFind(_setup.slice.call(array, i, length), _isNaN.default);
      return idx >= 0 ? idx + i : -1;
    }

    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }

    return -1;
  };
}
},{"./_getLength.js":"../node_modules/underscore/modules/_getLength.js","./_setup.js":"../node_modules/underscore/modules/_setup.js","./isNaN.js":"../node_modules/underscore/modules/isNaN.js"}],"../node_modules/underscore/modules/indexOf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sortedIndex = _interopRequireDefault(require("./sortedIndex.js"));

var _findIndex = _interopRequireDefault(require("./findIndex.js"));

var _createIndexFinder = _interopRequireDefault(require("./_createIndexFinder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the position of the first occurrence of an item in an array,
// or -1 if the item is not included in the array.
// If the array is large and already in sort order, pass `true`
// for **isSorted** to use binary search.
var _default = (0, _createIndexFinder.default)(1, _findIndex.default, _sortedIndex.default);

exports.default = _default;
},{"./sortedIndex.js":"../node_modules/underscore/modules/sortedIndex.js","./findIndex.js":"../node_modules/underscore/modules/findIndex.js","./_createIndexFinder.js":"../node_modules/underscore/modules/_createIndexFinder.js"}],"../node_modules/underscore/modules/lastIndexOf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _findLastIndex = _interopRequireDefault(require("./findLastIndex.js"));

var _createIndexFinder = _interopRequireDefault(require("./_createIndexFinder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the position of the last occurrence of an item in an array,
// or -1 if the item is not included in the array.
var _default = (0, _createIndexFinder.default)(-1, _findLastIndex.default);

exports.default = _default;
},{"./findLastIndex.js":"../node_modules/underscore/modules/findLastIndex.js","./_createIndexFinder.js":"../node_modules/underscore/modules/_createIndexFinder.js"}],"../node_modules/underscore/modules/find.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = find;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _findIndex = _interopRequireDefault(require("./findIndex.js"));

var _findKey = _interopRequireDefault(require("./findKey.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the first value which passes a truth test.
function find(obj, predicate, context) {
  var keyFinder = (0, _isArrayLike.default)(obj) ? _findIndex.default : _findKey.default;
  var key = keyFinder(obj, predicate, context);
  if (key !== void 0 && key !== -1) return obj[key];
}
},{"./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./findIndex.js":"../node_modules/underscore/modules/findIndex.js","./findKey.js":"../node_modules/underscore/modules/findKey.js"}],"../node_modules/underscore/modules/findWhere.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findWhere;

var _find = _interopRequireDefault(require("./find.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convenience version of a common use case of `_.find`: getting the first
// object containing specific `key:value` pairs.
function findWhere(obj, attrs) {
  return (0, _find.default)(obj, (0, _matcher.default)(attrs));
}
},{"./find.js":"../node_modules/underscore/modules/find.js","./matcher.js":"../node_modules/underscore/modules/matcher.js"}],"../node_modules/underscore/modules/each.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = each;

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The cornerstone for collection functions, an `each`
// implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.
function each(obj, iteratee, context) {
  iteratee = (0, _optimizeCb.default)(iteratee, context);
  var i, length;

  if ((0, _isArrayLike.default)(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var _keys = (0, _keys2.default)(obj);

    for (i = 0, length = _keys.length; i < length; i++) {
      iteratee(obj[_keys[i]], _keys[i], obj);
    }
  }

  return obj;
}
},{"./_optimizeCb.js":"../node_modules/underscore/modules/_optimizeCb.js","./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the results of applying the iteratee to each element.
function map(obj, iteratee, context) {
  iteratee = (0, _cb.default)(iteratee, context);

  var _keys = !(0, _isArrayLike.default)(obj) && (0, _keys2.default)(obj),
      length = (_keys || obj).length,
      results = Array(length);

  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    results[index] = iteratee(obj[currentKey], currentKey, obj);
  }

  return results;
}
},{"./_cb.js":"../node_modules/underscore/modules/_cb.js","./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/_createReduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createReduce;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Internal helper to create a reducing function, iterating left or right.
function createReduce(dir) {
  // Wrap code that reassigns argument variables in a separate function than
  // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
  var reducer = function (obj, iteratee, memo, initial) {
    var _keys = !(0, _isArrayLike.default)(obj) && (0, _keys2.default)(obj),
        length = (_keys || obj).length,
        index = dir > 0 ? 0 : length - 1;

    if (!initial) {
      memo = obj[_keys ? _keys[index] : index];
      index += dir;
    }

    for (; index >= 0 && index < length; index += dir) {
      var currentKey = _keys ? _keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }

    return memo;
  };

  return function (obj, iteratee, memo, context) {
    var initial = arguments.length >= 3;
    return reducer(obj, (0, _optimizeCb.default)(iteratee, context, 4), memo, initial);
  };
}
},{"./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./keys.js":"../node_modules/underscore/modules/keys.js","./_optimizeCb.js":"../node_modules/underscore/modules/_optimizeCb.js"}],"../node_modules/underscore/modules/reduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createReduce = _interopRequireDefault(require("./_createReduce.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **Reduce** builds up a single result from a list of values, aka `inject`,
// or `foldl`.
var _default = (0, _createReduce.default)(1);

exports.default = _default;
},{"./_createReduce.js":"../node_modules/underscore/modules/_createReduce.js"}],"../node_modules/underscore/modules/reduceRight.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createReduce = _interopRequireDefault(require("./_createReduce.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The right-associative version of reduce, also known as `foldr`.
var _default = (0, _createReduce.default)(-1);

exports.default = _default;
},{"./_createReduce.js":"../node_modules/underscore/modules/_createReduce.js"}],"../node_modules/underscore/modules/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _each = _interopRequireDefault(require("./each.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return all the elements that pass a truth test.
function filter(obj, predicate, context) {
  var results = [];
  predicate = (0, _cb.default)(predicate, context);
  (0, _each.default)(obj, function (value, index, list) {
    if (predicate(value, index, list)) results.push(value);
  });
  return results;
}
},{"./_cb.js":"../node_modules/underscore/modules/_cb.js","./each.js":"../node_modules/underscore/modules/each.js"}],"../node_modules/underscore/modules/reject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reject;

var _filter = _interopRequireDefault(require("./filter.js"));

var _negate = _interopRequireDefault(require("./negate.js"));

var _cb = _interopRequireDefault(require("./_cb.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return all the elements for which a truth test fails.
function reject(obj, predicate, context) {
  return (0, _filter.default)(obj, (0, _negate.default)((0, _cb.default)(predicate)), context);
}
},{"./filter.js":"../node_modules/underscore/modules/filter.js","./negate.js":"../node_modules/underscore/modules/negate.js","./_cb.js":"../node_modules/underscore/modules/_cb.js"}],"../node_modules/underscore/modules/every.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = every;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine whether all of the elements pass a truth test.
function every(obj, predicate, context) {
  predicate = (0, _cb.default)(predicate, context);

  var _keys = !(0, _isArrayLike.default)(obj) && (0, _keys2.default)(obj),
      length = (_keys || obj).length;

  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    if (!predicate(obj[currentKey], currentKey, obj)) return false;
  }

  return true;
}
},{"./_cb.js":"../node_modules/underscore/modules/_cb.js","./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/some.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = some;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys2 = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine if at least one element in the object passes a truth test.
function some(obj, predicate, context) {
  predicate = (0, _cb.default)(predicate, context);

  var _keys = !(0, _isArrayLike.default)(obj) && (0, _keys2.default)(obj),
      length = (_keys || obj).length;

  for (var index = 0; index < length; index++) {
    var currentKey = _keys ? _keys[index] : index;
    if (predicate(obj[currentKey], currentKey, obj)) return true;
  }

  return false;
}
},{"./_cb.js":"../node_modules/underscore/modules/_cb.js","./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/contains.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = contains;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _indexOf = _interopRequireDefault(require("./indexOf.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Determine if the array or object contains a given item (using `===`).
function contains(obj, item, fromIndex, guard) {
  if (!(0, _isArrayLike.default)(obj)) obj = (0, _values.default)(obj);
  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
  return (0, _indexOf.default)(obj, item, fromIndex) >= 0;
}
},{"./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./values.js":"../node_modules/underscore/modules/values.js","./indexOf.js":"../node_modules/underscore/modules/indexOf.js"}],"../node_modules/underscore/modules/invoke.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _map = _interopRequireDefault(require("./map.js"));

var _deepGet = _interopRequireDefault(require("./_deepGet.js"));

var _toPath = _interopRequireDefault(require("./_toPath.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Invoke a method (with arguments) on every item in a collection.
var _default = (0, _restArguments.default)(function (obj, path, args) {
  var contextPath, func;

  if ((0, _isFunction.default)(path)) {
    func = path;
  } else {
    path = (0, _toPath.default)(path);
    contextPath = path.slice(0, -1);
    path = path[path.length - 1];
  }

  return (0, _map.default)(obj, function (context) {
    var method = func;

    if (!method) {
      if (contextPath && contextPath.length) {
        context = (0, _deepGet.default)(context, contextPath);
      }

      if (context == null) return void 0;
      method = context[path];
    }

    return method == null ? method : method.apply(context, args);
  });
});

exports.default = _default;
},{"./restArguments.js":"../node_modules/underscore/modules/restArguments.js","./isFunction.js":"../node_modules/underscore/modules/isFunction.js","./map.js":"../node_modules/underscore/modules/map.js","./_deepGet.js":"../node_modules/underscore/modules/_deepGet.js","./_toPath.js":"../node_modules/underscore/modules/_toPath.js"}],"../node_modules/underscore/modules/pluck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pluck;

var _map = _interopRequireDefault(require("./map.js"));

var _property = _interopRequireDefault(require("./property.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convenience version of a common use case of `_.map`: fetching a property.
function pluck(obj, key) {
  return (0, _map.default)(obj, (0, _property.default)(key));
}
},{"./map.js":"../node_modules/underscore/modules/map.js","./property.js":"../node_modules/underscore/modules/property.js"}],"../node_modules/underscore/modules/where.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = where;

var _filter = _interopRequireDefault(require("./filter.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convenience version of a common use case of `_.filter`: selecting only
// objects containing specific `key:value` pairs.
function where(obj, attrs) {
  return (0, _filter.default)(obj, (0, _matcher.default)(attrs));
}
},{"./filter.js":"../node_modules/underscore/modules/filter.js","./matcher.js":"../node_modules/underscore/modules/matcher.js"}],"../node_modules/underscore/modules/max.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = max;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _cb = _interopRequireDefault(require("./_cb.js"));

var _each = _interopRequireDefault(require("./each.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the maximum element (or element-based computation).
function max(obj, iteratee, context) {
  var result = -Infinity,
      lastComputed = -Infinity,
      value,
      computed;

  if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
    obj = (0, _isArrayLike.default)(obj) ? obj : (0, _values.default)(obj);

    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];

      if (value != null && value > result) {
        result = value;
      }
    }
  } else {
    iteratee = (0, _cb.default)(iteratee, context);
    (0, _each.default)(obj, function (v, index, list) {
      computed = iteratee(v, index, list);

      if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }

  return result;
}
},{"./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./values.js":"../node_modules/underscore/modules/values.js","./_cb.js":"../node_modules/underscore/modules/_cb.js","./each.js":"../node_modules/underscore/modules/each.js"}],"../node_modules/underscore/modules/min.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = min;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _cb = _interopRequireDefault(require("./_cb.js"));

var _each = _interopRequireDefault(require("./each.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the minimum element (or element-based computation).
function min(obj, iteratee, context) {
  var result = Infinity,
      lastComputed = Infinity,
      value,
      computed;

  if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
    obj = (0, _isArrayLike.default)(obj) ? obj : (0, _values.default)(obj);

    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];

      if (value != null && value < result) {
        result = value;
      }
    }
  } else {
    iteratee = (0, _cb.default)(iteratee, context);
    (0, _each.default)(obj, function (v, index, list) {
      computed = iteratee(v, index, list);

      if (computed < lastComputed || computed === Infinity && result === Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }

  return result;
}
},{"./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./values.js":"../node_modules/underscore/modules/values.js","./_cb.js":"../node_modules/underscore/modules/_cb.js","./each.js":"../node_modules/underscore/modules/each.js"}],"../node_modules/underscore/modules/sample.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sample;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _clone = _interopRequireDefault(require("./clone.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _random = _interopRequireDefault(require("./random.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Sample **n** random values from a collection using the modern version of the
// [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
// If **n** is not specified, returns a single random element.
// The internal `guard` argument allows it to work with `_.map`.
function sample(obj, n, guard) {
  if (n == null || guard) {
    if (!(0, _isArrayLike.default)(obj)) obj = (0, _values.default)(obj);
    return obj[(0, _random.default)(obj.length - 1)];
  }

  var sample = (0, _isArrayLike.default)(obj) ? (0, _clone.default)(obj) : (0, _values.default)(obj);
  var length = (0, _getLength.default)(sample);
  n = Math.max(Math.min(n, length), 0);
  var last = length - 1;

  for (var index = 0; index < n; index++) {
    var rand = (0, _random.default)(index, last);
    var temp = sample[index];
    sample[index] = sample[rand];
    sample[rand] = temp;
  }

  return sample.slice(0, n);
}
},{"./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./clone.js":"../node_modules/underscore/modules/clone.js","./values.js":"../node_modules/underscore/modules/values.js","./_getLength.js":"../node_modules/underscore/modules/_getLength.js","./random.js":"../node_modules/underscore/modules/random.js"}],"../node_modules/underscore/modules/shuffle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shuffle;

var _sample = _interopRequireDefault(require("./sample.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Shuffle a collection.
function shuffle(obj) {
  return (0, _sample.default)(obj, Infinity);
}
},{"./sample.js":"../node_modules/underscore/modules/sample.js"}],"../node_modules/underscore/modules/sortBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sortBy;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _pluck = _interopRequireDefault(require("./pluck.js"));

var _map = _interopRequireDefault(require("./map.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Sort the object's values by a criterion produced by an iteratee.
function sortBy(obj, iteratee, context) {
  var index = 0;
  iteratee = (0, _cb.default)(iteratee, context);
  return (0, _pluck.default)((0, _map.default)(obj, function (value, key, list) {
    return {
      value: value,
      index: index++,
      criteria: iteratee(value, key, list)
    };
  }).sort(function (left, right) {
    var a = left.criteria;
    var b = right.criteria;

    if (a !== b) {
      if (a > b || a === void 0) return 1;
      if (a < b || b === void 0) return -1;
    }

    return left.index - right.index;
  }), 'value');
}
},{"./_cb.js":"../node_modules/underscore/modules/_cb.js","./pluck.js":"../node_modules/underscore/modules/pluck.js","./map.js":"../node_modules/underscore/modules/map.js"}],"../node_modules/underscore/modules/_group.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = group;

var _cb = _interopRequireDefault(require("./_cb.js"));

var _each = _interopRequireDefault(require("./each.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// An internal function used for aggregate "group by" operations.
function group(behavior, partition) {
  return function (obj, iteratee, context) {
    var result = partition ? [[], []] : {};
    iteratee = (0, _cb.default)(iteratee, context);
    (0, _each.default)(obj, function (value, index) {
      var key = iteratee(value, index, obj);
      behavior(result, value, key);
    });
    return result;
  };
}
},{"./_cb.js":"../node_modules/underscore/modules/_cb.js","./each.js":"../node_modules/underscore/modules/each.js"}],"../node_modules/underscore/modules/groupBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = _interopRequireDefault(require("./_group.js"));

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Groups the object's values by a criterion. Pass either a string attribute
// to group by, or a function that returns the criterion.
var _default = (0, _group.default)(function (result, value, key) {
  if ((0, _has.default)(result, key)) result[key].push(value);else result[key] = [value];
});

exports.default = _default;
},{"./_group.js":"../node_modules/underscore/modules/_group.js","./_has.js":"../node_modules/underscore/modules/_has.js"}],"../node_modules/underscore/modules/indexBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = _interopRequireDefault(require("./_group.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Indexes the object's values by a criterion, similar to `_.groupBy`, but for
// when you know that your index values will be unique.
var _default = (0, _group.default)(function (result, value, key) {
  result[key] = value;
});

exports.default = _default;
},{"./_group.js":"../node_modules/underscore/modules/_group.js"}],"../node_modules/underscore/modules/countBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = _interopRequireDefault(require("./_group.js"));

var _has = _interopRequireDefault(require("./_has.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Counts instances of an object that group by a certain criterion. Pass
// either a string attribute to count by, or a function that returns the
// criterion.
var _default = (0, _group.default)(function (result, value, key) {
  if ((0, _has.default)(result, key)) result[key]++;else result[key] = 1;
});

exports.default = _default;
},{"./_group.js":"../node_modules/underscore/modules/_group.js","./_has.js":"../node_modules/underscore/modules/_has.js"}],"../node_modules/underscore/modules/partition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _group = _interopRequireDefault(require("./_group.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Split a collection into two arrays: one whose elements all pass the given
// truth test, and one whose elements all do not pass the truth test.
var _default = (0, _group.default)(function (result, value, pass) {
  result[pass ? 0 : 1].push(value);
}, true);

exports.default = _default;
},{"./_group.js":"../node_modules/underscore/modules/_group.js"}],"../node_modules/underscore/modules/toArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toArray;

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _setup = require("./_setup.js");

var _isString = _interopRequireDefault(require("./isString.js"));

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _map = _interopRequireDefault(require("./map.js"));

var _identity = _interopRequireDefault(require("./identity.js"));

var _values = _interopRequireDefault(require("./values.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Safely create a real, live array from anything iterable.
var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;

function toArray(obj) {
  if (!obj) return [];
  if ((0, _isArray.default)(obj)) return _setup.slice.call(obj);

  if ((0, _isString.default)(obj)) {
    // Keep surrogate pair characters together.
    return obj.match(reStrSymbol);
  }

  if ((0, _isArrayLike.default)(obj)) return (0, _map.default)(obj, _identity.default);
  return (0, _values.default)(obj);
}
},{"./isArray.js":"../node_modules/underscore/modules/isArray.js","./_setup.js":"../node_modules/underscore/modules/_setup.js","./isString.js":"../node_modules/underscore/modules/isString.js","./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./map.js":"../node_modules/underscore/modules/map.js","./identity.js":"../node_modules/underscore/modules/identity.js","./values.js":"../node_modules/underscore/modules/values.js"}],"../node_modules/underscore/modules/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = size;

var _isArrayLike = _interopRequireDefault(require("./_isArrayLike.js"));

var _keys = _interopRequireDefault(require("./keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the number of elements in a collection.
function size(obj) {
  if (obj == null) return 0;
  return (0, _isArrayLike.default)(obj) ? obj.length : (0, _keys.default)(obj).length;
}
},{"./_isArrayLike.js":"../node_modules/underscore/modules/_isArrayLike.js","./keys.js":"../node_modules/underscore/modules/keys.js"}],"../node_modules/underscore/modules/_keyInObj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keyInObj;

// Internal `_.pick` helper function to determine whether `key` is an enumerable
// property name of `obj`.
function keyInObj(value, key, obj) {
  return key in obj;
}
},{}],"../node_modules/underscore/modules/pick.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _optimizeCb = _interopRequireDefault(require("./_optimizeCb.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

var _keyInObj = _interopRequireDefault(require("./_keyInObj.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a copy of the object only containing the allowed properties.
var _default = (0, _restArguments.default)(function (obj, keys) {
  var result = {},
      iteratee = keys[0];
  if (obj == null) return result;

  if ((0, _isFunction.default)(iteratee)) {
    if (keys.length > 1) iteratee = (0, _optimizeCb.default)(iteratee, keys[1]);
    keys = (0, _allKeys.default)(obj);
  } else {
    iteratee = _keyInObj.default;
    keys = (0, _flatten.default)(keys, false, false);
    obj = Object(obj);
  }

  for (var i = 0, length = keys.length; i < length; i++) {
    var key = keys[i];
    var value = obj[key];
    if (iteratee(value, key, obj)) result[key] = value;
  }

  return result;
});

exports.default = _default;
},{"./restArguments.js":"../node_modules/underscore/modules/restArguments.js","./isFunction.js":"../node_modules/underscore/modules/isFunction.js","./_optimizeCb.js":"../node_modules/underscore/modules/_optimizeCb.js","./allKeys.js":"../node_modules/underscore/modules/allKeys.js","./_keyInObj.js":"../node_modules/underscore/modules/_keyInObj.js","./_flatten.js":"../node_modules/underscore/modules/_flatten.js"}],"../node_modules/underscore/modules/omit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _negate = _interopRequireDefault(require("./negate.js"));

var _map = _interopRequireDefault(require("./map.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

var _pick = _interopRequireDefault(require("./pick.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a copy of the object without the disallowed properties.
var _default = (0, _restArguments.default)(function (obj, keys) {
  var iteratee = keys[0],
      context;

  if ((0, _isFunction.default)(iteratee)) {
    iteratee = (0, _negate.default)(iteratee);
    if (keys.length > 1) context = keys[1];
  } else {
    keys = (0, _map.default)((0, _flatten.default)(keys, false, false), String);

    iteratee = function (value, key) {
      return !(0, _contains.default)(keys, key);
    };
  }

  return (0, _pick.default)(obj, iteratee, context);
});

exports.default = _default;
},{"./restArguments.js":"../node_modules/underscore/modules/restArguments.js","./isFunction.js":"../node_modules/underscore/modules/isFunction.js","./negate.js":"../node_modules/underscore/modules/negate.js","./map.js":"../node_modules/underscore/modules/map.js","./_flatten.js":"../node_modules/underscore/modules/_flatten.js","./contains.js":"../node_modules/underscore/modules/contains.js","./pick.js":"../node_modules/underscore/modules/pick.js"}],"../node_modules/underscore/modules/initial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initial;

var _setup = require("./_setup.js");

// Returns everything but the last entry of the array. Especially useful on
// the arguments object. Passing **n** will return all the values in
// the array, excluding the last N.
function initial(array, n, guard) {
  return _setup.slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
}
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js"}],"../node_modules/underscore/modules/first.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = first;

var _initial = _interopRequireDefault(require("./initial.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get the first element of an array. Passing **n** will return the first N
// values in the array. The **guard** check allows it to work with `_.map`.
function first(array, n, guard) {
  if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
  if (n == null || guard) return array[0];
  return (0, _initial.default)(array, array.length - n);
}
},{"./initial.js":"../node_modules/underscore/modules/initial.js"}],"../node_modules/underscore/modules/rest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rest;

var _setup = require("./_setup.js");

// Returns everything but the first entry of the `array`. Especially useful on
// the `arguments` object. Passing an **n** will return the rest N values in the
// `array`.
function rest(array, n, guard) {
  return _setup.slice.call(array, n == null || guard ? 1 : n);
}
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js"}],"../node_modules/underscore/modules/last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = last;

var _rest = _interopRequireDefault(require("./rest.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get the last element of an array. Passing **n** will return the last N
// values in the array.
function last(array, n, guard) {
  if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
  if (n == null || guard) return array[array.length - 1];
  return (0, _rest.default)(array, Math.max(0, array.length - n));
}
},{"./rest.js":"../node_modules/underscore/modules/rest.js"}],"../node_modules/underscore/modules/compact.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compact;

var _filter = _interopRequireDefault(require("./filter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Trim out all falsy values from an array.
function compact(array) {
  return (0, _filter.default)(array, Boolean);
}
},{"./filter.js":"../node_modules/underscore/modules/filter.js"}],"../node_modules/underscore/modules/flatten.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatten;

var _flatten2 = _interopRequireDefault(require("./_flatten.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Flatten out an array, either recursively (by default), or up to `depth`.
// Passing `true` or `false` as `depth` means `1` or `Infinity`, respectively.
function flatten(array, depth) {
  return (0, _flatten2.default)(array, depth, false);
}
},{"./_flatten.js":"../node_modules/underscore/modules/_flatten.js"}],"../node_modules/underscore/modules/difference.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

var _filter = _interopRequireDefault(require("./filter.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
var _default = (0, _restArguments.default)(function (array, rest) {
  rest = (0, _flatten.default)(rest, true, true);
  return (0, _filter.default)(array, function (value) {
    return !(0, _contains.default)(rest, value);
  });
});

exports.default = _default;
},{"./restArguments.js":"../node_modules/underscore/modules/restArguments.js","./_flatten.js":"../node_modules/underscore/modules/_flatten.js","./filter.js":"../node_modules/underscore/modules/filter.js","./contains.js":"../node_modules/underscore/modules/contains.js"}],"../node_modules/underscore/modules/without.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _difference = _interopRequireDefault(require("./difference.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return a version of the array that does not contain the specified value(s).
var _default = (0, _restArguments.default)(function (array, otherArrays) {
  return (0, _difference.default)(array, otherArrays);
});

exports.default = _default;
},{"./restArguments.js":"../node_modules/underscore/modules/restArguments.js","./difference.js":"../node_modules/underscore/modules/difference.js"}],"../node_modules/underscore/modules/uniq.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniq;

var _isBoolean = _interopRequireDefault(require("./isBoolean.js"));

var _cb = _interopRequireDefault(require("./_cb.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
// The faster algorithm will not work with an iteratee if the iteratee
// is not a one-to-one function, so providing an iteratee will disable
// the faster algorithm.
function uniq(array, isSorted, iteratee, context) {
  if (!(0, _isBoolean.default)(isSorted)) {
    context = iteratee;
    iteratee = isSorted;
    isSorted = false;
  }

  if (iteratee != null) iteratee = (0, _cb.default)(iteratee, context);
  var result = [];
  var seen = [];

  for (var i = 0, length = (0, _getLength.default)(array); i < length; i++) {
    var value = array[i],
        computed = iteratee ? iteratee(value, i, array) : value;

    if (isSorted && !iteratee) {
      if (!i || seen !== computed) result.push(value);
      seen = computed;
    } else if (iteratee) {
      if (!(0, _contains.default)(seen, computed)) {
        seen.push(computed);
        result.push(value);
      }
    } else if (!(0, _contains.default)(result, value)) {
      result.push(value);
    }
  }

  return result;
}
},{"./isBoolean.js":"../node_modules/underscore/modules/isBoolean.js","./_cb.js":"../node_modules/underscore/modules/_cb.js","./_getLength.js":"../node_modules/underscore/modules/_getLength.js","./contains.js":"../node_modules/underscore/modules/contains.js"}],"../node_modules/underscore/modules/union.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _uniq = _interopRequireDefault(require("./uniq.js"));

var _flatten = _interopRequireDefault(require("./_flatten.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Produce an array that contains the union: each distinct element from all of
// the passed-in arrays.
var _default = (0, _restArguments.default)(function (arrays) {
  return (0, _uniq.default)((0, _flatten.default)(arrays, true, true));
});

exports.default = _default;
},{"./restArguments.js":"../node_modules/underscore/modules/restArguments.js","./uniq.js":"../node_modules/underscore/modules/uniq.js","./_flatten.js":"../node_modules/underscore/modules/_flatten.js"}],"../node_modules/underscore/modules/intersection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = intersection;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Produce an array that contains every item shared between all the
// passed-in arrays.
function intersection(array) {
  var result = [];
  var argsLength = arguments.length;

  for (var i = 0, length = (0, _getLength.default)(array); i < length; i++) {
    var item = array[i];
    if ((0, _contains.default)(result, item)) continue;
    var j;

    for (j = 1; j < argsLength; j++) {
      if (!(0, _contains.default)(arguments[j], item)) break;
    }

    if (j === argsLength) result.push(item);
  }

  return result;
}
},{"./_getLength.js":"../node_modules/underscore/modules/_getLength.js","./contains.js":"../node_modules/underscore/modules/contains.js"}],"../node_modules/underscore/modules/unzip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unzip;

var _max = _interopRequireDefault(require("./max.js"));

var _getLength = _interopRequireDefault(require("./_getLength.js"));

var _pluck = _interopRequireDefault(require("./pluck.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Complement of zip. Unzip accepts an array of arrays and groups
// each array's elements on shared indices.
function unzip(array) {
  var length = array && (0, _max.default)(array, _getLength.default).length || 0;
  var result = Array(length);

  for (var index = 0; index < length; index++) {
    result[index] = (0, _pluck.default)(array, index);
  }

  return result;
}
},{"./max.js":"../node_modules/underscore/modules/max.js","./_getLength.js":"../node_modules/underscore/modules/_getLength.js","./pluck.js":"../node_modules/underscore/modules/pluck.js"}],"../node_modules/underscore/modules/zip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _unzip = _interopRequireDefault(require("./unzip.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Zip together multiple lists into a single array -- elements that share
// an index go together.
var _default = (0, _restArguments.default)(_unzip.default);

exports.default = _default;
},{"./restArguments.js":"../node_modules/underscore/modules/restArguments.js","./unzip.js":"../node_modules/underscore/modules/unzip.js"}],"../node_modules/underscore/modules/object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = object;

var _getLength = _interopRequireDefault(require("./_getLength.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Converts lists into objects. Pass either a single array of `[key, value]`
// pairs, or two parallel arrays of the same length -- one of keys, and one of
// the corresponding values. Passing by pairs is the reverse of `_.pairs`.
function object(list, values) {
  var result = {};

  for (var i = 0, length = (0, _getLength.default)(list); i < length; i++) {
    if (values) {
      result[list[i]] = values[i];
    } else {
      result[list[i][0]] = list[i][1];
    }
  }

  return result;
}
},{"./_getLength.js":"../node_modules/underscore/modules/_getLength.js"}],"../node_modules/underscore/modules/range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = range;

// Generate an integer Array containing an arithmetic progression. A port of
// the native Python `range()` function. See
// [the Python documentation](https://docs.python.org/library/functions.html#range).
function range(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }

  if (!step) {
    step = stop < start ? -1 : 1;
  }

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
}
},{}],"../node_modules/underscore/modules/chunk.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chunk;

var _setup = require("./_setup.js");

// Chunk a single array into multiple arrays, each containing `count` or fewer
// items.
function chunk(array, count) {
  if (count == null || count < 1) return [];
  var result = [];
  var i = 0,
      length = array.length;

  while (i < length) {
    result.push(_setup.slice.call(array, i, i += count));
  }

  return result;
}
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js"}],"../node_modules/underscore/modules/_chainResult.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chainResult;

var _underscore = _interopRequireDefault(require("./underscore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Helper function to continue chaining intermediate results.
function chainResult(instance, obj) {
  return instance._chain ? (0, _underscore.default)(obj).chain() : obj;
}
},{"./underscore.js":"../node_modules/underscore/modules/underscore.js"}],"../node_modules/underscore/modules/mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mixin;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _each = _interopRequireDefault(require("./each.js"));

var _functions = _interopRequireDefault(require("./functions.js"));

var _setup = require("./_setup.js");

var _chainResult = _interopRequireDefault(require("./_chainResult.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add your own custom functions to the Underscore object.
function mixin(obj) {
  (0, _each.default)((0, _functions.default)(obj), function (name) {
    var func = _underscore.default[name] = obj[name];

    _underscore.default.prototype[name] = function () {
      var args = [this._wrapped];

      _setup.push.apply(args, arguments);

      return (0, _chainResult.default)(this, func.apply(_underscore.default, args));
    };
  });
  return _underscore.default;
}
},{"./underscore.js":"../node_modules/underscore/modules/underscore.js","./each.js":"../node_modules/underscore/modules/each.js","./functions.js":"../node_modules/underscore/modules/functions.js","./_setup.js":"../node_modules/underscore/modules/_setup.js","./_chainResult.js":"../node_modules/underscore/modules/_chainResult.js"}],"../node_modules/underscore/modules/underscore-array-methods.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _underscore = _interopRequireDefault(require("./underscore.js"));

var _each = _interopRequireDefault(require("./each.js"));

var _setup = require("./_setup.js");

var _chainResult = _interopRequireDefault(require("./_chainResult.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add all mutator `Array` functions to the wrapper.
(0, _each.default)(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
  var method = _setup.ArrayProto[name];

  _underscore.default.prototype[name] = function () {
    var obj = this._wrapped;

    if (obj != null) {
      method.apply(obj, arguments);

      if ((name === 'shift' || name === 'splice') && obj.length === 0) {
        delete obj[0];
      }
    }

    return (0, _chainResult.default)(this, obj);
  };
}); // Add all accessor `Array` functions to the wrapper.

(0, _each.default)(['concat', 'join', 'slice'], function (name) {
  var method = _setup.ArrayProto[name];

  _underscore.default.prototype[name] = function () {
    var obj = this._wrapped;
    if (obj != null) obj = method.apply(obj, arguments);
    return (0, _chainResult.default)(this, obj);
  };
});
var _default = _underscore.default;
exports.default = _default;
},{"./underscore.js":"../node_modules/underscore/modules/underscore.js","./each.js":"../node_modules/underscore/modules/each.js","./_setup.js":"../node_modules/underscore/modules/_setup.js","./_chainResult.js":"../node_modules/underscore/modules/_chainResult.js"}],"../node_modules/underscore/modules/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "VERSION", {
  enumerable: true,
  get: function () {
    return _setup.VERSION;
  }
});
Object.defineProperty(exports, "restArguments", {
  enumerable: true,
  get: function () {
    return _restArguments.default;
  }
});
Object.defineProperty(exports, "isObject", {
  enumerable: true,
  get: function () {
    return _isObject.default;
  }
});
Object.defineProperty(exports, "isNull", {
  enumerable: true,
  get: function () {
    return _isNull.default;
  }
});
Object.defineProperty(exports, "isUndefined", {
  enumerable: true,
  get: function () {
    return _isUndefined.default;
  }
});
Object.defineProperty(exports, "isBoolean", {
  enumerable: true,
  get: function () {
    return _isBoolean.default;
  }
});
Object.defineProperty(exports, "isElement", {
  enumerable: true,
  get: function () {
    return _isElement.default;
  }
});
Object.defineProperty(exports, "isString", {
  enumerable: true,
  get: function () {
    return _isString.default;
  }
});
Object.defineProperty(exports, "isNumber", {
  enumerable: true,
  get: function () {
    return _isNumber.default;
  }
});
Object.defineProperty(exports, "isDate", {
  enumerable: true,
  get: function () {
    return _isDate.default;
  }
});
Object.defineProperty(exports, "isRegExp", {
  enumerable: true,
  get: function () {
    return _isRegExp.default;
  }
});
Object.defineProperty(exports, "isError", {
  enumerable: true,
  get: function () {
    return _isError.default;
  }
});
Object.defineProperty(exports, "isSymbol", {
  enumerable: true,
  get: function () {
    return _isSymbol.default;
  }
});
Object.defineProperty(exports, "isArrayBuffer", {
  enumerable: true,
  get: function () {
    return _isArrayBuffer.default;
  }
});
Object.defineProperty(exports, "isDataView", {
  enumerable: true,
  get: function () {
    return _isDataView.default;
  }
});
Object.defineProperty(exports, "isArray", {
  enumerable: true,
  get: function () {
    return _isArray.default;
  }
});
Object.defineProperty(exports, "isFunction", {
  enumerable: true,
  get: function () {
    return _isFunction.default;
  }
});
Object.defineProperty(exports, "isArguments", {
  enumerable: true,
  get: function () {
    return _isArguments.default;
  }
});
Object.defineProperty(exports, "isFinite", {
  enumerable: true,
  get: function () {
    return _isFinite.default;
  }
});
Object.defineProperty(exports, "isNaN", {
  enumerable: true,
  get: function () {
    return _isNaN.default;
  }
});
Object.defineProperty(exports, "isTypedArray", {
  enumerable: true,
  get: function () {
    return _isTypedArray.default;
  }
});
Object.defineProperty(exports, "isEmpty", {
  enumerable: true,
  get: function () {
    return _isEmpty.default;
  }
});
Object.defineProperty(exports, "isMatch", {
  enumerable: true,
  get: function () {
    return _isMatch.default;
  }
});
Object.defineProperty(exports, "isEqual", {
  enumerable: true,
  get: function () {
    return _isEqual.default;
  }
});
Object.defineProperty(exports, "isMap", {
  enumerable: true,
  get: function () {
    return _isMap.default;
  }
});
Object.defineProperty(exports, "isWeakMap", {
  enumerable: true,
  get: function () {
    return _isWeakMap.default;
  }
});
Object.defineProperty(exports, "isSet", {
  enumerable: true,
  get: function () {
    return _isSet.default;
  }
});
Object.defineProperty(exports, "isWeakSet", {
  enumerable: true,
  get: function () {
    return _isWeakSet.default;
  }
});
Object.defineProperty(exports, "keys", {
  enumerable: true,
  get: function () {
    return _keys.default;
  }
});
Object.defineProperty(exports, "allKeys", {
  enumerable: true,
  get: function () {
    return _allKeys.default;
  }
});
Object.defineProperty(exports, "values", {
  enumerable: true,
  get: function () {
    return _values.default;
  }
});
Object.defineProperty(exports, "pairs", {
  enumerable: true,
  get: function () {
    return _pairs.default;
  }
});
Object.defineProperty(exports, "invert", {
  enumerable: true,
  get: function () {
    return _invert.default;
  }
});
Object.defineProperty(exports, "functions", {
  enumerable: true,
  get: function () {
    return _functions.default;
  }
});
Object.defineProperty(exports, "methods", {
  enumerable: true,
  get: function () {
    return _functions.default;
  }
});
Object.defineProperty(exports, "extend", {
  enumerable: true,
  get: function () {
    return _extend.default;
  }
});
Object.defineProperty(exports, "extendOwn", {
  enumerable: true,
  get: function () {
    return _extendOwn.default;
  }
});
Object.defineProperty(exports, "assign", {
  enumerable: true,
  get: function () {
    return _extendOwn.default;
  }
});
Object.defineProperty(exports, "defaults", {
  enumerable: true,
  get: function () {
    return _defaults.default;
  }
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function () {
    return _create.default;
  }
});
Object.defineProperty(exports, "clone", {
  enumerable: true,
  get: function () {
    return _clone.default;
  }
});
Object.defineProperty(exports, "tap", {
  enumerable: true,
  get: function () {
    return _tap.default;
  }
});
Object.defineProperty(exports, "get", {
  enumerable: true,
  get: function () {
    return _get.default;
  }
});
Object.defineProperty(exports, "has", {
  enumerable: true,
  get: function () {
    return _has.default;
  }
});
Object.defineProperty(exports, "mapObject", {
  enumerable: true,
  get: function () {
    return _mapObject.default;
  }
});
Object.defineProperty(exports, "identity", {
  enumerable: true,
  get: function () {
    return _identity.default;
  }
});
Object.defineProperty(exports, "constant", {
  enumerable: true,
  get: function () {
    return _constant.default;
  }
});
Object.defineProperty(exports, "noop", {
  enumerable: true,
  get: function () {
    return _noop.default;
  }
});
Object.defineProperty(exports, "toPath", {
  enumerable: true,
  get: function () {
    return _toPath.default;
  }
});
Object.defineProperty(exports, "property", {
  enumerable: true,
  get: function () {
    return _property.default;
  }
});
Object.defineProperty(exports, "propertyOf", {
  enumerable: true,
  get: function () {
    return _propertyOf.default;
  }
});
Object.defineProperty(exports, "matcher", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "matches", {
  enumerable: true,
  get: function () {
    return _matcher.default;
  }
});
Object.defineProperty(exports, "times", {
  enumerable: true,
  get: function () {
    return _times.default;
  }
});
Object.defineProperty(exports, "random", {
  enumerable: true,
  get: function () {
    return _random.default;
  }
});
Object.defineProperty(exports, "now", {
  enumerable: true,
  get: function () {
    return _now.default;
  }
});
Object.defineProperty(exports, "escape", {
  enumerable: true,
  get: function () {
    return _escape.default;
  }
});
Object.defineProperty(exports, "unescape", {
  enumerable: true,
  get: function () {
    return _unescape.default;
  }
});
Object.defineProperty(exports, "templateSettings", {
  enumerable: true,
  get: function () {
    return _templateSettings.default;
  }
});
Object.defineProperty(exports, "template", {
  enumerable: true,
  get: function () {
    return _template.default;
  }
});
Object.defineProperty(exports, "result", {
  enumerable: true,
  get: function () {
    return _result.default;
  }
});
Object.defineProperty(exports, "uniqueId", {
  enumerable: true,
  get: function () {
    return _uniqueId.default;
  }
});
Object.defineProperty(exports, "chain", {
  enumerable: true,
  get: function () {
    return _chain.default;
  }
});
Object.defineProperty(exports, "iteratee", {
  enumerable: true,
  get: function () {
    return _iteratee.default;
  }
});
Object.defineProperty(exports, "partial", {
  enumerable: true,
  get: function () {
    return _partial.default;
  }
});
Object.defineProperty(exports, "bind", {
  enumerable: true,
  get: function () {
    return _bind.default;
  }
});
Object.defineProperty(exports, "bindAll", {
  enumerable: true,
  get: function () {
    return _bindAll.default;
  }
});
Object.defineProperty(exports, "memoize", {
  enumerable: true,
  get: function () {
    return _memoize.default;
  }
});
Object.defineProperty(exports, "delay", {
  enumerable: true,
  get: function () {
    return _delay.default;
  }
});
Object.defineProperty(exports, "defer", {
  enumerable: true,
  get: function () {
    return _defer.default;
  }
});
Object.defineProperty(exports, "throttle", {
  enumerable: true,
  get: function () {
    return _throttle.default;
  }
});
Object.defineProperty(exports, "debounce", {
  enumerable: true,
  get: function () {
    return _debounce.default;
  }
});
Object.defineProperty(exports, "wrap", {
  enumerable: true,
  get: function () {
    return _wrap.default;
  }
});
Object.defineProperty(exports, "negate", {
  enumerable: true,
  get: function () {
    return _negate.default;
  }
});
Object.defineProperty(exports, "compose", {
  enumerable: true,
  get: function () {
    return _compose.default;
  }
});
Object.defineProperty(exports, "after", {
  enumerable: true,
  get: function () {
    return _after.default;
  }
});
Object.defineProperty(exports, "before", {
  enumerable: true,
  get: function () {
    return _before.default;
  }
});
Object.defineProperty(exports, "once", {
  enumerable: true,
  get: function () {
    return _once.default;
  }
});
Object.defineProperty(exports, "findKey", {
  enumerable: true,
  get: function () {
    return _findKey.default;
  }
});
Object.defineProperty(exports, "findIndex", {
  enumerable: true,
  get: function () {
    return _findIndex.default;
  }
});
Object.defineProperty(exports, "findLastIndex", {
  enumerable: true,
  get: function () {
    return _findLastIndex.default;
  }
});
Object.defineProperty(exports, "sortedIndex", {
  enumerable: true,
  get: function () {
    return _sortedIndex.default;
  }
});
Object.defineProperty(exports, "indexOf", {
  enumerable: true,
  get: function () {
    return _indexOf.default;
  }
});
Object.defineProperty(exports, "lastIndexOf", {
  enumerable: true,
  get: function () {
    return _lastIndexOf.default;
  }
});
Object.defineProperty(exports, "find", {
  enumerable: true,
  get: function () {
    return _find.default;
  }
});
Object.defineProperty(exports, "detect", {
  enumerable: true,
  get: function () {
    return _find.default;
  }
});
Object.defineProperty(exports, "findWhere", {
  enumerable: true,
  get: function () {
    return _findWhere.default;
  }
});
Object.defineProperty(exports, "each", {
  enumerable: true,
  get: function () {
    return _each.default;
  }
});
Object.defineProperty(exports, "forEach", {
  enumerable: true,
  get: function () {
    return _each.default;
  }
});
Object.defineProperty(exports, "map", {
  enumerable: true,
  get: function () {
    return _map.default;
  }
});
Object.defineProperty(exports, "collect", {
  enumerable: true,
  get: function () {
    return _map.default;
  }
});
Object.defineProperty(exports, "reduce", {
  enumerable: true,
  get: function () {
    return _reduce.default;
  }
});
Object.defineProperty(exports, "foldl", {
  enumerable: true,
  get: function () {
    return _reduce.default;
  }
});
Object.defineProperty(exports, "inject", {
  enumerable: true,
  get: function () {
    return _reduce.default;
  }
});
Object.defineProperty(exports, "reduceRight", {
  enumerable: true,
  get: function () {
    return _reduceRight.default;
  }
});
Object.defineProperty(exports, "foldr", {
  enumerable: true,
  get: function () {
    return _reduceRight.default;
  }
});
Object.defineProperty(exports, "filter", {
  enumerable: true,
  get: function () {
    return _filter.default;
  }
});
Object.defineProperty(exports, "select", {
  enumerable: true,
  get: function () {
    return _filter.default;
  }
});
Object.defineProperty(exports, "reject", {
  enumerable: true,
  get: function () {
    return _reject.default;
  }
});
Object.defineProperty(exports, "every", {
  enumerable: true,
  get: function () {
    return _every.default;
  }
});
Object.defineProperty(exports, "all", {
  enumerable: true,
  get: function () {
    return _every.default;
  }
});
Object.defineProperty(exports, "some", {
  enumerable: true,
  get: function () {
    return _some.default;
  }
});
Object.defineProperty(exports, "any", {
  enumerable: true,
  get: function () {
    return _some.default;
  }
});
Object.defineProperty(exports, "contains", {
  enumerable: true,
  get: function () {
    return _contains.default;
  }
});
Object.defineProperty(exports, "includes", {
  enumerable: true,
  get: function () {
    return _contains.default;
  }
});
Object.defineProperty(exports, "include", {
  enumerable: true,
  get: function () {
    return _contains.default;
  }
});
Object.defineProperty(exports, "invoke", {
  enumerable: true,
  get: function () {
    return _invoke.default;
  }
});
Object.defineProperty(exports, "pluck", {
  enumerable: true,
  get: function () {
    return _pluck.default;
  }
});
Object.defineProperty(exports, "where", {
  enumerable: true,
  get: function () {
    return _where.default;
  }
});
Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function () {
    return _max.default;
  }
});
Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function () {
    return _min.default;
  }
});
Object.defineProperty(exports, "shuffle", {
  enumerable: true,
  get: function () {
    return _shuffle.default;
  }
});
Object.defineProperty(exports, "sample", {
  enumerable: true,
  get: function () {
    return _sample.default;
  }
});
Object.defineProperty(exports, "sortBy", {
  enumerable: true,
  get: function () {
    return _sortBy.default;
  }
});
Object.defineProperty(exports, "groupBy", {
  enumerable: true,
  get: function () {
    return _groupBy.default;
  }
});
Object.defineProperty(exports, "indexBy", {
  enumerable: true,
  get: function () {
    return _indexBy.default;
  }
});
Object.defineProperty(exports, "countBy", {
  enumerable: true,
  get: function () {
    return _countBy.default;
  }
});
Object.defineProperty(exports, "partition", {
  enumerable: true,
  get: function () {
    return _partition.default;
  }
});
Object.defineProperty(exports, "toArray", {
  enumerable: true,
  get: function () {
    return _toArray.default;
  }
});
Object.defineProperty(exports, "size", {
  enumerable: true,
  get: function () {
    return _size.default;
  }
});
Object.defineProperty(exports, "pick", {
  enumerable: true,
  get: function () {
    return _pick.default;
  }
});
Object.defineProperty(exports, "omit", {
  enumerable: true,
  get: function () {
    return _omit.default;
  }
});
Object.defineProperty(exports, "first", {
  enumerable: true,
  get: function () {
    return _first.default;
  }
});
Object.defineProperty(exports, "head", {
  enumerable: true,
  get: function () {
    return _first.default;
  }
});
Object.defineProperty(exports, "take", {
  enumerable: true,
  get: function () {
    return _first.default;
  }
});
Object.defineProperty(exports, "initial", {
  enumerable: true,
  get: function () {
    return _initial.default;
  }
});
Object.defineProperty(exports, "last", {
  enumerable: true,
  get: function () {
    return _last.default;
  }
});
Object.defineProperty(exports, "rest", {
  enumerable: true,
  get: function () {
    return _rest.default;
  }
});
Object.defineProperty(exports, "tail", {
  enumerable: true,
  get: function () {
    return _rest.default;
  }
});
Object.defineProperty(exports, "drop", {
  enumerable: true,
  get: function () {
    return _rest.default;
  }
});
Object.defineProperty(exports, "compact", {
  enumerable: true,
  get: function () {
    return _compact.default;
  }
});
Object.defineProperty(exports, "flatten", {
  enumerable: true,
  get: function () {
    return _flatten.default;
  }
});
Object.defineProperty(exports, "without", {
  enumerable: true,
  get: function () {
    return _without.default;
  }
});
Object.defineProperty(exports, "uniq", {
  enumerable: true,
  get: function () {
    return _uniq.default;
  }
});
Object.defineProperty(exports, "unique", {
  enumerable: true,
  get: function () {
    return _uniq.default;
  }
});
Object.defineProperty(exports, "union", {
  enumerable: true,
  get: function () {
    return _union.default;
  }
});
Object.defineProperty(exports, "intersection", {
  enumerable: true,
  get: function () {
    return _intersection.default;
  }
});
Object.defineProperty(exports, "difference", {
  enumerable: true,
  get: function () {
    return _difference.default;
  }
});
Object.defineProperty(exports, "unzip", {
  enumerable: true,
  get: function () {
    return _unzip.default;
  }
});
Object.defineProperty(exports, "transpose", {
  enumerable: true,
  get: function () {
    return _unzip.default;
  }
});
Object.defineProperty(exports, "zip", {
  enumerable: true,
  get: function () {
    return _zip.default;
  }
});
Object.defineProperty(exports, "object", {
  enumerable: true,
  get: function () {
    return _object.default;
  }
});
Object.defineProperty(exports, "range", {
  enumerable: true,
  get: function () {
    return _range.default;
  }
});
Object.defineProperty(exports, "chunk", {
  enumerable: true,
  get: function () {
    return _chunk.default;
  }
});
Object.defineProperty(exports, "mixin", {
  enumerable: true,
  get: function () {
    return _mixin.default;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _underscoreArrayMethods.default;
  }
});

var _setup = require("./_setup.js");

var _restArguments = _interopRequireDefault(require("./restArguments.js"));

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _isNull = _interopRequireDefault(require("./isNull.js"));

var _isUndefined = _interopRequireDefault(require("./isUndefined.js"));

var _isBoolean = _interopRequireDefault(require("./isBoolean.js"));

var _isElement = _interopRequireDefault(require("./isElement.js"));

var _isString = _interopRequireDefault(require("./isString.js"));

var _isNumber = _interopRequireDefault(require("./isNumber.js"));

var _isDate = _interopRequireDefault(require("./isDate.js"));

var _isRegExp = _interopRequireDefault(require("./isRegExp.js"));

var _isError = _interopRequireDefault(require("./isError.js"));

var _isSymbol = _interopRequireDefault(require("./isSymbol.js"));

var _isArrayBuffer = _interopRequireDefault(require("./isArrayBuffer.js"));

var _isDataView = _interopRequireDefault(require("./isDataView.js"));

var _isArray = _interopRequireDefault(require("./isArray.js"));

var _isFunction = _interopRequireDefault(require("./isFunction.js"));

var _isArguments = _interopRequireDefault(require("./isArguments.js"));

var _isFinite = _interopRequireDefault(require("./isFinite.js"));

var _isNaN = _interopRequireDefault(require("./isNaN.js"));

var _isTypedArray = _interopRequireDefault(require("./isTypedArray.js"));

var _isEmpty = _interopRequireDefault(require("./isEmpty.js"));

var _isMatch = _interopRequireDefault(require("./isMatch.js"));

var _isEqual = _interopRequireDefault(require("./isEqual.js"));

var _isMap = _interopRequireDefault(require("./isMap.js"));

var _isWeakMap = _interopRequireDefault(require("./isWeakMap.js"));

var _isSet = _interopRequireDefault(require("./isSet.js"));

var _isWeakSet = _interopRequireDefault(require("./isWeakSet.js"));

var _keys = _interopRequireDefault(require("./keys.js"));

var _allKeys = _interopRequireDefault(require("./allKeys.js"));

var _values = _interopRequireDefault(require("./values.js"));

var _pairs = _interopRequireDefault(require("./pairs.js"));

var _invert = _interopRequireDefault(require("./invert.js"));

var _functions = _interopRequireDefault(require("./functions.js"));

var _extend = _interopRequireDefault(require("./extend.js"));

var _extendOwn = _interopRequireDefault(require("./extendOwn.js"));

var _defaults = _interopRequireDefault(require("./defaults.js"));

var _create = _interopRequireDefault(require("./create.js"));

var _clone = _interopRequireDefault(require("./clone.js"));

var _tap = _interopRequireDefault(require("./tap.js"));

var _get = _interopRequireDefault(require("./get.js"));

var _has = _interopRequireDefault(require("./has.js"));

var _mapObject = _interopRequireDefault(require("./mapObject.js"));

var _identity = _interopRequireDefault(require("./identity.js"));

var _constant = _interopRequireDefault(require("./constant.js"));

var _noop = _interopRequireDefault(require("./noop.js"));

var _toPath = _interopRequireDefault(require("./toPath.js"));

var _property = _interopRequireDefault(require("./property.js"));

var _propertyOf = _interopRequireDefault(require("./propertyOf.js"));

var _matcher = _interopRequireDefault(require("./matcher.js"));

var _times = _interopRequireDefault(require("./times.js"));

var _random = _interopRequireDefault(require("./random.js"));

var _now = _interopRequireDefault(require("./now.js"));

var _escape = _interopRequireDefault(require("./escape.js"));

var _unescape = _interopRequireDefault(require("./unescape.js"));

var _templateSettings = _interopRequireDefault(require("./templateSettings.js"));

var _template = _interopRequireDefault(require("./template.js"));

var _result = _interopRequireDefault(require("./result.js"));

var _uniqueId = _interopRequireDefault(require("./uniqueId.js"));

var _chain = _interopRequireDefault(require("./chain.js"));

var _iteratee = _interopRequireDefault(require("./iteratee.js"));

var _partial = _interopRequireDefault(require("./partial.js"));

var _bind = _interopRequireDefault(require("./bind.js"));

var _bindAll = _interopRequireDefault(require("./bindAll.js"));

var _memoize = _interopRequireDefault(require("./memoize.js"));

var _delay = _interopRequireDefault(require("./delay.js"));

var _defer = _interopRequireDefault(require("./defer.js"));

var _throttle = _interopRequireDefault(require("./throttle.js"));

var _debounce = _interopRequireDefault(require("./debounce.js"));

var _wrap = _interopRequireDefault(require("./wrap.js"));

var _negate = _interopRequireDefault(require("./negate.js"));

var _compose = _interopRequireDefault(require("./compose.js"));

var _after = _interopRequireDefault(require("./after.js"));

var _before = _interopRequireDefault(require("./before.js"));

var _once = _interopRequireDefault(require("./once.js"));

var _findKey = _interopRequireDefault(require("./findKey.js"));

var _findIndex = _interopRequireDefault(require("./findIndex.js"));

var _findLastIndex = _interopRequireDefault(require("./findLastIndex.js"));

var _sortedIndex = _interopRequireDefault(require("./sortedIndex.js"));

var _indexOf = _interopRequireDefault(require("./indexOf.js"));

var _lastIndexOf = _interopRequireDefault(require("./lastIndexOf.js"));

var _find = _interopRequireDefault(require("./find.js"));

var _findWhere = _interopRequireDefault(require("./findWhere.js"));

var _each = _interopRequireDefault(require("./each.js"));

var _map = _interopRequireDefault(require("./map.js"));

var _reduce = _interopRequireDefault(require("./reduce.js"));

var _reduceRight = _interopRequireDefault(require("./reduceRight.js"));

var _filter = _interopRequireDefault(require("./filter.js"));

var _reject = _interopRequireDefault(require("./reject.js"));

var _every = _interopRequireDefault(require("./every.js"));

var _some = _interopRequireDefault(require("./some.js"));

var _contains = _interopRequireDefault(require("./contains.js"));

var _invoke = _interopRequireDefault(require("./invoke.js"));

var _pluck = _interopRequireDefault(require("./pluck.js"));

var _where = _interopRequireDefault(require("./where.js"));

var _max = _interopRequireDefault(require("./max.js"));

var _min = _interopRequireDefault(require("./min.js"));

var _shuffle = _interopRequireDefault(require("./shuffle.js"));

var _sample = _interopRequireDefault(require("./sample.js"));

var _sortBy = _interopRequireDefault(require("./sortBy.js"));

var _groupBy = _interopRequireDefault(require("./groupBy.js"));

var _indexBy = _interopRequireDefault(require("./indexBy.js"));

var _countBy = _interopRequireDefault(require("./countBy.js"));

var _partition = _interopRequireDefault(require("./partition.js"));

var _toArray = _interopRequireDefault(require("./toArray.js"));

var _size = _interopRequireDefault(require("./size.js"));

var _pick = _interopRequireDefault(require("./pick.js"));

var _omit = _interopRequireDefault(require("./omit.js"));

var _first = _interopRequireDefault(require("./first.js"));

var _initial = _interopRequireDefault(require("./initial.js"));

var _last = _interopRequireDefault(require("./last.js"));

var _rest = _interopRequireDefault(require("./rest.js"));

var _compact = _interopRequireDefault(require("./compact.js"));

var _flatten = _interopRequireDefault(require("./flatten.js"));

var _without = _interopRequireDefault(require("./without.js"));

var _uniq = _interopRequireDefault(require("./uniq.js"));

var _union = _interopRequireDefault(require("./union.js"));

var _intersection = _interopRequireDefault(require("./intersection.js"));

var _difference = _interopRequireDefault(require("./difference.js"));

var _unzip = _interopRequireDefault(require("./unzip.js"));

var _zip = _interopRequireDefault(require("./zip.js"));

var _object = _interopRequireDefault(require("./object.js"));

var _range = _interopRequireDefault(require("./range.js"));

var _chunk = _interopRequireDefault(require("./chunk.js"));

var _mixin = _interopRequireDefault(require("./mixin.js"));

var _underscoreArrayMethods = _interopRequireDefault(require("./underscore-array-methods.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./_setup.js":"../node_modules/underscore/modules/_setup.js","./restArguments.js":"../node_modules/underscore/modules/restArguments.js","./isObject.js":"../node_modules/underscore/modules/isObject.js","./isNull.js":"../node_modules/underscore/modules/isNull.js","./isUndefined.js":"../node_modules/underscore/modules/isUndefined.js","./isBoolean.js":"../node_modules/underscore/modules/isBoolean.js","./isElement.js":"../node_modules/underscore/modules/isElement.js","./isString.js":"../node_modules/underscore/modules/isString.js","./isNumber.js":"../node_modules/underscore/modules/isNumber.js","./isDate.js":"../node_modules/underscore/modules/isDate.js","./isRegExp.js":"../node_modules/underscore/modules/isRegExp.js","./isError.js":"../node_modules/underscore/modules/isError.js","./isSymbol.js":"../node_modules/underscore/modules/isSymbol.js","./isArrayBuffer.js":"../node_modules/underscore/modules/isArrayBuffer.js","./isDataView.js":"../node_modules/underscore/modules/isDataView.js","./isArray.js":"../node_modules/underscore/modules/isArray.js","./isFunction.js":"../node_modules/underscore/modules/isFunction.js","./isArguments.js":"../node_modules/underscore/modules/isArguments.js","./isFinite.js":"../node_modules/underscore/modules/isFinite.js","./isNaN.js":"../node_modules/underscore/modules/isNaN.js","./isTypedArray.js":"../node_modules/underscore/modules/isTypedArray.js","./isEmpty.js":"../node_modules/underscore/modules/isEmpty.js","./isMatch.js":"../node_modules/underscore/modules/isMatch.js","./isEqual.js":"../node_modules/underscore/modules/isEqual.js","./isMap.js":"../node_modules/underscore/modules/isMap.js","./isWeakMap.js":"../node_modules/underscore/modules/isWeakMap.js","./isSet.js":"../node_modules/underscore/modules/isSet.js","./isWeakSet.js":"../node_modules/underscore/modules/isWeakSet.js","./keys.js":"../node_modules/underscore/modules/keys.js","./allKeys.js":"../node_modules/underscore/modules/allKeys.js","./values.js":"../node_modules/underscore/modules/values.js","./pairs.js":"../node_modules/underscore/modules/pairs.js","./invert.js":"../node_modules/underscore/modules/invert.js","./functions.js":"../node_modules/underscore/modules/functions.js","./extend.js":"../node_modules/underscore/modules/extend.js","./extendOwn.js":"../node_modules/underscore/modules/extendOwn.js","./defaults.js":"../node_modules/underscore/modules/defaults.js","./create.js":"../node_modules/underscore/modules/create.js","./clone.js":"../node_modules/underscore/modules/clone.js","./tap.js":"../node_modules/underscore/modules/tap.js","./get.js":"../node_modules/underscore/modules/get.js","./has.js":"../node_modules/underscore/modules/has.js","./mapObject.js":"../node_modules/underscore/modules/mapObject.js","./identity.js":"../node_modules/underscore/modules/identity.js","./constant.js":"../node_modules/underscore/modules/constant.js","./noop.js":"../node_modules/underscore/modules/noop.js","./toPath.js":"../node_modules/underscore/modules/toPath.js","./property.js":"../node_modules/underscore/modules/property.js","./propertyOf.js":"../node_modules/underscore/modules/propertyOf.js","./matcher.js":"../node_modules/underscore/modules/matcher.js","./times.js":"../node_modules/underscore/modules/times.js","./random.js":"../node_modules/underscore/modules/random.js","./now.js":"../node_modules/underscore/modules/now.js","./escape.js":"../node_modules/underscore/modules/escape.js","./unescape.js":"../node_modules/underscore/modules/unescape.js","./templateSettings.js":"../node_modules/underscore/modules/templateSettings.js","./template.js":"../node_modules/underscore/modules/template.js","./result.js":"../node_modules/underscore/modules/result.js","./uniqueId.js":"../node_modules/underscore/modules/uniqueId.js","./chain.js":"../node_modules/underscore/modules/chain.js","./iteratee.js":"../node_modules/underscore/modules/iteratee.js","./partial.js":"../node_modules/underscore/modules/partial.js","./bind.js":"../node_modules/underscore/modules/bind.js","./bindAll.js":"../node_modules/underscore/modules/bindAll.js","./memoize.js":"../node_modules/underscore/modules/memoize.js","./delay.js":"../node_modules/underscore/modules/delay.js","./defer.js":"../node_modules/underscore/modules/defer.js","./throttle.js":"../node_modules/underscore/modules/throttle.js","./debounce.js":"../node_modules/underscore/modules/debounce.js","./wrap.js":"../node_modules/underscore/modules/wrap.js","./negate.js":"../node_modules/underscore/modules/negate.js","./compose.js":"../node_modules/underscore/modules/compose.js","./after.js":"../node_modules/underscore/modules/after.js","./before.js":"../node_modules/underscore/modules/before.js","./once.js":"../node_modules/underscore/modules/once.js","./findKey.js":"../node_modules/underscore/modules/findKey.js","./findIndex.js":"../node_modules/underscore/modules/findIndex.js","./findLastIndex.js":"../node_modules/underscore/modules/findLastIndex.js","./sortedIndex.js":"../node_modules/underscore/modules/sortedIndex.js","./indexOf.js":"../node_modules/underscore/modules/indexOf.js","./lastIndexOf.js":"../node_modules/underscore/modules/lastIndexOf.js","./find.js":"../node_modules/underscore/modules/find.js","./findWhere.js":"../node_modules/underscore/modules/findWhere.js","./each.js":"../node_modules/underscore/modules/each.js","./map.js":"../node_modules/underscore/modules/map.js","./reduce.js":"../node_modules/underscore/modules/reduce.js","./reduceRight.js":"../node_modules/underscore/modules/reduceRight.js","./filter.js":"../node_modules/underscore/modules/filter.js","./reject.js":"../node_modules/underscore/modules/reject.js","./every.js":"../node_modules/underscore/modules/every.js","./some.js":"../node_modules/underscore/modules/some.js","./contains.js":"../node_modules/underscore/modules/contains.js","./invoke.js":"../node_modules/underscore/modules/invoke.js","./pluck.js":"../node_modules/underscore/modules/pluck.js","./where.js":"../node_modules/underscore/modules/where.js","./max.js":"../node_modules/underscore/modules/max.js","./min.js":"../node_modules/underscore/modules/min.js","./shuffle.js":"../node_modules/underscore/modules/shuffle.js","./sample.js":"../node_modules/underscore/modules/sample.js","./sortBy.js":"../node_modules/underscore/modules/sortBy.js","./groupBy.js":"../node_modules/underscore/modules/groupBy.js","./indexBy.js":"../node_modules/underscore/modules/indexBy.js","./countBy.js":"../node_modules/underscore/modules/countBy.js","./partition.js":"../node_modules/underscore/modules/partition.js","./toArray.js":"../node_modules/underscore/modules/toArray.js","./size.js":"../node_modules/underscore/modules/size.js","./pick.js":"../node_modules/underscore/modules/pick.js","./omit.js":"../node_modules/underscore/modules/omit.js","./first.js":"../node_modules/underscore/modules/first.js","./initial.js":"../node_modules/underscore/modules/initial.js","./last.js":"../node_modules/underscore/modules/last.js","./rest.js":"../node_modules/underscore/modules/rest.js","./compact.js":"../node_modules/underscore/modules/compact.js","./flatten.js":"../node_modules/underscore/modules/flatten.js","./without.js":"../node_modules/underscore/modules/without.js","./uniq.js":"../node_modules/underscore/modules/uniq.js","./union.js":"../node_modules/underscore/modules/union.js","./intersection.js":"../node_modules/underscore/modules/intersection.js","./difference.js":"../node_modules/underscore/modules/difference.js","./unzip.js":"../node_modules/underscore/modules/unzip.js","./zip.js":"../node_modules/underscore/modules/zip.js","./object.js":"../node_modules/underscore/modules/object.js","./range.js":"../node_modules/underscore/modules/range.js","./chunk.js":"../node_modules/underscore/modules/chunk.js","./mixin.js":"../node_modules/underscore/modules/mixin.js","./underscore-array-methods.js":"../node_modules/underscore/modules/underscore-array-methods.js"}],"../node_modules/underscore/modules/index-default.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var allExports = _interopRequireWildcard(require("./index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Default Export
// ==============
// In this module, we mix our bundled exports into the `_` object and export
// the result. This is analogous to setting `module.exports = _` in CommonJS.
// Hence, this module is also the entry point of our UMD bundle and the package
// entry point for CommonJS and AMD users. In other words, this is (the source
// of) the module you are interfacing with when you do any of the following:
//
// ```js
// // CommonJS
// var _ = require('underscore');
//
// // AMD
// define(['underscore'], function(_) {...});
//
// // UMD in the browser
// // _ is available as a global variable
// ```
// Add all of the Underscore functions to the wrapper object.
var _ = (0, allExports.mixin)(allExports); // Legacy Node.js API.


_._ = _; // Export the Underscore API.

var _default = _;
exports.default = _default;
},{"./index.js":"../node_modules/underscore/modules/index.js"}],"../node_modules/underscore/modules/index-all.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _indexDefault.default;
  }
});

var _indexDefault = _interopRequireDefault(require("./index-default.js"));

var _index = require("./index.js");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./index-default.js":"../node_modules/underscore/modules/index-default.js","./index.js":"../node_modules/underscore/modules/index.js"}],"../node_modules/lbh-frontend/lbh/components/lbh-back-to-top/back-to-top.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _underscore = require("underscore");

function BackToTop($module) {
  this.$module = $module;
}

BackToTop.prototype.checkScrollPosition = function (element) {
  var windowHeight = window.innerHeight;
  var showHeight = windowHeight > 480 ? 480 : windowHeight;
  var scrollPos = window.scrollY;

  if (scrollPos > showHeight) {
    element.classList.add('lbh-back-to-top--visible');
  } else {
    element.classList.remove('lbh-back-to-top--visible');
  }
};

BackToTop.prototype.init = function () {
  // Check for module
  if (!this.$module) {
    return;
  }

  var throttled = (0, _underscore.throttle)(this.checkScrollPosition, 200);
  var backToTop = this.$module;
  window.addEventListener('scroll', function () {
    throttled(backToTop);
  });
};

var _default = BackToTop;
exports.default = _default;
},{"underscore":"../node_modules/underscore/modules/index-all.js"}],"../node_modules/govuk-frontend/govuk/components/button/button.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('GOVUKFrontend', factory) : global.GOVUKFrontend = factory();
})(this, function () {
  'use strict';

  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Window/detect.js
    var detect = ('Window' in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Window&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      (function (global) {
        if (global.constructor) {
          global.Window = global.constructor;
        } else {
          (global.Window = global.constructor = new Function('return function Window() {}')()).prototype = this;
        }
      })(this);
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Document/detect.js
    var detect = ("Document" in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Document&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      if (this.HTMLDocument) {
        // IE8
        // HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
        this.Document = this.HTMLDocument;
      } else {
        // Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
        this.Document = this.HTMLDocument = document.constructor = new Function('return function Document() {}')();
        this.Document.prototype = document;
      }
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Element/detect.js
    var detect = 'Element' in this && 'HTMLElement' in this;
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element&flags=always

    (function () {
      // IE8
      if (window.Element && !window.HTMLElement) {
        window.HTMLElement = window.Element;
        return;
      } // create Element constructor


      window.Element = window.HTMLElement = new Function('return function Element() {}')(); // generate sandboxed iframe

      var vbody = document.appendChild(document.createElement('body'));
      var frame = vbody.appendChild(document.createElement('iframe')); // use sandboxed iframe to replicate Element functionality

      var frameDocument = frame.contentWindow.document;
      var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
      var cache = {}; // polyfill Element.prototype on an element

      var shiv = function (element, deep) {
        var childNodes = element.childNodes || [],
            index = -1,
            key,
            value,
            childNode;

        if (element.nodeType === 1 && element.constructor !== Element) {
          element.constructor = Element;

          for (key in cache) {
            value = cache[key];
            element[key] = value;
          }
        }

        while (childNode = deep && childNodes[++index]) {
          shiv(childNode, deep);
        }

        return element;
      };

      var elements = document.getElementsByTagName('*');
      var nativeCreateElement = document.createElement;
      var interval;
      var loopLimit = 100;
      prototype.attachEvent('onpropertychange', function (event) {
        var propertyName = event.propertyName,
            nonValue = !cache.hasOwnProperty(propertyName),
            newValue = prototype[propertyName],
            oldValue = cache[propertyName],
            index = -1,
            element;

        while (element = elements[++index]) {
          if (element.nodeType === 1) {
            if (nonValue || element[propertyName] === oldValue) {
              element[propertyName] = newValue;
            }
          }
        }

        cache[propertyName] = newValue;
      });
      prototype.constructor = Element;

      if (!prototype.hasAttribute) {
        // <Element>.hasAttribute
        prototype.hasAttribute = function hasAttribute(name) {
          return this.getAttribute(name) !== null;
        };
      } // Apply Element prototype to the pre-existing DOM as soon as the body element appears.


      function bodyCheck() {
        if (!loopLimit--) clearTimeout(interval);

        if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
          shiv(document, true);
          if (interval && document.body.prototype) clearTimeout(interval);
          return !!document.body.prototype;
        }

        return false;
      }

      if (!bodyCheck()) {
        document.onreadystatechange = bodyCheck;
        interval = setInterval(bodyCheck, 25);
      } // Apply to any new elements created after load


      document.createElement = function createElement(nodeName) {
        var element = nativeCreateElement(String(nodeName).toLowerCase());
        return shiv(element);
      }; // remove sandboxed iframe


      document.removeChild(vbody);
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
    var detect = // In IE8, defineProperty could only act on DOM elements, so full support
    // for the feature requires the ability to set a property on an arbitrary object
    'defineProperty' in Object && function () {
      try {
        var a = {};
        Object.defineProperty(a, 'test', {
          value: 42
        });
        return true;
      } catch (e) {
        return false;
      }
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always

    (function (nativeDefineProperty) {
      var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
      var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
      var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

      Object.defineProperty = function defineProperty(object, property, descriptor) {
        // Where native support exists, assume it
        if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
          return nativeDefineProperty(object, property, descriptor);
        }

        if (object === null || !(object instanceof Object || _typeof(object) === 'object')) {
          throw new TypeError('Object.defineProperty called on non-object');
        }

        if (!(descriptor instanceof Object)) {
          throw new TypeError('Property description must be an object');
        }

        var propertyString = String(property);
        var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;

        var getterType = 'get' in descriptor && _typeof(descriptor.get);

        var setterType = 'set' in descriptor && _typeof(descriptor.set); // handle descriptor.get


        if (getterType) {
          if (getterType !== 'function') {
            throw new TypeError('Getter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineGetter__.call(object, propertyString, descriptor.get);
        } else {
          object[propertyString] = descriptor.value;
        } // handle descriptor.set


        if (setterType) {
          if (setterType !== 'function') {
            throw new TypeError('Setter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineSetter__.call(object, propertyString, descriptor.set);
        } // OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above


        if ('value' in descriptor) {
          object[propertyString] = descriptor.value;
        }

        return object;
      };
    })(Object.defineProperty);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Event/detect.js
    var detect = function (global) {
      if (!('Event' in global)) return false;
      if (typeof global.Event === 'function') return true;

      try {
        // In IE 9-11, the Event object exists but cannot be instantiated
        new Event('click');
        return true;
      } catch (e) {
        return false;
      }
    }(this);

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Event&flags=always

    (function () {
      var unlistenableWindowEvents = {
        click: 1,
        dblclick: 1,
        keyup: 1,
        keypress: 1,
        keydown: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1,
        mouseover: 1,
        mouseenter: 1,
        mouseleave: 1,
        mouseout: 1,
        storage: 1,
        storagecommit: 1,
        textinput: 1
      }; // This polyfill depends on availability of `document` so will not run in a worker
      // However, we asssume there are no browsers with worker support that lack proper
      // support for `Event` within the worker

      if (typeof document === 'undefined' || typeof window === 'undefined') return;

      function indexOf(array, element) {
        var index = -1,
            length = array.length;

        while (++index < length) {
          if (index in array && array[index] === element) {
            return index;
          }
        }

        return -1;
      }

      var existingProto = window.Event && window.Event.prototype || null;

      window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
        if (!type) {
          throw new Error('Not enough arguments');
        }

        var event; // Shortcut if browser supports createEvent

        if ('createEvent' in document) {
          event = document.createEvent('Event');
          var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
          var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
          event.initEvent(type, bubbles, cancelable);
          return event;
        }

        event = document.createEventObject();
        event.type = type;
        event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
        event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
        return event;
      };

      if (existingProto) {
        Object.defineProperty(window.Event, 'prototype', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: existingProto
        });
      }

      if (!('createEvent' in document)) {
        window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1];

          if (element === window && type in unlistenableWindowEvents) {
            throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
          }

          if (!element._events) {
            element._events = {};
          }

          if (!element._events[type]) {
            element._events[type] = function (event) {
              var list = element._events[event.type].list,
                  events = list.slice(),
                  index = -1,
                  length = events.length,
                  eventElement;

              event.preventDefault = function preventDefault() {
                if (event.cancelable !== false) {
                  event.returnValue = false;
                }
              };

              event.stopPropagation = function stopPropagation() {
                event.cancelBubble = true;
              };

              event.stopImmediatePropagation = function stopImmediatePropagation() {
                event.cancelBubble = true;
                event.cancelImmediate = true;
              };

              event.currentTarget = element;
              event.relatedTarget = event.fromElement || null;
              event.target = event.target || event.srcElement || element;
              event.timeStamp = new Date().getTime();

              if (event.clientX) {
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
              }

              while (++index < length && !event.cancelImmediate) {
                if (index in events) {
                  eventElement = events[index];

                  if (indexOf(list, eventElement) !== -1 && typeof eventElement === 'function') {
                    eventElement.call(element, event);
                  }
                }
              }
            };

            element._events[type].list = [];

            if (element.attachEvent) {
              element.attachEvent('on' + type, element._events[type]);
            }
          }

          element._events[type].list.push(listener);
        };

        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1],
              index;

          if (element._events && element._events[type] && element._events[type].list) {
            index = indexOf(element._events[type].list, listener);

            if (index !== -1) {
              element._events[type].list.splice(index, 1);

              if (!element._events[type].list.length) {
                if (element.detachEvent) {
                  element.detachEvent('on' + type, element._events[type]);
                }

                delete element._events[type];
              }
            }
          }
        };

        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
          if (!arguments.length) {
            throw new Error('Not enough arguments');
          }

          if (!event || typeof event.type !== 'string') {
            throw new Error('DOM Events Exception 0');
          }

          var element = this,
              type = event.type;

          try {
            if (!event.bubbles) {
              event.cancelBubble = true;

              var cancelBubbleEvent = function (event) {
                event.cancelBubble = true;
                (element || window).detachEvent('on' + type, cancelBubbleEvent);
              };

              this.attachEvent('on' + type, cancelBubbleEvent);
            }

            this.fireEvent('on' + type, event);
          } catch (error) {
            event.target = element;

            do {
              event.currentTarget = element;

              if ('_events' in element && typeof element._events[type] === 'function') {
                element._events[type].call(element, event);
              }

              if (typeof element['on' + type] === 'function') {
                element['on' + type].call(element, event);
              }

              element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
            } while (element && !event.cancelBubble);
          }

          return true;
        }; // Add the DOMContentLoaded Event


        document.attachEvent('onreadystatechange', function () {
          if (document.readyState === 'complete') {
            document.dispatchEvent(new Event('DOMContentLoaded', {
              bubbles: true
            }));
          }
        });
      }
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Function/prototype/bind/detect.js
    var detect = ('bind' in Function.prototype);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Function.prototype.bind&flags=always

    Object.defineProperty(Function.prototype, 'bind', {
      value: function bind(that) {
        // .length is 1
        // add necessary es5-shim utilities
        var $Array = Array;
        var $Object = Object;
        var ObjectPrototype = $Object.prototype;
        var ArrayPrototype = $Array.prototype;

        var Empty = function Empty() {};

        var to_string = ObjectPrototype.toString;
        var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
        var isCallable;
        /* inlined from https://npmjs.com/is-callable */

        var fnToStr = Function.prototype.toString,
            tryFunctionObject = function tryFunctionObject(value) {
          try {
            fnToStr.call(value);
            return true;
          } catch (e) {
            return false;
          }
        },
            fnClass = '[object Function]',
            genClass = '[object GeneratorFunction]';

        isCallable = function isCallable(value) {
          if (typeof value !== 'function') {
            return false;
          }

          if (hasToStringTag) {
            return tryFunctionObject(value);
          }

          var strClass = to_string.call(value);
          return strClass === fnClass || strClass === genClass;
        };

        var array_slice = ArrayPrototype.slice;
        var array_concat = ArrayPrototype.concat;
        var array_push = ArrayPrototype.push;
        var max = Math.max; // /add necessary es5-shim utilities
        // 1. Let Target be the this value.

        var target = this; // 2. If IsCallable(Target) is false, throw a TypeError exception.

        if (!isCallable(target)) {
          throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        } // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used


        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.

        var bound;

        var binder = function () {
          if (this instanceof bound) {
            // 15.3.4.5.2 [[Construct]]
            // When the [[Construct]] internal method of a function object,
            // F that was created using the bind function is called with a
            // list of arguments ExtraArgs, the following steps are taken:
            // 1. Let target be the value of F's [[TargetFunction]]
            //   internal property.
            // 2. If target has no [[Construct]] internal method, a
            //   TypeError exception is thrown.
            // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Construct]] internal
            //   method of target providing args as the arguments.
            var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));

            if ($Object(result) === result) {
              return result;
            }

            return this;
          } else {
            // 15.3.4.5.1 [[Call]]
            // When the [[Call]] internal method of a function object, F,
            // which was created using the bind function is called with a
            // this value and a list of arguments ExtraArgs, the following
            // steps are taken:
            // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 2. Let boundThis be the value of F's [[BoundThis]] internal
            //   property.
            // 3. Let target be the value of F's [[TargetFunction]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Call]] internal method
            //   of target providing boundThis as the this value and
            //   providing args as the arguments.
            // equiv: target.call(this, ...boundArgs, ...args)
            return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
          }
        }; // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.


        var boundLength = max(0, target.length - args.length); // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.

        var boundArgs = [];

        for (var i = 0; i < boundLength; i++) {
          array_push.call(boundArgs, '$' + i);
        } // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.


        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
          Empty.prototype = target.prototype;
          bound.prototype = new Empty(); // Clean up dangling references.

          Empty.prototype = null;
        } // TODO
        // 18. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.
        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.
        // 22. Return F.


        return bound;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  var KEY_SPACE = 32;
  var DEBOUNCE_TIMEOUT_IN_SECONDS = 1;

  function Button($module) {
    this.$module = $module;
    this.debounceFormSubmitTimer = null;
  }
  /**
  * JavaScript 'shim' to trigger the click event of element(s) when the space key is pressed.
  *
  * Created since some Assistive Technologies (for example some Screenreaders)
  * will tell a user to press space on a 'button', so this functionality needs to be shimmed
  * See https://github.com/alphagov/govuk_elements/pull/272#issuecomment-233028270
  *
  * @param {object} event event
  */


  Button.prototype.handleKeyDown = function (event) {
    // get the target element
    var target = event.target; // if the element has a role='button' and the pressed key is a space, we'll simulate a click

    if (target.getAttribute('role') === 'button' && event.keyCode === KEY_SPACE) {
      event.preventDefault(); // trigger the target's click event

      target.click();
    }
  };
  /**
  * If the click quickly succeeds a previous click then nothing will happen.
  * This stops people accidentally causing multiple form submissions by
  * double clicking buttons.
  */


  Button.prototype.debounce = function (event) {
    var target = event.target; // Check the button that is clicked on has the preventDoubleClick feature enabled

    if (target.getAttribute('data-prevent-double-click') !== 'true') {
      return;
    } // If the timer is still running then we want to prevent the click from submitting the form


    if (this.debounceFormSubmitTimer) {
      event.preventDefault();
      return false;
    }

    this.debounceFormSubmitTimer = setTimeout(function () {
      this.debounceFormSubmitTimer = null;
    }.bind(this), DEBOUNCE_TIMEOUT_IN_SECONDS * 1000);
  };
  /**
  * Initialise an event listener for keydown at document level
  * this will help listening for later inserted elements with a role="button"
  */


  Button.prototype.init = function () {
    this.$module.addEventListener('keydown', this.handleKeyDown);
    this.$module.addEventListener('click', this.debounce);
  };

  return Button;
});
},{}],"../node_modules/lbh-frontend/lbh/components/lbh-button/button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _button = _interopRequireDefault(require("govuk-frontend/govuk/components/button/button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _button.default;
exports.default = _default;
},{"govuk-frontend/govuk/components/button/button":"../node_modules/govuk-frontend/govuk/components/button/button.js"}],"../node_modules/govuk-frontend/govuk/components/character-count/character-count.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('GOVUKFrontend', factory) : global.GOVUKFrontend = factory();
})(this, function () {
  'use strict';

  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
    var detect = // In IE8, defineProperty could only act on DOM elements, so full support
    // for the feature requires the ability to set a property on an arbitrary object
    'defineProperty' in Object && function () {
      try {
        var a = {};
        Object.defineProperty(a, 'test', {
          value: 42
        });
        return true;
      } catch (e) {
        return false;
      }
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always

    (function (nativeDefineProperty) {
      var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
      var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
      var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

      Object.defineProperty = function defineProperty(object, property, descriptor) {
        // Where native support exists, assume it
        if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
          return nativeDefineProperty(object, property, descriptor);
        }

        if (object === null || !(object instanceof Object || _typeof(object) === 'object')) {
          throw new TypeError('Object.defineProperty called on non-object');
        }

        if (!(descriptor instanceof Object)) {
          throw new TypeError('Property description must be an object');
        }

        var propertyString = String(property);
        var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;

        var getterType = 'get' in descriptor && _typeof(descriptor.get);

        var setterType = 'set' in descriptor && _typeof(descriptor.set); // handle descriptor.get


        if (getterType) {
          if (getterType !== 'function') {
            throw new TypeError('Getter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineGetter__.call(object, propertyString, descriptor.get);
        } else {
          object[propertyString] = descriptor.value;
        } // handle descriptor.set


        if (setterType) {
          if (setterType !== 'function') {
            throw new TypeError('Setter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineSetter__.call(object, propertyString, descriptor.set);
        } // OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above


        if ('value' in descriptor) {
          object[propertyString] = descriptor.value;
        }

        return object;
      };
    })(Object.defineProperty);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Function/prototype/bind/detect.js
    var detect = ('bind' in Function.prototype);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Function.prototype.bind&flags=always

    Object.defineProperty(Function.prototype, 'bind', {
      value: function bind(that) {
        // .length is 1
        // add necessary es5-shim utilities
        var $Array = Array;
        var $Object = Object;
        var ObjectPrototype = $Object.prototype;
        var ArrayPrototype = $Array.prototype;

        var Empty = function Empty() {};

        var to_string = ObjectPrototype.toString;
        var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
        var isCallable;
        /* inlined from https://npmjs.com/is-callable */

        var fnToStr = Function.prototype.toString,
            tryFunctionObject = function tryFunctionObject(value) {
          try {
            fnToStr.call(value);
            return true;
          } catch (e) {
            return false;
          }
        },
            fnClass = '[object Function]',
            genClass = '[object GeneratorFunction]';

        isCallable = function isCallable(value) {
          if (typeof value !== 'function') {
            return false;
          }

          if (hasToStringTag) {
            return tryFunctionObject(value);
          }

          var strClass = to_string.call(value);
          return strClass === fnClass || strClass === genClass;
        };

        var array_slice = ArrayPrototype.slice;
        var array_concat = ArrayPrototype.concat;
        var array_push = ArrayPrototype.push;
        var max = Math.max; // /add necessary es5-shim utilities
        // 1. Let Target be the this value.

        var target = this; // 2. If IsCallable(Target) is false, throw a TypeError exception.

        if (!isCallable(target)) {
          throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        } // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used


        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.

        var bound;

        var binder = function () {
          if (this instanceof bound) {
            // 15.3.4.5.2 [[Construct]]
            // When the [[Construct]] internal method of a function object,
            // F that was created using the bind function is called with a
            // list of arguments ExtraArgs, the following steps are taken:
            // 1. Let target be the value of F's [[TargetFunction]]
            //   internal property.
            // 2. If target has no [[Construct]] internal method, a
            //   TypeError exception is thrown.
            // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Construct]] internal
            //   method of target providing args as the arguments.
            var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));

            if ($Object(result) === result) {
              return result;
            }

            return this;
          } else {
            // 15.3.4.5.1 [[Call]]
            // When the [[Call]] internal method of a function object, F,
            // which was created using the bind function is called with a
            // this value and a list of arguments ExtraArgs, the following
            // steps are taken:
            // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 2. Let boundThis be the value of F's [[BoundThis]] internal
            //   property.
            // 3. Let target be the value of F's [[TargetFunction]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Call]] internal method
            //   of target providing boundThis as the this value and
            //   providing args as the arguments.
            // equiv: target.call(this, ...boundArgs, ...args)
            return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
          }
        }; // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.


        var boundLength = max(0, target.length - args.length); // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.

        var boundArgs = [];

        for (var i = 0; i < boundLength; i++) {
          array_push.call(boundArgs, '$' + i);
        } // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.


        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
          Empty.prototype = target.prototype;
          bound.prototype = new Empty(); // Clean up dangling references.

          Empty.prototype = null;
        } // TODO
        // 18. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.
        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.
        // 22. Return F.


        return bound;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Window/detect.js
    var detect = ('Window' in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Window&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      (function (global) {
        if (global.constructor) {
          global.Window = global.constructor;
        } else {
          (global.Window = global.constructor = new Function('return function Window() {}')()).prototype = this;
        }
      })(this);
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Document/detect.js
    var detect = ("Document" in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Document&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      if (this.HTMLDocument) {
        // IE8
        // HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
        this.Document = this.HTMLDocument;
      } else {
        // Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
        this.Document = this.HTMLDocument = document.constructor = new Function('return function Document() {}')();
        this.Document.prototype = document;
      }
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Element/detect.js
    var detect = 'Element' in this && 'HTMLElement' in this;
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element&flags=always

    (function () {
      // IE8
      if (window.Element && !window.HTMLElement) {
        window.HTMLElement = window.Element;
        return;
      } // create Element constructor


      window.Element = window.HTMLElement = new Function('return function Element() {}')(); // generate sandboxed iframe

      var vbody = document.appendChild(document.createElement('body'));
      var frame = vbody.appendChild(document.createElement('iframe')); // use sandboxed iframe to replicate Element functionality

      var frameDocument = frame.contentWindow.document;
      var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
      var cache = {}; // polyfill Element.prototype on an element

      var shiv = function (element, deep) {
        var childNodes = element.childNodes || [],
            index = -1,
            key,
            value,
            childNode;

        if (element.nodeType === 1 && element.constructor !== Element) {
          element.constructor = Element;

          for (key in cache) {
            value = cache[key];
            element[key] = value;
          }
        }

        while (childNode = deep && childNodes[++index]) {
          shiv(childNode, deep);
        }

        return element;
      };

      var elements = document.getElementsByTagName('*');
      var nativeCreateElement = document.createElement;
      var interval;
      var loopLimit = 100;
      prototype.attachEvent('onpropertychange', function (event) {
        var propertyName = event.propertyName,
            nonValue = !cache.hasOwnProperty(propertyName),
            newValue = prototype[propertyName],
            oldValue = cache[propertyName],
            index = -1,
            element;

        while (element = elements[++index]) {
          if (element.nodeType === 1) {
            if (nonValue || element[propertyName] === oldValue) {
              element[propertyName] = newValue;
            }
          }
        }

        cache[propertyName] = newValue;
      });
      prototype.constructor = Element;

      if (!prototype.hasAttribute) {
        // <Element>.hasAttribute
        prototype.hasAttribute = function hasAttribute(name) {
          return this.getAttribute(name) !== null;
        };
      } // Apply Element prototype to the pre-existing DOM as soon as the body element appears.


      function bodyCheck() {
        if (!loopLimit--) clearTimeout(interval);

        if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
          shiv(document, true);
          if (interval && document.body.prototype) clearTimeout(interval);
          return !!document.body.prototype;
        }

        return false;
      }

      if (!bodyCheck()) {
        document.onreadystatechange = bodyCheck;
        interval = setInterval(bodyCheck, 25);
      } // Apply to any new elements created after load


      document.createElement = function createElement(nodeName) {
        var element = nativeCreateElement(String(nodeName).toLowerCase());
        return shiv(element);
      }; // remove sandboxed iframe


      document.removeChild(vbody);
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Event/detect.js
    var detect = function (global) {
      if (!('Event' in global)) return false;
      if (typeof global.Event === 'function') return true;

      try {
        // In IE 9-11, the Event object exists but cannot be instantiated
        new Event('click');
        return true;
      } catch (e) {
        return false;
      }
    }(this);

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Event&flags=always

    (function () {
      var unlistenableWindowEvents = {
        click: 1,
        dblclick: 1,
        keyup: 1,
        keypress: 1,
        keydown: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1,
        mouseover: 1,
        mouseenter: 1,
        mouseleave: 1,
        mouseout: 1,
        storage: 1,
        storagecommit: 1,
        textinput: 1
      }; // This polyfill depends on availability of `document` so will not run in a worker
      // However, we asssume there are no browsers with worker support that lack proper
      // support for `Event` within the worker

      if (typeof document === 'undefined' || typeof window === 'undefined') return;

      function indexOf(array, element) {
        var index = -1,
            length = array.length;

        while (++index < length) {
          if (index in array && array[index] === element) {
            return index;
          }
        }

        return -1;
      }

      var existingProto = window.Event && window.Event.prototype || null;

      window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
        if (!type) {
          throw new Error('Not enough arguments');
        }

        var event; // Shortcut if browser supports createEvent

        if ('createEvent' in document) {
          event = document.createEvent('Event');
          var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
          var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
          event.initEvent(type, bubbles, cancelable);
          return event;
        }

        event = document.createEventObject();
        event.type = type;
        event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
        event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
        return event;
      };

      if (existingProto) {
        Object.defineProperty(window.Event, 'prototype', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: existingProto
        });
      }

      if (!('createEvent' in document)) {
        window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1];

          if (element === window && type in unlistenableWindowEvents) {
            throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
          }

          if (!element._events) {
            element._events = {};
          }

          if (!element._events[type]) {
            element._events[type] = function (event) {
              var list = element._events[event.type].list,
                  events = list.slice(),
                  index = -1,
                  length = events.length,
                  eventElement;

              event.preventDefault = function preventDefault() {
                if (event.cancelable !== false) {
                  event.returnValue = false;
                }
              };

              event.stopPropagation = function stopPropagation() {
                event.cancelBubble = true;
              };

              event.stopImmediatePropagation = function stopImmediatePropagation() {
                event.cancelBubble = true;
                event.cancelImmediate = true;
              };

              event.currentTarget = element;
              event.relatedTarget = event.fromElement || null;
              event.target = event.target || event.srcElement || element;
              event.timeStamp = new Date().getTime();

              if (event.clientX) {
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
              }

              while (++index < length && !event.cancelImmediate) {
                if (index in events) {
                  eventElement = events[index];

                  if (indexOf(list, eventElement) !== -1 && typeof eventElement === 'function') {
                    eventElement.call(element, event);
                  }
                }
              }
            };

            element._events[type].list = [];

            if (element.attachEvent) {
              element.attachEvent('on' + type, element._events[type]);
            }
          }

          element._events[type].list.push(listener);
        };

        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1],
              index;

          if (element._events && element._events[type] && element._events[type].list) {
            index = indexOf(element._events[type].list, listener);

            if (index !== -1) {
              element._events[type].list.splice(index, 1);

              if (!element._events[type].list.length) {
                if (element.detachEvent) {
                  element.detachEvent('on' + type, element._events[type]);
                }

                delete element._events[type];
              }
            }
          }
        };

        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
          if (!arguments.length) {
            throw new Error('Not enough arguments');
          }

          if (!event || typeof event.type !== 'string') {
            throw new Error('DOM Events Exception 0');
          }

          var element = this,
              type = event.type;

          try {
            if (!event.bubbles) {
              event.cancelBubble = true;

              var cancelBubbleEvent = function (event) {
                event.cancelBubble = true;
                (element || window).detachEvent('on' + type, cancelBubbleEvent);
              };

              this.attachEvent('on' + type, cancelBubbleEvent);
            }

            this.fireEvent('on' + type, event);
          } catch (error) {
            event.target = element;

            do {
              event.currentTarget = element;

              if ('_events' in element && typeof element._events[type] === 'function') {
                element._events[type].call(element, event);
              }

              if (typeof element['on' + type] === 'function') {
                element['on' + type].call(element, event);
              }

              element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
            } while (element && !event.cancelBubble);
          }

          return true;
        }; // Add the DOMContentLoaded Event


        document.attachEvent('onreadystatechange', function () {
          if (document.readyState === 'complete') {
            document.dispatchEvent(new Event('DOMContentLoaded', {
              bubbles: true
            }));
          }
        });
      }
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/detect.js
    var detect = 'DOMTokenList' in this && function (x) {
      return 'classList' in x ? !x.classList.toggle('x', false) && !x.className : true;
    }(document.createElement('x'));

    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/polyfill.js

    (function (global) {
      var nativeImpl = "DOMTokenList" in global && global.DOMTokenList;

      if (!nativeImpl || !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg') && !(document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList)) {
        global.DOMTokenList = function () {
          // eslint-disable-line no-unused-vars
          var dpSupport = true;

          var defineGetter = function (object, name, fn, configurable) {
            if (Object.defineProperty) Object.defineProperty(object, name, {
              configurable: false === dpSupport ? true : !!configurable,
              get: fn
            });else object.__defineGetter__(name, fn);
          };
          /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */


          try {
            defineGetter({}, "support");
          } catch (e) {
            dpSupport = false;
          }

          var _DOMTokenList = function (el, prop) {
            var that = this;
            var tokens = [];
            var tokenMap = {};
            var length = 0;
            var maxLength = 0;

            var addIndexGetter = function (i) {
              defineGetter(that, i, function () {
                preop();
                return tokens[i];
              }, false);
            };

            var reindex = function () {
              /** Define getter functions for array-like access to the tokenList's contents. */
              if (length >= maxLength) for (; maxLength < length; ++maxLength) {
                addIndexGetter(maxLength);
              }
            };
            /** Helper function called at the start of each class method. Internal use only. */


            var preop = function () {
              var error;
              var i;
              var args = arguments;
              var rSpace = /\s+/;
              /** Validate the token/s passed to an instance method, if any. */

              if (args.length) for (i = 0; i < args.length; ++i) if (rSpace.test(args[i])) {
                error = new SyntaxError('String "' + args[i] + '" ' + "contains" + ' an invalid character');
                error.code = 5;
                error.name = "InvalidCharacterError";
                throw error;
              }
              /** Split the new value apart by whitespace*/

              if (_typeof(el[prop]) === "object") {
                tokens = ("" + el[prop].baseVal).replace(/^\s+|\s+$/g, "").split(rSpace);
              } else {
                tokens = ("" + el[prop]).replace(/^\s+|\s+$/g, "").split(rSpace);
              }
              /** Avoid treating blank strings as single-item token lists */


              if ("" === tokens[0]) tokens = [];
              /** Repopulate the internal token lists */

              tokenMap = {};

              for (i = 0; i < tokens.length; ++i) tokenMap[tokens[i]] = true;

              length = tokens.length;
              reindex();
            };
            /** Populate our internal token list if the targeted attribute of the subject element isn't empty. */


            preop();
            /** Return the number of tokens in the underlying string. Read-only. */

            defineGetter(that, "length", function () {
              preop();
              return length;
            });
            /** Override the default toString/toLocaleString methods to return a space-delimited list of tokens when typecast. */

            that.toLocaleString = that.toString = function () {
              preop();
              return tokens.join(" ");
            };

            that.item = function (idx) {
              preop();
              return tokens[idx];
            };

            that.contains = function (token) {
              preop();
              return !!tokenMap[token];
            };

            that.add = function () {
              preop.apply(that, args = arguments);

              for (var args, token, i = 0, l = args.length; i < l; ++i) {
                token = args[i];

                if (!tokenMap[token]) {
                  tokens.push(token);
                  tokenMap[token] = true;
                }
              }
              /** Update the targeted attribute of the attached element if the token list's changed. */


              if (length !== tokens.length) {
                length = tokens.length >>> 0;

                if (_typeof(el[prop]) === "object") {
                  el[prop].baseVal = tokens.join(" ");
                } else {
                  el[prop] = tokens.join(" ");
                }

                reindex();
              }
            };

            that.remove = function () {
              preop.apply(that, args = arguments);
              /** Build a hash of token names to compare against when recollecting our token list. */

              for (var args, ignore = {}, i = 0, t = []; i < args.length; ++i) {
                ignore[args[i]] = true;
                delete tokenMap[args[i]];
              }
              /** Run through our tokens list and reassign only those that aren't defined in the hash declared above. */


              for (i = 0; i < tokens.length; ++i) if (!ignore[tokens[i]]) t.push(tokens[i]);

              tokens = t;
              length = t.length >>> 0;
              /** Update the targeted attribute of the attached element. */

              if (_typeof(el[prop]) === "object") {
                el[prop].baseVal = tokens.join(" ");
              } else {
                el[prop] = tokens.join(" ");
              }

              reindex();
            };

            that.toggle = function (token, force) {
              preop.apply(that, [token]);
              /** Token state's being forced. */

              if (undefined !== force) {
                if (force) {
                  that.add(token);
                  return true;
                } else {
                  that.remove(token);
                  return false;
                }
              }
              /** Token already exists in tokenList. Remove it, and return FALSE. */


              if (tokenMap[token]) {
                that.remove(token);
                return false;
              }
              /** Otherwise, add the token and return TRUE. */


              that.add(token);
              return true;
            };

            return that;
          };

          return _DOMTokenList;
        }();
      } // Add second argument to native DOMTokenList.toggle() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.toggle('x', false);
        if (!e.classList.contains('x')) return;

        e.classList.constructor.prototype.toggle = function toggle(token
        /*, force*/
        ) {
          var force = arguments[1];

          if (force === undefined) {
            var add = !this.contains(token);
            this[add ? 'add' : 'remove'](token);
            return add;
          }

          force = !!force;
          this[force ? 'add' : 'remove'](token);
          return force;
        };
      })(); // Add multiple arguments to native DOMTokenList.add() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.add('a', 'b');
        if (e.classList.contains('b')) return;
        var native = e.classList.constructor.prototype.add;

        e.classList.constructor.prototype.add = function () {
          var args = arguments;
          var l = arguments.length;

          for (var i = 0; i < l; i++) {
            native.call(this, args[i]);
          }
        };
      })(); // Add multiple arguments to native DOMTokenList.remove() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.add('a');
        e.classList.add('b');
        e.classList.remove('a', 'b');
        if (!e.classList.contains('b')) return;
        var native = e.classList.constructor.prototype.remove;

        e.classList.constructor.prototype.remove = function () {
          var args = arguments;
          var l = arguments.length;

          for (var i = 0; i < l; i++) {
            native.call(this, args[i]);
          }
        };
      })();
    })(this);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/8717a9e04ac7aff99b4980fbedead98036b0929a/packages/polyfill-library/polyfills/Element/prototype/classList/detect.js
    var detect = 'document' in this && "classList" in document.documentElement && 'Element' in this && 'classList' in Element.prototype && function () {
      var e = document.createElement('span');
      e.classList.add('a', 'b');
      return e.classList.contains('b');
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element.prototype.classList&flags=always

    (function (global) {
      var dpSupport = true;

      var defineGetter = function (object, name, fn, configurable) {
        if (Object.defineProperty) Object.defineProperty(object, name, {
          configurable: false === dpSupport ? true : !!configurable,
          get: fn
        });else object.__defineGetter__(name, fn);
      };
      /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */


      try {
        defineGetter({}, "support");
      } catch (e) {
        dpSupport = false;
      }
      /** Polyfills a property with a DOMTokenList */


      var addProp = function (o, name, attr) {
        defineGetter(o.prototype, name, function () {
          var tokenList;
          var THIS = this,

          /** Prevent this from firing twice for some reason. What the hell, IE. */
          gibberishProperty = "__defineGetter__" + "DEFINE_PROPERTY" + name;
          if (THIS[gibberishProperty]) return tokenList;
          THIS[gibberishProperty] = true;
          /**
           * IE8 can't define properties on native JavaScript objects, so we'll use a dumb hack instead.
           *
           * What this is doing is creating a dummy element ("reflection") inside a detached phantom node ("mirror")
           * that serves as the target of Object.defineProperty instead. While we could simply use the subject HTML
           * element instead, this would conflict with element types which use indexed properties (such as forms and
           * select lists).
           */

          if (false === dpSupport) {
            var visage;
            var mirror = addProp.mirror || document.createElement("div");
            var reflections = mirror.childNodes;
            var l = reflections.length;

            for (var i = 0; i < l; ++i) if (reflections[i]._R === THIS) {
              visage = reflections[i];
              break;
            }
            /** Couldn't find an element's reflection inside the mirror. Materialise one. */


            visage || (visage = mirror.appendChild(document.createElement("div")));
            tokenList = DOMTokenList.call(visage, THIS, attr);
          } else tokenList = new DOMTokenList(THIS, attr);

          defineGetter(THIS, name, function () {
            return tokenList;
          });
          delete THIS[gibberishProperty];
          return tokenList;
        }, true);
      };

      addProp(global.Element, "classList", "className");
      addProp(global.HTMLElement, "classList", "className");
      addProp(global.HTMLLinkElement, "relList", "rel");
      addProp(global.HTMLAnchorElement, "relList", "rel");
      addProp(global.HTMLAreaElement, "relList", "rel");
    })(this);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});

  function CharacterCount($module) {
    this.$module = $module;
    this.$textarea = $module.querySelector('.govuk-js-character-count');

    if (this.$textarea) {
      this.$countMessage = $module.querySelector('[id="' + this.$textarea.id + '-info"]');
    }
  }

  CharacterCount.prototype.defaults = {
    characterCountAttribute: 'data-maxlength',
    wordCountAttribute: 'data-maxwords'
  }; // Initialize component

  CharacterCount.prototype.init = function () {
    // Check for module
    var $module = this.$module;
    var $textarea = this.$textarea;
    var $countMessage = this.$countMessage;

    if (!$textarea || !$countMessage) {
      return;
    } // We move count message right after the field
    // Kept for backwards compatibility


    $textarea.insertAdjacentElement('afterend', $countMessage); // Read options set using dataset ('data-' values)

    this.options = this.getDataset($module); // Determine the limit attribute (characters or words)

    var countAttribute = this.defaults.characterCountAttribute;

    if (this.options.maxwords) {
      countAttribute = this.defaults.wordCountAttribute;
    } // Save the element limit


    this.maxLength = $module.getAttribute(countAttribute); // Check for limit

    if (!this.maxLength) {
      return;
    } // Remove hard limit if set


    $module.removeAttribute('maxlength'); // When the page is restored after navigating 'back' in some browsers the
    // state of the character count is not restored until *after* the DOMContentLoaded
    // event is fired, so we need to sync after the pageshow event in browsers
    // that support it.

    if ('onpageshow' in window) {
      window.addEventListener('pageshow', this.sync.bind(this));
    } else {
      window.addEventListener('DOMContentLoaded', this.sync.bind(this));
    }

    this.sync();
  };

  CharacterCount.prototype.sync = function () {
    this.bindChangeEvents();
    this.updateCountMessage();
  }; // Read data attributes


  CharacterCount.prototype.getDataset = function (element) {
    var dataset = {};
    var attributes = element.attributes;

    if (attributes) {
      for (var i = 0; i < attributes.length; i++) {
        var attribute = attributes[i];
        var match = attribute.name.match(/^data-(.+)/);

        if (match) {
          dataset[match[1]] = attribute.value;
        }
      }
    }

    return dataset;
  }; // Counts characters or words in text


  CharacterCount.prototype.count = function (text) {
    var length;

    if (this.options.maxwords) {
      var tokens = text.match(/\S+/g) || []; // Matches consecutive non-whitespace chars

      length = tokens.length;
    } else {
      length = text.length;
    }

    return length;
  }; // Bind input propertychange to the elements and update based on the change


  CharacterCount.prototype.bindChangeEvents = function () {
    var $textarea = this.$textarea;
    $textarea.addEventListener('keyup', this.checkIfValueChanged.bind(this)); // Bind focus/blur events to start/stop polling

    $textarea.addEventListener('focus', this.handleFocus.bind(this));
    $textarea.addEventListener('blur', this.handleBlur.bind(this));
  }; // Speech recognition software such as Dragon NaturallySpeaking will modify the
  // fields by directly changing its `value`. These changes don't trigger events
  // in JavaScript, so we need to poll to handle when and if they occur.


  CharacterCount.prototype.checkIfValueChanged = function () {
    if (!this.$textarea.oldValue) this.$textarea.oldValue = '';

    if (this.$textarea.value !== this.$textarea.oldValue) {
      this.$textarea.oldValue = this.$textarea.value;
      this.updateCountMessage();
    }
  }; // Update message box


  CharacterCount.prototype.updateCountMessage = function () {
    var countElement = this.$textarea;
    var options = this.options;
    var countMessage = this.$countMessage; // Determine the remaining number of characters/words

    var currentLength = this.count(countElement.value);
    var maxLength = this.maxLength;
    var remainingNumber = maxLength - currentLength; // Set threshold if presented in options

    var thresholdPercent = options.threshold ? options.threshold : 0;
    var thresholdValue = maxLength * thresholdPercent / 100;

    if (thresholdValue > currentLength) {
      countMessage.classList.add('govuk-character-count__message--disabled'); // Ensure threshold is hidden for users of assistive technologies

      countMessage.setAttribute('aria-hidden', true);
    } else {
      countMessage.classList.remove('govuk-character-count__message--disabled'); // Ensure threshold is visible for users of assistive technologies

      countMessage.removeAttribute('aria-hidden');
    } // Update styles


    if (remainingNumber < 0) {
      countElement.classList.add('govuk-textarea--error');
      countMessage.classList.remove('govuk-hint');
      countMessage.classList.add('govuk-error-message');
    } else {
      countElement.classList.remove('govuk-textarea--error');
      countMessage.classList.remove('govuk-error-message');
      countMessage.classList.add('govuk-hint');
    } // Update message


    var charVerb = 'remaining';
    var charNoun = 'character';
    var displayNumber = remainingNumber;

    if (options.maxwords) {
      charNoun = 'word';
    }

    charNoun = charNoun + (remainingNumber === -1 || remainingNumber === 1 ? '' : 's');
    charVerb = remainingNumber < 0 ? 'too many' : 'remaining';
    displayNumber = Math.abs(remainingNumber);
    countMessage.innerHTML = 'You have ' + displayNumber + ' ' + charNoun + ' ' + charVerb;
  };

  CharacterCount.prototype.handleFocus = function () {
    // Check if value changed on focus
    this.valueChecker = setInterval(this.checkIfValueChanged.bind(this), 1000);
  };

  CharacterCount.prototype.handleBlur = function () {
    // Cancel value checking on blur
    clearInterval(this.valueChecker);
  };

  return CharacterCount;
});
},{}],"../node_modules/lbh-frontend/lbh/components/lbh-character-count/character-count.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _characterCount = _interopRequireDefault(require("govuk-frontend/govuk/components/character-count/character-count"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _characterCount.default;
exports.default = _default;
},{"govuk-frontend/govuk/components/character-count/character-count":"../node_modules/govuk-frontend/govuk/components/character-count/character-count.js"}],"../node_modules/govuk-frontend/govuk/components/checkboxes/checkboxes.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('GOVUKFrontend', factory) : global.GOVUKFrontend = factory();
})(this, function () {
  'use strict';

  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
    var detect = // In IE8, defineProperty could only act on DOM elements, so full support
    // for the feature requires the ability to set a property on an arbitrary object
    'defineProperty' in Object && function () {
      try {
        var a = {};
        Object.defineProperty(a, 'test', {
          value: 42
        });
        return true;
      } catch (e) {
        return false;
      }
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always

    (function (nativeDefineProperty) {
      var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
      var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
      var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

      Object.defineProperty = function defineProperty(object, property, descriptor) {
        // Where native support exists, assume it
        if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
          return nativeDefineProperty(object, property, descriptor);
        }

        if (object === null || !(object instanceof Object || _typeof(object) === 'object')) {
          throw new TypeError('Object.defineProperty called on non-object');
        }

        if (!(descriptor instanceof Object)) {
          throw new TypeError('Property description must be an object');
        }

        var propertyString = String(property);
        var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;

        var getterType = 'get' in descriptor && _typeof(descriptor.get);

        var setterType = 'set' in descriptor && _typeof(descriptor.set); // handle descriptor.get


        if (getterType) {
          if (getterType !== 'function') {
            throw new TypeError('Getter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineGetter__.call(object, propertyString, descriptor.get);
        } else {
          object[propertyString] = descriptor.value;
        } // handle descriptor.set


        if (setterType) {
          if (setterType !== 'function') {
            throw new TypeError('Setter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineSetter__.call(object, propertyString, descriptor.set);
        } // OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above


        if ('value' in descriptor) {
          object[propertyString] = descriptor.value;
        }

        return object;
      };
    })(Object.defineProperty);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Function/prototype/bind/detect.js
    var detect = ('bind' in Function.prototype);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Function.prototype.bind&flags=always

    Object.defineProperty(Function.prototype, 'bind', {
      value: function bind(that) {
        // .length is 1
        // add necessary es5-shim utilities
        var $Array = Array;
        var $Object = Object;
        var ObjectPrototype = $Object.prototype;
        var ArrayPrototype = $Array.prototype;

        var Empty = function Empty() {};

        var to_string = ObjectPrototype.toString;
        var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
        var isCallable;
        /* inlined from https://npmjs.com/is-callable */

        var fnToStr = Function.prototype.toString,
            tryFunctionObject = function tryFunctionObject(value) {
          try {
            fnToStr.call(value);
            return true;
          } catch (e) {
            return false;
          }
        },
            fnClass = '[object Function]',
            genClass = '[object GeneratorFunction]';

        isCallable = function isCallable(value) {
          if (typeof value !== 'function') {
            return false;
          }

          if (hasToStringTag) {
            return tryFunctionObject(value);
          }

          var strClass = to_string.call(value);
          return strClass === fnClass || strClass === genClass;
        };

        var array_slice = ArrayPrototype.slice;
        var array_concat = ArrayPrototype.concat;
        var array_push = ArrayPrototype.push;
        var max = Math.max; // /add necessary es5-shim utilities
        // 1. Let Target be the this value.

        var target = this; // 2. If IsCallable(Target) is false, throw a TypeError exception.

        if (!isCallable(target)) {
          throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        } // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used


        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.

        var bound;

        var binder = function () {
          if (this instanceof bound) {
            // 15.3.4.5.2 [[Construct]]
            // When the [[Construct]] internal method of a function object,
            // F that was created using the bind function is called with a
            // list of arguments ExtraArgs, the following steps are taken:
            // 1. Let target be the value of F's [[TargetFunction]]
            //   internal property.
            // 2. If target has no [[Construct]] internal method, a
            //   TypeError exception is thrown.
            // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Construct]] internal
            //   method of target providing args as the arguments.
            var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));

            if ($Object(result) === result) {
              return result;
            }

            return this;
          } else {
            // 15.3.4.5.1 [[Call]]
            // When the [[Call]] internal method of a function object, F,
            // which was created using the bind function is called with a
            // this value and a list of arguments ExtraArgs, the following
            // steps are taken:
            // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 2. Let boundThis be the value of F's [[BoundThis]] internal
            //   property.
            // 3. Let target be the value of F's [[TargetFunction]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Call]] internal method
            //   of target providing boundThis as the this value and
            //   providing args as the arguments.
            // equiv: target.call(this, ...boundArgs, ...args)
            return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
          }
        }; // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.


        var boundLength = max(0, target.length - args.length); // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.

        var boundArgs = [];

        for (var i = 0; i < boundLength; i++) {
          array_push.call(boundArgs, '$' + i);
        } // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.


        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
          Empty.prototype = target.prototype;
          bound.prototype = new Empty(); // Clean up dangling references.

          Empty.prototype = null;
        } // TODO
        // 18. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.
        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.
        // 22. Return F.


        return bound;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Window/detect.js
    var detect = ('Window' in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Window&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      (function (global) {
        if (global.constructor) {
          global.Window = global.constructor;
        } else {
          (global.Window = global.constructor = new Function('return function Window() {}')()).prototype = this;
        }
      })(this);
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Document/detect.js
    var detect = ("Document" in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Document&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      if (this.HTMLDocument) {
        // IE8
        // HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
        this.Document = this.HTMLDocument;
      } else {
        // Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
        this.Document = this.HTMLDocument = document.constructor = new Function('return function Document() {}')();
        this.Document.prototype = document;
      }
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Element/detect.js
    var detect = 'Element' in this && 'HTMLElement' in this;
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element&flags=always

    (function () {
      // IE8
      if (window.Element && !window.HTMLElement) {
        window.HTMLElement = window.Element;
        return;
      } // create Element constructor


      window.Element = window.HTMLElement = new Function('return function Element() {}')(); // generate sandboxed iframe

      var vbody = document.appendChild(document.createElement('body'));
      var frame = vbody.appendChild(document.createElement('iframe')); // use sandboxed iframe to replicate Element functionality

      var frameDocument = frame.contentWindow.document;
      var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
      var cache = {}; // polyfill Element.prototype on an element

      var shiv = function (element, deep) {
        var childNodes = element.childNodes || [],
            index = -1,
            key,
            value,
            childNode;

        if (element.nodeType === 1 && element.constructor !== Element) {
          element.constructor = Element;

          for (key in cache) {
            value = cache[key];
            element[key] = value;
          }
        }

        while (childNode = deep && childNodes[++index]) {
          shiv(childNode, deep);
        }

        return element;
      };

      var elements = document.getElementsByTagName('*');
      var nativeCreateElement = document.createElement;
      var interval;
      var loopLimit = 100;
      prototype.attachEvent('onpropertychange', function (event) {
        var propertyName = event.propertyName,
            nonValue = !cache.hasOwnProperty(propertyName),
            newValue = prototype[propertyName],
            oldValue = cache[propertyName],
            index = -1,
            element;

        while (element = elements[++index]) {
          if (element.nodeType === 1) {
            if (nonValue || element[propertyName] === oldValue) {
              element[propertyName] = newValue;
            }
          }
        }

        cache[propertyName] = newValue;
      });
      prototype.constructor = Element;

      if (!prototype.hasAttribute) {
        // <Element>.hasAttribute
        prototype.hasAttribute = function hasAttribute(name) {
          return this.getAttribute(name) !== null;
        };
      } // Apply Element prototype to the pre-existing DOM as soon as the body element appears.


      function bodyCheck() {
        if (!loopLimit--) clearTimeout(interval);

        if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
          shiv(document, true);
          if (interval && document.body.prototype) clearTimeout(interval);
          return !!document.body.prototype;
        }

        return false;
      }

      if (!bodyCheck()) {
        document.onreadystatechange = bodyCheck;
        interval = setInterval(bodyCheck, 25);
      } // Apply to any new elements created after load


      document.createElement = function createElement(nodeName) {
        var element = nativeCreateElement(String(nodeName).toLowerCase());
        return shiv(element);
      }; // remove sandboxed iframe


      document.removeChild(vbody);
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Event/detect.js
    var detect = function (global) {
      if (!('Event' in global)) return false;
      if (typeof global.Event === 'function') return true;

      try {
        // In IE 9-11, the Event object exists but cannot be instantiated
        new Event('click');
        return true;
      } catch (e) {
        return false;
      }
    }(this);

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Event&flags=always

    (function () {
      var unlistenableWindowEvents = {
        click: 1,
        dblclick: 1,
        keyup: 1,
        keypress: 1,
        keydown: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1,
        mouseover: 1,
        mouseenter: 1,
        mouseleave: 1,
        mouseout: 1,
        storage: 1,
        storagecommit: 1,
        textinput: 1
      }; // This polyfill depends on availability of `document` so will not run in a worker
      // However, we asssume there are no browsers with worker support that lack proper
      // support for `Event` within the worker

      if (typeof document === 'undefined' || typeof window === 'undefined') return;

      function indexOf(array, element) {
        var index = -1,
            length = array.length;

        while (++index < length) {
          if (index in array && array[index] === element) {
            return index;
          }
        }

        return -1;
      }

      var existingProto = window.Event && window.Event.prototype || null;

      window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
        if (!type) {
          throw new Error('Not enough arguments');
        }

        var event; // Shortcut if browser supports createEvent

        if ('createEvent' in document) {
          event = document.createEvent('Event');
          var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
          var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
          event.initEvent(type, bubbles, cancelable);
          return event;
        }

        event = document.createEventObject();
        event.type = type;
        event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
        event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
        return event;
      };

      if (existingProto) {
        Object.defineProperty(window.Event, 'prototype', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: existingProto
        });
      }

      if (!('createEvent' in document)) {
        window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1];

          if (element === window && type in unlistenableWindowEvents) {
            throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
          }

          if (!element._events) {
            element._events = {};
          }

          if (!element._events[type]) {
            element._events[type] = function (event) {
              var list = element._events[event.type].list,
                  events = list.slice(),
                  index = -1,
                  length = events.length,
                  eventElement;

              event.preventDefault = function preventDefault() {
                if (event.cancelable !== false) {
                  event.returnValue = false;
                }
              };

              event.stopPropagation = function stopPropagation() {
                event.cancelBubble = true;
              };

              event.stopImmediatePropagation = function stopImmediatePropagation() {
                event.cancelBubble = true;
                event.cancelImmediate = true;
              };

              event.currentTarget = element;
              event.relatedTarget = event.fromElement || null;
              event.target = event.target || event.srcElement || element;
              event.timeStamp = new Date().getTime();

              if (event.clientX) {
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
              }

              while (++index < length && !event.cancelImmediate) {
                if (index in events) {
                  eventElement = events[index];

                  if (indexOf(list, eventElement) !== -1 && typeof eventElement === 'function') {
                    eventElement.call(element, event);
                  }
                }
              }
            };

            element._events[type].list = [];

            if (element.attachEvent) {
              element.attachEvent('on' + type, element._events[type]);
            }
          }

          element._events[type].list.push(listener);
        };

        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1],
              index;

          if (element._events && element._events[type] && element._events[type].list) {
            index = indexOf(element._events[type].list, listener);

            if (index !== -1) {
              element._events[type].list.splice(index, 1);

              if (!element._events[type].list.length) {
                if (element.detachEvent) {
                  element.detachEvent('on' + type, element._events[type]);
                }

                delete element._events[type];
              }
            }
          }
        };

        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
          if (!arguments.length) {
            throw new Error('Not enough arguments');
          }

          if (!event || typeof event.type !== 'string') {
            throw new Error('DOM Events Exception 0');
          }

          var element = this,
              type = event.type;

          try {
            if (!event.bubbles) {
              event.cancelBubble = true;

              var cancelBubbleEvent = function (event) {
                event.cancelBubble = true;
                (element || window).detachEvent('on' + type, cancelBubbleEvent);
              };

              this.attachEvent('on' + type, cancelBubbleEvent);
            }

            this.fireEvent('on' + type, event);
          } catch (error) {
            event.target = element;

            do {
              event.currentTarget = element;

              if ('_events' in element && typeof element._events[type] === 'function') {
                element._events[type].call(element, event);
              }

              if (typeof element['on' + type] === 'function') {
                element['on' + type].call(element, event);
              }

              element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
            } while (element && !event.cancelBubble);
          }

          return true;
        }; // Add the DOMContentLoaded Event


        document.attachEvent('onreadystatechange', function () {
          if (document.readyState === 'complete') {
            document.dispatchEvent(new Event('DOMContentLoaded', {
              bubbles: true
            }));
          }
        });
      }
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/detect.js
    var detect = 'DOMTokenList' in this && function (x) {
      return 'classList' in x ? !x.classList.toggle('x', false) && !x.className : true;
    }(document.createElement('x'));

    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/polyfill.js

    (function (global) {
      var nativeImpl = "DOMTokenList" in global && global.DOMTokenList;

      if (!nativeImpl || !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg') && !(document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList)) {
        global.DOMTokenList = function () {
          // eslint-disable-line no-unused-vars
          var dpSupport = true;

          var defineGetter = function (object, name, fn, configurable) {
            if (Object.defineProperty) Object.defineProperty(object, name, {
              configurable: false === dpSupport ? true : !!configurable,
              get: fn
            });else object.__defineGetter__(name, fn);
          };
          /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */


          try {
            defineGetter({}, "support");
          } catch (e) {
            dpSupport = false;
          }

          var _DOMTokenList = function (el, prop) {
            var that = this;
            var tokens = [];
            var tokenMap = {};
            var length = 0;
            var maxLength = 0;

            var addIndexGetter = function (i) {
              defineGetter(that, i, function () {
                preop();
                return tokens[i];
              }, false);
            };

            var reindex = function () {
              /** Define getter functions for array-like access to the tokenList's contents. */
              if (length >= maxLength) for (; maxLength < length; ++maxLength) {
                addIndexGetter(maxLength);
              }
            };
            /** Helper function called at the start of each class method. Internal use only. */


            var preop = function () {
              var error;
              var i;
              var args = arguments;
              var rSpace = /\s+/;
              /** Validate the token/s passed to an instance method, if any. */

              if (args.length) for (i = 0; i < args.length; ++i) if (rSpace.test(args[i])) {
                error = new SyntaxError('String "' + args[i] + '" ' + "contains" + ' an invalid character');
                error.code = 5;
                error.name = "InvalidCharacterError";
                throw error;
              }
              /** Split the new value apart by whitespace*/

              if (_typeof(el[prop]) === "object") {
                tokens = ("" + el[prop].baseVal).replace(/^\s+|\s+$/g, "").split(rSpace);
              } else {
                tokens = ("" + el[prop]).replace(/^\s+|\s+$/g, "").split(rSpace);
              }
              /** Avoid treating blank strings as single-item token lists */


              if ("" === tokens[0]) tokens = [];
              /** Repopulate the internal token lists */

              tokenMap = {};

              for (i = 0; i < tokens.length; ++i) tokenMap[tokens[i]] = true;

              length = tokens.length;
              reindex();
            };
            /** Populate our internal token list if the targeted attribute of the subject element isn't empty. */


            preop();
            /** Return the number of tokens in the underlying string. Read-only. */

            defineGetter(that, "length", function () {
              preop();
              return length;
            });
            /** Override the default toString/toLocaleString methods to return a space-delimited list of tokens when typecast. */

            that.toLocaleString = that.toString = function () {
              preop();
              return tokens.join(" ");
            };

            that.item = function (idx) {
              preop();
              return tokens[idx];
            };

            that.contains = function (token) {
              preop();
              return !!tokenMap[token];
            };

            that.add = function () {
              preop.apply(that, args = arguments);

              for (var args, token, i = 0, l = args.length; i < l; ++i) {
                token = args[i];

                if (!tokenMap[token]) {
                  tokens.push(token);
                  tokenMap[token] = true;
                }
              }
              /** Update the targeted attribute of the attached element if the token list's changed. */


              if (length !== tokens.length) {
                length = tokens.length >>> 0;

                if (_typeof(el[prop]) === "object") {
                  el[prop].baseVal = tokens.join(" ");
                } else {
                  el[prop] = tokens.join(" ");
                }

                reindex();
              }
            };

            that.remove = function () {
              preop.apply(that, args = arguments);
              /** Build a hash of token names to compare against when recollecting our token list. */

              for (var args, ignore = {}, i = 0, t = []; i < args.length; ++i) {
                ignore[args[i]] = true;
                delete tokenMap[args[i]];
              }
              /** Run through our tokens list and reassign only those that aren't defined in the hash declared above. */


              for (i = 0; i < tokens.length; ++i) if (!ignore[tokens[i]]) t.push(tokens[i]);

              tokens = t;
              length = t.length >>> 0;
              /** Update the targeted attribute of the attached element. */

              if (_typeof(el[prop]) === "object") {
                el[prop].baseVal = tokens.join(" ");
              } else {
                el[prop] = tokens.join(" ");
              }

              reindex();
            };

            that.toggle = function (token, force) {
              preop.apply(that, [token]);
              /** Token state's being forced. */

              if (undefined !== force) {
                if (force) {
                  that.add(token);
                  return true;
                } else {
                  that.remove(token);
                  return false;
                }
              }
              /** Token already exists in tokenList. Remove it, and return FALSE. */


              if (tokenMap[token]) {
                that.remove(token);
                return false;
              }
              /** Otherwise, add the token and return TRUE. */


              that.add(token);
              return true;
            };

            return that;
          };

          return _DOMTokenList;
        }();
      } // Add second argument to native DOMTokenList.toggle() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.toggle('x', false);
        if (!e.classList.contains('x')) return;

        e.classList.constructor.prototype.toggle = function toggle(token
        /*, force*/
        ) {
          var force = arguments[1];

          if (force === undefined) {
            var add = !this.contains(token);
            this[add ? 'add' : 'remove'](token);
            return add;
          }

          force = !!force;
          this[force ? 'add' : 'remove'](token);
          return force;
        };
      })(); // Add multiple arguments to native DOMTokenList.add() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.add('a', 'b');
        if (e.classList.contains('b')) return;
        var native = e.classList.constructor.prototype.add;

        e.classList.constructor.prototype.add = function () {
          var args = arguments;
          var l = arguments.length;

          for (var i = 0; i < l; i++) {
            native.call(this, args[i]);
          }
        };
      })(); // Add multiple arguments to native DOMTokenList.remove() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.add('a');
        e.classList.add('b');
        e.classList.remove('a', 'b');
        if (!e.classList.contains('b')) return;
        var native = e.classList.constructor.prototype.remove;

        e.classList.constructor.prototype.remove = function () {
          var args = arguments;
          var l = arguments.length;

          for (var i = 0; i < l; i++) {
            native.call(this, args[i]);
          }
        };
      })();
    })(this);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/8717a9e04ac7aff99b4980fbedead98036b0929a/packages/polyfill-library/polyfills/Element/prototype/classList/detect.js
    var detect = 'document' in this && "classList" in document.documentElement && 'Element' in this && 'classList' in Element.prototype && function () {
      var e = document.createElement('span');
      e.classList.add('a', 'b');
      return e.classList.contains('b');
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element.prototype.classList&flags=always

    (function (global) {
      var dpSupport = true;

      var defineGetter = function (object, name, fn, configurable) {
        if (Object.defineProperty) Object.defineProperty(object, name, {
          configurable: false === dpSupport ? true : !!configurable,
          get: fn
        });else object.__defineGetter__(name, fn);
      };
      /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */


      try {
        defineGetter({}, "support");
      } catch (e) {
        dpSupport = false;
      }
      /** Polyfills a property with a DOMTokenList */


      var addProp = function (o, name, attr) {
        defineGetter(o.prototype, name, function () {
          var tokenList;
          var THIS = this,

          /** Prevent this from firing twice for some reason. What the hell, IE. */
          gibberishProperty = "__defineGetter__" + "DEFINE_PROPERTY" + name;
          if (THIS[gibberishProperty]) return tokenList;
          THIS[gibberishProperty] = true;
          /**
           * IE8 can't define properties on native JavaScript objects, so we'll use a dumb hack instead.
           *
           * What this is doing is creating a dummy element ("reflection") inside a detached phantom node ("mirror")
           * that serves as the target of Object.defineProperty instead. While we could simply use the subject HTML
           * element instead, this would conflict with element types which use indexed properties (such as forms and
           * select lists).
           */

          if (false === dpSupport) {
            var visage;
            var mirror = addProp.mirror || document.createElement("div");
            var reflections = mirror.childNodes;
            var l = reflections.length;

            for (var i = 0; i < l; ++i) if (reflections[i]._R === THIS) {
              visage = reflections[i];
              break;
            }
            /** Couldn't find an element's reflection inside the mirror. Materialise one. */


            visage || (visage = mirror.appendChild(document.createElement("div")));
            tokenList = DOMTokenList.call(visage, THIS, attr);
          } else tokenList = new DOMTokenList(THIS, attr);

          defineGetter(THIS, name, function () {
            return tokenList;
          });
          delete THIS[gibberishProperty];
          return tokenList;
        }, true);
      };

      addProp(global.Element, "classList", "className");
      addProp(global.HTMLElement, "classList", "className");
      addProp(global.HTMLLinkElement, "relList", "rel");
      addProp(global.HTMLAnchorElement, "relList", "rel");
      addProp(global.HTMLAreaElement, "relList", "rel");
    })(this);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  /**
   * TODO: Ideally this would be a NodeList.prototype.forEach polyfill
   * This seems to fail in IE8, requires more investigation.
   * See: https://github.com/imagitama/nodelist-foreach-polyfill
   */

  function nodeListForEach(nodes, callback) {
    if (window.NodeList.prototype.forEach) {
      return nodes.forEach(callback);
    }

    for (var i = 0; i < nodes.length; i++) {
      callback.call(window, nodes[i], i, nodes);
    }
  }

  function Checkboxes($module) {
    this.$module = $module;
    this.$inputs = $module.querySelectorAll('input[type="checkbox"]');
  }
  /**
   * Initialise Checkboxes
   *
   * Checkboxes can be associated with a 'conditionally revealed' content block –
   * for example, a checkbox for 'Phone' could reveal an additional form field for
   * the user to enter their phone number.
   *
   * These associations are made using a `data-aria-controls` attribute, which is
   * promoted to an aria-controls attribute during initialisation.
   *
   * We also need to restore the state of any conditional reveals on the page (for
   * example if the user has navigated back), and set up event handlers to keep
   * the reveal in sync with the checkbox state.
   */


  Checkboxes.prototype.init = function () {
    var $module = this.$module;
    var $inputs = this.$inputs;
    nodeListForEach($inputs, function ($input) {
      var target = $input.getAttribute('data-aria-controls'); // Skip checkboxes without data-aria-controls attributes, or where the
      // target element does not exist.

      if (!target || !$module.querySelector('#' + target)) {
        return;
      } // Promote the data-aria-controls attribute to a aria-controls attribute
      // so that the relationship is exposed in the AOM


      $input.setAttribute('aria-controls', target);
      $input.removeAttribute('data-aria-controls');
    }); // When the page is restored after navigating 'back' in some browsers the
    // state of form controls is not restored until *after* the DOMContentLoaded
    // event is fired, so we need to sync after the pageshow event in browsers
    // that support it.

    if ('onpageshow' in window) {
      window.addEventListener('pageshow', this.syncAllConditionalReveals.bind(this));
    } else {
      window.addEventListener('DOMContentLoaded', this.syncAllConditionalReveals.bind(this));
    } // Although we've set up handlers to sync state on the pageshow or
    // DOMContentLoaded event, init could be called after those events have fired,
    // for example if they are added to the page dynamically, so sync now too.


    this.syncAllConditionalReveals();
    $module.addEventListener('click', this.handleClick.bind(this));
  };
  /**
   * Sync the conditional reveal states for all inputs in this $module.
   */


  Checkboxes.prototype.syncAllConditionalReveals = function () {
    nodeListForEach(this.$inputs, this.syncConditionalRevealWithInputState.bind(this));
  };
  /**
   * Sync conditional reveal with the input state
   *
   * Synchronise the visibility of the conditional reveal, and its accessible
   * state, with the input's checked state.
   *
   * @param {HTMLInputElement} $input Checkbox input
   */


  Checkboxes.prototype.syncConditionalRevealWithInputState = function ($input) {
    var $target = this.$module.querySelector('#' + $input.getAttribute('aria-controls'));

    if ($target && $target.classList.contains('govuk-checkboxes__conditional')) {
      var inputIsChecked = $input.checked;
      $input.setAttribute('aria-expanded', inputIsChecked);
      $target.classList.toggle('govuk-checkboxes__conditional--hidden', !inputIsChecked);
    }
  };
  /**
   * Uncheck other checkboxes
   *
   * Find any other checkbox inputs with the same name value, and uncheck them.
   * This is useful for when a “None of these" checkbox is checked.
   */


  Checkboxes.prototype.unCheckAllInputsExcept = function ($input) {
    var allInputsWithSameName = document.querySelectorAll('input[type="checkbox"][name="' + $input.name + '"]');
    nodeListForEach(allInputsWithSameName, function ($inputWithSameName) {
      var hasSameFormOwner = $input.form === $inputWithSameName.form;

      if (hasSameFormOwner && $inputWithSameName !== $input) {
        $inputWithSameName.checked = false;
      }
    });
    this.syncAllConditionalReveals();
  };
  /**
   * Uncheck exclusive inputs
   *
   * Find any checkbox inputs with the same name value and the 'exclusive' behaviour,
   * and uncheck them. This helps prevent someone checking both a regular checkbox and a
   * "None of these" checkbox in the same fieldset.
   */


  Checkboxes.prototype.unCheckExclusiveInputs = function ($input) {
    var allInputsWithSameNameAndExclusiveBehaviour = document.querySelectorAll('input[data-behaviour="exclusive"][type="checkbox"][name="' + $input.name + '"]');
    nodeListForEach(allInputsWithSameNameAndExclusiveBehaviour, function ($exclusiveInput) {
      var hasSameFormOwner = $input.form === $exclusiveInput.form;

      if (hasSameFormOwner) {
        $exclusiveInput.checked = false;
      }
    });
    this.syncAllConditionalReveals();
  };
  /**
   * Click event handler
   *
   * Handle a click within the $module – if the click occurred on a checkbox, sync
   * the state of any associated conditional reveal with the checkbox state.
   *
   * @param {MouseEvent} event Click event
   */


  Checkboxes.prototype.handleClick = function (event) {
    var $target = event.target; // Ignore clicks on things that aren't checkbox inputs

    if ($target.type !== 'checkbox') {
      return;
    } // If the checkbox conditionally-reveals some content, sync the state


    var hasAriaControls = $target.getAttribute('aria-controls');

    if (hasAriaControls) {
      this.syncConditionalRevealWithInputState($target);
    } // No further behaviour needed for unchecking


    if (!$target.checked) {
      return;
    } // Handle 'exclusive' checkbox behaviour (ie "None of these")


    var hasBehaviourExclusive = $target.getAttribute('data-behaviour') === 'exclusive';

    if (hasBehaviourExclusive) {
      this.unCheckAllInputsExcept($target);
    } else {
      this.unCheckExclusiveInputs($target);
    }
  };

  return Checkboxes;
});
},{}],"../node_modules/lbh-frontend/lbh/components/lbh-checkboxes/checkboxes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _checkboxes = _interopRequireDefault(require("govuk-frontend/govuk/components/checkboxes/checkboxes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _checkboxes.default;
exports.default = _default;
},{"govuk-frontend/govuk/components/checkboxes/checkboxes":"../node_modules/govuk-frontend/govuk/components/checkboxes/checkboxes.js"}],"../node_modules/lbh-frontend/lbh/components/lbh-cookie-banner/cookie-banner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var COOKIE_NAME = 'seen_cookie_message'; // Set to false to allow testing so that the cookie is never set

var DROP_COOKIE = window.dropCookie === undefined ? true : window.dropCookie;

function CookieBanner($module) {
  this.$module = $module;
  this.$button = this.$module.querySelector('[data-behavior="lbh-cookie-close"]');
}

CookieBanner.prototype.checkCookies = function () {
  var nameEQ = COOKIE_NAME + '=';
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
};

CookieBanner.prototype.showCookieBanner = function () {
  this.$module.style.display = 'block';
  this.bindAcceptButton();
};

CookieBanner.prototype.bindAcceptButton = function () {
  var _module = this.$module;
  this.$button.addEventListener('click', function () {
    var date = new Date();
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
    var expires = '; expires=' + date.toGMTString();

    if (DROP_COOKIE) {
      document.cookie = COOKIE_NAME + '=true' + expires + '; path=/';
    }

    _module.style.display = 'none';
  });
};

CookieBanner.prototype.init = function () {
  if (!this.$module) {
    return false;
  }

  var seenCookie = this.checkCookies();

  if (seenCookie === 'true') {
    return false;
  } else {
    this.showCookieBanner();
  }
};

var _default = CookieBanner;
exports.default = _default;
},{}],"../node_modules/govuk-frontend/govuk/components/details/details.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('GOVUKFrontend', factory) : global.GOVUKFrontend = factory();
})(this, function () {
  'use strict';

  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
    var detect = // In IE8, defineProperty could only act on DOM elements, so full support
    // for the feature requires the ability to set a property on an arbitrary object
    'defineProperty' in Object && function () {
      try {
        var a = {};
        Object.defineProperty(a, 'test', {
          value: 42
        });
        return true;
      } catch (e) {
        return false;
      }
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always

    (function (nativeDefineProperty) {
      var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
      var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
      var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

      Object.defineProperty = function defineProperty(object, property, descriptor) {
        // Where native support exists, assume it
        if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
          return nativeDefineProperty(object, property, descriptor);
        }

        if (object === null || !(object instanceof Object || _typeof(object) === 'object')) {
          throw new TypeError('Object.defineProperty called on non-object');
        }

        if (!(descriptor instanceof Object)) {
          throw new TypeError('Property description must be an object');
        }

        var propertyString = String(property);
        var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;

        var getterType = 'get' in descriptor && _typeof(descriptor.get);

        var setterType = 'set' in descriptor && _typeof(descriptor.set); // handle descriptor.get


        if (getterType) {
          if (getterType !== 'function') {
            throw new TypeError('Getter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineGetter__.call(object, propertyString, descriptor.get);
        } else {
          object[propertyString] = descriptor.value;
        } // handle descriptor.set


        if (setterType) {
          if (setterType !== 'function') {
            throw new TypeError('Setter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineSetter__.call(object, propertyString, descriptor.set);
        } // OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above


        if ('value' in descriptor) {
          object[propertyString] = descriptor.value;
        }

        return object;
      };
    })(Object.defineProperty);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Function/prototype/bind/detect.js
    var detect = ('bind' in Function.prototype);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Function.prototype.bind&flags=always

    Object.defineProperty(Function.prototype, 'bind', {
      value: function bind(that) {
        // .length is 1
        // add necessary es5-shim utilities
        var $Array = Array;
        var $Object = Object;
        var ObjectPrototype = $Object.prototype;
        var ArrayPrototype = $Array.prototype;

        var Empty = function Empty() {};

        var to_string = ObjectPrototype.toString;
        var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
        var isCallable;
        /* inlined from https://npmjs.com/is-callable */

        var fnToStr = Function.prototype.toString,
            tryFunctionObject = function tryFunctionObject(value) {
          try {
            fnToStr.call(value);
            return true;
          } catch (e) {
            return false;
          }
        },
            fnClass = '[object Function]',
            genClass = '[object GeneratorFunction]';

        isCallable = function isCallable(value) {
          if (typeof value !== 'function') {
            return false;
          }

          if (hasToStringTag) {
            return tryFunctionObject(value);
          }

          var strClass = to_string.call(value);
          return strClass === fnClass || strClass === genClass;
        };

        var array_slice = ArrayPrototype.slice;
        var array_concat = ArrayPrototype.concat;
        var array_push = ArrayPrototype.push;
        var max = Math.max; // /add necessary es5-shim utilities
        // 1. Let Target be the this value.

        var target = this; // 2. If IsCallable(Target) is false, throw a TypeError exception.

        if (!isCallable(target)) {
          throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        } // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used


        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.

        var bound;

        var binder = function () {
          if (this instanceof bound) {
            // 15.3.4.5.2 [[Construct]]
            // When the [[Construct]] internal method of a function object,
            // F that was created using the bind function is called with a
            // list of arguments ExtraArgs, the following steps are taken:
            // 1. Let target be the value of F's [[TargetFunction]]
            //   internal property.
            // 2. If target has no [[Construct]] internal method, a
            //   TypeError exception is thrown.
            // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Construct]] internal
            //   method of target providing args as the arguments.
            var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));

            if ($Object(result) === result) {
              return result;
            }

            return this;
          } else {
            // 15.3.4.5.1 [[Call]]
            // When the [[Call]] internal method of a function object, F,
            // which was created using the bind function is called with a
            // this value and a list of arguments ExtraArgs, the following
            // steps are taken:
            // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 2. Let boundThis be the value of F's [[BoundThis]] internal
            //   property.
            // 3. Let target be the value of F's [[TargetFunction]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Call]] internal method
            //   of target providing boundThis as the this value and
            //   providing args as the arguments.
            // equiv: target.call(this, ...boundArgs, ...args)
            return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
          }
        }; // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.


        var boundLength = max(0, target.length - args.length); // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.

        var boundArgs = [];

        for (var i = 0; i < boundLength; i++) {
          array_push.call(boundArgs, '$' + i);
        } // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.


        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
          Empty.prototype = target.prototype;
          bound.prototype = new Empty(); // Clean up dangling references.

          Empty.prototype = null;
        } // TODO
        // 18. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.
        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.
        // 22. Return F.


        return bound;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Window/detect.js
    var detect = ('Window' in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Window&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      (function (global) {
        if (global.constructor) {
          global.Window = global.constructor;
        } else {
          (global.Window = global.constructor = new Function('return function Window() {}')()).prototype = this;
        }
      })(this);
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Document/detect.js
    var detect = ("Document" in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Document&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      if (this.HTMLDocument) {
        // IE8
        // HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
        this.Document = this.HTMLDocument;
      } else {
        // Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
        this.Document = this.HTMLDocument = document.constructor = new Function('return function Document() {}')();
        this.Document.prototype = document;
      }
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Element/detect.js
    var detect = 'Element' in this && 'HTMLElement' in this;
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element&flags=always

    (function () {
      // IE8
      if (window.Element && !window.HTMLElement) {
        window.HTMLElement = window.Element;
        return;
      } // create Element constructor


      window.Element = window.HTMLElement = new Function('return function Element() {}')(); // generate sandboxed iframe

      var vbody = document.appendChild(document.createElement('body'));
      var frame = vbody.appendChild(document.createElement('iframe')); // use sandboxed iframe to replicate Element functionality

      var frameDocument = frame.contentWindow.document;
      var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
      var cache = {}; // polyfill Element.prototype on an element

      var shiv = function (element, deep) {
        var childNodes = element.childNodes || [],
            index = -1,
            key,
            value,
            childNode;

        if (element.nodeType === 1 && element.constructor !== Element) {
          element.constructor = Element;

          for (key in cache) {
            value = cache[key];
            element[key] = value;
          }
        }

        while (childNode = deep && childNodes[++index]) {
          shiv(childNode, deep);
        }

        return element;
      };

      var elements = document.getElementsByTagName('*');
      var nativeCreateElement = document.createElement;
      var interval;
      var loopLimit = 100;
      prototype.attachEvent('onpropertychange', function (event) {
        var propertyName = event.propertyName,
            nonValue = !cache.hasOwnProperty(propertyName),
            newValue = prototype[propertyName],
            oldValue = cache[propertyName],
            index = -1,
            element;

        while (element = elements[++index]) {
          if (element.nodeType === 1) {
            if (nonValue || element[propertyName] === oldValue) {
              element[propertyName] = newValue;
            }
          }
        }

        cache[propertyName] = newValue;
      });
      prototype.constructor = Element;

      if (!prototype.hasAttribute) {
        // <Element>.hasAttribute
        prototype.hasAttribute = function hasAttribute(name) {
          return this.getAttribute(name) !== null;
        };
      } // Apply Element prototype to the pre-existing DOM as soon as the body element appears.


      function bodyCheck() {
        if (!loopLimit--) clearTimeout(interval);

        if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
          shiv(document, true);
          if (interval && document.body.prototype) clearTimeout(interval);
          return !!document.body.prototype;
        }

        return false;
      }

      if (!bodyCheck()) {
        document.onreadystatechange = bodyCheck;
        interval = setInterval(bodyCheck, 25);
      } // Apply to any new elements created after load


      document.createElement = function createElement(nodeName) {
        var element = nativeCreateElement(String(nodeName).toLowerCase());
        return shiv(element);
      }; // remove sandboxed iframe


      document.removeChild(vbody);
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Event/detect.js
    var detect = function (global) {
      if (!('Event' in global)) return false;
      if (typeof global.Event === 'function') return true;

      try {
        // In IE 9-11, the Event object exists but cannot be instantiated
        new Event('click');
        return true;
      } catch (e) {
        return false;
      }
    }(this);

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Event&flags=always

    (function () {
      var unlistenableWindowEvents = {
        click: 1,
        dblclick: 1,
        keyup: 1,
        keypress: 1,
        keydown: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1,
        mouseover: 1,
        mouseenter: 1,
        mouseleave: 1,
        mouseout: 1,
        storage: 1,
        storagecommit: 1,
        textinput: 1
      }; // This polyfill depends on availability of `document` so will not run in a worker
      // However, we asssume there are no browsers with worker support that lack proper
      // support for `Event` within the worker

      if (typeof document === 'undefined' || typeof window === 'undefined') return;

      function indexOf(array, element) {
        var index = -1,
            length = array.length;

        while (++index < length) {
          if (index in array && array[index] === element) {
            return index;
          }
        }

        return -1;
      }

      var existingProto = window.Event && window.Event.prototype || null;

      window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
        if (!type) {
          throw new Error('Not enough arguments');
        }

        var event; // Shortcut if browser supports createEvent

        if ('createEvent' in document) {
          event = document.createEvent('Event');
          var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
          var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
          event.initEvent(type, bubbles, cancelable);
          return event;
        }

        event = document.createEventObject();
        event.type = type;
        event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
        event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
        return event;
      };

      if (existingProto) {
        Object.defineProperty(window.Event, 'prototype', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: existingProto
        });
      }

      if (!('createEvent' in document)) {
        window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1];

          if (element === window && type in unlistenableWindowEvents) {
            throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
          }

          if (!element._events) {
            element._events = {};
          }

          if (!element._events[type]) {
            element._events[type] = function (event) {
              var list = element._events[event.type].list,
                  events = list.slice(),
                  index = -1,
                  length = events.length,
                  eventElement;

              event.preventDefault = function preventDefault() {
                if (event.cancelable !== false) {
                  event.returnValue = false;
                }
              };

              event.stopPropagation = function stopPropagation() {
                event.cancelBubble = true;
              };

              event.stopImmediatePropagation = function stopImmediatePropagation() {
                event.cancelBubble = true;
                event.cancelImmediate = true;
              };

              event.currentTarget = element;
              event.relatedTarget = event.fromElement || null;
              event.target = event.target || event.srcElement || element;
              event.timeStamp = new Date().getTime();

              if (event.clientX) {
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
              }

              while (++index < length && !event.cancelImmediate) {
                if (index in events) {
                  eventElement = events[index];

                  if (indexOf(list, eventElement) !== -1 && typeof eventElement === 'function') {
                    eventElement.call(element, event);
                  }
                }
              }
            };

            element._events[type].list = [];

            if (element.attachEvent) {
              element.attachEvent('on' + type, element._events[type]);
            }
          }

          element._events[type].list.push(listener);
        };

        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1],
              index;

          if (element._events && element._events[type] && element._events[type].list) {
            index = indexOf(element._events[type].list, listener);

            if (index !== -1) {
              element._events[type].list.splice(index, 1);

              if (!element._events[type].list.length) {
                if (element.detachEvent) {
                  element.detachEvent('on' + type, element._events[type]);
                }

                delete element._events[type];
              }
            }
          }
        };

        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
          if (!arguments.length) {
            throw new Error('Not enough arguments');
          }

          if (!event || typeof event.type !== 'string') {
            throw new Error('DOM Events Exception 0');
          }

          var element = this,
              type = event.type;

          try {
            if (!event.bubbles) {
              event.cancelBubble = true;

              var cancelBubbleEvent = function (event) {
                event.cancelBubble = true;
                (element || window).detachEvent('on' + type, cancelBubbleEvent);
              };

              this.attachEvent('on' + type, cancelBubbleEvent);
            }

            this.fireEvent('on' + type, event);
          } catch (error) {
            event.target = element;

            do {
              event.currentTarget = element;

              if ('_events' in element && typeof element._events[type] === 'function') {
                element._events[type].call(element, event);
              }

              if (typeof element['on' + type] === 'function') {
                element['on' + type].call(element, event);
              }

              element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
            } while (element && !event.cancelBubble);
          }

          return true;
        }; // Add the DOMContentLoaded Event


        document.attachEvent('onreadystatechange', function () {
          if (document.readyState === 'complete') {
            document.dispatchEvent(new Event('DOMContentLoaded', {
              bubbles: true
            }));
          }
        });
      }
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  /**
   * TODO: Ideally this would be a NodeList.prototype.forEach polyfill
   * This seems to fail in IE8, requires more investigation.
   * See: https://github.com/imagitama/nodelist-foreach-polyfill
   */
  // Used to generate a unique string, allows multiple instances of the component without
  // Them conflicting with each other.
  // https://stackoverflow.com/a/8809472

  function generateUniqueID() {
    var d = new Date().getTime();

    if (typeof window.performance !== 'undefined' && typeof window.performance.now === 'function') {
      d += window.performance.now(); // use high-precision timer if available
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
  }
  /**
   * JavaScript 'polyfill' for HTML5's <details> and <summary> elements
   * and 'shim' to add accessiblity enhancements for all browsers
   *
   * http://caniuse.com/#feat=details
   */


  var KEY_ENTER = 13;
  var KEY_SPACE = 32;

  function Details($module) {
    this.$module = $module;
  }

  Details.prototype.init = function () {
    if (!this.$module) {
      return;
    } // If there is native details support, we want to avoid running code to polyfill native behaviour.


    var hasNativeDetails = typeof this.$module.open === 'boolean';

    if (hasNativeDetails) {
      return;
    }

    this.polyfillDetails();
  };

  Details.prototype.polyfillDetails = function () {
    var $module = this.$module; // Save shortcuts to the inner summary and content elements

    var $summary = this.$summary = $module.getElementsByTagName('summary').item(0);
    var $content = this.$content = $module.getElementsByTagName('div').item(0); // If <details> doesn't have a <summary> and a <div> representing the content
    // it means the required HTML structure is not met so the script will stop

    if (!$summary || !$content) {
      return;
    } // If the content doesn't have an ID, assign it one now
    // which we'll need for the summary's aria-controls assignment


    if (!$content.id) {
      $content.id = 'details-content-' + generateUniqueID();
    } // Add ARIA role="group" to details


    $module.setAttribute('role', 'group'); // Add role=button to summary

    $summary.setAttribute('role', 'button'); // Add aria-controls

    $summary.setAttribute('aria-controls', $content.id); // Set tabIndex so the summary is keyboard accessible for non-native elements
    //
    // We have to use the camelcase `tabIndex` property as there is a bug in IE6/IE7 when we set the correct attribute lowercase:
    // See http://web.archive.org/web/20170120194036/http://www.saliences.com/browserBugs/tabIndex.html for more information.

    $summary.tabIndex = 0; // Detect initial open state

    var openAttr = $module.getAttribute('open') !== null;

    if (openAttr === true) {
      $summary.setAttribute('aria-expanded', 'true');
      $content.setAttribute('aria-hidden', 'false');
    } else {
      $summary.setAttribute('aria-expanded', 'false');
      $content.setAttribute('aria-hidden', 'true');
      $content.style.display = 'none';
    } // Bind an event to handle summary elements


    this.polyfillHandleInputs($summary, this.polyfillSetAttributes.bind(this));
  };
  /**
  * Define a statechange function that updates aria-expanded and style.display
  * @param {object} summary element
  */


  Details.prototype.polyfillSetAttributes = function () {
    var $module = this.$module;
    var $summary = this.$summary;
    var $content = this.$content;
    var expanded = $summary.getAttribute('aria-expanded') === 'true';
    var hidden = $content.getAttribute('aria-hidden') === 'true';
    $summary.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    $content.setAttribute('aria-hidden', hidden ? 'false' : 'true');
    $content.style.display = expanded ? 'none' : '';
    var hasOpenAttr = $module.getAttribute('open') !== null;

    if (!hasOpenAttr) {
      $module.setAttribute('open', 'open');
    } else {
      $module.removeAttribute('open');
    }

    return true;
  };
  /**
  * Handle cross-modal click events
  * @param {object} node element
  * @param {function} callback function
  */


  Details.prototype.polyfillHandleInputs = function (node, callback) {
    node.addEventListener('keypress', function (event) {
      var target = event.target; // When the key gets pressed - check if it is enter or space

      if (event.keyCode === KEY_ENTER || event.keyCode === KEY_SPACE) {
        if (target.nodeName.toLowerCase() === 'summary') {
          // Prevent space from scrolling the page
          // and enter from submitting a form
          event.preventDefault(); // Click to let the click event do all the necessary action

          if (target.click) {
            target.click();
          } else {
            // except Safari 5.1 and under don't support .click() here
            callback(event);
          }
        }
      }
    }); // Prevent keyup to prevent clicking twice in Firefox when using space key

    node.addEventListener('keyup', function (event) {
      var target = event.target;

      if (event.keyCode === KEY_SPACE) {
        if (target.nodeName.toLowerCase() === 'summary') {
          event.preventDefault();
        }
      }
    });
    node.addEventListener('click', callback);
  };

  return Details;
});
},{}],"../node_modules/lbh-frontend/lbh/components/lbh-details/details.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _details = _interopRequireDefault(require("govuk-frontend/govuk/components/details/details"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _details.default;
exports.default = _default;
},{"govuk-frontend/govuk/components/details/details":"../node_modules/govuk-frontend/govuk/components/details/details.js"}],"../node_modules/govuk-frontend/govuk/components/error-summary/error-summary.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('GOVUKFrontend', factory) : global.GOVUKFrontend = factory();
})(this, function () {
  'use strict';

  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
    var detect = // In IE8, defineProperty could only act on DOM elements, so full support
    // for the feature requires the ability to set a property on an arbitrary object
    'defineProperty' in Object && function () {
      try {
        var a = {};
        Object.defineProperty(a, 'test', {
          value: 42
        });
        return true;
      } catch (e) {
        return false;
      }
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always

    (function (nativeDefineProperty) {
      var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
      var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
      var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

      Object.defineProperty = function defineProperty(object, property, descriptor) {
        // Where native support exists, assume it
        if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
          return nativeDefineProperty(object, property, descriptor);
        }

        if (object === null || !(object instanceof Object || _typeof(object) === 'object')) {
          throw new TypeError('Object.defineProperty called on non-object');
        }

        if (!(descriptor instanceof Object)) {
          throw new TypeError('Property description must be an object');
        }

        var propertyString = String(property);
        var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;

        var getterType = 'get' in descriptor && _typeof(descriptor.get);

        var setterType = 'set' in descriptor && _typeof(descriptor.set); // handle descriptor.get


        if (getterType) {
          if (getterType !== 'function') {
            throw new TypeError('Getter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineGetter__.call(object, propertyString, descriptor.get);
        } else {
          object[propertyString] = descriptor.value;
        } // handle descriptor.set


        if (setterType) {
          if (setterType !== 'function') {
            throw new TypeError('Setter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineSetter__.call(object, propertyString, descriptor.set);
        } // OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above


        if ('value' in descriptor) {
          object[propertyString] = descriptor.value;
        }

        return object;
      };
    })(Object.defineProperty);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Function/prototype/bind/detect.js
    var detect = ('bind' in Function.prototype);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Function.prototype.bind&flags=always

    Object.defineProperty(Function.prototype, 'bind', {
      value: function bind(that) {
        // .length is 1
        // add necessary es5-shim utilities
        var $Array = Array;
        var $Object = Object;
        var ObjectPrototype = $Object.prototype;
        var ArrayPrototype = $Array.prototype;

        var Empty = function Empty() {};

        var to_string = ObjectPrototype.toString;
        var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
        var isCallable;
        /* inlined from https://npmjs.com/is-callable */

        var fnToStr = Function.prototype.toString,
            tryFunctionObject = function tryFunctionObject(value) {
          try {
            fnToStr.call(value);
            return true;
          } catch (e) {
            return false;
          }
        },
            fnClass = '[object Function]',
            genClass = '[object GeneratorFunction]';

        isCallable = function isCallable(value) {
          if (typeof value !== 'function') {
            return false;
          }

          if (hasToStringTag) {
            return tryFunctionObject(value);
          }

          var strClass = to_string.call(value);
          return strClass === fnClass || strClass === genClass;
        };

        var array_slice = ArrayPrototype.slice;
        var array_concat = ArrayPrototype.concat;
        var array_push = ArrayPrototype.push;
        var max = Math.max; // /add necessary es5-shim utilities
        // 1. Let Target be the this value.

        var target = this; // 2. If IsCallable(Target) is false, throw a TypeError exception.

        if (!isCallable(target)) {
          throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        } // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used


        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.

        var bound;

        var binder = function () {
          if (this instanceof bound) {
            // 15.3.4.5.2 [[Construct]]
            // When the [[Construct]] internal method of a function object,
            // F that was created using the bind function is called with a
            // list of arguments ExtraArgs, the following steps are taken:
            // 1. Let target be the value of F's [[TargetFunction]]
            //   internal property.
            // 2. If target has no [[Construct]] internal method, a
            //   TypeError exception is thrown.
            // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Construct]] internal
            //   method of target providing args as the arguments.
            var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));

            if ($Object(result) === result) {
              return result;
            }

            return this;
          } else {
            // 15.3.4.5.1 [[Call]]
            // When the [[Call]] internal method of a function object, F,
            // which was created using the bind function is called with a
            // this value and a list of arguments ExtraArgs, the following
            // steps are taken:
            // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 2. Let boundThis be the value of F's [[BoundThis]] internal
            //   property.
            // 3. Let target be the value of F's [[TargetFunction]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Call]] internal method
            //   of target providing boundThis as the this value and
            //   providing args as the arguments.
            // equiv: target.call(this, ...boundArgs, ...args)
            return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
          }
        }; // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.


        var boundLength = max(0, target.length - args.length); // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.

        var boundArgs = [];

        for (var i = 0; i < boundLength; i++) {
          array_push.call(boundArgs, '$' + i);
        } // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.


        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
          Empty.prototype = target.prototype;
          bound.prototype = new Empty(); // Clean up dangling references.

          Empty.prototype = null;
        } // TODO
        // 18. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.
        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.
        // 22. Return F.


        return bound;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Window/detect.js
    var detect = ('Window' in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Window&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      (function (global) {
        if (global.constructor) {
          global.Window = global.constructor;
        } else {
          (global.Window = global.constructor = new Function('return function Window() {}')()).prototype = this;
        }
      })(this);
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Document/detect.js
    var detect = ("Document" in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Document&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      if (this.HTMLDocument) {
        // IE8
        // HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
        this.Document = this.HTMLDocument;
      } else {
        // Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
        this.Document = this.HTMLDocument = document.constructor = new Function('return function Document() {}')();
        this.Document.prototype = document;
      }
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Element/detect.js
    var detect = 'Element' in this && 'HTMLElement' in this;
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element&flags=always

    (function () {
      // IE8
      if (window.Element && !window.HTMLElement) {
        window.HTMLElement = window.Element;
        return;
      } // create Element constructor


      window.Element = window.HTMLElement = new Function('return function Element() {}')(); // generate sandboxed iframe

      var vbody = document.appendChild(document.createElement('body'));
      var frame = vbody.appendChild(document.createElement('iframe')); // use sandboxed iframe to replicate Element functionality

      var frameDocument = frame.contentWindow.document;
      var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
      var cache = {}; // polyfill Element.prototype on an element

      var shiv = function (element, deep) {
        var childNodes = element.childNodes || [],
            index = -1,
            key,
            value,
            childNode;

        if (element.nodeType === 1 && element.constructor !== Element) {
          element.constructor = Element;

          for (key in cache) {
            value = cache[key];
            element[key] = value;
          }
        }

        while (childNode = deep && childNodes[++index]) {
          shiv(childNode, deep);
        }

        return element;
      };

      var elements = document.getElementsByTagName('*');
      var nativeCreateElement = document.createElement;
      var interval;
      var loopLimit = 100;
      prototype.attachEvent('onpropertychange', function (event) {
        var propertyName = event.propertyName,
            nonValue = !cache.hasOwnProperty(propertyName),
            newValue = prototype[propertyName],
            oldValue = cache[propertyName],
            index = -1,
            element;

        while (element = elements[++index]) {
          if (element.nodeType === 1) {
            if (nonValue || element[propertyName] === oldValue) {
              element[propertyName] = newValue;
            }
          }
        }

        cache[propertyName] = newValue;
      });
      prototype.constructor = Element;

      if (!prototype.hasAttribute) {
        // <Element>.hasAttribute
        prototype.hasAttribute = function hasAttribute(name) {
          return this.getAttribute(name) !== null;
        };
      } // Apply Element prototype to the pre-existing DOM as soon as the body element appears.


      function bodyCheck() {
        if (!loopLimit--) clearTimeout(interval);

        if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
          shiv(document, true);
          if (interval && document.body.prototype) clearTimeout(interval);
          return !!document.body.prototype;
        }

        return false;
      }

      if (!bodyCheck()) {
        document.onreadystatechange = bodyCheck;
        interval = setInterval(bodyCheck, 25);
      } // Apply to any new elements created after load


      document.createElement = function createElement(nodeName) {
        var element = nativeCreateElement(String(nodeName).toLowerCase());
        return shiv(element);
      }; // remove sandboxed iframe


      document.removeChild(vbody);
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Event/detect.js
    var detect = function (global) {
      if (!('Event' in global)) return false;
      if (typeof global.Event === 'function') return true;

      try {
        // In IE 9-11, the Event object exists but cannot be instantiated
        new Event('click');
        return true;
      } catch (e) {
        return false;
      }
    }(this);

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Event&flags=always

    (function () {
      var unlistenableWindowEvents = {
        click: 1,
        dblclick: 1,
        keyup: 1,
        keypress: 1,
        keydown: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1,
        mouseover: 1,
        mouseenter: 1,
        mouseleave: 1,
        mouseout: 1,
        storage: 1,
        storagecommit: 1,
        textinput: 1
      }; // This polyfill depends on availability of `document` so will not run in a worker
      // However, we asssume there are no browsers with worker support that lack proper
      // support for `Event` within the worker

      if (typeof document === 'undefined' || typeof window === 'undefined') return;

      function indexOf(array, element) {
        var index = -1,
            length = array.length;

        while (++index < length) {
          if (index in array && array[index] === element) {
            return index;
          }
        }

        return -1;
      }

      var existingProto = window.Event && window.Event.prototype || null;

      window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
        if (!type) {
          throw new Error('Not enough arguments');
        }

        var event; // Shortcut if browser supports createEvent

        if ('createEvent' in document) {
          event = document.createEvent('Event');
          var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
          var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
          event.initEvent(type, bubbles, cancelable);
          return event;
        }

        event = document.createEventObject();
        event.type = type;
        event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
        event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
        return event;
      };

      if (existingProto) {
        Object.defineProperty(window.Event, 'prototype', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: existingProto
        });
      }

      if (!('createEvent' in document)) {
        window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1];

          if (element === window && type in unlistenableWindowEvents) {
            throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
          }

          if (!element._events) {
            element._events = {};
          }

          if (!element._events[type]) {
            element._events[type] = function (event) {
              var list = element._events[event.type].list,
                  events = list.slice(),
                  index = -1,
                  length = events.length,
                  eventElement;

              event.preventDefault = function preventDefault() {
                if (event.cancelable !== false) {
                  event.returnValue = false;
                }
              };

              event.stopPropagation = function stopPropagation() {
                event.cancelBubble = true;
              };

              event.stopImmediatePropagation = function stopImmediatePropagation() {
                event.cancelBubble = true;
                event.cancelImmediate = true;
              };

              event.currentTarget = element;
              event.relatedTarget = event.fromElement || null;
              event.target = event.target || event.srcElement || element;
              event.timeStamp = new Date().getTime();

              if (event.clientX) {
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
              }

              while (++index < length && !event.cancelImmediate) {
                if (index in events) {
                  eventElement = events[index];

                  if (indexOf(list, eventElement) !== -1 && typeof eventElement === 'function') {
                    eventElement.call(element, event);
                  }
                }
              }
            };

            element._events[type].list = [];

            if (element.attachEvent) {
              element.attachEvent('on' + type, element._events[type]);
            }
          }

          element._events[type].list.push(listener);
        };

        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1],
              index;

          if (element._events && element._events[type] && element._events[type].list) {
            index = indexOf(element._events[type].list, listener);

            if (index !== -1) {
              element._events[type].list.splice(index, 1);

              if (!element._events[type].list.length) {
                if (element.detachEvent) {
                  element.detachEvent('on' + type, element._events[type]);
                }

                delete element._events[type];
              }
            }
          }
        };

        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
          if (!arguments.length) {
            throw new Error('Not enough arguments');
          }

          if (!event || typeof event.type !== 'string') {
            throw new Error('DOM Events Exception 0');
          }

          var element = this,
              type = event.type;

          try {
            if (!event.bubbles) {
              event.cancelBubble = true;

              var cancelBubbleEvent = function (event) {
                event.cancelBubble = true;
                (element || window).detachEvent('on' + type, cancelBubbleEvent);
              };

              this.attachEvent('on' + type, cancelBubbleEvent);
            }

            this.fireEvent('on' + type, event);
          } catch (error) {
            event.target = element;

            do {
              event.currentTarget = element;

              if ('_events' in element && typeof element._events[type] === 'function') {
                element._events[type].call(element, event);
              }

              if (typeof element['on' + type] === 'function') {
                element['on' + type].call(element, event);
              }

              element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
            } while (element && !event.cancelBubble);
          }

          return true;
        }; // Add the DOMContentLoaded Event


        document.attachEvent('onreadystatechange', function () {
          if (document.readyState === 'complete') {
            document.dispatchEvent(new Event('DOMContentLoaded', {
              bubbles: true
            }));
          }
        });
      }
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/1f3c09b402f65bf6e393f933a15ba63f1b86ef1f/packages/polyfill-library/polyfills/Element/prototype/matches/detect.js
    var detect = 'document' in this && "matches" in document.documentElement;
    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/1f3c09b402f65bf6e393f933a15ba63f1b86ef1f/packages/polyfill-library/polyfills/Element/prototype/matches/polyfill.js

    Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function matches(selector) {
      var element = this;
      var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      var index = 0;

      while (elements[index] && elements[index] !== element) {
        ++index;
      }

      return !!elements[index];
    };
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/1f3c09b402f65bf6e393f933a15ba63f1b86ef1f/packages/polyfill-library/polyfills/Element/prototype/closest/detect.js
    var detect = 'document' in this && "closest" in document.documentElement;
    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/1f3c09b402f65bf6e393f933a15ba63f1b86ef1f/packages/polyfill-library/polyfills/Element/prototype/closest/polyfill.js

    Element.prototype.closest = function closest(selector) {
      var node = this;

      while (node) {
        if (node.matches(selector)) return node;else node = 'SVGElement' in window && node instanceof SVGElement ? node.parentNode : node.parentElement;
      }

      return null;
    };
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});

  function ErrorSummary($module) {
    this.$module = $module;
  }

  ErrorSummary.prototype.init = function () {
    var $module = this.$module;

    if (!$module) {
      return;
    }

    $module.focus();
    $module.addEventListener('click', this.handleClick.bind(this));
  };
  /**
  * Click event handler
  *
  * @param {MouseEvent} event - Click event
  */


  ErrorSummary.prototype.handleClick = function (event) {
    var target = event.target;

    if (this.focusTarget(target)) {
      event.preventDefault();
    }
  };
  /**
   * Focus the target element
   *
   * By default, the browser will scroll the target into view. Because our labels
   * or legends appear above the input, this means the user will be presented with
   * an input without any context, as the label or legend will be off the top of
   * the screen.
   *
   * Manually handling the click event, scrolling the question into view and then
   * focussing the element solves this.
   *
   * This also results in the label and/or legend being announced correctly in
   * NVDA (as tested in 2018.3.2) - without this only the field type is announced
   * (e.g. "Edit, has autocomplete").
   *
   * @param {HTMLElement} $target - Event target
   * @returns {boolean} True if the target was able to be focussed
   */


  ErrorSummary.prototype.focusTarget = function ($target) {
    // If the element that was clicked was not a link, return early
    if ($target.tagName !== 'A' || $target.href === false) {
      return false;
    }

    var inputId = this.getFragmentFromUrl($target.href);
    var $input = document.getElementById(inputId);

    if (!$input) {
      return false;
    }

    var $legendOrLabel = this.getAssociatedLegendOrLabel($input);

    if (!$legendOrLabel) {
      return false;
    } // Scroll the legend or label into view *before* calling focus on the input to
    // avoid extra scrolling in browsers that don't support `preventScroll` (which
    // at time of writing is most of them...)


    $legendOrLabel.scrollIntoView();
    $input.focus({
      preventScroll: true
    });
    return true;
  };
  /**
   * Get fragment from URL
   *
   * Extract the fragment (everything after the hash) from a URL, but not including
   * the hash.
   *
   * @param {string} url - URL
   * @returns {string} Fragment from URL, without the hash
   */


  ErrorSummary.prototype.getFragmentFromUrl = function (url) {
    if (url.indexOf('#') === -1) {
      return false;
    }

    return url.split('#').pop();
  };
  /**
   * Get associated legend or label
   *
   * Returns the first element that exists from this list:
   *
   * - The `<legend>` associated with the closest `<fieldset>` ancestor, as long
   *   as the top of it is no more than half a viewport height away from the
   *   bottom of the input
   * - The first `<label>` that is associated with the input using for="inputId"
   * - The closest parent `<label>`
   *
   * @param {HTMLElement} $input - The input
   * @returns {HTMLElement} Associated legend or label, or null if no associated
   *                        legend or label can be found
   */


  ErrorSummary.prototype.getAssociatedLegendOrLabel = function ($input) {
    var $fieldset = $input.closest('fieldset');

    if ($fieldset) {
      var legends = $fieldset.getElementsByTagName('legend');

      if (legends.length) {
        var $candidateLegend = legends[0]; // If the input type is radio or checkbox, always use the legend if there
        // is one.

        if ($input.type === 'checkbox' || $input.type === 'radio') {
          return $candidateLegend;
        } // For other input types, only scroll to the fieldset’s legend (instead of
        // the label associated with the input) if the input would end up in the
        // top half of the screen.
        //
        // This should avoid situations where the input either ends up off the
        // screen, or obscured by a software keyboard.


        var legendTop = $candidateLegend.getBoundingClientRect().top;
        var inputRect = $input.getBoundingClientRect(); // If the browser doesn't support Element.getBoundingClientRect().height
        // or window.innerHeight (like IE8), bail and just link to the label.

        if (inputRect.height && window.innerHeight) {
          var inputBottom = inputRect.top + inputRect.height;

          if (inputBottom - legendTop < window.innerHeight / 2) {
            return $candidateLegend;
          }
        }
      }
    }

    return document.querySelector("label[for='" + $input.getAttribute('id') + "']") || $input.closest('label');
  };

  return ErrorSummary;
});
},{}],"../node_modules/lbh-frontend/lbh/components/lbh-error-summary/error-summary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errorSummary = _interopRequireDefault(require("govuk-frontend/govuk/components/error-summary/error-summary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _errorSummary.default;
exports.default = _default;
},{"govuk-frontend/govuk/components/error-summary/error-summary":"../node_modules/govuk-frontend/govuk/components/error-summary/error-summary.js"}],"../node_modules/lbh-frontend/lbh/components/lbh-contact-block/contact-block.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* global L */
window.L = window.L || {};

if (L !== {}) {
  var map = L.map;
  var control = L.control;
  var tileLayer = L.tileLayer;
  var icon = L.icon;
  var marker = L.marker;
}

function Map($module) {
  this.$module = $module;
  this.moduleId = this.$module.getAttribute("id");
  this.accessToken = this.$module.getAttribute("data-access-token");
  this.map = null;
  this.markerLat = this.$module.getAttribute("data-marker-lat") || null;
  this.markerLng = this.$module.getAttribute("data-marker-lng") || null;
  this.centreLat = this.$module.getAttribute("data-centre-lat") || this.markerLat || 51.549;
  this.centreLng = this.$module.getAttribute("data-centre-lng") || this.markerLng || -0.077928;
  this.maxZoom = this.$module.getAttribute("data-max-zoom") || 19;
  this.minZoom = this.$module.getAttribute("data-min-zoom") || 12;
  this.initialZoom = this.$module.getAttribute("data-initial-zoom") || 15;
  this.showZoomControl = this.$module.getAttribute("data-show-zoom-control") || true;
  this.minLat = this.$module.getAttribute("data-min-lat") || 51.491112;
  this.minLng = this.$module.getAttribute("data-min-lng") || -0.275464;
  this.maxLat = this.$module.getAttribute("data-max-lat") || 51.607351;
  this.maxLng = this.$module.getAttribute("data-max-lng") || 0.096129;
}

Map.prototype.initLeaflet = function () {
  this.map = map(this.moduleId, {
    zoomControl: false,
    maxZoom: this.maxZoom,
    minZoom: this.minZoom,
    center: [this.centreLat, this.centreLng],
    zoom: this.initialZoom
  });

  if (this.showZoomControl) {
    control.zoom({
      position: "topright"
    }).addTo(this.map);
  }
};

Map.prototype.setBounds = function () {
  // Limit the view to the extend of the map
  this.map.setMaxBounds([[this.minLat, this.minLng], [this.maxLat, this.maxLng]]);
};

Map.prototype.initMapboxTiles = function () {
  var osmStreet = tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    fadeAnimation: false,
    opacity: 1,
    attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
    maxZoom: this.maxZoom,
    id: "mapbox.streets",
    accessToken: this.accessToken
  });
  this.map.addLayer(osmStreet);
};

Map.prototype.addMarker = function () {
  if (this.markerLat !== null && this.markerLng !== null) {
    var mapIcon = icon({
      iconUrl: "../../../assets/images/contact/map-marker.svg",
      iconSize: [48, 48],
      iconAnchor: [24, 48]
    });
    marker([this.markerLat, this.markerLng], {
      icon: mapIcon
    }).addTo(this.map);
  }
};

Map.prototype.init = function () {
  // Check for module
  if (!this.$module || L == {}) {
    return;
  }

  this.initLeaflet();
  this.setBounds();
  this.initMapboxTiles();
  this.addMarker();
};

var _default = Map;
exports.default = _default;
},{}],"../node_modules/govuk-frontend/govuk/components/radios/radios.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('GOVUKFrontend', factory) : global.GOVUKFrontend = factory();
})(this, function () {
  'use strict';

  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
    var detect = // In IE8, defineProperty could only act on DOM elements, so full support
    // for the feature requires the ability to set a property on an arbitrary object
    'defineProperty' in Object && function () {
      try {
        var a = {};
        Object.defineProperty(a, 'test', {
          value: 42
        });
        return true;
      } catch (e) {
        return false;
      }
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always

    (function (nativeDefineProperty) {
      var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
      var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
      var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

      Object.defineProperty = function defineProperty(object, property, descriptor) {
        // Where native support exists, assume it
        if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
          return nativeDefineProperty(object, property, descriptor);
        }

        if (object === null || !(object instanceof Object || _typeof(object) === 'object')) {
          throw new TypeError('Object.defineProperty called on non-object');
        }

        if (!(descriptor instanceof Object)) {
          throw new TypeError('Property description must be an object');
        }

        var propertyString = String(property);
        var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;

        var getterType = 'get' in descriptor && _typeof(descriptor.get);

        var setterType = 'set' in descriptor && _typeof(descriptor.set); // handle descriptor.get


        if (getterType) {
          if (getterType !== 'function') {
            throw new TypeError('Getter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineGetter__.call(object, propertyString, descriptor.get);
        } else {
          object[propertyString] = descriptor.value;
        } // handle descriptor.set


        if (setterType) {
          if (setterType !== 'function') {
            throw new TypeError('Setter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineSetter__.call(object, propertyString, descriptor.set);
        } // OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above


        if ('value' in descriptor) {
          object[propertyString] = descriptor.value;
        }

        return object;
      };
    })(Object.defineProperty);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Function/prototype/bind/detect.js
    var detect = ('bind' in Function.prototype);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Function.prototype.bind&flags=always

    Object.defineProperty(Function.prototype, 'bind', {
      value: function bind(that) {
        // .length is 1
        // add necessary es5-shim utilities
        var $Array = Array;
        var $Object = Object;
        var ObjectPrototype = $Object.prototype;
        var ArrayPrototype = $Array.prototype;

        var Empty = function Empty() {};

        var to_string = ObjectPrototype.toString;
        var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
        var isCallable;
        /* inlined from https://npmjs.com/is-callable */

        var fnToStr = Function.prototype.toString,
            tryFunctionObject = function tryFunctionObject(value) {
          try {
            fnToStr.call(value);
            return true;
          } catch (e) {
            return false;
          }
        },
            fnClass = '[object Function]',
            genClass = '[object GeneratorFunction]';

        isCallable = function isCallable(value) {
          if (typeof value !== 'function') {
            return false;
          }

          if (hasToStringTag) {
            return tryFunctionObject(value);
          }

          var strClass = to_string.call(value);
          return strClass === fnClass || strClass === genClass;
        };

        var array_slice = ArrayPrototype.slice;
        var array_concat = ArrayPrototype.concat;
        var array_push = ArrayPrototype.push;
        var max = Math.max; // /add necessary es5-shim utilities
        // 1. Let Target be the this value.

        var target = this; // 2. If IsCallable(Target) is false, throw a TypeError exception.

        if (!isCallable(target)) {
          throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        } // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used


        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.

        var bound;

        var binder = function () {
          if (this instanceof bound) {
            // 15.3.4.5.2 [[Construct]]
            // When the [[Construct]] internal method of a function object,
            // F that was created using the bind function is called with a
            // list of arguments ExtraArgs, the following steps are taken:
            // 1. Let target be the value of F's [[TargetFunction]]
            //   internal property.
            // 2. If target has no [[Construct]] internal method, a
            //   TypeError exception is thrown.
            // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Construct]] internal
            //   method of target providing args as the arguments.
            var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));

            if ($Object(result) === result) {
              return result;
            }

            return this;
          } else {
            // 15.3.4.5.1 [[Call]]
            // When the [[Call]] internal method of a function object, F,
            // which was created using the bind function is called with a
            // this value and a list of arguments ExtraArgs, the following
            // steps are taken:
            // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 2. Let boundThis be the value of F's [[BoundThis]] internal
            //   property.
            // 3. Let target be the value of F's [[TargetFunction]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Call]] internal method
            //   of target providing boundThis as the this value and
            //   providing args as the arguments.
            // equiv: target.call(this, ...boundArgs, ...args)
            return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
          }
        }; // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.


        var boundLength = max(0, target.length - args.length); // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.

        var boundArgs = [];

        for (var i = 0; i < boundLength; i++) {
          array_push.call(boundArgs, '$' + i);
        } // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.


        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
          Empty.prototype = target.prototype;
          bound.prototype = new Empty(); // Clean up dangling references.

          Empty.prototype = null;
        } // TODO
        // 18. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.
        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.
        // 22. Return F.


        return bound;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Window/detect.js
    var detect = ('Window' in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Window&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      (function (global) {
        if (global.constructor) {
          global.Window = global.constructor;
        } else {
          (global.Window = global.constructor = new Function('return function Window() {}')()).prototype = this;
        }
      })(this);
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Document/detect.js
    var detect = ("Document" in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Document&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      if (this.HTMLDocument) {
        // IE8
        // HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
        this.Document = this.HTMLDocument;
      } else {
        // Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
        this.Document = this.HTMLDocument = document.constructor = new Function('return function Document() {}')();
        this.Document.prototype = document;
      }
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Element/detect.js
    var detect = 'Element' in this && 'HTMLElement' in this;
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element&flags=always

    (function () {
      // IE8
      if (window.Element && !window.HTMLElement) {
        window.HTMLElement = window.Element;
        return;
      } // create Element constructor


      window.Element = window.HTMLElement = new Function('return function Element() {}')(); // generate sandboxed iframe

      var vbody = document.appendChild(document.createElement('body'));
      var frame = vbody.appendChild(document.createElement('iframe')); // use sandboxed iframe to replicate Element functionality

      var frameDocument = frame.contentWindow.document;
      var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
      var cache = {}; // polyfill Element.prototype on an element

      var shiv = function (element, deep) {
        var childNodes = element.childNodes || [],
            index = -1,
            key,
            value,
            childNode;

        if (element.nodeType === 1 && element.constructor !== Element) {
          element.constructor = Element;

          for (key in cache) {
            value = cache[key];
            element[key] = value;
          }
        }

        while (childNode = deep && childNodes[++index]) {
          shiv(childNode, deep);
        }

        return element;
      };

      var elements = document.getElementsByTagName('*');
      var nativeCreateElement = document.createElement;
      var interval;
      var loopLimit = 100;
      prototype.attachEvent('onpropertychange', function (event) {
        var propertyName = event.propertyName,
            nonValue = !cache.hasOwnProperty(propertyName),
            newValue = prototype[propertyName],
            oldValue = cache[propertyName],
            index = -1,
            element;

        while (element = elements[++index]) {
          if (element.nodeType === 1) {
            if (nonValue || element[propertyName] === oldValue) {
              element[propertyName] = newValue;
            }
          }
        }

        cache[propertyName] = newValue;
      });
      prototype.constructor = Element;

      if (!prototype.hasAttribute) {
        // <Element>.hasAttribute
        prototype.hasAttribute = function hasAttribute(name) {
          return this.getAttribute(name) !== null;
        };
      } // Apply Element prototype to the pre-existing DOM as soon as the body element appears.


      function bodyCheck() {
        if (!loopLimit--) clearTimeout(interval);

        if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
          shiv(document, true);
          if (interval && document.body.prototype) clearTimeout(interval);
          return !!document.body.prototype;
        }

        return false;
      }

      if (!bodyCheck()) {
        document.onreadystatechange = bodyCheck;
        interval = setInterval(bodyCheck, 25);
      } // Apply to any new elements created after load


      document.createElement = function createElement(nodeName) {
        var element = nativeCreateElement(String(nodeName).toLowerCase());
        return shiv(element);
      }; // remove sandboxed iframe


      document.removeChild(vbody);
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Event/detect.js
    var detect = function (global) {
      if (!('Event' in global)) return false;
      if (typeof global.Event === 'function') return true;

      try {
        // In IE 9-11, the Event object exists but cannot be instantiated
        new Event('click');
        return true;
      } catch (e) {
        return false;
      }
    }(this);

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Event&flags=always

    (function () {
      var unlistenableWindowEvents = {
        click: 1,
        dblclick: 1,
        keyup: 1,
        keypress: 1,
        keydown: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1,
        mouseover: 1,
        mouseenter: 1,
        mouseleave: 1,
        mouseout: 1,
        storage: 1,
        storagecommit: 1,
        textinput: 1
      }; // This polyfill depends on availability of `document` so will not run in a worker
      // However, we asssume there are no browsers with worker support that lack proper
      // support for `Event` within the worker

      if (typeof document === 'undefined' || typeof window === 'undefined') return;

      function indexOf(array, element) {
        var index = -1,
            length = array.length;

        while (++index < length) {
          if (index in array && array[index] === element) {
            return index;
          }
        }

        return -1;
      }

      var existingProto = window.Event && window.Event.prototype || null;

      window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
        if (!type) {
          throw new Error('Not enough arguments');
        }

        var event; // Shortcut if browser supports createEvent

        if ('createEvent' in document) {
          event = document.createEvent('Event');
          var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
          var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
          event.initEvent(type, bubbles, cancelable);
          return event;
        }

        event = document.createEventObject();
        event.type = type;
        event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
        event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
        return event;
      };

      if (existingProto) {
        Object.defineProperty(window.Event, 'prototype', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: existingProto
        });
      }

      if (!('createEvent' in document)) {
        window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1];

          if (element === window && type in unlistenableWindowEvents) {
            throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
          }

          if (!element._events) {
            element._events = {};
          }

          if (!element._events[type]) {
            element._events[type] = function (event) {
              var list = element._events[event.type].list,
                  events = list.slice(),
                  index = -1,
                  length = events.length,
                  eventElement;

              event.preventDefault = function preventDefault() {
                if (event.cancelable !== false) {
                  event.returnValue = false;
                }
              };

              event.stopPropagation = function stopPropagation() {
                event.cancelBubble = true;
              };

              event.stopImmediatePropagation = function stopImmediatePropagation() {
                event.cancelBubble = true;
                event.cancelImmediate = true;
              };

              event.currentTarget = element;
              event.relatedTarget = event.fromElement || null;
              event.target = event.target || event.srcElement || element;
              event.timeStamp = new Date().getTime();

              if (event.clientX) {
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
              }

              while (++index < length && !event.cancelImmediate) {
                if (index in events) {
                  eventElement = events[index];

                  if (indexOf(list, eventElement) !== -1 && typeof eventElement === 'function') {
                    eventElement.call(element, event);
                  }
                }
              }
            };

            element._events[type].list = [];

            if (element.attachEvent) {
              element.attachEvent('on' + type, element._events[type]);
            }
          }

          element._events[type].list.push(listener);
        };

        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1],
              index;

          if (element._events && element._events[type] && element._events[type].list) {
            index = indexOf(element._events[type].list, listener);

            if (index !== -1) {
              element._events[type].list.splice(index, 1);

              if (!element._events[type].list.length) {
                if (element.detachEvent) {
                  element.detachEvent('on' + type, element._events[type]);
                }

                delete element._events[type];
              }
            }
          }
        };

        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
          if (!arguments.length) {
            throw new Error('Not enough arguments');
          }

          if (!event || typeof event.type !== 'string') {
            throw new Error('DOM Events Exception 0');
          }

          var element = this,
              type = event.type;

          try {
            if (!event.bubbles) {
              event.cancelBubble = true;

              var cancelBubbleEvent = function (event) {
                event.cancelBubble = true;
                (element || window).detachEvent('on' + type, cancelBubbleEvent);
              };

              this.attachEvent('on' + type, cancelBubbleEvent);
            }

            this.fireEvent('on' + type, event);
          } catch (error) {
            event.target = element;

            do {
              event.currentTarget = element;

              if ('_events' in element && typeof element._events[type] === 'function') {
                element._events[type].call(element, event);
              }

              if (typeof element['on' + type] === 'function') {
                element['on' + type].call(element, event);
              }

              element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
            } while (element && !event.cancelBubble);
          }

          return true;
        }; // Add the DOMContentLoaded Event


        document.attachEvent('onreadystatechange', function () {
          if (document.readyState === 'complete') {
            document.dispatchEvent(new Event('DOMContentLoaded', {
              bubbles: true
            }));
          }
        });
      }
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/detect.js
    var detect = 'DOMTokenList' in this && function (x) {
      return 'classList' in x ? !x.classList.toggle('x', false) && !x.className : true;
    }(document.createElement('x'));

    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/polyfill.js

    (function (global) {
      var nativeImpl = "DOMTokenList" in global && global.DOMTokenList;

      if (!nativeImpl || !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg') && !(document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList)) {
        global.DOMTokenList = function () {
          // eslint-disable-line no-unused-vars
          var dpSupport = true;

          var defineGetter = function (object, name, fn, configurable) {
            if (Object.defineProperty) Object.defineProperty(object, name, {
              configurable: false === dpSupport ? true : !!configurable,
              get: fn
            });else object.__defineGetter__(name, fn);
          };
          /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */


          try {
            defineGetter({}, "support");
          } catch (e) {
            dpSupport = false;
          }

          var _DOMTokenList = function (el, prop) {
            var that = this;
            var tokens = [];
            var tokenMap = {};
            var length = 0;
            var maxLength = 0;

            var addIndexGetter = function (i) {
              defineGetter(that, i, function () {
                preop();
                return tokens[i];
              }, false);
            };

            var reindex = function () {
              /** Define getter functions for array-like access to the tokenList's contents. */
              if (length >= maxLength) for (; maxLength < length; ++maxLength) {
                addIndexGetter(maxLength);
              }
            };
            /** Helper function called at the start of each class method. Internal use only. */


            var preop = function () {
              var error;
              var i;
              var args = arguments;
              var rSpace = /\s+/;
              /** Validate the token/s passed to an instance method, if any. */

              if (args.length) for (i = 0; i < args.length; ++i) if (rSpace.test(args[i])) {
                error = new SyntaxError('String "' + args[i] + '" ' + "contains" + ' an invalid character');
                error.code = 5;
                error.name = "InvalidCharacterError";
                throw error;
              }
              /** Split the new value apart by whitespace*/

              if (_typeof(el[prop]) === "object") {
                tokens = ("" + el[prop].baseVal).replace(/^\s+|\s+$/g, "").split(rSpace);
              } else {
                tokens = ("" + el[prop]).replace(/^\s+|\s+$/g, "").split(rSpace);
              }
              /** Avoid treating blank strings as single-item token lists */


              if ("" === tokens[0]) tokens = [];
              /** Repopulate the internal token lists */

              tokenMap = {};

              for (i = 0; i < tokens.length; ++i) tokenMap[tokens[i]] = true;

              length = tokens.length;
              reindex();
            };
            /** Populate our internal token list if the targeted attribute of the subject element isn't empty. */


            preop();
            /** Return the number of tokens in the underlying string. Read-only. */

            defineGetter(that, "length", function () {
              preop();
              return length;
            });
            /** Override the default toString/toLocaleString methods to return a space-delimited list of tokens when typecast. */

            that.toLocaleString = that.toString = function () {
              preop();
              return tokens.join(" ");
            };

            that.item = function (idx) {
              preop();
              return tokens[idx];
            };

            that.contains = function (token) {
              preop();
              return !!tokenMap[token];
            };

            that.add = function () {
              preop.apply(that, args = arguments);

              for (var args, token, i = 0, l = args.length; i < l; ++i) {
                token = args[i];

                if (!tokenMap[token]) {
                  tokens.push(token);
                  tokenMap[token] = true;
                }
              }
              /** Update the targeted attribute of the attached element if the token list's changed. */


              if (length !== tokens.length) {
                length = tokens.length >>> 0;

                if (_typeof(el[prop]) === "object") {
                  el[prop].baseVal = tokens.join(" ");
                } else {
                  el[prop] = tokens.join(" ");
                }

                reindex();
              }
            };

            that.remove = function () {
              preop.apply(that, args = arguments);
              /** Build a hash of token names to compare against when recollecting our token list. */

              for (var args, ignore = {}, i = 0, t = []; i < args.length; ++i) {
                ignore[args[i]] = true;
                delete tokenMap[args[i]];
              }
              /** Run through our tokens list and reassign only those that aren't defined in the hash declared above. */


              for (i = 0; i < tokens.length; ++i) if (!ignore[tokens[i]]) t.push(tokens[i]);

              tokens = t;
              length = t.length >>> 0;
              /** Update the targeted attribute of the attached element. */

              if (_typeof(el[prop]) === "object") {
                el[prop].baseVal = tokens.join(" ");
              } else {
                el[prop] = tokens.join(" ");
              }

              reindex();
            };

            that.toggle = function (token, force) {
              preop.apply(that, [token]);
              /** Token state's being forced. */

              if (undefined !== force) {
                if (force) {
                  that.add(token);
                  return true;
                } else {
                  that.remove(token);
                  return false;
                }
              }
              /** Token already exists in tokenList. Remove it, and return FALSE. */


              if (tokenMap[token]) {
                that.remove(token);
                return false;
              }
              /** Otherwise, add the token and return TRUE. */


              that.add(token);
              return true;
            };

            return that;
          };

          return _DOMTokenList;
        }();
      } // Add second argument to native DOMTokenList.toggle() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.toggle('x', false);
        if (!e.classList.contains('x')) return;

        e.classList.constructor.prototype.toggle = function toggle(token
        /*, force*/
        ) {
          var force = arguments[1];

          if (force === undefined) {
            var add = !this.contains(token);
            this[add ? 'add' : 'remove'](token);
            return add;
          }

          force = !!force;
          this[force ? 'add' : 'remove'](token);
          return force;
        };
      })(); // Add multiple arguments to native DOMTokenList.add() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.add('a', 'b');
        if (e.classList.contains('b')) return;
        var native = e.classList.constructor.prototype.add;

        e.classList.constructor.prototype.add = function () {
          var args = arguments;
          var l = arguments.length;

          for (var i = 0; i < l; i++) {
            native.call(this, args[i]);
          }
        };
      })(); // Add multiple arguments to native DOMTokenList.remove() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.add('a');
        e.classList.add('b');
        e.classList.remove('a', 'b');
        if (!e.classList.contains('b')) return;
        var native = e.classList.constructor.prototype.remove;

        e.classList.constructor.prototype.remove = function () {
          var args = arguments;
          var l = arguments.length;

          for (var i = 0; i < l; i++) {
            native.call(this, args[i]);
          }
        };
      })();
    })(this);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/8717a9e04ac7aff99b4980fbedead98036b0929a/packages/polyfill-library/polyfills/Element/prototype/classList/detect.js
    var detect = 'document' in this && "classList" in document.documentElement && 'Element' in this && 'classList' in Element.prototype && function () {
      var e = document.createElement('span');
      e.classList.add('a', 'b');
      return e.classList.contains('b');
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element.prototype.classList&flags=always

    (function (global) {
      var dpSupport = true;

      var defineGetter = function (object, name, fn, configurable) {
        if (Object.defineProperty) Object.defineProperty(object, name, {
          configurable: false === dpSupport ? true : !!configurable,
          get: fn
        });else object.__defineGetter__(name, fn);
      };
      /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */


      try {
        defineGetter({}, "support");
      } catch (e) {
        dpSupport = false;
      }
      /** Polyfills a property with a DOMTokenList */


      var addProp = function (o, name, attr) {
        defineGetter(o.prototype, name, function () {
          var tokenList;
          var THIS = this,

          /** Prevent this from firing twice for some reason. What the hell, IE. */
          gibberishProperty = "__defineGetter__" + "DEFINE_PROPERTY" + name;
          if (THIS[gibberishProperty]) return tokenList;
          THIS[gibberishProperty] = true;
          /**
           * IE8 can't define properties on native JavaScript objects, so we'll use a dumb hack instead.
           *
           * What this is doing is creating a dummy element ("reflection") inside a detached phantom node ("mirror")
           * that serves as the target of Object.defineProperty instead. While we could simply use the subject HTML
           * element instead, this would conflict with element types which use indexed properties (such as forms and
           * select lists).
           */

          if (false === dpSupport) {
            var visage;
            var mirror = addProp.mirror || document.createElement("div");
            var reflections = mirror.childNodes;
            var l = reflections.length;

            for (var i = 0; i < l; ++i) if (reflections[i]._R === THIS) {
              visage = reflections[i];
              break;
            }
            /** Couldn't find an element's reflection inside the mirror. Materialise one. */


            visage || (visage = mirror.appendChild(document.createElement("div")));
            tokenList = DOMTokenList.call(visage, THIS, attr);
          } else tokenList = new DOMTokenList(THIS, attr);

          defineGetter(THIS, name, function () {
            return tokenList;
          });
          delete THIS[gibberishProperty];
          return tokenList;
        }, true);
      };

      addProp(global.Element, "classList", "className");
      addProp(global.HTMLElement, "classList", "className");
      addProp(global.HTMLLinkElement, "relList", "rel");
      addProp(global.HTMLAnchorElement, "relList", "rel");
      addProp(global.HTMLAreaElement, "relList", "rel");
    })(this);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  /**
   * TODO: Ideally this would be a NodeList.prototype.forEach polyfill
   * This seems to fail in IE8, requires more investigation.
   * See: https://github.com/imagitama/nodelist-foreach-polyfill
   */

  function nodeListForEach(nodes, callback) {
    if (window.NodeList.prototype.forEach) {
      return nodes.forEach(callback);
    }

    for (var i = 0; i < nodes.length; i++) {
      callback.call(window, nodes[i], i, nodes);
    }
  }

  function Radios($module) {
    this.$module = $module;
    this.$inputs = $module.querySelectorAll('input[type="radio"]');
  }
  /**
   * Initialise Radios
   *
   * Radios can be associated with a 'conditionally revealed' content block – for
   * example, a radio for 'Phone' could reveal an additional form field for the
   * user to enter their phone number.
   *
   * These associations are made using a `data-aria-controls` attribute, which is
   * promoted to an aria-controls attribute during initialisation.
   *
   * We also need to restore the state of any conditional reveals on the page (for
   * example if the user has navigated back), and set up event handlers to keep
   * the reveal in sync with the radio state.
   */


  Radios.prototype.init = function () {
    var $module = this.$module;
    var $inputs = this.$inputs;
    nodeListForEach($inputs, function ($input) {
      var target = $input.getAttribute('data-aria-controls'); // Skip radios without data-aria-controls attributes, or where the
      // target element does not exist.

      if (!target || !$module.querySelector('#' + target)) {
        return;
      } // Promote the data-aria-controls attribute to a aria-controls attribute
      // so that the relationship is exposed in the AOM


      $input.setAttribute('aria-controls', target);
      $input.removeAttribute('data-aria-controls');
    }); // When the page is restored after navigating 'back' in some browsers the
    // state of form controls is not restored until *after* the DOMContentLoaded
    // event is fired, so we need to sync after the pageshow event in browsers
    // that support it.

    if ('onpageshow' in window) {
      window.addEventListener('pageshow', this.syncAllConditionalReveals.bind(this));
    } else {
      window.addEventListener('DOMContentLoaded', this.syncAllConditionalReveals.bind(this));
    } // Although we've set up handlers to sync state on the pageshow or
    // DOMContentLoaded event, init could be called after those events have fired,
    // for example if they are added to the page dynamically, so sync now too.


    this.syncAllConditionalReveals(); // Handle events

    $module.addEventListener('click', this.handleClick.bind(this));
  };
  /**
   * Sync the conditional reveal states for all inputs in this $module.
   */


  Radios.prototype.syncAllConditionalReveals = function () {
    nodeListForEach(this.$inputs, this.syncConditionalRevealWithInputState.bind(this));
  };
  /**
   * Sync conditional reveal with the input state
   *
   * Synchronise the visibility of the conditional reveal, and its accessible
   * state, with the input's checked state.
   *
   * @param {HTMLInputElement} $input Radio input
   */


  Radios.prototype.syncConditionalRevealWithInputState = function ($input) {
    var $target = document.querySelector('#' + $input.getAttribute('aria-controls'));

    if ($target && $target.classList.contains('govuk-radios__conditional')) {
      var inputIsChecked = $input.checked;
      $input.setAttribute('aria-expanded', inputIsChecked);
      $target.classList.toggle('govuk-radios__conditional--hidden', !inputIsChecked);
    }
  };
  /**
   * Click event handler
   *
   * Handle a click within the $module – if the click occurred on a radio, sync
   * the state of the conditional reveal for all radio buttons in the same form
   * with the same name (because checking one radio could have un-checked a radio
   * in another $module)
   *
   * @param {MouseEvent} event Click event
   */


  Radios.prototype.handleClick = function (event) {
    var $clickedInput = event.target; // Ignore clicks on things that aren't radio buttons

    if ($clickedInput.type !== 'radio') {
      return;
    } // We only need to consider radios with conditional reveals, which will have
    // aria-controls attributes.


    var $allInputs = document.querySelectorAll('input[type="radio"][aria-controls]');
    nodeListForEach($allInputs, function ($input) {
      var hasSameFormOwner = $input.form === $clickedInput.form;
      var hasSameName = $input.name === $clickedInput.name;

      if (hasSameName && hasSameFormOwner) {
        this.syncConditionalRevealWithInputState($input);
      }
    }.bind(this));
  };

  return Radios;
});
},{}],"../node_modules/lbh-frontend/lbh/components/lbh-radios/radios.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _radios = _interopRequireDefault(require("govuk-frontend/govuk/components/radios/radios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _radios.default;
exports.default = _default;
},{"govuk-frontend/govuk/components/radios/radios":"../node_modules/govuk-frontend/govuk/components/radios/radios.js"}],"../node_modules/govuk-frontend/govuk/components/tabs/tabs.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('GOVUKFrontend', factory) : global.GOVUKFrontend = factory();
})(this, function () {
  'use strict';

  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
    var detect = // In IE8, defineProperty could only act on DOM elements, so full support
    // for the feature requires the ability to set a property on an arbitrary object
    'defineProperty' in Object && function () {
      try {
        var a = {};
        Object.defineProperty(a, 'test', {
          value: 42
        });
        return true;
      } catch (e) {
        return false;
      }
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always

    (function (nativeDefineProperty) {
      var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
      var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
      var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

      Object.defineProperty = function defineProperty(object, property, descriptor) {
        // Where native support exists, assume it
        if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
          return nativeDefineProperty(object, property, descriptor);
        }

        if (object === null || !(object instanceof Object || _typeof(object) === 'object')) {
          throw new TypeError('Object.defineProperty called on non-object');
        }

        if (!(descriptor instanceof Object)) {
          throw new TypeError('Property description must be an object');
        }

        var propertyString = String(property);
        var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;

        var getterType = 'get' in descriptor && _typeof(descriptor.get);

        var setterType = 'set' in descriptor && _typeof(descriptor.set); // handle descriptor.get


        if (getterType) {
          if (getterType !== 'function') {
            throw new TypeError('Getter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineGetter__.call(object, propertyString, descriptor.get);
        } else {
          object[propertyString] = descriptor.value;
        } // handle descriptor.set


        if (setterType) {
          if (setterType !== 'function') {
            throw new TypeError('Setter must be a function');
          }

          if (!supportsAccessors) {
            throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
          }

          if (hasValueOrWritable) {
            throw new TypeError(ERR_VALUE_ACCESSORS);
          }

          Object.__defineSetter__.call(object, propertyString, descriptor.set);
        } // OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above


        if ('value' in descriptor) {
          object[propertyString] = descriptor.value;
        }

        return object;
      };
    })(Object.defineProperty);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Function/prototype/bind/detect.js
    var detect = ('bind' in Function.prototype);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Function.prototype.bind&flags=always

    Object.defineProperty(Function.prototype, 'bind', {
      value: function bind(that) {
        // .length is 1
        // add necessary es5-shim utilities
        var $Array = Array;
        var $Object = Object;
        var ObjectPrototype = $Object.prototype;
        var ArrayPrototype = $Array.prototype;

        var Empty = function Empty() {};

        var to_string = ObjectPrototype.toString;
        var hasToStringTag = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';
        var isCallable;
        /* inlined from https://npmjs.com/is-callable */

        var fnToStr = Function.prototype.toString,
            tryFunctionObject = function tryFunctionObject(value) {
          try {
            fnToStr.call(value);
            return true;
          } catch (e) {
            return false;
          }
        },
            fnClass = '[object Function]',
            genClass = '[object GeneratorFunction]';

        isCallable = function isCallable(value) {
          if (typeof value !== 'function') {
            return false;
          }

          if (hasToStringTag) {
            return tryFunctionObject(value);
          }

          var strClass = to_string.call(value);
          return strClass === fnClass || strClass === genClass;
        };

        var array_slice = ArrayPrototype.slice;
        var array_concat = ArrayPrototype.concat;
        var array_push = ArrayPrototype.push;
        var max = Math.max; // /add necessary es5-shim utilities
        // 1. Let Target be the this value.

        var target = this; // 2. If IsCallable(Target) is false, throw a TypeError exception.

        if (!isCallable(target)) {
          throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        } // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used


        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.

        var bound;

        var binder = function () {
          if (this instanceof bound) {
            // 15.3.4.5.2 [[Construct]]
            // When the [[Construct]] internal method of a function object,
            // F that was created using the bind function is called with a
            // list of arguments ExtraArgs, the following steps are taken:
            // 1. Let target be the value of F's [[TargetFunction]]
            //   internal property.
            // 2. If target has no [[Construct]] internal method, a
            //   TypeError exception is thrown.
            // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Construct]] internal
            //   method of target providing args as the arguments.
            var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));

            if ($Object(result) === result) {
              return result;
            }

            return this;
          } else {
            // 15.3.4.5.1 [[Call]]
            // When the [[Call]] internal method of a function object, F,
            // which was created using the bind function is called with a
            // this value and a list of arguments ExtraArgs, the following
            // steps are taken:
            // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
            //   property.
            // 2. Let boundThis be the value of F's [[BoundThis]] internal
            //   property.
            // 3. Let target be the value of F's [[TargetFunction]] internal
            //   property.
            // 4. Let args be a new list containing the same values as the
            //   list boundArgs in the same order followed by the same
            //   values as the list ExtraArgs in the same order.
            // 5. Return the result of calling the [[Call]] internal method
            //   of target providing boundThis as the this value and
            //   providing args as the arguments.
            // equiv: target.call(this, ...boundArgs, ...args)
            return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
          }
        }; // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.


        var boundLength = max(0, target.length - args.length); // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.

        var boundArgs = [];

        for (var i = 0; i < boundLength; i++) {
          array_push.call(boundArgs, '$' + i);
        } // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.


        bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
          Empty.prototype = target.prototype;
          bound.prototype = new Empty(); // Clean up dangling references.

          Empty.prototype = null;
        } // TODO
        // 18. Set the [[Extensible]] internal property of F to true.
        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.
        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.
        // 22. Return F.


        return bound;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/detect.js
    var detect = 'DOMTokenList' in this && function (x) {
      return 'classList' in x ? !x.classList.toggle('x', false) && !x.className : true;
    }(document.createElement('x'));

    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-service/master/packages/polyfill-library/polyfills/DOMTokenList/polyfill.js

    (function (global) {
      var nativeImpl = "DOMTokenList" in global && global.DOMTokenList;

      if (!nativeImpl || !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg') && !(document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList)) {
        global.DOMTokenList = function () {
          // eslint-disable-line no-unused-vars
          var dpSupport = true;

          var defineGetter = function (object, name, fn, configurable) {
            if (Object.defineProperty) Object.defineProperty(object, name, {
              configurable: false === dpSupport ? true : !!configurable,
              get: fn
            });else object.__defineGetter__(name, fn);
          };
          /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */


          try {
            defineGetter({}, "support");
          } catch (e) {
            dpSupport = false;
          }

          var _DOMTokenList = function (el, prop) {
            var that = this;
            var tokens = [];
            var tokenMap = {};
            var length = 0;
            var maxLength = 0;

            var addIndexGetter = function (i) {
              defineGetter(that, i, function () {
                preop();
                return tokens[i];
              }, false);
            };

            var reindex = function () {
              /** Define getter functions for array-like access to the tokenList's contents. */
              if (length >= maxLength) for (; maxLength < length; ++maxLength) {
                addIndexGetter(maxLength);
              }
            };
            /** Helper function called at the start of each class method. Internal use only. */


            var preop = function () {
              var error;
              var i;
              var args = arguments;
              var rSpace = /\s+/;
              /** Validate the token/s passed to an instance method, if any. */

              if (args.length) for (i = 0; i < args.length; ++i) if (rSpace.test(args[i])) {
                error = new SyntaxError('String "' + args[i] + '" ' + "contains" + ' an invalid character');
                error.code = 5;
                error.name = "InvalidCharacterError";
                throw error;
              }
              /** Split the new value apart by whitespace*/

              if (_typeof(el[prop]) === "object") {
                tokens = ("" + el[prop].baseVal).replace(/^\s+|\s+$/g, "").split(rSpace);
              } else {
                tokens = ("" + el[prop]).replace(/^\s+|\s+$/g, "").split(rSpace);
              }
              /** Avoid treating blank strings as single-item token lists */


              if ("" === tokens[0]) tokens = [];
              /** Repopulate the internal token lists */

              tokenMap = {};

              for (i = 0; i < tokens.length; ++i) tokenMap[tokens[i]] = true;

              length = tokens.length;
              reindex();
            };
            /** Populate our internal token list if the targeted attribute of the subject element isn't empty. */


            preop();
            /** Return the number of tokens in the underlying string. Read-only. */

            defineGetter(that, "length", function () {
              preop();
              return length;
            });
            /** Override the default toString/toLocaleString methods to return a space-delimited list of tokens when typecast. */

            that.toLocaleString = that.toString = function () {
              preop();
              return tokens.join(" ");
            };

            that.item = function (idx) {
              preop();
              return tokens[idx];
            };

            that.contains = function (token) {
              preop();
              return !!tokenMap[token];
            };

            that.add = function () {
              preop.apply(that, args = arguments);

              for (var args, token, i = 0, l = args.length; i < l; ++i) {
                token = args[i];

                if (!tokenMap[token]) {
                  tokens.push(token);
                  tokenMap[token] = true;
                }
              }
              /** Update the targeted attribute of the attached element if the token list's changed. */


              if (length !== tokens.length) {
                length = tokens.length >>> 0;

                if (_typeof(el[prop]) === "object") {
                  el[prop].baseVal = tokens.join(" ");
                } else {
                  el[prop] = tokens.join(" ");
                }

                reindex();
              }
            };

            that.remove = function () {
              preop.apply(that, args = arguments);
              /** Build a hash of token names to compare against when recollecting our token list. */

              for (var args, ignore = {}, i = 0, t = []; i < args.length; ++i) {
                ignore[args[i]] = true;
                delete tokenMap[args[i]];
              }
              /** Run through our tokens list and reassign only those that aren't defined in the hash declared above. */


              for (i = 0; i < tokens.length; ++i) if (!ignore[tokens[i]]) t.push(tokens[i]);

              tokens = t;
              length = t.length >>> 0;
              /** Update the targeted attribute of the attached element. */

              if (_typeof(el[prop]) === "object") {
                el[prop].baseVal = tokens.join(" ");
              } else {
                el[prop] = tokens.join(" ");
              }

              reindex();
            };

            that.toggle = function (token, force) {
              preop.apply(that, [token]);
              /** Token state's being forced. */

              if (undefined !== force) {
                if (force) {
                  that.add(token);
                  return true;
                } else {
                  that.remove(token);
                  return false;
                }
              }
              /** Token already exists in tokenList. Remove it, and return FALSE. */


              if (tokenMap[token]) {
                that.remove(token);
                return false;
              }
              /** Otherwise, add the token and return TRUE. */


              that.add(token);
              return true;
            };

            return that;
          };

          return _DOMTokenList;
        }();
      } // Add second argument to native DOMTokenList.toggle() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.toggle('x', false);
        if (!e.classList.contains('x')) return;

        e.classList.constructor.prototype.toggle = function toggle(token
        /*, force*/
        ) {
          var force = arguments[1];

          if (force === undefined) {
            var add = !this.contains(token);
            this[add ? 'add' : 'remove'](token);
            return add;
          }

          force = !!force;
          this[force ? 'add' : 'remove'](token);
          return force;
        };
      })(); // Add multiple arguments to native DOMTokenList.add() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.add('a', 'b');
        if (e.classList.contains('b')) return;
        var native = e.classList.constructor.prototype.add;

        e.classList.constructor.prototype.add = function () {
          var args = arguments;
          var l = arguments.length;

          for (var i = 0; i < l; i++) {
            native.call(this, args[i]);
          }
        };
      })(); // Add multiple arguments to native DOMTokenList.remove() if necessary


      (function () {
        var e = document.createElement('span');
        if (!('classList' in e)) return;
        e.classList.add('a');
        e.classList.add('b');
        e.classList.remove('a', 'b');
        if (!e.classList.contains('b')) return;
        var native = e.classList.constructor.prototype.remove;

        e.classList.constructor.prototype.remove = function () {
          var args = arguments;
          var l = arguments.length;

          for (var i = 0; i < l; i++) {
            native.call(this, args[i]);
          }
        };
      })();
    })(this);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Document/detect.js
    var detect = ("Document" in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Document&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      if (this.HTMLDocument) {
        // IE8
        // HTMLDocument is an extension of Document.  If the browser has HTMLDocument but not Document, the former will suffice as an alias for the latter.
        this.Document = this.HTMLDocument;
      } else {
        // Create an empty function to act as the missing constructor for the document object, attach the document object as its prototype.  The function needs to be anonymous else it is hoisted and causes the feature detect to prematurely pass, preventing the assignments below being made.
        this.Document = this.HTMLDocument = document.constructor = new Function('return function Document() {}')();
        this.Document.prototype = document;
      }
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Element/detect.js
    var detect = 'Element' in this && 'HTMLElement' in this;
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element&flags=always

    (function () {
      // IE8
      if (window.Element && !window.HTMLElement) {
        window.HTMLElement = window.Element;
        return;
      } // create Element constructor


      window.Element = window.HTMLElement = new Function('return function Element() {}')(); // generate sandboxed iframe

      var vbody = document.appendChild(document.createElement('body'));
      var frame = vbody.appendChild(document.createElement('iframe')); // use sandboxed iframe to replicate Element functionality

      var frameDocument = frame.contentWindow.document;
      var prototype = Element.prototype = frameDocument.appendChild(frameDocument.createElement('*'));
      var cache = {}; // polyfill Element.prototype on an element

      var shiv = function (element, deep) {
        var childNodes = element.childNodes || [],
            index = -1,
            key,
            value,
            childNode;

        if (element.nodeType === 1 && element.constructor !== Element) {
          element.constructor = Element;

          for (key in cache) {
            value = cache[key];
            element[key] = value;
          }
        }

        while (childNode = deep && childNodes[++index]) {
          shiv(childNode, deep);
        }

        return element;
      };

      var elements = document.getElementsByTagName('*');
      var nativeCreateElement = document.createElement;
      var interval;
      var loopLimit = 100;
      prototype.attachEvent('onpropertychange', function (event) {
        var propertyName = event.propertyName,
            nonValue = !cache.hasOwnProperty(propertyName),
            newValue = prototype[propertyName],
            oldValue = cache[propertyName],
            index = -1,
            element;

        while (element = elements[++index]) {
          if (element.nodeType === 1) {
            if (nonValue || element[propertyName] === oldValue) {
              element[propertyName] = newValue;
            }
          }
        }

        cache[propertyName] = newValue;
      });
      prototype.constructor = Element;

      if (!prototype.hasAttribute) {
        // <Element>.hasAttribute
        prototype.hasAttribute = function hasAttribute(name) {
          return this.getAttribute(name) !== null;
        };
      } // Apply Element prototype to the pre-existing DOM as soon as the body element appears.


      function bodyCheck() {
        if (!loopLimit--) clearTimeout(interval);

        if (document.body && !document.body.prototype && /(complete|interactive)/.test(document.readyState)) {
          shiv(document, true);
          if (interval && document.body.prototype) clearTimeout(interval);
          return !!document.body.prototype;
        }

        return false;
      }

      if (!bodyCheck()) {
        document.onreadystatechange = bodyCheck;
        interval = setInterval(bodyCheck, 25);
      } // Apply to any new elements created after load


      document.createElement = function createElement(nodeName) {
        var element = nativeCreateElement(String(nodeName).toLowerCase());
        return shiv(element);
      }; // remove sandboxed iframe


      document.removeChild(vbody);
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-service/8717a9e04ac7aff99b4980fbedead98036b0929a/packages/polyfill-library/polyfills/Element/prototype/classList/detect.js
    var detect = 'document' in this && "classList" in document.documentElement && 'Element' in this && 'classList' in Element.prototype && function () {
      var e = document.createElement('span');
      e.classList.add('a', 'b');
      return e.classList.contains('b');
    }();

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Element.prototype.classList&flags=always

    (function (global) {
      var dpSupport = true;

      var defineGetter = function (object, name, fn, configurable) {
        if (Object.defineProperty) Object.defineProperty(object, name, {
          configurable: false === dpSupport ? true : !!configurable,
          get: fn
        });else object.__defineGetter__(name, fn);
      };
      /** Ensure the browser allows Object.defineProperty to be used on native JavaScript objects. */


      try {
        defineGetter({}, "support");
      } catch (e) {
        dpSupport = false;
      }
      /** Polyfills a property with a DOMTokenList */


      var addProp = function (o, name, attr) {
        defineGetter(o.prototype, name, function () {
          var tokenList;
          var THIS = this,

          /** Prevent this from firing twice for some reason. What the hell, IE. */
          gibberishProperty = "__defineGetter__" + "DEFINE_PROPERTY" + name;
          if (THIS[gibberishProperty]) return tokenList;
          THIS[gibberishProperty] = true;
          /**
           * IE8 can't define properties on native JavaScript objects, so we'll use a dumb hack instead.
           *
           * What this is doing is creating a dummy element ("reflection") inside a detached phantom node ("mirror")
           * that serves as the target of Object.defineProperty instead. While we could simply use the subject HTML
           * element instead, this would conflict with element types which use indexed properties (such as forms and
           * select lists).
           */

          if (false === dpSupport) {
            var visage;
            var mirror = addProp.mirror || document.createElement("div");
            var reflections = mirror.childNodes;
            var l = reflections.length;

            for (var i = 0; i < l; ++i) if (reflections[i]._R === THIS) {
              visage = reflections[i];
              break;
            }
            /** Couldn't find an element's reflection inside the mirror. Materialise one. */


            visage || (visage = mirror.appendChild(document.createElement("div")));
            tokenList = DOMTokenList.call(visage, THIS, attr);
          } else tokenList = new DOMTokenList(THIS, attr);

          defineGetter(THIS, name, function () {
            return tokenList;
          });
          delete THIS[gibberishProperty];
          return tokenList;
        }, true);
      };

      addProp(global.Element, "classList", "className");
      addProp(global.HTMLElement, "classList", "className");
      addProp(global.HTMLLinkElement, "relList", "rel");
      addProp(global.HTMLAnchorElement, "relList", "rel");
      addProp(global.HTMLAreaElement, "relList", "rel");
    })(this);
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-library/master/polyfills/Element/prototype/nextElementSibling/detect.js
    var detect = 'document' in this && "nextElementSibling" in document.documentElement;
    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-library/master/polyfills/Element/prototype/nextElementSibling/polyfill.js

    Object.defineProperty(Element.prototype, "nextElementSibling", {
      get: function () {
        var el = this.nextSibling;

        while (el && el.nodeType !== 1) {
          el = el.nextSibling;
        }

        return el;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://raw.githubusercontent.com/Financial-Times/polyfill-library/master/polyfills/Element/prototype/previousElementSibling/detect.js
    var detect = 'document' in this && "previousElementSibling" in document.documentElement;
    if (detect) return; // Polyfill from https://raw.githubusercontent.com/Financial-Times/polyfill-library/master/polyfills/Element/prototype/previousElementSibling/polyfill.js

    Object.defineProperty(Element.prototype, 'previousElementSibling', {
      get: function () {
        var el = this.previousSibling;

        while (el && el.nodeType !== 1) {
          el = el.previousSibling;
        }

        return el;
      }
    });
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Window/detect.js
    var detect = ('Window' in this);
    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Window&flags=always

    if (typeof WorkerGlobalScope === "undefined" && typeof importScripts !== "function") {
      (function (global) {
        if (global.constructor) {
          global.Window = global.constructor;
        } else {
          (global.Window = global.constructor = new Function('return function Window() {}')()).prototype = this;
        }
      })(this);
    }
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  (function (undefined) {
    // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Event/detect.js
    var detect = function (global) {
      if (!('Event' in global)) return false;
      if (typeof global.Event === 'function') return true;

      try {
        // In IE 9-11, the Event object exists but cannot be instantiated
        new Event('click');
        return true;
      } catch (e) {
        return false;
      }
    }(this);

    if (detect) return; // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Event&flags=always

    (function () {
      var unlistenableWindowEvents = {
        click: 1,
        dblclick: 1,
        keyup: 1,
        keypress: 1,
        keydown: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1,
        mouseover: 1,
        mouseenter: 1,
        mouseleave: 1,
        mouseout: 1,
        storage: 1,
        storagecommit: 1,
        textinput: 1
      }; // This polyfill depends on availability of `document` so will not run in a worker
      // However, we asssume there are no browsers with worker support that lack proper
      // support for `Event` within the worker

      if (typeof document === 'undefined' || typeof window === 'undefined') return;

      function indexOf(array, element) {
        var index = -1,
            length = array.length;

        while (++index < length) {
          if (index in array && array[index] === element) {
            return index;
          }
        }

        return -1;
      }

      var existingProto = window.Event && window.Event.prototype || null;

      window.Event = Window.prototype.Event = function Event(type, eventInitDict) {
        if (!type) {
          throw new Error('Not enough arguments');
        }

        var event; // Shortcut if browser supports createEvent

        if ('createEvent' in document) {
          event = document.createEvent('Event');
          var bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
          var cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
          event.initEvent(type, bubbles, cancelable);
          return event;
        }

        event = document.createEventObject();
        event.type = type;
        event.bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
        event.cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
        return event;
      };

      if (existingProto) {
        Object.defineProperty(window.Event, 'prototype', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: existingProto
        });
      }

      if (!('createEvent' in document)) {
        window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function addEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1];

          if (element === window && type in unlistenableWindowEvents) {
            throw new Error('In IE8 the event: ' + type + ' is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.');
          }

          if (!element._events) {
            element._events = {};
          }

          if (!element._events[type]) {
            element._events[type] = function (event) {
              var list = element._events[event.type].list,
                  events = list.slice(),
                  index = -1,
                  length = events.length,
                  eventElement;

              event.preventDefault = function preventDefault() {
                if (event.cancelable !== false) {
                  event.returnValue = false;
                }
              };

              event.stopPropagation = function stopPropagation() {
                event.cancelBubble = true;
              };

              event.stopImmediatePropagation = function stopImmediatePropagation() {
                event.cancelBubble = true;
                event.cancelImmediate = true;
              };

              event.currentTarget = element;
              event.relatedTarget = event.fromElement || null;
              event.target = event.target || event.srcElement || element;
              event.timeStamp = new Date().getTime();

              if (event.clientX) {
                event.pageX = event.clientX + document.documentElement.scrollLeft;
                event.pageY = event.clientY + document.documentElement.scrollTop;
              }

              while (++index < length && !event.cancelImmediate) {
                if (index in events) {
                  eventElement = events[index];

                  if (indexOf(list, eventElement) !== -1 && typeof eventElement === 'function') {
                    eventElement.call(element, event);
                  }
                }
              }
            };

            element._events[type].list = [];

            if (element.attachEvent) {
              element.attachEvent('on' + type, element._events[type]);
            }
          }

          element._events[type].list.push(listener);
        };

        window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function removeEventListener() {
          var element = this,
              type = arguments[0],
              listener = arguments[1],
              index;

          if (element._events && element._events[type] && element._events[type].list) {
            index = indexOf(element._events[type].list, listener);

            if (index !== -1) {
              element._events[type].list.splice(index, 1);

              if (!element._events[type].list.length) {
                if (element.detachEvent) {
                  element.detachEvent('on' + type, element._events[type]);
                }

                delete element._events[type];
              }
            }
          }
        };

        window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function dispatchEvent(event) {
          if (!arguments.length) {
            throw new Error('Not enough arguments');
          }

          if (!event || typeof event.type !== 'string') {
            throw new Error('DOM Events Exception 0');
          }

          var element = this,
              type = event.type;

          try {
            if (!event.bubbles) {
              event.cancelBubble = true;

              var cancelBubbleEvent = function (event) {
                event.cancelBubble = true;
                (element || window).detachEvent('on' + type, cancelBubbleEvent);
              };

              this.attachEvent('on' + type, cancelBubbleEvent);
            }

            this.fireEvent('on' + type, event);
          } catch (error) {
            event.target = element;

            do {
              event.currentTarget = element;

              if ('_events' in element && typeof element._events[type] === 'function') {
                element._events[type].call(element, event);
              }

              if (typeof element['on' + type] === 'function') {
                element['on' + type].call(element, event);
              }

              element = element.nodeType === 9 ? element.parentWindow : element.parentNode;
            } while (element && !event.cancelBubble);
          }

          return true;
        }; // Add the DOMContentLoaded Event


        document.attachEvent('onreadystatechange', function () {
          if (document.readyState === 'complete') {
            document.dispatchEvent(new Event('DOMContentLoaded', {
              bubbles: true
            }));
          }
        });
      }
    })();
  }).call('object' === (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || 'object' === (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || 'object' === (typeof global === "undefined" ? "undefined" : _typeof(global)) && global || {});
  /**
   * TODO: Ideally this would be a NodeList.prototype.forEach polyfill
   * This seems to fail in IE8, requires more investigation.
   * See: https://github.com/imagitama/nodelist-foreach-polyfill
   */

  function nodeListForEach(nodes, callback) {
    if (window.NodeList.prototype.forEach) {
      return nodes.forEach(callback);
    }

    for (var i = 0; i < nodes.length; i++) {
      callback.call(window, nodes[i], i, nodes);
    }
  }

  function Tabs($module) {
    this.$module = $module;
    this.$tabs = $module.querySelectorAll('.govuk-tabs__tab');
    this.keys = {
      left: 37,
      right: 39,
      up: 38,
      down: 40
    };
    this.jsHiddenClass = 'govuk-tabs__panel--hidden';
  }

  Tabs.prototype.init = function () {
    if (typeof window.matchMedia === 'function') {
      this.setupResponsiveChecks();
    } else {
      this.setup();
    }
  };

  Tabs.prototype.setupResponsiveChecks = function () {
    this.mql = window.matchMedia('(min-width: 40.0625em)');
    this.mql.addListener(this.checkMode.bind(this));
    this.checkMode();
  };

  Tabs.prototype.checkMode = function () {
    if (this.mql.matches) {
      this.setup();
    } else {
      this.teardown();
    }
  };

  Tabs.prototype.setup = function () {
    var $module = this.$module;
    var $tabs = this.$tabs;
    var $tabList = $module.querySelector('.govuk-tabs__list');
    var $tabListItems = $module.querySelectorAll('.govuk-tabs__list-item');

    if (!$tabs || !$tabList || !$tabListItems) {
      return;
    }

    $tabList.setAttribute('role', 'tablist');
    nodeListForEach($tabListItems, function ($item) {
      $item.setAttribute('role', 'presentation');
    });
    nodeListForEach($tabs, function ($tab) {
      // Set HTML attributes
      this.setAttributes($tab); // Save bounded functions to use when removing event listeners during teardown

      $tab.boundTabClick = this.onTabClick.bind(this);
      $tab.boundTabKeydown = this.onTabKeydown.bind(this); // Handle events

      $tab.addEventListener('click', $tab.boundTabClick, true);
      $tab.addEventListener('keydown', $tab.boundTabKeydown, true); // Remove old active panels

      this.hideTab($tab);
    }.bind(this)); // Show either the active tab according to the URL's hash or the first tab

    var $activeTab = this.getTab(window.location.hash) || this.$tabs[0];
    this.showTab($activeTab); // Handle hashchange events

    $module.boundOnHashChange = this.onHashChange.bind(this);
    window.addEventListener('hashchange', $module.boundOnHashChange, true);
  };

  Tabs.prototype.teardown = function () {
    var $module = this.$module;
    var $tabs = this.$tabs;
    var $tabList = $module.querySelector('.govuk-tabs__list');
    var $tabListItems = $module.querySelectorAll('.govuk-tabs__list-item');

    if (!$tabs || !$tabList || !$tabListItems) {
      return;
    }

    $tabList.removeAttribute('role');
    nodeListForEach($tabListItems, function ($item) {
      $item.removeAttribute('role', 'presentation');
    });
    nodeListForEach($tabs, function ($tab) {
      // Remove events
      $tab.removeEventListener('click', $tab.boundTabClick, true);
      $tab.removeEventListener('keydown', $tab.boundTabKeydown, true); // Unset HTML attributes

      this.unsetAttributes($tab);
    }.bind(this)); // Remove hashchange event handler

    window.removeEventListener('hashchange', $module.boundOnHashChange, true);
  };

  Tabs.prototype.onHashChange = function (e) {
    var hash = window.location.hash;
    var $tabWithHash = this.getTab(hash);

    if (!$tabWithHash) {
      return;
    } // Prevent changing the hash


    if (this.changingHash) {
      this.changingHash = false;
      return;
    } // Show either the active tab according to the URL's hash or the first tab


    var $previousTab = this.getCurrentTab();
    this.hideTab($previousTab);
    this.showTab($tabWithHash);
    $tabWithHash.focus();
  };

  Tabs.prototype.hideTab = function ($tab) {
    this.unhighlightTab($tab);
    this.hidePanel($tab);
  };

  Tabs.prototype.showTab = function ($tab) {
    this.highlightTab($tab);
    this.showPanel($tab);
  };

  Tabs.prototype.getTab = function (hash) {
    return this.$module.querySelector('.govuk-tabs__tab[href="' + hash + '"]');
  };

  Tabs.prototype.setAttributes = function ($tab) {
    // set tab attributes
    var panelId = this.getHref($tab).slice(1);
    $tab.setAttribute('id', 'tab_' + panelId);
    $tab.setAttribute('role', 'tab');
    $tab.setAttribute('aria-controls', panelId);
    $tab.setAttribute('aria-selected', 'false');
    $tab.setAttribute('tabindex', '-1'); // set panel attributes

    var $panel = this.getPanel($tab);
    $panel.setAttribute('role', 'tabpanel');
    $panel.setAttribute('aria-labelledby', $tab.id);
    $panel.classList.add(this.jsHiddenClass);
  };

  Tabs.prototype.unsetAttributes = function ($tab) {
    // unset tab attributes
    $tab.removeAttribute('id');
    $tab.removeAttribute('role');
    $tab.removeAttribute('aria-controls');
    $tab.removeAttribute('aria-selected');
    $tab.removeAttribute('tabindex'); // unset panel attributes

    var $panel = this.getPanel($tab);
    $panel.removeAttribute('role');
    $panel.removeAttribute('aria-labelledby');
    $panel.classList.remove(this.jsHiddenClass);
  };

  Tabs.prototype.onTabClick = function (e) {
    if (!e.target.classList.contains('govuk-tabs__tab')) {
      // Allow events on child DOM elements to bubble up to tab parent
      return false;
    }

    e.preventDefault();
    var $newTab = e.target;
    var $currentTab = this.getCurrentTab();
    this.hideTab($currentTab);
    this.showTab($newTab);
    this.createHistoryEntry($newTab);
  };

  Tabs.prototype.createHistoryEntry = function ($tab) {
    var $panel = this.getPanel($tab); // Save and restore the id
    // so the page doesn't jump when a user clicks a tab (which changes the hash)

    var id = $panel.id;
    $panel.id = '';
    this.changingHash = true;
    window.location.hash = this.getHref($tab).slice(1);
    $panel.id = id;
  };

  Tabs.prototype.onTabKeydown = function (e) {
    switch (e.keyCode) {
      case this.keys.left:
      case this.keys.up:
        this.activatePreviousTab();
        e.preventDefault();
        break;

      case this.keys.right:
      case this.keys.down:
        this.activateNextTab();
        e.preventDefault();
        break;
    }
  };

  Tabs.prototype.activateNextTab = function () {
    var currentTab = this.getCurrentTab();
    var nextTabListItem = currentTab.parentNode.nextElementSibling;

    if (nextTabListItem) {
      var nextTab = nextTabListItem.querySelector('.govuk-tabs__tab');
    }

    if (nextTab) {
      this.hideTab(currentTab);
      this.showTab(nextTab);
      nextTab.focus();
      this.createHistoryEntry(nextTab);
    }
  };

  Tabs.prototype.activatePreviousTab = function () {
    var currentTab = this.getCurrentTab();
    var previousTabListItem = currentTab.parentNode.previousElementSibling;

    if (previousTabListItem) {
      var previousTab = previousTabListItem.querySelector('.govuk-tabs__tab');
    }

    if (previousTab) {
      this.hideTab(currentTab);
      this.showTab(previousTab);
      previousTab.focus();
      this.createHistoryEntry(previousTab);
    }
  };

  Tabs.prototype.getPanel = function ($tab) {
    var $panel = this.$module.querySelector(this.getHref($tab));
    return $panel;
  };

  Tabs.prototype.showPanel = function ($tab) {
    var $panel = this.getPanel($tab);
    $panel.classList.remove(this.jsHiddenClass);
  };

  Tabs.prototype.hidePanel = function (tab) {
    var $panel = this.getPanel(tab);
    $panel.classList.add(this.jsHiddenClass);
  };

  Tabs.prototype.unhighlightTab = function ($tab) {
    $tab.setAttribute('aria-selected', 'false');
    $tab.parentNode.classList.remove('govuk-tabs__list-item--selected');
    $tab.setAttribute('tabindex', '-1');
  };

  Tabs.prototype.highlightTab = function ($tab) {
    $tab.setAttribute('aria-selected', 'true');
    $tab.parentNode.classList.add('govuk-tabs__list-item--selected');
    $tab.setAttribute('tabindex', '0');
  };

  Tabs.prototype.getCurrentTab = function () {
    return this.$module.querySelector('.govuk-tabs__list-item--selected .govuk-tabs__tab');
  }; // this is because IE doesn't always return the actual value but a relative full path
  // should be a utility function most prob
  // http://labs.thesedays.com/blog/2010/01/08/getting-the-href-value-with-jquery-in-ie/


  Tabs.prototype.getHref = function ($tab) {
    var href = $tab.getAttribute('href');
    var hash = href.slice(href.indexOf('#'), href.length);
    return hash;
  };

  return Tabs;
});
},{}],"../node_modules/lbh-frontend/lbh/components/lbh-tabs/tabs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tabs = _interopRequireDefault(require("govuk-frontend/govuk/components/tabs/tabs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _tabs.default;
exports.default = _default;
},{"govuk-frontend/govuk/components/tabs/tabs":"../node_modules/govuk-frontend/govuk/components/tabs/tabs.js"}],"../node_modules/lbh-frontend/lbh/components/lbh-collapsible/collapsible.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function Collapsible($module) {
  this.$module = $module;
}

const handleToggle = (button, content) => {
  if (content.hasAttribute("hidden")) {
    content.removeAttribute("hidden");
    button.setAttribute("aria-expanded", true);
  } else {
    content.setAttribute("hidden", "");
    button.setAttribute("aria-expanded", false);
  }
};

Collapsible.prototype.init = function () {
  const button = this.$module.querySelector('[data-behavior="lbh-collapsible-toggle"]');
  const content = this.$module.querySelector('[data-behavior="lbh-collapsible-content"]');
  button.addEventListener("click", () => handleToggle(button, content));
};

var _default = Collapsible;
exports.default = _default;
},{}],"../node_modules/lbh-frontend/lbh/all.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAll = initAll;
Object.defineProperty(exports, "Accordion", {
  enumerable: true,
  get: function () {
    return _accordion.default;
  }
});
Object.defineProperty(exports, "BackToTop", {
  enumerable: true,
  get: function () {
    return _backToTop.default;
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function () {
    return _button.default;
  }
});
Object.defineProperty(exports, "CharacterCount", {
  enumerable: true,
  get: function () {
    return _characterCount.default;
  }
});
Object.defineProperty(exports, "Checkboxes", {
  enumerable: true,
  get: function () {
    return _checkboxes.default;
  }
});
Object.defineProperty(exports, "CookieBanner", {
  enumerable: true,
  get: function () {
    return _cookieBanner.default;
  }
});
Object.defineProperty(exports, "Details", {
  enumerable: true,
  get: function () {
    return _details.default;
  }
});
Object.defineProperty(exports, "ErrorSummary", {
  enumerable: true,
  get: function () {
    return _errorSummary.default;
  }
});
Object.defineProperty(exports, "Map", {
  enumerable: true,
  get: function () {
    return _contactBlock.default;
  }
});
Object.defineProperty(exports, "Radios", {
  enumerable: true,
  get: function () {
    return _radios.default;
  }
});
Object.defineProperty(exports, "Tabs", {
  enumerable: true,
  get: function () {
    return _tabs.default;
  }
});
Object.defineProperty(exports, "Collapsible", {
  enumerable: true,
  get: function () {
    return _collapsible.default;
  }
});

var _govukFrontend = _interopRequireDefault(require("govuk-frontend"));

var _accordion = _interopRequireDefault(require("./components/lbh-accordion/accordion"));

var _backToTop = _interopRequireDefault(require("./components/lbh-back-to-top/back-to-top"));

var _button = _interopRequireDefault(require("./components/lbh-button/button"));

var _characterCount = _interopRequireDefault(require("./components/lbh-character-count/character-count"));

var _checkboxes = _interopRequireDefault(require("./components/lbh-checkboxes/checkboxes"));

var _cookieBanner = _interopRequireDefault(require("./components/lbh-cookie-banner/cookie-banner"));

var _details = _interopRequireDefault(require("./components/lbh-details/details"));

var _errorSummary = _interopRequireDefault(require("./components/lbh-error-summary/error-summary"));

var _contactBlock = _interopRequireDefault(require("./components/lbh-contact-block/contact-block"));

var _radios = _interopRequireDefault(require("./components/lbh-radios/radios"));

var _tabs = _interopRequireDefault(require("./components/lbh-tabs/tabs"));

var _collapsible = _interopRequireDefault(require("./components/lbh-collapsible/collapsible"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nodeListForEach(nodes, callback) {
  if (window.NodeList.prototype.forEach) {
    return nodes.forEach(callback);
  }

  for (var i = 0; i < nodes.length; i++) {
    callback.call(window, nodes[i], i, nodes);
  }
}

function initAll(options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== "undefined" ? options : {};

  _govukFrontend.default.initAll(); // Allow the user to initialise GOV.UK Frontend in only certain sections of the page
  // Defaults to the entire document if nothing is set.


  var scope = typeof options.scope !== "undefined" ? options.scope : document;
  var $cookieBanner = scope.querySelector('[data-module="lbh-cookie-banner"]');

  if ($cookieBanner) {
    new _cookieBanner.default($cookieBanner).init();
  }

  var $maps = scope.querySelectorAll('[data-module="lbh-map"]');
  nodeListForEach($maps, function ($map) {
    new _contactBlock.default($map).init();
  });
  var $backToTop = scope.querySelector('[data-module="lbh-back-to-top"]');

  if ($backToTop) {
    new _backToTop.default($backToTop).init();
  }

  const $collapsibles = scope.querySelectorAll('[data-module="lbh-collapsible"]');
  nodeListForEach($collapsibles, function ($collapsible) {
    new _collapsible.default($collapsible).init();
  });
}
},{"govuk-frontend":"../node_modules/govuk-frontend/govuk/all.js","./components/lbh-accordion/accordion":"../node_modules/lbh-frontend/lbh/components/lbh-accordion/accordion.js","./components/lbh-back-to-top/back-to-top":"../node_modules/lbh-frontend/lbh/components/lbh-back-to-top/back-to-top.js","./components/lbh-button/button":"../node_modules/lbh-frontend/lbh/components/lbh-button/button.js","./components/lbh-character-count/character-count":"../node_modules/lbh-frontend/lbh/components/lbh-character-count/character-count.js","./components/lbh-checkboxes/checkboxes":"../node_modules/lbh-frontend/lbh/components/lbh-checkboxes/checkboxes.js","./components/lbh-cookie-banner/cookie-banner":"../node_modules/lbh-frontend/lbh/components/lbh-cookie-banner/cookie-banner.js","./components/lbh-details/details":"../node_modules/lbh-frontend/lbh/components/lbh-details/details.js","./components/lbh-error-summary/error-summary":"../node_modules/lbh-frontend/lbh/components/lbh-error-summary/error-summary.js","./components/lbh-contact-block/contact-block":"../node_modules/lbh-frontend/lbh/components/lbh-contact-block/contact-block.js","./components/lbh-radios/radios":"../node_modules/lbh-frontend/lbh/components/lbh-radios/radios.js","./components/lbh-tabs/tabs":"../node_modules/lbh-frontend/lbh/components/lbh-tabs/tabs.js","./components/lbh-collapsible/collapsible":"../node_modules/lbh-frontend/lbh/components/lbh-collapsible/collapsible.js"}],"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],"../node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/path-browserify/index.js":[function(require,module,exports) {
var process = require("process");
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

},{"process":"../node_modules/process/browser.js"}],"../node_modules/dotenv/lib/main.js":[function(require,module,exports) {
var process = require("process");
/*::

type DotenvParseOptions = {
  debug?: boolean
}

// keys and values from src
type DotenvParseOutput = { [string]: string }

type DotenvConfigOptions = {
  path?: string, // path to .env file
  encoding?: string, // encoding of .env file
  debug?: string // turn on logging for debugging purposes
}

type DotenvConfigOutput = {
  parsed?: DotenvParseOutput,
  error?: Error
}

*/
var fs = require('fs');

var path = require('path');

function log(message
/*: string */
) {
  console.log("[dotenv][DEBUG] ".concat(message));
}

var NEWLINE = '\n';
var RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
var RE_NEWLINES = /\\n/g;
var NEWLINES_MATCH = /\n|\r|\r\n/; // Parses src into an Object

function parse(src
/*: string | Buffer */
, options
/*: ?DotenvParseOptions */
)
/*: DotenvParseOutput */
{
  var debug = Boolean(options && options.debug);
  var obj = {}; // convert Buffers before splitting into lines and processing

  src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    var keyValueArr = line.match(RE_INI_KEY_VAL); // matched?

    if (keyValueArr != null) {
      var key = keyValueArr[1]; // default undefined or missing values to empty string

      var val = keyValueArr[2] || '';
      var end = val.length - 1;
      var isDoubleQuoted = val[0] === '"' && val[end] === '"';
      var isSingleQuoted = val[0] === "'" && val[end] === "'"; // if single or double quoted, remove quotes

      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end); // if double quoted, expand newlines

        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE);
        }
      } else {
        // remove surrounding whitespace
        val = val.trim();
      }

      obj[key] = val;
    } else if (debug) {
      log("did not match key and value when parsing line ".concat(idx + 1, ": ").concat(line));
    }
  });
  return obj;
} // Populates process.env from .env file


function config(options
/*: ?DotenvConfigOptions */
)
/*: DotenvConfigOutput */
{
  var dotenvPath = path.resolve(process.cwd(), '.env');
  var encoding
  /*: string */
  = 'utf8';
  var debug = false;

  if (options) {
    if (options.path != null) {
      dotenvPath = options.path;
    }

    if (options.encoding != null) {
      encoding = options.encoding;
    }

    if (options.debug != null) {
      debug = true;
    }
  }

  try {
    // specifying an encoding returns a string instead of a buffer
    var parsed = parse(fs.readFileSync(dotenvPath, {
      encoding: encoding
    }), {
      debug: debug
    });
    Object.keys(parsed).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {
        process.env[key] = parsed[key];
      } else if (debug) {
        log("\"".concat(key, "\" is already defined in `process.env` and will not be overwritten"));
      }
    });
    return {
      parsed: parsed
    };
  } catch (e) {
    return {
      error: e
    };
  }
}

module.exports.config = config;
module.exports.parse = parse;
},{"fs":"../node_modules/parcel-bundler/src/builtins/_empty.js","path":"../node_modules/path-browserify/index.js","process":"../node_modules/process/browser.js"}],"../node_modules/axios/lib/helpers/bind.js":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"../node_modules/axios/lib/utils.js":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

},{"./helpers/bind":"../node_modules/axios/lib/helpers/bind.js"}],"../node_modules/axios/lib/helpers/buildURL.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/InterceptorManager.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/transformData.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/cancel/isCancel.js":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"../node_modules/axios/lib/helpers/normalizeHeaderName.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/enhanceError.js":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],"../node_modules/axios/lib/core/createError.js":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"../node_modules/axios/lib/core/enhanceError.js"}],"../node_modules/axios/lib/core/settle.js":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"../node_modules/axios/lib/core/createError.js"}],"../node_modules/axios/lib/helpers/cookies.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/helpers/isAbsoluteURL.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"../node_modules/axios/lib/helpers/combineURLs.js":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"../node_modules/axios/lib/core/buildFullPath.js":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"../node_modules/axios/lib/helpers/isAbsoluteURL.js","../helpers/combineURLs":"../node_modules/axios/lib/helpers/combineURLs.js"}],"../node_modules/axios/lib/helpers/parseHeaders.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/helpers/isURLSameOrigin.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/adapters/xhr.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"../node_modules/axios/lib/utils.js","./../core/settle":"../node_modules/axios/lib/core/settle.js","./../helpers/cookies":"../node_modules/axios/lib/helpers/cookies.js","./../helpers/buildURL":"../node_modules/axios/lib/helpers/buildURL.js","../core/buildFullPath":"../node_modules/axios/lib/core/buildFullPath.js","./../helpers/parseHeaders":"../node_modules/axios/lib/helpers/parseHeaders.js","./../helpers/isURLSameOrigin":"../node_modules/axios/lib/helpers/isURLSameOrigin.js","../core/createError":"../node_modules/axios/lib/core/createError.js"}],"../node_modules/axios/lib/defaults.js":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"../node_modules/axios/lib/utils.js","./helpers/normalizeHeaderName":"../node_modules/axios/lib/helpers/normalizeHeaderName.js","./adapters/xhr":"../node_modules/axios/lib/adapters/xhr.js","./adapters/http":"../node_modules/axios/lib/adapters/xhr.js","process":"../node_modules/process/browser.js"}],"../node_modules/axios/lib/core/dispatchRequest.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"../node_modules/axios/lib/utils.js","./transformData":"../node_modules/axios/lib/core/transformData.js","../cancel/isCancel":"../node_modules/axios/lib/cancel/isCancel.js","../defaults":"../node_modules/axios/lib/defaults.js"}],"../node_modules/axios/lib/core/mergeConfig.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

},{"../utils":"../node_modules/axios/lib/utils.js"}],"../node_modules/axios/lib/core/Axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../utils":"../node_modules/axios/lib/utils.js","../helpers/buildURL":"../node_modules/axios/lib/helpers/buildURL.js","./InterceptorManager":"../node_modules/axios/lib/core/InterceptorManager.js","./dispatchRequest":"../node_modules/axios/lib/core/dispatchRequest.js","./mergeConfig":"../node_modules/axios/lib/core/mergeConfig.js"}],"../node_modules/axios/lib/cancel/Cancel.js":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"../node_modules/axios/lib/cancel/CancelToken.js":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"../node_modules/axios/lib/cancel/Cancel.js"}],"../node_modules/axios/lib/helpers/spread.js":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"../node_modules/axios/lib/helpers/isAxiosError.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

},{}],"../node_modules/axios/lib/axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"../node_modules/axios/lib/utils.js","./helpers/bind":"../node_modules/axios/lib/helpers/bind.js","./core/Axios":"../node_modules/axios/lib/core/Axios.js","./core/mergeConfig":"../node_modules/axios/lib/core/mergeConfig.js","./defaults":"../node_modules/axios/lib/defaults.js","./cancel/Cancel":"../node_modules/axios/lib/cancel/Cancel.js","./cancel/CancelToken":"../node_modules/axios/lib/cancel/CancelToken.js","./cancel/isCancel":"../node_modules/axios/lib/cancel/isCancel.js","./helpers/spread":"../node_modules/axios/lib/helpers/spread.js","./helpers/isAxiosError":"../node_modules/axios/lib/helpers/isAxiosError.js"}],"../node_modules/axios/index.js":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"../node_modules/axios/lib/axios.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _lbhFrontend = require("lbh-frontend");

//import { initAll } from "lbh-frontend";
//load the dotenv config in order to use the process.env variables
var regeneratorRuntime = require("regenerator-runtime");

var dotenv = require('dotenv').config();

var axios = require('axios').default; //activate the start button


document.getElementById("start-button").onclick = function () {
  document.getElementById("location-search").hidden = false;
  document.getElementById("start-button").style.display = "none";
  window.scrollBy(0, 100);
}; // Create a variable for the postcode. 


var postcode = document.getElementById('postcode'); //Enter key listener that calls the GetAddressesviaPoxy function

postcode.addEventListener('keyup', function (e) {
  if (e.key == 'Enter') {
    GetAddressesViaProxy();
  }
}); //eventlistener for the button

document.getElementById("search").addEventListener("click", GetAddressesViaProxy); //listener for the clear x in the input

postcode.addEventListener("search", function (e) {
  document.getElementById("error_message").innerHTML = "";
  document.getElementById("addresses").innerHTML = '';
  document.getElementById("address-details").innerHTML = "";
  document.getElementById("show-results-button-div").innerHTML = "";
  document.getElementById("results").innerHTML = "";
  document.getElementById("map-link").innerHTML = "";
  document.getElementById("map-header").innerHTML = "";
  document.getElementById("map-iframe").style.display = 'none';
});

function GetAddressesViaProxy() {
  document.getElementById("error_message").innerHTML = "";
  document.getElementById("addresses").innerHTML = '<p class="loading-text"> Loading addresses...</p>';
  document.getElementById("address-details").innerHTML = "";
  document.getElementById("show-results-button-div").innerHTML = "";
  document.getElementById("results").innerHTML = "";
  document.getElementById("map-link").innerHTML = "";
  document.getElementById("map-header").innerHTML = "";
  document.getElementById("map-iframe").style.display = 'none';
  document.getElementById("addresses").scrollIntoView({
    block: "nearest"
  }); //Get the postcode value

  var address_input = document.getElementById("postcode").value; //test agains postcode regex

  var postcode_regex = new RegExp("^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$");
  var isPostcode = postcode_regex.test(address_input);
  var results = null;

  if (!address_input) {
    document.getElementById("error_message").innerHTML = "Please enter some text in the location search.";
  } else {
    //prepare query to send to the API, depending if we ave got a postcode or not
    var APIQueryString = '';

    if (isPostcode) {
      APIQueryString = "".concat("https://zwb5f0hl7b.execute-api.us-east-1.amazonaws.com/production/address-v2-proxy", "?format=detailed&postcode=").concat(address_input);
    } else {
      APIQueryString = "".concat("https://zwb5f0hl7b.execute-api.us-east-1.amazonaws.com/production/address-v2-proxy", "?format=detailed&query=").concat(address_input);
    } //First call to get the list of addresses from a postcode


    fetch(APIQueryString, {
      method: "get"
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      //Get API error messages if the UPRN values are not right
      if (data.data.errors) {
        document.getElementById("error_message").innerHTML = response.data.errors[0].message;
        document.getElementById("addresses").innerHTML = ''; //If there are no errors...
      } else {
        results = data.data.data.address;
        var pageCount = data.data.data.pageCount; //If there are no results, the postcode is not right. 

        if (results.length === 0) {
          document.getElementById("error_message").innerHTML = "No Hackney location found. Please amend your search.";
          document.getElementById("addresses").innerHTML = '';
          document.getElementById("address-details").innerHTML = '';
        } else {
          //If there are results from the addresses proxy, we list them. 
          //first, replace list element with a clone of itself, in order to remove previous listeners
          //let listElement = document.getElementById("addresses");
          document.getElementById("addresses").replaceWith(document.getElementById("addresses").cloneNode(true)); //now fill the list

          document.getElementById("addresses").innerHTML = "<div class='govuk-form-group lbh-form-group'>" + "<select class='govuk-select govuk-!-width-full lbh-select' id='selectedAddress' name='selectedAddress'>";
          document.getElementById("selectedAddress").innerHTML = "<option disabled selected value> Select a location from the list </option>";

          for (var index = 0; index < results.length; ++index) {
            if (results[index].addressStatus == 'Approved') {
              document.getElementById("selectedAddress").innerHTML += "<option value='" + results[index].UPRN + "//" + results[index].singleLineAddress + "//" + results[index].usageDescription + "//" + results[index].ward + "'>" + results[index].singleLineAddress + "</option>";
            }
          } //load more pages of results if needed


          if (pageCount > 1) {
            for (var pgindex = 2; pgindex <= pageCount; ++pgindex) {
              loadAddressAPIPageViaProxy(postcode, pgindex);
            }
          } //close list of addresses


          document.getElementById("addresses").innerHTML += "</select></div>"; //capture the change event - when an address is selected - we load the list of results (all the planning constrainst affecting the selected address) using the UPRN selected. 

          document.getElementById("addresses").addEventListener('change', function (event) {
            //get the selected UPRN and address details from the list of addresses
            var selectedAddressDetails = document.querySelector('#selectedAddress').value.split('//');
            var selectedUPRN = selectedAddressDetails[0];
            showAddressDetails(selectedAddressDetails); //hide components below address details

            document.getElementById("results").innerHTML = "";
            document.getElementById("map-link").innerHTML = "";
            document.getElementById("map-header").innerHTML = "";
            document.getElementById("map-iframe").style.display = 'none';
          });
          window.scrollBy(0, 50);
        }
      }
    }).catch(function (error) {
      document.getElementById("error_message").innerHTML = "Sorry, an error occured while retrieving locations";
      document.getElementById("addresses").innerHTML = '';
    });
  }
}

; //function to add one page of results to the options list

function loadAddressAPIPageViaProxy(postcode, pg) {
  var results = null;
  var full_address = null;
  var UPRN = null;
  fetch("".concat("https://zwb5f0hl7b.execute-api.us-east-1.amazonaws.com/production/address-v2-proxy", "?format=detailed&query=").concat(postcode, "&page=").concat(pg), {
    method: "get"
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    results = data.data.data.address;

    for (var index = 0; index < results.length; ++index) {
      if (results[index].addressStatus == 'Approved') {
        document.getElementById("selectedAddress").innerHTML += "<option value='" + results[index].uprn + "/" + results[index].singleLineAddress + "/" + results[index].usageDescription + "/" + results[index].ward + "'>" + results[index].singleLineAddress + "</option>";
      }
    }
  });
}

;

function showAddressDetails(selectedAddressDetails) {
  document.getElementById('address-details').innerHTML = "<h3>Selected location: </h3>";
  document.getElementById('address-details').innerHTML += "<dl class=\"govuk-summary-list lbh-summary-list\">\n      <div class=\"govuk-summary-list__row\">\n        <dt class=\"govuk-summary-list__key\">Address</dt>\n        <dd class=\"govuk-summary-list__value\">".concat(toTitleCase(selectedAddressDetails[1]), "</dd>\n      </div>\n      <div class=\"govuk-summary-list__row\">\n        <dt class=\"govuk-summary-list__key\">Usage</dt>\n        <dd class=\"govuk-summary-list__value\">").concat(selectedAddressDetails[2], "</dd>\n      </div>\n      <div class=\"govuk-summary-list__row\">\n        <dt class=\"govuk-summary-list__key\">Ward</dt>\n        <dd class=\"govuk-summary-list__value\">").concat(selectedAddressDetails[3], "</dd>\n      </div>\n      <div class=\"govuk-summary-list__row\">\n        <dt class=\"govuk-summary-list__key\">Unique Property <br>Reference Number</dt>\n        <dd class=\"govuk-summary-list__value\">").concat(selectedAddressDetails[0], "</dd>\n      </div>\n    </dl>");
  showPlanningInfoButton(selectedAddressDetails[0]); // window.parent.scrollBy(0,200);
}

function showPlanningInfoButton(selectedUPRN) {
  //Add button to load planning info as accordion  
  document.getElementById("show-results-button-div").innerHTML = "<button id='show-results-button' class='govuk-button  lbh-button' data-module='govuk-button'><span><i class='fa-solid fa-list'></i></span></i> &nbsp; View planning information on this location</button>"; //local test link
  //document.getElementById("map-link").innerHTML = "<button class='govuk-button  lbh-button' data-module='govuk-button' href='http://localhost:9000/planning-constraints/index.html?uprn="+ selectedUPRN + "' target='_blank'><span><i class="fa-solid fa-location-dot"></i></span></i> &nbsp; View planning information on a map</button>";
  //load the map when clicking on the button

  document.getElementById("show-results-button").onclick = function loadInfo() {
    loadPlanningConstraints(selectedUPRN);
  }; //Scroll down to show the show results button


  document.getElementById("show-results-button-div").scrollIntoView(true);
}

function loadPlanningConstraints(selectedUPRN) {
  //message about loading
  document.getElementById('results').innerHTML = '<p class="loading-text"> Retrieving planning information...</p>';
  document.getElementById("map-link").innerHTML = "";
  document.getElementById("map-iframe").style.display = 'none';
  document.getElementById("results").scrollIntoView({
    block: "nearest"
  }); //call to the planning constraints layer where we have all the planning information for each UPRN

  axios.get("".concat("https://map2.hackney.gov.uk/geoserver/planning/ows/", "?service=WFS&version=1.0.0&request=GetFeature&outputFormat=json&typeName=planning_constraints_by_uprn&cql_filter=uprn='").concat(selectedUPRN, "'")).then(function (res) {
    //Variables
    var iswithinCA = res.data.features[0].properties.within_conservation_area;
    var iswithinLocallyListedBuilding = res.data.features[0].properties.within_locally_building;
    var iswithinListedBuilding = res.data.features[0].properties.within_statutory_building;
    var iswithinTPOArea = res.data.features[0].properties.within_tpo_area;
    var containsTPOPoint = res.data.features[0].properties.contains_tpo_point;
    var iswithinLivePlanningApp = res.data.features[0].properties.within_live_planning_app;
    var ward = res.data.features[0].properties.ward;
    var textSection = "";

    if (iswithinCA === 'yes') {
      textSection += "<div class='govuk-accordion__section'>\n          <div class='govuk-accordion__section-header'>\n            <h5 class='govuk-accordion__section-heading'>\n            <span class='govuk-accordion__section-button' id='default-example-heading-1'> \n            Conservation Area \n            </span></h5>\n          </div>\n          <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>\n          <p>This location is inside (or partly inside) ".concat(res.data.features[0].properties.ca_name, " conservation area.</p>\n          </div>\n        </div>");
    }

    if (iswithinListedBuilding === 'yes') {
      textSection += "<div class='govuk-accordion__section'>\n          <div class='govuk-accordion__section-header'>\n            <h5 class='govuk-accordion__section-heading'>\n            <span class='govuk-accordion__section-button' id='default-example-heading-1'> \n            Statutory Listed Building\n            </span></h5>\n          </div>\n          <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>\n          <p>This location is in a statutory listed building:</p> \n          <ul class='lbh-list lbh-list'><li>List entry number: ".concat(res.data.features[0].properties.statutory_building_list_entry, " <br> Date first listed: ").concat(res.data.features[0].properties.statutory_building_listed_date, " <br> Grade: ").concat(res.data.features[0].properties.statutory_building_grade, " <br> For more information, visit the <a href='").concat(res.data.features[0].properties.statutory_building_hyperlink, "' target='_blank'>Historic England website.</a></li></ul>\n          </div>\n        </div>");
    }

    if (iswithinLocallyListedBuilding === 'yes') {
      textSection += "<div class='govuk-accordion__section'>\n          <div class='govuk-accordion__section-header'>\n            <h5 class='govuk-accordion__section-heading'>\n            <span class='govuk-accordion__section-button' id='default-example-heading-1'> \n            Locally Listed Building\n            </span></h5>\n          </div>\n          <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>\n          <p>This location is in a locally listed building: </p>  \n          <ul class='lbh-list lbh-list'><li>List entry number: ".concat(res.data.features[0].properties.locally_building_list_entry, " <br> Date first listed: ").concat(res.data.features[0].properties.locally_building_listed_date, " <br> Grade: ").concat(res.data.features[0].properties.locally_building_grade, " <br> For more information, visit the <a href='").concat(res.data.features[0].properties.locally_building_hyperlink, "' target='_blank'>Historic England website.</a></li></ul>\n          </div>\n        </div>");
    }

    if (iswithinTPOArea === 'yes') {
      textSection += "<div class='govuk-accordion__section'>\n        <div class='govuk-accordion__section-header'>\n          <h5 class='govuk-accordion__section-heading'>\n          <span class='govuk-accordion__section-button' id='default-example-heading-1'> \n          Tree Preservation Orders (TPOs)\n          </span></h5>\n        </div>\n        <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>\n        <p>There is at least one protected tree within the location boundaries:</p> \n          <ul class='lbh-list lbh-list'><li>TPO number: ".concat(res.data.features[0].properties.tpo_area_number, " <br> Specie: ").concat(res.data.features[0].properties.tpo_area_specie, " </a></li></ul>\n          </div>\n      </div>");
    }

    if (containsTPOPoint === 'yes') {
      textSection += "<div class='govuk-accordion__section'>\n        <div class='govuk-accordion__section-header'>\n          <h5 class='govuk-accordion__section-heading'>\n          <span class='govuk-accordion__section-button' id='default-example-heading-1'> \n          Tree Preservation Orders (TPOs)\n          </span></h5>\n        </div>\n        <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>\n        <p>There is at least one protected tree within the location boundaries:</p>\n          <ul class='lbh-list lbh-list'><li>TPO number: ".concat(res.data.features[0].properties.tpo_point_number, " <br> Specie: ").concat(res.data.features[0].properties.tpo_point_specie, " </a></li></ul>\n        </div>\n      </div>");
    }

    if (iswithinLivePlanningApp === 'yes') {
      textSection += "<div class='govuk-accordion__section'>\n            <div class='govuk-accordion__section-header'>\n              <h5 class='govuk-accordion__section-heading'>\n              <span class='govuk-accordion__section-button' id='default-example-heading-1'> \n              Active Planning Applications\n              </span></h5>\n            </div>\n            <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>\n            <p>There is at least one ongoing planning application on this location:</p>\n              <ul class='lbh-list lbh-list'><li>Planning Application Reference Number: ".concat(res.data.features[0].properties.planning_app_ref_number, " <br> Planning Application Type: ").concat(res.data.features[0].properties.planning_app_type, " <br> Date it was received: ").concat(res.data.features[0].properties.planning_app_received_date, " <br>  ").concat(res.data.features[0].properties.planning_app_register_link, "</a></li></ul>\n            </div>\n          </div>");
    } //Split A4D names as list items


    var a4d_list = res.data.features[0].properties.a4d_names.split(",");
    var a4d_list_items = "";

    for (var index = 0; index < a4d_list.length; ++index) {
      a4d_list_items += "<li>" + a4d_list[index] + "</li>";
    }

    textSection += "<div class='govuk-accordion__section'>\n          <div class='govuk-accordion__section-header'>\n            <h5 class='govuk-accordion__section-heading'>\n            <span class='govuk-accordion__section-button' id='default-example-heading-1'> \n            Article 4 Directions\n            </span></h5>\n          </div>\n          <div id='default-example-content-1' class='govuk-accordion__section-content' aria-labelledby='default-example-heading-1'>\n            <p>This location falls in the following <a href=\"https://hackney.gov.uk/article-4-directions\" target='_blank'>Article 4 Directions</a> areas:</p>\n            <ul class='lbh-list lbh-list--bullet'>" + a4d_list_items + "</ul>\n          </div>\n        </div>"; //List the results using an accordion. 

    document.getElementById('results').innerHTML = "<h3>Planning information relevant to this location: </h3><div class='govuk-accordion myClass lbh-accordion' data-module='govuk-accordion' id='default-example' data-attribute='value'>" + textSection + "</div>"; //remove the button above

    document.getElementById("show-results-button-div").innerHTML = ""; //Activate the JS of the component

    var accordion = document.querySelector('[data-module="govuk-accordion"]');

    if (accordion) {
      new _lbhFrontend.Accordion(accordion).init();
    } //Add button to the planning constraints map  
    //live link    


    document.getElementById("map-link").innerHTML = "<button id='map-link-button' class='govuk-button  lbh-button' data-module='govuk-button'><span><i class='fa-solid fa-location-dot'></i></span></i> &nbsp; View this planning information on a map</button>"; //local test link
    //document.getElementById("map-link").innerHTML = "<button class='govuk-button  lbh-button' data-module='govuk-button' href='http://localhost:9000/planning-constraints/index.html?uprn="+ selectedUPRN + "' target='_blank'><span><i class="fa-solid fa-location-dot"></i></span></i> &nbsp; View planning information on a map</button>";
    //load the map when clicking on the button

    document.getElementById("map-link").onclick = function loadMap() {
      document.getElementById('map-header').innerHTML = '<p class="loading-text"> Loading map...</p>';
      document.getElementById("map-header").scrollIntoView({
        block: "nearest"
      });
      document.getElementById("map-iframe").src = 'https://map2.hackney.gov.uk/maps/planning-constraints/embed?uprn=' + selectedUPRN;
      document.getElementById("map-iframe").style.display = 'block';
      setTimeout(function () {
        document.getElementById("map-header").innerHTML = "<h3>Map view:</h3>";
      }, 4500);
      setTimeout(function () {
        document.getElementById("map-link").innerHTML = "";
      }, 4500);
      setTimeout(function () {
        document.getElementById("map-header").scrollIntoView(true);
      }, 4500); //Scroll down to show the map

      window.scrollBy(0, 400);
    }; //Scroll down to see the results list


    document.getElementById("map-header").scrollIntoView(true);
  }).catch(function (error) {
    //Catch geoserver error
    document.getElementById("error_message").innerHTML = 'Sorry, there was a problem retrieving the results for this address.';
  });
}

function toTitleCase(str) {
  var wordArr = str.split(" ");
  var i = 0;
  var titeCaseStr = '';

  for (i = 0; i < wordArr.length - 2; i++) {
    titeCaseStr += wordArr[i][0].toUpperCase() + wordArr[i].substring(1).toLowerCase() + " ";
  }

  titeCaseStr += wordArr[wordArr.length - 2] + " " + wordArr[wordArr.length - 1];
  return titeCaseStr;
}
},{"lbh-frontend":"../node_modules/lbh-frontend/lbh/all.js","regenerator-runtime":"../node_modules/regenerator-runtime/runtime.js","dotenv":"../node_modules/dotenv/lib/main.js","axios":"../node_modules/axios/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50990" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map