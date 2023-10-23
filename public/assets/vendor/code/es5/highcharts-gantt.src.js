/**
 * @license Highcharts Gantt JS v11.1.0 (2023-06-05)
 *
 * (c) 2017-2021 Lars Cabrera, Torstein Honsi, Jon Arild Nygard & Oystein Moseng
 *
 * License: www.highcharts.com/license
 */
(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = root.document ?
            factory(root) :
            factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/highcharts-gantt', function () {
            return factory(root);
        });
    } else {
        if (root.Highcharts) {
            root.Highcharts.error(16, true);
        }
        root.Highcharts = factory(root);
    }
}(typeof window !== 'undefined' ? window : this, function (window) {
    'use strict';
    var _modules = {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(
                    new CustomEvent(
                        'HighchartsModuleLoaded',
                        { detail: { path: path, module: obj[path] }
                    })
                );
            }
        }
    }
    _registerModule(_modules, 'Core/Globals.js', [], function () {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Namespace
         *
         * */
        /**
         * Shared Highcharts properties.
         * @private
         */
        var Globals;
        (function (Globals) {
            /* *
             *
             *  Constants
             *
             * */
            Globals.SVG_NS = 'http://www.w3.org/2000/svg', Globals.product = 'Highcharts', Globals.version = '11.1.0', Globals.win = (typeof window !== 'undefined' ?
                window :
                {}), // eslint-disable-line node/no-unsupported-features/es-builtins
            Globals.doc = Globals.win.document, Globals.svg = (Globals.doc &&
                Globals.doc.createElementNS &&
                !!Globals.doc.createElementNS(Globals.SVG_NS, 'svg').createSVGRect), Globals.userAgent = (Globals.win.navigator && Globals.win.navigator.userAgent) || '', Globals.isChrome = Globals.userAgent.indexOf('Chrome') !== -1, Globals.isFirefox = Globals.userAgent.indexOf('Firefox') !== -1, Globals.isMS = /(edge|msie|trident)/i.test(Globals.userAgent) && !Globals.win.opera, Globals.isSafari = !Globals.isChrome && Globals.userAgent.indexOf('Safari') !== -1, Globals.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(Globals.userAgent), Globals.isWebKit = Globals.userAgent.indexOf('AppleWebKit') !== -1, Globals.deg2rad = Math.PI * 2 / 360, Globals.hasBidiBug = (Globals.isFirefox &&
                parseInt(Globals.userAgent.split('Firefox/')[1], 10) < 4 // issue #38
            ), Globals.hasTouch = !!Globals.win.TouchEvent, Globals.marginNames = [
                'plotTop',
                'marginRight',
                'marginBottom',
                'plotLeft'
            ], Globals.noop = function () { }, Globals.supportsPassiveEvents = (function () {
                // Checks whether the browser supports passive events, (#11353).
                var supportsPassive = false;
                // Object.defineProperty doesn't work on IE as well as passive
                // events - instead of using polyfill, we can exclude IE totally.
                if (!Globals.isMS) {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function () {
                            supportsPassive = true;
                        }
                    });
                    if (Globals.win.addEventListener && Globals.win.removeEventListener) {
                        Globals.win.addEventListener('testPassive', Globals.noop, opts);
                        Globals.win.removeEventListener('testPassive', Globals.noop, opts);
                    }
                }
                return supportsPassive;
            }());
            /**
             * An array containing the current chart objects in the page. A chart's
             * position in the array is preserved throughout the page's lifetime. When
             * a chart is destroyed, the array item becomes `undefined`.
             *
             * @name Highcharts.charts
             * @type {Array<Highcharts.Chart|undefined>}
             */
            Globals.charts = [];
            /**
             * A hook for defining additional date format specifiers. New
             * specifiers are defined as key-value pairs by using the
             * specifier as key, and a function which takes the timestamp as
             * value. This function returns the formatted portion of the
             * date.
             *
             * @sample highcharts/global/dateformats/
             *         Adding support for week number
             *
             * @name Highcharts.dateFormats
             * @type {Record<string, Highcharts.TimeFormatCallbackFunction>}
             */
            Globals.dateFormats = {};
            /**
             * @private
             * @deprecated
             * @todo Use only `Core/Series/SeriesRegistry.seriesTypes`
             */
            Globals.seriesTypes = {};
            /**
             * @private
             */
            Globals.symbolSizes = {};
            /* *
             *
             *  Properties
             *
             * */
            // eslint-disable-next-line prefer-const
            Globals.chartCount = 0;
        })(Globals || (Globals = {}));
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * Theme options that should get applied to the chart. In module mode it
         * might not be possible to change this property because of read-only
         * restrictions, instead use {@link Highcharts.setOptions}.
         *
         * @deprecated
         * @name Highcharts.theme
         * @type {Highcharts.Options}
         */
        (''); // keeps doclets above in JS file

        return Globals;
    });
    _registerModule(_modules, 'Core/Utilities.js', [_modules['Core/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var charts = H.charts, doc = H.doc, win = H.win;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Provide error messages for debugging, with links to online explanation. This
         * function can be overridden to provide custom error handling.
         *
         * @sample highcharts/chart/highcharts-error/
         *         Custom error handler
         *
         * @function Highcharts.error
         *
         * @param {number|string} code
         *        The error code. See
         *        [errors.xml](https://github.com/highcharts/highcharts/blob/master/errors/errors.xml)
         *        for available codes. If it is a string, the error message is printed
         *        directly in the console.
         *
         * @param {boolean} [stop=false]
         *        Whether to throw an error or just log a warning in the console.
         *
         * @param {Highcharts.Chart} [chart]
         *        Reference to the chart that causes the error. Used in 'debugger'
         *        module to display errors directly on the chart.
         *        Important note: This argument is undefined for errors that lack
         *        access to the Chart instance. In such case, the error will be
         *        displayed on the last created chart.
         *
         * @param {Highcharts.Dictionary<string>} [params]
         *        Additional parameters for the generated message.
         *
         * @return {void}
         */
        function error(code, stop, chart, params) {
            var severity = stop ? 'Highcharts error' : 'Highcharts warning';
            if (code === 32) {
                code = "".concat(severity, ": Deprecated member");
            }
            var isCode = isNumber(code);
            var message = isCode ?
                "".concat(severity, " #").concat(code, ": www.highcharts.com/errors/").concat(code, "/") :
                code.toString();
            var defaultHandler = function () {
                if (stop) {
                    throw new Error(message);
                }
                // else ...
                if (win.console &&
                    error.messages.indexOf(message) === -1 // prevent console flooting
                ) {
                    console.warn(message); // eslint-disable-line no-console
                }
            };
            if (typeof params !== 'undefined') {
                var additionalMessages_1 = '';
                if (isCode) {
                    message += '?';
                }
                objectEach(params, function (value, key) {
                    additionalMessages_1 += "\n - ".concat(key, ": ").concat(value);
                    if (isCode) {
                        message += encodeURI(key) + '=' + encodeURI(value);
                    }
                });
                message += additionalMessages_1;
            }
            fireEvent(H, 'displayError', { chart: chart, code: code, message: message, params: params }, defaultHandler);
            error.messages.push(message);
        }
        (function (error) {
            error.messages = [];
        })(error || (error = {}));
        /* eslint-disable valid-jsdoc */
        /**
         * Utility function to deep merge two or more objects and return a third object.
         * If the first argument is true, the contents of the second object is copied
         * into the first object. The merge function can also be used with a single
         * object argument to create a deep copy of an object.
         *
         * @function Highcharts.merge<T>
         *
         * @param {boolean} extend
         *        Whether to extend the left-side object (a) or return a whole new
         *        object.
         *
         * @param {T|undefined} a
         *        The first object to extend. When only this is given, the function
         *        returns a deep copy.
         *
         * @param {...Array<object|undefined>} [n]
         *        An object to merge into the previous one.
         *
         * @return {T}
         *         The merged object. If the first argument is true, the return is the
         *         same as the second argument.
         */ /**
        * Utility function to deep merge two or more objects and return a third object.
        * The merge function can also be used with a single object argument to create a
        * deep copy of an object.
        *
        * @function Highcharts.merge<T>
        *
        * @param {T|undefined} a
        *        The first object to extend. When only this is given, the function
        *        returns a deep copy.
        *
        * @param {...Array<object|undefined>} [n]
        *        An object to merge into the previous one.
        *
        * @return {T}
        *         The merged object. If the first argument is true, the return is the
        *         same as the second argument.
        */
        function merge() {
            /* eslint-enable valid-jsdoc */
            var i, args = arguments, ret = {};
            var doCopy = function (copy, original) {
                // An object is replacing a primitive
                if (typeof copy !== 'object') {
                    copy = {};
                }
                objectEach(original, function (value, key) {
                    // Prototype pollution (#14883)
                    if (key === '__proto__' || key === 'constructor') {
                        return;
                    }
                    // Copy the contents of objects, but not arrays or DOM nodes
                    if (isObject(value, true) &&
                        !isClass(value) &&
                        !isDOMElement(value)) {
                        copy[key] = doCopy(copy[key] || {}, value);
                        // Primitives and arrays are copied over directly
                    }
                    else {
                        copy[key] = original[key];
                    }
                });
                return copy;
            };
            // If first argument is true, copy into the existing object. Used in
            // setOptions.
            if (args[0] === true) {
                ret = args[1];
                args = Array.prototype.slice.call(args, 2);
            }
            // For each argument, extend the return
            var len = args.length;
            for (i = 0; i < len; i++) {
                ret = doCopy(ret, args[i]);
            }
            return ret;
        }
        /**
         * Constrain a value to within a lower and upper threshold.
         *
         * @private
         * @param {number} value The initial value
         * @param {number} min The lower threshold
         * @param {number} max The upper threshold
         * @return {number} Returns a number value within min and max.
         */
        function clamp(value, min, max) {
            return value > min ? value < max ? value : max : min;
        }
        // eslint-disable-next-line valid-jsdoc
        /**
         * Return the deep difference between two objects. It can either return the new
         * properties, or optionally return the old values of new properties.
         * @private
         */
        function diffObjects(newer, older, keepOlder, collectionsWithUpdate) {
            var ret = {};
            /**
             * Recurse over a set of options and its current values, and store the
             * current values in the ret object.
             */
            function diff(newer, older, ret, depth) {
                var keeper = keepOlder ? older : newer;
                objectEach(newer, function (newerVal, key) {
                    if (!depth &&
                        collectionsWithUpdate &&
                        collectionsWithUpdate.indexOf(key) > -1 &&
                        older[key]) {
                        newerVal = splat(newerVal);
                        ret[key] = [];
                        // Iterate over collections like series, xAxis or yAxis and map
                        // the items by index.
                        for (var i = 0; i < Math.max(newerVal.length, older[key].length); i++) {
                            // Item exists in current data (#6347)
                            if (older[key][i]) {
                                // If the item is missing from the new data, we need to
                                // save the whole config structure. Like when
                                // responsively updating from a dual axis layout to a
                                // single axis and back (#13544).
                                if (newerVal[i] === void 0) {
                                    ret[key][i] = older[key][i];
                                    // Otherwise, proceed
                                }
                                else {
                                    ret[key][i] = {};
                                    diff(newerVal[i], older[key][i], ret[key][i], depth + 1);
                                }
                            }
                        }
                    }
                    else if (isObject(newerVal, true) &&
                        !newerVal.nodeType // #10044
                    ) {
                        ret[key] = isArray(newerVal) ? [] : {};
                        diff(newerVal, older[key] || {}, ret[key], depth + 1);
                        // Delete empty nested objects
                        if (Object.keys(ret[key]).length === 0 &&
                            // Except colorAxis which is a special case where the empty
                            // object means it is enabled. Which is unfortunate and we
                            // should try to find a better way.
                            !(key === 'colorAxis' && depth === 0)) {
                            delete ret[key];
                        }
                    }
                    else if (newer[key] !== older[key] ||
                        // If the newer key is explicitly undefined, keep it (#10525)
                        (key in newer && !(key in older))) {
                        ret[key] = keeper[key];
                    }
                });
            }
            diff(newer, older, ret, 0);
            return ret;
        }
        /**
         * Shortcut for parseInt
         *
         * @private
         * @function Highcharts.pInt
         *
         * @param {*} s
         *        any
         *
         * @param {number} [mag]
         *        Magnitude
         *
         * @return {number}
         *         number
         */
        function pInt(s, mag) {
            return parseInt(s, mag || 10);
        }
        /**
         * Utility function to check for string type.
         *
         * @function Highcharts.isString
         *
         * @param {*} s
         *        The item to check.
         *
         * @return {boolean}
         *         True if the argument is a string.
         */
        function isString(s) {
            return typeof s === 'string';
        }
        /**
         * Utility function to check if an item is an array.
         *
         * @function Highcharts.isArray
         *
         * @param {*} obj
         *        The item to check.
         *
         * @return {boolean}
         *         True if the argument is an array.
         */
        function isArray(obj) {
            var str = Object.prototype.toString.call(obj);
            return str === '[object Array]' || str === '[object Array Iterator]';
        }
        /**
         * Utility function to check if an item is of type object.
         *
         * @function Highcharts.isObject
         *
         * @param {*} obj
         *        The item to check.
         *
         * @param {boolean} [strict=false]
         *        Also checks that the object is not an array.
         *
         * @return {boolean}
         *         True if the argument is an object.
         */
        function isObject(obj, strict) {
            return (!!obj &&
                typeof obj === 'object' &&
                (!strict || !isArray(obj))); // eslint-disable-line @typescript-eslint/no-explicit-any
        }
        /**
         * Utility function to check if an Object is a HTML Element.
         *
         * @function Highcharts.isDOMElement
         *
         * @param {*} obj
         *        The item to check.
         *
         * @return {boolean}
         *         True if the argument is a HTML Element.
         */
        function isDOMElement(obj) {
            return isObject(obj) && typeof obj.nodeType === 'number';
        }
        /**
         * Utility function to check if an Object is a class.
         *
         * @function Highcharts.isClass
         *
         * @param {object|undefined} obj
         *        The item to check.
         *
         * @return {boolean}
         *         True if the argument is a class.
         */
        function isClass(obj) {
            var c = obj && obj.constructor;
            return !!(isObject(obj, true) &&
                !isDOMElement(obj) &&
                (c && c.name && c.name !== 'Object'));
        }
        /**
         * Utility function to check if an item is a number and it is finite (not NaN,
         * Infinity or -Infinity).
         *
         * @function Highcharts.isNumber
         *
         * @param {*} n
         *        The item to check.
         *
         * @return {boolean}
         *         True if the item is a finite number
         */
        function isNumber(n) {
            return typeof n === 'number' && !isNaN(n) && n < Infinity && n > -Infinity;
        }
        /**
         * Remove the last occurence of an item from an array.
         *
         * @function Highcharts.erase
         *
         * @param {Array<*>} arr
         *        The array.
         *
         * @param {*} item
         *        The item to remove.
         *
         * @return {void}
         */
        function erase(arr, item) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === item) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }
        /**
         * Insert a series or an axis in a collection with other items, either the
         * chart series or yAxis series or axis collections, in the correct order
         * according to the index option and whether it is internal. Used internally
         * when adding series and axes.
         *
         * @private
         * @function Highcharts.Chart#insertItem
         * @param  {Highcharts.Series|Highcharts.Axis} item
         *         The item to insert
         * @param  {Array<Highcharts.Series>|Array<Highcharts.Axis>} collection
         *         A collection of items, like `chart.series` or `xAxis.series`.
         * @return {number} The index of the series in the collection.
         */
        function insertItem(item, collection) {
            var indexOption = item.options.index, length = collection.length;
            var i;
            for (
            // Internal item (navigator) should always be pushed to the end
            i = item.options.isInternal ? length : 0; i < length + 1; i++) {
                if (
                // No index option, reached the end of the collection,
                // equivalent to pushing
                !collection[i] ||
                    // Handle index option, the element to insert has lower index
                    (isNumber(indexOption) &&
                        indexOption < pick(collection[i].options.index, collection[i]._i)) ||
                    // Insert the new item before other internal items
                    // (navigator)
                    collection[i].options.isInternal) {
                    collection.splice(i, 0, item);
                    break;
                }
            }
            return i;
        }
        /**
         * Adds an item to an array, if it is not present in the array.
         *
         * @function Highcharts.pushUnique
         *
         * @param {Array<unknown>} array
         * The array to add the item to.
         *
         * @param {unknown} item
         * The item to add.
         *
         * @return {boolean}
         * Returns true, if the item was not present and has been added.
         */
        function pushUnique(array, item) {
            return array.indexOf(item) < 0 && !!array.push(item);
        }
        /**
         * Check if an object is null or undefined.
         *
         * @function Highcharts.defined
         *
         * @param {*} obj
         *        The object to check.
         *
         * @return {boolean}
         *         False if the object is null or undefined, otherwise true.
         */
        function defined(obj) {
            return typeof obj !== 'undefined' && obj !== null;
        }
        /**
         * Set or get an attribute or an object of attributes.
         *
         * To use as a setter, pass a key and a value, or let the second argument be a
         * collection of keys and values. When using a collection, passing a value of
         * `null` or `undefined` will remove the attribute.
         *
         * To use as a getter, pass only a string as the second argument.
         *
         * @function Highcharts.attr
         *
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} elem
         *        The DOM element to receive the attribute(s).
         *
         * @param {string|Highcharts.HTMLAttributes|Highcharts.SVGAttributes} [keyOrAttribs]
         *        The property or an object of key-value pairs.
         *
         * @param {number|string} [value]
         *        The value if a single property is set.
         *
         * @return {string|null|undefined}
         *         When used as a getter, return the value.
         */
        function attr(elem, keyOrAttribs, value) {
            var isGetter = isString(keyOrAttribs) && !defined(value);
            var ret;
            var attrSingle = function (value, key) {
                // Set the value
                if (defined(value)) {
                    elem.setAttribute(key, value);
                    // Get the value
                }
                else if (isGetter) {
                    ret = elem.getAttribute(key);
                    // IE7 and below cannot get class through getAttribute (#7850)
                    if (!ret && key === 'class') {
                        ret = elem.getAttribute(key + 'Name');
                    }
                    // Remove the value
                }
                else {
                    elem.removeAttribute(key);
                }
            };
            // If keyOrAttribs is a string
            if (isString(keyOrAttribs)) {
                attrSingle(value, keyOrAttribs);
                // Else if keyOrAttribs is defined, it is a hash of key/value pairs
            }
            else {
                objectEach(keyOrAttribs, attrSingle);
            }
            return ret;
        }
        /**
         * Check if an element is an array, and if not, make it into an array.
         *
         * @function Highcharts.splat
         *
         * @param {*} obj
         *        The object to splat.
         *
         * @return {Array}
         *         The produced or original array.
         */
        function splat(obj) {
            return isArray(obj) ? obj : [obj];
        }
        /**
         * Set a timeout if the delay is given, otherwise perform the function
         * synchronously.
         *
         * @function Highcharts.syncTimeout
         *
         * @param {Function} fn
         *        The function callback.
         *
         * @param {number} delay
         *        Delay in milliseconds.
         *
         * @param {*} [context]
         *        An optional context to send to the function callback.
         *
         * @return {number}
         *         An identifier for the timeout that can later be cleared with
         *         Highcharts.clearTimeout. Returns -1 if there is no timeout.
         */
        function syncTimeout(fn, delay, context) {
            if (delay > 0) {
                return setTimeout(fn, delay, context);
            }
            fn.call(0, context);
            return -1;
        }
        /**
         * Internal clear timeout. The function checks that the `id` was not removed
         * (e.g. by `chart.destroy()`). For the details see
         * [issue #7901](https://github.com/highcharts/highcharts/issues/7901).
         *
         * @function Highcharts.clearTimeout
         *
         * @param {number|undefined} id
         * Id of a timeout.
         */
        function internalClearTimeout(id) {
            if (defined(id)) {
                clearTimeout(id);
            }
        }
        /* eslint-disable valid-jsdoc */
        /**
         * Utility function to extend an object with the members of another.
         *
         * @function Highcharts.extend<T>
         *
         * @param {T|undefined} a
         *        The object to be extended.
         *
         * @param {Partial<T>} b
         *        The object to add to the first one.
         *
         * @return {T}
         *         Object a, the original object.
         */
        function extend(a, b) {
            /* eslint-enable valid-jsdoc */
            var n;
            if (!a) {
                a = {};
            }
            for (n in b) { // eslint-disable-line guard-for-in
                a[n] = b[n];
            }
            return a;
        }
        /* eslint-disable valid-jsdoc */
        /**
         * Return the first value that is not null or undefined.
         *
         * @function Highcharts.pick<T>
         *
         * @param {...Array<T|null|undefined>} items
         *        Variable number of arguments to inspect.
         *
         * @return {T}
         *         The value of the first argument that is not null or undefined.
         */
        function pick() {
            var args = arguments;
            var length = args.length;
            for (var i = 0; i < length; i++) {
                var arg = args[i];
                if (typeof arg !== 'undefined' && arg !== null) {
                    return arg;
                }
            }
        }
        /**
         * Set CSS on a given element.
         *
         * @function Highcharts.css
         *
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} el
         *        An HTML DOM element.
         *
         * @param {Highcharts.CSSObject} styles
         *        Style object with camel case property names.
         *
         * @return {void}
         */
        function css(el, styles) {
            if (H.isMS && !H.svg) { // #2686
                if (styles && defined(styles.opacity)) {
                    styles.filter = "alpha(opacity=".concat(styles.opacity * 100, ")");
                }
            }
            extend(el.style, styles);
        }
        /**
         * Utility function to create an HTML element with attributes and styles.
         *
         * @function Highcharts.createElement
         *
         * @param {string} tag
         *        The HTML tag.
         *
         * @param {Highcharts.HTMLAttributes} [attribs]
         *        Attributes as an object of key-value pairs.
         *
         * @param {Highcharts.CSSObject} [styles]
         *        Styles as an object of key-value pairs.
         *
         * @param {Highcharts.HTMLDOMElement} [parent]
         *        The parent HTML object.
         *
         * @param {boolean} [nopad=false]
         *        If true, remove all padding, border and margin.
         *
         * @return {Highcharts.HTMLDOMElement}
         *         The created DOM element.
         */
        function createElement(tag, attribs, styles, parent, nopad) {
            var el = doc.createElement(tag);
            if (attribs) {
                extend(el, attribs);
            }
            if (nopad) {
                css(el, { padding: '0', border: 'none', margin: '0' });
            }
            if (styles) {
                css(el, styles);
            }
            if (parent) {
                parent.appendChild(el);
            }
            return el;
        }
        // eslint-disable-next-line valid-jsdoc
        /**
         * Extend a prototyped class by new members.
         *
         * @deprecated
         * @function Highcharts.extendClass<T>
         *
         * @param {Highcharts.Class<T>} parent
         *        The parent prototype to inherit.
         *
         * @param {Highcharts.Dictionary<*>} members
         *        A collection of prototype members to add or override compared to the
         *        parent prototype.
         *
         * @return {Highcharts.Class<T>}
         *         A new prototype.
         */
        function extendClass(parent, members) {
            var obj = (function () { });
            obj.prototype = new parent(); // eslint-disable-line new-cap
            extend(obj.prototype, members);
            return obj;
        }
        /**
         * Left-pad a string to a given length by adding a character repetitively.
         *
         * @function Highcharts.pad
         *
         * @param {number} number
         *        The input string or number.
         *
         * @param {number} [length]
         *        The desired string length.
         *
         * @param {string} [padder=0]
         *        The character to pad with.
         *
         * @return {string}
         *         The padded string.
         */
        function pad(number, length, padder) {
            return new Array((length || 2) +
                1 -
                String(number)
                    .replace('-', '')
                    .length).join(padder || '0') + number;
        }
        /**
         * Return a length based on either the integer value, or a percentage of a base.
         *
         * @function Highcharts.relativeLength
         *
         * @param {Highcharts.RelativeSize} value
         *        A percentage string or a number.
         *
         * @param {number} base
         *        The full length that represents 100%.
         *
         * @param {number} [offset=0]
         *        A pixel offset to apply for percentage values. Used internally in
         *        axis positioning.
         *
         * @return {number}
         *         The computed length.
         */
        function relativeLength(value, base, offset) {
            return (/%$/).test(value) ?
                (base * parseFloat(value) / 100) + (offset || 0) :
                parseFloat(value);
        }
        /**
         * Wrap a method with extended functionality, preserving the original function.
         *
         * @function Highcharts.wrap
         *
         * @param {*} obj
         *        The context object that the method belongs to. In real cases, this is
         *        often a prototype.
         *
         * @param {string} method
         *        The name of the method to extend.
         *
         * @param {Highcharts.WrapProceedFunction} func
         *        A wrapper function callback. This function is called with the same
         *        arguments as the original function, except that the original function
         *        is unshifted and passed as the first argument.
         */
        function wrap(obj, method, func) {
            var proceed = obj[method];
            obj[method] = function () {
                var outerArgs = arguments, scope = this;
                return func.apply(this, [
                    function () {
                        return proceed.apply(scope, arguments.length ? arguments : outerArgs);
                    }
                ].concat([].slice.call(arguments)));
            };
        }
        /**
         * Get the magnitude of a number.
         *
         * @function Highcharts.getMagnitude
         *
         * @param {number} num
         *        The number.
         *
         * @return {number}
         *         The magnitude, where 1-9 are magnitude 1, 10-99 magnitude 2 etc.
         */
        function getMagnitude(num) {
            return Math.pow(10, Math.floor(Math.log(num) / Math.LN10));
        }
        /**
         * Take an interval and normalize it to multiples of round numbers.
         *
         * @deprecated
         * @function Highcharts.normalizeTickInterval
         *
         * @param {number} interval
         *        The raw, un-rounded interval.
         *
         * @param {Array<*>} [multiples]
         *        Allowed multiples.
         *
         * @param {number} [magnitude]
         *        The magnitude of the number.
         *
         * @param {boolean} [allowDecimals]
         *        Whether to allow decimals.
         *
         * @param {boolean} [hasTickAmount]
         *        If it has tickAmount, avoid landing on tick intervals lower than
         *        original.
         *
         * @return {number}
         *         The normalized interval.
         *
         * @todo
         * Move this function to the Axis prototype. It is here only for historical
         * reasons.
         */
        function normalizeTickInterval(interval, multiples, magnitude, allowDecimals, hasTickAmount) {
            var i, retInterval = interval;
            // round to a tenfold of 1, 2, 2.5 or 5
            magnitude = pick(magnitude, getMagnitude(interval));
            var normalized = interval / magnitude;
            // multiples for a linear scale
            if (!multiples) {
                multiples = hasTickAmount ?
                    // Finer grained ticks when the tick amount is hard set, including
                    // when alignTicks is true on multiple axes (#4580).
                    [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] :
                    // Else, let ticks fall on rounder numbers
                    [1, 2, 2.5, 5, 10];
                // the allowDecimals option
                if (allowDecimals === false) {
                    if (magnitude === 1) {
                        multiples = multiples.filter(function (num) {
                            return num % 1 === 0;
                        });
                    }
                    else if (magnitude <= 0.1) {
                        multiples = [1 / magnitude];
                    }
                }
            }
            // normalize the interval to the nearest multiple
            for (i = 0; i < multiples.length; i++) {
                retInterval = multiples[i];
                // only allow tick amounts smaller than natural
                if ((hasTickAmount &&
                    retInterval * magnitude >= interval) ||
                    (!hasTickAmount &&
                        (normalized <=
                            (multiples[i] +
                                (multiples[i + 1] || multiples[i])) / 2))) {
                    break;
                }
            }
            // Multiply back to the correct magnitude. Correct floats to appropriate
            // precision (#6085).
            retInterval = correctFloat(retInterval * magnitude, -Math.round(Math.log(0.001) / Math.LN10));
            return retInterval;
        }
        /**
         * Sort an object array and keep the order of equal items. The ECMAScript
         * standard does not specify the behaviour when items are equal.
         *
         * @function Highcharts.stableSort
         *
         * @param {Array<*>} arr
         *        The array to sort.
         *
         * @param {Function} sortFunction
         *        The function to sort it with, like with regular Array.prototype.sort.
         */
        function stableSort(arr, sortFunction) {
            // @todo It seems like Chrome since v70 sorts in a stable way internally,
            // plus all other browsers do it, so over time we may be able to remove this
            // function
            var length = arr.length;
            var sortValue, i;
            // Add index to each item
            for (i = 0; i < length; i++) {
                arr[i].safeI = i; // stable sort index
            }
            arr.sort(function (a, b) {
                sortValue = sortFunction(a, b);
                return sortValue === 0 ? a.safeI - b.safeI : sortValue;
            });
            // Remove index from items
            for (i = 0; i < length; i++) {
                delete arr[i].safeI; // stable sort index
            }
        }
        /**
         * Non-recursive method to find the lowest member of an array. `Math.min` raises
         * a maximum call stack size exceeded error in Chrome when trying to apply more
         * than 150.000 points. This method is slightly slower, but safe.
         *
         * @function Highcharts.arrayMin
         *
         * @param {Array<*>} data
         *        An array of numbers.
         *
         * @return {number}
         *         The lowest number.
         */
        function arrayMin(data) {
            var i = data.length, min = data[0];
            while (i--) {
                if (data[i] < min) {
                    min = data[i];
                }
            }
            return min;
        }
        /**
         * Non-recursive method to find the lowest member of an array. `Math.max` raises
         * a maximum call stack size exceeded error in Chrome when trying to apply more
         * than 150.000 points. This method is slightly slower, but safe.
         *
         * @function Highcharts.arrayMax
         *
         * @param {Array<*>} data
         *        An array of numbers.
         *
         * @return {number}
         *         The highest number.
         */
        function arrayMax(data) {
            var i = data.length, max = data[0];
            while (i--) {
                if (data[i] > max) {
                    max = data[i];
                }
            }
            return max;
        }
        /**
         * Utility method that destroys any SVGElement instances that are properties on
         * the given object. It loops all properties and invokes destroy if there is a
         * destroy method. The property is then delete.
         *
         * @function Highcharts.destroyObjectProperties
         *
         * @param {*} obj
         *        The object to destroy properties on.
         *
         * @param {*} [except]
         *        Exception, do not destroy this property, only delete it.
         */
        function destroyObjectProperties(obj, except) {
            objectEach(obj, function (val, n) {
                // If the object is non-null and destroy is defined
                if (val && val !== except && val.destroy) {
                    // Invoke the destroy
                    val.destroy();
                }
                // Delete the property from the object.
                delete obj[n];
            });
        }
        /**
         * Discard a HTML element
         *
         * @function Highcharts.discardElement
         *
         * @param {Highcharts.HTMLDOMElement} element
         *        The HTML node to discard.
         */
        function discardElement(element) {
            if (element && element.parentElement) {
                element.parentElement.removeChild(element);
            }
        }
        /**
         * Fix JS round off float errors.
         *
         * @function Highcharts.correctFloat
         *
         * @param {number} num
         *        A float number to fix.
         *
         * @param {number} [prec=14]
         *        The precision.
         *
         * @return {number}
         *         The corrected float number.
         */
        function correctFloat(num, prec) {
            // When the number is higher than 1e14 use the number (#16275)
            return num > 1e14 ? num : parseFloat(num.toPrecision(prec || 14));
        }
        /**
         * The time unit lookup
         *
         * @ignore
         */
        var timeUnits = {
            millisecond: 1,
            second: 1000,
            minute: 60000,
            hour: 3600000,
            day: 24 * 3600000,
            week: 7 * 24 * 3600000,
            month: 28 * 24 * 3600000,
            year: 364 * 24 * 3600000
        };
        /**
         * Easing definition
         *
         * @private
         * @function Math.easeInOutSine
         *
         * @param {number} pos
         *        Current position, ranging from 0 to 1.
         *
         * @return {number}
         *         Ease result
         */
        Math.easeInOutSine = function (pos) {
            return -0.5 * (Math.cos(Math.PI * pos) - 1);
        };
        /**
         * Find the closest distance between two values of a two-dimensional array
         * @private
         * @function Highcharts.getClosestDistance
         *
         * @param {Array<Array<number>>} arrays
         *          An array of arrays of numbers
         *
         * @return {number | undefined}
         *          The closest distance between values
         */
        function getClosestDistance(arrays, onError) {
            var allowNegative = !onError;
            var closest, loopLength, distance, i;
            arrays.forEach(function (xData) {
                if (xData.length > 1) {
                    loopLength = xData.length - 1;
                    for (i = loopLength; i > 0; i--) {
                        distance = xData[i] - xData[i - 1];
                        if (distance < 0 && !allowNegative) {
                            onError === null || onError === void 0 ? void 0 : onError();
                            // Only one call
                            onError = void 0;
                        }
                        else if (distance && (typeof closest === 'undefined' || distance < closest)) {
                            closest = distance;
                        }
                    }
                }
            });
            return closest;
        }
        /**
         * Returns the value of a property path on a given object.
         *
         * @private
         * @function getNestedProperty
         *
         * @param {string} path
         * Path to the property, for example `custom.myValue`.
         *
         * @param {unknown} obj
         * Instance containing the property on the specific path.
         *
         * @return {unknown}
         * The unknown property value.
         */
        function getNestedProperty(path, parent) {
            var pathElements = path.split('.');
            while (pathElements.length && defined(parent)) {
                var pathElement = pathElements.shift();
                // Filter on the key
                if (typeof pathElement === 'undefined' ||
                    pathElement === '__proto__') {
                    return; // undefined
                }
                if (pathElement === 'this') {
                    var thisProp = void 0;
                    if (isObject(parent)) {
                        thisProp = parent['@this'];
                    }
                    return thisProp !== null && thisProp !== void 0 ? thisProp : parent;
                }
                var child = parent[pathElement];
                // Filter on the child
                if (!defined(child) ||
                    typeof child === 'function' ||
                    typeof child.nodeType === 'number' ||
                    child === win) {
                    return; // undefined
                }
                // Else, proceed
                parent = child;
            }
            return parent;
        }
        /**
         * Get the computed CSS value for given element and property, only for numerical
         * properties. For width and height, the dimension of the inner box (excluding
         * padding) is returned. Used for fitting the chart within the container.
         *
         * @function Highcharts.getStyle
         *
         * @param {Highcharts.HTMLDOMElement} el
         * An HTML element.
         *
         * @param {string} prop
         * The property name.
         *
         * @param {boolean} [toInt=true]
         * Parse to integer.
         *
         * @return {number|string|undefined}
         * The style value.
         */
        function getStyle(el, prop, toInt) {
            var style;
            // For width and height, return the actual inner pixel size (#4913)
            if (prop === 'width') {
                var offsetWidth = Math.min(el.offsetWidth, el.scrollWidth);
                // In flex boxes, we need to use getBoundingClientRect and floor it,
                // because scrollWidth doesn't support subpixel precision (#6427) ...
                var boundingClientRectWidth = el.getBoundingClientRect &&
                    el.getBoundingClientRect().width;
                // ...unless if the containing div or its parents are transform-scaled
                // down, in which case the boundingClientRect can't be used as it is
                // also scaled down (#9871, #10498).
                if (boundingClientRectWidth < offsetWidth &&
                    boundingClientRectWidth >= offsetWidth - 1) {
                    offsetWidth = Math.floor(boundingClientRectWidth);
                }
                return Math.max(0, // #8377
                (offsetWidth -
                    (getStyle(el, 'padding-left', true) || 0) -
                    (getStyle(el, 'padding-right', true) || 0)));
            }
            if (prop === 'height') {
                return Math.max(0, // #8377
                (Math.min(el.offsetHeight, el.scrollHeight) -
                    (getStyle(el, 'padding-top', true) || 0) -
                    (getStyle(el, 'padding-bottom', true) || 0)));
            }
            // Otherwise, get the computed style
            var css = win.getComputedStyle(el, void 0); // eslint-disable-line no-undefined
            if (css) {
                style = css.getPropertyValue(prop);
                if (pick(toInt, prop !== 'opacity')) {
                    style = pInt(style);
                }
            }
            return style;
        }
        /**
         * Search for an item in an array.
         *
         * @function Highcharts.inArray
         *
         * @deprecated
         *
         * @param {*} item
         *        The item to search for.
         *
         * @param {Array<*>} arr
         *        The array or node collection to search in.
         *
         * @param {number} [fromIndex=0]
         *        The index to start searching from.
         *
         * @return {number}
         *         The index within the array, or -1 if not found.
         */
        function inArray(item, arr, fromIndex) {
            error(32, false, void 0, { 'Highcharts.inArray': 'use Array.indexOf' });
            return arr.indexOf(item, fromIndex);
        }
        /**
         * Return the value of the first element in the array that satisfies the
         * provided testing function.
         *
         * @function Highcharts.find<T>
         *
         * @param {Array<T>} arr
         *        The array to test.
         *
         * @param {Function} callback
         *        The callback function. The function receives the item as the first
         *        argument. Return `true` if this item satisfies the condition.
         *
         * @return {T|undefined}
         *         The value of the element.
         */
        var find = Array.prototype.find ?
            function (arr, callback) {
                return arr.find(callback);
            } :
            // Legacy implementation. PhantomJS, IE <= 11 etc. #7223.
            function (arr, callback) {
                var i;
                var length = arr.length;
                for (i = 0; i < length; i++) {
                    if (callback(arr[i], i)) { // eslint-disable-line node/callback-return
                        return arr[i];
                    }
                }
            };
        /**
         * Returns an array of a given object's own properties.
         *
         * @function Highcharts.keys
         * @deprecated
         *
         * @param {*} obj
         *        The object of which the properties are to be returned.
         *
         * @return {Array<string>}
         *         An array of strings that represents all the properties.
         */
        function keys(obj) {
            error(32, false, void 0, { 'Highcharts.keys': 'use Object.keys' });
            return Object.keys(obj);
        }
        /**
         * Get the element's offset position, corrected for `overflow: auto`.
         *
         * @function Highcharts.offset
         *
         * @param {global.Element} el
         *        The DOM element.
         *
         * @return {Highcharts.OffsetObject}
         *         An object containing `left` and `top` properties for the position in
         *         the page.
         */
        function offset(el) {
            var docElem = doc.documentElement, box = (el.parentElement || el.parentNode) ?
                el.getBoundingClientRect() :
                { top: 0, left: 0, width: 0, height: 0 };
            return {
                top: box.top + (win.pageYOffset || docElem.scrollTop) -
                    (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) -
                    (docElem.clientLeft || 0),
                width: box.width,
                height: box.height
            };
        }
        /* eslint-disable valid-jsdoc */
        /**
         * Iterate over object key pairs in an object.
         *
         * @function Highcharts.objectEach<T>
         *
         * @param {*} obj
         *        The object to iterate over.
         *
         * @param {Highcharts.ObjectEachCallbackFunction<T>} fn
         *        The iterator callback. It passes three arguments:
         *        * value - The property value.
         *        * key - The property key.
         *        * obj - The object that objectEach is being applied to.
         *
         * @param {T} [ctx]
         *        The context.
         */
        function objectEach(obj, fn, ctx) {
            /* eslint-enable valid-jsdoc */
            for (var key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    fn.call(ctx || obj[key], obj[key], key, obj);
                }
            }
        }
        /**
         * Iterate over an array.
         *
         * @deprecated
         * @function Highcharts.each
         *
         * @param {Array<*>} arr
         *        The array to iterate over.
         *
         * @param {Function} fn
         *        The iterator callback. It passes three arguments:
         *        - `item`: The array item.
         *        - `index`: The item's index in the array.
         *        - `arr`: The array that each is being applied to.
         *
         * @param {*} [ctx]
         *        The context.
         *
         * @return {void}
         */
        /**
         * Filter an array by a callback.
         *
         * @deprecated
         * @function Highcharts.grep
         *
         * @param {Array<*>} arr
         *        The array to filter.
         *
         * @param {Function} callback
         *        The callback function. The function receives the item as the first
         *        argument. Return `true` if the item is to be preserved.
         *
         * @return {Array<*>}
         *         A new, filtered array.
         */
        /**
         * Map an array by a callback.
         *
         * @deprecated
         * @function Highcharts.map
         *
         * @param {Array<*>} arr
         *        The array to map.
         *
         * @param {Function} fn
         *        The callback function. Return the new value for the new array.
         *
         * @return {Array<*>}
         *         A new array item with modified items.
         */
        /**
         * Reduce an array to a single value.
         *
         * @deprecated
         * @function Highcharts.reduce
         *
         * @param {Array<*>} arr
         *        The array to reduce.
         *
         * @param {Function} fn
         *        The callback function. Return the reduced value. Receives 4
         *        arguments: Accumulated/reduced value, current value, current array
         *        index, and the array.
         *
         * @param {*} initialValue
         *        The initial value of the accumulator.
         *
         * @return {*}
         *         The reduced value.
         */
        /**
         * Test whether at least one element in the array passes the test implemented by
         * the provided function.
         *
         * @deprecated
         * @function Highcharts.some
         *
         * @param {Array<*>} arr
         *        The array to test
         *
         * @param {Function} fn
         *        The function to run on each item. Return truty to pass the test.
         *        Receives arguments `currentValue`, `index` and `array`.
         *
         * @param {*} ctx
         *        The context.
         *
         * @return {boolean}
         */
        objectEach({
            map: 'map',
            each: 'forEach',
            grep: 'filter',
            reduce: 'reduce',
            some: 'some'
        }, function (val, key) {
            H[key] = function (arr) {
                var _a;
                error(32, false, void 0, (_a = {}, _a["Highcharts.".concat(key)] = "use Array.".concat(val), _a));
                return Array.prototype[val].apply(arr, [].slice.call(arguments, 1));
            };
        });
        /* eslint-disable valid-jsdoc */
        /**
         * Add an event listener.
         *
         * @function Highcharts.addEvent<T>
         *
         * @param {Highcharts.Class<T>|T} el
         *        The element or object to add a listener to. It can be a
         *        {@link HTMLDOMElement}, an {@link SVGElement} or any other object.
         *
         * @param {string} type
         *        The event type.
         *
         * @param {Highcharts.EventCallbackFunction<T>|Function} fn
         *        The function callback to execute when the event is fired.
         *
         * @param {Highcharts.EventOptionsObject} [options]
         *        Options for adding the event.
         *
         * @return {Function}
         *         A callback function to remove the added event.
         */
        function addEvent(el, type, fn, options) {
            /* eslint-enable valid-jsdoc */
            if (options === void 0) { options = {}; }
            // Add hcEvents to either the prototype (in case we're running addEvent on a
            // class) or the instance. If hasOwnProperty('hcEvents') is false, it is
            // inherited down the prototype chain, in which case we need to set the
            // property on this instance (which may itself be a prototype).
            var owner = typeof el === 'function' && el.prototype || el;
            if (!Object.hasOwnProperty.call(owner, 'hcEvents')) {
                owner.hcEvents = {};
            }
            var events = owner.hcEvents;
            // Allow click events added to points, otherwise they will be prevented by
            // the TouchPointer.pinch function after a pinch zoom operation (#7091).
            if (H.Point && // without H a dependency loop occurs
                el instanceof H.Point &&
                el.series &&
                el.series.chart) {
                el.series.chart.runTrackerClick = true;
            }
            // Handle DOM events
            // If the browser supports passive events, add it to improve performance
            // on touch events (#11353).
            var addEventListener = el.addEventListener;
            if (addEventListener) {
                addEventListener.call(el, type, fn, H.supportsPassiveEvents ? {
                    passive: options.passive === void 0 ?
                        type.indexOf('touch') !== -1 : options.passive,
                    capture: false
                } : false);
            }
            if (!events[type]) {
                events[type] = [];
            }
            var eventObject = {
                fn: fn,
                order: typeof options.order === 'number' ? options.order : Infinity
            };
            events[type].push(eventObject);
            // Order the calls
            events[type].sort(function (a, b) { return a.order - b.order; });
            // Return a function that can be called to remove this event.
            return function () {
                removeEvent(el, type, fn);
            };
        }
        /* eslint-disable valid-jsdoc */
        /**
         * Remove an event that was added with {@link Highcharts#addEvent}.
         *
         * @function Highcharts.removeEvent<T>
         *
         * @param {Highcharts.Class<T>|T} el
         *        The element to remove events on.
         *
         * @param {string} [type]
         *        The type of events to remove. If undefined, all events are removed
         *        from the element.
         *
         * @param {Highcharts.EventCallbackFunction<T>} [fn]
         *        The specific callback to remove. If undefined, all events that match
         *        the element and optionally the type are removed.
         *
         * @return {void}
         */
        function removeEvent(el, type, fn) {
            /* eslint-enable valid-jsdoc */
            /**
             * @private
             */
            function removeOneEvent(type, fn) {
                var removeEventListener = el.removeEventListener;
                if (removeEventListener) {
                    removeEventListener.call(el, type, fn, false);
                }
            }
            /**
             * @private
             */
            function removeAllEvents(eventCollection) {
                var types, len;
                if (!el.nodeName) {
                    return; // break on non-DOM events
                }
                if (type) {
                    types = {};
                    types[type] = true;
                }
                else {
                    types = eventCollection;
                }
                objectEach(types, function (_val, n) {
                    if (eventCollection[n]) {
                        len = eventCollection[n].length;
                        while (len--) {
                            removeOneEvent(n, eventCollection[n][len].fn);
                        }
                    }
                });
            }
            var owner = typeof el === 'function' && el.prototype || el;
            if (Object.hasOwnProperty.call(owner, 'hcEvents')) {
                var events = owner.hcEvents;
                if (type) {
                    var typeEvents = (events[type] || []);
                    if (fn) {
                        events[type] = typeEvents.filter(function (obj) {
                            return fn !== obj.fn;
                        });
                        removeOneEvent(type, fn);
                    }
                    else {
                        removeAllEvents(events);
                        events[type] = [];
                    }
                }
                else {
                    removeAllEvents(events);
                    delete owner.hcEvents;
                }
            }
        }
        /* eslint-disable valid-jsdoc */
        /**
         * Fire an event that was registered with {@link Highcharts#addEvent}.
         *
         * @function Highcharts.fireEvent<T>
         *
         * @param {T} el
         *        The object to fire the event on. It can be a {@link HTMLDOMElement},
         *        an {@link SVGElement} or any other object.
         *
         * @param {string} type
         *        The type of event.
         *
         * @param {Highcharts.Dictionary<*>|Event} [eventArguments]
         *        Custom event arguments that are passed on as an argument to the event
         *        handler.
         *
         * @param {Highcharts.EventCallbackFunction<T>|Function} [defaultFunction]
         *        The default function to execute if the other listeners haven't
         *        returned false.
         *
         * @return {void}
         */
        function fireEvent(el, type, eventArguments, defaultFunction) {
            /* eslint-enable valid-jsdoc */
            var e, i;
            eventArguments = eventArguments || {};
            if (doc.createEvent &&
                (el.dispatchEvent ||
                    (el.fireEvent &&
                        // Enable firing events on Highcharts instance.
                        el !== H))) {
                e = doc.createEvent('Events');
                e.initEvent(type, true, true);
                eventArguments = extend(e, eventArguments);
                if (el.dispatchEvent) {
                    el.dispatchEvent(eventArguments);
                }
                else {
                    el.fireEvent(type, eventArguments);
                }
            }
            else if (el.hcEvents) {
                if (!eventArguments.target) {
                    // We're running a custom event
                    extend(eventArguments, {
                        // Attach a simple preventDefault function to skip
                        // default handler if called. The built-in
                        // defaultPrevented property is not overwritable (#5112)
                        preventDefault: function () {
                            eventArguments.defaultPrevented = true;
                        },
                        // Setting target to native events fails with clicking
                        // the zoom-out button in Chrome.
                        target: el,
                        // If the type is not set, we're running a custom event
                        // (#2297). If it is set, we're running a browser event.
                        type: type
                    });
                }
                var events = [];
                var object = el;
                var multilevel = false;
                // Recurse up the inheritance chain and collect hcEvents set as own
                // objects on the prototypes.
                while (object.hcEvents) {
                    if (Object.hasOwnProperty.call(object, 'hcEvents') &&
                        object.hcEvents[type]) {
                        if (events.length) {
                            multilevel = true;
                        }
                        events.unshift.apply(events, object.hcEvents[type]);
                    }
                    object = Object.getPrototypeOf(object);
                }
                // For performance reasons, only sort the event handlers in case we are
                // dealing with multiple levels in the prototype chain. Otherwise, the
                // events are already sorted in the addEvent function.
                if (multilevel) {
                    // Order the calls
                    events.sort(function (a, b) { return a.order - b.order; });
                }
                // Call the collected event handlers
                events.forEach(function (obj) {
                    // If the event handler returns false, prevent the default handler
                    // from executing
                    if (obj.fn.call(el, eventArguments) === false) {
                        eventArguments.preventDefault();
                    }
                });
            }
            // Run the default if not prevented
            if (defaultFunction && !eventArguments.defaultPrevented) {
                defaultFunction.call(el, eventArguments);
            }
        }
        var serialMode;
        /**
         * Get a unique key for using in internal element id's and pointers. The key is
         * composed of a random hash specific to this Highcharts instance, and a
         * counter.
         *
         * @example
         * let id = uniqueKey(); // => 'highcharts-x45f6hp-0'
         *
         * @function Highcharts.uniqueKey
         *
         * @return {string}
         * A unique key.
         */
        var uniqueKey = (function () {
            var hash = Math.random().toString(36).substring(2, 9) + '-';
            var id = 0;
            return function () {
                return 'highcharts-' + (serialMode ? '' : hash) + id++;
            };
        }());
        /**
         * Activates a serial mode for element IDs provided by
         * {@link Highcharts.uniqueKey}. This mode can be used in automated tests, where
         * a simple comparison of two rendered SVG graphics is needed.
         *
         * **Note:** This is only for testing purposes and will break functionality in
         * webpages with multiple charts.
         *
         * @example
         * if (
         *   process &&
         *   process.env.NODE_ENV === 'development'
         * ) {
         *   Highcharts.useSerialIds(true);
         * }
         *
         * @function Highcharts.useSerialIds
         *
         * @param {boolean} [mode]
         * Changes the state of serial mode.
         *
         * @return {boolean|undefined}
         * State of the serial mode.
         */
        function useSerialIds(mode) {
            return (serialMode = pick(mode, serialMode));
        }
        function isFunction(obj) {
            return typeof obj === 'function';
        }
        // Register Highcharts as a plugin in jQuery
        if (win.jQuery) {
            /**
             * Highcharts-extended JQuery.
             *
             * @external JQuery
             */
            /**
             * Helper function to return the chart of the current JQuery selector
             * element.
             *
             * @function external:JQuery#highcharts
             *
             * @return {Highcharts.Chart}
             *         The chart that is linked to the JQuery selector element.
             */ /**
            * Factory function to create a chart in the current JQuery selector
            * element.
            *
            * @function external:JQuery#highcharts
            *
            * @param {'Chart'|'Map'|'StockChart'|string} [className]
            *        Name of the factory class in the Highcharts namespace.
            *
            * @param {Highcharts.Options} [options]
            *        The chart options structure.
            *
            * @param {Highcharts.ChartCallbackFunction} [callback]
            *        Function to run when the chart has loaded and and all external
            *        images are loaded. Defining a
            *        [chart.events.load](https://api.highcharts.com/highcharts/chart.events.load)
            *        handler is equivalent.
            *
            * @return {JQuery}
            *         The current JQuery selector.
            */
            win.jQuery.fn.highcharts = function () {
                var args = [].slice.call(arguments);
                if (this[0]) { // this[0] is the renderTo div
                    // Create the chart
                    if (args[0]) {
                        new H[ // eslint-disable-line computed-property-spacing, no-new
                        // Constructor defaults to Chart
                        isString(args[0]) ? args.shift() : 'Chart'](this[0], args[0], args[1]);
                        return this;
                    }
                    // When called without parameters or with the return argument,
                    // return an existing chart
                    return charts[attr(this[0], 'data-highcharts-chart')];
                }
            };
        }
        /* *
         *
         *  Default Export
         *
         * */
        // TODO use named exports when supported.
        var Utilities = {
            addEvent: addEvent,
            arrayMax: arrayMax,
            arrayMin: arrayMin,
            attr: attr,
            clamp: clamp,
            clearTimeout: internalClearTimeout,
            correctFloat: correctFloat,
            createElement: createElement,
            css: css,
            defined: defined,
            destroyObjectProperties: destroyObjectProperties,
            diffObjects: diffObjects,
            discardElement: discardElement,
            erase: erase,
            error: error,
            extend: extend,
            extendClass: extendClass,
            find: find,
            fireEvent: fireEvent,
            getClosestDistance: getClosestDistance,
            getMagnitude: getMagnitude,
            getNestedProperty: getNestedProperty,
            getStyle: getStyle,
            inArray: inArray,
            insertItem: insertItem,
            isArray: isArray,
            isClass: isClass,
            isDOMElement: isDOMElement,
            isFunction: isFunction,
            isNumber: isNumber,
            isObject: isObject,
            isString: isString,
            keys: keys,
            merge: merge,
            normalizeTickInterval: normalizeTickInterval,
            objectEach: objectEach,
            offset: offset,
            pad: pad,
            pick: pick,
            pInt: pInt,
            pushUnique: pushUnique,
            relativeLength: relativeLength,
            removeEvent: removeEvent,
            splat: splat,
            stableSort: stableSort,
            syncTimeout: syncTimeout,
            timeUnits: timeUnits,
            uniqueKey: uniqueKey,
            useSerialIds: useSerialIds,
            wrap: wrap
        };
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * An animation configuration. Animation configurations can also be defined as
         * booleans, where `false` turns off animation and `true` defaults to a duration
         * of 500ms and defer of 0ms.
         *
         * @interface Highcharts.AnimationOptionsObject
         */ /**
        * A callback function to exectute when the animation finishes.
        * @name Highcharts.AnimationOptionsObject#complete
        * @type {Function|undefined}
        */ /**
        * The animation defer in milliseconds.
        * @name Highcharts.AnimationOptionsObject#defer
        * @type {number|undefined}
        */ /**
        * The animation duration in milliseconds.
        * @name Highcharts.AnimationOptionsObject#duration
        * @type {number|undefined}
        */ /**
        * The name of an easing function as defined on the `Math` object.
        * @name Highcharts.AnimationOptionsObject#easing
        * @type {string|Function|undefined}
        */ /**
        * A callback function to execute on each step of each attribute or CSS property
        * that's being animated. The first argument contains information about the
        * animation and progress.
        * @name Highcharts.AnimationOptionsObject#step
        * @type {Function|undefined}
        */
        /**
         * Creates a frame for the animated SVG element.
         *
         * @callback Highcharts.AnimationStepCallbackFunction
         *
         * @param {Highcharts.SVGElement} this
         *        The SVG element to animate.
         *
         * @return {void}
         */
        /**
         * Interface description for a class.
         *
         * @interface Highcharts.Class<T>
         * @extends Function
         */ /**
        * Class costructor.
        * @function Highcharts.Class<T>#new
        * @param {...Array<*>} args
        *        Constructor arguments.
        * @return {T}
        *         Class instance.
        */
        /**
         * A style object with camel case property names to define visual appearance of
         * a SVG element or HTML element. The properties can be whatever styles are
         * supported on the given SVG or HTML element.
         *
         * @example
         * {
         *    fontFamily: 'monospace',
         *    fontSize: '1.2em'
         * }
         *
         * @interface Highcharts.CSSObject
         */ /**
        * @name Highcharts.CSSObject#[key:string]
        * @type {boolean|number|string|undefined}
        */ /**
        * Background style for the element.
        * @name Highcharts.CSSObject#background
        * @type {string|undefined}
        */ /**
        * Background color of the element.
        * @name Highcharts.CSSObject#backgroundColor
        * @type {Highcharts.ColorString|undefined}
        */ /**
        * Border style for the element.
        * @name Highcharts.CSSObject#border
        * @type {string|undefined}
        */ /**
        * Radius of the element border.
        * @name Highcharts.CSSObject#borderRadius
        * @type {number|undefined}
        */ /**
        * Color used in the element. The 'contrast' option is a Highcharts custom
        * property that results in black or white, depending on the background of the
        * element.
        * @name Highcharts.CSSObject#color
        * @type {'contrast'|Highcharts.ColorString|undefined}
        */ /**
        * Style of the mouse cursor when resting over the element.
        * @name Highcharts.CSSObject#cursor
        * @type {Highcharts.CursorValue|undefined}
        */ /**
        * Font family of the element text. Multiple values have to be in decreasing
        * preference order and separated by comma.
        * @name Highcharts.CSSObject#fontFamily
        * @type {string|undefined}
        */ /**
        * Font size of the element text.
        * @name Highcharts.CSSObject#fontSize
        * @type {string|undefined}
        */ /**
        * Font weight of the element text.
        * @name Highcharts.CSSObject#fontWeight
        * @type {string|undefined}
        */ /**
        * Height of the element.
        * @name Highcharts.CSSObject#height
        * @type {number|undefined}
        */ /**
        * Width of the element border.
        * @name Highcharts.CSSObject#lineWidth
        * @type {number|undefined}
        */ /**
        * Opacity of the element.
        * @name Highcharts.CSSObject#opacity
        * @type {number|undefined}
        */ /**
        * Space around the element content.
        * @name Highcharts.CSSObject#padding
        * @type {string|undefined}
        */ /**
        * Behaviour of the element when the mouse cursor rests over it.
        * @name Highcharts.CSSObject#pointerEvents
        * @type {string|undefined}
        */ /**
        * Positioning of the element.
        * @name Highcharts.CSSObject#position
        * @type {string|undefined}
        */ /**
        * Alignment of the element text.
        * @name Highcharts.CSSObject#textAlign
        * @type {string|undefined}
        */ /**
        * Additional decoration of the element text.
        * @name Highcharts.CSSObject#textDecoration
        * @type {string|undefined}
        */ /**
        * Outline style of the element text.
        * @name Highcharts.CSSObject#textOutline
        * @type {string|undefined}
        */ /**
        * Line break style of the element text. Highcharts SVG elements support
        * `ellipsis` when a `width` is set.
        * @name Highcharts.CSSObject#textOverflow
        * @type {string|undefined}
        */ /**
        * Top spacing of the element relative to the parent element.
        * @name Highcharts.CSSObject#top
        * @type {string|undefined}
        */ /**
        * Animated transition of selected element properties.
        * @name Highcharts.CSSObject#transition
        * @type {string|undefined}
        */ /**
        * Line break style of the element text.
        * @name Highcharts.CSSObject#whiteSpace
        * @type {string|undefined}
        */ /**
        * Width of the element.
        * @name Highcharts.CSSObject#width
        * @type {number|undefined}
        */
        /**
         * All possible cursor styles.
         *
         * @typedef {'alias'|'all-scroll'|'auto'|'cell'|'col-resize'|'context-menu'|'copy'|'crosshair'|'default'|'e-resize'|'ew-resize'|'grab'|'grabbing'|'help'|'move'|'n-resize'|'ne-resize'|'nesw-resize'|'no-drop'|'none'|'not-allowed'|'ns-resize'|'nw-resize'|'nwse-resize'|'pointer'|'progress'|'row-resize'|'s-resize'|'se-resize'|'sw-resize'|'text'|'vertical-text'|'w-resize'|'wait'|'zoom-in'|'zoom-out'} Highcharts.CursorValue
         */
        /**
         * All possible dash styles.
         *
         * @typedef {'Dash'|'DashDot'|'Dot'|'LongDash'|'LongDashDot'|'LongDashDotDot'|'ShortDash'|'ShortDashDot'|'ShortDashDotDot'|'ShortDot'|'Solid'} Highcharts.DashStyleValue
         */
        /**
         * Generic dictionary in TypeScript notation.
         * Use the native `AnyRecord` instead.
         *
         * @deprecated
         * @interface Highcharts.Dictionary<T>
         */ /**
        * @name Highcharts.Dictionary<T>#[key:string]
        * @type {T}
        */
        /**
         * The function callback to execute when the event is fired. The `this` context
         * contains the instance, that fired the event.
         *
         * @callback Highcharts.EventCallbackFunction<T>
         *
         * @param {T} this
         *
         * @param {Highcharts.Dictionary<*>|Event} [eventArguments]
         *        Event arguments.
         *
         * @return {boolean|void}
         */
        /**
         * The event options for adding function callback.
         *
         * @interface Highcharts.EventOptionsObject
         */ /**
        * The order the event handler should be called. This opens for having one
        * handler be called before another, independent of in which order they were
        * added.
        * @name Highcharts.EventOptionsObject#order
        * @type {number}
        */ /**
        * Whether an event should be passive or not.
        * When set to `true`, the function specified by listener will never call
        * `preventDefault()`.
        * @name Highcharts.EventOptionsObject#passive
        * @type boolean
        */
        /**
         * Formats data as a string. Usually the data is accessible throught the `this`
         * keyword.
         *
         * @callback Highcharts.FormatterCallbackFunction<T>
         *
         * @param {T} this
         *        Context to format
         *
         * @return {string}
         *         Formatted text
         */
        /**
         * An object of key-value pairs for HTML attributes.
         *
         * @typedef {Highcharts.Dictionary<boolean|number|string|Function>} Highcharts.HTMLAttributes
         */
        /**
         * An HTML DOM element. The type is a reference to the regular HTMLElement in
         * the global scope.
         *
         * @typedef {global.HTMLElement} Highcharts.HTMLDOMElement
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
         */
        /**
         * The iterator callback.
         *
         * @callback Highcharts.ObjectEachCallbackFunction<T>
         *
         * @param {T} this
         *        The context.
         *
         * @param {*} value
         *        The property value.
         *
         * @param {string} key
         *        The property key.
         *
         * @param {*} obj
         *        The object that objectEach is being applied to.
         */
        /**
         * An object containing `left` and `top` properties for the position in the
         * page.
         *
         * @interface Highcharts.OffsetObject
         */ /**
        * Left distance to the page border.
        * @name Highcharts.OffsetObject#left
        * @type {number}
        */ /**
        * Top distance to the page border.
        * @name Highcharts.OffsetObject#top
        * @type {number}
        */
        /**
         * Describes a range.
         *
         * @interface Highcharts.RangeObject
         */ /**
        * Maximum number of the range.
        * @name Highcharts.RangeObject#max
        * @type {number}
        */ /**
        * Minimum number of the range.
        * @name Highcharts.RangeObject#min
        * @type {number}
        */
        /**
         * If a number is given, it defines the pixel length. If a percentage string is
         * given, like for example `'50%'`, the setting defines a length relative to a
         * base size, for example the size of a container.
         *
         * @typedef {number|string} Highcharts.RelativeSize
         */
        /**
         * Proceed function to call original (wrapped) function.
         *
         * @callback Highcharts.WrapProceedFunction
         *
         * @param {*} [arg1]
         *        Optional argument. Without any arguments defaults to first argument of
         *        the wrapping function.
         *
         * @param {*} [arg2]
         *        Optional argument. Without any arguments defaults to second argument
         *        of the wrapping function.
         *
         * @param {*} [arg3]
         *        Optional argument. Without any arguments defaults to third argument of
         *        the wrapping function.
         *
         * @return {*}
         *         Return value of the original function.
         */
        /**
         * The Highcharts object is the placeholder for all other members, and various
         * utility functions. The most important member of the namespace would be the
         * chart constructor.
         *
         * @example
         * let chart = Highcharts.chart('container', { ... });
         *
         * @namespace Highcharts
         */
        ''; // detach doclets above

        return Utilities;
    });
    _registerModule(_modules, 'Core/Chart/ChartDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * General options for the chart.
         *
         * @optionparent chart
         */
        var ChartDefaults = {
            /**
             * Default `mapData` for all series, in terms of a GeoJSON or TopoJSON
             * object. If set to a string, it functions as an index into the
             * `Highcharts.maps` array.
             *
             * For picking out individual shapes and geometries to use for each series
             * of the map, see [series.mapData](#series.map.mapData).
             *
             * @sample    maps/demo/geojson
             *            Loading GeoJSON data
             * @sample    maps/chart/topojson
             *            Loading TopoJSON data
             *
             * @type      {string|Array<*>|Highcharts.GeoJSON|Highcharts.TopoJSON}
             * @since     5.0.0
             * @product   highmaps
             * @apioption chart.map
             */
            /**
             * Set lat/lon transformation definitions for the chart. If not defined,
             * these are extracted from the map data.
             *
             * @type      {*}
             * @since     5.0.0
             * @product   highmaps
             * @apioption chart.mapTransforms
             */
            /**
             * When using multiple axes, the ticks of two or more opposite axes
             * will automatically be aligned by adding ticks to the axis or axes
             * with the least ticks, as if `tickAmount` were specified.
             *
             * This can be prevented by setting `alignTicks` to false. If the grid
             * lines look messy, it's a good idea to hide them for the secondary
             * axis by setting `gridLineWidth` to 0.
             *
             * If `startOnTick` or `endOnTick` in the axis options are set to false,
             * then the `alignTicks ` will be disabled for the axis.
             *
             * Disabled for logarithmic axes.
             *
             * @sample {highcharts} highcharts/chart/alignticks-true/
             *         True by default
             * @sample {highcharts} highcharts/chart/alignticks-false/
             *         False
             * @sample {highstock} stock/chart/alignticks-true/
             *         True by default
             * @sample {highstock} stock/chart/alignticks-false/
             *         False
             *
             * @type      {boolean}
             * @default   true
             * @product   highcharts highstock gantt
             * @apioption chart.alignTicks
             */
            /**
             * When using multiple axes, align the thresholds. When this is true, other
             * ticks will also be aligned.
             *
             * Note that for line series and some other series types, the `threshold`
             * option is set to `null` by default. This will in turn cause their y-axis
             * to not have a threshold. In order to avoid that, set the series
             * `threshold` to 0 or another number.
             *
             * If `startOnTick` or `endOnTick` in the axis options are set to false, or
             * if the axis is logarithmic, the threshold will not be aligned.
             *
             * @sample {highcharts} highcharts/chart/alignthresholds/ Set to true
             *
             * @since 10.0.0
             * @product   highcharts highstock gantt
             * @apioption chart.alignThresholds
             */
            alignThresholds: false,
            /**
             * Set the overall animation for all chart updating. Animation can be
             * disabled throughout the chart by setting it to false here. It can
             * be overridden for each individual API method as a function parameter.
             * The only animation not affected by this option is the initial series
             * animation, see [plotOptions.series.animation](
             * #plotOptions.series.animation).
             *
             * The animation can either be set as a boolean or a configuration
             * object. If `true`, it will use the 'swing' jQuery easing and a
             * duration of 500 ms. If used as a configuration object, the following
             * properties are supported:
             *
             * - `defer`: The animation delay time in milliseconds.
             *
             * - `duration`: The duration of the animation in milliseconds.
             *
             * - `easing`: A string reference to an easing function set on the
             *   `Math` object. See
             *   [the easing demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-animation-easing/).
             *
             * When zooming on a series with less than 100 points, the chart redraw
             * will be done with animation, but in case of more data points, it is
             * necessary to set this option to ensure animation on zoom.
             *
             * @sample {highcharts} highcharts/chart/animation-none/
             *         Updating with no animation
             * @sample {highcharts} highcharts/chart/animation-duration/
             *         With a longer duration
             * @sample {highcharts} highcharts/chart/animation-easing/
             *         With a jQuery UI easing
             * @sample {highmaps} maps/chart/animation-none/
             *         Updating with no animation
             * @sample {highmaps} maps/chart/animation-duration/
             *         With a longer duration
             *
             * @type      {boolean|Partial<Highcharts.AnimationOptionsObject>}
             * @default   true
             * @apioption chart.animation
             */
            /**
             * A CSS class name to apply to the charts container `div`, allowing
             * unique CSS styling for each chart.
             *
             * @type      {string}
             * @apioption chart.className
             */
            /**
             * Event listeners for the chart.
             *
             * @apioption chart.events
             */
            /**
             * Fires when a series is added to the chart after load time, using the
             * `addSeries` method. One parameter, `event`, is passed to the
             * function, containing common event information. Through
             * `event.options` you can access the series options that were passed to
             * the `addSeries` method. Returning false prevents the series from
             * being added.
             *
             * @sample {highcharts} highcharts/chart/events-addseries/
             *         Alert on add series
             * @sample {highstock} stock/chart/events-addseries/
             *         Alert on add series
             *
             * @type      {Highcharts.ChartAddSeriesCallbackFunction}
             * @since     1.2.0
             * @context   Highcharts.Chart
             * @apioption chart.events.addSeries
             */
            /**
             * Fires when clicking on the plot background. One parameter, `event`,
             * is passed to the function, containing common event information.
             *
             * Information on the clicked spot can be found through `event.xAxis`
             * and `event.yAxis`, which are arrays containing the axes of each
             * dimension and each axis' value at the clicked spot. The primary axes
             * are `event.xAxis[0]` and `event.yAxis[0]`. Remember the unit of a
             * datetime axis is milliseconds since 1970-01-01 00:00:00.
             *
             * ```js
             * click: function(e) {
             *     console.log(
             *         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', e.xAxis[0].value),
             *         e.yAxis[0].value
             *     )
             * }
             * ```
             *
             * @sample {highcharts} highcharts/chart/events-click/
             *         Alert coordinates on click
             * @sample {highcharts} highcharts/chart/events-container/
             *         Alternatively, attach event to container
             * @sample {highstock} stock/chart/events-click/
             *         Alert coordinates on click
             * @sample {highstock} highcharts/chart/events-container/
             *         Alternatively, attach event to container
             * @sample {highmaps} maps/chart/events-click/
             *         Record coordinates on click
             * @sample {highmaps} highcharts/chart/events-container/
             *         Alternatively, attach event to container
             *
             * @type      {Highcharts.ChartClickCallbackFunction}
             * @since     1.2.0
             * @context   Highcharts.Chart
             * @apioption chart.events.click
             */
            /**
             * Fires when the chart is finished loading. Since v4.2.2, it also waits
             * for images to be loaded, for example from point markers. One
             * parameter, `event`, is passed to the function, containing common
             * event information.
             *
             * There is also a second parameter to the chart constructor where a
             * callback function can be passed to be executed on chart.load.
             *
             * @sample {highcharts} highcharts/chart/events-load/
             *         Alert on chart load
             * @sample {highcharts} highcharts/chart/events-render/
             *         Load vs Redraw vs Render
             * @sample {highstock} stock/chart/events-load/
             *         Alert on chart load
             * @sample {highmaps} maps/chart/events-load/
             *         Add series on chart load
             *
             * @type      {Highcharts.ChartLoadCallbackFunction}
             * @context   Highcharts.Chart
             * @apioption chart.events.load
             */
            /**
             * Fires when the chart is redrawn, either after a call to
             * `chart.redraw()` or after an axis, series or point is modified with
             * the `redraw` option set to `true`. One parameter, `event`, is passed
             * to the function, containing common event information.
             *
             * @sample {highcharts} highcharts/chart/events-redraw/
             *         Alert on chart redraw
             * @sample {highcharts} highcharts/chart/events-render/
             *         Load vs Redraw vs Render
             * @sample {highstock} stock/chart/events-redraw/
             *         Alert on chart redraw when adding a series or moving the
             *         zoomed range
             * @sample {highmaps} maps/chart/events-redraw/
             *         Set subtitle on chart redraw
             *
             * @type      {Highcharts.ChartRedrawCallbackFunction}
             * @since     1.2.0
             * @context   Highcharts.Chart
             * @apioption chart.events.redraw
             */
            /**
             * Fires after initial load of the chart (directly after the `load`
             * event), and after each redraw (directly after the `redraw` event).
             *
             * @sample {highcharts} highcharts/chart/events-render/
             *         Load vs Redraw vs Render
             *
             * @type      {Highcharts.ChartRenderCallbackFunction}
             * @since     5.0.7
             * @context   Highcharts.Chart
             * @apioption chart.events.render
             */
            /**
             * Fires when an area of the chart has been selected. Selection is
             * enabled by setting the chart's zoomType. One parameter, `event`, is
             * passed to the function, containing common event information. The
             * default action for the selection event is to zoom the chart to the
             * selected area. It can be prevented by calling
             * `event.preventDefault()` or return false.
             *
             * Information on the selected area can be found through `event.xAxis`
             * and `event.yAxis`, which are arrays containing the axes of each
             * dimension and each axis' min and max values. The primary axes are
             * `event.xAxis[0]` and `event.yAxis[0]`. Remember the unit of a
             * datetime axis is milliseconds since 1970-01-01 00:00:00.
             *
             * ```js
             * selection: function(event) {
             *     // log the min and max of the primary, datetime x-axis
             *     console.log(
             *         Highcharts.dateFormat(
             *             '%Y-%m-%d %H:%M:%S',
             *             event.xAxis[0].min
             *         ),
             *         Highcharts.dateFormat(
             *             '%Y-%m-%d %H:%M:%S',
             *             event.xAxis[0].max
             *         )
             *     );
             *     // log the min and max of the y axis
             *     console.log(event.yAxis[0].min, event.yAxis[0].max);
             * }
             * ```
             *
             * @sample {highcharts} highcharts/chart/events-selection/
             *         Report on selection and reset
             * @sample {highcharts} highcharts/chart/events-selection-points/
             *         Select a range of points through a drag selection
             * @sample {highstock} stock/chart/events-selection/
             *         Report on selection and reset
             * @sample {highstock} highcharts/chart/events-selection-points/
             *         Select a range of points through a drag selection
             *         (Highcharts)
             *
             * @type      {Highcharts.ChartSelectionCallbackFunction}
             * @apioption chart.events.selection
             */
            /**
             * The margin between the outer edge of the chart and the plot area.
             * The numbers in the array designate top, right, bottom and left
             * respectively. Use the options `marginTop`, `marginRight`,
             * `marginBottom` and `marginLeft` for shorthand setting of one option.
             *
             * By default there is no margin. The actual space is dynamically
             * calculated from the offset of axis labels, axis title, title,
             * subtitle and legend in addition to the `spacingTop`, `spacingRight`,
             * `spacingBottom` and `spacingLeft` options.
             *
             * @sample {highcharts} highcharts/chart/margins-zero/
             *         Zero margins
             * @sample {highstock} stock/chart/margin-zero/
             *         Zero margins
             *
             * @type      {number|Array<number>}
             * @apioption chart.margin
             */
            /**
             * The margin between the bottom outer edge of the chart and the plot
             * area. Use this to set a fixed pixel value for the margin as opposed
             * to the default dynamic margin. See also `spacingBottom`.
             *
             * @sample {highcharts} highcharts/chart/marginbottom/
             *         100px bottom margin
             * @sample {highstock} stock/chart/marginbottom/
             *         100px bottom margin
             * @sample {highmaps} maps/chart/margin/
             *         100px margins
             *
             * @type      {number}
             * @since     2.0
             * @apioption chart.marginBottom
             */
            /**
             * The margin between the left outer edge of the chart and the plot
             * area. Use this to set a fixed pixel value for the margin as opposed
             * to the default dynamic margin. See also `spacingLeft`.
             *
             * @sample {highcharts} highcharts/chart/marginleft/
             *         150px left margin
             * @sample {highstock} stock/chart/marginleft/
             *         150px left margin
             * @sample {highmaps} maps/chart/margin/
             *         100px margins
             *
             * @type      {number}
             * @since     2.0
             * @apioption chart.marginLeft
             */
            /**
             * The margin between the right outer edge of the chart and the plot
             * area. Use this to set a fixed pixel value for the margin as opposed
             * to the default dynamic margin. See also `spacingRight`.
             *
             * @sample {highcharts} highcharts/chart/marginright/
             *         100px right margin
             * @sample {highstock} stock/chart/marginright/
             *         100px right margin
             * @sample {highmaps} maps/chart/margin/
             *         100px margins
             *
             * @type      {number}
             * @since     2.0
             * @apioption chart.marginRight
             */
            /**
             * The margin between the top outer edge of the chart and the plot area.
             * Use this to set a fixed pixel value for the margin as opposed to
             * the default dynamic margin. See also `spacingTop`.
             *
             * @sample {highcharts} highcharts/chart/margintop/ 100px top margin
             * @sample {highstock} stock/chart/margintop/
             *         100px top margin
             * @sample {highmaps} maps/chart/margin/
             *         100px margins
             *
             * @type      {number}
             * @since     2.0
             * @apioption chart.marginTop
             */
            /**
             * Callback function to override the default function that formats all
             * the numbers in the chart. Returns a string with the formatted number.
             *
             * @sample highcharts/members/highcharts-numberformat
             *      Arabic digits in Highcharts
             * @type {Highcharts.NumberFormatterCallbackFunction}
             * @since 8.0.0
             * @apioption chart.numberFormatter
             */
            /**
             * Allows setting a key to switch between zooming and panning. Can be
             * one of `alt`, `ctrl`, `meta` (the command key on Mac and Windows
             * key on Windows) or `shift`. The keys are mapped directly to the key
             * properties of the click event argument (`event.altKey`,
             * `event.ctrlKey`, `event.metaKey` and `event.shiftKey`).
             *
             * @type       {string}
             * @since      4.0.3
             * @product    highcharts gantt
             * @validvalue ["alt", "ctrl", "meta", "shift"]
             * @apioption  chart.panKey
             */
            /**
             * Allow panning in a chart. Best used with [panKey](#chart.panKey)
             * to combine zooming and panning.
             *
             * On touch devices, when the [tooltip.followTouchMove](
             * #tooltip.followTouchMove) option is `true` (default), panning
             * requires two fingers. To allow panning with one finger, set
             * `followTouchMove` to `false`.
             *
             * @sample  {highcharts} highcharts/chart/pankey/ Zooming and panning
             * @sample  {highstock} stock/chart/panning/ Zooming and xy panning
             */
            panning: {
                /**
                 * Enable or disable chart panning.
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock|highmaps} true
                 */
                enabled: false,
                /**
                 * Decides in what dimensions the user can pan the chart. Can be
                 * one of `x`, `y`, or `xy`.
                 *
                 * When this option is set to `y` or `xy`, [yAxis.startOnTick](#yAxis.startOnTick)
                 * and [yAxis.endOnTick](#yAxis.endOnTick) are overwritten to `false`.
                 *
                 * @sample {highcharts} highcharts/chart/panning-type
                 *         Zooming and xy panning
                 *
                 * @declare    Highcharts.OptionsChartPanningTypeValue
                 * @type       {string}
                 * @validvalue ["x", "y", "xy"]
                 * @default    {highcharts|highstock} x
                 * @product    highcharts highstock gantt
                 */
                type: 'x'
            },
            /**
             * Equivalent to [zoomType](#chart.zoomType), but for multitouch
             * gestures only. By default, the `pinchType` is the same as the
             * `zoomType` setting. However, pinching can be enabled separately in
             * some cases, for example in stock charts where a mouse drag pans the
             * chart, while pinching is enabled. When [tooltip.followTouchMove](
             * #tooltip.followTouchMove) is true, pinchType only applies to
             * two-finger touches.
             *
             * @type       {string}
             * @default    {highcharts} undefined
             * @default    {highstock} undefined
             * @since      3.0
             * @product    highcharts highstock gantt
             * @deprecated
             * @validvalue ["x", "y", "xy"]
             * @apioption  chart.pinchType
             */
            /**
             * Whether to apply styled mode. When in styled mode, no presentational
             * attributes or CSS are applied to the chart SVG. Instead, CSS rules
             * are required to style the chart. The default style sheet is
             * available from `https://code.highcharts.com/css/highcharts.css`.
             *
             * [Read more in the docs](https://www.highcharts.com/docs/chart-design-and-style/style-by-css)
             * on what classes and variables are available.
             *
             * @sample highcharts/css/colors
             *         Color theming with CSS
             * @sample highcharts/css/prefers-color-scheme
             *         Dynamic theme based on system settings
             * @type       {boolean}
             * @default    false
             * @since      7.0
             * @apioption  chart.styledMode
             */
            styledMode: false,
            /**
             * The corner radius of the outer chart border.
             *
             * @sample {highcharts} highcharts/chart/borderradius/
             *         20px radius
             * @sample {highstock} stock/chart/border/
             *         10px radius
             * @sample {highmaps} maps/chart/border/
             *         Border options
             *
             */
            borderRadius: 0,
            /**
             * In styled mode, this sets how many colors the class names
             * should rotate between. With ten colors, series (or points) are
             * given class names like `highcharts-color-0`, `highcharts-color-1`
             * [...] `highcharts-color-9`. The equivalent in non-styled mode
             * is to set colors using the [colors](#colors) setting.
             *
             * @since      5.0.0
             */
            colorCount: 10,
            /**
             * By default, (because of memory and performance reasons) the chart does
             * not copy the data but keeps it as a reference. In some cases, this might
             * result in mutating the original data source. In order to prevent that,
             * set that property to false. Please note that changing that might decrease
             * performance, especially with bigger sets of data.
             *
             * @type       {boolean}
             * @since 10.1.0
             */
            allowMutatingData: true,
            /**
             * If true, the axes will scale to the remaining visible series once
             * one series is hidden. If false, hiding and showing a series will
             * not affect the axes or the other series. For stacks, once one series
             * within the stack is hidden, the rest of the stack will close in
             * around it even if the axis is not affected.
             *
             * @sample {highcharts} highcharts/chart/ignorehiddenseries-true/
             *         True by default
             * @sample {highcharts} highcharts/chart/ignorehiddenseries-false/
             *         False
             * @sample {highcharts} highcharts/chart/ignorehiddenseries-true-stacked/
             *         True with stack
             * @sample {highstock} stock/chart/ignorehiddenseries-true/
             *         True by default
             * @sample {highstock} stock/chart/ignorehiddenseries-false/
             *         False
             *
             * @since   1.2.0
             * @product highcharts highstock gantt
             */
            ignoreHiddenSeries: true,
            /**
             * Whether to invert the axes so that the x axis is vertical and y axis
             * is horizontal. When `true`, the x axis is [reversed](#xAxis.reversed)
             * by default.
             *
             * @productdesc {highcharts}
             * If a bar series is present in the chart, it will be inverted
             * automatically. Inverting the chart doesn't have an effect if there
             * are no cartesian series in the chart, or if the chart is
             * [polar](#chart.polar).
             *
             * @sample {highcharts} highcharts/chart/inverted/
             *         Inverted line
             * @sample {highstock} stock/navigator/inverted/
             *         Inverted stock chart
             *
             * @type      {boolean}
             * @default   false
             * @product   highcharts highstock gantt
             * @apioption chart.inverted
             */
            /**
             * The distance between the outer edge of the chart and the content,
             * like title or legend, or axis title and labels if present. The
             * numbers in the array designate top, right, bottom and left
             * respectively. Use the options spacingTop, spacingRight, spacingBottom
             * and spacingLeft options for shorthand setting of one option.
             *
             * @type    {Array<number>}
             * @see     [chart.margin](#chart.margin)
             * @default [10, 10, 15, 10]
             * @since   3.0.6
             */
            spacing: [10, 10, 15, 10],
            /**
             * The button that appears after a selection zoom, allowing the user
             * to reset zoom.
             *
             * @since      2.2
             * @deprecated 10.2.1
             */
            resetZoomButton: {
                /**
                 * What frame the button placement should be related to. Can be
                 * either `plotBox` or `spacingBox`.
                 *
                 * @sample {highcharts} highcharts/chart/resetzoombutton-relativeto/
                 *         Relative to the chart
                 * @sample {highstock} highcharts/chart/resetzoombutton-relativeto/
                 *         Relative to the chart
                 *
                 * @type      {Highcharts.ButtonRelativeToValue}
                 * @default   plot
                 * @apioption chart.resetZoomButton.relativeTo
                 */
                /**
                 * A collection of attributes for the button. The object takes SVG
                 * attributes like `fill`, `stroke`, `stroke-width` or `r`, the
                 * border radius. The theme also supports `style`, a collection of
                 * CSS properties for the text. Equivalent attributes for the hover
                 * state are given in `theme.states.hover`.
                 *
                 * @sample {highcharts} highcharts/chart/resetzoombutton-theme/
                 *         Theming the button
                 * @sample {highstock} highcharts/chart/resetzoombutton-theme/
                 *         Theming the button
                 *
                 * @type {Highcharts.SVGAttributes}
                 */
                theme: {
                    /**
                     * @internal
                     */
                    zIndex: 6
                },
                /**
                 * The position of the button.
                 *
                 * @sample {highcharts} highcharts/chart/resetzoombutton-position/
                 *         Above the plot area
                 * @sample {highstock} highcharts/chart/resetzoombutton-position/
                 *         Above the plot area
                 * @sample {highmaps} highcharts/chart/resetzoombutton-position/
                 *         Above the plot area
                 *
                 * @type {Highcharts.AlignObject}
                 */
                position: {
                    /**
                     * The horizontal alignment of the button.
                     */
                    align: 'right',
                    /**
                     * The horizontal offset of the button.
                     */
                    x: -10,
                    /**
                     * The vertical alignment of the button.
                     *
                     * @type      {Highcharts.VerticalAlignValue}
                     * @default   top
                     * @apioption chart.resetZoomButton.position.verticalAlign
                     */
                    /**
                     * The vertical offset of the button.
                     */
                    y: 10
                }
            },
            /**
             * The pixel width of the plot area border.
             *
             * @sample {highcharts} highcharts/chart/plotborderwidth/
             *         1px border
             * @sample {highstock} stock/chart/plotborder/
             *         2px border
             * @sample {highmaps} maps/chart/plotborder/
             *         Plot border options
             *
             * @type      {number}
             * @default   0
             * @apioption chart.plotBorderWidth
             */
            /**
             * Whether to apply a drop shadow to the plot area. Requires that
             * plotBackgroundColor be set. The shadow can be an object configuration
             * containing `color`, `offsetX`, `offsetY`, `opacity` and `width`.
             *
             * @sample {highcharts} highcharts/chart/plotshadow/
             *         Plot shadow
             * @sample {highstock} stock/chart/plotshadow/
             *         Plot shadow
             * @sample {highmaps} maps/chart/plotborder/
             *         Plot border options
             *
             * @type      {boolean|Highcharts.ShadowOptionsObject}
             * @default   false
             * @apioption chart.plotShadow
             */
            /**
             * When true, cartesian charts like line, spline, area and column are
             * transformed into the polar coordinate system. This produces _polar
             * charts_, also known as _radar charts_.
             *
             * @sample {highcharts} highcharts/demo/polar/
             *         Polar chart
             * @sample {highcharts} highcharts/demo/polar-wind-rose/
             *         Wind rose, stacked polar column chart
             * @sample {highcharts} highcharts/demo/polar-spider/
             *         Spider web chart
             * @sample {highcharts} highcharts/parallel-coordinates/polar/
             *         Star plot, multivariate data in a polar chart
             *
             * @type      {boolean}
             * @default   false
             * @since     2.3.0
             * @product   highcharts
             * @requires  highcharts-more
             * @apioption chart.polar
             */
            /**
             * Whether to reflow the chart to fit the width of the container div
             * on resizing the window.
             *
             * @sample {highcharts} highcharts/chart/reflow-true/
             *         True by default
             * @sample {highcharts} highcharts/chart/reflow-false/
             *         False
             * @sample {highstock} stock/chart/reflow-true/
             *         True by default
             * @sample {highstock} stock/chart/reflow-false/
             *         False
             * @sample {highmaps} maps/chart/reflow-true/
             *         True by default
             * @sample {highmaps} maps/chart/reflow-false/
             *         False
             *
             * @since     2.1
             */
            reflow: true,
            /**
             * The HTML element where the chart will be rendered. If it is a string,
             * the element by that id is used. The HTML element can also be passed
             * by direct reference, or as the first argument of the chart
             * constructor, in which case the option is not needed.
             *
             * @sample {highcharts} highcharts/chart/reflow-true/
             *         String
             * @sample {highcharts} highcharts/chart/renderto-object/
             *         Object reference
             * @sample {highstock} stock/chart/renderto-string/
             *         String
             * @sample {highstock} stock/chart/renderto-object/
             *         Object reference
             *
             * @type      {string|Highcharts.HTMLDOMElement}
             * @apioption chart.renderTo
             */
            /**
             * The background color of the marker square when selecting (zooming
             * in on) an area of the chart.
             *
             * @see In styled mode, the selection marker fill is set with the
             *      `.highcharts-selection-marker` class.
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default   rgba(51,92,173,0.25)
             * @since     2.1.7
             * @apioption chart.selectionMarkerFill
             */
            /**
             * Whether to apply a drop shadow to the global series group. This causes
             * all the series to have the same shadow. Contrary to the `series.shadow`
             * option, this prevents items from casting shadows on each other, like for
             * others series in a stack. The shadow can be an object configuration
             * containing `color`, `offsetX`, `offsetY`, `opacity` and `width`.
             *
             * @sample highcharts/chart/seriesgroupshadow/ Shadow
             *
             * @type      {boolean|Highcharts.ShadowOptionsObject}
             * @default   false
             * @apioption chart.shadow
             */
            /**
             * Whether to apply a drop shadow to the outer chart area. Requires
             * that backgroundColor be set. The shadow can be an object
             * configuration containing `color`, `offsetX`, `offsetY`, `opacity` and
             * `width`.
             *
             * @sample {highcharts} highcharts/chart/shadow/
             *         Shadow
             * @sample {highstock} stock/chart/shadow/
             *         Shadow
             * @sample {highmaps} maps/chart/border/
             *         Chart border and shadow
             *
             * @type      {boolean|Highcharts.ShadowOptionsObject}
             * @default   false
             * @apioption chart.shadow
             */
            /**
             * Whether to show the axes initially. This only applies to empty charts
             * where series are added dynamically, as axes are automatically added
             * to cartesian series.
             *
             * @sample {highcharts} highcharts/chart/showaxes-false/
             *         False by default
             * @sample {highcharts} highcharts/chart/showaxes-true/
             *         True
             *
             * @type      {boolean}
             * @since     1.2.5
             * @product   highcharts gantt
             * @apioption chart.showAxes
             */
            /**
             * The space between the bottom edge of the chart and the content (plot
             * area, axis title and labels, title, subtitle or legend in top
             * position).
             *
             * @sample {highcharts} highcharts/chart/spacingbottom/
             *         Spacing bottom set to 100
             * @sample {highstock} stock/chart/spacingbottom/
             *         Spacing bottom set to 100
             * @sample {highmaps} maps/chart/spacing/
             *         Spacing 100 all around
             *
             * @type      {number}
             * @default   15
             * @since     2.1
             * @apioption chart.spacingBottom
             */
            /**
             * The space between the left edge of the chart and the content (plot
             * area, axis title and labels, title, subtitle or legend in top
             * position).
             *
             * @sample {highcharts} highcharts/chart/spacingleft/
             *         Spacing left set to 100
             * @sample {highstock} stock/chart/spacingleft/
             *         Spacing left set to 100
             * @sample {highmaps} maps/chart/spacing/
             *         Spacing 100 all around
             *
             * @type      {number}
             * @default   10
             * @since     2.1
             * @apioption chart.spacingLeft
             */
            /**
             * The space between the right edge of the chart and the content (plot
             * area, axis title and labels, title, subtitle or legend in top
             * position).
             *
             * @sample {highcharts} highcharts/chart/spacingright-100/
             *         Spacing set to 100
             * @sample {highcharts} highcharts/chart/spacingright-legend/
             *         Legend in right position with default spacing
             * @sample {highstock} stock/chart/spacingright/
             *         Spacing set to 100
             * @sample {highmaps} maps/chart/spacing/
             *         Spacing 100 all around
             *
             * @type      {number}
             * @default   10
             * @since     2.1
             * @apioption chart.spacingRight
             */
            /**
             * The space between the top edge of the chart and the content (plot
             * area, axis title and labels, title, subtitle or legend in top
             * position).
             *
             * @sample {highcharts} highcharts/chart/spacingtop-100/
             *         A top spacing of 100
             * @sample {highcharts} highcharts/chart/spacingtop-10/
             *         Floating chart title makes the plot area align to the default
             *         spacingTop of 10.
             * @sample {highstock} stock/chart/spacingtop/
             *         A top spacing of 100
             * @sample {highmaps} maps/chart/spacing/
             *         Spacing 100 all around
             *
             * @type      {number}
             * @default   10
             * @since     2.1
             * @apioption chart.spacingTop
             */
            /**
             * Additional CSS styles to apply inline to the container `div` and the root
             * SVG.
             *
             * Since v11, the root font size is 1rem by default, and all child element
             * are given a relative `em` font size by default. This allows implementers
             * to control all the chart's font sizes by only setting the root level.
             *
             * @see    In styled mode, general chart styles can be set with the
             *         `.highcharts-root` class.
             * @sample {highcharts} highcharts/chart/style-serif-font/
             *         Using a serif type font
             * @sample {highcharts} highcharts/members/relative-font-size/
             *         Relative font sizes
             * @sample {highcharts} highcharts/css/em/
             *         Styled mode with relative font sizes
             * @sample {highstock} stock/chart/style/
             *         Using a serif type font
             * @sample {highmaps} maps/chart/style-serif-font/
             *         Using a serif type font
             *
             * @type      {Highcharts.CSSObject}
             * @default   {"fontFamily": Helvetica, Arial, sans-serif","fontSize":"1rem"}
             * @apioption chart.style
             */
            /**
             * The default series type for the chart. Can be any of the chart types
             * listed under [plotOptions](#plotOptions) and [series](#series) or can
             * be a series provided by an additional module.
             *
             * In TypeScript this option has no effect in sense of typing and
             * instead the `type` option must always be set in the series.
             *
             * @sample {highcharts} highcharts/chart/type-bar/
             *         Bar
             * @sample {highstock} stock/chart/type/
             *         Areaspline
             * @sample {highmaps} maps/chart/type-mapline/
             *         Mapline
             *
             * @type       {string}
             * @default    {highcharts} line
             * @default    {highstock} line
             * @default    {highmaps} map
             * @since      2.1.0
             * @apioption  chart.type
             */
            type: 'line',
            /**
             * Decides in what dimensions the user can zoom by dragging the mouse.
             * Can be one of `x`, `y` or `xy`.
             *
             * @see [panKey](#chart.panKey)
             *
             * @sample {highcharts} highcharts/chart/zoomtype-none/
             *         None by default
             * @sample {highcharts} highcharts/chart/zoomtype-x/
             *         X
             * @sample {highcharts} highcharts/chart/zoomtype-y/
             *         Y
             * @sample {highcharts} highcharts/chart/zoomtype-xy/
             *         Xy
             * @sample {highcharts} highcharts/chart/zoomtype-polar/
             *         Zoom on polar chart
             * @sample {highstock} stock/demo/basic-line/
             *         None by default
             * @sample {highstock} stock/chart/zoomtype-x/
             *         X
             * @sample {highstock} stock/chart/zoomtype-y/
             *         Y
             * @sample {highstock} stock/chart/zoomtype-xy/
             *         Xy
             * @sample {highmaps} maps/chart/zoomtype-xy/
             *         Map with selection zoom
             *
             * @type       {string}
             * @validvalue ["x", "y", "xy"]
             * @deprecated
             * @apioption  chart.zoomType
             */
            /**
             * Enables zooming by a single touch, in combination with
             * [chart.zoomType](#chart.zoomType). When enabled, two-finger pinch
             * will still work as set up by [chart.pinchType](#chart.pinchType).
             * However, `zoomBySingleTouch` will interfere with touch-dragging the
             * chart to read the tooltip. And especially when vertical zooming is
             * enabled, it will make it hard to scroll vertically on the page.
             * @since      9.0.0
             * @sample     highcharts/chart/zoombysingletouch
             *             Zoom by single touch enabled, with buttons to toggle
             * @product    highcharts highstock gantt
             * @deprecated
             */
            /**
             * Chart zooming options.
             * @since 10.2.1
             */
            zooming: {
                /**
                 * Equivalent to [type](#chart.zooming.type), but for multitouch
                 * gestures only. By default, the `pinchType` is the same as the
                 * `type` setting. However, pinching can be enabled separately in
                 * some cases, for example in stock charts where a mouse drag pans the
                 * chart, while pinching is enabled. When [tooltip.followTouchMove](
                 * #tooltip.followTouchMove) is true, pinchType only applies to
                 * two-finger touches.
                 *
                 * @type       {string}
                 * @default    {highcharts} undefined
                 * @default    {highstock} x
                 * @product    highcharts highstock gantt
                 * @validvalue ["x", "y", "xy"]
                 * @apioption  chart.zooming.pinchType
                 */
                /**
                 * Decides in what dimensions the user can zoom by dragging the mouse.
                 * Can be one of `x`, `y` or `xy`.
                 *
                 * @declare    Highcharts.OptionsChartZoomingTypeValue
                 * @type       {string}
                 * @default    {highcharts} undefined
                 * @product    highcharts highstock gantt
                 * @validvalue ["x", "y", "xy"]
                 * @apioption  chart.zooming.type
                 */
                /**
                 * Set a key to hold when dragging to zoom the chart. This is useful to
                 * avoid zooming while moving points. Should be set different than
                 * [chart.panKey](#chart.panKey).
                 *
                 * @type       {string}
                 * @default    {highcharts} undefined
                 * @validvalue ["alt", "ctrl", "meta", "shift"]
                 * @requires   modules/draggable-points
                 * @apioption  chart.zooming.key
                 */
                /**
                 * Enables zooming by a single touch, in combination with
                 * [chart.zooming.type](#chart.zooming.type). When enabled, two-finger
                 * pinch will still work as set up by [chart.zooming.pinchType]
                 * (#chart.zooming.pinchType). However, `singleTouch` will interfere
                 * with touch-dragging the chart to read the tooltip. And especially
                 * when vertical zooming is enabled, it will make it hard to scroll
                 * vertically on the page.
                 *
                 * @sample  highcharts/chart/zoombysingletouch
                 *          Zoom by single touch enabled, with buttons to toggle
                 *
                 * @product highcharts highstock gantt
                 */
                singleTouch: false,
                /**
                 * The button that appears after a selection zoom, allowing the user
                 * to reset zoom.
                 */
                resetButton: {
                    /**
                     * What frame the button placement should be related to. Can be
                     * either `plotBox` or `spacingBox`.
                     *
                     * @sample {highcharts} highcharts/chart/resetzoombutton-relativeto/
                     *         Relative to the chart
                     * @sample {highstock} highcharts/chart/resetzoombutton-relativeto/
                     *         Relative to the chart
                     *
                     * @type      {Highcharts.ButtonRelativeToValue}
                     * @default   plot
                     * @apioption chart.zooming.resetButton.relativeTo
                     */
                    /**
                     * A collection of attributes for the button. The object takes SVG
                     * attributes like `fill`, `stroke`, `stroke-width` or `r`, the
                     * border radius. The theme also supports `style`, a collection of
                     * CSS properties for the text. Equivalent attributes for the hover
                     * state are given in `theme.states.hover`.
                     *
                     * @sample {highcharts} highcharts/chart/resetzoombutton-theme/
                     *         Theming the button
                     * @sample {highstock} highcharts/chart/resetzoombutton-theme/
                     *         Theming the button
                     *
                     * @type  {Highcharts.SVGAttributes}
                     * @since 10.2.1
                     */
                    theme: {
                        /** @internal */
                        zIndex: 6
                    },
                    /**
                     * The position of the button.
                     *
                     * @sample {highcharts} highcharts/chart/resetzoombutton-position/
                     *         Above the plot area
                     * @sample {highstock} highcharts/chart/resetzoombutton-position/
                     *         Above the plot area
                     * @sample {highmaps} highcharts/chart/resetzoombutton-position/
                     *         Above the plot area
                     *
                     * @type  {Highcharts.AlignObject}
                     * @since 10.2.1
                     */
                    position: {
                        /**
                         * The horizontal alignment of the button.
                         */
                        align: 'right',
                        /**
                         * The horizontal offset of the button.
                         */
                        x: -10,
                        /**
                         * The vertical alignment of the button.
                         *
                         * @type       {Highcharts.VerticalAlignValue}
                         * @default    top
                         * @apioption  chart.zooming.resetButton.position.verticalAlign
                         */
                        /**
                         * The vertical offset of the button.
                         */
                        y: 10
                    }
                }
            },
            /**
             * An explicit width for the chart. By default (when `null`) the width
             * is calculated from the offset width of the containing element.
             *
             * @sample {highcharts} highcharts/chart/width/
             *         800px wide
             * @sample {highstock} stock/chart/width/
             *         800px wide
             * @sample {highmaps} maps/chart/size/
             *         Chart with explicit size
             *
             * @type {null|number|string}
             */
            width: null,
            /**
             * An explicit height for the chart. If a _number_, the height is
             * given in pixels. If given a _percentage string_ (for example
             * `'56%'`), the height is given as the percentage of the actual chart
             * width. This allows for preserving the aspect ratio across responsive
             * sizes.
             *
             * By default (when `null`) the height is calculated from the offset
             * height of the containing element, or 400 pixels if the containing
             * element's height is 0.
             *
             * @sample {highcharts} highcharts/chart/height/
             *         500px height
             * @sample {highstock} stock/chart/height/
             *         300px height
             * @sample {highmaps} maps/chart/size/
             *         Chart with explicit size
             * @sample highcharts/chart/height-percent/
             *         Highcharts with percentage height
             *
             * @type {null|number|string}
             */
            height: null,
            /**
             * The color of the outer chart border.
             *
             * @see In styled mode, the stroke is set with the
             *      `.highcharts-background` class.
             *
             * @sample {highcharts} highcharts/chart/bordercolor/
             *         Brown border
             * @sample {highstock} stock/chart/border/
             *         Brown border
             * @sample {highmaps} maps/chart/border/
             *         Border options
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            borderColor: "#334eff" /* Palette.highlightColor80 */,
            /**
             * The pixel width of the outer chart border.
             *
             * @see In styled mode, the stroke is set with the
             *      `.highcharts-background` class.
             *
             * @sample {highcharts} highcharts/chart/borderwidth/
             *         5px border
             * @sample {highstock} stock/chart/border/
             *         2px border
             * @sample {highmaps} maps/chart/border/
             *         Border options
             *
             * @type      {number}
             * @default   0
             * @apioption chart.borderWidth
             */
            /**
             * The background color or gradient for the outer chart area.
             *
             * @see In styled mode, the background is set with the
             *      `.highcharts-background` class.
             *
             * @sample {highcharts} highcharts/chart/backgroundcolor-color/
             *         Color
             * @sample {highcharts} highcharts/chart/backgroundcolor-gradient/
             *         Gradient
             * @sample {highstock} stock/chart/backgroundcolor-color/
             *         Color
             * @sample {highstock} stock/chart/backgroundcolor-gradient/
             *         Gradient
             * @sample {highmaps} maps/chart/backgroundcolor-color/
             *         Color
             * @sample {highmaps} maps/chart/backgroundcolor-gradient/
             *         Gradient
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            backgroundColor: "#ffffff" /* Palette.backgroundColor */,
            /**
             * The background color or gradient for the plot area.
             *
             * @see In styled mode, the plot background is set with the
             *      `.highcharts-plot-background` class.
             *
             * @sample {highcharts} highcharts/chart/plotbackgroundcolor-color/
             *         Color
             * @sample {highcharts} highcharts/chart/plotbackgroundcolor-gradient/
             *         Gradient
             * @sample {highstock} stock/chart/plotbackgroundcolor-color/
             *         Color
             * @sample {highstock} stock/chart/plotbackgroundcolor-gradient/
             *         Gradient
             * @sample {highmaps} maps/chart/plotbackgroundcolor-color/
             *         Color
             * @sample {highmaps} maps/chart/plotbackgroundcolor-gradient/
             *         Gradient
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @apioption chart.plotBackgroundColor
             */
            /**
             * The URL for an image to use as the plot background. To set an image
             * as the background for the entire chart, set a CSS background image
             * to the container element. Note that for the image to be applied to
             * exported charts, its URL needs to be accessible by the export server.
             *
             * @see In styled mode, a plot background image can be set with the
             *      `.highcharts-plot-background` class and a [custom pattern](
             *      https://www.highcharts.com/docs/chart-design-and-style/gradients-shadows-and-patterns).
             *
             * @sample {highcharts} highcharts/chart/plotbackgroundimage/
             *         Skies
             * @sample {highstock} stock/chart/plotbackgroundimage/
             *         Skies
             *
             * @type      {string}
             * @apioption chart.plotBackgroundImage
             */
            /**
             * The color of the inner chart or plot area border.
             *
             * @see In styled mode, a plot border stroke can be set with the
             *      `.highcharts-plot-border` class.
             *
             * @sample {highcharts} highcharts/chart/plotbordercolor/
             *         Blue border
             * @sample {highstock} stock/chart/plotborder/
             *         Blue border
             * @sample {highmaps} maps/chart/plotborder/
             *         Plot border options
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            plotBorderColor: "#cccccc" /* Palette.neutralColor20 */
        };
        /* *
         *
         *  Default Export
         *
         * */

        return ChartDefaults;
    });
    _registerModule(_modules, 'Core/Color/Color.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var isNumber = U.isNumber, merge = U.merge, pInt = U.pInt;
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable valid-jsdoc */
        /**
         * Handle color operations. Some object methods are chainable.
         *
         * @class
         * @name Highcharts.Color
         *
         * @param {Highcharts.ColorType} input
         * The input color in either rbga or hex format
         */
        var Color = /** @class */ (function () {
            /* *
             *
             *  Constructor
             *
             * */
            function Color(input) {
                this.rgba = [NaN, NaN, NaN, NaN];
                this.input = input;
                var GlobalColor = H.Color;
                // Backwards compatibility, allow class overwrite
                if (GlobalColor && GlobalColor !== Color) {
                    return new GlobalColor(input);
                }
                this.init(input);
            }
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * Creates a color instance out of a color string or object.
             *
             * @function Highcharts.Color.parse
             *
             * @param {Highcharts.ColorType} [input]
             * The input color in either rbga or hex format.
             *
             * @return {Highcharts.Color}
             * Color instance.
             */
            Color.parse = function (input) {
                return input ? new Color(input) : Color.None;
            };
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Parse the input color to rgba array
             *
             * @private
             * @function Highcharts.Color#init
             *
             * @param {Highcharts.ColorType} input
             * The input color in either rbga or hex format
             */
            Color.prototype.init = function (input) {
                var result, rgba, i, parser;
                // Gradients
                if (typeof input === 'object' &&
                    typeof input.stops !== 'undefined') {
                    this.stops = input.stops.map(function (stop) { return new Color(stop[1]); });
                    // Solid colors
                }
                else if (typeof input === 'string') {
                    this.input = input = (Color.names[input.toLowerCase()] || input);
                    // Bitmasking as input[0] is not working for legacy IE.
                    if (input.charAt(0) === '#') {
                        var len = input.length, col = parseInt(input.substr(1), 16);
                        // Handle long-form, e.g. #AABBCC
                        if (len === 7) {
                            rgba = [
                                (col & 0xFF0000) >> 16,
                                (col & 0xFF00) >> 8,
                                (col & 0xFF),
                                1
                            ];
                            // Handle short-form, e.g. #ABC
                            // In short form, the value is assumed to be the same
                            // for both nibbles for each component. e.g. #ABC = #AABBCC
                        }
                        else if (len === 4) {
                            rgba = [
                                (((col & 0xF00) >> 4) |
                                    (col & 0xF00) >> 8),
                                (((col & 0xF0) >> 4) |
                                    (col & 0xF0)),
                                ((col & 0xF) << 4) | (col & 0xF),
                                1
                            ];
                        }
                    }
                    // Otherwise, check regex parsers
                    if (!rgba) {
                        i = Color.parsers.length;
                        while (i-- && !rgba) {
                            parser = Color.parsers[i];
                            result = parser.regex.exec(input);
                            if (result) {
                                rgba = parser.parse(result);
                            }
                        }
                    }
                }
                if (rgba) {
                    this.rgba = rgba;
                }
            };
            /**
             * Return the color or gradient stops in the specified format
             *
             * @function Highcharts.Color#get
             *
             * @param {string} [format]
             * Possible values are 'a', 'rgb', 'rgba' (default).
             *
             * @return {Highcharts.ColorType}
             * This color as a string or gradient stops.
             */
            Color.prototype.get = function (format) {
                var input = this.input, rgba = this.rgba;
                if (typeof input === 'object' &&
                    typeof this.stops !== 'undefined') {
                    var ret_1 = merge(input);
                    ret_1.stops = [].slice.call(ret_1.stops);
                    this.stops.forEach(function (stop, i) {
                        ret_1.stops[i] = [
                            ret_1.stops[i][0],
                            stop.get(format)
                        ];
                    });
                    return ret_1;
                }
                // it's NaN if gradient colors on a column chart
                if (rgba && isNumber(rgba[0])) {
                    if (format === 'rgb' || (!format && rgba[3] === 1)) {
                        return 'rgb(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ')';
                    }
                    if (format === 'a') {
                        return "".concat(rgba[3]);
                    }
                    return 'rgba(' + rgba.join(',') + ')';
                }
                return input;
            };
            /**
             * Brighten the color instance.
             *
             * @function Highcharts.Color#brighten
             *
             * @param {number} alpha
             * The alpha value.
             *
             * @return {Highcharts.Color}
             * This color with modifications.
             */
            Color.prototype.brighten = function (alpha) {
                var rgba = this.rgba;
                if (this.stops) {
                    this.stops.forEach(function (stop) {
                        stop.brighten(alpha);
                    });
                }
                else if (isNumber(alpha) && alpha !== 0) {
                    for (var i = 0; i < 3; i++) {
                        rgba[i] += pInt(alpha * 255);
                        if (rgba[i] < 0) {
                            rgba[i] = 0;
                        }
                        if (rgba[i] > 255) {
                            rgba[i] = 255;
                        }
                    }
                }
                return this;
            };
            /**
             * Set the color's opacity to a given alpha value.
             *
             * @function Highcharts.Color#setOpacity
             *
             * @param {number} alpha
             *        Opacity between 0 and 1.
             *
             * @return {Highcharts.Color}
             *         Color with modifications.
             */
            Color.prototype.setOpacity = function (alpha) {
                this.rgba[3] = alpha;
                return this;
            };
            /**
             * Return an intermediate color between two colors.
             *
             * @function Highcharts.Color#tweenTo
             *
             * @param {Highcharts.Color} to
             * The color object to tween to.
             *
             * @param {number} pos
             * The intermediate position, where 0 is the from color (current color
             * item), and 1 is the `to` color.
             *
             * @return {Highcharts.ColorType}
             * The intermediate color in rgba notation, or unsupported type.
             */
            Color.prototype.tweenTo = function (to, pos) {
                var fromRgba = this.rgba, toRgba = to.rgba;
                // Unsupported color, return to-color (#3920, #7034)
                if (!isNumber(fromRgba[0]) || !isNumber(toRgba[0])) {
                    return to.input || 'none';
                }
                // Check for has alpha, because rgba colors perform worse due to
                // lack of support in WebKit.
                var hasAlpha = (toRgba[3] !== 1 || fromRgba[3] !== 1);
                return (hasAlpha ? 'rgba(' : 'rgb(') +
                    Math.round(toRgba[0] + (fromRgba[0] - toRgba[0]) * (1 - pos)) +
                    ',' +
                    Math.round(toRgba[1] + (fromRgba[1] - toRgba[1]) * (1 - pos)) +
                    ',' +
                    Math.round(toRgba[2] + (fromRgba[2] - toRgba[2]) * (1 - pos)) +
                    (hasAlpha ?
                        (',' +
                            (toRgba[3] + (fromRgba[3] - toRgba[3]) * (1 - pos))) :
                        '') +
                    ')';
            };
            /* *
             *
             *  Static Properties
             *
             * */
            /**
             * Collection of named colors. Can be extended from the outside by adding
             * colors to Highcharts.Color.names.
             * @private
             */
            Color.names = {
                white: '#ffffff',
                black: '#000000'
            };
            /**
             * Collection of parsers. This can be extended from the outside by pushing
             * parsers to `Color.parsers`.
             */
            Color.parsers = [{
                    // RGBA color
                    // eslint-disable-next-line max-len
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function (result) {
                        return [
                            pInt(result[1]),
                            pInt(result[2]),
                            pInt(result[3]),
                            parseFloat(result[4], 10)
                        ];
                    }
                }, {
                    // RGB color
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse: function (result) {
                        return [pInt(result[1]), pInt(result[2]), pInt(result[3]), 1];
                    }
                }];
            // Must be last static member for init cycle
            Color.None = new Color('');
            return Color;
        }());
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * A valid color to be parsed and handled by Highcharts. Highcharts internally
         * supports hex colors like `#ffffff`, rgb colors like `rgb(255,255,255)` and
         * rgba colors like `rgba(255,255,255,1)`. Other colors may be supported by the
         * browsers and displayed correctly, but Highcharts is not able to process them
         * and apply concepts like opacity and brightening.
         *
         * @typedef {string} Highcharts.ColorString
         */
        /**
         * A valid color type than can be parsed and handled by Highcharts. It can be a
         * color string, a gradient object, or a pattern object.
         *
         * @typedef {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject} Highcharts.ColorType
         */
        /**
         * Gradient options instead of a solid color.
         *
         * @example
         * // Linear gradient used as a color option
         * color: {
         *     linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
         *     stops: [
         *         [0, '#003399'], // start
         *         [0.5, '#ffffff'], // middle
         *         [1, '#3366AA'] // end
         *     ]
         * }
         *
         * @interface Highcharts.GradientColorObject
         */ /**
        * Holds an object that defines the start position and the end position relative
        * to the shape.
        * @name Highcharts.GradientColorObject#linearGradient
        * @type {Highcharts.LinearGradientColorObject|undefined}
        */ /**
        * Holds an object that defines the center position and the radius.
        * @name Highcharts.GradientColorObject#radialGradient
        * @type {Highcharts.RadialGradientColorObject|undefined}
        */ /**
        * The first item in each tuple is the position in the gradient, where 0 is the
        * start of the gradient and 1 is the end of the gradient. Multiple stops can be
        * applied. The second item is the color for each stop. This color can also be
        * given in the rgba format.
        * @name Highcharts.GradientColorObject#stops
        * @type {Array<Highcharts.GradientColorStopObject>}
        */
        /**
         * Color stop tuple.
         *
         * @see Highcharts.GradientColorObject
         *
         * @interface Highcharts.GradientColorStopObject
         */ /**
        * @name Highcharts.GradientColorStopObject#0
        * @type {number}
        */ /**
        * @name Highcharts.GradientColorStopObject#1
        * @type {Highcharts.ColorString}
        */ /**
        * @name Highcharts.GradientColorStopObject#color
        * @type {Highcharts.Color|undefined}
        */
        /**
         * Defines the start position and the end position for a gradient relative
         * to the shape. Start position (x1, y1) and end position (x2, y2) are relative
         * to the shape, where 0 means top/left and 1 is bottom/right.
         *
         * @interface Highcharts.LinearGradientColorObject
         */ /**
        * Start horizontal position of the gradient. Float ranges 0-1.
        * @name Highcharts.LinearGradientColorObject#x1
        * @type {number}
        */ /**
        * End horizontal position of the gradient. Float ranges 0-1.
        * @name Highcharts.LinearGradientColorObject#x2
        * @type {number}
        */ /**
        * Start vertical position of the gradient. Float ranges 0-1.
        * @name Highcharts.LinearGradientColorObject#y1
        * @type {number}
        */ /**
        * End vertical position of the gradient. Float ranges 0-1.
        * @name Highcharts.LinearGradientColorObject#y2
        * @type {number}
        */
        /**
         * Defines the center position and the radius for a gradient.
         *
         * @interface Highcharts.RadialGradientColorObject
         */ /**
        * Center horizontal position relative to the shape. Float ranges 0-1.
        * @name Highcharts.RadialGradientColorObject#cx
        * @type {number}
        */ /**
        * Center vertical position relative to the shape. Float ranges 0-1.
        * @name Highcharts.RadialGradientColorObject#cy
        * @type {number}
        */ /**
        * Radius relative to the shape. Float ranges 0-1.
        * @name Highcharts.RadialGradientColorObject#r
        * @type {number}
        */
        /**
         * Creates a color instance out of a color string.
         *
         * @function Highcharts.color
         *
         * @param {Highcharts.ColorType} input
         *        The input color in either rbga or hex format
         *
         * @return {Highcharts.Color}
         *         Color instance
         */
        (''); // detach doclets above

        return Color;
    });
    _registerModule(_modules, 'Core/Color/Palettes.js', [], function () {
        /**
         * Series palettes for Highcharts. Series colors are defined in highcharts.css.
         * **Do not edit this file!** This file is generated using the 'gulp palette' task.
         */
        var SeriesPalettes = {
            /**
             * Colors for data series and points
             */
            colors: [
                '#2caffe',
                '#544fc5',
                '#00e272',
                '#fe6a35',
                '#6b8abc',
                '#d568fb',
                '#2ee0ca',
                '#fa4b42',
                '#feb56a',
                '#91e8e1'
            ]
        };

        return SeriesPalettes;
    });
    _registerModule(_modules, 'Core/Time.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var win = H.win;
        var defined = U.defined, error = U.error, extend = U.extend, isObject = U.isObject, merge = U.merge, objectEach = U.objectEach, pad = U.pad, pick = U.pick, splat = U.splat, timeUnits = U.timeUnits;
        /* *
         *
         *  Constants
         *
         * */
        var hasNewSafariBug = H.isSafari &&
            win.Intl &&
            win.Intl.DateTimeFormat.prototype.formatRange;
        // To do: Remove this when we no longer need support for Safari < v14.1
        var hasOldSafariBug = H.isSafari &&
            win.Intl &&
            !win.Intl.DateTimeFormat.prototype.formatRange;
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The Time class. Time settings are applied in general for each page using
         * `Highcharts.setOptions`, or individually for each Chart item through the
         * [time](https://api.highcharts.com/highcharts/time) options set.
         *
         * The Time object is available from {@link Highcharts.Chart#time},
         * which refers to  `Highcharts.time` if no individual time settings are
         * applied.
         *
         * @example
         * // Apply time settings globally
         * Highcharts.setOptions({
         *     time: {
         *         timezone: 'Europe/London'
         *     }
         * });
         *
         * // Apply time settings by instance
         * let chart = Highcharts.chart('container', {
         *     time: {
         *         timezone: 'America/New_York'
         *     },
         *     series: [{
         *         data: [1, 4, 3, 5]
         *     }]
         * });
         *
         * // Use the Time object
         * console.log(
         *        'Current time in New York',
         *        chart.time.dateFormat('%Y-%m-%d %H:%M:%S', Date.now())
         * );
         *
         * @since 6.0.5
         *
         * @class
         * @name Highcharts.Time
         *
         * @param {Highcharts.TimeOptions} [options]
         * Time options as defined in [chart.options.time](/highcharts/time).
         */
        var Time = /** @class */ (function () {
            /* *
             *
             *  Constructors
             *
             * */
            function Time(options) {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.options = {};
                this.useUTC = false;
                this.variableTimezone = false;
                this.Date = win.Date;
                /**
                 * Get the time zone offset based on the current timezone information as
                 * set in the global options.
                 *
                 * @function Highcharts.Time#getTimezoneOffset
                 *
                 * @param {number} timestamp
                 *        The JavaScript timestamp to inspect.
                 *
                 * @return {number}
                 *         The timezone offset in minutes compared to UTC.
                 */
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(options);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Time units used in `Time.get` and `Time.set`
             *
             * @typedef {"Date"|"Day"|"FullYear"|"Hours"|"Milliseconds"|"Minutes"|"Month"|"Seconds"} Highcharts.TimeUnitValue
             */
            /**
             * Get the value of a date object in given units, and subject to the Time
             * object's current timezone settings. This function corresponds directly to
             * JavaScripts `Date.getXXX / Date.getUTCXXX`, so instead of calling
             * `date.getHours()` or `date.getUTCHours()` we will call
             * `time.get('Hours')`.
             *
             * @function Highcharts.Time#get
             *
             * @param {Highcharts.TimeUnitValue} unit
             * @param {Date} date
             *
             * @return {number}
             *        The given time unit
             */
            Time.prototype.get = function (unit, date) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var realMs = date.getTime();
                    var ms = realMs - this.getTimezoneOffset(date);
                    date.setTime(ms); // Temporary adjust to timezone
                    var ret = date['getUTC' + unit]();
                    date.setTime(realMs); // Reset
                    return ret;
                }
                // UTC time with no timezone handling
                if (this.useUTC) {
                    return date['getUTC' + unit]();
                }
                // Else, local time
                return date['get' + unit]();
            };
            /**
             * Set the value of a date object in given units, and subject to the Time
             * object's current timezone settings. This function corresponds directly to
             * JavaScripts `Date.setXXX / Date.setUTCXXX`, so instead of calling
             * `date.setHours(0)` or `date.setUTCHours(0)` we will call
             * `time.set('Hours', 0)`.
             *
             * @function Highcharts.Time#set
             *
             * @param {Highcharts.TimeUnitValue} unit
             * @param {Date} date
             * @param {number} value
             *
             * @return {number}
             *        The epoch milliseconds of the updated date
             */
            Time.prototype.set = function (unit, date, value) {
                // UTC time with timezone handling
                if (this.variableTimezone || this.timezoneOffset) {
                    // For lower order time units, just set it directly using UTC
                    // time
                    if (unit === 'Milliseconds' ||
                        unit === 'Seconds' ||
                        (unit === 'Minutes' &&
                            this.getTimezoneOffset(date) % 3600000 === 0) // #13961
                    ) {
                        return date['setUTC' + unit](value);
                    }
                    // Higher order time units need to take the time zone into
                    // account
                    // Adjust by timezone
                    var offset = this.getTimezoneOffset(date);
                    var ms = date.getTime() - offset;
                    date.setTime(ms);
                    date['setUTC' + unit](value);
                    var newOffset = this.getTimezoneOffset(date);
                    ms = date.getTime() + newOffset;
                    return date.setTime(ms);
                }
                // UTC time with no timezone handling
                if (this.useUTC ||
                    // leap calculation in UTC only
                    (hasNewSafariBug && unit === 'FullYear')) {
                    return date['setUTC' + unit](value);
                }
                // Else, local time
                return date['set' + unit](value);
            };
            /**
             * Update the Time object with current options. It is called internally on
             * initializing Highcharts, after running `Highcharts.setOptions` and on
             * `Chart.update`.
             *
             * @private
             * @function Highcharts.Time#update
             *
             * @param {Highcharts.TimeOptions} [options]
             *
             */
            Time.prototype.update = function (options) {
                if (options === void 0) { options = {}; }
                var useUTC = pick(options.useUTC, true);
                this.options = options = merge(true, this.options, options);
                // Allow using a different Date class
                this.Date = options.Date || win.Date || Date;
                this.useUTC = useUTC;
                this.timezoneOffset = (useUTC && options.timezoneOffset) || void 0;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                /*
                 * The time object has options allowing for variable time zones, meaning
                 * the axis ticks or series data needs to consider this.
                 */
                this.variableTimezone = useUTC && !!(options.getTimezoneOffset ||
                    options.timezone);
            };
            /**
             * Make a time and returns milliseconds. Interprets the inputs as UTC time,
             * local time or a specific timezone time depending on the current time
             * settings.
             *
             * @function Highcharts.Time#makeTime
             *
             * @param {number} year
             *        The year
             *
             * @param {number} month
             *        The month. Zero-based, so January is 0.
             *
             * @param {number} [date=1]
             *        The day of the month
             *
             * @param {number} [hours=0]
             *        The hour of the day, 0-23.
             *
             * @param {number} [minutes=0]
             *        The minutes
             *
             * @param {number} [seconds=0]
             *        The seconds
             *
             * @return {number}
             *         The time in milliseconds since January 1st 1970.
             */
            Time.prototype.makeTime = function (year, month, date, hours, minutes, seconds) {
                var d, offset, newOffset;
                if (this.useUTC) {
                    d = this.Date.UTC.apply(0, arguments);
                    offset = this.getTimezoneOffset(d);
                    d += offset;
                    newOffset = this.getTimezoneOffset(d);
                    if (offset !== newOffset) {
                        d += newOffset - offset;
                        // A special case for transitioning from summer time to winter time.
                        // When the clock is set back, the same time is repeated twice, i.e.
                        // 02:30 am is repeated since the clock is set back from 3 am to
                        // 2 am. We need to make the same time as local Date does.
                    }
                    else if (offset - 36e5 === this.getTimezoneOffset(d - 36e5) &&
                        !hasOldSafariBug) {
                        d -= 36e5;
                    }
                }
                else {
                    d = new this.Date(year, month, pick(date, 1), pick(hours, 0), pick(minutes, 0), pick(seconds, 0)).getTime();
                }
                return d;
            };
            /**
             * Sets the getTimezoneOffset function. If the `timezone` option is set, a
             * default getTimezoneOffset function with that timezone is returned. If
             * a `getTimezoneOffset` option is defined, it is returned. If neither are
             * specified, the function using the `timezoneOffset` option or 0 offset is
             * returned.
             *
             * @private
             * @function Highcharts.Time#timezoneOffsetFunction
             *
             * @return {Function}
             *         A getTimezoneOffset function
             */
            Time.prototype.timezoneOffsetFunction = function () {
                var time = this, options = this.options, getTimezoneOffset = options.getTimezoneOffset, moment = options.moment || win.moment;
                if (!this.useUTC) {
                    return function (timestamp) {
                        return new Date(timestamp.toString()).getTimezoneOffset() * 60000;
                    };
                }
                if (options.timezone) {
                    if (!moment) {
                        // getTimezoneOffset-function stays undefined because it depends
                        // on Moment.js
                        error(25);
                    }
                    else {
                        return function (timestamp) {
                            return -moment.tz(timestamp, options.timezone).utcOffset() * 60000;
                        };
                    }
                }
                // If not timezone is set, look for the getTimezoneOffset callback
                if (this.useUTC && getTimezoneOffset) {
                    return function (timestamp) {
                        return getTimezoneOffset(timestamp.valueOf()) * 60000;
                    };
                }
                // Last, use the `timezoneOffset` option if set
                return function () {
                    return (time.timezoneOffset || 0) * 60000;
                };
            };
            /**
             * Formats a JavaScript date timestamp (milliseconds since Jan 1st 1970)
             * into a human readable date string. The available format keys are listed
             * below. Additional formats can be given in the
             * {@link Highcharts.dateFormats} hook.
             *
             * Supported format keys:
             * - `%a`: Short weekday, like 'Mon'
             * - `%A`: Long weekday, like 'Monday'
             * - `%d`: Two digit day of the month, 01 to 31
             * - `%e`: Day of the month, 1 through 31
             * - `%w`: Day of the week, 0 through 6
             * - `%b`: Short month, like 'Jan'
             * - `%B`: Long month, like 'January'
             * - `%m`: Two digit month number, 01 through 12
             * - `%y`: Two digits year, like 09 for 2009
             * - `%Y`: Four digits year, like 2009
             * - `%H`: Two digits hours in 24h format, 00 through 23
             * - `%k`: Hours in 24h format, 0 through 23
             * - `%I`: Two digits hours in 12h format, 00 through 11
             * - `%l`: Hours in 12h format, 1 through 12
             * - `%M`: Two digits minutes, 00 through 59
             * - `%p`: Upper case AM or PM
             * - `%P`: Lower case AM or PM
             * - `%S`: Two digits seconds, 00 through 59
             * - `%L`: Milliseconds (naming from Ruby)
             *
             * @example
             * const time = new Highcharts.Time();
             * const s = time.dateFormat('%Y-%m-%d %H:%M:%S', Date.UTC(2020, 0, 1));
             * console.log(s); // => 2020-01-01 00:00:00
             *
             * @function Highcharts.Time#dateFormat
             *
             * @param {string} format
             *        The desired format where various time representations are
             *        prefixed with %.
             *
             * @param {number} [timestamp]
             *        The JavaScript timestamp.
             *
             * @param {boolean} [capitalize=false]
             *        Upper case first letter in the return.
             *
             * @return {string}
             *         The formatted date.
             */
            Time.prototype.dateFormat = function (format, timestamp, capitalize) {
                if (!defined(timestamp) || isNaN(timestamp)) {
                    return (H.defaultOptions.lang &&
                        H.defaultOptions.lang.invalidDate ||
                        '');
                }
                format = pick(format, '%Y-%m-%d %H:%M:%S');
                var time = this, date = new this.Date(timestamp), 
                // get the basic time values
                hours = this.get('Hours', date), day = this.get('Day', date), dayOfMonth = this.get('Date', date), month = this.get('Month', date), fullYear = this.get('FullYear', date), lang = H.defaultOptions.lang, langWeekdays = (lang && lang.weekdays), shortWeekdays = (lang && lang.shortWeekdays), 
                // List all format keys. Custom formats can be added from the
                // outside.
                replacements = extend({
                    // Day
                    // Short weekday, like 'Mon'
                    a: shortWeekdays ?
                        shortWeekdays[day] :
                        langWeekdays[day].substr(0, 3),
                    // Long weekday, like 'Monday'
                    A: langWeekdays[day],
                    // Two digit day of the month, 01 to 31
                    d: pad(dayOfMonth),
                    // Day of the month, 1 through 31
                    e: pad(dayOfMonth, 2, ' '),
                    // Day of the week, 0 through 6
                    w: day,
                    // Week (none implemented)
                    // 'W': weekNumber(),
                    // Month
                    // Short month, like 'Jan'
                    b: lang.shortMonths[month],
                    // Long month, like 'January'
                    B: lang.months[month],
                    // Two digit month number, 01 through 12
                    m: pad(month + 1),
                    // Month number, 1 through 12 (#8150)
                    o: month + 1,
                    // Year
                    // Two digits year, like 09 for 2009
                    y: fullYear.toString().substr(2, 2),
                    // Four digits year, like 2009
                    Y: fullYear,
                    // Time
                    // Two digits hours in 24h format, 00 through 23
                    H: pad(hours),
                    // Hours in 24h format, 0 through 23
                    k: hours,
                    // Two digits hours in 12h format, 00 through 11
                    I: pad((hours % 12) || 12),
                    // Hours in 12h format, 1 through 12
                    l: (hours % 12) || 12,
                    // Two digits minutes, 00 through 59
                    M: pad(this.get('Minutes', date)),
                    // Upper case AM or PM
                    p: hours < 12 ? 'AM' : 'PM',
                    // Lower case AM or PM
                    P: hours < 12 ? 'am' : 'pm',
                    // Two digits seconds, 00 through  59
                    S: pad(date.getSeconds()),
                    // Milliseconds (naming from Ruby)
                    L: pad(Math.floor(timestamp % 1000), 3)
                }, H.dateFormats);
                // Do the replaces
                objectEach(replacements, function (val, key) {
                    // Regex would do it in one line, but this is faster
                    while (format.indexOf('%' + key) !== -1) {
                        format = format.replace('%' + key, typeof val === 'function' ? val.call(time, timestamp) : val);
                    }
                });
                // Optionally capitalize the string and return
                return capitalize ?
                    (format.substr(0, 1).toUpperCase() +
                        format.substr(1)) :
                    format;
            };
            /**
             * Resolve legacy formats of dateTimeLabelFormats (strings and arrays) into
             * an object.
             * @private
             * @param {string|Array<T>|Highcharts.Dictionary<T>} f
             * General format description
             * @return {Highcharts.Dictionary<T>}
             * The object definition
             */
            Time.prototype.resolveDTLFormat = function (f) {
                if (!isObject(f, true)) { // check for string or array
                    f = splat(f);
                    return {
                        main: f[0],
                        from: f[1],
                        to: f[2]
                    };
                }
                return f;
            };
            /**
             * Return an array with time positions distributed on round time values
             * right and right after min and max. Used in datetime axes as well as for
             * grouping data on a datetime axis.
             *
             * @function Highcharts.Time#getTimeTicks
             *
             * @param {Highcharts.TimeNormalizedObject} normalizedInterval
             *        The interval in axis values (ms) and the count
             *
             * @param {number} [min]
             *        The minimum in axis values
             *
             * @param {number} [max]
             *        The maximum in axis values
             *
             * @param {number} [startOfWeek=1]
             *
             * @return {Highcharts.AxisTickPositionsArray}
             * Time positions
             */
            Time.prototype.getTimeTicks = function (normalizedInterval, min, max, startOfWeek) {
                var time = this, Date = time.Date, tickPositions = [], higherRanks = {}, 
                // When crossing DST, use the max. Resolves #6278.
                minDate = new Date(min), interval = normalizedInterval.unitRange, count = normalizedInterval.count || 1;
                var i, minYear, // used in months and years as a basis for Date.UTC()
                variableDayLength, minDay;
                startOfWeek = pick(startOfWeek, 1);
                if (defined(min)) { // #1300
                    time.set('Milliseconds', minDate, interval >= timeUnits.second ?
                        0 : // #3935
                        count * Math.floor(time.get('Milliseconds', minDate) / count)); // #3652, #3654
                    if (interval >= timeUnits.second) { // second
                        time.set('Seconds', minDate, interval >= timeUnits.minute ?
                            0 : // #3935
                            count * Math.floor(time.get('Seconds', minDate) / count));
                    }
                    if (interval >= timeUnits.minute) { // minute
                        time.set('Minutes', minDate, interval >= timeUnits.hour ?
                            0 :
                            count * Math.floor(time.get('Minutes', minDate) / count));
                    }
                    if (interval >= timeUnits.hour) { // hour
                        time.set('Hours', minDate, interval >= timeUnits.day ?
                            0 :
                            count * Math.floor(time.get('Hours', minDate) / count));
                    }
                    if (interval >= timeUnits.day) { // day
                        time.set('Date', minDate, interval >= timeUnits.month ?
                            1 :
                            Math.max(1, count * Math.floor(time.get('Date', minDate) / count)));
                    }
                    if (interval >= timeUnits.month) { // month
                        time.set('Month', minDate, interval >= timeUnits.year ? 0 :
                            count * Math.floor(time.get('Month', minDate) / count));
                        minYear = time.get('FullYear', minDate);
                    }
                    if (interval >= timeUnits.year) { // year
                        minYear -= minYear % count;
                        time.set('FullYear', minDate, minYear);
                    }
                    // week is a special case that runs outside the hierarchy
                    if (interval === timeUnits.week) {
                        // get start of current week, independent of count
                        minDay = time.get('Day', minDate);
                        time.set('Date', minDate, (time.get('Date', minDate) -
                            minDay + startOfWeek +
                            // We don't want to skip days that are before
                            // startOfWeek (#7051)
                            (minDay < startOfWeek ? -7 : 0)));
                    }
                    // Get basics for variable time spans
                    minYear = time.get('FullYear', minDate);
                    var minMonth = time.get('Month', minDate), minDateDate = time.get('Date', minDate), minHours = time.get('Hours', minDate);
                    // Redefine min to the floored/rounded minimum time (#7432)
                    min = minDate.getTime();
                    // Handle local timezone offset
                    if ((time.variableTimezone || !time.useUTC) && defined(max)) {
                        // Detect whether we need to take the DST crossover into
                        // consideration. If we're crossing over DST, the day length may
                        // be 23h or 25h and we need to compute the exact clock time for
                        // each tick instead of just adding hours. This comes at a cost,
                        // so first we find out if it is needed (#4951).
                        variableDayLength = (
                        // Long range, assume we're crossing over.
                        max - min > 4 * timeUnits.month ||
                            // Short range, check if min and max are in different time
                            // zones.
                            time.getTimezoneOffset(min) !==
                                time.getTimezoneOffset(max));
                    }
                    // Iterate and add tick positions at appropriate values
                    var t = minDate.getTime();
                    i = 1;
                    while (t < max) {
                        tickPositions.push(t);
                        // if the interval is years, use Date.UTC to increase years
                        if (interval === timeUnits.year) {
                            t = time.makeTime(minYear + i * count, 0);
                            // if the interval is months, use Date.UTC to increase months
                        }
                        else if (interval === timeUnits.month) {
                            t = time.makeTime(minYear, minMonth + i * count);
                            // if we're using global time, the interval is not fixed as it
                            // jumps one hour at the DST crossover
                        }
                        else if (variableDayLength &&
                            (interval === timeUnits.day || interval === timeUnits.week)) {
                            t = time.makeTime(minYear, minMonth, minDateDate +
                                i * count * (interval === timeUnits.day ? 1 : 7));
                        }
                        else if (variableDayLength &&
                            interval === timeUnits.hour &&
                            count > 1) {
                            // make sure higher ranks are preserved across DST (#6797,
                            // #7621)
                            t = time.makeTime(minYear, minMonth, minDateDate, minHours + i * count);
                            // else, the interval is fixed and we use simple addition
                        }
                        else {
                            t += interval * count;
                        }
                        i++;
                    }
                    // push the last time
                    tickPositions.push(t);
                    // Handle higher ranks. Mark new days if the time is on midnight
                    // (#950, #1649, #1760, #3349). Use a reasonable dropout threshold
                    // to prevent looping over dense data grouping (#6156).
                    if (interval <= timeUnits.hour && tickPositions.length < 10000) {
                        tickPositions.forEach(function (t) {
                            if (
                            // Speed optimization, no need to run dateFormat unless
                            // we're on a full or half hour
                            t % 1800000 === 0 &&
                                // Check for local or global midnight
                                time.dateFormat('%H%M%S%L', t) === '000000000') {
                                higherRanks[t] = 'day';
                            }
                        });
                    }
                }
                // record information on the chosen unit - for dynamic label formatter
                tickPositions.info = extend(normalizedInterval, {
                    higherRanks: higherRanks,
                    totalRange: interval * count
                });
                return tickPositions;
            };
            /**
             * Get the optimal date format for a point, based on a range.
             *
             * @private
             * @function Highcharts.Time#getDateFormat
             *
             * @param {number} range
             *        The time range
             *
             * @param {number} timestamp
             *        The timestamp of the date
             *
             * @param {number} startOfWeek
             *        An integer representing the first day of the week, where 0 is
             *        Sunday.
             *
             * @param {Highcharts.Dictionary<string>} dateTimeLabelFormats
             *        A map of time units to formats.
             *
             * @return {string}
             *         The optimal date format for a point.
             */
            Time.prototype.getDateFormat = function (range, timestamp, startOfWeek, dateTimeLabelFormats) {
                var dateStr = this.dateFormat('%m-%d %H:%M:%S.%L', timestamp), blank = '01-01 00:00:00.000', strpos = {
                    millisecond: 15,
                    second: 12,
                    minute: 9,
                    hour: 6,
                    day: 3
                };
                var n = 'millisecond', 
                // for sub-millisecond data, #4223
                lastN = n;
                for (n in timeUnits) { // eslint-disable-line guard-for-in
                    // If the range is exactly one week and we're looking at a
                    // Sunday/Monday, go for the week format
                    if (range === timeUnits.week &&
                        +this.dateFormat('%w', timestamp) === startOfWeek &&
                        dateStr.substr(6) === blank.substr(6)) {
                        n = 'week';
                        break;
                    }
                    // The first format that is too great for the range
                    if (timeUnits[n] > range) {
                        n = lastN;
                        break;
                    }
                    // If the point is placed every day at 23:59, we need to show
                    // the minutes as well. #2637.
                    if (strpos[n] &&
                        dateStr.substr(strpos[n]) !== blank.substr(strpos[n])) {
                        break;
                    }
                    // Weeks are outside the hierarchy, only apply them on
                    // Mondays/Sundays like in the first condition
                    if (n !== 'week') {
                        lastN = n;
                    }
                }
                return this.resolveDTLFormat(dateTimeLabelFormats[n]).main;
            };
            return Time;
        }());
        /* *
         *
         * Default export
         *
         * */
        /* *
         *
         * API Declarations
         *
         * */
        /**
         * Normalized interval.
         *
         * @interface Highcharts.TimeNormalizedObject
         */ /**
        * The count.
        *
        * @name Highcharts.TimeNormalizedObject#count
        * @type {number|undefined}
        */ /**
        * The interval in axis values (ms).
        *
        * @name Highcharts.TimeNormalizedObject#unitRange
        * @type {number}
        */
        /**
         * Function of an additional date format specifier.
         *
         * @callback Highcharts.TimeFormatCallbackFunction
         *
         * @param {number} timestamp
         *        The time to format.
         *
         * @return {string}
         *         The formatted portion of the date.
         */
        /**
         * Time ticks.
         *
         * @interface Highcharts.AxisTickPositionsArray
         * @extends global.Array<number>
         */ /**
        * @name Highcharts.AxisTickPositionsArray#info
        * @type {Highcharts.TimeTicksInfoObject|undefined}
        */
        /**
         * A callback to return the time zone offset for a given datetime. It
         * takes the timestamp in terms of milliseconds since January 1 1970,
         * and returns the timezone offset in minutes. This provides a hook
         * for drawing time based charts in specific time zones using their
         * local DST crossover dates, with the help of external libraries.
         *
         * @callback Highcharts.TimezoneOffsetCallbackFunction
         *
         * @param {number} timestamp
         * Timestamp in terms of milliseconds since January 1 1970.
         *
         * @return {number}
         * Timezone offset in minutes.
         */
        /**
         * Allows to manually load the `moment.js` library from Highcharts options
         * instead of the `window`.
         * In case of loading the library from a `script` tag,
         * this option is not needed, it will be loaded from there by default.
         *
         * @type      {Function}
         * @since     8.2.0
         * @apioption time.moment
         */
        ''; // keeps doclets above in JS file

        return Time;
    });
    _registerModule(_modules, 'Core/Defaults.js', [_modules['Core/Chart/ChartDefaults.js'], _modules['Core/Color/Color.js'], _modules['Core/Globals.js'], _modules['Core/Color/Palettes.js'], _modules['Core/Time.js'], _modules['Core/Utilities.js']], function (ChartDefaults, Color, H, Palettes, Time, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var color = Color.parse;
        var isTouchDevice = H.isTouchDevice, svg = H.svg;
        var merge = U.merge;
        /* *
         *
         *  API Options
         *
         * */
        /**
         * Global default settings.
         *
         * @name Highcharts.defaultOptions
         * @type {Highcharts.Options}
         */ /**
        * @optionparent
        * @private
        */
        var defaultOptions = {
            /**
             * An array containing the default colors for the chart's series. When
             * all colors are used, new colors are pulled from the start again.
             *
             * Default colors can also be set on a series or series.type basis,
             * see [column.colors](#plotOptions.column.colors),
             * [pie.colors](#plotOptions.pie.colors).
             *
             * In styled mode, the colors option doesn't exist. Instead, colors
             * are defined in CSS and applied either through series or point class
             * names, or through the [chart.colorCount](#chart.colorCount) option.
             *
             * @sample {highcharts} highcharts/chart/colors/
             *         Assign a global color theme
             * @sample highcharts/members/theme-v10/
             *         Latest release styled like version 10
             *
             * @type    {Array<(Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject)>}
             * @default [
             *     "#2caffe",
             *     "#544fc5",
             *     "#00e272",
             *     "#fe6a35",
             *     "#6b8abc",
             *     "#d568fb",
             *     "#2ee0ca",
             *     "#fa4b42",
             *     "#feb56a",
             *     "#91e8e12
             * ]
             */
            colors: Palettes.colors,
            /**
             * Styled mode only. Configuration object for adding SVG definitions for
             * reusable elements. See [gradients, shadows and
             * patterns](https://www.highcharts.com/docs/chart-design-and-style/gradients-shadows-and-patterns)
             * for more information and code examples.
             *
             * @type      {*}
             * @since     5.0.0
             * @apioption defs
             */
            /**
             * @ignore-option
             */
            symbols: ['circle', 'diamond', 'square', 'triangle', 'triangle-down'],
            /**
             * The language object is global and it can't be set on each chart
             * initialization. Instead, use `Highcharts.setOptions` to set it before any
             * chart is initialized.
             *
             * ```js
             * Highcharts.setOptions({
             *     lang: {
             *         months: [
             *             'Janvier', 'Février', 'Mars', 'Avril',
             *             'Mai', 'Juin', 'Juillet', 'Août',
             *             'Septembre', 'Octobre', 'Novembre', 'Décembre'
             *         ],
             *         weekdays: [
             *             'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
             *             'Jeudi', 'Vendredi', 'Samedi'
             *         ]
             *     }
             * });
             * ```
             */
            lang: {
                /**
                 * The loading text that appears when the chart is set into the loading
                 * state following a call to `chart.showLoading`.
                 */
                loading: 'Loading...',
                /**
                 * An array containing the months names. Corresponds to the `%B` format
                 * in `Highcharts.dateFormat()`.
                 *
                 * @type    {Array<string>}
                 * @default ["January", "February", "March", "April", "May", "June",
                 *          "July", "August", "September", "October", "November",
                 *          "December"]
                 */
                months: [
                    'January', 'February', 'March', 'April', 'May', 'June', 'July',
                    'August', 'September', 'October', 'November', 'December'
                ],
                /**
                 * An array containing the months names in abbreviated form. Corresponds
                 * to the `%b` format in `Highcharts.dateFormat()`.
                 *
                 * @type    {Array<string>}
                 * @default ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                 *          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                 */
                shortMonths: [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ],
                /**
                 * An array containing the weekday names.
                 *
                 * @type    {Array<string>}
                 * @default ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                 *          "Friday", "Saturday"]
                 */
                weekdays: [
                    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                    'Thursday', 'Friday', 'Saturday'
                ],
                /**
                 * Short week days, starting Sunday. If not specified, Highcharts uses
                 * the first three letters of the `lang.weekdays` option.
                 *
                 * @sample highcharts/lang/shortweekdays/
                 *         Finnish two-letter abbreviations
                 *
                 * @type      {Array<string>}
                 * @since     4.2.4
                 * @apioption lang.shortWeekdays
                 */
                /**
                 * What to show in a date field for invalid dates. Defaults to an empty
                 * string.
                 *
                 * @type      {string}
                 * @since     4.1.8
                 * @product   highcharts highstock
                 * @apioption lang.invalidDate
                 */
                /**
                 * The title appearing on hovering the zoom in button. The text itself
                 * defaults to "+" and can be changed in the button options.
                 *
                 * @type      {string}
                 * @default   Zoom in
                 * @product   highmaps
                 * @apioption lang.zoomIn
                 */
                /**
                 * The title appearing on hovering the zoom out button. The text itself
                 * defaults to "-" and can be changed in the button options.
                 *
                 * @type      {string}
                 * @default   Zoom out
                 * @product   highmaps
                 * @apioption lang.zoomOut
                 */
                /**
                 * The default decimal point used in the `Highcharts.numberFormat`
                 * method unless otherwise specified in the function arguments.
                 *
                 * @since 1.2.2
                 */
                decimalPoint: '.',
                /**
                 * [Metric prefixes](https://en.wikipedia.org/wiki/Metric_prefix) used
                 * to shorten high numbers in axis labels. Replacing any of the
                 * positions with `null` causes the full number to be written. Setting
                 * `numericSymbols` to `null` disables shortening altogether.
                 *
                 * @sample {highcharts} highcharts/lang/numericsymbols/
                 *         Replacing the symbols with text
                 * @sample {highstock} highcharts/lang/numericsymbols/
                 *         Replacing the symbols with text
                 *
                 * @type    {Array<string>}
                 * @default ["k", "M", "G", "T", "P", "E"]
                 * @since   2.3.0
                 */
                numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
                /**
                 * The magnitude of [numericSymbols](#lang.numericSymbol) replacements.
                 * Use 10000 for Japanese, Korean and various Chinese locales, which
                 * use symbols for 10^4, 10^8 and 10^12.
                 *
                 * @sample highcharts/lang/numericsymbolmagnitude/
                 *         10000 magnitude for Japanese
                 *
                 * @type      {number}
                 * @default   1000
                 * @since     5.0.3
                 * @apioption lang.numericSymbolMagnitude
                 */
                /**
                 * The text for the label appearing when a chart is zoomed.
                 *
                 * @since 1.2.4
                 */
                resetZoom: 'Reset zoom',
                /**
                 * The tooltip title for the label appearing when a chart is zoomed.
                 *
                 * @since 1.2.4
                 */
                resetZoomTitle: 'Reset zoom level 1:1',
                /**
                 * The default thousands separator used in the `Highcharts.numberFormat`
                 * method unless otherwise specified in the function arguments. Defaults
                 * to a single space character, which is recommended in
                 * [ISO 31-0](https://en.wikipedia.org/wiki/ISO_31-0#Numbers) and works
                 * across Anglo-American and continental European languages.
                 *
                 * @default \u0020
                 * @since   1.2.2
                 */
                thousandsSep: ' '
            },
            /**
             * Global options that don't apply to each chart. These options, like
             * the `lang` options, must be set using the `Highcharts.setOptions`
             * method.
             *
             * ```js
             * Highcharts.setOptions({
             *     global: {
             *         useUTC: false
             *     }
             * });
             * ```
             */
            /**
             * _Canvg rendering for Android 2.x is removed as of Highcharts 5.0\.
             * Use the [libURL](#exporting.libURL) option to configure exporting._
             *
             * The URL to the additional file to lazy load for Android 2.x devices.
             * These devices don't support SVG, so we download a helper file that
             * contains [canvg](https://github.com/canvg/canvg), its dependency
             * rbcolor, and our own CanVG Renderer class. To avoid hotlinking to
             * our site, you can install canvas-tools.js on your own server and
             * change this option accordingly.
             *
             * @deprecated
             *
             * @type      {string}
             * @default   https://code.highcharts.com/{version}/modules/canvas-tools.js
             * @product   highcharts highmaps
             * @apioption global.canvasToolsURL
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.useUTC](#time.useUTC) that supports individual time settings
             * per chart.
             *
             * @deprecated
             *
             * @type      {boolean}
             * @apioption global.useUTC
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.Date](#time.Date) that supports individual time settings
             * per chart.
             *
             * @deprecated
             *
             * @type      {Function}
             * @product   highcharts highstock
             * @apioption global.Date
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.getTimezoneOffset](#time.getTimezoneOffset) that supports
             * individual time settings per chart.
             *
             * @deprecated
             *
             * @type      {Function}
             * @product   highcharts highstock
             * @apioption global.getTimezoneOffset
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.timezone](#time.timezone) that supports individual time
             * settings per chart.
             *
             * @deprecated
             *
             * @type      {string}
             * @product   highcharts highstock
             * @apioption global.timezone
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.timezoneOffset](#time.timezoneOffset) that supports individual
             * time settings per chart.
             *
             * @deprecated
             *
             * @type      {number}
             * @product   highcharts highstock
             * @apioption global.timezoneOffset
             */
            global: {},
            /**
             * Time options that can apply globally or to individual charts. These
             * settings affect how `datetime` axes are laid out, how tooltips are
             * formatted, how series
             * [pointIntervalUnit](#plotOptions.series.pointIntervalUnit) works and how
             * the Highcharts Stock range selector handles time.
             *
             * The common use case is that all charts in the same Highcharts object
             * share the same time settings, in which case the global settings are set
             * using `setOptions`.
             *
             * ```js
             * // Apply time settings globally
             * Highcharts.setOptions({
             *     time: {
             *         timezone: 'Europe/London'
             *     }
             * });
             * // Apply time settings by instance
             * let chart = Highcharts.chart('container', {
             *     time: {
             *         timezone: 'America/New_York'
             *     },
             *     series: [{
             *         data: [1, 4, 3, 5]
             *     }]
             * });
             *
             * // Use the Time object
             * console.log(
             *        'Current time in New York',
             *        chart.time.dateFormat('%Y-%m-%d %H:%M:%S', Date.now())
             * );
             * ```
             *
             * Since v6.0.5, the time options were moved from the `global` obect to the
             * `time` object, and time options can be set on each individual chart.
             *
             * @sample {highcharts|highstock}
             *         highcharts/time/timezone/
             *         Set the timezone globally
             * @sample {highcharts}
             *         highcharts/time/individual/
             *         Set the timezone per chart instance
             * @sample {highstock}
             *         stock/time/individual/
             *         Set the timezone per chart instance
             *
             * @since     6.0.5
             * @optionparent time
             */
            time: {
                /**
                 * A custom `Date` class for advanced date handling. For example,
                 * [JDate](https://github.com/tahajahangir/jdate) can be hooked in to
                 * handle Jalali dates.
                 *
                 * @type      {*}
                 * @since     4.0.4
                 * @product   highcharts highstock gantt
                 */
                Date: void 0,
                /**
                 * A callback to return the time zone offset for a given datetime. It
                 * takes the timestamp in terms of milliseconds since January 1 1970,
                 * and returns the timezone offset in minutes. This provides a hook
                 * for drawing time based charts in specific time zones using their
                 * local DST crossover dates, with the help of external libraries.
                 *
                 * @see [global.timezoneOffset](#global.timezoneOffset)
                 *
                 * @sample {highcharts|highstock} highcharts/time/gettimezoneoffset/
                 *         Use moment.js to draw Oslo time regardless of browser locale
                 *
                 * @type      {Highcharts.TimezoneOffsetCallbackFunction}
                 * @since     4.1.0
                 * @product   highcharts highstock gantt
                 */
                getTimezoneOffset: void 0,
                /**
                 * Requires [moment.js](https://momentjs.com/). If the timezone option
                 * is specified, it creates a default
                 * [getTimezoneOffset](#time.getTimezoneOffset) function that looks
                 * up the specified timezone in moment.js. If moment.js is not included,
                 * this throws a Highcharts error in the console, but does not crash the
                 * chart.
                 *
                 * @see [getTimezoneOffset](#time.getTimezoneOffset)
                 *
                 * @sample {highcharts|highstock} highcharts/time/timezone/
                 *         Europe/Oslo
                 *
                 * @type      {string}
                 * @since     5.0.7
                 * @product   highcharts highstock gantt
                 */
                timezone: void 0,
                /**
                 * The timezone offset in minutes. Positive values are west, negative
                 * values are east of UTC, as in the ECMAScript
                 * [getTimezoneOffset](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)
                 * method. Use this to display UTC based data in a predefined time zone.
                 *
                 * @see [time.getTimezoneOffset](#time.getTimezoneOffset)
                 *
                 * @sample {highcharts|highstock} highcharts/time/timezoneoffset/
                 *         Timezone offset
                 *
                 * @since     3.0.8
                 * @product   highcharts highstock gantt
                 */
                timezoneOffset: 0,
                /**
                 * Whether to use UTC time for axis scaling, tickmark placement and
                 * time display in `Highcharts.dateFormat`. Advantages of using UTC
                 * is that the time displays equally regardless of the user agent's
                 * time zone settings. Local time can be used when the data is loaded
                 * in real time or when correct Daylight Saving Time transitions are
                 * required.
                 *
                 * @sample {highcharts} highcharts/time/useutc-true/
                 *         True by default
                 * @sample {highcharts} highcharts/time/useutc-false/
                 *         False
                 */
                useUTC: true
            },
            chart: ChartDefaults,
            /**
             * The chart's main title.
             *
             * @sample {highmaps} maps/title/title/
             *         Title options demonstrated
             */
            title: {
                /**
                 * When the title is floating, the plot area will not move to make space
                 * for it.
                 *
                 * @sample {highcharts} highcharts/chart/zoomtype-none/
                 *         False by default
                 * @sample {highcharts} highcharts/title/floating/
                 *         True - title on top of the plot area
                 * @sample {highstock} stock/chart/title-floating/
                 *         True - title on top of the plot area
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @apioption title.floating
                 */
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the text.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption title.useHTML
                 */
                /**
                 * The vertical alignment of the title. Can be one of `"top"`,
                 * `"middle"` and `"bottom"`. When a value is given, the title behaves
                 * as if [floating](#title.floating) were `true`.
                 *
                 * @sample {highcharts} highcharts/title/verticalalign/
                 *         Chart title in bottom right corner
                 * @sample {highstock} stock/chart/title-verticalalign/
                 *         Chart title in bottom right corner
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 * @since     2.1
                 * @apioption title.verticalAlign
                 */
                /**
                 * The x position of the title relative to the alignment within
                 * `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @sample {highcharts} highcharts/title/align/
                 *         Aligned to the plot area (x = 70px = margin left - spacing
                 *         left)
                 * @sample {highstock} stock/chart/title-align/
                 *         Aligned to the plot area (x = 50px = margin left - spacing
                 *         left)
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.0
                 * @apioption title.x
                 */
                /**
                 * The y position of the title relative to the alignment within
                 * [chart.spacingTop](#chart.spacingTop) and [chart.spacingBottom](
                 * #chart.spacingBottom). By default it depends on the font size.
                 *
                 * @sample {highcharts} highcharts/title/y/
                 *         Title inside the plot area
                 * @sample {highstock} stock/chart/title-verticalalign/
                 *         Chart title in bottom right corner
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption title.y
                 */
                /**
                 * CSS styles for the title. Use this for font styling, but use `align`,
                 * `x` and `y` for text alignment.
                 *
                 * In styled mode, the title style is given in the `.highcharts-title`
                 * class.
                 *
                 * @sample {highcharts} highcharts/title/style/
                 *         Custom color and weight
                 * @sample {highstock} stock/chart/title-style/
                 *         Custom color and weight
                 * @sample highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {highcharts|highmaps} { "color": "#333333", "fontSize": "18px" }
                 * @default   {highstock} { "color": "#333333", "fontSize": "16px" }
                 */
                style: {
                    color: "#333333" /* Palette.neutralColor80 */,
                    fontWeight: 'bold'
                },
                /**
                 * The title of the chart. To disable the title, set the `text` to
                 * `undefined`.
                 *
                 * @sample {highcharts} highcharts/title/text/
                 *         Custom title
                 * @sample {highstock} stock/chart/title-text/
                 *         Custom title
                 *
                 * @default {highcharts|highmaps} Chart title
                 * @default {highstock} undefined
                 */
                text: 'Chart title',
                /**
                 * The horizontal alignment of the title. Can be one of "left", "center"
                 * and "right".
                 *
                 * @sample {highcharts} highcharts/title/align/
                 *         Aligned to the plot area (x = 70px = margin left - spacing
                 *         left)
                 * @sample {highstock} stock/chart/title-align/
                 *         Aligned to the plot area (x = 50px = margin left - spacing
                 *         left)
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 2.0
                 */
                align: 'center',
                /**
                 * The margin between the title and the plot area, or if a subtitle
                 * is present, the margin between the subtitle and the plot area.
                 *
                 * @sample {highcharts} highcharts/title/margin-50/
                 *         A chart title margin of 50
                 * @sample {highcharts} highcharts/title/margin-subtitle/
                 *         The same margin applied with a subtitle
                 * @sample {highstock} stock/chart/title-margin/
                 *         A chart title margin of 50
                 *
                 * @since 2.1
                 */
                margin: 15,
                /**
                 * Adjustment made to the title width, normally to reserve space for
                 * the exporting burger menu.
                 *
                 * @sample highcharts/title/widthadjust/
                 *         Wider menu, greater padding
                 *
                 * @since 4.2.5
                 */
                widthAdjust: -44
            },
            /**
             * The chart's subtitle. This can be used both to display a subtitle below
             * the main title, and to display random text anywhere in the chart. The
             * subtitle can be updated after chart initialization through the
             * `Chart.setTitle` method.
             *
             * @sample {highmaps} maps/title/subtitle/
             *         Subtitle options demonstrated
             */
            subtitle: {
                /**
                 * When the subtitle is floating, the plot area will not move to make
                 * space for it.
                 *
                 * @sample {highcharts} highcharts/subtitle/floating/
                 *         Floating title and subtitle
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote floating at bottom right of plot area
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @apioption subtitle.floating
                 */
                /**
                 * CSS styles for the title.
                 *
                 * In styled mode, the subtitle style is given in the
                 * `.highcharts-subtitle` class.
                 *
                 * @sample {highcharts} highcharts/subtitle/style/
                 *         Custom color and weight
                 * @sample {highcharts} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highstock} stock/chart/subtitle-style
                 *         Custom color and weight
                 * @sample {highstock} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highmaps} highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"color": "#666666"}
                 * @apioption subtitle.style
                 */
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the text.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption subtitle.useHTML
                 */
                /**
                 * The vertical alignment of the title. Can be one of `"top"`,
                 * `"middle"` and `"bottom"`. When middle, the subtitle behaves as
                 * floating.
                 *
                 * @sample {highcharts} highcharts/subtitle/verticalalign/
                 *         Footnote at the bottom right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at the bottom right of plot area
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 * @since     2.1
                 * @apioption subtitle.verticalAlign
                 */
                /**
                 * The x position of the subtitle relative to the alignment within
                 * `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @sample {highcharts} highcharts/subtitle/align/
                 *         Footnote at right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at the bottom right of plot area
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.0
                 * @apioption subtitle.x
                 */
                /**
                 * The y position of the subtitle relative to the alignment within
                 * `chart.spacingTop` and `chart.spacingBottom`. By default the subtitle
                 * is laid out below the title unless the title is floating.
                 *
                 * @sample {highcharts} highcharts/subtitle/verticalalign/
                 *         Footnote at the bottom right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at the bottom right of plot area
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption subtitle.y
                 */
                /**
                 * CSS styles for the title.
                 *
                 * In styled mode, the subtitle style is given in the
                 * `.highcharts-subtitle` class.
                 *
                 * @sample {highcharts} highcharts/subtitle/style/
                 *         Custom color and weight
                 * @sample {highcharts} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highstock} stock/chart/subtitle-style
                 *         Custom color and weight
                 * @sample {highstock} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highmaps} highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"color": "#666666"}
                 */
                style: {
                    color: "#666666" /* Palette.neutralColor60 */,
                    fontSize: '0.8em'
                },
                /**
                 * The subtitle of the chart.
                 *
                 * @sample {highcharts|highstock} highcharts/subtitle/text/
                 *         Custom subtitle
                 * @sample {highcharts|highstock} highcharts/subtitle/text-formatted/
                 *         Formatted and linked text.
                 */
                text: '',
                /**
                 * The horizontal alignment of the subtitle. Can be one of "left",
                 *  "center" and "right".
                 *
                 * @sample {highcharts} highcharts/subtitle/align/
                 *         Footnote at right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at bottom right of plot area
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 2.0
                 */
                align: 'center',
                /**
                 * Adjustment made to the subtitle width, normally to reserve space
                 * for the exporting burger menu.
                 *
                 * @see [title.widthAdjust](#title.widthAdjust)
                 *
                 * @sample highcharts/title/widthadjust/
                 *         Wider menu, greater padding
                 *
                 * @since 4.2.5
                 */
                widthAdjust: -44
            },
            /**
             * The chart's caption, which will render below the chart and will be part
             * of exported charts. The caption can be updated after chart initialization
             * through the `Chart.update` or `Chart.caption.update` methods.
             *
             * @sample highcharts/caption/text/
             *         A chart with a caption
             * @since  7.2.0
             */
            caption: {
                /**
                 * When the caption is floating, the plot area will not move to make
                 * space for it.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption caption.floating
                 */
                /**
                 * The margin between the caption and the plot area.
                 */
                margin: 15,
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the text.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption caption.useHTML
                 */
                /**
                 * The x position of the caption relative to the alignment within
                 * `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption caption.x
                 */
                /**
                 * The y position of the caption relative to the alignment within
                 * `chart.spacingTop` and `chart.spacingBottom`.
                 *
                 * @type      {number}
                 * @apioption caption.y
                 */
                /**
                 * CSS styles for the caption.
                 *
                 * In styled mode, the caption style is given in the
                 * `.highcharts-caption` class.
                 *
                 * @sample {highcharts} highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"color": "#666666"}
                 */
                style: {
                    color: "#666666" /* Palette.neutralColor60 */,
                    fontSize: '0.8em'
                },
                /**
                 * The caption text of the chart.
                 *
                 * @sample {highcharts} highcharts/caption/text/
                 *         Custom caption
                 */
                text: '',
                /**
                 * The horizontal alignment of the caption. Can be one of "left",
                 *  "center" and "right".
                 *
                 * @type  {Highcharts.AlignValue}
                 */
                align: 'left',
                /**
                 * The vertical alignment of the caption. Can be one of `"top"`,
                 * `"middle"` and `"bottom"`. When middle, the caption behaves as
                 * floating.
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 */
                verticalAlign: 'bottom'
            },
            /**
             * The plotOptions is a wrapper object for config objects for each series
             * type. The config objects for each series can also be overridden for
             * each series item as given in the series array.
             *
             * Configuration options for the series are given in three levels. Options
             * for all series in a chart are given in the [plotOptions.series](
             * #plotOptions.series) object. Then options for all series of a specific
             * type are given in the plotOptions of that type, for example
             * `plotOptions.line`. Next, options for one single series are given in
             * [the series array](#series).
             */
            plotOptions: {},
            /**
             * The legend is a box containing a symbol and name for each series
             * item or point item in the chart. Each series (or points in case
             * of pie charts) is represented by a symbol and its name in the legend.
             *
             * It is possible to override the symbol creator function and create
             * [custom legend symbols](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/studies/legend-custom-symbol/).
             *
             * @productdesc {highmaps}
             * A Highmaps legend by default contains one legend item per series, but if
             * a `colorAxis` is defined, the axis will be displayed in the legend.
             * Either as a gradient, or as multiple legend items for `dataClasses`.
             */
            legend: {
                /**
                 * The background color of the legend.
                 *
                 * @see In styled mode, the legend background fill can be applied with
                 *      the `.highcharts-legend-box` class.
                 *
                 * @sample {highcharts} highcharts/legend/backgroundcolor/
                 *         Yellowish background
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption legend.backgroundColor
                 */
                /**
                 * The width of the drawn border around the legend.
                 *
                 * @see In styled mode, the legend border stroke width can be applied
                 *      with the `.highcharts-legend-box` class.
                 *
                 * @sample {highcharts} highcharts/legend/borderwidth/
                 *         2px border width
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption legend.borderWidth
                 */
                /**
                 * Enable or disable the legend. There is also a series-specific option,
                 * [showInLegend](#plotOptions.series.showInLegend), that can hide the
                 * series from the legend. In some series types this is `false` by
                 * default, so it must set to `true` in order to show the legend for the
                 * series.
                 *
                 * @sample {highcharts} highcharts/legend/enabled-false/ Legend disabled
                 * @sample {highstock} stock/legend/align/ Various legend options
                 * @sample {highmaps} maps/legend/enabled-false/ Legend disabled
                 *
                 * @default {highstock} false
                 * @default {highmaps} true
                 * @default {gantt} false
                 */
                enabled: true,
                /**
                 * The horizontal alignment of the legend box within the chart area.
                 * Valid values are `left`, `center` and `right`.
                 *
                 * In the case that the legend is aligned in a corner position, the
                 * `layout` option will determine whether to place it above/below
                 * or on the side of the plot area.
                 *
                 * @sample {highcharts} highcharts/legend/align/
                 *         Legend at the right of the chart
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend alignment
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 2.0
                 */
                align: 'center',
                /**
                 * If the [layout](legend.layout) is `horizontal` and the legend items
                 * span over two lines or more, whether to align the items into vertical
                 * columns. Setting this to `false` makes room for more items, but will
                 * look more messy.
                 *
                 * @since 6.1.0
                 */
                alignColumns: true,
                /**
                 * A CSS class name to apply to the legend group.
                 */
                className: 'highcharts-no-tooltip',
                /**
                 * When the legend is floating, the plot area ignores it and is allowed
                 * to be placed below it.
                 *
                 * @sample {highcharts} highcharts/legend/floating-false/
                 *         False by default
                 * @sample {highcharts} highcharts/legend/floating-true/
                 *         True
                 * @sample {highmaps} maps/legend/alignment/
                 *         Floating legend
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @apioption legend.floating
                 */
                /**
                 * The layout of the legend items. Can be one of `horizontal` or
                 * `vertical` or `proximate`. When `proximate`, the legend items will be
                 * placed as close as possible to the graphs they're representing,
                 * except in inverted charts or when the legend position doesn't allow
                 * it.
                 *
                 * @sample {highcharts} highcharts/legend/layout-horizontal/
                 *         Horizontal by default
                 * @sample {highcharts} highcharts/legend/layout-vertical/
                 *         Vertical
                 * @sample highcharts/legend/layout-proximate
                 *         Labels proximate to the data
                 * @sample {highstock} stock/legend/layout-horizontal/
                 *         Horizontal by default
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Vertical with data classes
                 * @sample {highmaps} maps/legend/layout-vertical/
                 *         Vertical with color axis gradient
                 *
                 * @validvalue ["horizontal", "vertical", "proximate"]
                 */
                layout: 'horizontal',
                /**
                 * In a legend with horizontal layout, the itemDistance defines the
                 * pixel distance between each item.
                 *
                 * @sample {highcharts} highcharts/legend/layout-horizontal/
                 *         50px item distance
                 * @sample {highstock} highcharts/legend/layout-horizontal/
                 *         50px item distance
                 *
                 * @type      {number}
                 * @default   {highcharts} 20
                 * @default   {highstock} 20
                 * @default   {highmaps} 8
                 * @since     3.0.3
                 * @apioption legend.itemDistance
                 */
                /**
                 * The pixel bottom margin for each legend item.
                 *
                 * @sample {highcharts|highstock} highcharts/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 *
                 * @since     2.2.0
                 */
                itemMarginBottom: 2,
                /**
                 * The pixel top margin for each legend item.
                 *
                 * @sample {highcharts|highstock} highcharts/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 *
                 * @since     2.2.0
                 */
                itemMarginTop: 2,
                /**
                 * The width for each legend item. By default the items are laid out
                 * successively. In a [horizontal layout](legend.layout), if the items
                 * are laid out across two rows or more, they will be vertically aligned
                 * depending on the [legend.alignColumns](legend.alignColumns) option.
                 *
                 * @sample {highcharts} highcharts/legend/itemwidth-default/
                 *         Undefined by default
                 * @sample {highcharts} highcharts/legend/itemwidth-80/
                 *         80 for aligned legend items
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption legend.itemWidth
                 */
                /**
                 * A [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                 * for each legend label. Available variables relates to properties on
                 * the series, or the point in case of pies.
                 *
                 * @type      {string}
                 * @default   {name}
                 * @since     1.3
                 * @apioption legend.labelFormat
                 */
                /* eslint-disable valid-jsdoc */
                /**
                 * Callback function to format each of the series' labels. The `this`
                 * keyword refers to the series object, or the point object in case of
                 * pie charts. By default the series or point name is printed.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps the context can also be a data class in case of a
                 * `colorAxis`.
                 *
                 * @sample {highcharts} highcharts/legend/labelformatter/
                 *         Add text
                 * @sample {highmaps} maps/legend/labelformatter/
                 *         Data classes with label formatter
                 *
                 * @type {Highcharts.FormatterCallbackFunction<Point|Series>}
                 */
                labelFormatter: function () {
                    /** eslint-enable valid-jsdoc */
                    return this.name;
                },
                /**
                 * Line height for the legend items. Deprecated as of 2.1\. Instead,
                 * the line height for each item can be set using
                 * `itemStyle.lineHeight`, and the padding between items using
                 * `itemMarginTop` and `itemMarginBottom`.
                 *
                 * @sample {highcharts} highcharts/legend/lineheight/
                 *         Setting padding
                 *
                 * @deprecated
                 *
                 * @type      {number}
                 * @default   16
                 * @since     2.0
                 * @product   highcharts gantt
                 * @apioption legend.lineHeight
                 */
                /**
                 * If the plot area sized is calculated automatically and the legend is
                 * not floating, the legend margin is the space between the legend and
                 * the axis labels or plot area.
                 *
                 * @sample {highcharts} highcharts/legend/margin-default/
                 *         12 pixels by default
                 * @sample {highcharts} highcharts/legend/margin-30/
                 *         30 pixels
                 *
                 * @type      {number}
                 * @default   12
                 * @since     2.1
                 * @apioption legend.margin
                 */
                /**
                 * Maximum pixel height for the legend. When the maximum height is
                 * extended, navigation will show.
                 *
                 * @type      {number}
                 * @since     2.3.0
                 * @apioption legend.maxHeight
                 */
                /**
                 * The color of the drawn border around the legend.
                 *
                 * @see In styled mode, the legend border stroke can be applied with the
                 *      `.highcharts-legend-box` class.
                 *
                 * @sample {highcharts} highcharts/legend/bordercolor/
                 *         Brown border
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                borderColor: "#999999" /* Palette.neutralColor40 */,
                /**
                 * The border corner radius of the legend.
                 *
                 * @sample {highcharts} highcharts/legend/borderradius-default/
                 *         Square by default
                 * @sample {highcharts} highcharts/legend/borderradius-round/
                 *         5px rounded
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 */
                borderRadius: 0,
                /**
                 * Options for the paging or navigation appearing when the legend is
                 * overflown. Navigation works well on screen, but not in static
                 * exported images. One way of working around that is to
                 * [increase the chart height in
                 * export](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/legend/navigation-enabled-false/).
                 */
                navigation: {
                    /**
                     * How to animate the pages when navigating up or down. A value of
                     * `true` applies the default navigation given in the
                     * `chart.animation` option. Additional options can be given as an
                     * object containing values for easing and duration.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type      {boolean|Partial<Highcharts.AnimationOptionsObject>}
                     * @default   true
                     * @since     2.2.4
                     * @apioption legend.navigation.animation
                     */
                    /**
                     * The pixel size of the up and down arrows in the legend paging
                     * navigation.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type      {number}
                     * @default   12
                     * @since     2.2.4
                     * @apioption legend.navigation.arrowSize
                     */
                    /**
                     * Whether to enable the legend navigation. In most cases, disabling
                     * the navigation results in an unwanted overflow.
                     *
                     * See also the
                     * [adapt chart to legend](https://github.com/highcharts/adapt-chart-to-legend)
                     * plugin for a solution to extend the chart height to make room for
                     * the legend, optionally in exported charts only.
                     *
                     * @type      {boolean}
                     * @default   true
                     * @since     4.2.4
                     * @apioption legend.navigation.enabled
                     */
                    /**
                     * Text styles for the legend page navigation.
                     *
                     * @see In styled mode, the navigation items are styled with the
                     *      `.highcharts-legend-navigation` class.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type      {Highcharts.CSSObject}
                     * @since     2.2.4
                     * @apioption legend.navigation.style
                     */
                    style: {
                        fontSize: '0.8em'
                    },
                    /**
                     * The color for the active up or down arrow in the legend page
                     * navigation.
                     *
                     * @see In styled mode, the active arrow be styled with the
                     *      `.highcharts-legend-nav-active` class.
                     *
                     * @sample  {highcharts} highcharts/legend/navigation/
                     *          Legend page navigation demonstrated
                     * @sample  {highstock} highcharts/legend/navigation/
                     *          Legend page navigation demonstrated
                     *
                     * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @since 2.2.4
                     */
                    activeColor: "#0022ff" /* Palette.highlightColor100 */,
                    /**
                     * The color of the inactive up or down arrow in the legend page
                     * navigation. .
                     *
                     * @see In styled mode, the inactive arrow be styled with the
                     *      `.highcharts-legend-nav-inactive` class.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @since 2.2.4
                     */
                    inactiveColor: "#cccccc" /* Palette.neutralColor20 */
                },
                /**
                 * The inner padding of the legend box.
                 *
                 * @sample {highcharts|highstock} highcharts/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 *
                 * @type      {number}
                 * @default   8
                 * @since     2.2.0
                 * @apioption legend.padding
                 */
                /**
                 * Whether to reverse the order of the legend items compared to the
                 * order of the series or points as defined in the configuration object.
                 *
                 * @see [yAxis.reversedStacks](#yAxis.reversedStacks),
                 *      [series.legendIndex](#series.legendIndex)
                 *
                 * @sample {highcharts} highcharts/legend/reversed/
                 *         Stacked bar with reversed legend
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     1.2.5
                 * @apioption legend.reversed
                 */
                /**
                 * Whether to show the symbol on the right side of the text rather than
                 * the left side. This is common in Arabic and Hebrew.
                 *
                 * @sample {highcharts} highcharts/legend/rtl/
                 *         Symbol to the right
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.2
                 * @apioption legend.rtl
                 */
                /**
                 * CSS styles for the legend area. In the 1.x versions the position
                 * of the legend area was determined by CSS. In 2.x, the position is
                 * determined by properties like `align`, `verticalAlign`, `x` and `y`,
                 * but the styles are still parsed for backwards compatibility.
                 *
                 * @deprecated
                 *
                 * @type      {Highcharts.CSSObject}
                 * @product   highcharts highstock
                 * @apioption legend.style
                 */
                /**
                 * CSS styles for each legend item. Only a subset of CSS is supported,
                 * notably those options related to text. The default `textOverflow`
                 * property makes long texts truncate. Set it to `undefined` to wrap
                 * text instead. A `width` property can be added to control the text
                 * width.
                 *
                 * @see In styled mode, the legend items can be styled with the
                 *      `.highcharts-legend-item` class.
                 *
                 * @sample {highcharts} highcharts/legend/itemstyle/
                 *         Bold black text
                 * @sample {highmaps} maps/legend/itemstyle/
                 *         Item text styles
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#333333", "cursor": "pointer", "fontSize": "0.75em", "fontWeight": "bold", "textOverflow": "ellipsis"}
                 */
                itemStyle: {
                    /**
                     * @ignore
                     */
                    color: "#333333" /* Palette.neutralColor80 */,
                    /**
                     * @ignore
                     */
                    cursor: 'pointer',
                    /**
                     * @ignore
                     */
                    fontSize: '0.8em',
                    /**
                     * @ignore
                     */
                    textDecoration: 'none',
                    /**
                     * @ignore
                     */
                    textOverflow: 'ellipsis'
                },
                /**
                 * CSS styles for each legend item in hover mode. Only a subset of
                 * CSS is supported, notably those options related to text. Properties
                 * are inherited from `style` unless overridden here.
                 *
                 * @see In styled mode, the hovered legend items can be styled with
                 *      the `.highcharts-legend-item:hover` pesudo-class.
                 *
                 * @sample {highcharts} highcharts/legend/itemhoverstyle/
                 *         Red on hover
                 * @sample {highmaps} maps/legend/itemstyle/
                 *         Item text styles
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#000000"}
                 */
                itemHoverStyle: {
                    /**
                     * @ignore
                     */
                    color: "#000000" /* Palette.neutralColor100 */
                },
                /**
                 * CSS styles for each legend item when the corresponding series or
                 * point is hidden. Only a subset of CSS is supported, notably those
                 * options related to text. Properties are inherited from `style`
                 * unless overridden here.
                 *
                 * @see In styled mode, the hidden legend items can be styled with
                 *      the `.highcharts-legend-item-hidden` class.
                 *
                 * @sample {highcharts} highcharts/legend/itemhiddenstyle/
                 *         Darker gray color
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#cccccc"}
                 */
                itemHiddenStyle: {
                    /**
                     * @ignore
                     */
                    color: "#666666" /* Palette.neutralColor60 */,
                    /**
                     * @ignore
                     */
                    textDecoration: 'line-through'
                },
                /**
                 * Whether to apply a drop shadow to the legend. A `backgroundColor`
                 * also needs to be applied for this to take effect. The shadow can be
                 * an object configuration containing `color`, `offsetX`, `offsetY`,
                 * `opacity` and `width`.
                 *
                 * @sample {highcharts} highcharts/legend/shadow/
                 *         White background and drop shadow
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type {boolean|Highcharts.CSSObject}
                 */
                shadow: false,
                /**
                 * Default styling for the checkbox next to a legend item when
                 * `showCheckbox` is true.
                 *
                 * @type {Highcharts.CSSObject}
                 * @default {"width": "13px", "height": "13px", "position":"absolute"}
                 */
                itemCheckboxStyle: {
                    /**
                     * @ignore
                     */
                    position: 'absolute',
                    /**
                     * @ignore
                     */
                    width: '13px',
                    /**
                     * @ignore
                     */
                    height: '13px'
                },
                // itemWidth: undefined,
                /**
                 * When this is true, the legend symbol width will be the same as
                 * the symbol height, which in turn defaults to the font size of the
                 * legend items.
                 *
                 * @since 5.0.0
                 */
                squareSymbol: true,
                /**
                 * The pixel height of the symbol for series types that use a rectangle
                 * in the legend. Defaults to the font size of legend items.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps, when the symbol is the gradient of a vertical color
                 * axis, the height defaults to 200.
                 *
                 * @sample {highmaps} maps/legend/layout-vertical-sized/
                 *         Sized vertical gradient
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         No distance between data classes
                 *
                 * @type      {number}
                 * @since     3.0.8
                 * @apioption legend.symbolHeight
                 */
                /**
                 * The border radius of the symbol for series types that use a rectangle
                 * in the legend. Defaults to half the `symbolHeight`, effectively
                 * creating a circle.
                 *
                 * For color axis scales, it defaults to 3.
                 *
                 * @sample {highcharts} highcharts/legend/symbolradius/
                 *         Round symbols
                 * @sample {highstock} highcharts/legend/symbolradius/
                 *         Round symbols
                 * @sample {highmaps} highcharts/legend/symbolradius/
                 *         Round symbols
                 *
                 * @type      {number}
                 * @since     3.0.8
                 * @apioption legend.symbolRadius
                 */
                /**
                 * The pixel width of the legend item symbol. When the `squareSymbol`
                 * option is set, this defaults to the `symbolHeight`, otherwise 16.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps, when the symbol is the gradient of a horizontal color
                 * axis, the width defaults to 200.
                 *
                 * @sample {highcharts} highcharts/legend/symbolwidth/
                 *         Greater symbol width and padding
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/layout-vertical-sized/
                 *         Sized vertical gradient
                 *
                 * @type      {number}
                 * @apioption legend.symbolWidth
                 */
                /**
                 * Whether to [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the legend item texts.
                 *
                 * Prior to 4.1.7, when using HTML, [legend.navigation](
                 * #legend.navigation) was disabled.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption legend.useHTML
                 */
                /**
                 * For a color axis with data classes, how many decimals to render in
                 * the legend. The default preserves the decimals of the range numbers.
                 *
                 * @type      {number}
                 * @default   -1
                 * @product   highcharts highmaps
                 * @apioption legend.valueDecimals
                 */
                /**
                 * For a color axis with data classes, a suffix for the range numbers in
                 * the legend.
                 *
                 * @type      {string}
                 * @default   ''
                 * @product   highcharts highmaps
                 * @apioption legend.valueSuffix
                 */
                /**
                 * The width of the legend box. If a number is set, it translates to
                 * pixels. Since v7.0.2 it allows setting a percent string of the full
                 * chart width, for example `40%`.
                 *
                 * Defaults to the full chart width for legends below or above the
                 * chart, half the chart width for legends to the left and right.
                 *
                 * @sample {highcharts} highcharts/legend/width/
                 *         Aligned to the plot area
                 * @sample {highcharts} highcharts/legend/width-percent/
                 *         A percent of the chart width
                 *
                 * @type      {number|string}
                 * @since     2.0
                 * @apioption legend.width
                 */
                /**
                 * The pixel padding between the legend item symbol and the legend
                 * item text.
                 *
                 * @sample {highcharts} highcharts/legend/symbolpadding/
                 *         Greater symbol width and padding
                 */
                symbolPadding: 5,
                /**
                 * The vertical alignment of the legend box. Can be one of `top`,
                 * `middle` or `bottom`. Vertical position can be further determined
                 * by the `y` option.
                 *
                 * In the case that the legend is aligned in a corner position, the
                 * `layout` option will determine whether to place it above/below
                 * or on the side of the plot area.
                 *
                 * When the [layout](#legend.layout) option is `proximate`, the
                 * `verticalAlign` option doesn't apply.
                 *
                 * @sample {highcharts} highcharts/legend/verticalalign/
                 *         Legend 100px from the top of the chart
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend alignment
                 *
                 * @type  {Highcharts.VerticalAlignValue}
                 * @since 2.0
                 */
                verticalAlign: 'bottom',
                // width: undefined,
                /**
                 * The x offset of the legend relative to its horizontal alignment
                 * `align` within chart.spacingLeft and chart.spacingRight. Negative
                 * x moves it to the left, positive x moves it to the right.
                 *
                 * @sample {highcharts} highcharts/legend/width/
                 *         Aligned to the plot area
                 *
                 * @since 2.0
                 */
                x: 0,
                /**
                 * The vertical offset of the legend relative to it's vertical alignment
                 * `verticalAlign` within chart.spacingTop and chart.spacingBottom.
                 *  Negative y moves it up, positive y moves it down.
                 *
                 * @sample {highcharts} highcharts/legend/verticalalign/
                 *         Legend 100px from the top of the chart
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend alignment
                 *
                 * @since 2.0
                 */
                y: 0,
                /**
                 * A title to be added on top of the legend.
                 *
                 * @sample {highcharts} highcharts/legend/title/
                 *         Legend title
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend with title
                 *
                 * @since 3.0
                 */
                title: {
                    /**
                     * A text or HTML string for the title.
                     *
                     * @type      {string}
                     * @since     3.0
                     * @apioption legend.title.text
                     */
                    /**
                     * Generic CSS styles for the legend title.
                     *
                     * @see In styled mode, the legend title is styled with the
                     *      `.highcharts-legend-title` class.
                     *
                     * @type    {Highcharts.CSSObject}
                     * @default {"fontSize": "0.75em", "fontWeight": "bold"}
                     * @since   3.0
                     */
                    style: {
                        /**
                         * @ignore
                         */
                        fontSize: '0.8em',
                        /**
                         * @ignore
                         */
                        fontWeight: 'bold'
                    }
                }
            },
            /**
             * The loading options control the appearance of the loading screen
             * that covers the plot area on chart operations. This screen only
             * appears after an explicit call to `chart.showLoading()`. It is a
             * utility for developers to communicate to the end user that something
             * is going on, for example while retrieving new data via an XHR connection.
             * The "Loading..." text itself is not part of this configuration
             * object, but part of the `lang` object.
             */
            loading: {
                /**
                 * The duration in milliseconds of the fade out effect.
                 *
                 * @sample highcharts/loading/hideduration/
                 *         Fade in and out over a second
                 *
                 * @type      {number}
                 * @default   100
                 * @since     1.2.0
                 * @apioption loading.hideDuration
                 */
                /**
                 * The duration in milliseconds of the fade in effect.
                 *
                 * @sample highcharts/loading/hideduration/
                 *         Fade in and out over a second
                 *
                 * @type      {number}
                 * @default   100
                 * @since     1.2.0
                 * @apioption loading.showDuration
                 */
                /**
                 * CSS styles for the loading label `span`.
                 *
                 * @see In styled mode, the loading label is styled with the
                 *      `.highcharts-loading-inner` class.
                 *
                 * @sample {highcharts|highmaps} highcharts/loading/labelstyle/
                 *         Vertically centered
                 * @sample {highstock} stock/loading/general/
                 *         Label styles
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"fontWeight": "bold", "position": "relative", "top": "45%"}
                 * @since   1.2.0
                 */
                labelStyle: {
                    /**
                     * @ignore
                     */
                    fontWeight: 'bold',
                    /**
                     * @ignore
                     */
                    position: 'relative',
                    /**
                     * @ignore
                     */
                    top: '45%'
                },
                /**
                 * CSS styles for the loading screen that covers the plot area.
                 *
                 * In styled mode, the loading label is styled with the
                 * `.highcharts-loading` class.
                 *
                 * @sample  {highcharts|highmaps} highcharts/loading/style/
                 *          Gray plot area, white text
                 * @sample  {highstock} stock/loading/general/
                 *          Gray plot area, white text
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"position": "absolute", "backgroundColor": "#ffffff", "opacity": 0.5, "textAlign": "center"}
                 * @since   1.2.0
                 */
                style: {
                    /**
                     * @ignore
                     */
                    position: 'absolute',
                    /**
                     * @ignore
                     */
                    backgroundColor: "#ffffff" /* Palette.backgroundColor */,
                    /**
                     * @ignore
                     */
                    opacity: 0.5,
                    /**
                     * @ignore
                     */
                    textAlign: 'center'
                }
            },
            /**
             * Options for the tooltip that appears when the user hovers over a
             * series or point.
             *
             * @declare Highcharts.TooltipOptions
             */
            tooltip: {
                /**
                 * The color of the tooltip border. When `undefined`, the border takes
                 * the color of the corresponding series or point.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         Follow series by default
                 * @sample {highcharts} highcharts/tooltip/bordercolor-black/
                 *         Black border
                 * @sample {highstock} stock/tooltip/general/
                 *         Styled tooltip
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption tooltip.borderColor
                 */
                /**
                 * A CSS class name to apply to the tooltip's container div,
                 * allowing unique CSS styling for each chart.
                 *
                 * @type      {string}
                 * @apioption tooltip.className
                 */
                /**
                 * Since 4.1, the crosshair definitions are moved to the Axis object
                 * in order for a better separation from the tooltip. See
                 * [xAxis.crosshair](#xAxis.crosshair).
                 *
                 * @sample {highcharts} highcharts/tooltip/crosshairs-x/
                 *         Enable a crosshair for the x value
                 *
                 * @deprecated
                 *
                 * @type      {*}
                 * @default   true
                 * @apioption tooltip.crosshairs
                 */
                /**
                 * Distance from point to tooltip in pixels.
                 *
                 * @type      {number}
                 * @default   16
                 * @apioption tooltip.distance
                 */
                /**
                 * Whether the tooltip should follow the mouse as it moves across
                 * columns, pie slices and other point types with an extent.
                 * By default it behaves this way for pie, polygon, map, sankey
                 * and wordcloud series by override in the `plotOptions`
                 * for those series types.
                 *
                 * Does not apply if [split](#tooltip.split) is `true`.
                 *
                 * For touch moves to behave the same way, [followTouchMove](
                 * #tooltip.followTouchMove) must be `true` also.
                 *
                 * @sample highcharts/tooltip/followpointer/
                 *         Tooltip follow pointer comparison
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock} false
                 * @default   {highmaps} true
                 * @since     3.0
                 * @apioption tooltip.followPointer
                 */
                /**
                 * Whether the tooltip should update as the finger moves on a touch
                 * device. If this is `true` and [chart.panning](#chart.panning) is
                 * set,`followTouchMove` will take over one-finger touches, so the user
                 * needs to use two fingers for zooming and panning.
                 *
                 * Note the difference to [followPointer](#tooltip.followPointer) that
                 * only defines the _position_ of the tooltip. If `followPointer` is
                 * false in for example a column series, the tooltip will show above or
                 * below the column, but as `followTouchMove` is true, the tooltip will
                 * jump from column to column as the user swipes across the plot area.
                 *
                 * @type      {boolean}
                 * @default   {highcharts} true
                 * @default   {highstock} true
                 * @default   {highmaps} false
                 * @since     3.0.1
                 * @apioption tooltip.followTouchMove
                 */
                /**
                 * A [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                 * for the whole tooltip. When format strings are a requirement, it is
                 * usually more convenient to use `headerFormat`, `pointFormat` and
                 * `footerFormat`, but the `format` option allows combining them into
                 * one setting.
                 *
                 * The context of the format string is the same as that of the
                 * `formatter` callback.
                 *
                 * @sample {highcharts} highcharts/tooltip/format-shared/
                 *         Format for shared tooltip
                 *
                 * @type      {string}
                 * @default   undefined
                 * @since 11.1.0
                 * @apioption tooltip.format
                 */
                /**
                 * Callback function to format the text of the tooltip from scratch. In
                 * case of single or [shared](#tooltip.shared) tooltips, a string should
                 * be returned. In case of [split](#tooltip.split) tooltips, it should
                 * return an array where the first item is the header, and subsequent
                 * items are mapped to the points. Return `false` to disable tooltip for
                 * a specific point on series.
                 *
                 * A subset of HTML is supported. Unless `useHTML` is true, the HTML of
                 * the tooltip is parsed and converted to SVG, therefore this isn't a
                 * complete HTML renderer. The following HTML tags are supported: `b`,
                 * `br`, `em`, `i`, `span`, `strong`. Spans can be styled with a `style`
                 * attribute, but only text-related CSS, that is shared with SVG, is
                 * handled.
                 *
                 * The available data in the formatter differ a bit depending on whether
                 * the tooltip is shared or split, or belongs to a single point. In a
                 * shared/split tooltip, all properties except `x`, which is common for
                 * all points, are kept in an array, `this.points`.
                 *
                 * Available data are:
                 *
                 * - **this.percentage (not shared) /**
                 *   **this.points[i].percentage (shared)**:
                 *   Stacked series and pies only. The point's percentage of the total.
                 *
                 * - **this.point (not shared) / this.points[i].point (shared)**:
                 *   The point object. The point name, if defined, is available through
                 *   `this.point.name`.
                 *
                 * - **this.points**:
                 *   In a shared tooltip, this is an array containing all other
                 *   properties for each point.
                 *
                 * - **this.series (not shared) / this.points[i].series (shared)**:
                 *   The series object. The series name is available through
                 *   `this.series.name`.
                 *
                 * - **this.total (not shared) / this.points[i].total (shared)**:
                 *   Stacked series only. The total value at this point's x value.
                 *
                 * - **this.x**:
                 *   The x value. This property is the same regardless of the tooltip
                 *   being shared or not.
                 *
                 * - **this.y (not shared) / this.points[i].y (shared)**:
                 *   The y value.
                 *
                 * @sample {highcharts} highcharts/tooltip/formatter-simple/
                 *         Simple string formatting
                 * @sample {highcharts} highcharts/tooltip/formatter-shared/
                 *         Formatting with shared tooltip
                 * @sample {highcharts|highstock} highcharts/tooltip/formatter-split/
                 *         Formatting with split tooltip
                 * @sample highcharts/tooltip/formatter-conditional-default/
                 *         Extending default formatter
                 * @sample {highstock} stock/tooltip/formatter/
                 *         Formatting with shared tooltip
                 * @sample {highmaps} maps/tooltip/formatter/
                 *         String formatting
                 *
                 * @type      {Highcharts.TooltipFormatterCallbackFunction}
                 * @apioption tooltip.formatter
                 */
                /**
                 * Callback function to format the text of the tooltip for
                 * visible null points.
                 * Works analogously to [formatter](#tooltip.formatter).
                 *
                 * @sample highcharts/plotoptions/series-nullformat
                 *         Format data label and tooltip for null point.
                 *
                 * @type      {Highcharts.TooltipFormatterCallbackFunction}
                 * @apioption tooltip.nullFormatter
                 */
                /**
                 * Whether to allow the tooltip to render outside the chart's SVG
                 * element box. By default (`false`), the tooltip is rendered within the
                 * chart's SVG element, which results in the tooltip being aligned
                 * inside the chart area. For small charts, this may result in clipping
                 * or overlapping. When `true`, a separate SVG element is created and
                 * overlaid on the page, allowing the tooltip to be aligned inside the
                 * page itself.
                 *
                 * Defaults to `true` if `chart.scrollablePlotArea` is activated,
                 * otherwise `false`.
                 *
                 * @sample highcharts/tooltip/outside
                 *         Small charts with tooltips outside
                 *
                 * @type      {boolean|undefined}
                 * @default   undefined
                 * @since     6.1.1
                 * @apioption tooltip.outside
                 */
                /**
                 * A callback function for formatting the HTML output for a single point
                 * in the tooltip. Like the `pointFormat` string, but with more
                 * flexibility.
                 *
                 * @type      {Highcharts.FormatterCallbackFunction<Highcharts.Point>}
                 * @since     4.1.0
                 * @context   Highcharts.Point
                 * @apioption tooltip.pointFormatter
                 */
                /**
                 * A callback function to place the tooltip in a custom position. The
                 * callback receives three parameters: `labelWidth`, `labelHeight` and
                 * `point`, where point contains values for `plotX` and `plotY` telling
                 * where the reference point is in the plot area. Add `chart.plotLeft`
                 * and `chart.plotTop` to get the full coordinates.
                 *
                 * To find the actual hovered `Point` instance, use
                 * `this.chart.hoverPoint`. For shared or split tooltips, all the hover
                 * points are available in `this.chart.hoverPoints`.
                 *
                 * Since v7, when [tooltip.split](#tooltip.split) option is enabled,
                 * positioner is called for each of the boxes separately, including
                 * xAxis header. xAxis header is not a point, instead `point` argument
                 * contains info: `{ plotX: Number, plotY: Number, isHeader: Boolean }`
                 *
                 * The return should be an object containing x and y values, for example
                 * `{ x: 100, y: 100 }`.
                 *
                 * @sample {highcharts} highcharts/tooltip/positioner/
                 *         A fixed tooltip position
                 * @sample {highstock} stock/tooltip/positioner/
                 *         A fixed tooltip position on top of the chart
                 * @sample {highmaps} maps/tooltip/positioner/
                 *         A fixed tooltip position
                 * @sample {highstock} stock/tooltip/split-positioner/
                 *         Split tooltip with fixed positions
                 * @sample {highstock} stock/tooltip/positioner-scrollable-plotarea/
                 *         Scrollable plot area combined with tooltip positioner
                 *
                 * @type      {Highcharts.TooltipPositionerCallbackFunction}
                 * @since     2.2.4
                 * @apioption tooltip.positioner
                 */
                /**
                 * Split the tooltip into one label per series, with the header close
                 * to the axis. This is recommended over [shared](#tooltip.shared)
                 * tooltips for charts with multiple line series, generally making them
                 * easier to read. This option takes precedence over `tooltip.shared`.
                 *
                 * Not supported for [polar](#chart.polar) and [inverted](#chart.inverted) charts.
                 *
                 * @productdesc {highstock} In Highcharts Stock, tooltips are split
                 * by default since v6.0.0. Stock charts typically contain
                 * multi-dimension points and multiple panes, making split tooltips
                 * the preferred layout over
                 * the previous `shared` tooltip.
                 *
                 * @sample highcharts/tooltip/split/
                 *         Split tooltip
                 * @sample {highcharts|highstock} highcharts/tooltip/formatter-split/
                 *         Split tooltip and custom formatter callback
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock} true
                 * @since     5.0.0
                 * @product   highcharts highstock
                 * @apioption tooltip.split
                 */
                /**
                 * Prevents the tooltip from switching or closing, when touched or
                 * pointed.
                 *
                 * @sample highcharts/tooltip/stickoncontact/
                 *         Tooltip sticks on pointer contact
                 *
                 * @type      {boolean}
                 * @since     8.0.1
                 * @apioption tooltip.stickOnContact
                 */
                /**
                 * Use HTML to render the contents of the tooltip instead of SVG. Using
                 * HTML allows advanced formatting like tables and images in the
                 * tooltip. It is also recommended for rtl languages as it works around
                 * rtl bugs in early Firefox.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/footerformat/
                 *         A table for value alignment
                 * @sample {highcharts|highstock} highcharts/tooltip/fullhtml/
                 *         Full HTML tooltip
                 * @sample {highmaps} maps/tooltip/usehtml/
                 *         Pure HTML tooltip
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.2
                 * @apioption tooltip.useHTML
                 */
                /**
                 * How many decimals to show in each series' y value. This is
                 * overridable in each series' tooltip options object. The default is to
                 * preserve all decimals.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 * @sample {highmaps} maps/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 *
                 * @type      {number|undefined}
                 * @since     2.2
                 * @apioption tooltip.valueDecimals
                 */
                /**
                 * A string to prepend to each series' y value. Overridable in each
                 * series' tooltip options object.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 * @sample {highmaps} maps/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 *
                 * @type      {string}
                 * @since     2.2
                 * @apioption tooltip.valuePrefix
                 */
                /**
                 * A string to append to each series' y value. Overridable in each
                 * series' tooltip options object.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 * @sample {highmaps} maps/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 *
                 * @type      {string}
                 * @since     2.2
                 * @apioption tooltip.valueSuffix
                 */
                /**
                 * The format for the date in the tooltip header if the X axis is a
                 * datetime axis. The default is a best guess based on the smallest
                 * distance between points in the chart.
                 *
                 * @sample {highcharts} highcharts/tooltip/xdateformat/
                 *         A different format
                 *
                 * @type      {string}
                 * @product   highcharts highstock gantt
                 * @apioption tooltip.xDateFormat
                 */
                /**
                 * How many decimals to show for the `point.change`
                 * or the `point.cumulativeSum` value when the `series.compare`
                 * or the `series.cumulative` option is set.
                 * This is overridable in each series' tooltip options object.
                 *
                 * @type      {number}
                 * @default   2
                 * @since     1.0.1
                 * @product   highstock
                 * @apioption tooltip.changeDecimals
                 */
                /**
                 * Enable or disable the tooltip.
                 *
                 * @sample {highcharts} highcharts/tooltip/enabled/
                 *         Disabled
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-mouseover/
                 *         Disable tooltip and show values on chart instead
                 */
                enabled: true,
                /**
                 * Enable or disable animation of the tooltip.
                 *
                 * @type       {boolean}
                 * @default    true
                 * @since      2.3.0
                 */
                animation: svg,
                /**
                 * The radius of the rounded border corners.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         Default border radius
                 * @sample {highcharts} highcharts/tooltip/borderradius-0/
                 *         Square borders
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 */
                borderRadius: 3,
                /**
                 * For series on datetime axes, the date format in the tooltip's
                 * header will by default be guessed based on the closest data points.
                 * This member gives the default string representations used for
                 * each unit. For an overview of the replacement codes, see
                 * [dateFormat](/class-reference/Highcharts.Time#dateFormat).
                 *
                 * @see [xAxis.dateTimeLabelFormats](#xAxis.dateTimeLabelFormats)
                 *
                 * @type    {Highcharts.Dictionary<string>}
                 * @product highcharts highstock gantt
                 */
                dateTimeLabelFormats: {
                    /** @internal */
                    millisecond: '%A, %e %b, %H:%M:%S.%L',
                    /** @internal */
                    second: '%A, %e %b, %H:%M:%S',
                    /** @internal */
                    minute: '%A, %e %b, %H:%M',
                    /** @internal */
                    hour: '%A, %e %b, %H:%M',
                    /** @internal */
                    day: '%A, %e %b %Y',
                    /** @internal */
                    week: 'Week from %A, %e %b %Y',
                    /** @internal */
                    month: '%B %Y',
                    /** @internal */
                    year: '%Y'
                },
                /**
                 * A string to append to the tooltip format.
                 *
                 * @sample {highcharts} highcharts/tooltip/footerformat/
                 *         A table for value alignment
                 * @sample {highmaps} maps/tooltip/format/
                 *         Format demo
                 *
                 * @since 2.2
                 */
                footerFormat: '',
                /**
                 * The name of a symbol to use for the border around the tooltip
                 * header. Applies only when [tooltip.split](#tooltip.split) is
                 * enabled.
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols` the same way as for
                 * [series.marker.symbol](plotOptions.line.marker.symbol).
                 *
                 * @see [tooltip.shape](#tooltip.shape)
                 *
                 * @sample {highstock} stock/tooltip/split-positioner/
                 *         Different shapes for header and split boxes
                 *
                 * @type       {Highcharts.TooltipShapeValue}
                 * @validvalue ["callout", "square"]
                 * @since      7.0
                 */
                headerShape: 'callout',
                /**
                 * The number of milliseconds to wait until the tooltip is hidden when
                 * mouse out from a point or chart.
                 *
                 * @since 3.0
                 */
                hideDelay: 500,
                /**
                 * Padding inside the tooltip, in pixels.
                 *
                 * @since 5.0.0
                 */
                padding: 8,
                /**
                 * The name of a symbol to use for the border around the tooltip. Can
                 * be one of: `"callout"`, `"circle"` or `"rect"`. When
                 * [tooltip.split](#tooltip.split)
                 * option is enabled, shape is applied to all boxes except header, which
                 * is controlled by
                 * [tooltip.headerShape](#tooltip.headerShape).
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols` the same way as for
                 * [series.marker.symbol](plotOptions.line.marker.symbol).
                 *
                 * @type  {Highcharts.TooltipShapeValue}
                 * @since 4.0
                 */
                shape: 'callout',
                /**
                 * When the tooltip is shared, the entire plot area will capture mouse
                 * movement or touch events. Tooltip texts for series types with ordered
                 * data (not pie, scatter, flags etc) will be shown in a single bubble.
                 * This is recommended for single series charts and for tablet/mobile
                 * optimized charts.
                 *
                 * See also [tooltip.split](#tooltip.split), that is better suited for
                 * charts with many series, especially line-type series. The
                 * `tooltip.split` option takes precedence over `tooltip.shared`.
                 *
                 * @sample {highcharts} highcharts/tooltip/shared-false/
                 *         False by default
                 * @sample {highcharts} highcharts/tooltip/shared-true/
                 *         True
                 * @sample {highcharts} highcharts/tooltip/shared-x-crosshair/
                 *         True with x axis crosshair
                 * @sample {highcharts} highcharts/tooltip/shared-true-mixed-types/
                 *         True with mixed series types
                 *
                 * @since   2.1
                 * @product highcharts highstock
                 */
                shared: false,
                /**
                 * Proximity snap for graphs or single points. It defaults to 10 for
                 * mouse-powered devices and 25 for touch devices.
                 *
                 * Note that in most cases the whole plot area captures the mouse
                 * movement, and in these cases `tooltip.snap` doesn't make sense. This
                 * applies when [stickyTracking](#plotOptions.series.stickyTracking)
                 * is `true` (default) and when the tooltip is [shared](#tooltip.shared)
                 * or [split](#tooltip.split).
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         10 px by default
                 * @sample {highcharts} highcharts/tooltip/snap-50/
                 *         50 px on graph
                 *
                 * @type    {number}
                 * @default 10/25
                 * @since   1.2.0
                 * @product highcharts highstock
                 */
                snap: isTouchDevice ? 25 : 10,
                /**
                 * The HTML of the tooltip header line. Variables are enclosed by
                 * curly brackets. Available variables are `point.key`, `series.name`,
                 * `series.color` and other members from the `point` and `series`
                 * objects. The `point.key` variable contains the category name, x
                 * value or datetime string depending on the type of axis. For datetime
                 * axes, the `point.key` date format can be set using
                 * `tooltip.xDateFormat`.
                 *
                 * @sample {highcharts} highcharts/tooltip/footerformat/
                 *         An HTML table in the tooltip
                 * @sample {highstock} highcharts/tooltip/footerformat/
                 *         An HTML table in the tooltip
                 * @sample {highmaps} maps/tooltip/format/
                 *         Format demo
                 *
                 * @type      {string}
                 * @apioption tooltip.headerFormat
                 */
                headerFormat: '<span style="font-size: 0.8em">{point.key}</span><br/>',
                /**
                 * The HTML of the null point's line in the tooltip. Works analogously
                 * to [pointFormat](#tooltip.pointFormat).
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-nullformat
                 *         Format data label and tooltip for null point.
                 *
                 * @type      {string}
                 * @apioption tooltip.nullFormat
                 */
                /**
                 * The HTML of the point's line in the tooltip. Variables are enclosed
                 * by curly brackets. Available variables are `point.x`, `point.y`,
                 * `series.name` and `series.color` and other properties on the same
                 * form. Furthermore, `point.y` can be extended by the
                 * `tooltip.valuePrefix` and `tooltip.valueSuffix` variables. This can
                 * also be overridden for each series, which makes it a good hook for
                 * displaying units.
                 *
                 * In styled mode, the dot is colored by a class name rather
                 * than the point color.
                 *
                 * @sample {highcharts} highcharts/tooltip/pointformat/
                 *         A different point format with value suffix
                 * @sample {highcharts|highstock} highcharts/tooltip/pointformat-extra-information/
                 *         Show extra information about points in the tooltip
                 * @sample {highmaps} maps/tooltip/format/
                 *         Format demo
                 *
                 * @type       {string}
                 * @since      2.2
                 * @apioption  tooltip.pointFormat
                 */
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
                /**
                 * The background color or gradient for the tooltip.
                 *
                 * In styled mode, the stroke width is set in the
                 * `.highcharts-tooltip-box` class.
                 *
                 * @sample {highcharts} highcharts/tooltip/backgroundcolor-solid/
                 *         Yellowish background
                 * @sample {highcharts} highcharts/tooltip/backgroundcolor-gradient/
                 *         Gradient
                 * @sample {highcharts} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highstock} stock/tooltip/general/
                 *         Custom tooltip
                 * @sample {highstock} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 * @sample {highmaps} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                backgroundColor: "#ffffff" /* Palette.backgroundColor */,
                /**
                 * The pixel width of the tooltip border. Defaults to 0 for single
                 * tooltips and 1 for split tooltips.
                 *
                 * In styled mode, the stroke width is set in the
                 * `.highcharts-tooltip-box` class.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         2 pixels
                 * @sample {highcharts} highcharts/tooltip/borderwidth/
                 *         No border (shadow only)
                 * @sample {highcharts} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highstock} stock/tooltip/general/
                 *         Custom tooltip
                 * @sample {highstock} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 * @sample {highmaps} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 *
                 * @type {number}
                 */
                borderWidth: void 0,
                /**
                 * Whether to apply a drop shadow to the tooltip.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         True by default
                 * @sample {highcharts} highcharts/tooltip/shadow/
                 *         False
                 * @sample {highmaps} maps/tooltip/positioner/
                 *         Fixed tooltip position, border and shadow disabled
                 *
                 * @type {boolean|Highcharts.ShadowOptionsObject}
                 */
                shadow: true,
                /**
                 * Prevents the tooltip from switching or closing when touched or
                 * pointed.
                 *
                 * @sample highcharts/tooltip/stickoncontact/
                 *         Tooltip sticks on pointer contact
                 *
                 * @since 8.0.1
                 */
                stickOnContact: false,
                /**
                 * CSS styles for the tooltip. The tooltip can also be styled through
                 * the CSS class `.highcharts-tooltip`.
                 *
                 * Note that the default `pointerEvents` style makes the tooltip ignore
                 * mouse events, so in order to use clickable tooltips, this value must
                 * be set to `auto`.
                 *
                 * @sample {highcharts} highcharts/tooltip/style/
                 *         Greater padding, bold text
                 *
                 * @type {Highcharts.CSSObject}
                 */
                style: {
                    /** @internal */
                    color: "#333333" /* Palette.neutralColor80 */,
                    /** @internal */
                    cursor: 'default',
                    /** @internal */
                    fontSize: '0.8em'
                },
                /**
                 * Use HTML to render the contents of the tooltip instead of SVG. Using
                 * HTML allows advanced formatting like tables and images in the
                 * tooltip. It is also recommended for rtl languages as it works around
                 * rtl bugs in early Firefox.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/footerformat/
                 *         A table for value alignment
                 * @sample {highcharts|highstock} highcharts/tooltip/fullhtml/
                 *         Full HTML tooltip
                 * @sample {highmaps} maps/tooltip/usehtml/
                 *         Pure HTML tooltip
                 *
                 * @since 2.2
                 */
                useHTML: false
            },
            /**
             * Highchart by default puts a credits label in the lower right corner
             * of the chart. This can be changed using these options.
             */
            credits: {
                /**
                 * Credits for map source to be concatenated with conventional credit
                 * text. By default this is a format string that collects copyright
                 * information from the map if available.
                 *
                 * @see [mapTextFull](#credits.mapTextFull)
                 * @see [text](#credits.text)
                 *
                 * @type      {string}
                 * @default   \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>
                 * @since     4.2.2
                 * @product   highmaps
                 * @apioption credits.mapText
                 */
                /**
                 * Detailed credits for map source to be displayed on hover of credits
                 * text. By default this is a format string that collects copyright
                 * information from the map if available.
                 *
                 * @see [mapText](#credits.mapText)
                 * @see [text](#credits.text)
                 *
                 * @type      {string}
                 * @default   {geojson.copyright}
                 * @since     4.2.2
                 * @product   highmaps
                 * @apioption credits.mapTextFull
                 */
                /**
                 * Whether to show the credits text.
                 *
                 * @sample {highcharts} highcharts/credits/enabled-false/
                 *         Credits disabled
                 * @sample {highstock} stock/credits/enabled/
                 *         Credits disabled
                 * @sample {highmaps} maps/credits/enabled-false/
                 *         Credits disabled
                 */
                enabled: true,
                /**
                 * The URL for the credits label.
                 *
                 * @sample {highcharts} highcharts/credits/href/
                 *         Custom URL and text
                 * @sample {highmaps} maps/credits/customized/
                 *         Custom URL and text
                 */
                href: 'https://www.highcharts.com?credits',
                /**
                 * Position configuration for the credits label.
                 *
                 * @sample {highcharts} highcharts/credits/position-left/
                 *         Left aligned
                 * @sample {highcharts} highcharts/credits/position-left/
                 *         Left aligned
                 * @sample {highmaps} maps/credits/customized/
                 *         Left aligned
                 * @sample {highmaps} maps/credits/customized/
                 *         Left aligned
                 *
                 * @type    {Highcharts.AlignObject}
                 * @since   2.1
                 */
                position: {
                    /** @internal */
                    align: 'right',
                    /** @internal */
                    x: -10,
                    /** @internal */
                    verticalAlign: 'bottom',
                    /** @internal */
                    y: -5
                },
                /**
                 * CSS styles for the credits label.
                 *
                 * @see In styled mode, credits styles can be set with the
                 *      `.highcharts-credits` class.
                 *
                 * @type {Highcharts.CSSObject}
                 */
                style: {
                    /** @internal */
                    cursor: 'pointer',
                    /** @internal */
                    color: "#999999" /* Palette.neutralColor40 */,
                    /** @internal */
                    fontSize: '0.6em'
                },
                /**
                 * The text for the credits label.
                 *
                 * @productdesc {highmaps}
                 * If a map is loaded as GeoJSON, the text defaults to
                 * `Highcharts @ {map-credits}`. Otherwise, it defaults to
                 * `Highcharts.com`.
                 *
                 * @sample {highcharts} highcharts/credits/href/
                 *         Custom URL and text
                 * @sample {highmaps} maps/credits/customized/
                 *         Custom URL and text
                 */
                text: 'Highcharts.com'
            }
        };
        /* eslint-disable spaced-comment */

        defaultOptions.chart.styledMode = false;

        '';
        var defaultTime = new Time(defaultOptions.time);
        /**
         * Get the updated default options. Until 3.0.7, merely exposing defaultOptions
         * for outside modules wasn't enough because the setOptions method created a new
         * object.
         *
         * @function Highcharts.getOptions
         *
         * @return {Highcharts.Options}
         * Default options.
         */
        function getOptions() {
            return defaultOptions;
        }
        /**
         * Merge the default options with custom options and return the new options
         * structure. Commonly used for defining reusable templates.
         *
         * @sample highcharts/global/useutc-false Setting a global option
         * @sample highcharts/members/setoptions Applying a global theme
         *
         * @function Highcharts.setOptions
         *
         * @param {Highcharts.Options} options
         * The new custom chart options.
         *
         * @return {Highcharts.Options}
         * Updated options.
         */
        function setOptions(options) {
            // Copy in the default options
            merge(true, defaultOptions, options);
            // Update the time object
            if (options.time || options.global) {
                if (H.time) {
                    H.time.update(merge(defaultOptions.global, defaultOptions.time, options.global, options.time));
                }
                else {
                    /**
                     * Global `Time` object with default options. Since v6.0.5, time
                     * settings can be applied individually for each chart. If no
                     * individual settings apply, this `Time` object is shared by all
                     * instances.
                     *
                     * @name Highcharts.time
                     * @type {Highcharts.Time}
                     */
                    H.time = defaultTime;
                }
            }
            return defaultOptions;
        }
        /* *
         *
         *  Default Export
         *
         * */
        var DefaultOptions = {
            defaultOptions: defaultOptions,
            defaultTime: defaultTime,
            getOptions: getOptions,
            setOptions: setOptions
        };
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * @typedef {"plotBox"|"spacingBox"} Highcharts.ButtonRelativeToValue
         */
        /**
         * Gets fired when a series is added to the chart after load time, using the
         * `addSeries` method. Returning `false` prevents the series from being added.
         *
         * @callback Highcharts.ChartAddSeriesCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occured.
         *
         * @param {Highcharts.ChartAddSeriesEventObject} event
         *        The event that occured.
         */
        /**
         * Contains common event information. Through the `options` property you can
         * access the series options that were passed to the `addSeries` method.
         *
         * @interface Highcharts.ChartAddSeriesEventObject
         */ /**
        * The series options that were passed to the `addSeries` method.
        * @name Highcharts.ChartAddSeriesEventObject#options
        * @type {Highcharts.SeriesOptionsType}
        */ /**
        * Prevents the default behaviour of the event.
        * @name Highcharts.ChartAddSeriesEventObject#preventDefault
        * @type {Function}
        */ /**
        * The event target.
        * @name Highcharts.ChartAddSeriesEventObject#target
        * @type {Highcharts.Chart}
        */ /**
        * The event type.
        * @name Highcharts.ChartAddSeriesEventObject#type
        * @type {"addSeries"}
        */
        /**
         * Gets fired when clicking on the plot background.
         *
         * @callback Highcharts.ChartClickCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occured.
         *
         * @param {Highcharts.PointerEventObject} event
         *        The event that occured.
         */
        /**
         * Contains an axes of the clicked spot.
         *
         * @interface Highcharts.ChartClickEventAxisObject
         */ /**
        * Axis at the clicked spot.
        * @name Highcharts.ChartClickEventAxisObject#axis
        * @type {Highcharts.Axis}
        */ /**
        * Axis value at the clicked spot.
        * @name Highcharts.ChartClickEventAxisObject#value
        * @type {number}
        */
        /**
         * Contains information about the clicked spot on the chart. Remember the unit
         * of a datetime axis is milliseconds since 1970-01-01 00:00:00.
         *
         * @interface Highcharts.ChartClickEventObject
         * @extends Highcharts.PointerEventObject
         */ /**
        * Information about the x-axis on the clicked spot.
        * @name Highcharts.ChartClickEventObject#xAxis
        * @type {Array<Highcharts.ChartClickEventAxisObject>}
        */ /**
        * Information about the y-axis on the clicked spot.
        * @name Highcharts.ChartClickEventObject#yAxis
        * @type {Array<Highcharts.ChartClickEventAxisObject>}
        */ /**
        * Information about the z-axis on the clicked spot.
        * @name Highcharts.ChartClickEventObject#zAxis
        * @type {Array<Highcharts.ChartClickEventAxisObject>|undefined}
        */
        /**
         * Gets fired when the chart is finished loading.
         *
         * @callback Highcharts.ChartLoadCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occured.
         *
         * @param {global.Event} event
         *        The event that occured.
         */
        /**
         * Fires when the chart is redrawn, either after a call to `chart.redraw()` or
         * after an axis, series or point is modified with the `redraw` option set to
         * `true`.
         *
         * @callback Highcharts.ChartRedrawCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occured.
         *
         * @param {global.Event} event
         *        The event that occured.
         */
        /**
         * Gets fired after initial load of the chart (directly after the `load` event),
         * and after each redraw (directly after the `redraw` event).
         *
         * @callback Highcharts.ChartRenderCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occured.
         *
         * @param {global.Event} event
         *        The event that occured.
         */
        /**
         * Gets fired when an area of the chart has been selected. The default action
         * for the selection event is to zoom the chart to the selected area. It can be
         * prevented by calling `event.preventDefault()` or return false.
         *
         * @callback Highcharts.ChartSelectionCallbackFunction
         *
         * @param {Highcharts.Chart} this
         *        The chart on which the event occured.
         *
         * @param {Highcharts.SelectEventObject} event
         *        Event informations
         *
         * @return {boolean|undefined}
         *         Return false to prevent the default action, usually zoom.
         */
        (''); // detach doclets above

        return DefaultOptions;
    });
    _registerModule(_modules, 'Core/Animation/Fx.js', [_modules['Core/Color/Color.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (Color, H, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var color = Color.parse;
        var win = H.win;
        var isNumber = U.isNumber, objectEach = U.objectEach;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /* *
         *
         *  Class
         *
         * */
        /**
         * An animator object used internally. One instance applies to one property
         * (attribute or style prop) on one element. Animation is always initiated
         * through {@link SVGElement#animate}.
         *
         * @example
         * let rect = renderer.rect(0, 0, 10, 10).add();
         * rect.animate({ width: 100 });
         *
         * @private
         * @class
         * @name Highcharts.Fx
         *
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGElement} elem
         * The element to animate.
         *
         * @param {Partial<Highcharts.AnimationOptionsObject>} options
         * Animation options.
         *
         * @param {string} prop
         * The single attribute or CSS property to animate.
         */
        var Fx = /** @class */ (function () {
            /* *
             *
             *  Constructors
             *
             * */
            function Fx(elem, options, prop) {
                this.pos = NaN;
                this.options = options;
                this.elem = elem;
                this.prop = prop;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Set the current step of a path definition on SVGElement.
             *
             * @function Highcharts.Fx#dSetter
             *
             */
            Fx.prototype.dSetter = function () {
                var paths = this.paths, start = paths && paths[0], end = paths && paths[1], now = this.now || 0;
                var path = [];
                // Land on the final path without adjustment points appended in the ends
                if (now === 1 || !start || !end) {
                    path = this.toD || [];
                }
                else if (start.length === end.length && now < 1) {
                    for (var i = 0; i < end.length; i++) {
                        // Tween between the start segment and the end segment. Start
                        // with a copy of the end segment and tween the appropriate
                        // numerics
                        var startSeg = start[i];
                        var endSeg = end[i];
                        var tweenSeg = [];
                        for (var j = 0; j < endSeg.length; j++) {
                            var startItem = startSeg[j];
                            var endItem = endSeg[j];
                            // Tween numbers
                            if (isNumber(startItem) &&
                                isNumber(endItem) &&
                                // Arc boolean flags
                                !(endSeg[0] === 'A' && (j === 4 || j === 5))) {
                                tweenSeg[j] = startItem + now * (endItem - startItem);
                                // Strings, take directly from the end segment
                            }
                            else {
                                tweenSeg[j] = endItem;
                            }
                        }
                        path.push(tweenSeg);
                    }
                    // If animation is finished or length not matching, land on right value
                }
                else {
                    path = end;
                }
                this.elem.attr('d', path, void 0, true);
            };
            /**
             * Update the element with the current animation step.
             *
             * @function Highcharts.Fx#update
             *
             */
            Fx.prototype.update = function () {
                var elem = this.elem, prop = this.prop, // if destroyed, it is null
                now = this.now, step = this.options.step;
                // Animation setter defined from outside
                if (this[prop + 'Setter']) {
                    this[prop + 'Setter']();
                    // Other animations on SVGElement
                }
                else if (elem.attr) {
                    if (elem.element) {
                        elem.attr(prop, now, null, true);
                    }
                    // HTML styles, raw HTML content like container size
                }
                else {
                    elem.style[prop] = now + this.unit;
                }
                if (step) {
                    step.call(elem, now, this);
                }
            };
            /**
             * Run an animation.
             *
             * @function Highcharts.Fx#run
             *
             * @param {number} from
             *        The current value, value to start from.
             *
             * @param {number} to
             *        The end value, value to land on.
             *
             * @param {string} unit
             *        The property unit, for example `px`.
             *
             */
            Fx.prototype.run = function (from, to, unit) {
                var self = this, options = self.options, timer = function (gotoEnd) {
                    return timer.stopped ? false : self.step(gotoEnd);
                }, requestAnimationFrame = win.requestAnimationFrame ||
                    function (step) {
                        setTimeout(step, 13);
                    }, step = function () {
                    for (var i = 0; i < Fx.timers.length; i++) {
                        if (!Fx.timers[i]()) {
                            Fx.timers.splice(i--, 1);
                        }
                    }
                    if (Fx.timers.length) {
                        requestAnimationFrame(step);
                    }
                };
                if (from === to && !this.elem['forceAnimate:' + this.prop]) {
                    delete options.curAnim[this.prop];
                    if (options.complete &&
                        Object.keys(options.curAnim).length === 0) {
                        options.complete.call(this.elem);
                    }
                }
                else { // #7166
                    this.startTime = +new Date();
                    this.start = from;
                    this.end = to;
                    this.unit = unit;
                    this.now = this.start;
                    this.pos = 0;
                    timer.elem = this.elem;
                    timer.prop = this.prop;
                    if (timer() && Fx.timers.push(timer) === 1) {
                        requestAnimationFrame(step);
                    }
                }
            };
            /**
             * Run a single step in the animation.
             *
             * @function Highcharts.Fx#step
             *
             * @param {boolean} [gotoEnd]
             *        Whether to go to the endpoint of the animation after abort.
             *
             * @return {boolean}
             *         Returns `true` if animation continues.
             */
            Fx.prototype.step = function (gotoEnd) {
                var t = +new Date(), options = this.options, elem = this.elem, complete = options.complete, duration = options.duration, curAnim = options.curAnim;
                var ret, done;
                if ((elem.attr) && !elem.element) { // #2616, element is destroyed
                    ret = false;
                }
                else if (gotoEnd || t >= duration + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    curAnim[this.prop] = true;
                    done = true;
                    objectEach(curAnim, function (val) {
                        if (val !== true) {
                            done = false;
                        }
                    });
                    if (done && complete) {
                        complete.call(elem);
                    }
                    ret = false;
                }
                else {
                    this.pos = options.easing((t - this.startTime) / duration);
                    this.now = this.start + ((this.end -
                        this.start) * this.pos);
                    this.update();
                    ret = true;
                }
                return ret;
            };
            /**
             * Prepare start and end values so that the path can be animated one to one.
             *
             * @function Highcharts.Fx#initPath
             *
             * @param {Highcharts.SVGElement} elem
             *        The SVGElement item.
             *
             * @param {Highcharts.SVGPathArray|undefined} fromD
             *        Starting path definition.
             *
             * @param {Highcharts.SVGPathArray} toD
             *        Ending path definition.
             *
             * @return {Array<Highcharts.SVGPathArray,Highcharts.SVGPathArray>}
             *         An array containing start and end paths in array form so that
             *         they can be animated in parallel.
             */
            Fx.prototype.initPath = function (elem, fromD, toD) {
                var startX = elem.startX, endX = elem.endX, end = toD.slice(), // copy
                isArea = elem.isArea, positionFactor = isArea ? 2 : 1;
                var shift, fullLength, i, reverse, start = fromD && fromD.slice(); // copy
                if (!start) {
                    return [end, end];
                }
                /**
                 * If shifting points, prepend a dummy point to the end path.
                 * @private
                 */
                function prepend(arr, other) {
                    while (arr.length < fullLength) {
                        // Move to, line to or curve to?
                        var moveSegment = arr[0], otherSegment = other[fullLength - arr.length];
                        if (otherSegment && moveSegment[0] === 'M') {
                            if (otherSegment[0] === 'C') {
                                arr[0] = [
                                    'C',
                                    moveSegment[1],
                                    moveSegment[2],
                                    moveSegment[1],
                                    moveSegment[2],
                                    moveSegment[1],
                                    moveSegment[2]
                                ];
                            }
                            else {
                                arr[0] = ['L', moveSegment[1], moveSegment[2]];
                            }
                        }
                        // Prepend a copy of the first point
                        arr.unshift(moveSegment);
                        // For areas, the bottom path goes back again to the left, so we
                        // need to append a copy of the last point.
                        if (isArea) {
                            var z = arr.pop();
                            arr.push(arr[arr.length - 1], z); // append point and the Z
                        }
                    }
                }
                /**
                 * Copy and append last point until the length matches the end length.
                 * @private
                 */
                function append(arr, other) {
                    while (arr.length < fullLength) {
                        // Pull out the slice that is going to be appended or inserted.
                        // In a line graph, the positionFactor is 1, and the last point
                        // is sliced out. In an area graph, the positionFactor is 2,
                        // causing the middle two points to be sliced out, since an area
                        // path starts at left, follows the upper path then turns and
                        // follows the bottom back.
                        var segmentToAdd = arr[Math.floor(arr.length / positionFactor) - 1].slice();
                        // Disable the first control point of curve segments
                        if (segmentToAdd[0] === 'C') {
                            segmentToAdd[1] = segmentToAdd[5];
                            segmentToAdd[2] = segmentToAdd[6];
                        }
                        if (!isArea) {
                            arr.push(segmentToAdd);
                        }
                        else {
                            var lowerSegmentToAdd = arr[Math.floor(arr.length / positionFactor)].slice();
                            arr.splice(arr.length / 2, 0, segmentToAdd, lowerSegmentToAdd);
                        }
                    }
                }
                // For sideways animation, find out how much we need to shift to get the
                // start path Xs to match the end path Xs.
                if (startX && endX && endX.length) {
                    for (i = 0; i < startX.length; i++) {
                        // Moving left, new points coming in on right
                        if (startX[i] === endX[0]) {
                            shift = i;
                            break;
                            // Moving right
                        }
                        else if (startX[0] ===
                            endX[endX.length - startX.length + i]) {
                            shift = i;
                            reverse = true;
                            break;
                            // Fixed from the right side, "scaling" left
                        }
                        else if (startX[startX.length - 1] ===
                            endX[endX.length - startX.length + i]) {
                            shift = startX.length - i;
                            break;
                        }
                    }
                    if (typeof shift === 'undefined') {
                        start = [];
                    }
                }
                if (start.length && isNumber(shift)) {
                    // The common target length for the start and end array, where both
                    // arrays are padded in opposite ends
                    fullLength = end.length + shift * positionFactor;
                    if (!reverse) {
                        prepend(end, start);
                        append(start, end);
                    }
                    else {
                        prepend(start, end);
                        append(end, start);
                    }
                }
                return [start, end];
            };
            /**
             * Handle animation of the color attributes directly.
             *
             * @function Highcharts.Fx#fillSetter
             *
             */
            Fx.prototype.fillSetter = function () {
                Fx.prototype.strokeSetter.apply(this, arguments);
            };
            /**
             * Handle animation of the color attributes directly.
             *
             * @function Highcharts.Fx#strokeSetter
             *
             */
            Fx.prototype.strokeSetter = function () {
                this.elem.attr(this.prop, color(this.start).tweenTo(color(this.end), this.pos), void 0, true);
            };
            /* *
             *
             *  Static Properties
             *
             * */
            Fx.timers = [];
            return Fx;
        }());
        /* *
         *
         *  Default Export
         *
         * */

        return Fx;
    });
    _registerModule(_modules, 'Core/Animation/AnimationUtilities.js', [_modules['Core/Animation/Fx.js'], _modules['Core/Utilities.js']], function (Fx, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined, getStyle = U.getStyle, isArray = U.isArray, isNumber = U.isNumber, isObject = U.isObject, merge = U.merge, objectEach = U.objectEach, pick = U.pick;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Set the global animation to either a given value, or fall back to the given
         * chart's animation option.
         *
         * @function Highcharts.setAnimation
         *
         * @param {boolean|Partial<Highcharts.AnimationOptionsObject>|undefined} animation
         *        The animation object.
         *
         * @param {Highcharts.Chart} chart
         *        The chart instance.
         *
         * @todo
         * This function always relates to a chart, and sets a property on the renderer,
         * so it should be moved to the SVGRenderer.
         */
        function setAnimation(animation, chart) {
            chart.renderer.globalAnimation = pick(animation, chart.options.chart.animation, true);
        }
        /**
         * Get the animation in object form, where a disabled animation is always
         * returned as `{ duration: 0 }`.
         *
         * @function Highcharts.animObject
         *
         * @param {boolean|Highcharts.AnimationOptionsObject} [animation=0]
         *        An animation setting. Can be an object with duration, complete and
         *        easing properties, or a boolean to enable or disable.
         *
         * @return {Highcharts.AnimationOptionsObject}
         *         An object with at least a duration property.
         */
        function animObject(animation) {
            return isObject(animation) ?
                merge({ duration: 500, defer: 0 }, animation) :
                { duration: animation ? 500 : 0, defer: 0 };
        }
        /**
         * Get the defer as a number value from series animation options.
         *
         * @function Highcharts.getDeferredAnimation
         *
         * @param {Highcharts.Chart} chart
         *        The chart instance.
         *
         * @param {boolean|Highcharts.AnimationOptionsObject} animation
         *        An animation setting. Can be an object with duration, complete and
         *        easing properties, or a boolean to enable or disable.
         *
         * @param {Highcharts.Series} [series]
         *        Series to defer animation.
         *
         * @return {number}
         *        The numeric value.
         */
        function getDeferredAnimation(chart, animation, series) {
            var labelAnimation = animObject(animation), s = series ? [series] : chart.series;
            var defer = 0, duration = 0;
            s.forEach(function (series) {
                var seriesAnim = animObject(series.options.animation);
                defer = animation && defined(animation.defer) ?
                    labelAnimation.defer :
                    Math.max(defer, seriesAnim.duration + seriesAnim.defer);
                duration = Math.min(labelAnimation.duration, seriesAnim.duration);
            });
            // Disable defer for exporting
            if (chart.renderer.forExport) {
                defer = 0;
            }
            var anim = {
                defer: Math.max(0, defer - duration),
                duration: Math.min(defer, duration)
            };
            return anim;
        }
        /**
         * The global animate method, which uses Fx to create individual animators.
         *
         * @function Highcharts.animate
         *
         * @param {Highcharts.HTMLDOMElement|Highcharts.SVGElement} el
         *        The element to animate.
         *
         * @param {Highcharts.CSSObject|Highcharts.SVGAttributes} params
         *        An object containing key-value pairs of the properties to animate.
         *        Supports numeric as pixel-based CSS properties for HTML objects and
         *        attributes for SVGElements.
         *
         * @param {Partial<Highcharts.AnimationOptionsObject>} [opt]
         *        Animation options.
         *
         * @return {void}
         */
        function animate(el, params, opt) {
            var start, unit = '', end, fx, args;
            if (!isObject(opt)) { // Number or undefined/null
                args = arguments;
                opt = {
                    duration: args[2],
                    easing: args[3],
                    complete: args[4]
                };
            }
            if (!isNumber(opt.duration)) {
                opt.duration = 400;
            }
            opt.easing = typeof opt.easing === 'function' ?
                opt.easing :
                (Math[opt.easing] || Math.easeInOutSine);
            opt.curAnim = merge(params);
            objectEach(params, function (val, prop) {
                // Stop current running animation of this property
                stop(el, prop);
                fx = new Fx(el, opt, prop);
                end = void 0;
                if (prop === 'd' && isArray(params.d)) {
                    fx.paths = fx.initPath(el, el.pathArray, params.d);
                    fx.toD = params.d;
                    start = 0;
                    end = 1;
                }
                else if (el.attr) {
                    start = el.attr(prop);
                }
                else {
                    start = parseFloat(getStyle(el, prop)) || 0;
                    if (prop !== 'opacity') {
                        unit = 'px';
                    }
                }
                if (!end) {
                    end = val;
                }
                if (typeof end === 'string' && end.match('px')) {
                    end = end.replace(/px/g, ''); // #4351
                }
                fx.run(start, end, unit);
            });
        }
        /**
         * Stop running animation.
         *
         * @function Highcharts.stop
         *
         * @param {Highcharts.SVGElement} el
         *        The SVGElement to stop animation on.
         *
         * @param {string} [prop]
         *        The property to stop animating. If given, the stop method will stop a
         *        single property from animating, while others continue.
         *
         * @return {void}
         *
         * @todo
         * A possible extension to this would be to stop a single property, when
         * we want to continue animating others. Then assign the prop to the timer
         * in the Fx.run method, and check for the prop here. This would be an
         * improvement in all cases where we stop the animation from .attr. Instead of
         * stopping everything, we can just stop the actual attributes we're setting.
         */
        function stop(el, prop) {
            var i = Fx.timers.length;
            // Remove timers related to this element (#4519)
            while (i--) {
                if (Fx.timers[i].elem === el && (!prop || prop === Fx.timers[i].prop)) {
                    Fx.timers[i].stopped = true; // #4667
                }
            }
        }
        var animationExports = {
            animate: animate,
            animObject: animObject,
            getDeferredAnimation: getDeferredAnimation,
            setAnimation: setAnimation,
            stop: stop
        };
        /* *
         *
         *  Default Export
         *
         * */

        return animationExports;
    });
    _registerModule(_modules, 'Core/Renderer/HTML/AST.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var SVG_NS = H.SVG_NS, win = H.win;
        var attr = U.attr, createElement = U.createElement, css = U.css, error = U.error, isFunction = U.isFunction, isString = U.isString, objectEach = U.objectEach, splat = U.splat;
        var trustedTypes = win.trustedTypes;
        /* *
         *
         *  Constants
         *
         * */
        // Create the trusted type policy. This should not be exposed.
        var trustedTypesPolicy = (trustedTypes &&
            isFunction(trustedTypes.createPolicy) &&
            trustedTypes.createPolicy('highcharts', {
                createHTML: function (s) { return s; }
            }));
        var emptyHTML = trustedTypesPolicy ?
            trustedTypesPolicy.createHTML('') :
            '';
        // IE9 and PhantomJS are only able to parse XML.
        var hasValidDOMParser = (function () {
            try {
                return Boolean(new DOMParser().parseFromString(emptyHTML, 'text/html'));
            }
            catch (e) {
                return false;
            }
        }());
        /* *
         *
         *  Class
         *
         * */
        /**
         * The AST class represents an abstract syntax tree of HTML or SVG content. It
         * can take HTML as an argument, parse it, optionally transform it to SVG, then
         * perform sanitation before inserting it into the DOM.
         *
         * @class
         * @name Highcharts.AST
         *
         * @param {string|Array<Highcharts.ASTNode>} source
         * Either an HTML string or an ASTNode list to populate the tree.
         */
        var AST = /** @class */ (function () {
            /* *
             *
             *  Constructor
             *
             * */
            // Construct an AST from HTML markup, or wrap an array of existing AST nodes
            function AST(source) {
                this.nodes = typeof source === 'string' ?
                    this.parseMarkup(source) : source;
            }
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * Filter an object of SVG or HTML attributes against the allow list.
             *
             * @static
             *
             * @function Highcharts.AST#filterUserAttributes
             *
             * @param {Highcharts.SVGAttributes} attributes The attributes to filter
             *
             * @return {Highcharts.SVGAttributes}
             * The filtered attributes
             */
            AST.filterUserAttributes = function (attributes) {
                objectEach(attributes, function (val, key) {
                    var valid = true;
                    if (AST.allowedAttributes.indexOf(key) === -1) {
                        valid = false;
                    }
                    if (['background', 'dynsrc', 'href', 'lowsrc', 'src']
                        .indexOf(key) !== -1) {
                        valid = isString(val) && AST.allowedReferences.some(function (ref) { return val.indexOf(ref) === 0; });
                    }
                    if (!valid) {
                        error(33, false, void 0, {
                            'Invalid attribute in config': "".concat(key)
                        });
                        delete attributes[key];
                    }
                    // #17753, < is not allowed in SVG attributes
                    if (isString(val) && attributes[key]) {
                        attributes[key] = val.replace(/</g, '&lt;');
                    }
                });
                return attributes;
            };
            AST.parseStyle = function (style) {
                return style
                    .split(';')
                    .reduce(function (styles, line) {
                    var pair = line.split(':').map(function (s) { return s.trim(); }), key = pair.shift();
                    if (key && pair.length) {
                        styles[key.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })] = pair.join(':'); // #17146
                    }
                    return styles;
                }, {});
            };
            /**
             * Utility function to set html content for an element by passing in a
             * markup string. The markup is safely parsed by the AST class to avoid
             * XSS vulnerabilities. This function should be used instead of setting
             * `innerHTML` in all cases where the content is not fully trusted.
             *
             * @static
             * @function Highcharts.AST#setElementHTML
             *
             * @param {SVGDOMElement|HTMLDOMElement} el
             * Node to set content of.
             *
             * @param {string} html
             * Markup string
             */
            AST.setElementHTML = function (el, html) {
                el.innerHTML = AST.emptyHTML; // Clear previous
                if (html) {
                    var ast = new AST(html);
                    ast.addToDOM(el);
                }
            };
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Add the tree defined as a hierarchical JS structure to the DOM
             *
             * @function Highcharts.AST#addToDOM
             *
             * @param {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement} parent
             * The node where it should be added
             *
             * @return {Highcharts.HTMLDOMElement|Highcharts.SVGDOMElement}
             * The inserted node.
             */
            AST.prototype.addToDOM = function (parent) {
                /**
                 * @private
                 * @param {Highcharts.ASTNode} subtree
                 * HTML/SVG definition
                 * @param {Element} [subParent]
                 * parent node
                 * @return {Highcharts.SVGDOMElement|Highcharts.HTMLDOMElement}
                 * The inserted node.
                 */
                function recurse(subtree, subParent) {
                    var ret;
                    splat(subtree).forEach(function (item) {
                        var tagName = item.tagName;
                        var textNode = item.textContent ?
                            H.doc.createTextNode(item.textContent) :
                            void 0;
                        // Whether to ignore the AST filtering totally, #15345
                        var bypassHTMLFiltering = AST.bypassHTMLFiltering;
                        var node;
                        if (tagName) {
                            if (tagName === '#text') {
                                node = textNode;
                            }
                            else if (AST.allowedTags.indexOf(tagName) !== -1 ||
                                bypassHTMLFiltering) {
                                var NS = tagName === 'svg' ?
                                    SVG_NS :
                                    (subParent.namespaceURI || SVG_NS);
                                var element = H.doc.createElementNS(NS, tagName);
                                var attributes_1 = item.attributes || {};
                                // Apply attributes from root of AST node, legacy from
                                // from before TextBuilder
                                objectEach(item, function (val, key) {
                                    if (key !== 'tagName' &&
                                        key !== 'attributes' &&
                                        key !== 'children' &&
                                        key !== 'style' &&
                                        key !== 'textContent') {
                                        attributes_1[key] = val;
                                    }
                                });
                                attr(element, bypassHTMLFiltering ?
                                    attributes_1 :
                                    AST.filterUserAttributes(attributes_1));
                                if (item.style) {
                                    css(element, item.style);
                                }
                                // Add text content
                                if (textNode) {
                                    element.appendChild(textNode);
                                }
                                // Recurse
                                recurse(item.children || [], element);
                                node = element;
                            }
                            else {
                                error(33, false, void 0, {
                                    'Invalid tagName in config': tagName
                                });
                            }
                        }
                        // Add to the tree
                        if (node) {
                            subParent.appendChild(node);
                        }
                        ret = node;
                    });
                    // Return last node added (on top level it's the only one)
                    return ret;
                }
                return recurse(this.nodes, parent);
            };
            /**
             * Parse HTML/SVG markup into AST Node objects. Used internally from the
             * constructor.
             *
             * @private
             *
             * @function Highcharts.AST#getNodesFromMarkup
             *
             * @param {string} markup The markup string.
             *
             * @return {Array<Highcharts.ASTNode>} The parsed nodes.
             */
            AST.prototype.parseMarkup = function (markup) {
                var nodes = [];
                markup = markup
                    .trim()
                    // The style attribute throws a warning when parsing when CSP is
                    // enabled (#6884), so use an alias and pick it up below
                    // Make all quotation marks parse correctly to DOM (#17627)
                    .replace(/ style=(["'])/g, ' data-style=$1');
                var doc;
                if (hasValidDOMParser) {
                    doc = new DOMParser().parseFromString(trustedTypesPolicy ?
                        trustedTypesPolicy.createHTML(markup) :
                        markup, 'text/html');
                }
                else {
                    var body = createElement('div');
                    body.innerHTML = markup;
                    doc = { body: body };
                }
                var appendChildNodes = function (node, addTo) {
                    var tagName = node.nodeName.toLowerCase();
                    // Add allowed tags
                    var astNode = {
                        tagName: tagName
                    };
                    if (tagName === '#text') {
                        astNode.textContent = node.textContent || '';
                    }
                    var parsedAttributes = node.attributes;
                    // Add attributes
                    if (parsedAttributes) {
                        var attributes_2 = {};
                        [].forEach.call(parsedAttributes, function (attrib) {
                            if (attrib.name === 'data-style') {
                                astNode.style = AST.parseStyle(attrib.value);
                            }
                            else {
                                attributes_2[attrib.name] = attrib.value;
                            }
                        });
                        astNode.attributes = attributes_2;
                    }
                    // Handle children
                    if (node.childNodes.length) {
                        var children_1 = [];
                        [].forEach.call(node.childNodes, function (childNode) {
                            appendChildNodes(childNode, children_1);
                        });
                        if (children_1.length) {
                            astNode.children = children_1;
                        }
                    }
                    addTo.push(astNode);
                };
                [].forEach.call(doc.body.childNodes, function (childNode) { return appendChildNodes(childNode, nodes); });
                return nodes;
            };
            /* *
             *
             *  Static Properties
             *
             * */
            /**
             * The list of allowed SVG or HTML attributes, used for sanitizing
             * potentially harmful content from the chart configuration before adding to
             * the DOM.
             *
             * @see [Source code with default values](
             * https://github.com/highcharts/highcharts/blob/master/ts/Core/Renderer/HTML/AST.ts#:~:text=public%20static%20allowedAttributes)
             *
             * @example
             * // Allow a custom, trusted attribute
             * Highcharts.AST.allowedAttributes.push('data-value');
             *
             * @name Highcharts.AST.allowedAttributes
             * @type {Array<string>}
             */
            AST.allowedAttributes = [
                'alt',
                'aria-controls',
                'aria-describedby',
                'aria-expanded',
                'aria-haspopup',
                'aria-hidden',
                'aria-label',
                'aria-labelledby',
                'aria-live',
                'aria-pressed',
                'aria-readonly',
                'aria-roledescription',
                'aria-selected',
                'class',
                'clip-path',
                'color',
                'colspan',
                'cx',
                'cy',
                'd',
                'dx',
                'dy',
                'disabled',
                'fill',
                'flood-color',
                'flood-opacity',
                'height',
                'href',
                'id',
                'in',
                'markerHeight',
                'markerWidth',
                'offset',
                'opacity',
                'orient',
                'padding',
                'paddingLeft',
                'paddingRight',
                'patternUnits',
                'r',
                'refX',
                'refY',
                'role',
                'scope',
                'slope',
                'src',
                'startOffset',
                'stdDeviation',
                'stroke',
                'stroke-linecap',
                'stroke-width',
                'style',
                'tableValues',
                'result',
                'rowspan',
                'summary',
                'target',
                'tabindex',
                'text-align',
                'text-anchor',
                'textAnchor',
                'textLength',
                'title',
                'type',
                'valign',
                'width',
                'x',
                'x1',
                'x2',
                'xlink:href',
                'y',
                'y1',
                'y2',
                'zIndex'
            ];
            /**
             * The list of allowed references for referring attributes like `href` and
             * `src`. Attribute values will only be allowed if they start with one of
             * these strings.
             *
             * @see [Source code with default values](
             * https://github.com/highcharts/highcharts/blob/master/ts/Core/Renderer/HTML/AST.ts#:~:text=public%20static%20allowedReferences)
             *
             * @example
             * // Allow tel:
             * Highcharts.AST.allowedReferences.push('tel:');
             *
             * @name    Highcharts.AST.allowedReferences
             * @type    {Array<string>}
             */
            AST.allowedReferences = [
                'https://',
                'http://',
                'mailto:',
                '/',
                '../',
                './',
                '#'
            ];
            /**
             * The list of allowed SVG or HTML tags, used for sanitizing potentially
             * harmful content from the chart configuration before adding to the DOM.
             *
             * @see [Source code with default values](
             * https://github.com/highcharts/highcharts/blob/master/ts/Core/Renderer/HTML/AST.ts#:~:text=public%20static%20allowedTags)
             *
             * @example
             * // Allow a custom, trusted tag
             * Highcharts.AST.allowedTags.push('blink'); // ;)
             *
             * @name    Highcharts.AST.allowedTags
             * @type    {Array<string>}
             */
            AST.allowedTags = [
                'a',
                'abbr',
                'b',
                'br',
                'button',
                'caption',
                'circle',
                'clipPath',
                'code',
                'dd',
                'defs',
                'div',
                'dl',
                'dt',
                'em',
                'feComponentTransfer',
                'feDropShadow',
                'feFuncA',
                'feFuncB',
                'feFuncG',
                'feFuncR',
                'feGaussianBlur',
                'feOffset',
                'feMerge',
                'feMergeNode',
                'filter',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'hr',
                'i',
                'img',
                'li',
                'linearGradient',
                'marker',
                'ol',
                'p',
                'path',
                'pattern',
                'pre',
                'rect',
                'small',
                'span',
                'stop',
                'strong',
                'style',
                'sub',
                'sup',
                'svg',
                'table',
                'text',
                'textPath',
                'thead',
                'title',
                'tbody',
                'tspan',
                'td',
                'th',
                'tr',
                'u',
                'ul',
                '#text'
            ];
            AST.emptyHTML = emptyHTML;
            /**
             * Allow all custom SVG and HTML attributes, references and tags (together
             * with potentially harmful ones) to be added to the DOM from the chart
             * configuration. In other words, disable the the allow-listing which is the
             * primary functionality of the AST.
             *
             * WARNING: Setting this property to `true` while allowing untrusted user
             * data in the chart configuration will expose your application to XSS
             * security risks!
             *
             * Note that in case you want to allow a known set of tags or attributes,
             * you should allow-list them instead of disabling the filtering totally.
             * See [allowedAttributes](Highcharts.AST#.allowedAttributes),
             * [allowedReferences](Highcharts.AST#.allowedReferences) and
             * [allowedTags](Highcharts.AST#.allowedTags). The `bypassHTMLFiltering`
             * setting is intended only for those cases where allow-listing is not
             * practical, and the chart configuration already comes from a secure
             * source.
             *
             * @example
             * // Allow all custom attributes, references and tags (disable DOM XSS
             * // filtering)
             * Highcharts.AST.bypassHTMLFiltering = true;
             *
             * @name Highcharts.AST.bypassHTMLFiltering
             * @static
             */
            AST.bypassHTMLFiltering = false;
            return AST;
        }());
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * Serialized form of an SVG/HTML definition, including children.
         *
         * @interface Highcharts.ASTNode
         */ /**
        * @name Highcharts.ASTNode#attributes
        * @type {Highcharts.SVGAttributes|undefined}
        */ /**
        * @name Highcharts.ASTNode#children
        * @type {Array<Highcharts.ASTNode>|undefined}
        */ /**
        * @name Highcharts.ASTNode#tagName
        * @type {string|undefined}
        */ /**
        * @name Highcharts.ASTNode#textContent
        * @type {string|undefined}
        */
        (''); // keeps doclets above in file

        return AST;
    });
    _registerModule(_modules, 'Core/Templating.js', [_modules['Core/Defaults.js'], _modules['Core/Utilities.js']], function (D, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defaultOptions = D.defaultOptions, defaultTime = D.defaultTime;
        var extend = U.extend, getNestedProperty = U.getNestedProperty, isArray = U.isArray, isNumber = U.isNumber, isObject = U.isObject, isString = U.isString, pick = U.pick, pInt = U.pInt;
        var helpers = {
            // Built-in helpers
            add: function (a, b) { return a + b; },
            divide: function (a, b) { return (b !== 0 ? a / b : ''); },
            // eslint-disable-next-line eqeqeq
            eq: function (a, b) { return a == b; },
            each: function (arr) {
                var match = arguments[arguments.length - 1];
                return isArray(arr) ?
                    arr.map(function (item, i) { return format(match.body, extend(isObject(item) ? item : { '@this': item }, {
                        '@index': i,
                        '@first': i === 0,
                        '@last': i === arr.length - 1
                    })); }).join('') :
                    false;
            },
            ge: function (a, b) { return a >= b; },
            gt: function (a, b) { return a > b; },
            'if': function (condition) { return !!condition; },
            le: function (a, b) { return a <= b; },
            lt: function (a, b) { return a < b; },
            multiply: function (a, b) { return a * b; },
            // eslint-disable-next-line eqeqeq
            ne: function (a, b) { return a != b; },
            subtract: function (a, b) { return a - b; },
            unless: function (condition) { return !condition; }
        };
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Formats a JavaScript date timestamp (milliseconds since Jan 1st 1970) into a
         * human readable date string. The format is a subset of the formats for PHP's
         * [strftime](https://www.php.net/manual/en/function.strftime.php) function.
         * Additional formats can be given in the {@link Highcharts.dateFormats} hook.
         *
         * Since v6.0.5, all internal dates are formatted through the
         * {@link Highcharts.Chart#time} instance to respect chart-level time settings.
         * The `Highcharts.dateFormat` function only reflects global time settings set
         * with `setOptions`.
         *
         * Supported format keys:
         * - `%a`: Short weekday, like 'Mon'
         * - `%A`: Long weekday, like 'Monday'
         * - `%d`: Two digit day of the month, 01 to 31
         * - `%e`: Day of the month, 1 through 31
         * - `%w`: Day of the week, 0 through 6
         * - `%b`: Short month, like 'Jan'
         * - `%B`: Long month, like 'January'
         * - `%m`: Two digit month number, 01 through 12
         * - `%y`: Two digits year, like 09 for 2009
         * - `%Y`: Four digits year, like 2009
         * - `%H`: Two digits hours in 24h format, 00 through 23
         * - `%k`: Hours in 24h format, 0 through 23
         * - `%I`: Two digits hours in 12h format, 00 through 11
         * - `%l`: Hours in 12h format, 1 through 12
         * - `%M`: Two digits minutes, 00 through 59
         * - `%p`: Upper case AM or PM
         * - `%P`: Lower case AM or PM
         * - `%S`: Two digits seconds, 00 through 59
         * - `%L`: Milliseconds (naming from Ruby)
         *
         * @function Highcharts.dateFormat
         *
         * @param {string} format
         *        The desired format where various time representations are prefixed
         *        with `%`.
         *
         * @param {number} timestamp
         *        The JavaScript timestamp.
         *
         * @param {boolean} [capitalize=false]
         *        Upper case first letter in the return.
         *
         * @return {string}
         *         The formatted date.
         */
        function dateFormat(format, timestamp, capitalize) {
            return defaultTime.dateFormat(format, timestamp, capitalize);
        }
        /**
         * Format a string according to a subset of the rules of Python's String.format
         * method.
         *
         * @example
         * let s = Highcharts.format(
         *     'The {color} fox was {len:.2f} feet long',
         *     { color: 'red', len: Math.PI }
         * );
         * // => The red fox was 3.14 feet long
         *
         * @function Highcharts.format
         *
         * @param {string} str
         *        The string to format.
         *
         * @param {Record<string, *>} ctx
         *        The context, a collection of key-value pairs where each key is
         *        replaced by its value.
         *
         * @param {Highcharts.Chart} [chart]
         *        A `Chart` instance used to get numberFormatter and time.
         *
         * @return {string}
         *         The formatted string.
         */
        function format(str, ctx, chart) {
            if (str === void 0) { str = ''; }
            var regex = /\{([a-zA-Z0-9\:\.\,;\-\/<>%_@"'= #\(\)]+)\}/g, 
            // The sub expression regex is the same as the top expression regex,
            // but except parens and block helpers (#), and surrounded by parens
            // instead of curly brackets.
            subRegex = /\(([a-zA-Z0-9\:\.\,;\-\/<>%_@"'= ]+)\)/g, matches = [], floatRegex = /f$/, decRegex = /\.([0-9])/, lang = defaultOptions.lang, time = chart && chart.time || defaultTime, numberFormatter = chart && chart.numberFormatter || numberFormat;
            /*
             * Get a literal or variable value inside a template expression. May be
             * extended with other types like string or null if needed, but keep it
             * small for now.
             */
            var resolveProperty = function (key) {
                if (key === void 0) { key = ''; }
                var n;
                // Literals
                if (key === 'true') {
                    return true;
                }
                if (key === 'false') {
                    return false;
                }
                if ((n = Number(key)).toString() === key) {
                    return n;
                }
                // Variables and constants
                return getNestedProperty(key, ctx);
            };
            var match, currentMatch, depth = 0, hasSub;
            // Parse and create tree
            while ((match = regex.exec(str)) !== null) {
                // When a sub expression is found, it is evaluated first, and the
                // results recursively evaluated until no subexpression exists.
                var subMatch = subRegex.exec(match[1]);
                if (subMatch) {
                    match = subMatch;
                    hasSub = true;
                }
                if (!currentMatch || !currentMatch.isBlock) {
                    currentMatch = {
                        ctx: ctx,
                        expression: match[1],
                        find: match[0],
                        isBlock: match[1].charAt(0) === '#',
                        start: match.index,
                        startInner: match.index + match[0].length,
                        length: match[0].length
                    };
                }
                // Identify helpers
                var fn = match[1].split(' ')[0].replace('#', '');
                if (helpers[fn]) {
                    // Block helper, only 0 level is handled
                    if (currentMatch.isBlock && fn === currentMatch.fn) {
                        depth++;
                    }
                    if (!currentMatch.fn) {
                        currentMatch.fn = fn;
                    }
                }
                // Closing a block helper
                var startingElseSection = match[1] === 'else';
                if (currentMatch.isBlock &&
                    currentMatch.fn && (match[1] === "/".concat(currentMatch.fn) ||
                    startingElseSection)) {
                    if (!depth) { // === 0
                        var start = currentMatch.startInner, body = str.substr(start, match.index - start);
                        // Either closing without an else section, or when encountering
                        // an else section
                        if (currentMatch.body === void 0) {
                            currentMatch.body = body;
                            currentMatch.startInner = match.index + match[0].length;
                            // The body exists already, so this is the else section
                        }
                        else {
                            currentMatch.elseBody = body;
                        }
                        currentMatch.find += body + match[0];
                        if (!startingElseSection) {
                            matches.push(currentMatch);
                            currentMatch = void 0;
                        }
                    }
                    else if (!startingElseSection) {
                        depth--;
                    }
                    // Common expression
                }
                else if (!currentMatch.isBlock) {
                    matches.push(currentMatch);
                }
                // Evaluate sub-matches one by one to prevent orphaned block closers
                if (subMatch && !(currentMatch === null || currentMatch === void 0 ? void 0 : currentMatch.isBlock)) {
                    break;
                }
            }
            // Execute
            matches.forEach(function (match) {
                var body = match.body, elseBody = match.elseBody, expression = match.expression, fn = match.fn;
                var replacement, i;
                // Helper function
                if (fn) {
                    // Pass the helpers the amount of arguments defined by the function,
                    // then the match as the last argument.
                    var args = [match], parts = expression.split(' ');
                    i = helpers[fn].length;
                    while (i--) {
                        args.unshift(resolveProperty(parts[i + 1]));
                    }
                    replacement = helpers[fn].apply(ctx, args);
                    // Block helpers may return true or false. They may also return a
                    // string, like the `each` helper.
                    if (match.isBlock && typeof replacement === 'boolean') {
                        replacement = format(replacement ? body : elseBody, ctx);
                    }
                    // Simple variable replacement
                }
                else {
                    var valueAndFormat = expression.split(':');
                    replacement = resolveProperty(valueAndFormat.shift() || '');
                    // Format the replacement
                    if (valueAndFormat.length && typeof replacement === 'number') {
                        var segment = valueAndFormat.join(':');
                        if (floatRegex.test(segment)) { // float
                            var decimals = parseInt((segment.match(decRegex) || ['', '-1'])[1], 10);
                            if (replacement !== null) {
                                replacement = numberFormatter(replacement, decimals, lang.decimalPoint, segment.indexOf(',') > -1 ? lang.thousandsSep : '');
                            }
                        }
                        else {
                            replacement = time.dateFormat(segment, replacement);
                        }
                    }
                }
                str = str.replace(match.find, pick(replacement, ''));
            });
            return hasSub ? format(str, ctx, chart) : str;
        }
        /**
         * Format a number and return a string based on input settings.
         *
         * @sample highcharts/members/highcharts-numberformat/
         *         Custom number format
         *
         * @function Highcharts.numberFormat
         *
         * @param {number} number
         *        The input number to format.
         *
         * @param {number} decimals
         *        The amount of decimals. A value of -1 preserves the amount in the
         *        input number.
         *
         * @param {string} [decimalPoint]
         *        The decimal point, defaults to the one given in the lang options, or
         *        a dot.
         *
         * @param {string} [thousandsSep]
         *        The thousands separator, defaults to the one given in the lang
         *        options, or a space character.
         *
         * @return {string}
         *         The formatted number.
         */
        function numberFormat(number, decimals, decimalPoint, thousandsSep) {
            number = +number || 0;
            decimals = +decimals;
            var ret, fractionDigits;
            var lang = defaultOptions.lang, origDec = (number.toString().split('.')[1] || '').split('e')[0].length, exponent = number.toString().split('e'), firstDecimals = decimals;
            if (decimals === -1) {
                // Preserve decimals. Not huge numbers (#3793).
                decimals = Math.min(origDec, 20);
            }
            else if (!isNumber(decimals)) {
                decimals = 2;
            }
            else if (decimals && exponent[1] && exponent[1] < 0) {
                // Expose decimals from exponential notation (#7042)
                fractionDigits = decimals + +exponent[1];
                if (fractionDigits >= 0) {
                    // remove too small part of the number while keeping the notation
                    exponent[0] = (+exponent[0]).toExponential(fractionDigits)
                        .split('e')[0];
                    decimals = fractionDigits;
                }
                else {
                    // fractionDigits < 0
                    exponent[0] = exponent[0].split('.')[0] || 0;
                    if (decimals < 20) {
                        // use number instead of exponential notation (#7405)
                        number = (exponent[0] * Math.pow(10, exponent[1]))
                            .toFixed(decimals);
                    }
                    else {
                        // or zero
                        number = 0;
                    }
                    exponent[1] = 0;
                }
            }
            // Add another decimal to avoid rounding errors of float numbers. (#4573)
            // Then use toFixed to handle rounding.
            var roundedNumber = (Math.abs(exponent[1] ? exponent[0] : number) +
                Math.pow(10, -Math.max(decimals, origDec) - 1)).toFixed(decimals);
            // A string containing the positive integer component of the number
            var strinteger = String(pInt(roundedNumber));
            // Leftover after grouping into thousands. Can be 0, 1 or 2.
            var thousands = strinteger.length > 3 ? strinteger.length % 3 : 0;
            // Language
            decimalPoint = pick(decimalPoint, lang.decimalPoint);
            thousandsSep = pick(thousandsSep, lang.thousandsSep);
            // Start building the return
            ret = number < 0 ? '-' : '';
            // Add the leftover after grouping into thousands. For example, in the
            // number 42 000 000, this line adds 42.
            ret += thousands ? strinteger.substr(0, thousands) + thousandsSep : '';
            if (+exponent[1] < 0 && !firstDecimals) {
                ret = '0';
            }
            else {
                // Add the remaining thousands groups, joined by the thousands separator
                ret += strinteger
                    .substr(thousands)
                    .replace(/(\d{3})(?=\d)/g, '$1' + thousandsSep);
            }
            // Add the decimal point and the decimal component
            if (decimals) {
                // Get the decimal component
                ret += decimalPoint + roundedNumber.slice(-decimals);
            }
            if (exponent[1] && +ret !== 0) {
                ret += 'e' + exponent[1];
            }
            return ret;
        }
        /* *
         *
         *  Default Export
         *
         * */
        var Templating = {
            dateFormat: dateFormat,
            format: format,
            helpers: helpers,
            numberFormat: numberFormat
        };

        return Templating;
    });
    _registerModule(_modules, 'Core/Renderer/RendererUtilities.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Imports
         *
         * */
        var clamp = U.clamp, pick = U.pick, stableSort = U.stableSort;
        /* *
         *
         *  Namespace
         *
         * */
        var RendererUtilities;
        (function (RendererUtilities) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * General distribution algorithm for distributing labels of differing size
             * along a confined length in two dimensions. The algorithm takes an array
             * of objects containing a size, a target and a rank. It will place the
             * labels as close as possible to their targets, skipping the lowest ranked
             * labels if necessary.
             * @private
             */
            function distribute(boxes, len, maxDistance) {
                // Original array will be altered with added .pos
                var origBoxes = boxes, reducedLen = origBoxes.reducedLen || len, sortByRank = function (a, b) {
                    return (b.rank || 0) - (a.rank || 0);
                }, sortByTarget = function (a, b) {
                    return a.target - b.target;
                };
                var i, overlapping = true, restBoxes = [], // The outranked overshoot
                box, target, total = 0;
                // If the total size exceeds the len, remove those boxes with the lowest
                // rank
                i = boxes.length;
                while (i--) {
                    total += boxes[i].size;
                }
                // Sort by rank, then slice away overshoot
                if (total > reducedLen) {
                    stableSort(boxes, sortByRank);
                    i = 0;
                    total = 0;
                    while (total <= reducedLen) {
                        total += boxes[i].size;
                        i++;
                    }
                    restBoxes = boxes.splice(i - 1, boxes.length);
                }
                // Order by target
                stableSort(boxes, sortByTarget);
                // So far we have been mutating the original array. Now
                // create a copy with target arrays
                boxes = boxes.map(function (box) { return ({
                    size: box.size,
                    targets: [box.target],
                    align: pick(box.align, 0.5)
                }); });
                while (overlapping) {
                    // Initial positions: target centered in box
                    i = boxes.length;
                    while (i--) {
                        box = boxes[i];
                        // Composite box, average of targets
                        target = (Math.min.apply(0, box.targets) +
                            Math.max.apply(0, box.targets)) / 2;
                        box.pos = clamp(target - box.size * box.align, 0, len - box.size);
                    }
                    // Detect overlap and join boxes
                    i = boxes.length;
                    overlapping = false;
                    while (i--) {
                        // Overlap
                        if (i > 0 &&
                            boxes[i - 1].pos + boxes[i - 1].size >
                                boxes[i].pos) {
                            // Add this size to the previous box
                            boxes[i - 1].size += boxes[i].size;
                            boxes[i - 1].targets = boxes[i - 1]
                                .targets
                                .concat(boxes[i].targets);
                            boxes[i - 1].align = 0.5;
                            // Overlapping right, push left
                            if (boxes[i - 1].pos + boxes[i - 1].size > len) {
                                boxes[i - 1].pos = len - boxes[i - 1].size;
                            }
                            boxes.splice(i, 1); // Remove this item
                            overlapping = true;
                        }
                    }
                }
                // Add the rest (hidden boxes)
                origBoxes.push.apply(origBoxes, restBoxes);
                // Now the composite boxes are placed, we need to put the original boxes
                // within them
                i = 0;
                boxes.some(function (box) {
                    var posInCompositeBox = 0;
                    // Exceeded maxDistance => abort
                    return (box.targets || []).some(function () {
                        origBoxes[i].pos = box.pos + posInCompositeBox;
                        // If the distance between the position and the target exceeds
                        // maxDistance, abort the loop and decrease the length in
                        // increments of 10% to recursively reduce the  number of
                        // visible boxes by rank. Once all boxes are within the
                        // maxDistance, we're good.
                        if (typeof maxDistance !== 'undefined' &&
                            Math.abs(origBoxes[i].pos - origBoxes[i].target) > maxDistance) {
                            // Reset the positions that are already set
                            origBoxes
                                .slice(0, i + 1)
                                .forEach(function (box) { return delete box.pos; });
                            // Try with a smaller length
                            origBoxes.reducedLen =
                                (origBoxes.reducedLen || len) - (len * 0.1);
                            // Recurse
                            if (origBoxes.reducedLen > len * 0.1) {
                                distribute(origBoxes, len, maxDistance);
                            }
                            // Exceeded maxDistance => abort
                            return true;
                        }
                        posInCompositeBox += origBoxes[i].size;
                        i++;
                        return false;
                    });
                });
                // Add the rest (hidden) boxes and sort by target
                stableSort(origBoxes, sortByTarget);
                return origBoxes;
            }
            RendererUtilities.distribute = distribute;
        })(RendererUtilities || (RendererUtilities = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return RendererUtilities;
    });
    _registerModule(_modules, 'Core/Renderer/SVG/SVGElement.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Color/Color.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (A, Color, H, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var animate = A.animate, animObject = A.animObject, stop = A.stop;
        var deg2rad = H.deg2rad, doc = H.doc, noop = H.noop, svg = H.svg, SVG_NS = H.SVG_NS, win = H.win;
        var addEvent = U.addEvent, attr = U.attr, createElement = U.createElement, css = U.css, defined = U.defined, erase = U.erase, extend = U.extend, fireEvent = U.fireEvent, isArray = U.isArray, isFunction = U.isFunction, isObject = U.isObject, isString = U.isString, merge = U.merge, objectEach = U.objectEach, pick = U.pick, pInt = U.pInt, syncTimeout = U.syncTimeout, uniqueKey = U.uniqueKey;
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The SVGElement prototype is a JavaScript wrapper for SVG elements used in the
         * rendering layer of Highcharts. Combined with the
         * {@link Highcharts.SVGRenderer}
         * object, these prototypes allow freeform annotation in the charts or even in
         * HTML pages without instanciating a chart. The SVGElement can also wrap HTML
         * labels, when `text` or `label` elements are created with the `useHTML`
         * parameter.
         *
         * The SVGElement instances are created through factory functions on the
         * {@link Highcharts.SVGRenderer}
         * object, like
         * {@link Highcharts.SVGRenderer#rect|rect},
         * {@link Highcharts.SVGRenderer#path|path},
         * {@link Highcharts.SVGRenderer#text|text},
         * {@link Highcharts.SVGRenderer#label|label},
         * {@link Highcharts.SVGRenderer#g|g}
         * and more.
         *
         * @class
         * @name Highcharts.SVGElement
         */
        var SVGElement = /** @class */ (function () {
            function SVGElement() {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.element = void 0;
                this.onEvents = {};
                this.opacity = 1; // Default base for animation
                this.renderer = void 0;
                this.SVG_NS = SVG_NS;
            }
            // @todo public zIndex?: number;
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Get the current value of an attribute or pseudo attribute,
             * used mainly for animation. Called internally from
             * the {@link Highcharts.SVGRenderer#attr} function.
             *
             * @private
             * @function Highcharts.SVGElement#_defaultGetter
             *
             * @param {string} key
             *        Property key.
             *
             * @return {number|string}
             *         Property value.
             */
            SVGElement.prototype._defaultGetter = function (key) {
                var ret = pick(this[key + 'Value'], // align getter
                this[key], this.element ? this.element.getAttribute(key) : null, 0);
                if (/^[\-0-9\.]+$/.test(ret)) { // is numerical
                    ret = parseFloat(ret);
                }
                return ret;
            };
            /**
             * @private
             * @function Highcharts.SVGElement#_defaultSetter
             *
             * @param {string} value
             *
             * @param {string} key
             *
             * @param {Highcharts.SVGDOMElement} element
             *
             */
            SVGElement.prototype._defaultSetter = function (value, key, element) {
                element.setAttribute(key, value);
            };
            /**
             * Add the element to the DOM. All elements must be added this way.
             *
             * @sample highcharts/members/renderer-g
             *         Elements added to a group
             *
             * @function Highcharts.SVGElement#add
             *
             * @param {Highcharts.SVGElement} [parent]
             *        The parent item to add it to. If undefined, the element is added
             *        to the {@link Highcharts.SVGRenderer.box}.
             *
             * @return {Highcharts.SVGElement}
             *         Returns the SVGElement for chaining.
             */
            SVGElement.prototype.add = function (parent) {
                var renderer = this.renderer, element = this.element;
                var inserted;
                if (parent) {
                    this.parentGroup = parent;
                }
                // Build formatted text
                if (typeof this.textStr !== 'undefined' &&
                    this.element.nodeName === 'text' // Not for SVGLabel instances
                ) {
                    renderer.buildText(this);
                }
                // Mark as added
                this.added = true;
                // If we're adding to renderer root, or other elements in the group
                // have a z index, we need to handle it
                if (!parent || parent.handleZ || this.zIndex) {
                    inserted = this.zIndexSetter();
                }
                // If zIndex is not handled, append at the end
                if (!inserted) {
                    (parent ?
                        parent.element :
                        renderer.box).appendChild(element);
                }
                // fire an event for internal hooks
                if (this.onAdd) {
                    this.onAdd();
                }
                return this;
            };
            /**
             * Add a class name to an element.
             *
             * @function Highcharts.SVGElement#addClass
             *
             * @param {string} className
             * The new class name to add.
             *
             * @param {boolean} [replace=false]
             * When true, the existing class name(s) will be overwritten with the new
             * one. When false, the new one is added.
             *
             * @return {Highcharts.SVGElement}
             * Return the SVG element for chainability.
             */
            SVGElement.prototype.addClass = function (className, replace) {
                var currentClassName = replace ? '' : (this.attr('class') || '');
                // Trim the string and remove duplicates
                className = (className || '')
                    .split(/ /g)
                    .reduce(function (newClassName, name) {
                    if (currentClassName.indexOf(name) === -1) {
                        newClassName.push(name);
                    }
                    return newClassName;
                }, (currentClassName ?
                    [currentClassName] :
                    []))
                    .join(' ');
                if (className !== currentClassName) {
                    this.attr('class', className);
                }
                return this;
            };
            /**
             * This method is executed in the end of `attr()`, after setting all
             * attributes in the hash. In can be used to efficiently consolidate
             * multiple attributes in one SVG property -- e.g., translate, rotate and
             * scale are merged in one "transform" attribute in the SVG node.
             *
             * @private
             * @function Highcharts.SVGElement#afterSetters
             */
            SVGElement.prototype.afterSetters = function () {
                // Update transform. Do this outside the loop to prevent redundant
                // updating for batch setting of attributes.
                if (this.doTransform) {
                    this.updateTransform();
                    this.doTransform = false;
                }
            };
            /**
             * Align the element relative to the chart or another box.
             *
             * @function Highcharts.SVGElement#align
             *
             * @param {Highcharts.AlignObject} [alignOptions]
             *        The alignment options. The function can be called without this
             *        parameter in order to re-align an element after the box has been
             *        updated.
             *
             * @param {boolean} [alignByTranslate]
             *        Align element by translation.
             *
             * @param {string|Highcharts.BBoxObject} [box]
             *        The box to align to, needs a width and height. When the box is a
             *        string, it refers to an object in the Renderer. For example, when
             *        box is `spacingBox`, it refers to `Renderer.spacingBox` which
             *        holds `width`, `height`, `x` and `y` properties.
             *
             * @return {Highcharts.SVGElement} Returns the SVGElement for chaining.
             */
            SVGElement.prototype.align = function (alignOptions, alignByTranslate, box) {
                var attribs = {}, renderer = this.renderer, alignedObjects = renderer.alignedObjects;
                var x, y, alignTo, alignFactor, vAlignFactor;
                // First call on instanciate
                if (alignOptions) {
                    this.alignOptions = alignOptions;
                    this.alignByTranslate = alignByTranslate;
                    if (!box || isString(box)) {
                        this.alignTo = alignTo = box || 'renderer';
                        // prevent duplicates, like legendGroup after resize
                        erase(alignedObjects, this);
                        alignedObjects.push(this);
                        box = void 0; // reassign it below
                    }
                    // When called on resize, no arguments are supplied
                }
                else {
                    alignOptions = this.alignOptions;
                    alignByTranslate = this.alignByTranslate;
                    alignTo = this.alignTo;
                }
                box = pick(box, renderer[alignTo], alignTo === 'scrollablePlotBox' ?
                    renderer.plotBox : void 0, renderer);
                // Assign variables
                var align = alignOptions.align, vAlign = alignOptions.verticalAlign;
                // default: left align
                x = (box.x || 0) + (alignOptions.x || 0);
                // default: top align
                y = (box.y || 0) + (alignOptions.y || 0);
                // Align
                if (align === 'right') {
                    alignFactor = 1;
                }
                else if (align === 'center') {
                    alignFactor = 2;
                }
                if (alignFactor) {
                    x += (box.width - (alignOptions.width || 0)) /
                        alignFactor;
                }
                attribs[alignByTranslate ? 'translateX' : 'x'] = Math.round(x);
                // Vertical align
                if (vAlign === 'bottom') {
                    vAlignFactor = 1;
                }
                else if (vAlign === 'middle') {
                    vAlignFactor = 2;
                }
                if (vAlignFactor) {
                    y += (box.height - (alignOptions.height || 0)) /
                        vAlignFactor;
                }
                attribs[alignByTranslate ? 'translateY' : 'y'] = Math.round(y);
                // Animate only if already placed
                this[this.placed ? 'animate' : 'attr'](attribs);
                this.placed = true;
                this.alignAttr = attribs;
                return this;
            };
            /**
             * @private
             * @function Highcharts.SVGElement#alignSetter
             * @param {"left"|"center"|"right"} value
             */
            SVGElement.prototype.alignSetter = function (value) {
                var convert = {
                    left: 'start',
                    center: 'middle',
                    right: 'end'
                };
                if (convert[value]) {
                    this.alignValue = value;
                    this.element.setAttribute('text-anchor', convert[value]);
                }
            };
            /**
             * Animate to given attributes or CSS properties.
             *
             * @sample highcharts/members/element-on/
             *         Setting some attributes by animation
             *
             * @function Highcharts.SVGElement#animate
             *
             * @param {Highcharts.SVGAttributes} params
             *        SVG attributes or CSS to animate.
             *
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [options]
             *        Animation options.
             *
             * @param {Function} [complete]
             *        Function to perform at the end of animation.
             *
             * @return {Highcharts.SVGElement}
             *         Returns the SVGElement for chaining.
             */
            SVGElement.prototype.animate = function (params, options, complete) {
                var _this = this;
                var animOptions = animObject(pick(options, this.renderer.globalAnimation, true)), deferTime = animOptions.defer;
                // When the page is hidden save resources in the background by not
                // running animation at all (#9749).
                if (doc.hidden) {
                    animOptions.duration = 0;
                }
                if (animOptions.duration !== 0) {
                    // allows using a callback with the global animation without
                    // overwriting it
                    if (complete) {
                        animOptions.complete = complete;
                    }
                    // If defer option is defined delay the animation #12901
                    syncTimeout(function () {
                        if (_this.element) {
                            animate(_this, params, animOptions);
                        }
                    }, deferTime);
                }
                else {
                    this.attr(params, void 0, complete || animOptions.complete);
                    // Call the end step synchronously
                    objectEach(params, function (val, prop) {
                        if (animOptions.step) {
                            animOptions.step.call(this, val, { prop: prop, pos: 1, elem: this });
                        }
                    }, this);
                }
                return this;
            };
            /**
             * Apply a text outline through a custom CSS property, by copying the text
             * element and apply stroke to the copy. Used internally. Contrast checks at
             * [example](https://jsfiddle.net/highcharts/43soe9m1/2/).
             *
             * @example
             * // Specific color
             * text.css({
             *    textOutline: '1px black'
             * });
             * // Automatic contrast
             * text.css({
             *    color: '#000000', // black text
             *    textOutline: '1px contrast' // => white outline
             * });
             *
             * @private
             * @function Highcharts.SVGElement#applyTextOutline
             *
             * @param {string} textOutline
             *        A custom CSS `text-outline` setting, defined by `width color`.
             */
            SVGElement.prototype.applyTextOutline = function (textOutline) {
                var elem = this.element, hasContrast = textOutline.indexOf('contrast') !== -1, styles = {};
                // When the text shadow is set to contrast, use dark stroke for light
                // text and vice versa.
                if (hasContrast) {
                    styles.textOutline = textOutline = textOutline.replace(/contrast/g, this.renderer.getContrast(elem.style.fill));
                }
                // Extract the stroke width and color
                var parts = textOutline.split(' ');
                var color = parts[parts.length - 1];
                var strokeWidth = parts[0];
                if (strokeWidth && strokeWidth !== 'none' && H.svg) {
                    this.fakeTS = true; // Fake text shadow
                    // Since the stroke is applied on center of the actual outline, we
                    // need to double it to get the correct stroke-width outside the
                    // glyphs.
                    strokeWidth = strokeWidth.replace(/(^[\d\.]+)(.*?)$/g, function (match, digit, unit) {
                        return (2 * Number(digit)) + unit;
                    });
                    // Remove shadows from previous runs.
                    this.removeTextOutline();
                    var outline_1 = doc.createElementNS(SVG_NS, 'tspan');
                    attr(outline_1, {
                        'class': 'highcharts-text-outline',
                        fill: color,
                        stroke: color,
                        'stroke-width': strokeWidth,
                        'stroke-linejoin': 'round'
                    });
                    // For each of the tspans and text nodes, create a copy in the
                    // outline.
                    var parentElem = elem.querySelector('textPath') || elem;
                    [].forEach.call(parentElem.childNodes, function (childNode) {
                        var clone = childNode.cloneNode(true);
                        if (clone.removeAttribute) {
                            ['fill', 'stroke', 'stroke-width', 'stroke'].forEach(function (prop) { return clone
                                .removeAttribute(prop); });
                        }
                        outline_1.appendChild(clone);
                    });
                    // Collect the sum of dy from all children, included nested ones
                    var totalHeight_1 = 0;
                    [].forEach.call(parentElem.querySelectorAll('text tspan'), function (element) {
                        totalHeight_1 += Number(element.getAttribute('dy'));
                    });
                    // Insert an absolutely positioned break before the original text
                    // to keep it in place
                    var br = doc.createElementNS(SVG_NS, 'tspan');
                    br.textContent = '\u200B';
                    // Reset the position for the following text
                    attr(br, {
                        x: Number(elem.getAttribute('x')),
                        dy: -totalHeight_1
                    });
                    // Insert the outline
                    outline_1.appendChild(br);
                    parentElem.insertBefore(outline_1, parentElem.firstChild);
                }
            };
            /**
             * @function Highcharts.SVGElement#attr
             * @param {string} key
             * @return {number|string}
             */ /**
            * Apply native and custom attributes to the SVG elements.
            *
            * In order to set the rotation center for rotation, set x and y to 0 and
            * use `translateX` and `translateY` attributes to position the element
            * instead.
            *
            * Attributes frequently used in Highcharts are `fill`, `stroke`,
            * `stroke-width`.
            *
            * @sample highcharts/members/renderer-rect/
            *         Setting some attributes
            *
            * @example
            * // Set multiple attributes
            * element.attr({
            *     stroke: 'red',
            *     fill: 'blue',
            *     x: 10,
            *     y: 10
            * });
            *
            * // Set a single attribute
            * element.attr('stroke', 'red');
            *
            * // Get an attribute
            * element.attr('stroke'); // => 'red'
            *
            * @function Highcharts.SVGElement#attr
            *
            * @param {string|Highcharts.SVGAttributes} [hash]
            *        The native and custom SVG attributes.
            *
            * @param {number|string|Highcharts.SVGPathArray} [val]
            *        If the type of the first argument is `string`, the second can be a
            *        value, which will serve as a single attribute setter. If the first
            *        argument is a string and the second is undefined, the function
            *        serves as a getter and the current value of the property is
            *        returned.
            *
            * @param {Function} [complete]
            *        A callback function to execute after setting the attributes. This
            *        makes the function compliant and interchangeable with the
            *        {@link SVGElement#animate} function.
            *
            * @param {boolean} [continueAnimation=true]
            *        Used internally when `.attr` is called as part of an animation
            *        step. Otherwise, calling `.attr` for an attribute will stop
            *        animation for that attribute.
            *
            * @return {Highcharts.SVGElement}
            *         If used as a setter, it returns the current
            *         {@link Highcharts.SVGElement} so the calls can be chained. If
            *         used as a getter, the current value of the attribute is returned.
            */
            SVGElement.prototype.attr = function (hash, val, complete, continueAnimation) {
                var element = this.element, symbolCustomAttribs = SVGElement.symbolCustomAttribs;
                var key, hasSetSymbolSize, ret = this, skipAttr, setter;
                // single key-value pair
                if (typeof hash === 'string' && typeof val !== 'undefined') {
                    key = hash;
                    hash = {};
                    hash[key] = val;
                }
                // used as a getter: first argument is a string, second is undefined
                if (typeof hash === 'string') {
                    ret = (this[hash + 'Getter'] ||
                        this._defaultGetter).call(this, hash, element);
                    // setter
                }
                else {
                    objectEach(hash, function eachAttribute(val, key) {
                        skipAttr = false;
                        // Unless .attr is from the animator update, stop current
                        // running animation of this property
                        if (!continueAnimation) {
                            stop(this, key);
                        }
                        // Special handling of symbol attributes
                        if (this.symbolName &&
                            symbolCustomAttribs.indexOf(key) !== -1) {
                            if (!hasSetSymbolSize) {
                                this.symbolAttr(hash);
                                hasSetSymbolSize = true;
                            }
                            skipAttr = true;
                        }
                        if (this.rotation && (key === 'x' || key === 'y')) {
                            this.doTransform = true;
                        }
                        if (!skipAttr) {
                            setter = (this[key + 'Setter'] ||
                                this._defaultSetter);
                            setter.call(this, val, key, element);
                        }
                    }, this);
                    this.afterSetters();
                }
                // In accordance with animate, run a complete callback
                if (complete) {
                    complete.call(this);
                }
                return ret;
            };
            /**
             * Apply a clipping rectangle to this element.
             *
             * @function Highcharts.SVGElement#clip
             *
             * @param {Highcharts.ClipRectElement} [clipRect]
             *        The clipping rectangle. If skipped, the current clip is removed.
             *
             * @return {Highcharts.SVGElement}
             *         Returns the SVG element to allow chaining.
             */
            SVGElement.prototype.clip = function (clipRect) {
                return this.attr('clip-path', clipRect ?
                    'url(' + this.renderer.url + '#' + clipRect.id + ')' :
                    'none');
            };
            /**
             * Calculate the coordinates needed for drawing a rectangle crisply and
             * return the calculated attributes.
             *
             * @function Highcharts.SVGElement#crisp
             *
             * @param {Highcharts.RectangleObject} rect
             * Rectangle to crisp.
             *
             * @param {number} [strokeWidth]
             * The stroke width to consider when computing crisp positioning. It can
             * also be set directly on the rect parameter.
             *
             * @return {Highcharts.RectangleObject}
             * The modified rectangle arguments.
             */
            SVGElement.prototype.crisp = function (rect, strokeWidth) {
                var wrapper = this;
                strokeWidth = strokeWidth || rect.strokeWidth || 0;
                // Math.round because strokeWidth can sometimes have roundoff errors
                var normalizer = Math.round(strokeWidth) % 2 / 2;
                // normalize for crisp edges
                rect.x = Math.floor(rect.x || wrapper.x || 0) + normalizer;
                rect.y = Math.floor(rect.y || wrapper.y || 0) + normalizer;
                rect.width = Math.floor((rect.width || wrapper.width || 0) - 2 * normalizer);
                rect.height = Math.floor((rect.height || wrapper.height || 0) - 2 * normalizer);
                if (defined(rect.strokeWidth)) {
                    rect.strokeWidth = strokeWidth;
                }
                return rect;
            };
            /**
             * Build and apply an SVG gradient out of a common JavaScript configuration
             * object. This function is called from the attribute setters. An event
             * hook is added for supporting other complex color types.
             *
             * @private
             * @function Highcharts.SVGElement#complexColor
             *
             * @param {Highcharts.GradientColorObject|Highcharts.PatternObject} colorOptions
             * The gradient or pattern options structure.
             *
             * @param {string} prop
             * The property to apply, can either be `fill` or `stroke`.
             *
             * @param {Highcharts.SVGDOMElement} elem
             * SVG element to apply the gradient on.
             */
            SVGElement.prototype.complexColor = function (colorOptions, prop, elem) {
                var renderer = this.renderer;
                var colorObject, gradName, gradAttr, radAttr, gradients, stops, stopColor, stopOpacity, radialReference, id, key = [], value;
                fireEvent(this.renderer, 'complexColor', {
                    args: arguments
                }, function () {
                    // Apply linear or radial gradients
                    if (colorOptions.radialGradient) {
                        gradName = 'radialGradient';
                    }
                    else if (colorOptions.linearGradient) {
                        gradName = 'linearGradient';
                    }
                    if (gradName) {
                        gradAttr = colorOptions[gradName];
                        gradients = renderer.gradients;
                        stops = colorOptions.stops;
                        radialReference = elem.radialReference;
                        // Keep < 2.2 kompatibility
                        if (isArray(gradAttr)) {
                            colorOptions[gradName] = gradAttr = {
                                x1: gradAttr[0],
                                y1: gradAttr[1],
                                x2: gradAttr[2],
                                y2: gradAttr[3],
                                gradientUnits: 'userSpaceOnUse'
                            };
                        }
                        // Correct the radial gradient for the radial reference system
                        if (gradName === 'radialGradient' &&
                            radialReference &&
                            !defined(gradAttr.gradientUnits)) {
                            // Save the radial attributes for updating
                            radAttr = gradAttr;
                            gradAttr = merge(gradAttr, renderer.getRadialAttr(radialReference, radAttr), { gradientUnits: 'userSpaceOnUse' });
                        }
                        // Build the unique key to detect whether we need to create a
                        // new element (#1282)
                        objectEach(gradAttr, function (value, n) {
                            if (n !== 'id') {
                                key.push(n, value);
                            }
                        });
                        objectEach(stops, function (val) {
                            key.push(val);
                        });
                        key = key.join(',');
                        // Check if a gradient object with the same config object is
                        // created within this renderer
                        if (gradients[key]) {
                            id = gradients[key].attr('id');
                        }
                        else {
                            // Set the id and create the element
                            gradAttr.id = id = uniqueKey();
                            var gradientObject_1 = gradients[key] =
                                renderer.createElement(gradName)
                                    .attr(gradAttr)
                                    .add(renderer.defs);
                            gradientObject_1.radAttr = radAttr;
                            // The gradient needs to keep a list of stops to be able to
                            // destroy them
                            gradientObject_1.stops = [];
                            stops.forEach(function (stop) {
                                if (stop[1].indexOf('rgba') === 0) {
                                    colorObject = Color.parse(stop[1]);
                                    stopColor = colorObject.get('rgb');
                                    stopOpacity = colorObject.get('a');
                                }
                                else {
                                    stopColor = stop[1];
                                    stopOpacity = 1;
                                }
                                var stopObject = renderer.createElement('stop').attr({
                                    offset: stop[0],
                                    'stop-color': stopColor,
                                    'stop-opacity': stopOpacity
                                }).add(gradientObject_1);
                                // Add the stop element to the gradient
                                gradientObject_1.stops.push(stopObject);
                            });
                        }
                        // Set the reference to the gradient object
                        value = 'url(' + renderer.url + '#' + id + ')';
                        elem.setAttribute(prop, value);
                        elem.gradient = key;
                        // Allow the color to be concatenated into tooltips formatters
                        // etc. (#2995)
                        colorOptions.toString = function () {
                            return value;
                        };
                    }
                });
            };
            /**
             * Set styles for the element. In addition to CSS styles supported by
             * native SVG and HTML elements, there are also some custom made for
             * Highcharts, like `width`, `ellipsis` and `textOverflow` for SVG text
             * elements.
             *
             * @sample highcharts/members/renderer-text-on-chart/
             *         Styled text
             *
             * @function Highcharts.SVGElement#css
             *
             * @param {Highcharts.CSSObject} styles
             *        The new CSS styles.
             *
             * @return {Highcharts.SVGElement}
             *         Return the SVG element for chaining.
             */
            SVGElement.prototype.css = function (styles) {
                var oldStyles = this.styles, newStyles = {}, elem = this.element;
                var textWidth, hasNew = !oldStyles;
                // Filter out existing styles to increase performance (#2640)
                if (oldStyles) {
                    objectEach(styles, function (value, n) {
                        if (oldStyles && oldStyles[n] !== value) {
                            newStyles[n] = value;
                            hasNew = true;
                        }
                    });
                }
                if (hasNew) {
                    // Merge the new styles with the old ones
                    if (oldStyles) {
                        styles = extend(oldStyles, newStyles);
                    }
                    // Get the text width from style
                    // Previously set, unset it (#8234)
                    if (styles.width === null || styles.width === 'auto') {
                        delete this.textWidth;
                        // Apply new
                    }
                    else if (elem.nodeName.toLowerCase() === 'text' &&
                        styles.width) {
                        textWidth = this.textWidth = pInt(styles.width);
                    }
                    // store object
                    this.styles = styles;
                    if (textWidth && (!svg && this.renderer.forExport)) {
                        delete styles.width;
                    }
                    var stylesToApply_1 = merge(styles);
                    if (elem.namespaceURI === this.SVG_NS) {
                        // These CSS properties are interpreted internally by the SVG
                        // renderer, but are not supported by SVG and should not be
                        // added to the DOM. In styled mode, no CSS should find its way
                        // to the DOM whatsoever (#6173, #6474).
                        ['textOutline', 'textOverflow', 'width'].forEach(function (key) { return (stylesToApply_1 &&
                            delete stylesToApply_1[key]); });
                        // SVG requires fill for text
                        if (stylesToApply_1.color) {
                            stylesToApply_1.fill = stylesToApply_1.color;
                        }
                    }
                    css(elem, stylesToApply_1);
                }
                if (this.added) {
                    // Rebuild text after added. Cache mechanisms in the buildText will
                    // prevent building if there are no significant changes.
                    if (this.element.nodeName === 'text') {
                        this.renderer.buildText(this);
                    }
                    // Apply text outline after added
                    if (styles.textOutline) {
                        this.applyTextOutline(styles.textOutline);
                    }
                }
                return this;
            };
            /**
             * @private
             * @function Highcharts.SVGElement#dashstyleSetter
             * @param {string} value
             */
            SVGElement.prototype.dashstyleSetter = function (value) {
                var i, strokeWidth = this['stroke-width'];
                // If "inherit", like maps in IE, assume 1 (#4981). With HC5 and the new
                // strokeWidth function, we should be able to use that instead.
                if (strokeWidth === 'inherit') {
                    strokeWidth = 1;
                }
                value = value && value.toLowerCase();
                if (value) {
                    var v = value
                        .replace('shortdashdotdot', '3,1,1,1,1,1,')
                        .replace('shortdashdot', '3,1,1,1')
                        .replace('shortdot', '1,1,')
                        .replace('shortdash', '3,1,')
                        .replace('longdash', '8,3,')
                        .replace(/dot/g, '1,3,')
                        .replace('dash', '4,3,')
                        .replace(/,$/, '')
                        .split(','); // ending comma
                    i = v.length;
                    while (i--) {
                        v[i] = '' + (pInt(v[i]) * pick(strokeWidth, NaN));
                    }
                    value = v.join(',').replace(/NaN/g, 'none'); // #3226
                    this.element.setAttribute('stroke-dasharray', value);
                }
            };
            /**
             * Destroy the element and element wrapper and clear up the DOM and event
             * hooks.
             *
             * @function Highcharts.SVGElement#destroy
             */
            SVGElement.prototype.destroy = function () {
                var wrapper = this, element = wrapper.element || {}, renderer = wrapper.renderer, ownerSVGElement = element.ownerSVGElement;
                var parentToClean = (element.nodeName === 'SPAN' &&
                    wrapper.parentGroup ||
                    void 0), grandParent, i;
                // remove events
                element.onclick = element.onmouseout = element.onmouseover =
                    element.onmousemove = element.point = null;
                stop(wrapper); // stop running animations
                if (wrapper.clipPath && ownerSVGElement) {
                    var clipPath_1 = wrapper.clipPath;
                    // Look for existing references to this clipPath and remove them
                    // before destroying the element (#6196).
                    // The upper case version is for Edge
                    [].forEach.call(ownerSVGElement.querySelectorAll('[clip-path],[CLIP-PATH]'), function (el) {
                        if (el.getAttribute('clip-path').indexOf(clipPath_1.element.id) > -1) {
                            el.removeAttribute('clip-path');
                        }
                    });
                    wrapper.clipPath = clipPath_1.destroy();
                }
                // Destroy stops in case this is a gradient object @todo old code?
                if (wrapper.stops) {
                    for (i = 0; i < wrapper.stops.length; i++) {
                        wrapper.stops[i].destroy();
                    }
                    wrapper.stops.length = 0;
                    wrapper.stops = void 0;
                }
                // remove element
                wrapper.safeRemoveChild(element);
                // In case of useHTML, clean up empty containers emulating SVG groups
                // (#1960, #2393, #2697).
                while (parentToClean &&
                    parentToClean.div &&
                    parentToClean.div.childNodes.length === 0) {
                    grandParent = parentToClean.parentGroup;
                    wrapper.safeRemoveChild(parentToClean.div);
                    delete parentToClean.div;
                    parentToClean = grandParent;
                }
                // remove from alignObjects
                if (wrapper.alignTo) {
                    erase(renderer.alignedObjects, wrapper);
                }
                objectEach(wrapper, function (val, key) {
                    // Destroy child elements of a group
                    if (wrapper[key] &&
                        wrapper[key].parentGroup === wrapper &&
                        wrapper[key].destroy) {
                        wrapper[key].destroy();
                    }
                    // Delete all properties
                    delete wrapper[key];
                });
                return;
            };
            /**
             * @private
             * @function Highcharts.SVGElement#dSettter
             * @param {number|string|Highcharts.SVGPathArray} value
             * @param {string} key
             * @param {Highcharts.SVGDOMElement} element
             */
            SVGElement.prototype.dSetter = function (value, key, element) {
                if (isArray(value)) {
                    // Backwards compatibility, convert one-dimensional array into an
                    // array of segments
                    if (typeof value[0] === 'string') {
                        value = this.renderer.pathToSegments(value);
                    }
                    this.pathArray = value;
                    value = value.reduce(function (acc, seg, i) {
                        if (!seg || !seg.join) {
                            return (seg || '').toString();
                        }
                        return (i ? acc + ' ' : '') + seg.join(' ');
                    }, '');
                }
                if (/(NaN| {2}|^$)/.test(value)) {
                    value = 'M 0 0';
                }
                // Check for cache before resetting. Resetting causes disturbance in the
                // DOM, causing flickering in some cases in Edge/IE (#6747). Also
                // possible performance gain.
                if (this[key] !== value) {
                    element.setAttribute(key, value);
                    this[key] = value;
                }
            };
            /**
             * Fade out an element by animating its opacity down to 0, and hide it on
             * complete. Used internally for the tooltip.
             *
             * @function Highcharts.SVGElement#fadeOut
             *
             * @param {number} [duration=150]
             * The fade duration in milliseconds.
             */
            SVGElement.prototype.fadeOut = function (duration) {
                var elemWrapper = this;
                elemWrapper.animate({
                    opacity: 0
                }, {
                    duration: pick(duration, 150),
                    complete: function () {
                        // #3088, assuming we're only using this for tooltips
                        elemWrapper.hide();
                    }
                });
            };
            /**
             * @private
             * @function Highcharts.SVGElement#fillSetter
             * @param {Highcharts.ColorType} value
             * @param {string} key
             * @param {Highcharts.SVGDOMElement} element
             */
            SVGElement.prototype.fillSetter = function (value, key, element) {
                if (typeof value === 'string') {
                    element.setAttribute(key, value);
                }
                else if (value) {
                    this.complexColor(value, key, element);
                }
            };
            /**
             * Get the bounding box (width, height, x and y) for the element. Generally
             * used to get rendered text size. Since this is called a lot in charts,
             * the results are cached based on text properties, in order to save DOM
             * traffic. The returned bounding box includes the rotation, so for example
             * a single text line of rotation 90 will report a greater height, and a
             * width corresponding to the line-height.
             *
             * @sample highcharts/members/renderer-on-chart/
             *         Draw a rectangle based on a text's bounding box
             *
             * @function Highcharts.SVGElement#getBBox
             *
             * @param {boolean} [reload]
             *        Skip the cache and get the updated DOM bouding box.
             *
             * @param {number} [rot]
             *        Override the element's rotation. This is internally used on axis
             *        labels with a value of 0 to find out what the bounding box would
             *        be have been if it were not rotated.
             *
             * @return {Highcharts.BBoxObject}
             *         The bounding box with `x`, `y`, `width` and `height` properties.
             */
            SVGElement.prototype.getBBox = function (reload, rot) {
                var wrapper = this, alignValue = wrapper.alignValue, element = wrapper.element, renderer = wrapper.renderer, styles = wrapper.styles, textStr = wrapper.textStr, cache = renderer.cache, cacheKeys = renderer.cacheKeys, isSVG = element.namespaceURI === wrapper.SVG_NS, rotation = pick(rot, wrapper.rotation, 0), fontSize = renderer.styledMode ? (element &&
                    SVGElement.prototype.getStyle.call(element, 'font-size')) : (styles && styles.fontSize);
                var bBox, width, height, toggleTextShadowShim, cacheKey;
                // Avoid undefined and null (#7316)
                if (defined(textStr)) {
                    cacheKey = textStr.toString();
                    // Since numbers are monospaced, and numerical labels appear a lot
                    // in a chart, we assume that a label of n characters has the same
                    // bounding box as others of the same length. Unless there is inner
                    // HTML in the label. In that case, leave the numbers as is (#5899).
                    if (cacheKey.indexOf('<') === -1) {
                        cacheKey = cacheKey.replace(/[0-9]/g, '0');
                    }
                    // Properties that affect bounding box
                    cacheKey += [
                        '',
                        renderer.rootFontSize,
                        fontSize,
                        rotation,
                        wrapper.textWidth,
                        alignValue,
                        styles && styles.textOverflow,
                        styles && styles.fontWeight // #12163
                    ].join(',');
                }
                if (cacheKey && !reload) {
                    bBox = cache[cacheKey];
                }
                // No cache found
                if (!bBox) {
                    // SVG elements
                    if (isSVG || renderer.forExport) {
                        try { // Fails in Firefox if the container has display: none.
                            // When the text shadow shim is used, we need to hide the
                            // fake shadows to get the correct bounding box (#3872)
                            toggleTextShadowShim = this.fakeTS && function (display) {
                                var outline = element.querySelector('.highcharts-text-outline');
                                if (outline) {
                                    css(outline, { display: display });
                                }
                            };
                            // Workaround for #3842, Firefox reporting wrong bounding
                            // box for shadows
                            if (isFunction(toggleTextShadowShim)) {
                                toggleTextShadowShim('none');
                            }
                            bBox = element.getBBox ?
                                // SVG: use extend because IE9 is not allowed to change
                                // width and height in case of rotation (below)
                                extend({}, element.getBBox()) : {
                                // HTML elements with `exporting.allowHTML` and
                                // legacy IE in export mode
                                width: element.offsetWidth,
                                height: element.offsetHeight,
                                x: 0,
                                y: 0
                            };
                            // #3842
                            if (isFunction(toggleTextShadowShim)) {
                                toggleTextShadowShim('');
                            }
                        }
                        catch (e) {
                            '';
                        }
                        // If the bBox is not set, the try-catch block above failed. The
                        // other condition is for Opera that returns a width of
                        // -Infinity on hidden elements.
                        if (!bBox || bBox.width < 0) {
                            bBox = { x: 0, y: 0, width: 0, height: 0 };
                        }
                        // useHTML within SVG
                    }
                    else {
                        bBox = wrapper.htmlGetBBox();
                    }
                    // True SVG elements as well as HTML elements in modern browsers
                    // using the .useHTML option need to compensated for rotation
                    width = bBox.width;
                    height = bBox.height;
                    // Workaround for wrong bounding box in IE, Edge and Chrome on
                    // Windows. With Highcharts' default font, IE and Edge report
                    // a box height of 16.899 and Chrome rounds it to 17. If this
                    // stands uncorrected, it results in more padding added below
                    // the text than above when adding a label border or background.
                    // Also vertical positioning is affected.
                    // https://jsfiddle.net/highcharts/em37nvuj/
                    // (#1101, #1505, #1669, #2568, #6213).
                    if (isSVG) {
                        bBox.height = height = ({
                            '11px,17': 14,
                            '13px,20': 16
                        }["".concat(fontSize || '', ",").concat(Math.round(height))] ||
                            height);
                    }
                    // Adjust for rotated text
                    if (rotation) {
                        var baseline = Number(element.getAttribute('y') || 0) - bBox.y, alignFactor = {
                            'right': 1,
                            'center': 0.5
                        }[alignValue || 0] || 0, rad = rotation * deg2rad, rad90 = (rotation - 90) * deg2rad, wCosRad = width * Math.cos(rad), wSinRad = width * Math.sin(rad), cosRad90 = Math.cos(rad90), sinRad90 = Math.sin(rad90), 
                        // Find the starting point on the left side baseline of
                        // the text
                        pX = bBox.x + alignFactor * (width - wCosRad), pY = bBox.y + baseline - alignFactor * wSinRad, 
                        // Find all corners
                        aX = pX + baseline * cosRad90, bX = aX + wCosRad, cX = bX - height * cosRad90, dX = cX - wCosRad, aY = pY + baseline * sinRad90, bY = aY + wSinRad, cY = bY - height * sinRad90, dY = cY - wSinRad;
                        // Deduct the bounding box from the corners
                        bBox.x = Math.min(aX, bX, cX, dX);
                        bBox.y = Math.min(aY, bY, cY, dY);
                        bBox.width = Math.max(aX, bX, cX, dX) - bBox.x;
                        bBox.height = Math.max(aY, bY, cY, dY) - bBox.y;
                    }
                }
                // Cache it. When loading a chart in a hidden iframe in Firefox and
                // IE/Edge, the bounding box height is 0, so don't cache it (#5620).
                if (cacheKey && (textStr === '' || bBox.height > 0)) {
                    // Rotate (#4681)
                    while (cacheKeys.length > 250) {
                        delete cache[cacheKeys.shift()];
                    }
                    if (!cache[cacheKey]) {
                        cacheKeys.push(cacheKey);
                    }
                    cache[cacheKey] = bBox;
                }
                return bBox;
            };
            /**
             * Get the computed style. Only in styled mode.
             *
             * @example
             * chart.series[0].points[0].graphic.getStyle('stroke-width'); // => '1px'
             *
             * @function Highcharts.SVGElement#getStyle
             *
             * @param {string} prop
             *        The property name to check for.
             *
             * @return {string}
             *         The current computed value.
             */
            SVGElement.prototype.getStyle = function (prop) {
                return win
                    .getComputedStyle(this.element || this, '')
                    .getPropertyValue(prop);
            };
            /**
             * Check if an element has the given class name.
             *
             * @function Highcharts.SVGElement#hasClass
             *
             * @param {string} className
             * The class name to check for.
             *
             * @return {boolean}
             * Whether the class name is found.
             */
            SVGElement.prototype.hasClass = function (className) {
                return ('' + this.attr('class'))
                    .split(' ')
                    .indexOf(className) !== -1;
            };
            /**
             * Hide the element, similar to setting the `visibility` attribute to
             * `hidden`.
             *
             * @function Highcharts.SVGElement#hide
             *
             * @return {Highcharts.SVGElement}
             *         Returns the SVGElement for chaining.
             */
            SVGElement.prototype.hide = function () {
                return this.attr({ visibility: 'hidden' });
            };
            /**
             * @private
             */
            SVGElement.prototype.htmlGetBBox = function () {
                return { height: 0, width: 0, x: 0, y: 0 };
            };
            /**
             * Initialize the SVG element. This function only exists to make the
             * initialization process overridable. It should not be called directly.
             *
             * @function Highcharts.SVGElement#init
             *
             * @param {Highcharts.SVGRenderer} renderer
             * The SVGRenderer instance to initialize to.
             *
             * @param {string} nodeName
             * The SVG node name.
             */
            SVGElement.prototype.init = function (renderer, nodeName) {
                /**
                 * The primary DOM node. Each `SVGElement` instance wraps a main DOM
                 * node, but may also represent more nodes.
                 *
                 * @name Highcharts.SVGElement#element
                 * @type {Highcharts.SVGDOMElement|Highcharts.HTMLDOMElement}
                 */
                this.element = nodeName === 'span' ?
                    createElement(nodeName) :
                    doc.createElementNS(this.SVG_NS, nodeName);
                /**
                 * The renderer that the SVGElement belongs to.
                 *
                 * @name Highcharts.SVGElement#renderer
                 * @type {Highcharts.SVGRenderer}
                 */
                this.renderer = renderer;
                fireEvent(this, 'afterInit');
            };
            /**
             * Add an event listener. This is a simple setter that replaces the
             * previous event of the same type added by this function, as opposed to
             * the {@link Highcharts#addEvent} function.
             *
             * @sample highcharts/members/element-on/
             *         A clickable rectangle
             *
             * @function Highcharts.SVGElement#on
             *
             * @param {string} eventType
             * The event type.
             *
             * @param {Function} handler
             * The handler callback.
             *
             * @return {Highcharts.SVGElement}
             * The SVGElement for chaining.
             */
            SVGElement.prototype.on = function (eventType, handler) {
                var onEvents = this.onEvents;
                if (onEvents[eventType]) {
                    // Unbind existing event
                    onEvents[eventType]();
                }
                onEvents[eventType] = addEvent(this.element, eventType, handler);
                return this;
            };
            /**
             * @private
             * @function Highcharts.SVGElement#opacitySetter
             * @param {string} value
             * @param {string} key
             * @param {Highcharts.SVGDOMElement} element
             */
            SVGElement.prototype.opacitySetter = function (value, key, element) {
                // Round off to avoid float errors, like tests where opacity lands on
                // 9.86957e-06 instead of 0
                var opacity = Number(Number(value).toFixed(3));
                this.opacity = opacity;
                element.setAttribute(key, opacity);
            };
            /**
             * Remove a class name from the element.
             *
             * @function Highcharts.SVGElement#removeClass
             *
             * @param {string|RegExp} className
             *        The class name to remove.
             *
             * @return {Highcharts.SVGElement} Returns the SVG element for chainability.
             */
            SVGElement.prototype.removeClass = function (className) {
                return this.attr('class', ('' + this.attr('class'))
                    .replace(isString(className) ?
                    new RegExp("(^| )".concat(className, "( |$)")) : // #12064, #13590
                    className, ' ')
                    .replace(/ +/g, ' ')
                    .trim());
            };
            /**
             *
             * @private
             */
            SVGElement.prototype.removeTextOutline = function () {
                var outline = this.element
                    .querySelector('tspan.highcharts-text-outline');
                if (outline) {
                    this.safeRemoveChild(outline);
                }
            };
            /**
             * Removes an element from the DOM.
             *
             * @private
             * @function Highcharts.SVGElement#safeRemoveChild
             *
             * @param {Highcharts.SVGDOMElement|Highcharts.HTMLDOMElement} element
             * The DOM node to remove.
             */
            SVGElement.prototype.safeRemoveChild = function (element) {
                var parentNode = element.parentNode;
                if (parentNode) {
                    parentNode.removeChild(element);
                }
            };
            /**
             * Set the coordinates needed to draw a consistent radial gradient across
             * a shape regardless of positioning inside the chart. Used on pie slices
             * to make all the slices have the same radial reference point.
             *
             * @function Highcharts.SVGElement#setRadialReference
             *
             * @param {Array<number>} coordinates
             * The center reference. The format is `[centerX, centerY, diameter]` in
             * pixels.
             *
             * @return {Highcharts.SVGElement}
             * Returns the SVGElement for chaining.
             */
            SVGElement.prototype.setRadialReference = function (coordinates) {
                var existingGradient = (this.element.gradient &&
                    this.renderer.gradients[this.element.gradient]);
                this.element.radialReference = coordinates;
                // On redrawing objects with an existing gradient, the gradient needs
                // to be repositioned (#3801)
                if (existingGradient && existingGradient.radAttr) {
                    existingGradient.animate(this.renderer.getRadialAttr(coordinates, existingGradient.radAttr));
                }
                return this;
            };
            /**
             * Set a text path for a `text` or `label` element, allowing the text to
             * flow along a path.
             *
             * In order to unset the path for an existing element, call `setTextPath`
             * with `{ enabled: false }` as the second argument.
             *
             * @sample highcharts/members/renderer-textpath/ Text path demonstrated
             *
             * @function Highcharts.SVGElement#setTextPath
             *
             * @param {Highcharts.SVGElement|undefined} path
             *        Path to follow. If undefined, it allows changing options for the
             *        existing path.
             *
             * @param {Highcharts.DataLabelsTextPathOptionsObject} textPathOptions
             *        Options.
             *
             * @return {Highcharts.SVGElement} Returns the SVGElement for chaining.
             */
            SVGElement.prototype.setTextPath = function (path, textPathOptions) {
                var _this = this;
                // Defaults
                textPathOptions = merge(true, {
                    enabled: true,
                    attributes: {
                        dy: -5,
                        startOffset: '50%',
                        textAnchor: 'middle'
                    }
                }, textPathOptions);
                var url = this.renderer.url, textWrapper = this.text || this, textPath = textWrapper.textPath, attributes = textPathOptions.attributes, enabled = textPathOptions.enabled;
                path = path || (textPath && textPath.path);
                // Remove previously added event
                if (textPath) {
                    textPath.undo();
                }
                if (path && enabled) {
                    var undo = addEvent(textWrapper, 'afterModifyTree', function (e) {
                        if (path && enabled) {
                            // Set ID for the path
                            var textPathId = path.attr('id');
                            if (!textPathId) {
                                path.attr('id', textPathId = uniqueKey());
                            }
                            // Set attributes for the <text>
                            var textAttribs = {
                                // dx/dy options must by set on <text> (parent), the
                                // rest should be set on <textPath>
                                x: 0,
                                y: 0
                            };
                            if (defined(attributes.dx)) {
                                textAttribs.dx = attributes.dx;
                                delete attributes.dx;
                            }
                            if (defined(attributes.dy)) {
                                textAttribs.dy = attributes.dy;
                                delete attributes.dy;
                            }
                            textWrapper.attr(textAttribs);
                            // Handle label properties
                            _this.attr({ transform: '' });
                            if (_this.box) {
                                _this.box = _this.box.destroy();
                            }
                            // Wrap the nodes in a textPath
                            var children = e.nodes.slice(0);
                            e.nodes.length = 0;
                            e.nodes[0] = {
                                tagName: 'textPath',
                                attributes: extend(attributes, {
                                    'text-anchor': attributes.textAnchor,
                                    href: "".concat(url, "#").concat(textPathId)
                                }),
                                children: children
                            };
                        }
                    });
                    // Set the reference
                    textWrapper.textPath = { path: path, undo: undo };
                }
                else {
                    textWrapper.attr({ dx: 0, dy: 0 });
                    delete textWrapper.textPath;
                }
                if (this.added) {
                    // Rebuild text after added
                    textWrapper.textCache = '';
                    this.renderer.buildText(textWrapper);
                }
                return this;
            };
            /**
             * Add a shadow to the element. In styled mode, this method is not used,
             * instead use `defs` and filters.
             *
             * @example
             * renderer.rect(10, 100, 100, 100)
             *     .attr({ fill: 'red' })
             *     .shadow(true);
             *
             * @function Highcharts.SVGElement#shadow
             *
             * @param {boolean|Highcharts.ShadowOptionsObject} [shadowOptions] The
             *        shadow options. If `true`, the default options are applied. If
             *        `false`, the current shadow will be removed.
             *
             * @return {Highcharts.SVGElement} Returns the SVGElement for chaining.
             */
            SVGElement.prototype.shadow = function (shadowOptions) {
                var _a;
                var renderer = this.renderer, options = merge(((_a = this.parentGroup) === null || _a === void 0 ? void 0 : _a.rotation) === 90 ? {
                    offsetX: -1,
                    offsetY: -1
                } : {}, isObject(shadowOptions) ? shadowOptions : {}), id = renderer.shadowDefinition(options);
                return this.attr({
                    filter: shadowOptions ?
                        "url(".concat(renderer.url, "#").concat(id, ")") :
                        'none'
                });
            };
            /**
             * Show the element after it has been hidden.
             *
             * @function Highcharts.SVGElement#show
             *
             * @param {boolean} [inherit=true]
             *        Set the visibility attribute to `inherit` rather than `visible`.
             *        The difference is that an element with `visibility="visible"`
             *        will be visible even if the parent is hidden.
             *
             * @return {Highcharts.SVGElement}
             *         Returns the SVGElement for chaining.
             */
            SVGElement.prototype.show = function (inherit) {
                if (inherit === void 0) { inherit = true; }
                return this.attr({ visibility: inherit ? 'inherit' : 'visible' });
            };
            /**
             * Set the stroke-width and record it on the SVGElement
             *
             * @private
             * @function Highcharts.SVGElement#strokeSetter
             * @param {number|string|ColorType} value
             * @param {string} key
             * @param {Highcharts.SVGDOMElement} element
             */
            SVGElement.prototype['stroke-widthSetter'] = function (value, key, element) {
                // Record it for quick access in getter
                this[key] = value;
                element.setAttribute(key, value);
            };
            /**
             * Get the computed stroke width in pixel values. This is used extensively
             * when drawing shapes to ensure the shapes are rendered crisp and
             * positioned correctly relative to each other. Using
             * `shape-rendering: crispEdges` leaves us less control over positioning,
             * for example when we want to stack columns next to each other, or position
             * things pixel-perfectly within the plot box.
             *
             * The common pattern when placing a shape is:
             * - Create the SVGElement and add it to the DOM. In styled mode, it will
             *   now receive a stroke width from the style sheet. In classic mode we
             *   will add the `stroke-width` attribute.
             * - Read the computed `elem.strokeWidth()`.
             * - Place it based on the stroke width.
             *
             * @function Highcharts.SVGElement#strokeWidth
             *
             * @return {number}
             * The stroke width in pixels. Even if the given stroke widtch (in CSS or by
             * attributes) is based on `em` or other units, the pixel size is returned.
             */
            SVGElement.prototype.strokeWidth = function () {
                // In non-styled mode, read the stroke width as set by .attr
                if (!this.renderer.styledMode) {
                    return this['stroke-width'] || 0;
                }
                // In styled mode, read computed stroke width
                var val = this.getStyle('stroke-width');
                var ret = 0, dummy;
                // Read pixel values directly
                if (val.indexOf('px') === val.length - 2) {
                    ret = pInt(val);
                    // Other values like em, pt etc need to be measured
                }
                else if (val !== '') {
                    dummy = doc.createElementNS(SVG_NS, 'rect');
                    attr(dummy, {
                        width: val,
                        'stroke-width': 0
                    });
                    this.element.parentNode.appendChild(dummy);
                    ret = dummy.getBBox().width;
                    dummy.parentNode.removeChild(dummy);
                }
                return ret;
            };
            /**
             * If one of the symbol size affecting parameters are changed,
             * check all the others only once for each call to an element's
             * .attr() method
             *
             * @private
             * @function Highcharts.SVGElement#symbolAttr
             *
             * @param {Highcharts.SVGAttributes} hash
             * The attributes to set.
             */
            SVGElement.prototype.symbolAttr = function (hash) {
                var wrapper = this;
                SVGElement.symbolCustomAttribs.forEach(function (key) {
                    wrapper[key] = pick(hash[key], wrapper[key]);
                });
                wrapper.attr({
                    d: wrapper.renderer.symbols[wrapper.symbolName](wrapper.x, wrapper.y, wrapper.width, wrapper.height, wrapper)
                });
            };
            /**
             * @private
             * @function Highcharts.SVGElement#textSetter
             * @param {string} value
             */
            SVGElement.prototype.textSetter = function (value) {
                if (value !== this.textStr) {
                    // Delete size caches when the text changes
                    // delete this.bBox; // old code in series-label
                    delete this.textPxLength;
                    this.textStr = value;
                    if (this.added) {
                        this.renderer.buildText(this);
                    }
                }
            };
            /**
             * @private
             * @function Highcharts.SVGElement#titleSetter
             * @param {string} value
             */
            SVGElement.prototype.titleSetter = function (value) {
                var el = this.element;
                var titleNode = el.getElementsByTagName('title')[0] ||
                    doc.createElementNS(this.SVG_NS, 'title');
                // Move to first child
                if (el.insertBefore) {
                    el.insertBefore(titleNode, el.firstChild);
                }
                else {
                    el.appendChild(titleNode);
                }
                // Replace text content and escape markup
                titleNode.textContent =
                    // #3276, #3895
                    String(pick(value, ''))
                        .replace(/<[^>]*>/g, '')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>');
            };
            /**
             * Bring the element to the front. Alternatively, a new zIndex can be set.
             *
             * @sample highcharts/members/element-tofront/
             *         Click an element to bring it to front
             *
             * @function Highcharts.SVGElement#toFront
             *
             * @return {Highcharts.SVGElement}
             * Returns the SVGElement for chaining.
             */
            SVGElement.prototype.toFront = function () {
                var element = this.element;
                element.parentNode.appendChild(element);
                return this;
            };
            /**
             * Move an object and its children by x and y values.
             *
             * @function Highcharts.SVGElement#translate
             *
             * @param {number} x
             * The x value.
             *
             * @param {number} y
             * The y value.
             *
             * @return {Highcharts.SVGElement}
             * Translated element.
             */
            SVGElement.prototype.translate = function (x, y) {
                return this.attr({
                    translateX: x,
                    translateY: y
                });
            };
            /**
             * Update the transform attribute based on internal properties. Deals with
             * the custom `translateX`, `translateY`, `rotation`, `scaleX` and `scaleY`
             * attributes and updates the SVG `transform` attribute.
             *
             * @private
             * @function Highcharts.SVGElement#updateTransform
             */
            SVGElement.prototype.updateTransform = function () {
                var _a = this, element = _a.element, matrix = _a.matrix, _b = _a.rotation, rotation = _b === void 0 ? 0 : _b, scaleX = _a.scaleX, scaleY = _a.scaleY, _c = _a.translateX, translateX = _c === void 0 ? 0 : _c, _d = _a.translateY, translateY = _d === void 0 ? 0 : _d;
                // Apply translate. Nearly all transformed elements have translation,
                // so instead of checking for translate = 0, do it always (#1767,
                // #1846).
                var transform = ['translate(' + translateX + ',' + translateY + ')'];
                // apply matrix
                if (defined(matrix)) {
                    transform.push('matrix(' + matrix.join(',') + ')');
                }
                // Apply rotation
                if (rotation) { // text rotation or inverted chart
                    transform.push('rotate(' + rotation + ' ' +
                        pick(this.rotationOriginX, element.getAttribute('x'), 0) +
                        ' ' +
                        pick(this.rotationOriginY, element.getAttribute('y') || 0) + ')');
                }
                // apply scale
                if (defined(scaleX) || defined(scaleY)) {
                    transform.push('scale(' + pick(scaleX, 1) + ' ' + pick(scaleY, 1) + ')');
                }
                if (transform.length && !(this.text || this).textPath) {
                    element.setAttribute('transform', transform.join(' '));
                }
            };
            /**
             * @private
             * @function Highcharts.SVGElement#visibilitySetter
             *
             * @param {string} value
             *
             * @param {string} key
             *
             * @param {Highcharts.SVGDOMElement} element
             *
             */
            SVGElement.prototype.visibilitySetter = function (value, key, element) {
                // IE9-11 doesn't handle visibilty:inherit well, so we remove the
                // attribute instead (#2881, #3909)
                if (value === 'inherit') {
                    element.removeAttribute(key);
                }
                else if (this[key] !== value) { // #6747
                    element.setAttribute(key, value);
                }
                this[key] = value;
            };
            /**
             * @private
             * @function Highcharts.SVGElement#xGetter
             */
            SVGElement.prototype.xGetter = function (key) {
                if (this.element.nodeName === 'circle') {
                    if (key === 'x') {
                        key = 'cx';
                    }
                    else if (key === 'y') {
                        key = 'cy';
                    }
                }
                return this._defaultGetter(key);
            };
            /**
             * @private
             * @function Highcharts.SVGElement#zIndexSetter
             */
            SVGElement.prototype.zIndexSetter = function (value, key) {
                var renderer = this.renderer, parentGroup = this.parentGroup, parentWrapper = parentGroup || renderer, parentNode = parentWrapper.element || renderer.box, element = this.element, svgParent = parentNode === renderer.box;
                var childNodes, otherElement, otherZIndex, inserted = false, undefinedOtherZIndex, run = this.added, i;
                if (defined(value)) {
                    // So we can read it for other elements in the group
                    element.setAttribute('data-z-index', value);
                    value = +value;
                    if (this[key] === value) {
                        // Only update when needed (#3865)
                        run = false;
                    }
                }
                else if (defined(this[key])) {
                    element.removeAttribute('data-z-index');
                }
                this[key] = value;
                // Insert according to this and other elements' zIndex. Before .add() is
                // called, nothing is done. Then on add, or by later calls to
                // zIndexSetter, the node is placed on the right place in the DOM.
                if (run) {
                    value = this.zIndex;
                    if (value && parentGroup) {
                        parentGroup.handleZ = true;
                    }
                    childNodes = parentNode.childNodes;
                    for (i = childNodes.length - 1; i >= 0 && !inserted; i--) {
                        otherElement = childNodes[i];
                        otherZIndex = otherElement.getAttribute('data-z-index');
                        undefinedOtherZIndex = !defined(otherZIndex);
                        if (otherElement !== element) {
                            if (
                            // Negative zIndex versus no zIndex:
                            // On all levels except the highest. If the parent is
                            // <svg>, then we don't want to put items before <desc>
                            // or <defs>
                            value < 0 &&
                                undefinedOtherZIndex &&
                                !svgParent &&
                                !i) {
                                parentNode.insertBefore(element, childNodes[i]);
                                inserted = true;
                            }
                            else if (
                            // Insert after the first element with a lower zIndex
                            pInt(otherZIndex) <= value ||
                                // If negative zIndex, add this before first undefined
                                // zIndex element
                                (undefinedOtherZIndex &&
                                    (!defined(value) || value >= 0))) {
                                parentNode.insertBefore(element, childNodes[i + 1]);
                                inserted = true;
                            }
                        }
                    }
                    if (!inserted) {
                        parentNode.insertBefore(element, childNodes[svgParent ? 3 : 0]);
                        inserted = true;
                    }
                }
                return inserted;
            };
            // Custom attributes used for symbols, these should be filtered out when
            // setting SVGElement attributes (#9375).
            SVGElement.symbolCustomAttribs = [
                'anchorX',
                'anchorY',
                'clockwise',
                'end',
                'height',
                'innerR',
                'r',
                'start',
                'width',
                'x',
                'y'
            ];
            return SVGElement;
        }());
        // Some shared setters and getters
        SVGElement.prototype.strokeSetter = SVGElement.prototype.fillSetter;
        SVGElement.prototype.yGetter = SVGElement.prototype.xGetter;
        SVGElement.prototype.matrixSetter =
            SVGElement.prototype.rotationOriginXSetter =
                SVGElement.prototype.rotationOriginYSetter =
                    SVGElement.prototype.rotationSetter =
                        SVGElement.prototype.scaleXSetter =
                            SVGElement.prototype.scaleYSetter =
                                SVGElement.prototype.translateXSetter =
                                    SVGElement.prototype.translateYSetter =
                                        SVGElement.prototype.verticalAlignSetter = function (value, key) {
                                            this[key] = value;
                                            this.doTransform = true;
                                        };
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * Reference to the global SVGElement class as a workaround for a name conflict
         * in the Highcharts namespace.
         *
         * @global
         * @typedef {global.SVGElement} GlobalSVGElement
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/SVGElement
         */
        /**
         * The horizontal alignment of an element.
         *
         * @typedef {"center"|"left"|"right"} Highcharts.AlignValue
         */
        /**
         * Options to align the element relative to the chart or another box.
         *
         * @interface Highcharts.AlignObject
         */ /**
        * Horizontal alignment. Can be one of `left`, `center` and `right`.
        *
        * @name Highcharts.AlignObject#align
        * @type {Highcharts.AlignValue|undefined}
        *
        * @default left
        */ /**
        * Vertical alignment. Can be one of `top`, `middle` and `bottom`.
        *
        * @name Highcharts.AlignObject#verticalAlign
        * @type {Highcharts.VerticalAlignValue|undefined}
        *
        * @default top
        */ /**
        * Horizontal pixel offset from alignment.
        *
        * @name Highcharts.AlignObject#x
        * @type {number|undefined}
        *
        * @default 0
        */ /**
        * Vertical pixel offset from alignment.
        *
        * @name Highcharts.AlignObject#y
        * @type {number|undefined}
        *
        * @default 0
        */ /**
        * Use the `transform` attribute with translateX and translateY custom
        * attributes to align this elements rather than `x` and `y` attributes.
        *
        * @name Highcharts.AlignObject#alignByTranslate
        * @type {boolean|undefined}
        *
        * @default false
        */
        /**
         * Bounding box of an element.
         *
         * @interface Highcharts.BBoxObject
         * @extends Highcharts.PositionObject
         */ /**
        * Height of the bounding box.
        *
        * @name Highcharts.BBoxObject#height
        * @type {number}
        */ /**
        * Width of the bounding box.
        *
        * @name Highcharts.BBoxObject#width
        * @type {number}
        */ /**
        * Horizontal position of the bounding box.
        *
        * @name Highcharts.BBoxObject#x
        * @type {number}
        */ /**
        * Vertical position of the bounding box.
        *
        * @name Highcharts.BBoxObject#y
        * @type {number}
        */
        /**
         * An object of key-value pairs for SVG attributes. Attributes in Highcharts
         * elements for the most parts correspond to SVG, but some are specific to
         * Highcharts, like `zIndex`, `rotation`, `rotationOriginX`,
         * `rotationOriginY`, `translateX`, `translateY`, `scaleX` and `scaleY`. SVG
         * attributes containing a hyphen are _not_ camel-cased, they should be
         * quoted to preserve the hyphen.
         *
         * @example
         * {
         *     'stroke': '#ff0000', // basic
         *     'stroke-width': 2, // hyphenated
         *     'rotation': 45 // custom
         *     'd': ['M', 10, 10, 'L', 30, 30, 'z'] // path definition, note format
         * }
         *
         * @interface Highcharts.SVGAttributes
         */ /**
        * @name Highcharts.SVGAttributes#[key:string]
        * @type {*}
        */ /**
        * @name Highcharts.SVGAttributes#d
        * @type {string|Highcharts.SVGPathArray|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#dx
        * @type {number|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#dy
        * @type {number|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#fill
        * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#inverted
        * @type {boolean|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#matrix
        * @type {Array<number>|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#rotation
        * @type {number|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#rotationOriginX
        * @type {number|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#rotationOriginY
        * @type {number|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#scaleX
        * @type {number|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#scaleY
        * @type {number|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#stroke
        * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#style
        * @type {string|Highcharts.CSSObject|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#translateX
        * @type {number|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#translateY
        * @type {number|undefined}
        */ /**
        * @name Highcharts.SVGAttributes#zIndex
        * @type {number|undefined}
        */
        /**
         * An SVG DOM element. The type is a reference to the regular SVGElement in the
         * global scope.
         *
         * @typedef {globals.GlobalSVGElement} Highcharts.SVGDOMElement
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/SVGElement
         */
        /**
         * The vertical alignment of an element.
         *
         * @typedef {"bottom"|"middle"|"top"} Highcharts.VerticalAlignValue
         */
        ''; // keeps doclets above in JS file

        return SVGElement;
    });
    _registerModule(_modules, 'Core/Renderer/RendererRegistry.js', [_modules['Core/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Namespace
         *
         * */
        var RendererRegistry;
        (function (RendererRegistry) {
            /* *
             *
             *  Constants
             *
             * */
            RendererRegistry.rendererTypes = {};
            /* *
             *
             *  Variables
             *
             * */
            var defaultRenderer;
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Gets a registered renderer class. If no renderer type is provided or the
             * requested renderer was not founded, the default renderer is returned.
             *
             * @param {string} [rendererType]
             * Renderer type or the default renderer.
             *
             * @return {Highcharts.Class<Highcharts.SVGRenderer>}
             * Returns the requested renderer class or the default renderer class.
             */
            function getRendererType(rendererType) {
                if (rendererType === void 0) { rendererType = defaultRenderer; }
                return (RendererRegistry.rendererTypes[rendererType] || RendererRegistry.rendererTypes[defaultRenderer]);
            }
            RendererRegistry.getRendererType = getRendererType;
            /**
             * Register a renderer class.
             *
             * @param {string} rendererType
             * Renderer type to register.
             *
             * @param {Highcharts.Class<Highcharts.SVGRenderer>} rendererClass
             * Returns the requested renderer class or the default renderer class.
             *
             * @param {boolean} setAsDefault
             * Sets the renderer class as the default renderer.
             */
            function registerRendererType(rendererType, rendererClass, setAsDefault) {
                RendererRegistry.rendererTypes[rendererType] = rendererClass;
                if (!defaultRenderer || setAsDefault) {
                    defaultRenderer = rendererType;
                    H.Renderer = rendererClass; // compatibility
                }
            }
            RendererRegistry.registerRendererType = registerRendererType;
        })(RendererRegistry || (RendererRegistry = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return RendererRegistry;
    });
    _registerModule(_modules, 'Core/Renderer/SVG/SVGLabel.js', [_modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Utilities.js']], function (SVGElement, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
            var extendStatics = function (d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                if (typeof b !== "function" && b !== null)
                    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var defined = U.defined, extend = U.extend, isNumber = U.isNumber, merge = U.merge, pick = U.pick, removeEvent = U.removeEvent;
        /* *
         *
         *  Class
         *
         * */
        /**
         * SVG label to render text.
         * @private
         * @class
         * @name Highcharts.SVGLabel
         * @augments Highcharts.SVGElement
         */
        var SVGLabel = /** @class */ (function (_super) {
            __extends(SVGLabel, _super);
            /* *
             *
             *  Constructor
             *
             * */
            function SVGLabel(renderer, str, x, y, shape, anchorX, anchorY, useHTML, baseline, className) {
                var _this = _super.call(this) || this;
                _this.paddingLeftSetter = _this.paddingSetter;
                _this.paddingRightSetter = _this.paddingSetter;
                _this.init(renderer, 'g');
                _this.textStr = str;
                _this.x = x;
                _this.y = y;
                _this.anchorX = anchorX;
                _this.anchorY = anchorY;
                _this.baseline = baseline;
                _this.className = className;
                _this.addClass(className === 'button' ?
                    'highcharts-no-tooltip' :
                    'highcharts-label');
                if (className) {
                    _this.addClass('highcharts-' + className);
                }
                // Create the text element. An undefined text content prevents redundant
                // box calculation (#16121)
                _this.text = renderer.text(void 0, 0, 0, useHTML).attr({ zIndex: 1 });
                // Validate the shape argument
                var hasBGImage;
                if (typeof shape === 'string') {
                    hasBGImage = /^url\((.*?)\)$/.test(shape);
                    if (hasBGImage || _this.renderer.symbols[shape]) {
                        _this.symbolKey = shape;
                    }
                }
                _this.bBox = SVGLabel.emptyBBox;
                _this.padding = 3;
                _this.baselineOffset = 0;
                _this.needsBox = renderer.styledMode || hasBGImage;
                _this.deferredAttr = {};
                _this.alignFactor = 0;
                return _this;
            }
            /* *
             *
             *  Functions
             *
             * */
            SVGLabel.prototype.alignSetter = function (value) {
                var alignFactor = ({
                    left: 0,
                    center: 0.5,
                    right: 1
                })[value];
                if (alignFactor !== this.alignFactor) {
                    this.alignFactor = alignFactor;
                    // Bounding box exists, means we're dynamically changing
                    if (this.bBox && isNumber(this.xSetting)) {
                        this.attr({ x: this.xSetting }); // #5134
                    }
                }
            };
            SVGLabel.prototype.anchorXSetter = function (value, key) {
                this.anchorX = value;
                this.boxAttr(key, Math.round(value) - this.getCrispAdjust() - this.xSetting);
            };
            SVGLabel.prototype.anchorYSetter = function (value, key) {
                this.anchorY = value;
                this.boxAttr(key, value - this.ySetting);
            };
            /*
             * Set a box attribute, or defer it if the box is not yet created
             */
            SVGLabel.prototype.boxAttr = function (key, value) {
                if (this.box) {
                    this.box.attr(key, value);
                }
                else {
                    this.deferredAttr[key] = value;
                }
            };
            /*
             * Pick up some properties and apply them to the text instead of the
             * wrapper.
             */
            SVGLabel.prototype.css = function (styles) {
                if (styles) {
                    var textStyles_1 = {};
                    // Create a copy to avoid altering the original object
                    // (#537)
                    styles = merge(styles);
                    SVGLabel.textProps.forEach(function (prop) {
                        if (typeof styles[prop] !== 'undefined') {
                            textStyles_1[prop] = styles[prop];
                            delete styles[prop];
                        }
                    });
                    this.text.css(textStyles_1);
                    // Update existing text, box (#9400, #12163, #18212)
                    if ('fontSize' in textStyles_1 || 'fontWeight' in textStyles_1) {
                        this.updateTextPadding();
                    }
                    else if ('width' in textStyles_1 || 'textOverflow' in textStyles_1) {
                        this.updateBoxSize();
                    }
                }
                return SVGElement.prototype.css.call(this, styles);
            };
            /*
             * Destroy and release memory.
             */
            SVGLabel.prototype.destroy = function () {
                // Added by button implementation
                removeEvent(this.element, 'mouseenter');
                removeEvent(this.element, 'mouseleave');
                if (this.text) {
                    this.text.destroy();
                }
                if (this.box) {
                    this.box = this.box.destroy();
                }
                // Call base implementation to destroy the rest
                SVGElement.prototype.destroy.call(this);
                return void 0;
            };
            SVGLabel.prototype.fillSetter = function (value, key) {
                if (value) {
                    this.needsBox = true;
                }
                // for animation getter (#6776)
                this.fill = value;
                this.boxAttr(key, value);
            };
            /*
             * Return the bounding box of the box, not the group.
             */
            SVGLabel.prototype.getBBox = function () {
                // If we have a text string and the DOM bBox was 0, it typically means
                // that the label was first rendered hidden, so we need to update the
                // bBox (#15246)
                if (this.textStr && this.bBox.width === 0 && this.bBox.height === 0) {
                    this.updateBoxSize();
                }
                var padding = this.padding;
                var paddingLeft = pick(this.paddingLeft, padding);
                return {
                    width: this.width,
                    height: this.height,
                    x: this.bBox.x - paddingLeft,
                    y: this.bBox.y - padding
                };
            };
            SVGLabel.prototype.getCrispAdjust = function () {
                return this.renderer.styledMode && this.box ?
                    this.box.strokeWidth() % 2 / 2 :
                    (this['stroke-width'] ? parseInt(this['stroke-width'], 10) : 0) % 2 / 2;
            };
            SVGLabel.prototype.heightSetter = function (value) {
                this.heightSetting = value;
            };
            /*
             * After the text element is added, get the desired size of the border
             * box and add it before the text in the DOM.
             */
            SVGLabel.prototype.onAdd = function () {
                this.text.add(this);
                this.attr({
                    // Alignment is available now  (#3295, 0 not rendered if given
                    // as a value)
                    text: pick(this.textStr, ''),
                    x: this.x || 0,
                    y: this.y || 0
                });
                if (this.box && defined(this.anchorX)) {
                    this.attr({
                        anchorX: this.anchorX,
                        anchorY: this.anchorY
                    });
                }
            };
            SVGLabel.prototype.paddingSetter = function (value, key) {
                if (!isNumber(value)) {
                    this[key] = void 0;
                }
                else if (value !== this[key]) {
                    this[key] = value;
                    this.updateTextPadding();
                }
            };
            SVGLabel.prototype.rSetter = function (value, key) {
                this.boxAttr(key, value);
            };
            SVGLabel.prototype.strokeSetter = function (value, key) {
                // for animation getter (#6776)
                this.stroke = value;
                this.boxAttr(key, value);
            };
            SVGLabel.prototype['stroke-widthSetter'] = function (value, key) {
                if (value) {
                    this.needsBox = true;
                }
                this['stroke-width'] = value;
                this.boxAttr(key, value);
            };
            SVGLabel.prototype['text-alignSetter'] = function (value) {
                this.textAlign = value;
            };
            SVGLabel.prototype.textSetter = function (text) {
                if (typeof text !== 'undefined') {
                    // Must use .attr to ensure transforms are done (#10009)
                    this.text.attr({ text: text });
                }
                this.updateTextPadding();
            };
            /*
             * This function runs after the label is added to the DOM (when the bounding
             * box is available), and after the text of the label is updated to detect
             * the new bounding box and reflect it in the border box.
             */
            SVGLabel.prototype.updateBoxSize = function () {
                var text = this.text, attribs = {}, padding = this.padding, 
                // #12165 error when width is null (auto)
                // #12163 when fontweight: bold, recalculate bBox withot cache
                // #3295 && 3514 box failure when string equals 0
                bBox = this.bBox = (((!isNumber(this.widthSetting) ||
                    !isNumber(this.heightSetting) ||
                    this.textAlign) && defined(text.textStr)) ?
                    text.getBBox() :
                    SVGLabel.emptyBBox);
                var crispAdjust;
                this.width = this.getPaddedWidth();
                this.height = (this.heightSetting || bBox.height || 0) + 2 * padding;
                var metrics = this.renderer.fontMetrics(text);
                // Update the label-scoped y offset. Math.min because of inline
                // style (#9400)
                this.baselineOffset = padding + Math.min(
                // When applicable, use the font size of the first line (#15707)
                (this.text.firstLineMetrics || metrics).b, 
                // When the height is 0, there is no bBox, so go with the font
                // metrics. Highmaps CSS demos.
                bBox.height || Infinity);
                // #15491: Vertical centering
                if (this.heightSetting) {
                    this.baselineOffset += (this.heightSetting - metrics.h) / 2;
                }
                if (this.needsBox && !text.textPath) {
                    // Create the border box if it is not already present
                    if (!this.box) {
                        // Symbol definition exists (#5324)
                        var box = this.box = this.symbolKey ?
                            this.renderer.symbol(this.symbolKey) :
                            this.renderer.rect();
                        box.addClass(// Don't use label className for buttons
                        (this.className === 'button' ?
                            '' : 'highcharts-label-box') +
                            (this.className ?
                                ' highcharts-' + this.className + '-box' : ''));
                        box.add(this);
                    }
                    crispAdjust = this.getCrispAdjust();
                    attribs.x = crispAdjust;
                    attribs.y = ((this.baseline ? -this.baselineOffset : 0) + crispAdjust);
                    // Apply the box attributes
                    attribs.width = Math.round(this.width);
                    attribs.height = Math.round(this.height);
                    this.box.attr(extend(attribs, this.deferredAttr));
                    this.deferredAttr = {};
                }
            };
            /*
             * This function runs after setting text or padding, but only if padding
             * is changed.
             */
            SVGLabel.prototype.updateTextPadding = function () {
                var text = this.text;
                if (!text.textPath) {
                    this.updateBoxSize();
                    // Determine y based on the baseline
                    var textY = this.baseline ? 0 : this.baselineOffset;
                    var textX = pick(this.paddingLeft, this.padding);
                    // compensate for alignment
                    if (defined(this.widthSetting) &&
                        this.bBox &&
                        (this.textAlign === 'center' || this.textAlign === 'right')) {
                        textX += { center: 0.5, right: 1 }[this.textAlign] * (this.widthSetting - this.bBox.width);
                    }
                    // update if anything changed
                    if (textX !== text.x || textY !== text.y) {
                        text.attr('x', textX);
                        // #8159 - prevent misplaced data labels in treemap
                        // (useHTML: true)
                        if (text.hasBoxWidthChanged) {
                            this.bBox = text.getBBox(true);
                        }
                        if (typeof textY !== 'undefined') {
                            text.attr('y', textY);
                        }
                    }
                    // record current values
                    text.x = textX;
                    text.y = textY;
                }
            };
            SVGLabel.prototype.widthSetter = function (value) {
                // width:auto => null
                this.widthSetting = isNumber(value) ? value : void 0;
            };
            SVGLabel.prototype.getPaddedWidth = function () {
                var padding = this.padding;
                var paddingLeft = pick(this.paddingLeft, padding);
                var paddingRight = pick(this.paddingRight, padding);
                return ((this.widthSetting || this.bBox.width || 0) +
                    paddingLeft +
                    paddingRight);
            };
            SVGLabel.prototype.xSetter = function (value) {
                this.x = value; // for animation getter
                if (this.alignFactor) {
                    value -= this.alignFactor * this.getPaddedWidth();
                    // Force animation even when setting to the same value (#7898)
                    this['forceAnimate:x'] = true;
                }
                this.xSetting = Math.round(value);
                this.attr('translateX', this.xSetting);
            };
            SVGLabel.prototype.ySetter = function (value) {
                this.ySetting = this.y = Math.round(value);
                this.attr('translateY', this.ySetting);
            };
            /* *
             *
             *  Static Properties
             *
             * */
            SVGLabel.emptyBBox = {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            };
            /**
             * For labels, these CSS properties are applied to the `text` node directly.
             *
             * @private
             * @name Highcharts.SVGLabel#textProps
             * @type {Array<string>}
             */
            SVGLabel.textProps = [
                'color', 'direction', 'fontFamily', 'fontSize', 'fontStyle',
                'fontWeight', 'lineHeight', 'textAlign', 'textDecoration',
                'textOutline', 'textOverflow', 'whiteSpace', 'width'
            ];
            return SVGLabel;
        }(SVGElement));
        /* *
         *
         *  Default Export
         *
         * */

        return SVGLabel;
    });
    _registerModule(_modules, 'Core/Renderer/SVG/Symbols.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined, isNumber = U.isNumber, pick = U.pick;
        /* *
         *
         *  Functions
         *
         * */
        /* eslint-disable require-jsdoc, valid-jsdoc */
        function arc(cx, cy, w, h, options) {
            var arc = [];
            if (options) {
                var start = options.start || 0, rx = pick(options.r, w), ry = pick(options.r, h || w), proximity = 0.001, fullCircle = (Math.abs((options.end || 0) - start - 2 * Math.PI) <
                    proximity), 
                // Substract a small number to prevent cos and sin of start
                // and end from becoming equal on 360 arcs (related: #1561)
                end = (options.end || 0) - proximity, innerRadius = options.innerR, open_1 = pick(options.open, fullCircle), cosStart = Math.cos(start), sinStart = Math.sin(start), cosEnd = Math.cos(end), sinEnd = Math.sin(end), 
                // Proximity takes care of rounding errors around PI (#6971)
                longArc = pick(options.longArc, end - start - Math.PI < proximity ? 0 : 1);
                var arcSegment = [
                    'A',
                    rx,
                    ry,
                    0,
                    longArc,
                    pick(options.clockwise, 1),
                    cx + rx * cosEnd,
                    cy + ry * sinEnd
                ];
                arcSegment.params = { start: start, end: end, cx: cx, cy: cy }; // Memo for border radius
                arc.push([
                    'M',
                    cx + rx * cosStart,
                    cy + ry * sinStart
                ], arcSegment);
                if (defined(innerRadius)) {
                    arcSegment = [
                        'A',
                        innerRadius,
                        innerRadius,
                        0,
                        longArc,
                        // Clockwise - opposite to the outer arc clockwise
                        defined(options.clockwise) ? 1 - options.clockwise : 0,
                        cx + innerRadius * cosStart,
                        cy + innerRadius * sinStart
                    ];
                    // Memo for border radius
                    arcSegment.params = {
                        start: end,
                        end: start,
                        cx: cx,
                        cy: cy
                    };
                    arc.push(open_1 ?
                        [
                            'M',
                            cx + innerRadius * cosEnd,
                            cy + innerRadius * sinEnd
                        ] : [
                        'L',
                        cx + innerRadius * cosEnd,
                        cy + innerRadius * sinEnd
                    ], arcSegment);
                }
                if (!open_1) {
                    arc.push(['Z']);
                }
            }
            return arc;
        }
        /**
         * Callout shape used for default tooltips.
         */
        function callout(x, y, w, h, options) {
            var arrowLength = 6, halfDistance = 6, r = Math.min((options && options.r) || 0, w, h), safeDistance = r + halfDistance, anchorX = options && options.anchorX, anchorY = options && options.anchorY || 0;
            var path = roundedRect(x, y, w, h, { r: r });
            if (!isNumber(anchorX)) {
                return path;
            }
            // Anchor on right side
            if (x + anchorX >= w) {
                // Chevron
                if (anchorY > y + safeDistance &&
                    anchorY < y + h - safeDistance) {
                    path.splice(3, 1, ['L', x + w, anchorY - halfDistance], ['L', x + w + arrowLength, anchorY], ['L', x + w, anchorY + halfDistance], ['L', x + w, y + h - r]);
                    // Simple connector
                }
                else {
                    path.splice(3, 1, ['L', x + w, h / 2], ['L', anchorX, anchorY], ['L', x + w, h / 2], ['L', x + w, y + h - r]);
                }
                // Anchor on left side
            }
            else if (x + anchorX <= 0) {
                // Chevron
                if (anchorY > y + safeDistance &&
                    anchorY < y + h - safeDistance) {
                    path.splice(7, 1, ['L', x, anchorY + halfDistance], ['L', x - arrowLength, anchorY], ['L', x, anchorY - halfDistance], ['L', x, y + r]);
                    // Simple connector
                }
                else {
                    path.splice(7, 1, ['L', x, h / 2], ['L', anchorX, anchorY], ['L', x, h / 2], ['L', x, y + r]);
                }
            }
            else if ( // replace bottom
            anchorY &&
                anchorY > h &&
                anchorX > x + safeDistance &&
                anchorX < x + w - safeDistance) {
                path.splice(5, 1, ['L', anchorX + halfDistance, y + h], ['L', anchorX, y + h + arrowLength], ['L', anchorX - halfDistance, y + h], ['L', x + r, y + h]);
            }
            else if ( // replace top
            anchorY &&
                anchorY < 0 &&
                anchorX > x + safeDistance &&
                anchorX < x + w - safeDistance) {
                path.splice(1, 1, ['L', anchorX - halfDistance, y], ['L', anchorX, y - arrowLength], ['L', anchorX + halfDistance, y], ['L', w - r, y]);
            }
            return path;
        }
        function circle(x, y, w, h) {
            // Return a full arc
            return arc(x + w / 2, y + h / 2, w / 2, h / 2, {
                start: Math.PI * 0.5,
                end: Math.PI * 2.5,
                open: false
            });
        }
        function diamond(x, y, w, h) {
            return [
                ['M', x + w / 2, y],
                ['L', x + w, y + h / 2],
                ['L', x + w / 2, y + h],
                ['L', x, y + h / 2],
                ['Z']
            ];
        }
        // #15291
        function rect(x, y, w, h, options) {
            if (options && options.r) {
                return roundedRect(x, y, w, h, options);
            }
            return [
                ['M', x, y],
                ['L', x + w, y],
                ['L', x + w, y + h],
                ['L', x, y + h],
                ['Z']
            ];
        }
        function roundedRect(x, y, w, h, options) {
            var r = (options === null || options === void 0 ? void 0 : options.r) || 0;
            return [
                ['M', x + r, y],
                ['L', x + w - r, y],
                ['A', r, r, 0, 0, 1, x + w, y + r],
                ['L', x + w, y + h - r],
                ['A', r, r, 0, 0, 1, x + w - r, y + h],
                ['L', x + r, y + h],
                ['A', r, r, 0, 0, 1, x, y + h - r],
                ['L', x, y + r],
                ['A', r, r, 0, 0, 1, x + r, y],
                ['Z'] // top-left corner
            ];
        }
        function triangle(x, y, w, h) {
            return [
                ['M', x + w / 2, y],
                ['L', x + w, y + h],
                ['L', x, y + h],
                ['Z']
            ];
        }
        function triangleDown(x, y, w, h) {
            return [
                ['M', x, y],
                ['L', x + w, y],
                ['L', x + w / 2, y + h],
                ['Z']
            ];
        }
        var Symbols = {
            arc: arc,
            callout: callout,
            circle: circle,
            diamond: diamond,
            rect: rect,
            roundedRect: roundedRect,
            square: rect,
            triangle: triangle,
            'triangle-down': triangleDown
        };
        /* *
         *
         *  Default Export
         *
         * */

        return Symbols;
    });
    _registerModule(_modules, 'Core/Renderer/SVG/TextBuilder.js', [_modules['Core/Renderer/HTML/AST.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (AST, H, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var doc = H.doc, SVG_NS = H.SVG_NS, win = H.win;
        var attr = U.attr, extend = U.extend, fireEvent = U.fireEvent, isString = U.isString, objectEach = U.objectEach, pick = U.pick;
        /* *
         *
         *  Class
         *
         * */
        /**
         * SVG Text Builder
         * @private
         * @class
         * @name Highcharts.TextBuilder
         */
        var TextBuilder = /** @class */ (function () {
            function TextBuilder(svgElement) {
                var textStyles = svgElement.styles;
                this.renderer = svgElement.renderer;
                this.svgElement = svgElement;
                this.width = svgElement.textWidth;
                this.textLineHeight = textStyles && textStyles.lineHeight;
                this.textOutline = textStyles && textStyles.textOutline;
                this.ellipsis = Boolean(textStyles && textStyles.textOverflow === 'ellipsis');
                this.noWrap = Boolean(textStyles && textStyles.whiteSpace === 'nowrap');
            }
            /**
             * Build an SVG representation of the pseudo HTML given in the object's
             * svgElement.
             *
             * @private
             *
             * @return {void}.
             */
            TextBuilder.prototype.buildSVG = function () {
                var wrapper = this.svgElement, textNode = wrapper.element, renderer = wrapper.renderer, textStr = pick(wrapper.textStr, '').toString(), hasMarkup = textStr.indexOf('<') !== -1, childNodes = textNode.childNodes, tempParent = !wrapper.added && renderer.box, regexMatchBreaks = /<br.*?>/g, 
                // The buildText code is quite heavy, so if we're not changing
                // something that affects the text, skip it (#6113).
                textCache = [
                    textStr,
                    this.ellipsis,
                    this.noWrap,
                    this.textLineHeight,
                    this.textOutline,
                    wrapper.getStyle('font-size'),
                    this.width
                ].join(',');
                if (textCache === wrapper.textCache) {
                    return;
                }
                wrapper.textCache = textCache;
                delete wrapper.actualWidth;
                // Remove old text
                for (var i = childNodes.length; i--;) {
                    textNode.removeChild(childNodes[i]);
                }
                // Simple strings, add text directly and return
                if (!hasMarkup &&
                    !this.ellipsis &&
                    !this.width &&
                    !wrapper.textPath &&
                    (textStr.indexOf(' ') === -1 ||
                        (this.noWrap && !regexMatchBreaks.test(textStr)))) {
                    textNode.appendChild(doc.createTextNode(this.unescapeEntities(textStr)));
                    // Complex strings, add more logic
                }
                else if (textStr !== '') {
                    if (tempParent) {
                        // attach it to the DOM to read offset width and font size
                        tempParent.appendChild(textNode);
                    }
                    // Step 1. Parse the markup safely and directly into a tree
                    // structure.
                    var ast = new AST(textStr);
                    // Step 2. Do as many as we can of the modifications to the tree
                    // structure before it is added to the DOM
                    this.modifyTree(ast.nodes);
                    ast.addToDOM(textNode);
                    // Step 3. Some modifications can't be done until the structure is
                    // in the DOM, because we need to read computed metrics.
                    this.modifyDOM();
                    // Add title if an ellipsis was added
                    if (this.ellipsis &&
                        (textNode.textContent || '').indexOf('\u2026') !== -1) {
                        wrapper.attr('title', this.unescapeEntities(wrapper.textStr || '', ['&lt;', '&gt;']) // #7179
                        );
                    }
                    if (tempParent) {
                        tempParent.removeChild(textNode);
                    }
                }
                // Apply the text outline
                if (isString(this.textOutline) && wrapper.applyTextOutline) {
                    wrapper.applyTextOutline(this.textOutline);
                }
            };
            /**
             * Modify the DOM of the generated SVG structure. This function only does
             * operations that cannot be done until the elements are attached to the
             * DOM, like doing layout based on rendered metrics of the added elements.
             *
             * @private
             *
             */
            TextBuilder.prototype.modifyDOM = function () {
                var _this = this;
                var wrapper = this.svgElement;
                var x = attr(wrapper.element, 'x');
                wrapper.firstLineMetrics = void 0;
                // Remove empty tspans (including breaks) from the beginning because
                // SVG's getBBox doesn't count empty lines. The use case is tooltip
                // where the header is empty. By doing this in the DOM rather than in
                // the AST, we can inspect the textContent directly and don't have to
                // recurse down to look for valid content.
                var firstChild;
                while ((firstChild = wrapper.element.firstChild)) {
                    if (/^[\s\u200B]*$/.test(firstChild.textContent || ' ')) {
                        wrapper.element.removeChild(firstChild);
                    }
                    else {
                        break;
                    }
                }
                // Modify hard line breaks by applying the rendered line height
                [].forEach.call(wrapper.element.querySelectorAll('tspan.highcharts-br'), function (br, i) {
                    if (br.nextSibling && br.previousSibling) { // #5261
                        if (i === 0 && br.previousSibling.nodeType === 1) {
                            wrapper.firstLineMetrics = wrapper.renderer
                                .fontMetrics(br.previousSibling);
                        }
                        attr(br, {
                            // Since the break is inserted in front of the next
                            // line, we need to use the next sibling for the line
                            // height
                            dy: _this.getLineHeight(br.nextSibling),
                            x: x
                        });
                    }
                });
                // Constrain the line width, either by ellipsis or wrapping
                var width = this.width || 0;
                if (!width) {
                    return;
                }
                // Insert soft line breaks into each text node
                var modifyTextNode = function (textNode, parentElement) {
                    var text = textNode.textContent || '';
                    var words = text
                        .replace(/([^\^])-/g, '$1- ') // Split on hyphens
                        // .trim()
                        .split(' '); // #1273
                    var hasWhiteSpace = !_this.noWrap && (words.length > 1 || wrapper.element.childNodes.length > 1);
                    var dy = _this.getLineHeight(parentElement);
                    var lineNo = 0;
                    var startAt = wrapper.actualWidth;
                    if (_this.ellipsis) {
                        if (text) {
                            _this.truncate(textNode, text, void 0, 0, 
                            // Target width
                            Math.max(0, 
                            // Substract the font face to make room for the
                            // ellipsis itself
                            width - 0.8 * dy), 
                            // Build the text to test for
                            function (text, currentIndex) {
                                return text.substring(0, currentIndex) + '\u2026';
                            });
                        }
                    }
                    else if (hasWhiteSpace) {
                        var lines = [];
                        // Remove preceding siblings in order to make the text length
                        // calculation correct in the truncate function
                        var precedingSiblings = [];
                        while (parentElement.firstChild &&
                            parentElement.firstChild !== textNode) {
                            precedingSiblings.push(parentElement.firstChild);
                            parentElement.removeChild(parentElement.firstChild);
                        }
                        while (words.length) {
                            // Apply the previous line
                            if (words.length && !_this.noWrap && lineNo > 0) {
                                lines.push(textNode.textContent || '');
                                textNode.textContent = words.join(' ')
                                    .replace(/- /g, '-');
                            }
                            // For each line, truncate the remaining
                            // words into the line length.
                            _this.truncate(textNode, void 0, words, lineNo === 0 ? (startAt || 0) : 0, width, 
                            // Build the text to test for
                            function (t, currentIndex) {
                                return words
                                    .slice(0, currentIndex)
                                    .join(' ')
                                    .replace(/- /g, '-');
                            });
                            startAt = wrapper.actualWidth;
                            lineNo++;
                        }
                        // Reinsert the preceding child nodes
                        precedingSiblings.forEach(function (childNode) {
                            parentElement.insertBefore(childNode, textNode);
                        });
                        // Insert the previous lines before the original text node
                        lines.forEach(function (line) {
                            // Insert the line
                            parentElement.insertBefore(doc.createTextNode(line), textNode);
                            // Insert a break
                            var br = doc.createElementNS(SVG_NS, 'tspan');
                            br.textContent = '\u200B'; // zero-width space
                            attr(br, { dy: dy, x: x });
                            parentElement.insertBefore(br, textNode);
                        });
                    }
                };
                // Recurse down the DOM tree and handle line breaks for each text node
                var modifyChildren = (function (node) {
                    var childNodes = [].slice.call(node.childNodes);
                    childNodes.forEach(function (childNode) {
                        if (childNode.nodeType === win.Node.TEXT_NODE) {
                            modifyTextNode(childNode, node);
                        }
                        else {
                            // Reset word-wrap width readings after hard breaks
                            if (childNode.className.baseVal
                                .indexOf('highcharts-br') !== -1) {
                                wrapper.actualWidth = 0;
                            }
                            // Recurse down to child node
                            modifyChildren(childNode);
                        }
                    });
                });
                modifyChildren(wrapper.element);
            };
            /**
             * Get the rendered line height of a <text>, <tspan> or pure text node.
             *
             * @param {DOMElementType|Text} node The node to check for
             *
             * @return {number} The rendered line height
             */
            TextBuilder.prototype.getLineHeight = function (node) {
                // If the node is a text node, use its parent
                var element = (node.nodeType === win.Node.TEXT_NODE) ?
                    node.parentElement :
                    node;
                return this.textLineHeight ?
                    parseInt(this.textLineHeight.toString(), 10) :
                    this.renderer.fontMetrics(element || this.svgElement.element).h;
            };
            /**
             * Transform a pseudo HTML AST node tree into an SVG structure. We do as
             * much heavy lifting as we can here, before doing the final processing in
             * the modifyDOM function. The original data is mutated.
             *
             * @private
             *
             * @param {ASTNode[]} nodes The AST nodes
             *
             */
            TextBuilder.prototype.modifyTree = function (nodes) {
                var _this = this;
                var modifyChild = function (node, i) {
                    var _a = node.attributes, attributes = _a === void 0 ? {} : _a, children = node.children, _b = node.style, style = _b === void 0 ? {} : _b, tagName = node.tagName, styledMode = _this.renderer.styledMode;
                    // Apply styling to text tags
                    if (tagName === 'b' || tagName === 'strong') {
                        if (styledMode) {
                            // eslint-disable-next-line dot-notation
                            attributes['class'] = 'highcharts-strong';
                        }
                        else {
                            style.fontWeight = 'bold';
                        }
                    }
                    else if (tagName === 'i' || tagName === 'em') {
                        if (styledMode) {
                            // eslint-disable-next-line dot-notation
                            attributes['class'] = 'highcharts-emphasized';
                        }
                        else {
                            style.fontStyle = 'italic';
                        }
                    }
                    // Modify styling
                    if (style && style.color) {
                        style.fill = style.color;
                    }
                    // Handle breaks
                    if (tagName === 'br') {
                        attributes['class'] = 'highcharts-br'; // eslint-disable-line dot-notation
                        node.textContent = '\u200B'; // zero-width space
                        // Trim whitespace off the beginning of new lines
                        var nextNode = nodes[i + 1];
                        if (nextNode && nextNode.textContent) {
                            nextNode.textContent =
                                nextNode.textContent.replace(/^ +/gm, '');
                        }
                        // If an anchor has direct text node children, the text is unable to
                        // wrap because there is no `getSubStringLength` function on the
                        // element. Therefore we need to wrap the child text node or nodes
                        // in a tspan. #16173.
                    }
                    else if (tagName === 'a' &&
                        children &&
                        children.some(function (child) { return child.tagName === '#text'; })) {
                        node.children = [{ children: children, tagName: 'tspan' }];
                    }
                    if (tagName !== '#text' && tagName !== 'a') {
                        node.tagName = 'tspan';
                    }
                    extend(node, { attributes: attributes, style: style });
                    // Recurse
                    if (children) {
                        children
                            .filter(function (c) { return c.tagName !== '#text'; })
                            .forEach(modifyChild);
                    }
                };
                nodes.forEach(modifyChild);
                fireEvent(this.svgElement, 'afterModifyTree', { nodes: nodes });
            };
            /*
             * Truncate the text node contents to a given length. Used when the css
             * width is set. If the `textOverflow` is `ellipsis`, the text is truncated
             * character by character to the given length. If not, the text is
             * word-wrapped line by line.
             */
            TextBuilder.prototype.truncate = function (textNode, text, words, startAt, width, getString) {
                var svgElement = this.svgElement;
                var renderer = svgElement.renderer, rotation = svgElement.rotation;
                // Cache the lengths to avoid checking the same twice
                var lengths = [];
                // Word wrap cannot be truncated to shorter than one word, ellipsis
                // text can be completely blank.
                var minIndex = words ? 1 : 0;
                var maxIndex = (text || words || '').length;
                var currentIndex = maxIndex;
                var str;
                var actualWidth;
                var getSubStringLength = function (charEnd, concatenatedEnd) {
                    // charEnd is used when finding the character-by-character
                    // break for ellipsis, concatenatedEnd is used for word-by-word
                    // break for word wrapping.
                    var end = concatenatedEnd || charEnd;
                    var parentNode = textNode.parentNode;
                    if (parentNode && typeof lengths[end] === 'undefined') {
                        // Modern browsers
                        if (parentNode.getSubStringLength) {
                            // Fails with DOM exception on unit-tests/legend/members
                            // of unknown reason. Desired width is 0, text content
                            // is "5" and end is 1.
                            try {
                                lengths[end] = startAt +
                                    parentNode.getSubStringLength(0, words ? end + 1 : end);
                            }
                            catch (e) {
                                '';
                            }
                        }
                    }
                    return lengths[end];
                };
                svgElement.rotation = 0; // discard rotation when computing box
                actualWidth = getSubStringLength(textNode.textContent.length);
                if (startAt + actualWidth > width) {
                    // Do a binary search for the index where to truncate the text
                    while (minIndex <= maxIndex) {
                        currentIndex = Math.ceil((minIndex + maxIndex) / 2);
                        // When checking words for word-wrap, we need to build the
                        // string and measure the subStringLength at the concatenated
                        // word length.
                        if (words) {
                            str = getString(words, currentIndex);
                        }
                        actualWidth = getSubStringLength(currentIndex, str && str.length - 1);
                        if (minIndex === maxIndex) {
                            // Complete
                            minIndex = maxIndex + 1;
                        }
                        else if (actualWidth > width) {
                            // Too large. Set max index to current.
                            maxIndex = currentIndex - 1;
                        }
                        else {
                            // Within width. Set min index to current.
                            minIndex = currentIndex;
                        }
                    }
                    // If max index was 0 it means the shortest possible text was also
                    // too large. For ellipsis that means only the ellipsis, while for
                    // word wrap it means the whole first word.
                    if (maxIndex === 0) {
                        // Remove ellipsis
                        textNode.textContent = '';
                        // If the new text length is one less than the original, we don't
                        // need the ellipsis
                    }
                    else if (!(text && maxIndex === text.length - 1)) {
                        textNode.textContent = str || getString(text || words, currentIndex);
                    }
                }
                // When doing line wrapping, prepare for the next line by removing the
                // items from this line.
                if (words) {
                    words.splice(0, currentIndex);
                }
                svgElement.actualWidth = actualWidth;
                svgElement.rotation = rotation; // Apply rotation again.
            };
            /*
             * Un-escape HTML entities based on the public `renderer.escapes` list
             *
             * @private
             *
             * @param {string} inputStr The string to unescape
             * @param {Array<string>} [except] Exceptions
             *
             * @return {string} The processed string
             */
            TextBuilder.prototype.unescapeEntities = function (inputStr, except) {
                objectEach(this.renderer.escapes, function (value, key) {
                    if (!except || except.indexOf(value) === -1) {
                        inputStr = inputStr.toString().replace(new RegExp(value, 'g'), key);
                    }
                });
                return inputStr;
            };
            return TextBuilder;
        }());

        return TextBuilder;
    });
    _registerModule(_modules, 'Core/Renderer/SVG/SVGRenderer.js', [_modules['Core/Renderer/HTML/AST.js'], _modules['Core/Color/Color.js'], _modules['Core/Globals.js'], _modules['Core/Renderer/RendererRegistry.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Renderer/SVG/SVGLabel.js'], _modules['Core/Renderer/SVG/Symbols.js'], _modules['Core/Renderer/SVG/TextBuilder.js'], _modules['Core/Utilities.js']], function (AST, Color, H, RendererRegistry, SVGElement, SVGLabel, Symbols, TextBuilder, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
            if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
            return to.concat(ar || Array.prototype.slice.call(from));
        };
        var charts = H.charts, deg2rad = H.deg2rad, doc = H.doc, isFirefox = H.isFirefox, isMS = H.isMS, isWebKit = H.isWebKit, noop = H.noop, SVG_NS = H.SVG_NS, symbolSizes = H.symbolSizes, win = H.win;
        var addEvent = U.addEvent, attr = U.attr, createElement = U.createElement, css = U.css, defined = U.defined, destroyObjectProperties = U.destroyObjectProperties, extend = U.extend, isArray = U.isArray, isNumber = U.isNumber, isObject = U.isObject, isString = U.isString, merge = U.merge, pick = U.pick, pInt = U.pInt, uniqueKey = U.uniqueKey;
        /* *
         *
         *  Variables
         *
         * */
        var hasInternalReferenceBug;
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * Allows direct access to the Highcharts rendering layer in order to draw
         * primitive shapes like circles, rectangles, paths or text directly on a chart,
         * or independent from any chart. The SVGRenderer represents a wrapper object
         * for SVG in modern browsers.
         *
         * An existing chart's renderer can be accessed through {@link Chart.renderer}.
         * The renderer can also be used completely decoupled from a chart.
         *
         * @sample highcharts/members/renderer-on-chart
         *         Annotating a chart programmatically.
         * @sample highcharts/members/renderer-basic
         *         Independent SVG drawing.
         *
         * @example
         * // Use directly without a chart object.
         * let renderer = new Highcharts.Renderer(parentNode, 600, 400);
         *
         * @class
         * @name Highcharts.SVGRenderer
         *
         * @param {Highcharts.HTMLDOMElement} container
         *        Where to put the SVG in the web page.
         *
         * @param {number} width
         *        The width of the SVG.
         *
         * @param {number} height
         *        The height of the SVG.
         *
         * @param {Highcharts.CSSObject} [style]
         *        The box style, if not in styleMode
         *
         * @param {boolean} [forExport=false]
         *        Whether the rendered content is intended for export.
         *
         * @param {boolean} [allowHTML=true]
         *        Whether the renderer is allowed to include HTML text, which will be
         *        projected on top of the SVG.
         *
         * @param {boolean} [styledMode=false]
         *        Whether the renderer belongs to a chart that is in styled mode.
         *        If it does, it will avoid setting presentational attributes in
         *        some cases, but not when set explicitly through `.attr` and `.css`
         *        etc.
         */
        var SVGRenderer = /** @class */ (function () {
            /* *
             *
             *  Constructors
             *
             * */
            function SVGRenderer(container, width, height, style, forExport, allowHTML, styledMode) {
                /* *
                 *
                 *  Properties
                 *
                 * */
                this.alignedObjects = void 0;
                /**
                 * The root `svg` node of the renderer.
                 *
                 * @name Highcharts.SVGRenderer#box
                 * @type {Highcharts.SVGDOMElement}
                 */
                this.box = void 0;
                /**
                 * The wrapper for the root `svg` node of the renderer.
                 *
                 * @name Highcharts.SVGRenderer#boxWrapper
                 * @type {Highcharts.SVGElement}
                 */
                this.boxWrapper = void 0;
                this.cache = void 0;
                this.cacheKeys = void 0;
                this.chartIndex = void 0;
                /**
                 * A pointer to the `defs` node of the root SVG.
                 *
                 * @name Highcharts.SVGRenderer#defs
                 * @type {Highcharts.SVGElement}
                 */
                this.defs = void 0;
                this.globalAnimation = void 0;
                this.gradients = void 0;
                this.height = void 0;
                this.imgCount = void 0;
                this.style = void 0;
                /**
                 * Page url used for internal references.
                 *
                 * @private
                 * @name Highcharts.SVGRenderer#url
                 * @type {string}
                 */
                this.url = void 0;
                this.width = void 0;
                this.init(container, width, height, style, forExport, allowHTML, styledMode);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initialize the SVGRenderer. Overridable initializer function that takes
             * the same parameters as the constructor.
             *
             * @function Highcharts.SVGRenderer#init
             *
             * @param {Highcharts.HTMLDOMElement} container
             * Where to put the SVG in the web page.
             *
             * @param {number} width
             * The width of the SVG.
             *
             * @param {number} height
             * The height of the SVG.
             *
             * @param {Highcharts.CSSObject} [style]
             * The box style, if not in styleMode
             *
             * @param {boolean} [forExport=false]
             * Whether the rendered content is intended for export.
             *
             * @param {boolean} [allowHTML=true]
             * Whether the renderer is allowed to include HTML text, which will be
             * projected on top of the SVG.
             *
             * @param {boolean} [styledMode=false]
             * Whether the renderer belongs to a chart that is in styled mode. If it
             * does, it will avoid setting presentational attributes in some cases, but
             * not when set explicitly through `.attr` and `.css` etc.
             */
            SVGRenderer.prototype.init = function (container, width, height, style, forExport, allowHTML, styledMode) {
                var renderer = this, boxWrapper = renderer
                    .createElement('svg')
                    .attr({
                    version: '1.1',
                    'class': 'highcharts-root'
                }), element = boxWrapper.element;
                if (!styledMode) {
                    boxWrapper.css(this.getStyle(style));
                }
                container.appendChild(element);
                // Always use ltr on the container, otherwise text-anchor will be
                // flipped and text appear outside labels, buttons, tooltip etc (#3482)
                attr(container, 'dir', 'ltr');
                // For browsers other than IE, add the namespace attribute (#1978)
                if (container.innerHTML.indexOf('xmlns') === -1) {
                    attr(element, 'xmlns', this.SVG_NS);
                }
                this.box = element;
                this.boxWrapper = boxWrapper;
                renderer.alignedObjects = [];
                this.url = this.getReferenceURL();
                // Add description
                var desc = this.createElement('desc').add();
                desc.element.appendChild(doc.createTextNode('Created with Highcharts 11.1.0'));
                renderer.defs = this.createElement('defs').add();
                renderer.allowHTML = allowHTML;
                renderer.forExport = forExport;
                renderer.styledMode = styledMode;
                renderer.gradients = {}; // Object where gradient SvgElements are stored
                renderer.cache = {}; // Cache for numerical bounding boxes
                renderer.cacheKeys = [];
                renderer.imgCount = 0;
                renderer.rootFontSize = boxWrapper.getStyle('font-size');
                renderer.setSize(width, height, false);
                // Issue 110 workaround:
                // In Firefox, if a div is positioned by percentage, its pixel position
                // may land between pixels. The container itself doesn't display this,
                // but an SVG element inside this container will be drawn at subpixel
                // precision. In order to draw sharp lines, this must be compensated
                // for. This doesn't seem to work inside iframes though (like in
                // jsFiddle).
                var subPixelFix, rect;
                if (isFirefox && container.getBoundingClientRect) {
                    subPixelFix = function () {
                        css(container, { left: 0, top: 0 });
                        rect = container.getBoundingClientRect();
                        css(container, {
                            left: (Math.ceil(rect.left) - rect.left) + 'px',
                            top: (Math.ceil(rect.top) - rect.top) + 'px'
                        });
                    };
                    // run the fix now
                    subPixelFix();
                    // run it on resize
                    renderer.unSubPixelFix = addEvent(win, 'resize', subPixelFix);
                }
            };
            /**
             * General method for adding a definition to the SVG `defs` tag. Can be used
             * for gradients, fills, filters etc. Styled mode only. A hook for adding
             * general definitions to the SVG's defs tag. Definitions can be referenced
             * from the CSS by its `id`. Read more in
             * [gradients, shadows and patterns](https://www.highcharts.com/docs/chart-design-and-style/gradients-shadows-and-patterns).
             * Styled mode only.
             *
             * @function Highcharts.SVGRenderer#definition
             *
             * @param {Highcharts.ASTNode} def
             * A serialized form of an SVG definition, including children.
             *
             * @return {Highcharts.SVGElement}
             * The inserted node.
             */
            SVGRenderer.prototype.definition = function (def) {
                var ast = new AST([def]);
                return ast.addToDOM(this.defs.element);
            };
            /**
             * Get the prefix needed for internal URL references to work in certain
             * cases. Some older browser versions had a bug where internal url
             * references in SVG attributes, on the form `url(#some-id)`, would fail if
             * a base tag was present in the page. There were also issues with
             * `history.pushState` related to this prefix.
             *
             * Related issues: #24, #672, #1070, #5244.
             *
             * The affected browsers are:
             * - Chrome <= 53 (May 2018)
             * - Firefox <= 51 (January 2017)
             * - Safari/Mac <= 12.1 (2018 or 2019)
             * - Safari/iOS <= 13
             *
             * @todo Remove this hack when time has passed. All the affected browsers
             * are evergreens, so it is increasingly unlikely that users are affected by
             * the bug.
             *
             * @return {string}
             * The prefix to use. An empty string for modern browsers.
             */
            SVGRenderer.prototype.getReferenceURL = function () {
                if ((isFirefox || isWebKit) &&
                    doc.getElementsByTagName('base').length) {
                    // Detect if a clip path is taking effect by performing a hit test
                    // outside the clipped area. If the hit element is the rectangle
                    // that was supposed to be clipped, the bug is present. This only
                    // has to be performed once per page load, so we store the result
                    // locally in the module.
                    if (!defined(hasInternalReferenceBug)) {
                        var id = uniqueKey();
                        var ast = new AST([{
                                tagName: 'svg',
                                attributes: {
                                    width: 8,
                                    height: 8
                                },
                                children: [{
                                        tagName: 'defs',
                                        children: [{
                                                tagName: 'clipPath',
                                                attributes: {
                                                    id: id
                                                },
                                                children: [{
                                                        tagName: 'rect',
                                                        attributes: {
                                                            width: 4,
                                                            height: 4
                                                        }
                                                    }]
                                            }]
                                    }, {
                                        tagName: 'rect',
                                        attributes: {
                                            id: 'hitme',
                                            width: 8,
                                            height: 8,
                                            'clip-path': "url(#".concat(id, ")"),
                                            fill: 'rgba(0,0,0,0.001)'
                                        }
                                    }]
                            }]);
                        var svg = ast.addToDOM(doc.body);
                        css(svg, {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            zIndex: 9e5
                        });
                        var hitElement = doc.elementFromPoint(6, 6);
                        hasInternalReferenceBug = (hitElement && hitElement.id) === 'hitme';
                        doc.body.removeChild(svg);
                    }
                    if (hasInternalReferenceBug) {
                        return win.location.href
                            .split('#')[0] // remove the hash
                            .replace(/<[^>]*>/g, '') // wing cut HTML
                            // escape parantheses and quotes
                            .replace(/([\('\)])/g, '\\$1')
                            // replace spaces (needed for Safari only)
                            .replace(/ /g, '%20');
                    }
                }
                return '';
            };
            /**
             * Get the global style setting for the renderer.
             *
             * @private
             * @function Highcharts.SVGRenderer#getStyle
             *
             * @param {Highcharts.CSSObject} style
             * Style settings.
             *
             * @return {Highcharts.CSSObject}
             * The style settings mixed with defaults.
             */
            SVGRenderer.prototype.getStyle = function (style) {
                this.style = extend({
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontSize: '1rem'
                }, style);
                return this.style;
            };
            /**
             * Apply the global style on the renderer, mixed with the default styles.
             *
             * @function Highcharts.SVGRenderer#setStyle
             *
             * @param {Highcharts.CSSObject} style
             * CSS to apply.
             */
            SVGRenderer.prototype.setStyle = function (style) {
                this.boxWrapper.css(this.getStyle(style));
            };
            /**
             * Detect whether the renderer is hidden. This happens when one of the
             * parent elements has `display: none`. Used internally to detect when we
             * needto render preliminarily in another div to get the text bounding boxes
             * right.
             *
             * @function Highcharts.SVGRenderer#isHidden
             *
             * @return {boolean}
             * True if it is hidden.
             */
            SVGRenderer.prototype.isHidden = function () {
                return !this.boxWrapper.getBBox().width;
            };
            /**
             * Destroys the renderer and its allocated members.
             *
             * @function Highcharts.SVGRenderer#destroy
             *
             * @return {null}
             * Pass through value.
             */
            SVGRenderer.prototype.destroy = function () {
                var renderer = this, rendererDefs = renderer.defs;
                renderer.box = null;
                renderer.boxWrapper = renderer.boxWrapper.destroy();
                // Call destroy on all gradient elements
                destroyObjectProperties(renderer.gradients || {});
                renderer.gradients = null;
                renderer.defs = rendererDefs.destroy();
                // Remove sub pixel fix handler (#982)
                if (renderer.unSubPixelFix) {
                    renderer.unSubPixelFix();
                }
                renderer.alignedObjects = null;
                return null;
            };
            /**
             * Create a wrapper for an SVG element. Serves as a factory for
             * {@link SVGElement}, but this function is itself mostly called from
             * primitive factories like {@link SVGRenderer#path}, {@link
             * SVGRenderer#rect} or {@link SVGRenderer#text}.
             *
             * @function Highcharts.SVGRenderer#createElement
             *
             * @param {string} nodeName
             * The node name, for example `rect`, `g` etc.
             *
             * @return {Highcharts.SVGElement}
             * The generated SVGElement.
             */
            SVGRenderer.prototype.createElement = function (nodeName) {
                var wrapper = new this.Element();
                wrapper.init(this, nodeName);
                return wrapper;
            };
            /**
             * Get converted radial gradient attributes according to the radial
             * reference. Used internally from the {@link SVGElement#colorGradient}
             * function.
             *
             * @private
             * @function Highcharts.SVGRenderer#getRadialAttr
             */
            SVGRenderer.prototype.getRadialAttr = function (radialReference, gradAttr) {
                return {
                    cx: (radialReference[0] - radialReference[2] / 2) +
                        (gradAttr.cx || 0) * radialReference[2],
                    cy: (radialReference[1] - radialReference[2] / 2) +
                        (gradAttr.cy || 0) * radialReference[2],
                    r: (gradAttr.r || 0) * radialReference[2]
                };
            };
            /**
             * Create a drop shadow definition and return its id
             *
             * @private
             * @function Highcharts.SVGRenderer#shadowDefinition
             *
             * @param {boolean|Highcharts.ShadowOptionsObject} [shadowOptions] The
             *        shadow options. If `true`, the default options are applied
             */
            SVGRenderer.prototype.shadowDefinition = function (shadowOptions) {
                var id = __spreadArray([
                    "highcharts-drop-shadow-".concat(this.chartIndex)
                ], Object.keys(shadowOptions)
                    .map(function (key) {
                    return shadowOptions[key];
                }), true).join('-').replace(/[^a-z0-9\-]/g, ''), options = merge({
                    color: '#000000',
                    offsetX: 1,
                    offsetY: 1,
                    opacity: 0.15,
                    width: 5
                }, shadowOptions);
                if (!this.defs.element.querySelector("#".concat(id))) {
                    this.definition({
                        tagName: 'filter',
                        attributes: {
                            id: id
                        },
                        children: [{
                                tagName: 'feDropShadow',
                                attributes: {
                                    dx: options.offsetX,
                                    dy: options.offsetY,
                                    'flood-color': options.color,
                                    // Tuned and modified to keep a preserve compatibility
                                    // with the old settings
                                    'flood-opacity': Math.min(options.opacity * 5, 1),
                                    stdDeviation: options.width / 2
                                }
                            }]
                    });
                }
                return id;
            };
            /**
             * Parse a simple HTML string into SVG tspans. Called internally when text
             * is set on an SVGElement. The function supports a subset of HTML tags, CSS
             * text features like `width`, `text-overflow`, `white-space`, and also
             * attributes like `href` and `style`.
             *
             * @private
             * @function Highcharts.SVGRenderer#buildText
             *
             * @param {Highcharts.SVGElement} wrapper
             * The parent SVGElement.
             */
            SVGRenderer.prototype.buildText = function (wrapper) {
                new TextBuilder(wrapper).buildSVG();
            };
            /**
             * Returns white for dark colors and black for bright colors, based on W3C's
             * definition of [Relative luminance](
             * https://www.w3.org/WAI/GL/wiki/Relative_luminance).
             *
             * @function Highcharts.SVGRenderer#getContrast
             *
             * @param {Highcharts.ColorString} color
             * The color to get the contrast for.
             *
             * @return {Highcharts.ColorString}
             * The contrast color, either `#000000` or `#FFFFFF`.
             */
            SVGRenderer.prototype.getContrast = function (color) {
                // #6216, #17273
                var rgba = Color.parse(color).rgba
                    .map(function (b8) {
                    var c = b8 / 255;
                    return c <= 0.03928 ?
                        c / 12.92 :
                        Math.pow((c + 0.055) / 1.055, 2.4);
                });
                // Relative luminance
                var l = 0.2126 * rgba[0] + 0.7152 * rgba[1] + 0.0722 * rgba[2];
                // Use white or black based on which provides more contrast
                return 1.05 / (l + 0.05) > (l + 0.05) / 0.05 ? '#FFFFFF' : '#000000';
            };
            /**
             * Create a button with preset states.
             *
             * @function Highcharts.SVGRenderer#button
             *
             * @param {string} text
             * The text or HTML to draw.
             *
             * @param {number} x
             * The x position of the button's left side.
             *
             * @param {number} y
             * The y position of the button's top side.
             *
             * @param {Highcharts.EventCallbackFunction<Highcharts.SVGElement>} callback
             * The function to execute on button click or touch.
             *
             * @param {Highcharts.SVGAttributes} [theme]
             * SVG attributes for the normal state.
             *
             * @param {Highcharts.SVGAttributes} [hoverState]
             * SVG attributes for the hover state.
             *
             * @param {Highcharts.SVGAttributes} [selectState]
             * SVG attributes for the pressed state.
             *
             * @param {Highcharts.SVGAttributes} [disabledState]
             * SVG attributes for the disabled state.
             *
             * @param {Highcharts.SymbolKeyValue} [shape=rect]
             * The shape type.
             *
             * @param {boolean} [useHTML=false]
             * Whether to use HTML to render the label.
             *
             * @return {Highcharts.SVGElement}
             * The button element.
             */
            SVGRenderer.prototype.button = function (text, x, y, callback, theme, hoverState, selectState, disabledState, shape, useHTML) {
                if (theme === void 0) { theme = {}; }
                var label = this.label(text, x, y, shape, void 0, void 0, useHTML, void 0, 'button'), styledMode = this.styledMode, states = theme.states || {};
                var curState = 0;
                theme = merge(theme);
                delete theme.states;
                var normalStyle = merge({
                    color: "#333333" /* Palette.neutralColor80 */,
                    cursor: 'pointer',
                    fontSize: '0.8em',
                    fontWeight: 'normal'
                }, theme.style);
                delete theme.style;
                // Remove stylable attributes. Pass in the ButtonThemeObject and get the
                // SVGAttributes subset back.
                var normalState = AST.filterUserAttributes(theme);
                // Default, non-stylable attributes
                label.attr(merge({ padding: 8, r: 2 }, normalState));
                // Presentational. The string type is a mistake, it is just for
                // compliance with SVGAttribute and is not used in button theme.
                var hoverStyle, selectStyle, disabledStyle;
                if (!styledMode) {
                    // Normal state - prepare the attributes
                    normalState = merge({
                        fill: "#f7f7f7" /* Palette.neutralColor3 */,
                        stroke: "#cccccc" /* Palette.neutralColor20 */,
                        'stroke-width': 1
                    }, normalState);
                    // Hover state
                    hoverState = merge(normalState, {
                        fill: "#e6e6e6" /* Palette.neutralColor10 */
                    }, AST.filterUserAttributes(hoverState || states.hover || {}));
                    hoverStyle = hoverState.style;
                    delete hoverState.style;
                    // Pressed state
                    selectState = merge(normalState, {
                        fill: "#e6e9ff" /* Palette.highlightColor10 */,
                        style: {
                            color: "#000000" /* Palette.neutralColor100 */,
                            fontWeight: 'bold'
                        }
                    }, AST.filterUserAttributes(selectState || states.select || {}));
                    selectStyle = selectState.style;
                    delete selectState.style;
                    // Disabled state
                    disabledState = merge(normalState, {
                        style: {
                            color: "#cccccc" /* Palette.neutralColor20 */
                        }
                    }, AST.filterUserAttributes(disabledState || states.disabled || {}));
                    disabledStyle = disabledState.style;
                    delete disabledState.style;
                }
                // Add the events. IE9 and IE10 need mouseover and mouseout to function
                // (#667).
                addEvent(label.element, isMS ? 'mouseover' : 'mouseenter', function () {
                    if (curState !== 3) {
                        label.setState(1);
                    }
                });
                addEvent(label.element, isMS ? 'mouseout' : 'mouseleave', function () {
                    if (curState !== 3) {
                        label.setState(curState);
                    }
                });
                label.setState = function (state) {
                    // Hover state is temporary, don't record it
                    if (state !== 1) {
                        label.state = curState = state;
                    }
                    // Update visuals
                    label
                        .removeClass(/highcharts-button-(normal|hover|pressed|disabled)/)
                        .addClass('highcharts-button-' +
                        ['normal', 'hover', 'pressed', 'disabled'][state || 0]);
                    if (!styledMode) {
                        label
                            .attr([
                            normalState,
                            hoverState,
                            selectState,
                            disabledState
                        ][state || 0]);
                        var css_1 = [
                            normalStyle,
                            hoverStyle,
                            selectStyle,
                            disabledStyle
                        ][state || 0];
                        if (isObject(css_1)) {
                            label.css(css_1);
                        }
                    }
                };
                // Presentational attributes
                if (!styledMode) {
                    label
                        .attr(normalState)
                        .css(extend({ cursor: 'default' }, normalStyle));
                    // HTML labels don't need to handle pointer events because click and
                    // mouseenter/mouseleave is bound to the underlying <g> element.
                    // Should this be reconsidered, we need more complex logic to share
                    // events between the <g> and its <div> counterpart, and avoid
                    // triggering mouseenter/mouseleave when hovering from one to the
                    // other (#17440).
                    if (useHTML) {
                        label.text.css({ pointerEvents: 'none' });
                    }
                }
                return label
                    .on('touchstart', function (e) { return e.stopPropagation(); })
                    .on('click', function (e) {
                    if (curState !== 3) {
                        callback.call(label, e);
                    }
                });
            };
            /**
             * Make a straight line crisper by not spilling out to neighbour pixels.
             *
             * @function Highcharts.SVGRenderer#crispLine
             *
             * @param {Highcharts.SVGPathArray} points
             *        The original points on the format `[['M', 0, 0], ['L', 100, 0]]`.
             *
             * @param {number} width
             *        The width of the line.
             *
             * @param {string} [roundingFunction=round]
             *        The rounding function name on the `Math` object, can be one of
             *        `round`, `floor` or `ceil`.
             *
             * @return {Highcharts.SVGPathArray}
             *         The original points array, but modified to render crisply.
             */
            SVGRenderer.prototype.crispLine = function (points, width, roundingFunction) {
                if (roundingFunction === void 0) { roundingFunction = 'round'; }
                var start = points[0];
                var end = points[1];
                // Normalize to a crisp line
                if (defined(start[1]) && start[1] === end[1]) {
                    // Substract due to #1129. Now bottom and left axis gridlines behave
                    // the same.
                    start[1] = end[1] =
                        Math[roundingFunction](start[1]) - (width % 2 / 2);
                }
                if (defined(start[2]) && start[2] === end[2]) {
                    start[2] = end[2] =
                        Math[roundingFunction](start[2]) + (width % 2 / 2);
                }
                return points;
            };
            /**
             * Draw a path, wraps the SVG `path` element.
             *
             * @sample highcharts/members/renderer-path-on-chart/
             *         Draw a path in a chart
             * @sample highcharts/members/renderer-path/
             *         Draw a path independent from a chart
             *
             * @example
             * let path = renderer.path(['M', 10, 10, 'L', 30, 30, 'z'])
             *     .attr({ stroke: '#ff00ff' })
             *     .add();
             *
             * @function Highcharts.SVGRenderer#path
             *
             * @param {Highcharts.SVGPathArray} [path]
             * An SVG path definition in array form.
             *
             * @return {Highcharts.SVGElement}
             * The generated wrapper element.
             *
             */ /**
            * Draw a path, wraps the SVG `path` element.
            *
            * @function Highcharts.SVGRenderer#path
            *
            * @param {Highcharts.SVGAttributes} [attribs]
            * The initial attributes.
            *
            * @return {Highcharts.SVGElement}
            * The generated wrapper element.
            */
            SVGRenderer.prototype.path = function (path) {
                var attribs = (this.styledMode ? {} : {
                    fill: 'none'
                });
                if (isArray(path)) {
                    attribs.d = path;
                }
                else if (isObject(path)) { // attributes
                    extend(attribs, path);
                }
                return this.createElement('path').attr(attribs);
            };
            /**
             * Draw a circle, wraps the SVG `circle` element.
             *
             * @sample highcharts/members/renderer-circle/
             *         Drawing a circle
             *
             * @function Highcharts.SVGRenderer#circle
             *
             * @param {number} [x]
             * The center x position.
             *
             * @param {number} [y]
             * The center y position.
             *
             * @param {number} [r]
             * The radius.
             *
             * @return {Highcharts.SVGElement}
             * The generated wrapper element.
             */ /**
            * Draw a circle, wraps the SVG `circle` element.
            *
            * @function Highcharts.SVGRenderer#circle
            *
            * @param {Highcharts.SVGAttributes} [attribs]
            * The initial attributes.
            *
            * @return {Highcharts.SVGElement}
            * The generated wrapper element.
            */
            SVGRenderer.prototype.circle = function (x, y, r) {
                var attribs = (isObject(x) ?
                    x :
                    typeof x === 'undefined' ? {} : { x: x, y: y, r: r }), wrapper = this.createElement('circle');
                // Setting x or y translates to cx and cy
                wrapper.xSetter = wrapper.ySetter = function (value, key, element) {
                    element.setAttribute('c' + key, value);
                };
                return wrapper.attr(attribs);
            };
            /**
             * Draw and return an arc.
             *
             * @sample highcharts/members/renderer-arc/
             *         Drawing an arc
             *
             * @function Highcharts.SVGRenderer#arc
             *
             * @param {number} [x=0]
             * Center X position.
             *
             * @param {number} [y=0]
             * Center Y position.
             *
             * @param {number} [r=0]
             * The outer radius' of the arc.
             *
             * @param {number} [innerR=0]
             * Inner radius like used in donut charts.
             *
             * @param {number} [start=0]
             * The starting angle of the arc in radians, where 0 is to the right and
             * `-Math.PI/2` is up.
             *
             * @param {number} [end=0]
             * The ending angle of the arc in radians, where 0 is to the right and
             * `-Math.PI/2` is up.
             *
             * @return {Highcharts.SVGElement}
             * The generated wrapper element.
             */ /**
            * Draw and return an arc. Overloaded function that takes arguments object.
            *
            * @function Highcharts.SVGRenderer#arc
            *
            * @param {Highcharts.SVGAttributes} attribs
            * Initial SVG attributes.
            *
            * @return {Highcharts.SVGElement}
            * The generated wrapper element.
            */
            SVGRenderer.prototype.arc = function (x, y, r, innerR, start, end) {
                var options;
                if (isObject(x)) {
                    options = x;
                    y = options.y;
                    r = options.r;
                    innerR = options.innerR;
                    start = options.start;
                    end = options.end;
                    x = options.x;
                }
                else {
                    options = { innerR: innerR, start: start, end: end };
                }
                // Arcs are defined as symbols for the ability to set
                // attributes in attr and animate
                var arc = this.symbol('arc', x, y, r, r, options);
                arc.r = r; // #959
                return arc;
            };
            /**
             * Draw and return a rectangle.
             *
             * @function Highcharts.SVGRenderer#rect
             *
             * @param {number} [x]
             * Left position.
             *
             * @param {number} [y]
             * Top position.
             *
             * @param {number} [width]
             * Width of the rectangle.
             *
             * @param {number} [height]
             * Height of the rectangle.
             *
             * @param {number} [r]
             * Border corner radius.
             *
             * @param {number} [strokeWidth]
             * A stroke width can be supplied to allow crisp drawing.
             *
             * @return {Highcharts.SVGElement}
             * The generated wrapper element.
             */ /**
            * Draw and return a rectangle.
            *
            * @sample highcharts/members/renderer-rect-on-chart/
            *         Draw a rectangle in a chart
            * @sample highcharts/members/renderer-rect/
            *         Draw a rectangle independent from a chart
            *
            * @function Highcharts.SVGRenderer#rect
            *
            * @param {Highcharts.SVGAttributes} [attributes]
            * General SVG attributes for the rectangle.
            *
            * @return {Highcharts.SVGElement}
            * The generated wrapper element.
            */
            SVGRenderer.prototype.rect = function (x, y, width, height, r, strokeWidth) {
                var attribs = (isObject(x) ?
                    x :
                    typeof x === 'undefined' ?
                        {} :
                        {
                            x: x,
                            y: y,
                            r: r,
                            width: Math.max(width || 0, 0),
                            height: Math.max(height || 0, 0)
                        }), wrapper = this.createElement('rect');
                if (!this.styledMode) {
                    if (typeof strokeWidth !== 'undefined') {
                        attribs['stroke-width'] = strokeWidth;
                        extend(attribs, wrapper.crisp(attribs));
                    }
                    attribs.fill = 'none';
                }
                wrapper.rSetter = function (value, _key, element) {
                    wrapper.r = value;
                    attr(element, {
                        rx: value,
                        ry: value
                    });
                };
                wrapper.rGetter = function () {
                    return wrapper.r || 0;
                };
                return wrapper.attr(attribs);
            };
            /**
             * Draw and return a rectangle with advanced corner rounding options.
             *
             * @function Highcharts.SVGRenderer#roundedRect
             *
             * @param {Highcharts.SVGAttributes} attribs
             *      Attributes
             * @return {Highcharts.SVGElement}
             * The generated wrapper element.
             */
            SVGRenderer.prototype.roundedRect = function (attribs) {
                return this.symbol('roundedRect').attr(attribs);
            };
            /**
             * Resize the {@link SVGRenderer#box} and re-align all aligned child
             * elements.
             *
             * @sample highcharts/members/renderer-g/
             *         Show and hide grouped objects
             *
             * @function Highcharts.SVGRenderer#setSize
             *
             * @param {number} width
             * The new pixel width.
             *
             * @param {number} height
             * The new pixel height.
             *
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animate=true]
             * Whether and how to animate.
             */
            SVGRenderer.prototype.setSize = function (width, height, animate) {
                var renderer = this;
                renderer.width = width;
                renderer.height = height;
                renderer.boxWrapper.animate({
                    width: width,
                    height: height
                }, {
                    step: function () {
                        this.attr({
                            viewBox: '0 0 ' + this.attr('width') + ' ' +
                                this.attr('height')
                        });
                    },
                    duration: pick(animate, true) ? void 0 : 0
                });
                renderer.alignElements();
            };
            /**
             * Create and return an svg group element. Child
             * {@link Highcharts.SVGElement} objects are added to the group by using the
             * group as the first parameter in {@link Highcharts.SVGElement#add|add()}.
             *
             * @function Highcharts.SVGRenderer#g
             *
             * @param {string} [name]
             *        The group will be given a class name of `highcharts-{name}`. This
             *        can be used for styling and scripting.
             *
             * @return {Highcharts.SVGElement}
             *         The generated wrapper element.
             */
            SVGRenderer.prototype.g = function (name) {
                var elem = this.createElement('g');
                return name ?
                    elem.attr({ 'class': 'highcharts-' + name }) :
                    elem;
            };
            /**
             * Display an image.
             *
             * @sample highcharts/members/renderer-image-on-chart/
             *         Add an image in a chart
             * @sample highcharts/members/renderer-image/
             *         Add an image independent of a chart
             *
             * @function Highcharts.SVGRenderer#image
             *
             * @param {string} href
             *        The image source.
             *
             * @param {number} [x]
             *        The X position.
             *
             * @param {number} [y]
             *        The Y position.
             *
             * @param {number} [width]
             *        The image width. If omitted, it defaults to the image file width.
             *
             * @param {number} [height]
             *        The image height. If omitted it defaults to the image file
             *        height.
             *
             * @param {Function} [onload]
             *        Event handler for image load.
             *
             * @return {Highcharts.SVGElement}
             *         The generated wrapper element.
             */
            SVGRenderer.prototype.image = function (href, x, y, width, height, onload) {
                var attribs = { preserveAspectRatio: 'none' };
                // Optional properties (#11756)
                if (isNumber(x)) {
                    attribs.x = x;
                }
                if (isNumber(y)) {
                    attribs.y = y;
                }
                if (isNumber(width)) {
                    attribs.width = width;
                }
                if (isNumber(height)) {
                    attribs.height = height;
                }
                var elemWrapper = this.createElement('image').attr(attribs), onDummyLoad = function (e) {
                    elemWrapper.attr({ href: href });
                    onload.call(elemWrapper, e);
                };
                // Add load event if supplied
                if (onload) {
                    // We have to use a dummy HTML image since IE support for SVG image
                    // load events is very buggy. First set a transparent src, wait for
                    // dummy to load, and then add the real src to the SVG image.
                    elemWrapper.attr({
                        /* eslint-disable-next-line max-len */
                        href: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                    });
                    var dummy = new win.Image();
                    addEvent(dummy, 'load', onDummyLoad);
                    dummy.src = href;
                    if (dummy.complete) {
                        onDummyLoad({});
                    }
                }
                else {
                    elemWrapper.attr({ href: href });
                }
                return elemWrapper;
            };
            /**
             * Draw a symbol out of pre-defined shape paths from
             * {@link SVGRenderer#symbols}.
             * It is used in Highcharts for point makers, which cake a `symbol` option,
             * and label and button backgrounds like in the tooltip and stock flags.
             *
             * @function Highcharts.SVGRenderer#symbol
             *
             * @param {string} symbol
             * The symbol name.
             *
             * @param {number} [x]
             * The X coordinate for the top left position.
             *
             * @param {number} [y]
             * The Y coordinate for the top left position.
             *
             * @param {number} [width]
             * The pixel width.
             *
             * @param {number} [height]
             * The pixel height.
             *
             * @param {Highcharts.SymbolOptionsObject} [options]
             * Additional options, depending on the actual symbol drawn.
             *
             * @return {Highcharts.SVGElement}
             * SVG symbol.
             */
            SVGRenderer.prototype.symbol = function (symbol, x, y, width, height, options) {
                var ren = this, imageRegex = /^url\((.*?)\)$/, isImage = imageRegex.test(symbol), sym = (!isImage && (this.symbols[symbol] ? symbol : 'circle')), 
                // get the symbol definition function
                symbolFn = (sym && this.symbols[sym]);
                var obj, path, imageSrc, centerImage;
                if (symbolFn) {
                    // Check if there's a path defined for this symbol
                    if (typeof x === 'number') {
                        path = symbolFn.call(this.symbols, Math.round(x || 0), Math.round(y || 0), width || 0, height || 0, options);
                    }
                    obj = this.path(path);
                    if (!ren.styledMode) {
                        obj.attr('fill', 'none');
                    }
                    // expando properties for use in animate and attr
                    extend(obj, {
                        symbolName: (sym || void 0),
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    });
                    if (options) {
                        extend(obj, options);
                    }
                    // Image symbols
                }
                else if (isImage) {
                    imageSrc = symbol.match(imageRegex)[1];
                    // Create the image synchronously, add attribs async
                    var img_1 = obj = this.image(imageSrc);
                    // The image width is not always the same as the symbol width. The
                    // image may be centered within the symbol, as is the case when
                    // image shapes are used as label backgrounds, for example in flags.
                    img_1.imgwidth = pick(options && options.width, symbolSizes[imageSrc] && symbolSizes[imageSrc].width);
                    img_1.imgheight = pick(options && options.height, symbolSizes[imageSrc] && symbolSizes[imageSrc].height);
                    /**
                     * Set the size and position
                     */
                    centerImage = function (obj) { return obj.attr({
                        width: obj.width,
                        height: obj.height
                    }); };
                    /**
                     * Width and height setters that take both the image's physical size
                     * and the label size into consideration, and translates the image
                     * to center within the label.
                     */
                    ['width', 'height'].forEach(function (key) {
                        img_1[key + 'Setter'] = function (value, key) {
                            this[key] = value;
                            var _a = this, alignByTranslate = _a.alignByTranslate, element = _a.element, width = _a.width, height = _a.height, imgwidth = _a.imgwidth, imgheight = _a.imgheight;
                            var imgSize = this['img' + key];
                            if (defined(imgSize)) {
                                var scale = 1;
                                // Scale and center the image within its container.
                                // The name `backgroundSize` is taken from the CSS spec,
                                // but the value `within` is made up. Other possible
                                // values in the spec, `cover` and `contain`, can be
                                // implemented if needed.
                                if (options &&
                                    options.backgroundSize === 'within' &&
                                    width &&
                                    height) {
                                    scale = Math.min(width / imgwidth, height / imgheight);
                                    imgSize = Math.round(imgSize * scale);
                                    // Update both width and height to keep the ratio
                                    // correct (#17315)
                                    attr(element, {
                                        width: Math.round(imgwidth * scale),
                                        height: Math.round(imgheight * scale)
                                    });
                                }
                                else if (element) {
                                    element.setAttribute(key, imgSize);
                                }
                                if (!alignByTranslate) {
                                    this.translate(((width || 0) - (imgwidth * scale)) / 2, ((height || 0) - (imgheight * scale)) / 2);
                                }
                            }
                        };
                    });
                    if (defined(x)) {
                        img_1.attr({
                            x: x,
                            y: y
                        });
                    }
                    img_1.isImg = true;
                    if (defined(img_1.imgwidth) && defined(img_1.imgheight)) {
                        centerImage(img_1);
                    }
                    else {
                        // Initialize image to be 0 size so export will still function
                        // if there's no cached sizes.
                        img_1.attr({ width: 0, height: 0 });
                        // Create a dummy JavaScript image to get the width and height.
                        createElement('img', {
                            onload: function () {
                                var chart = charts[ren.chartIndex];
                                // Special case for SVGs on IE11, the width is not
                                // accessible until the image is part of the DOM
                                // (#2854).
                                if (this.width === 0) {
                                    css(this, {
                                        position: 'absolute',
                                        top: '-999em'
                                    });
                                    doc.body.appendChild(this);
                                }
                                // Center the image
                                symbolSizes[imageSrc] = {
                                    width: this.width,
                                    height: this.height
                                };
                                img_1.imgwidth = this.width;
                                img_1.imgheight = this.height;
                                if (img_1.element) {
                                    centerImage(img_1);
                                }
                                // Clean up after #2854 workaround.
                                if (this.parentNode) {
                                    this.parentNode.removeChild(this);
                                }
                                // Fire the load event when all external images are
                                // loaded
                                ren.imgCount--;
                                if (!ren.imgCount && chart && !chart.hasLoaded) {
                                    chart.onload();
                                }
                            },
                            src: imageSrc
                        });
                        this.imgCount++;
                    }
                }
                return obj;
            };
            /**
             * Define a clipping rectangle. The clipping rectangle is later applied
             * to {@link SVGElement} objects through the {@link SVGElement#clip}
             * function.
             *
             * @example
             * let circle = renderer.circle(100, 100, 100)
             *     .attr({ fill: 'red' })
             *     .add();
             * let clipRect = renderer.clipRect(100, 100, 100, 100);
             *
             * // Leave only the lower right quarter visible
             * circle.clip(clipRect);
             *
             * @function Highcharts.SVGRenderer#clipRect
             *
             * @param {number} [x]
             *
             * @param {number} [y]
             *
             * @param {number} [width]
             *
             * @param {number} [height]
             *
             * @return {Highcharts.ClipRectElement}
             *         A clipping rectangle.
             */
            SVGRenderer.prototype.clipRect = function (x, y, width, height) {
                var 
                // Add a hyphen at the end to avoid confusion in testing indexes
                // -1 and -10, -11 etc (#6550)
                id = uniqueKey() + '-', clipPath = this.createElement('clipPath').attr({
                    id: id
                }).add(this.defs), wrapper = this.rect(x, y, width, height, 0).add(clipPath);
                wrapper.id = id;
                wrapper.clipPath = clipPath;
                wrapper.count = 0;
                return wrapper;
            };
            /**
             * Draw text. The text can contain a subset of HTML, like spans and anchors
             * and some basic text styling of these. For more advanced features like
             * border and background, use {@link Highcharts.SVGRenderer#label} instead.
             * To update the text after render, run `text.attr({ text: 'New text' })`.
             *
             * @sample highcharts/members/renderer-text-on-chart/
             *         Annotate the chart freely
             * @sample highcharts/members/renderer-on-chart/
             *         Annotate with a border and in response to the data
             * @sample highcharts/members/renderer-text/
             *         Formatted text
             *
             * @function Highcharts.SVGRenderer#text
             *
             * @param {string} [str]
             * The text of (subset) HTML to draw.
             *
             * @param {number} [x]
             * The x position of the text's lower left corner.
             *
             * @param {number} [y]
             * The y position of the text's lower left corner.
             *
             * @param {boolean} [useHTML=false]
             * Use HTML to render the text.
             *
             * @return {Highcharts.SVGElement}
             * The text object.
             */
            SVGRenderer.prototype.text = function (str, x, y, useHTML) {
                var renderer = this, attribs = {};
                if (useHTML && (renderer.allowHTML || !renderer.forExport)) {
                    return renderer.html(str, x, y);
                }
                attribs.x = Math.round(x || 0); // X always needed for line-wrap logic
                if (y) {
                    attribs.y = Math.round(y);
                }
                if (defined(str)) {
                    attribs.text = str;
                }
                var wrapper = renderer.createElement('text').attr(attribs);
                if (!useHTML || (renderer.forExport && !renderer.allowHTML)) {
                    wrapper.xSetter = function (value, key, element) {
                        var tspans = element.getElementsByTagName('tspan'), parentVal = element.getAttribute(key);
                        for (var i = 0, tspan = void 0; i < tspans.length; i++) {
                            tspan = tspans[i];
                            // If the x values are equal, the tspan represents a line
                            // break
                            if (tspan.getAttribute(key) === parentVal) {
                                tspan.setAttribute(key, value);
                            }
                        }
                        element.setAttribute(key, value);
                    };
                }
                return wrapper;
            };
            /**
             * Utility to return the baseline offset and total line height from the font
             * size.
             *
             * @function Highcharts.SVGRenderer#fontMetrics
             *
             * @param {Highcharts.SVGElement|Highcharts.SVGDOMElement|number} [element]
             *        The element to inspect for a current font size. If a number is
             *        given, it's used as a fall back for direct font size in pixels.
             *
             * @return {Highcharts.FontMetricsObject}
             *         The font metrics.
             */
            SVGRenderer.prototype.fontMetrics = function (element) {
                var f = pInt(SVGElement.prototype.getStyle.call(element, 'font-size') || 0);
                // Empirical values found by comparing font size and bounding box
                // height. Applies to the default font family.
                // https://jsfiddle.net/highcharts/7xvn7/
                var h = f < 24 ? f + 3 : Math.round(f * 1.2), b = Math.round(h * 0.8);
                return {
                    // Line height
                    h: h,
                    // Baseline
                    b: b,
                    // Font size
                    f: f
                };
            };
            /**
             * Correct X and Y positioning of a label for rotation (#1764).
             *
             * @private
             * @function Highcharts.SVGRenderer#rotCorr
             */
            SVGRenderer.prototype.rotCorr = function (baseline, rotation, alterY) {
                var y = baseline;
                if (rotation && alterY) {
                    y = Math.max(y * Math.cos(rotation * deg2rad), 4);
                }
                return {
                    x: (-baseline / 3) * Math.sin(rotation * deg2rad),
                    y: y
                };
            };
            /**
             * Compatibility function to convert the legacy one-dimensional path array
             * into an array of segments.
             *
             * It is used in maps to parse the `path` option, and in SVGRenderer.dSetter
             * to support legacy paths from demos.
             *
             * @private
             * @function Highcharts.SVGRenderer#pathToSegments
             */
            SVGRenderer.prototype.pathToSegments = function (path) {
                var ret = [];
                var segment = [];
                var commandLength = {
                    A: 8,
                    C: 7,
                    H: 2,
                    L: 3,
                    M: 3,
                    Q: 5,
                    S: 5,
                    T: 3,
                    V: 2
                };
                // Short, non-typesafe parsing of the one-dimensional array. It splits
                // the path on any string. This is not type checked against the tuple
                // types, but is shorter, and doesn't require specific checks for any
                // command type in SVG.
                for (var i = 0; i < path.length; i++) {
                    // Command skipped, repeat previous or insert L/l for M/m
                    if (isString(segment[0]) &&
                        isNumber(path[i]) &&
                        segment.length === commandLength[(segment[0].toUpperCase())]) {
                        path.splice(i, 0, segment[0].replace('M', 'L').replace('m', 'l'));
                    }
                    // Split on string
                    if (typeof path[i] === 'string') {
                        if (segment.length) {
                            ret.push(segment.slice(0));
                        }
                        segment.length = 0;
                    }
                    segment.push(path[i]);
                }
                ret.push(segment.slice(0));
                return ret;
                /*
                // Fully type-safe version where each tuple type is checked. The
                // downside is filesize and a lack of flexibility for unsupported
                // commands
                const ret: SVGPath = [],
                    commands = {
                        A: 7,
                        C: 6,
                        H: 1,
                        L: 2,
                        M: 2,
                        Q: 4,
                        S: 4,
                        T: 2,
                        V: 1,
                        Z: 0
                    };

                let i = 0,
                    lastI = 0,
                    lastCommand;

                while (i < path.length) {
                    const item = path[i];

                    let command;

                    if (typeof item === 'string') {
                        command = item;
                        i += 1;
                    } else {
                        command = lastCommand || 'M';
                    }

                    // Upper case
                    const commandUC = command.toUpperCase();

                    if (commandUC in commands) {

                        // No numeric parameters
                        if (command === 'Z' || command === 'z') {
                            ret.push([command]);

                        // One numeric parameter
                        } else {
                            const val0 = path[i];
                            if (typeof val0 === 'number') {

                                // Horizontal line to
                                if (command === 'H' || command === 'h') {
                                    ret.push([command, val0]);
                                    i += 1;

                                // Vertical line to
                                } else if (command === 'V' || command === 'v') {
                                    ret.push([command, val0]);
                                    i += 1;

                                // Two numeric parameters
                                } else {
                                    const val1 = path[i + 1];
                                    if (typeof val1 === 'number') {
                                        // lineTo
                                        if (command === 'L' || command === 'l') {
                                            ret.push([command, val0, val1]);
                                            i += 2;

                                        // moveTo
                                        } else if (command === 'M' || command === 'm') {
                                            ret.push([command, val0, val1]);
                                            i += 2;

                                        // Smooth quadratic bezier
                                        } else if (command === 'T' || command === 't') {
                                            ret.push([command, val0, val1]);
                                            i += 2;

                                        // Four numeric parameters
                                        } else {
                                            const val2 = path[i + 2],
                                                val3 = path[i + 3];
                                            if (
                                                typeof val2 === 'number' &&
                                                typeof val3 === 'number'
                                            ) {
                                                // Quadratic bezier to
                                                if (
                                                    command === 'Q' ||
                                                    command === 'q'
                                                ) {
                                                    ret.push([
                                                        command,
                                                        val0,
                                                        val1,
                                                        val2,
                                                        val3
                                                    ]);
                                                    i += 4;

                                                // Smooth cubic bezier to
                                                } else if (
                                                    command === 'S' ||
                                                    command === 's'
                                                ) {
                                                    ret.push([
                                                        command,
                                                        val0,
                                                        val1,
                                                        val2,
                                                        val3
                                                    ]);
                                                    i += 4;

                                                // Six numeric parameters
                                                } else {
                                                    const val4 = path[i + 4],
                                                        val5 = path[i + 5];

                                                    if (
                                                        typeof val4 === 'number' &&
                                                        typeof val5 === 'number'
                                                    ) {
                                                        // Curve to
                                                        if (
                                                            command === 'C' ||
                                                            command === 'c'
                                                        ) {
                                                            ret.push([
                                                                command,
                                                                val0,
                                                                val1,
                                                                val2,
                                                                val3,
                                                                val4,
                                                                val5
                                                            ]);
                                                            i += 6;

                                                        // Seven numeric parameters
                                                        } else {
                                                            const val6 = path[i + 6];

                                                            // Arc to
                                                            if (
                                                                typeof val6 ===
                                                                'number' &&
                                                                (
                                                                    command === 'A' ||
                                                                    command === 'a'
                                                                )
                                                            ) {
                                                                ret.push([
                                                                    command,
                                                                    val0,
                                                                    val1,
                                                                    val2,
                                                                    val3,
                                                                    val4,
                                                                    val5,
                                                                    val6
                                                                ]);
                                                                i += 7;

                                                            }

                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }

                    // An unmarked command following a moveTo is a lineTo
                    lastCommand = command === 'M' ? 'L' : command;

                    if (i === lastI) {
                        break;
                    }
                    lastI = i;
                }
                return ret;
                */
            };
            /**
             * Draw a label, which is an extended text element with support for border
             * and background. Highcharts creates a `g` element with a text and a `path`
             * or `rect` inside, to make it behave somewhat like a HTML div. Border and
             * background are set through `stroke`, `stroke-width` and `fill` attributes
             * using the {@link Highcharts.SVGElement#attr|attr} method. To update the
             * text after render, run `label.attr({ text: 'New text' })`.
             *
             * @sample highcharts/members/renderer-label-on-chart/
             *         A label on the chart
             *
             * @function Highcharts.SVGRenderer#label
             *
             * @param {string} str
             *        The initial text string or (subset) HTML to render.
             *
             * @param {number} x
             *        The x position of the label's left side.
             *
             * @param {number} [y]
             *        The y position of the label's top side or baseline, depending on
             *        the `baseline` parameter.
             *
             * @param {string} [shape='rect']
             *        The shape of the label's border/background, if any. Defaults to
             *        `rect`. Other possible values are `callout` or other shapes
             *        defined in {@link Highcharts.SVGRenderer#symbols}.
             *
             * @param {number} [anchorX]
             *        In case the `shape` has a pointer, like a flag, this is the
             *        coordinates it should be pinned to.
             *
             * @param {number} [anchorY]
             *        In case the `shape` has a pointer, like a flag, this is the
             *        coordinates it should be pinned to.
             *
             * @param {boolean} [useHTML=false]
             *        Whether to use HTML to render the label.
             *
             * @param {boolean} [baseline=false]
             *        Whether to position the label relative to the text baseline,
             *        like {@link Highcharts.SVGRenderer#text|renderer.text}, or to the
             *        upper border of the rectangle.
             *
             * @param {string} [className]
             *        Class name for the group.
             *
             * @return {Highcharts.SVGElement}
             *         The generated label.
             */
            SVGRenderer.prototype.label = function (str, x, y, shape, anchorX, anchorY, useHTML, baseline, className) {
                return new SVGLabel(this, str, x, y, shape, anchorX, anchorY, useHTML, baseline, className);
            };
            /**
             * Re-align all aligned elements.
             *
             * @private
             * @function Highcharts.SVGRenderer#alignElements
             */
            SVGRenderer.prototype.alignElements = function () {
                this.alignedObjects.forEach(function (el) { return el.align(); });
            };
            return SVGRenderer;
        }());
        extend(SVGRenderer.prototype, {
            /**
             * A pointer to the renderer's associated Element class.
             *
             * @name Highcharts.SVGRenderer#Element
             * @type {Highcharts.SVGElement}
             */
            Element: SVGElement,
            SVG_NS: SVG_NS,
            /**
             * A collection of characters mapped to HTML entities. When `useHTML` on an
             * element is true, these entities will be rendered correctly by HTML. In
             * the SVG pseudo-HTML, they need to be unescaped back to simple characters,
             * so for example `&lt;` will render as `<`.
             *
             * @example
             * // Add support for unescaping quotes
             * Highcharts.SVGRenderer.prototype.escapes['"'] = '&quot;';
             *
             * @name Highcharts.SVGRenderer#escapes
             * @type {Highcharts.Dictionary<string>}
             */
            escapes: {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            },
            /**
             * An extendable collection of functions for defining symbol paths.
             *
             * @name Highcharts.SVGRenderer#symbols
             * @type {Highcharts.SymbolDictionary}
             */
            symbols: Symbols,
            /**
             * Dummy function for plugins, called every time the renderer is updated.
             * Prior to Highcharts 5, this was used for the canvg renderer.
             *
             * @deprecated
             * @function Highcharts.SVGRenderer#draw
             */
            draw: noop
        });
        /* *
         *
         *  Registry
         *
         * */
        RendererRegistry.registerRendererType('svg', SVGRenderer, true);
        /* *
         *
         *  Export Default
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * A clipping rectangle that can be applied to one or more {@link SVGElement}
         * instances. It is instanciated with the {@link SVGRenderer#clipRect} function
         * and applied with the {@link SVGElement#clip} function.
         *
         * @example
         * let circle = renderer.circle(100, 100, 100)
         *     .attr({ fill: 'red' })
         *     .add();
         * let clipRect = renderer.clipRect(100, 100, 100, 100);
         *
         * // Leave only the lower right quarter visible
         * circle.clip(clipRect);
         *
         * @typedef {Highcharts.SVGElement} Highcharts.ClipRectElement
         */
        /**
         * The font metrics.
         *
         * @interface Highcharts.FontMetricsObject
         */ /**
        * The baseline relative to the top of the box.
        *
        * @name Highcharts.FontMetricsObject#b
        * @type {number}
        */ /**
        * The font size.
        *
        * @name Highcharts.FontMetricsObject#f
        * @type {number}
        */ /**
        * The line height.
        *
        * @name Highcharts.FontMetricsObject#h
        * @type {number}
        */
        /**
         * An object containing `x` and `y` properties for the position of an element.
         *
         * @interface Highcharts.PositionObject
         */ /**
        * X position of the element.
        * @name Highcharts.PositionObject#x
        * @type {number}
        */ /**
        * Y position of the element.
        * @name Highcharts.PositionObject#y
        * @type {number}
        */
        /**
         * A rectangle.
         *
         * @interface Highcharts.RectangleObject
         */ /**
        * Height of the rectangle.
        * @name Highcharts.RectangleObject#height
        * @type {number}
        */ /**
        * Width of the rectangle.
        * @name Highcharts.RectangleObject#width
        * @type {number}
        */ /**
        * Horizontal position of the rectangle.
        * @name Highcharts.RectangleObject#x
        * @type {number}
        */ /**
        * Vertical position of the rectangle.
        * @name Highcharts.RectangleObject#y
        * @type {number}
        */
        /**
         * The shadow options.
         *
         * @interface Highcharts.ShadowOptionsObject
         */ /**
        * The shadow color.
        * @name    Highcharts.ShadowOptionsObject#color
        * @type    {Highcharts.ColorString|undefined}
        * @default #000000
        */ /**
        * The horizontal offset from the element.
        *
        * @name    Highcharts.ShadowOptionsObject#offsetX
        * @type    {number|undefined}
        * @default 1
        */ /**
        * The vertical offset from the element.
        * @name    Highcharts.ShadowOptionsObject#offsetY
        * @type    {number|undefined}
        * @default 1
        */ /**
        * The shadow opacity.
        *
        * @name    Highcharts.ShadowOptionsObject#opacity
        * @type    {number|undefined}
        * @default 0.15
        */ /**
        * The shadow width or distance from the element.
        * @name    Highcharts.ShadowOptionsObject#width
        * @type    {number|undefined}
        * @default 3
        */
        /**
         * @interface Highcharts.SizeObject
         */ /**
        * @name Highcharts.SizeObject#height
        * @type {number}
        */ /**
        * @name Highcharts.SizeObject#width
        * @type {number}
        */
        /**
         * Array of path commands, that will go into the `d` attribute of an SVG
         * element.
         *
         * @typedef {Array<(Array<Highcharts.SVGPathCommand>|Array<Highcharts.SVGPathCommand,number>|Array<Highcharts.SVGPathCommand,number,number>|Array<Highcharts.SVGPathCommand,number,number,number,number>|Array<Highcharts.SVGPathCommand,number,number,number,number,number,number>|Array<Highcharts.SVGPathCommand,number,number,number,number,number,number,number>)>} Highcharts.SVGPathArray
         */
        /**
         * Possible path commands in an SVG path array. Valid values are `A`, `C`, `H`,
         * `L`, `M`, `Q`, `S`, `T`, `V`, `Z`.
         *
         * @typedef {string} Highcharts.SVGPathCommand
         * @validvalue ["a","c","h","l","m","q","s","t","v","z","A","C","H","L","M","Q","S","T","V","Z"]
         */
        /**
         * An extendable collection of functions for defining symbol paths. Symbols are
         * used internally for point markers, button and label borders and backgrounds,
         * or custom shapes. Extendable by adding to {@link SVGRenderer#symbols}.
         *
         * @interface Highcharts.SymbolDictionary
         */ /**
        * @name Highcharts.SymbolDictionary#[key:string]
        * @type {Function|undefined}
        */ /**
        * @name Highcharts.SymbolDictionary#arc
        * @type {Function|undefined}
        */ /**
        * @name Highcharts.SymbolDictionary#callout
        * @type {Function|undefined}
        */ /**
        * @name Highcharts.SymbolDictionary#circle
        * @type {Function|undefined}
        */ /**
        * @name Highcharts.SymbolDictionary#diamond
        * @type {Function|undefined}
        */ /**
        * @name Highcharts.SymbolDictionary#square
        * @type {Function|undefined}
        */ /**
        * @name Highcharts.SymbolDictionary#triangle
        * @type {Function|undefined}
        */
        /**
         * Can be one of `arc`, `callout`, `circle`, `diamond`, `square`, `triangle`,
         * and `triangle-down`. Symbols are used internally for point markers, button
         * and label borders and backgrounds, or custom shapes. Extendable by adding to
         * {@link SVGRenderer#symbols}.
         *
         * @typedef {"arc"|"callout"|"circle"|"diamond"|"square"|"triangle"|"triangle-down"} Highcharts.SymbolKeyValue
         */
        /**
         * Additional options, depending on the actual symbol drawn.
         *
         * @interface Highcharts.SymbolOptionsObject
         */ /**
        * The anchor X position for the `callout` symbol. This is where the chevron
        * points to.
        *
        * @name Highcharts.SymbolOptionsObject#anchorX
        * @type {number|undefined}
        */ /**
        * The anchor Y position for the `callout` symbol. This is where the chevron
        * points to.
        *
        * @name Highcharts.SymbolOptionsObject#anchorY
        * @type {number|undefined}
        */ /**
        * The end angle of an `arc` symbol.
        *
        * @name Highcharts.SymbolOptionsObject#end
        * @type {number|undefined}
        */ /**
        * Whether to draw `arc` symbol open or closed.
        *
        * @name Highcharts.SymbolOptionsObject#open
        * @type {boolean|undefined}
        */ /**
        * The radius of an `arc` symbol, or the border radius for the `callout` symbol.
        *
        * @name Highcharts.SymbolOptionsObject#r
        * @type {number|undefined}
        */ /**
        * The start angle of an `arc` symbol.
        *
        * @name Highcharts.SymbolOptionsObject#start
        * @type {number|undefined}
        */
        (''); // keeps doclets above in transpiled file

        return SVGRenderer;
    });
    _registerModule(_modules, 'Core/Renderer/HTML/HTMLElement.js', [_modules['Core/Globals.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Utilities.js']], function (H, SVGElement, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
            var extendStatics = function (d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                if (typeof b !== "function" && b !== null)
                    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var isFirefox = H.isFirefox, isMS = H.isMS, isWebKit = H.isWebKit, win = H.win;
        var css = U.css, defined = U.defined, extend = U.extend, pick = U.pick, pInt = U.pInt;
        /* *
         *
         *  Constants
         *
         * */
        var composedMembers = [];
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable valid-jsdoc */
        var HTMLElement = /** @class */ (function (_super) {
            __extends(HTMLElement, _super);
            function HTMLElement() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * Modifies SVGElement to support HTML elements.
             * @private
             */
            HTMLElement.compose = function (SVGElementClass) {
                if (U.pushUnique(composedMembers, SVGElementClass)) {
                    var htmlElementProto = HTMLElement.prototype, svgElementProto = SVGElementClass.prototype;
                    svgElementProto.getSpanCorrection = htmlElementProto
                        .getSpanCorrection;
                    svgElementProto.htmlCss = htmlElementProto.htmlCss;
                    svgElementProto.htmlGetBBox = htmlElementProto.htmlGetBBox;
                    svgElementProto.htmlUpdateTransform = htmlElementProto
                        .htmlUpdateTransform;
                    svgElementProto.setSpanRotation = htmlElementProto.setSpanRotation;
                }
                return SVGElementClass;
            };
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Get the correction in X and Y positioning as the element is rotated.
             * @private
             */
            HTMLElement.prototype.getSpanCorrection = function (width, baseline, alignCorrection) {
                this.xCorr = -width * alignCorrection;
                this.yCorr = -baseline;
            };
            /**
             * Apply CSS to HTML elements. This is used in text within SVG rendering.
             * @private
             */
            HTMLElement.prototype.htmlCss = function (styles) {
                var wrapper = this, element = wrapper.element, 
                // When setting or unsetting the width style, we need to update
                // transform (#8809)
                isSettingWidth = (element.tagName === 'SPAN' &&
                    styles &&
                    'width' in styles), textWidth = pick(isSettingWidth && styles.width, void 0);
                var doTransform;
                if (isSettingWidth) {
                    delete styles.width;
                    wrapper.textWidth = textWidth;
                    doTransform = true;
                }
                if (styles && styles.textOverflow === 'ellipsis') {
                    styles.whiteSpace = 'nowrap';
                    styles.overflow = 'hidden';
                }
                wrapper.styles = extend(wrapper.styles, styles);
                css(wrapper.element, styles);
                // Now that all styles are applied, to the transform
                if (doTransform) {
                    wrapper.htmlUpdateTransform();
                }
                return wrapper;
            };
            /**
             * useHTML method for calculating the bounding box based on offsets.
             */
            HTMLElement.prototype.htmlGetBBox = function () {
                var wrapper = this, element = wrapper.element;
                return {
                    x: element.offsetLeft,
                    y: element.offsetTop,
                    width: element.offsetWidth,
                    height: element.offsetHeight
                };
            };
            /**
             * @private
             */
            HTMLElement.prototype.htmlUpdateTransform = function () {
                // aligning non added elements is expensive
                if (!this.added) {
                    this.alignOnAdd = true;
                    return;
                }
                var wrapper = this, renderer = wrapper.renderer, elem = wrapper.element, translateX = wrapper.translateX || 0, translateY = wrapper.translateY || 0, x = wrapper.x || 0, y = wrapper.y || 0, align = wrapper.textAlign || 'left', alignCorrection = {
                    left: 0, center: 0.5, right: 1
                }[align], styles = wrapper.styles, whiteSpace = styles && styles.whiteSpace;
                /** @private */
                function getTextPxLength() {
                    if (wrapper.textPxLength) {
                        return wrapper.textPxLength;
                    }
                    // Reset multiline/ellipsis in order to read width (#4928,
                    // #5417)
                    css(elem, {
                        width: '',
                        whiteSpace: whiteSpace || 'nowrap'
                    });
                    return elem.offsetWidth;
                }
                // apply translate
                css(elem, {
                    marginLeft: translateX,
                    marginTop: translateY
                });
                if (elem.tagName === 'SPAN') {
                    var rotation = wrapper.rotation, textWidth = wrapper.textWidth && pInt(wrapper.textWidth), currentTextTransform = [
                        rotation,
                        align,
                        elem.innerHTML,
                        wrapper.textWidth,
                        wrapper.textAlign
                    ].join(',');
                    var baseline = void 0, hasBoxWidthChanged = false;
                    // Update textWidth. Use the memoized textPxLength if possible, to
                    // avoid the getTextPxLength function using elem.offsetWidth.
                    // Calling offsetWidth affects rendering time as it forces layout
                    // (#7656).
                    if (textWidth !== wrapper.oldTextWidth) { // #983, #1254
                        var textPxLength = getTextPxLength();
                        if (((textWidth > wrapper.oldTextWidth) ||
                            textPxLength > textWidth) && (
                        // Only set the width if the text is able to word-wrap,
                        // or text-overflow is ellipsis (#9537)
                        /[ \-]/.test(elem.textContent || elem.innerText) ||
                            elem.style.textOverflow === 'ellipsis')) {
                            css(elem, {
                                width: (textPxLength > textWidth) || rotation ?
                                    textWidth + 'px' :
                                    'auto',
                                display: 'block',
                                whiteSpace: whiteSpace || 'normal' // #3331
                            });
                            wrapper.oldTextWidth = textWidth;
                            hasBoxWidthChanged = true; // #8159
                        }
                    }
                    wrapper.hasBoxWidthChanged = hasBoxWidthChanged; // #8159
                    // Do the calculations and DOM access only if properties changed
                    if (currentTextTransform !== wrapper.cTT) {
                        baseline = renderer.fontMetrics(elem).b;
                        // Renderer specific handling of span rotation, but only if we
                        // have something to update.
                        if (defined(rotation) &&
                            ((rotation !== (wrapper.oldRotation || 0)) ||
                                (align !== wrapper.oldAlign))) {
                            wrapper.setSpanRotation(rotation, alignCorrection, baseline);
                        }
                        wrapper.getSpanCorrection(
                        // Avoid elem.offsetWidth if we can, it affects rendering
                        // time heavily (#7656)
                        ((!defined(rotation) && wrapper.textPxLength) || // #7920
                            elem.offsetWidth), baseline, alignCorrection, rotation, align);
                    }
                    // apply position with correction
                    css(elem, {
                        left: (x + (wrapper.xCorr || 0)) + 'px',
                        top: (y + (wrapper.yCorr || 0)) + 'px'
                    });
                    // record current text transform
                    wrapper.cTT = currentTextTransform;
                    wrapper.oldRotation = rotation;
                    wrapper.oldAlign = align;
                }
            };
            /**
             * Set the rotation of an individual HTML span.
             * @private
             */
            HTMLElement.prototype.setSpanRotation = function (rotation, alignCorrection, baseline) {
                var getTransformKey = function () { return (isMS &&
                    !/Edge/.test(win.navigator.userAgent) ?
                    '-ms-transform' :
                    isWebKit ?
                        '-webkit-transform' :
                        isFirefox ?
                            'MozTransform' :
                            win.opera ?
                                '-o-transform' :
                                void 0); };
                var rotationStyle = {}, cssTransformKey = getTransformKey();
                if (cssTransformKey) {
                    rotationStyle[cssTransformKey] = rotationStyle.transform =
                        'rotate(' + rotation + 'deg)';
                    rotationStyle[cssTransformKey + (isFirefox ? 'Origin' : '-origin')] = rotationStyle.transformOrigin =
                        (alignCorrection * 100) + '% ' + baseline + 'px';
                    css(this.element, rotationStyle);
                }
            };
            return HTMLElement;
        }(SVGElement));
        /* *
         *
         *  Default Export
         *
         * */

        return HTMLElement;
    });
    _registerModule(_modules, 'Core/Renderer/HTML/HTMLRenderer.js', [_modules['Core/Renderer/HTML/AST.js'], _modules['Core/Renderer/SVG/SVGElement.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js']], function (AST, SVGElement, SVGRenderer, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
            var extendStatics = function (d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                if (typeof b !== "function" && b !== null)
                    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var attr = U.attr, createElement = U.createElement, extend = U.extend, pick = U.pick;
        /* *
         *
         *  Constants
         *
         * */
        var composedMembers = [];
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable valid-jsdoc */
        // Extend SvgRenderer for useHTML option.
        var HTMLRenderer = /** @class */ (function (_super) {
            __extends(HTMLRenderer, _super);
            function HTMLRenderer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /* *
             *
             *  Static Functions
             *
             * */
            /** @private */
            HTMLRenderer.compose = function (SVGRendererClass) {
                if (U.pushUnique(composedMembers, SVGRendererClass)) {
                    var htmlRendererProto = HTMLRenderer.prototype, svgRendererProto = SVGRendererClass.prototype;
                    svgRendererProto.html = htmlRendererProto.html;
                }
                return SVGRendererClass;
            };
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Create HTML text node. This is used by the SVG renderer through the
             * useHTML option.
             *
             * @private
             * @function Highcharts.SVGRenderer#html
             *
             * @param {string} str
             * The text of (subset) HTML to draw.
             *
             * @param {number} x
             * The x position of the text's lower left corner.
             *
             * @param {number} y
             * The y position of the text's lower left corner.
             *
             * @return {Highcharts.HTMLDOMElement}
             * HTML element.
             */
            HTMLRenderer.prototype.html = function (str, x, y) {
                var wrapper = this.createElement('span'), element = wrapper.element, renderer = wrapper.renderer, addSetters = function (gWrapper, style) {
                    // These properties are set as attributes on the SVG group, and
                    // as identical CSS properties on the div. (#3542)
                    ['opacity', 'visibility'].forEach(function (prop) {
                        gWrapper[prop + 'Setter'] = function (value, key, elem) {
                            var styleObject = gWrapper.div ?
                                gWrapper.div.style :
                                style;
                            SVGElement.prototype[prop + 'Setter']
                                .call(this, value, key, elem);
                            if (styleObject) {
                                styleObject[key] = value;
                            }
                        };
                    });
                    gWrapper.addedSetters = true;
                };
                // Text setter
                wrapper.textSetter = function (value) {
                    if (value !== this.textStr) {
                        delete this.bBox;
                        delete this.oldTextWidth;
                        AST.setElementHTML(this.element, pick(value, ''));
                        this.textStr = value;
                        wrapper.doTransform = true;
                    }
                };
                addSetters(wrapper, wrapper.element.style);
                // Various setters which rely on update transform
                wrapper.xSetter =
                    wrapper.ySetter =
                        wrapper.alignSetter =
                            wrapper.rotationSetter =
                                function (value, key) {
                                    if (key === 'align') {
                                        // Do not overwrite the SVGElement.align method.
                                        wrapper.alignValue = wrapper.textAlign = value;
                                    }
                                    else {
                                        wrapper[key] = value;
                                    }
                                    wrapper.doTransform = true;
                                };
                // Runs at the end of .attr()
                wrapper.afterSetters = function () {
                    // Update transform. Do this outside the loop to prevent redundant
                    // updating for batch setting of attributes.
                    if (this.doTransform) {
                        this.htmlUpdateTransform();
                        this.doTransform = false;
                    }
                };
                // Set the default attributes
                wrapper
                    .attr({
                    text: str,
                    x: Math.round(x),
                    y: Math.round(y)
                })
                    .css({
                    position: 'absolute'
                });
                if (!renderer.styledMode) {
                    wrapper.css({
                        fontFamily: this.style.fontFamily,
                        fontSize: this.style.fontSize
                    });
                }
                // Keep the whiteSpace style outside the wrapper.styles collection
                element.style.whiteSpace = 'nowrap';
                // Use the HTML specific .css method
                wrapper.css = wrapper.htmlCss;
                wrapper.add = function (svgGroupWrapper) {
                    var container = renderer.box.parentNode, parents = [];
                    var htmlGroup, parentGroup;
                    this.parentGroup = svgGroupWrapper;
                    // Create a mock group to hold the HTML elements
                    if (svgGroupWrapper) {
                        htmlGroup = svgGroupWrapper.div;
                        if (!htmlGroup) {
                            // Read the parent chain into an array and read from top
                            // down
                            parentGroup = svgGroupWrapper;
                            while (parentGroup) {
                                parents.push(parentGroup);
                                // Move up to the next parent group
                                parentGroup = parentGroup.parentGroup;
                            }
                            // Ensure dynamically updating position when any parent
                            // is translated
                            parents.reverse().forEach(function (parentGroup) {
                                var cls = attr(parentGroup.element, 'class');
                                /**
                                 * Common translate setter for X and Y on the HTML
                                 * group. Reverted the fix for #6957 du to
                                 * positioning problems and offline export (#7254,
                                 * #7280, #7529)
                                 * @private
                                 * @param {*} value
                                 * @param {string} key
                                                         */
                                function translateSetter(value, key) {
                                    parentGroup[key] = value;
                                    if (key === 'translateX') {
                                        htmlGroupStyle.left = value + 'px';
                                    }
                                    else {
                                        htmlGroupStyle.top = value + 'px';
                                    }
                                    parentGroup.doTransform = true;
                                }
                                // Create a HTML div and append it to the parent div
                                // to emulate the SVG group structure
                                var parentGroupStyles = parentGroup.styles || {};
                                htmlGroup =
                                    parentGroup.div =
                                        parentGroup.div || createElement('div', cls ? { className: cls } : void 0, {
                                            position: 'absolute',
                                            left: (parentGroup.translateX || 0) + 'px',
                                            top: (parentGroup.translateY || 0) + 'px',
                                            display: parentGroup.display,
                                            opacity: parentGroup.opacity,
                                            visibility: parentGroup.visibility
                                            // the top group is appended to container
                                        }, htmlGroup || container);
                                // Shortcut
                                var htmlGroupStyle = htmlGroup.style;
                                // Set listeners to update the HTML div's position
                                // whenever the SVG group position is changed.
                                extend(parentGroup, {
                                    // (#7287) Pass htmlGroup to use
                                    // the related group
                                    classSetter: (function (htmlGroup) {
                                        return function (value) {
                                            this.element.setAttribute('class', value);
                                            htmlGroup.className = value;
                                        };
                                    }(htmlGroup)),
                                    // Extend the parent group's css function by
                                    // updating the shadow div counterpart with the same
                                    // style.
                                    css: function (styles) {
                                        wrapper.css.call(parentGroup, styles);
                                        [
                                            // #6794
                                            'cursor',
                                            // #5595, #18821
                                            'pointerEvents'
                                        ].forEach(function (prop) {
                                            if (styles[prop]) {
                                                htmlGroupStyle[prop] = styles[prop];
                                            }
                                        });
                                        return parentGroup;
                                    },
                                    on: function () {
                                        if (parents[0].div) { // #6418
                                            wrapper.on.apply({
                                                element: parents[0].div,
                                                onEvents: parentGroup.onEvents
                                            }, arguments);
                                        }
                                        return parentGroup;
                                    },
                                    translateXSetter: translateSetter,
                                    translateYSetter: translateSetter
                                });
                                if (!parentGroup.addedSetters) {
                                    addSetters(parentGroup);
                                }
                                // Apply pre-existing style
                                parentGroup.css(parentGroupStyles);
                            });
                        }
                    }
                    else {
                        htmlGroup = container;
                    }
                    htmlGroup.appendChild(element);
                    wrapper.added = true;
                    if (wrapper.alignOnAdd) {
                        wrapper.htmlUpdateTransform();
                    }
                    return wrapper;
                };
                return wrapper;
            };
            return HTMLRenderer;
        }(SVGRenderer));
        /* *
         *
         *  Default Export
         *
         * */

        return HTMLRenderer;
    });
    _registerModule(_modules, 'Core/Axis/AxisDefaults.js', [], function () {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Namespace
         *
         * */
        var AxisDefaults;
        (function (AxisDefaults) {
            /* *
             *
             *  Constants
             *
             * */
            /**
             * The X axis or category axis. Normally this is the horizontal axis,
             * though if the chart is inverted this is the vertical axis. In case of
             * multiple axes, the xAxis node is an array of configuration objects.
             *
             * See the [Axis class](/class-reference/Highcharts.Axis) for programmatic
             * access to the axis.
             *
             * @productdesc {highmaps}
             * In Highmaps, the axis is hidden, but it is used behind the scenes to
             * control features like zooming and panning. Zooming is in effect the same
             * as setting the extremes of one of the exes.
             *
             * @type         {*|Array<*>}
             * @optionparent xAxis
             */
            AxisDefaults.defaultXAxisOptions = {
                /**
                 * When using multiple axis, the ticks of two or more opposite axes
                 * will automatically be aligned by adding ticks to the axis or axes
                 * with the least ticks, as if `tickAmount` were specified.
                 *
                 * This can be prevented by setting `alignTicks` to false. If the grid
                 * lines look messy, it's a good idea to hide them for the secondary
                 * axis by setting `gridLineWidth` to 0.
                 *
                 * If `startOnTick` or `endOnTick` in an Axis options are set to false,
                 * then the `alignTicks ` will be disabled for the Axis.
                 *
                 * Disabled for logarithmic axes.
                 *
                 * @product   highcharts highstock gantt
                 */
                alignTicks: true,
                /**
                 * Whether to allow decimals in this axis' ticks. When counting
                 * integers, like persons or hits on a web page, decimals should
                 * be avoided in the labels. By default, decimals are allowed on small
                 * scale axes.
                 *
                 * @see [minTickInterval](#xAxis.minTickInterval)
                 *
                 * @sample {highcharts|highstock} highcharts/yaxis/allowdecimals-true/
                 *         True by default
                 * @sample {highcharts|highstock} highcharts/yaxis/allowdecimals-false/
                 *         False
                 *
                 * @type      {boolean|undefined}
                 * @default   undefined
                 * @since     2.0
                 */
                allowDecimals: void 0,
                /**
                 * When using an alternate grid color, a band is painted across the
                 * plot area between every other grid line.
                 *
                 * @sample {highcharts} highcharts/yaxis/alternategridcolor/
                 *         Alternate grid color on the Y axis
                 * @sample {highstock} stock/xaxis/alternategridcolor/
                 *         Alternate grid color on the Y axis
                 *
                 * @type      {Highcharts.ColorType}
                 * @apioption xAxis.alternateGridColor
                 */
                /**
                 * An array defining breaks in the axis, the sections defined will be
                 * left out and all the points shifted closer to each other.
                 *
                 * @productdesc {highcharts}
                 * Requires that the broken-axis.js module is loaded.
                 *
                 * @sample {highcharts} highcharts/axisbreak/break-simple/
                 *         Simple break
                 * @sample {highcharts|highstock} highcharts/axisbreak/break-visualized/
                 *         Advanced with callback
                 * @sample {highstock} stock/demo/intraday-breaks/
                 *         Break on nights and weekends
                 *
                 * @type      {Array<*>}
                 * @since     4.1.0
                 * @product   highcharts highstock gantt
                 * @apioption xAxis.breaks
                 */
                /**
                 * A number indicating how much space should be left between the start
                 * and the end of the break. The break size is given in axis units,
                 * so for instance on a `datetime` axis, a break size of 3600000 would
                 * indicate the equivalent of an hour.
                 *
                 * @type      {number}
                 * @default   0
                 * @since     4.1.0
                 * @product   highcharts highstock gantt
                 * @apioption xAxis.breaks.breakSize
                 */
                /**
                 * The point where the break starts.
                 *
                 * @type      {number}
                 * @since     4.1.0
                 * @product   highcharts highstock gantt
                 * @apioption xAxis.breaks.from
                 */
                /**
                 * Defines an interval after which the break appears again. By default
                 * the breaks do not repeat.
                 *
                 * @type      {number}
                 * @default   0
                 * @since     4.1.0
                 * @product   highcharts highstock gantt
                 * @apioption xAxis.breaks.repeat
                 */
                /**
                 * The point where the break ends.
                 *
                 * @type      {number}
                 * @since     4.1.0
                 * @product   highcharts highstock gantt
                 * @apioption xAxis.breaks.to
                 */
                /**
                 * If categories are present for the xAxis, names are used instead of
                 * numbers for that axis.
                 *
                 * Since Highcharts 3.0, categories can also
                 * be extracted by giving each point a [name](#series.data) and setting
                 * axis [type](#xAxis.type) to `category`. However, if you have multiple
                 * series, best practice remains defining the `categories` array.
                 *
                 * Example: `categories: ['Apples', 'Bananas', 'Oranges']`
                 *
                 * @sample {highcharts} highcharts/demo/line-labels/
                 *         With
                 * @sample {highcharts} highcharts/xaxis/categories/
                 *         Without
                 *
                 * @type      {Array<string>}
                 * @product   highcharts gantt
                 * @apioption xAxis.categories
                 */
                /**
                 * The highest allowed value for automatically computed axis extremes.
                 *
                 * @see [floor](#xAxis.floor)
                 *
                 * @sample {highcharts|highstock} highcharts/yaxis/floor-ceiling/
                 *         Floor and ceiling
                 *
                 * @type       {number}
                 * @since      4.0
                 * @product    highcharts highstock gantt
                 * @apioption  xAxis.ceiling
                 */
                /**
                 * A class name that opens for styling the axis by CSS, especially in
                 * Highcharts styled mode. The class name is applied to group elements
                 * for the grid, axis elements and labels.
                 *
                 * @sample {highcharts|highstock|highmaps} highcharts/css/axis/
                 *         Multiple axes with separate styling
                 *
                 * @type      {string}
                 * @since     5.0.0
                 * @apioption xAxis.className
                 */
                /**
                 * Configure a crosshair that follows either the mouse pointer or the
                 * hovered point.
                 *
                 * In styled mode, the crosshairs are styled in the
                 * `.highcharts-crosshair`, `.highcharts-crosshair-thin` or
                 * `.highcharts-xaxis-category` classes.
                 *
                 * @productdesc {highstock}
                 * In Highcharts stock, by default, the crosshair is enabled on the
                 * X axis and disabled on the Y axis.
                 *
                 * @sample {highcharts} highcharts/xaxis/crosshair-both/
                 *         Crosshair on both axes
                 * @sample {highstock} stock/xaxis/crosshairs-xy/
                 *         Crosshair on both axes, with y axis label
                 * @sample {highmaps} highcharts/xaxis/crosshair-both/
                 *         Crosshair on both axes
                 *
                 * @declare   Highcharts.AxisCrosshairOptions
                 * @type      {boolean|*}
                 * @default   false
                 * @since     4.1
                 * @apioption xAxis.crosshair
                 */
                /**
                 * The value on a perpendicular axis where this axis should cross. This
                 * is typically used on mathematical plots where the axes cross at 0.
                 * When `crossing` is set, space will not be reserved at the sides of
                 * the chart for axis labels and title, so those may be clipped. In this
                 * case it is better to place the axes without the `crossing` option.
                 *
                 * @type      {number}
                 * @sample    highcharts/xaxis/crossing
                 *            Function plot with axes crossing at 0
                 * @since 11.0.1
                 * @apioption xAxis.crossing
                 */
                /**
                 * A class name for the crosshair, especially as a hook for styling.
                 *
                 * @type      {string}
                 * @since     5.0.0
                 * @apioption xAxis.crosshair.className
                 */
                /**
                 * The color of the crosshair. Defaults to `#cccccc` for numeric and
                 * datetime axes, and `rgba(204,214,235,0.25)` for category axes, where
                 * the crosshair by default highlights the whole category.
                 *
                 * @sample {highcharts|highstock|highmaps} highcharts/xaxis/crosshair-customized/
                 *         Customized crosshairs
                 *
                 * @type      {Highcharts.ColorType}
                 * @default   #cccccc
                 * @since     4.1
                 * @apioption xAxis.crosshair.color
                 */
                /**
                 * The dash style for the crosshair. See
                 * [plotOptions.series.dashStyle](#plotOptions.series.dashStyle)
                 * for possible values.
                 *
                 * @sample {highcharts|highmaps} highcharts/xaxis/crosshair-dotted/
                 *         Dotted crosshair
                 * @sample {highstock} stock/xaxis/crosshair-dashed/
                 *         Dashed X axis crosshair
                 *
                 * @type      {Highcharts.DashStyleValue}
                 * @default   Solid
                 * @since     4.1
                 * @apioption xAxis.crosshair.dashStyle
                 */
                /**
                 * A label on the axis next to the crosshair.
                 *
                 * In styled mode, the label is styled with the
                 * `.highcharts-crosshair-label` class.
                 *
                 * @sample {highstock} stock/xaxis/crosshair-label/
                 *         Crosshair labels
                 * @sample {highstock} highcharts/css/crosshair-label/
                 *         Style mode
                 *
                 * @declare   Highcharts.AxisCrosshairLabelOptions
                 * @since     2.1
                 * @product   highstock
                 * @apioption xAxis.crosshair.label
                 */
                /**
                 * Alignment of the label compared to the axis. Defaults to `"left"` for
                 * right-side axes, `"right"` for left-side axes and `"center"` for
                 * horizontal axes.
                 *
                 * @type      {Highcharts.AlignValue}
                 * @since     2.1
                 * @product   highstock
                 * @apioption xAxis.crosshair.label.align
                 */
                /**
                 * The background color for the label. Defaults to the related series
                 * color, or `#666666` if that is not available.
                 *
                 * @type      {Highcharts.ColorType}
                 * @since     2.1
                 * @product   highstock
                 * @apioption xAxis.crosshair.label.backgroundColor
                 */
                /**
                 * The border color for the crosshair label
                 *
                 * @type      {Highcharts.ColorType}
                 * @since     2.1
                 * @product   highstock
                 * @apioption xAxis.crosshair.label.borderColor
                 */
                /**
                 * The border corner radius of the crosshair label.
                 *
                 * @type      {number}
                 * @default   3
                 * @since     2.1.10
                 * @product   highstock
                 * @apioption xAxis.crosshair.label.borderRadius
                 */
                /**
                 * The border width for the crosshair label.
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.1
                 * @product   highstock
                 * @apioption xAxis.crosshair.label.borderWidth
                 */
                /**
                 * Flag to enable crosshair's label.
                 *
                 * @sample {highstock} stock/xaxis/crosshairs-xy/
                 *         Enabled label for yAxis' crosshair
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @product   highstock
                 * @apioption xAxis.crosshair.label.enabled
                 */
                /**
                 * A format string for the crosshair label. Defaults to `{value}` for
                 * numeric axes and `{value:%b %d, %Y}` for datetime axes.
                 *
                 * @type      {string}
                 * @since     2.1
                 * @product   highstock
                 * @apioption xAxis.crosshair.label.format
                 */
                /**
                 * Formatter function for the label text.
                 *
                 * @type      {Highcharts.XAxisCrosshairLabelFormatterCallbackFunction}
                 * @since     2.1
                 * @product   highstock
                 * @apioption xAxis.crosshair.label.formatter
                 */
                /**
                 * Padding inside the crosshair label.
                 *
                 * @type      {number}
                 * @default   8
                 * @since     2.1
                 * @product   highstock
                 * @apioption xAxis.crosshair.label.padding
                 */
                /**
                 * The shape to use for the label box.
                 *
                 * @type      {string}
                 * @default   callout
                 * @since     2.1
                 * @product   highstock
                 * @apioption xAxis.crosshair.label.shape
                 */
                /**
                 * Text styles for the crosshair label.
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"color": "white", "fontWeight": "normal", "fontSize": "11px", "textAlign": "center"}
                 * @since     2.1
                 * @product   highstock
                 * @apioption xAxis.crosshair.label.style
                 */
                /**
                 * Whether the crosshair should snap to the point or follow the pointer
                 * independent of points.
                 *
                 * @sample {highcharts|highstock} highcharts/xaxis/crosshair-snap-false/
                 *         True by default
                 * @sample {highmaps} maps/demo/latlon-advanced/
                 *         Snap is false
                 *
                 * @type      {boolean}
                 * @default   true
                 * @since     4.1
                 * @apioption xAxis.crosshair.snap
                 */
                /**
                 * The pixel width of the crosshair. Defaults to 1 for numeric or
                 * datetime axes, and for one category width for category axes.
                 *
                 * @sample {highcharts} highcharts/xaxis/crosshair-customized/
                 *         Customized crosshairs
                 * @sample {highstock} highcharts/xaxis/crosshair-customized/
                 *         Customized crosshairs
                 * @sample {highmaps} highcharts/xaxis/crosshair-customized/
                 *         Customized crosshairs
                 *
                 * @type      {number}
                 * @default   1
                 * @since     4.1
                 * @apioption xAxis.crosshair.width
                 */
                /**
                 * The Z index of the crosshair. Higher Z indices allow drawing the
                 * crosshair on top of the series or behind the grid lines.
                 *
                 * @type      {number}
                 * @default   2
                 * @since     4.1
                 * @apioption xAxis.crosshair.zIndex
                 */
                /**
                 * Whether to pan axis. If `chart.panning` is enabled, the option
                 * allows to disable panning on an individual axis.
                 */
                panningEnabled: true,
                /**
                 * The Z index for the axis group.
                 */
                zIndex: 2,
                /**
                 * Whether to zoom axis. If `chart.zoomType` is set, the option allows
                 * to disable zooming on an individual axis.
                 *
                 * @sample {highcharts} highcharts/xaxis/zoomenabled/
                 *         Zoom enabled is false
                 */
                zoomEnabled: true,
                /**
                 * For a datetime axis, the scale will automatically adjust to the
                 * appropriate unit. This member gives the default string
                 * representations used for each unit. For intermediate values,
                 * different units may be used, for example the `day` unit can be used
                 * on midnight and `hour` unit be used for intermediate values on the
                 * same axis.
                 *
                 * For an overview of the replacement codes, see
                 * [dateFormat](/class-reference/Highcharts.Time#dateFormat).
                 *
                 * Defaults to:
                 * ```js
                 * {
                 *     millisecond: '%H:%M:%S.%L',
                 *     second: '%H:%M:%S',
                 *     minute: '%H:%M',
                 *     hour: '%H:%M',
                 *     day: '%e. %b',
                 *     week: '%e. %b',
                 *     month: '%b \'%y',
                 *     year: '%Y'
                 * }
                 * ```
                 *
                 * @sample {highcharts} highcharts/xaxis/datetimelabelformats/
                 *         Different day format on X axis
                 * @sample {highstock} stock/xaxis/datetimelabelformats/
                 *         More information in x axis labels
                 *
                 * @declare Highcharts.AxisDateTimeLabelFormatsOptions
                 * @product highcharts highstock gantt
                 */
                dateTimeLabelFormats: {
                    /**
                     * @declare Highcharts.AxisDateTimeLabelFormatsOptionsObject
                     * @type {string|*}
                     */
                    millisecond: {
                        main: '%H:%M:%S.%L',
                        range: false
                    },
                    /**
                     * @declare Highcharts.AxisDateTimeLabelFormatsOptionsObject
                     * @type {string|*}
                     */
                    second: {
                        main: '%H:%M:%S',
                        range: false
                    },
                    /**
                     * @declare Highcharts.AxisDateTimeLabelFormatsOptionsObject
                     * @type {string|*}
                     */
                    minute: {
                        main: '%H:%M',
                        range: false
                    },
                    /**
                     * @declare Highcharts.AxisDateTimeLabelFormatsOptionsObject
                     * @type {string|*}
                     */
                    hour: {
                        main: '%H:%M',
                        range: false
                    },
                    /**
                     * @declare Highcharts.AxisDateTimeLabelFormatsOptionsObject
                     * @type {string|*}
                     */
                    day: {
                        main: '%e %b'
                    },
                    /**
                     * @declare Highcharts.AxisDateTimeLabelFormatsOptionsObject
                     * @type {string|*}
                     */
                    week: {
                        main: '%e %b'
                    },
                    /**
                     * @declare Highcharts.AxisDateTimeLabelFormatsOptionsObject
                     * @type {string|*}
                     */
                    month: {
                        main: '%b \'%y'
                    },
                    /**
                     * @declare Highcharts.AxisDateTimeLabelFormatsOptionsObject
                     * @type {string|*}
                     */
                    year: {
                        main: '%Y'
                    }
                },
                /**
                 * Whether to force the axis to end on a tick. Use this option with
                 * the `maxPadding` option to control the axis end.
                 *
                 * @productdesc {highstock}
                 * In Highcharts Stock, `endOnTick` is always `false` when the navigator
                 * is enabled, to prevent jumpy scrolling.
                 *
                 * @sample {highcharts} highcharts/yaxis/endontick/
                 *         True by default
                 * @sample {highcharts} highcharts/yaxis/endontick-false/
                 *         False
                 * @sample {highstock} stock/demo/basic-line/
                 *         True by default
                 * @sample {highstock} stock/xaxis/endontick/
                 *         False
                 *
                 * @since 1.2.0
                 */
                endOnTick: false,
                /**
                 * Event handlers for the axis.
                 *
                 * @type      {*}
                 * @apioption xAxis.events
                 */
                /**
                 * An event fired after the breaks have rendered.
                 *
                 * @see [breaks](#xAxis.breaks)
                 *
                 * @sample {highcharts} highcharts/axisbreak/break-event/
                 *         AfterBreak Event
                 *
                 * @type      {Highcharts.AxisEventCallbackFunction}
                 * @since     4.1.0
                 * @product   highcharts gantt
                 * @apioption xAxis.events.afterBreaks
                 */
                /**
                 * As opposed to the `setExtremes` event, this event fires after the
                 * final min and max values are computed and corrected for `minRange`.
                 *
                 * Fires when the minimum and maximum is set for the axis, either by
                 * calling the `.setExtremes()` method or by selecting an area in the
                 * chart. One parameter, `event`, is passed to the function, containing
                 * common event information.
                 *
                 * The new user set minimum and maximum values can be found by
                 * `event.min` and `event.max`. These reflect the axis minimum and
                 * maximum in axis values. The actual data extremes are found in
                 * `event.dataMin` and `event.dataMax`.
                 *
                 * @type      {Highcharts.AxisSetExtremesEventCallbackFunction}
                 * @since     2.3
                 * @context   Highcharts.Axis
                 * @apioption xAxis.events.afterSetExtremes
                 */
                /**
                 * An event fired when a break from this axis occurs on a point.
                 *
                 * @see [breaks](#xAxis.breaks)
                 *
                 * @sample {highcharts} highcharts/axisbreak/break-visualized/
                 *         Visualization of a Break
                 *
                 * @type      {Highcharts.AxisPointBreakEventCallbackFunction}
                 * @since     4.1.0
                 * @product   highcharts gantt
                 * @context   Highcharts.Axis
                 * @apioption xAxis.events.pointBreak
                 */
                /**
                 * An event fired when a point falls inside a break from this axis.
                 *
                 * @type      {Highcharts.AxisPointBreakEventCallbackFunction}
                 * @product   highcharts highstock gantt
                 * @context   Highcharts.Axis
                 * @apioption xAxis.events.pointInBreak
                 */
                /**
                 * Fires when the minimum and maximum is set for the axis, either by
                 * calling the `.setExtremes()` method or by selecting an area in the
                 * chart. One parameter, `event`, is passed to the function,
                 * containing common event information.
                 *
                 * The new user set minimum and maximum values can be found by
                 * `event.min` and `event.max`. These reflect the axis minimum and
                 * maximum in data values. When an axis is zoomed all the way out from
                 * the "Reset zoom" button, `event.min` and `event.max` are null, and
                 * the new extremes are set based on `this.dataMin` and `this.dataMax`.
                 *
                 * @sample {highstock} stock/xaxis/events-setextremes/
                 *         Log new extremes on x axis
                 *
                 * @type      {Highcharts.AxisSetExtremesEventCallbackFunction}
                 * @since     1.2.0
                 * @context   Highcharts.Axis
                 * @apioption xAxis.events.setExtremes
                 */
                /**
                 * The lowest allowed value for automatically computed axis extremes.
                 *
                 * @see [ceiling](#yAxis.ceiling)
                 *
                 * @sample {highcharts} highcharts/yaxis/floor-ceiling/
                 *         Floor and ceiling
                 * @sample {highstock} stock/demo/lazy-loading/
                 *         Prevent negative stock price on Y axis
                 *
                 * @type      {number}
                 * @since     4.0
                 * @product   highcharts highstock gantt
                 * @apioption xAxis.floor
                 */
                /**
                 * The dash or dot style of the grid lines. For possible values, see
                 * [this demonstration](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-dashstyle-all/).
                 *
                 * @sample {highcharts} highcharts/yaxis/gridlinedashstyle/
                 *         Long dashes
                 * @sample {highstock} stock/xaxis/gridlinedashstyle/
                 *         Long dashes
                 *
                 * @type      {Highcharts.DashStyleValue}
                 * @since     1.2
                 */
                gridLineDashStyle: 'Solid',
                /**
                 * The Z index of the grid lines.
                 *
                 * @sample {highcharts|highstock} highcharts/xaxis/gridzindex/
                 *         A Z index of 4 renders the grid above the graph
                 *
                 * @product   highcharts highstock gantt
                 */
                gridZIndex: 1,
                /**
                 * An id for the axis. This can be used after render time to get
                 * a pointer to the axis object through `chart.get()`.
                 *
                 * @sample {highcharts} highcharts/xaxis/id/
                 *         Get the object
                 * @sample {highstock} stock/xaxis/id/
                 *         Get the object
                 *
                 * @type      {string}
                 * @since     1.2.0
                 * @apioption xAxis.id
                 */
                /**
                 * The axis labels show the number or category for each tick.
                 *
                 * Since v8.0.0: Labels are animated in categorized x-axis with
                 * updating data if `tickInterval` and `step` is set to 1.
                 *
                 * @productdesc {highmaps}
                 * X and Y axis labels are by default disabled in Highmaps, but the
                 * functionality is inherited from Highcharts and used on `colorAxis`,
                 * and can be enabled on X and Y axes too.
                 */
                labels: {
                    /**
                     * What part of the string the given position is anchored to.
                     * If `left`, the left side of the string is at the axis position.
                     * Can be one of `"left"`, `"center"` or `"right"`. Defaults to
                     * an intelligent guess based on which side of the chart the axis
                     * is on and the rotation of the label.
                     *
                     * @see [reserveSpace](#xAxis.labels.reserveSpace)
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-align-left/
                     *         Left
                     * @sample {highcharts} highcharts/xaxis/labels-align-right/
                     *         Right
                     * @sample {highcharts} highcharts/xaxis/labels-reservespace-true/
                     *         Left-aligned labels on a vertical category axis
                     *
                     * @type      {Highcharts.AlignValue}
                     * @apioption xAxis.labels.align
                     */
                    /**
                     * Whether to allow the axis labels to overlap. When false,
                     * overlapping labels are hidden.
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-allowoverlap-true/
                     *         X axis labels overlap enabled
                     *
                     * @type      {boolean}
                     * @default   false
                     * @apioption xAxis.labels.allowOverlap
                     */
                    /**
                     * For horizontal axes, the allowed degrees of label rotation
                     * to prevent overlapping labels. If there is enough space,
                     * labels are not rotated. As the chart gets narrower, it
                     * will start rotating the labels -45 degrees, then remove
                     * every second label and try again with rotations 0 and -45 etc.
                     * Set it to `undefined` to disable rotation, which will
                     * cause the labels to word-wrap if possible. Defaults to `[-45]``
                     * on bottom and top axes, `undefined` on left and right axes.
                     *
                     * @sample {highcharts|highstock} highcharts/xaxis/labels-autorotation-default/
                     *         Default auto rotation of 0 or -45
                     * @sample {highcharts|highstock} highcharts/xaxis/labels-autorotation-0-90/
                     *         Custom graded auto rotation
                     *
                     * @type      {Array<number>}
                     * @default   undefined
                     * @since     4.1.0
                     * @product   highcharts highstock gantt
                     * @apioption xAxis.labels.autoRotation
                     */
                    autoRotation: void 0,
                    /**
                     * When each category width is more than this many pixels, we don't
                     * apply auto rotation. Instead, we lay out the axis label with word
                     * wrap. A lower limit makes sense when the label contains multiple
                     * short words that don't extend the available horizontal space for
                     * each label.
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-autorotationlimit/
                     *         Lower limit
                     *
                     * @since     4.1.5
                     * @product   highcharts gantt
                     */
                    autoRotationLimit: 80,
                    /**
                     * The label's pixel distance from the perimeter of the plot area.
                     * On cartesian charts, this is overridden if the `labels.y` setting
                     * is set.
                     *
                     * @sample {highcharts} highcharts/yaxis/labels-distance/
                     *         Polar chart, labels centered under the arc
                     *
                     * @type      {number}
                     * @product   highcharts gantt
                     */
                    distance: 15,
                    /**
                     * Enable or disable the axis labels.
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-enabled/
                     *         X axis labels disabled
                     * @sample {highstock} stock/xaxis/labels-enabled/
                     *         X axis labels disabled
                     *
                     */
                    enabled: true,
                    /**
                     * A format string for the axis label. The context is available as
                     * format string variables. For example, you can use `{text}` to
                     * insert the default formatted text. The recommended way of adding
                     * units for the label is using `text`, for example `{text} km`.
                     *
                     * To add custom numeric or datetime formatting, use `{value}` with
                     * formatting, for example `{value:.1f}` or `{value:%Y-%m-%d}`.
                     *
                     * See
                     * [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                     * for more examples of formatting.
                     *
                     * The default value is not specified due to the dynamic
                     * nature of the default implementation.
                     *
                     * @sample {highcharts|highstock} highcharts/yaxis/labels-format/
                     *         Add units to Y axis label
                     * @sample {highcharts} highcharts/xaxis/labels-format-linked/
                     *         Linked category names
                     * @sample {highcharts} highcharts/xaxis/labels-format-custom/
                     *         Custom number format
                     *
                     * @type      {string}
                     * @since     3.0
                     * @apioption xAxis.labels.format
                     */
                    /**
                     * Callback JavaScript function to format the label. The value
                     * is given by `this.value`. Additional properties for `this` are
                     * `axis`, `chart`, `isFirst`, `isLast` and `text` which holds the
                     * value of the default formatter.
                     *
                     * Defaults to a built in function returning a formatted string
                     * depending on whether the axis is `category`, `datetime`,
                     * `numeric` or other.
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-formatter-linked/
                     *         Linked category names
                     * @sample {highcharts} highcharts/xaxis/labels-formatter-extended/
                     *         Modified numeric labels
                     * @sample {highstock} stock/xaxis/labels-formatter/
                     *         Added units on Y axis
                     *
                     * @type      {Highcharts.AxisLabelsFormatterCallbackFunction}
                     * @apioption xAxis.labels.formatter
                     */
                    /**
                     * The number of pixels to indent the labels per level in a treegrid
                     * axis.
                     *
                     * @sample gantt/treegrid-axis/demo
                     *         Indentation 10px by default.
                     * @sample gantt/treegrid-axis/indentation-0px
                     *         Indentation set to 0px.
                     *
                     * @product gantt
                     */
                    indentation: 10,
                    /**
                     * Horizontal axis only. When `staggerLines` is not set,
                     * `maxStaggerLines` defines how many lines the axis is allowed to
                     * add to automatically avoid overlapping X labels. Set to `1` to
                     * disable overlap detection.
                     *
                     * @deprecated
                     * @type      {number}
                     * @default   5
                     * @since     1.3.3
                     * @apioption xAxis.labels.maxStaggerLines
                     */
                    /**
                     * How to handle overflowing labels on horizontal axis. If set to
                     * `"allow"`, it will not be aligned at all. By default it
                     * `"justify"` labels inside the chart area. If there is room to
                     * move it, it will be aligned to the edge, else it will be removed.
                     *
                     * @since      2.2.5
                     * @validvalue ["allow", "justify"]
                     */
                    overflow: 'justify',
                    /**
                     * The pixel padding for axis labels, to ensure white space between
                     * them.
                     *
                     * @product   highcharts gantt
                     */
                    padding: 5,
                    /**
                     * Whether to reserve space for the labels. By default, space is
                     * reserved for the labels in these cases:
                     *
                     * * On all horizontal axes.
                     * * On vertical axes if `label.align` is `right` on a left-side
                     * axis or `left` on a right-side axis.
                     * * On vertical axes if `label.align` is `center`.
                     *
                     * This can be turned off when for example the labels are rendered
                     * inside the plot area instead of outside.
                     *
                     * @see [labels.align](#xAxis.labels.align)
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-reservespace/
                     *         No reserved space, labels inside plot
                     * @sample {highcharts} highcharts/xaxis/labels-reservespace-true/
                     *         Left-aligned labels on a vertical category axis
                     *
                     * @type      {boolean}
                     * @since     4.1.10
                     * @product   highcharts highstock gantt
                     * @apioption xAxis.labels.reserveSpace
                     */
                    reserveSpace: void 0,
                    /**
                     * Rotation of the labels in degrees. When `undefined`, the
                     * `autoRotation` option takes precedence.
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-rotation/
                     *         X axis labels rotated 90°
                     *
                     * @type      {number}
                     * @default   0
                     * @apioption xAxis.labels.rotation
                     */
                    rotation: void 0,
                    /**
                     * Horizontal axes only. The number of lines to spread the labels
                     * over to make room or tighter labels. 0 disables staggering.
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-staggerlines/
                     *         Show labels over two lines
                     * @sample {highstock} stock/xaxis/labels-staggerlines/
                     *         Show labels over two lines
                     *
                     * @since     2.1
                     */
                    staggerLines: 0,
                    /**
                     * To show only every _n_'th label on the axis, set the step to _n_.
                     * Setting the step to 2 shows every other label.
                     *
                     * By default, when 0, the step is calculated automatically to avoid
                     * overlap. To prevent this, set it to 1\. This usually only
                     * happens on a category axis, and is often a sign that you have
                     * chosen the wrong axis type.
                     *
                     * Read more at
                     * [Axis docs](https://www.highcharts.com/docs/chart-concepts/axes)
                     * => What axis should I use?
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-step/
                     *         Showing only every other axis label on a categorized
                     *         x-axis
                     * @sample {highcharts} highcharts/xaxis/labels-step-auto/
                     *         Auto steps on a category axis
                     *
                     * @since     2.1
                     */
                    step: 0,
                    /**
                     * Whether to [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                     * to render the labels.
                     */
                    useHTML: false,
                    /**
                     * The x position offset of all labels relative to the tick
                     * positions on the axis. Overrides the `labels.distance` option.
                     *
                     * @type      {number}
                     * @apioption xAxis.labels.x
                     */
                    /**
                     * The y position offset of all labels relative to the tick
                     * positions on the axis. Overrides the `labels.distance` option.
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-x/
                     *         X axis labels placed on grid lines
                     *
                     * @type      {number}
                     * @apioption xAxis.labels.y
                     */
                    /**
                     * The Z index for the axis labels.
                     */
                    zIndex: 7,
                    /**
                     * CSS styles for the label. Use `whiteSpace: 'nowrap'` to prevent
                     * wrapping of category labels. Use `textOverflow: 'none'` to
                     * prevent ellipsis (dots).
                     *
                     * In styled mode, the labels are styled with the
                     * `.highcharts-axis-labels` class.
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-style/
                     *         Red X axis labels
                     *
                     * @type      {Highcharts.CSSObject}
                     */
                    style: {
                        /** @internal */
                        color: "#333333" /* Palette.neutralColor80 */,
                        /** @internal */
                        cursor: 'default',
                        /** @internal */
                        fontSize: '0.8em'
                    }
                },
                /**
                 * The left position as the horizontal axis. If it's a number, it is
                 * interpreted as pixel position relative to the chart.
                 *
                 * Since Highcharts v5.0.13: If it's a percentage string, it is
                 * interpreted as percentages of the plot width, offset from plot area
                 * left.
                 *
                 * @sample {highcharts} highcharts/xaxis/axis-position-properties
                 *         Different axis position properties
                 *
                 * @type      {number|string}
                 * @product   highcharts highstock
                 * @apioption xAxis.left
                 */
                /**
                 * The top position as the vertical axis. If it's a number, it is
                 * interpreted as pixel position relative to the chart.
                 *
                 * Since Highcharts 2: If it's a percentage string, it is interpreted
                 * as percentages of the plot height, offset from plot area top.
                 *
                 * @sample {highcharts} highcharts/xaxis/axis-position-properties
                 *         Different axis position properties
                 *
                 * @type      {number|string}
                 * @product   highcharts highstock
                 * @apioption xAxis.top
                 */
                /**
                 * Index of another axis that this axis is linked to. When an axis is
                 * linked to a master axis, it will take the same extremes as
                 * the master, but as assigned by min or max or by setExtremes.
                 * It can be used to show additional info, or to ease reading the
                 * chart by duplicating the scales.
                 *
                 * @sample {highcharts} highcharts/xaxis/linkedto/
                 *         Different string formats of the same date
                 * @sample {highcharts} highcharts/yaxis/linkedto/
                 *         Y values on both sides
                 *
                 * @type      {number}
                 * @since     2.0.2
                 * @product   highcharts highstock gantt
                 * @apioption xAxis.linkedTo
                 */
                /**
                 * The maximum value of the axis. If `null`, the max value is
                 * automatically calculated.
                 *
                 * If the [endOnTick](#yAxis.endOnTick) option is true, the `max` value
                 * might be rounded up.
                 *
                 * If a [tickAmount](#yAxis.tickAmount) is set, the axis may be extended
                 * beyond the set max in order to reach the given number of ticks. The
                 * same may happen in a chart with multiple axes, determined by [chart.
                 * alignTicks](#chart), where a `tickAmount` is applied internally.
                 *
                 * @sample {highcharts} highcharts/yaxis/max-200/
                 *         Y axis max of 200
                 * @sample {highcharts} highcharts/yaxis/max-logarithmic/
                 *         Y axis max on logarithmic axis
                 * @sample {highstock} stock/xaxis/min-max/
                 *         Fixed min and max on X axis
                 *
                 * @type      {number|null}
                 * @apioption xAxis.max
                 */
                /**
                 * Padding of the max value relative to the length of the axis. A
                 * padding of 0.05 will make a 100px axis 5px longer. This is useful
                 * when you don't want the highest data value to appear on the edge
                 * of the plot area. When the axis' `max` option is set or a max extreme
                 * is set using `axis.setExtremes()`, the maxPadding will be ignored.
                 *
                 * @productdesc {highstock}
                 * For an [ordinal](#xAxis.ordinal) axis, `minPadding` and `maxPadding`
                 * are ignored. Use [overscroll](#xAxis.overscroll) instead.
                 *
                 * @sample {highcharts} highcharts/yaxis/maxpadding/
                 *         Max padding of 0.25 on y axis
                 * @sample {highstock} stock/xaxis/minpadding-maxpadding/
                 *         Greater min- and maxPadding
                 * @sample {highmaps} maps/chart/plotbackgroundcolor-gradient/
                 *         Add some padding
                 *
                 * @default   {highcharts} 0.01
                 * @default   {highstock|highmaps} 0
                 * @since     1.2.0
                 */
                maxPadding: 0.01,
                /**
                 * Deprecated. Use `minRange` instead.
                 *
                 * @deprecated
                 * @type      {number}
                 * @product   highcharts highstock
                 * @apioption xAxis.maxZoom
                 */
                /**
                 * The minimum value of the axis. If `null` the min value is
                 * automatically calculated.
                 *
                 * If the [startOnTick](#yAxis.startOnTick) option is true (default),
                 * the `min` value might be rounded down.
                 *
                 * The automatically calculated minimum value is also affected by
                 * [floor](#yAxis.floor), [softMin](#yAxis.softMin),
                 * [minPadding](#yAxis.minPadding), [minRange](#yAxis.minRange)
                 * as well as [series.threshold](#plotOptions.series.threshold)
                 * and [series.softThreshold](#plotOptions.series.softThreshold).
                 *
                 * @sample {highcharts} highcharts/yaxis/min-startontick-false/
                 *         -50 with startOnTick to false
                 * @sample {highcharts} highcharts/yaxis/min-startontick-true/
                 *         -50 with startOnTick true by default
                 * @sample {highstock} stock/xaxis/min-max/
                 *         Set min and max on X axis
                 *
                 * @type      {number|null}
                 * @apioption xAxis.min
                 */
                /**
                 * The dash or dot style of the minor grid lines. For possible values,
                 * see [this demonstration](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-dashstyle-all/).
                 *
                 * @sample {highcharts} highcharts/yaxis/minorgridlinedashstyle/
                 *         Long dashes on minor grid lines
                 * @sample {highstock} stock/xaxis/minorgridlinedashstyle/
                 *         Long dashes on minor grid lines
                 *
                 * @type      {Highcharts.DashStyleValue}
                 * @since     1.2
                 */
                minorGridLineDashStyle: 'Solid',
                /**
                 * Specific tick interval in axis units for the minor ticks. On a linear
                 * axis, if `"auto"`, the minor tick interval is calculated as a fifth
                 * of the tickInterval. If `null` or `undefined`, minor ticks are not
                 * shown.
                 *
                 * On logarithmic axes, the unit is the power of the value. For example,
                 * setting the minorTickInterval to 1 puts one tick on each of 0.1, 1,
                 * 10, 100 etc. Setting the minorTickInterval to 0.1 produces 9 ticks
                 * between 1 and 10, 10 and 100 etc.
                 *
                 * If user settings dictate minor ticks to become too dense, they don't
                 * make sense, and will be ignored to prevent performance problems.
                 *
                 * @sample {highcharts} highcharts/yaxis/minortickinterval-null/
                 *         Null by default
                 * @sample {highcharts} highcharts/yaxis/minortickinterval-5/
                 *         5 units
                 * @sample {highcharts} highcharts/yaxis/minortickinterval-log-auto/
                 *         "auto"
                 * @sample {highcharts} highcharts/yaxis/minortickinterval-log/
                 *         0.1
                 * @sample {highstock} stock/demo/basic-line/
                 *         Null by default
                 * @sample {highstock} stock/xaxis/minortickinterval-auto/
                 *         "auto"
                 *
                 * @type      {number|string|null}
                 * @apioption xAxis.minorTickInterval
                 */
                /**
                 * The pixel length of the minor tick marks.
                 *
                 * @sample {highcharts} highcharts/yaxis/minorticklength/
                 *         10px on Y axis
                 * @sample {highstock} stock/xaxis/minorticks/
                 *         10px on Y axis
                 */
                minorTickLength: 2,
                /**
                 * The position of the minor tick marks relative to the axis line.
                 *  Can be one of `inside` and `outside`.
                 *
                 * @sample {highcharts} highcharts/yaxis/minortickposition-outside/
                 *         Outside by default
                 * @sample {highcharts} highcharts/yaxis/minortickposition-inside/
                 *         Inside
                 * @sample {highstock} stock/xaxis/minorticks/
                 *         Inside
                 *
                 * @validvalue ["inside", "outside"]
                 */
                minorTickPosition: 'outside',
                /**
                 * Enable or disable minor ticks. The interval between the minor ticks
                 * can be controlled either by the
                 * [minorTicksPerMajor](#xAxis.minorTicksPerMajor) setting, or as an
                 * absolute [minorTickInterval](#xAxis.minorTickInterval) value.
                 *
                 * On a logarithmic axis, minor ticks are laid out based on a best
                 * guess, attempting to enter an approximate number of minor ticks
                 * between each major tick based on
                 * [minorTicksPerMajor](#xAxis.minorTicksPerMajor).
                 *
                 * Prior to v6.0.0, ticks were enabled in auto layout by setting
                 * `minorTickInterval` to `"auto"`.
                 *
                 * @productdesc {highcharts} On axes using
                 * [categories](#xAxis.categories), minor ticks are not supported.
                 *
                 * @sample {highcharts} highcharts/yaxis/minorticks-true/ Enabled on
                 *         linear Y axis
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     6.0.0
                 * @apioption xAxis.minorTicks
                 */
                /**
                 * The number of minor ticks per major tick. Works for `linear`,
                 * `logarithmic` and `datetime` axes.
                 *
                 * @sample {highcharts} highcharts/yaxis/minortickspermajor/
                 *         2 minor ticks per major tick on Y axis
                 *
                 * @type {number}
                 */
                minorTicksPerMajor: 5,
                /**
                 * The pixel width of the minor tick mark.
                 *
                 * @sample {highcharts} highcharts/yaxis/minortickwidth/
                 *         3px width
                 * @sample {highstock} stock/xaxis/minorticks/
                 *         1px width
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption xAxis.minorTickWidth
                 */
                /**
                 * Padding of the min value relative to the length of the axis. A
                 * padding of 0.05 will make a 100px axis 5px longer. This is useful
                 * when you don't want the lowest data value to appear on the edge
                 * of the plot area. When the axis' `min` option is set or a min extreme
                 * is set using `axis.setExtremes()`, the minPadding will be ignored.
                 *
                 * @productdesc {highstock}
                 * For an [ordinal](#xAxis.ordinal) axis, `minPadding` and `maxPadding`
                 * are ignored. Use [overscroll](#xAxis.overscroll) instead.
                 *
                 * @sample {highcharts} highcharts/yaxis/minpadding/
                 *         Min padding of 0.2
                 * @sample {highstock} stock/xaxis/minpadding-maxpadding/
                 *         Greater min- and maxPadding
                 * @sample {highmaps} maps/chart/plotbackgroundcolor-gradient/
                 *         Add some padding
                 *
                 * @default    {highcharts} 0.01
                 * @default    {highstock|highmaps} 0
                 * @since      1.2.0
                 * @product    highcharts highstock gantt
                 */
                minPadding: 0.01,
                /**
                 * The minimum range to display on this axis. The entire axis will not
                 * be allowed to span over a smaller interval than this. For example,
                 * for a datetime axis the main unit is milliseconds. If minRange is
                 * set to 3600000, you can't zoom in more than to one hour.
                 *
                 * The default minRange for the x axis is five times the smallest
                 * interval between any of the data points.
                 *
                 * On a logarithmic axis, the unit for the minimum range is the power.
                 * So a minRange of 1 means that the axis can be zoomed to 10-100,
                 * 100-1000, 1000-10000 etc.
                 *
                 * **Note**: The `minPadding`, `maxPadding`, `startOnTick` and
                 * `endOnTick` settings also affect how the extremes of the axis
                 * are computed.
                 *
                 * @sample {highcharts} highcharts/xaxis/minrange/
                 *         Minimum range of 5
                 * @sample {highstock} stock/xaxis/minrange/
                 *         Max zoom of 6 months overrides user selections
                 *
                 * @type      {number}
                 * @apioption xAxis.minRange
                 */
                /**
                 * The minimum tick interval allowed in axis values. For example on
                 * zooming in on an axis with daily data, this can be used to prevent
                 * the axis from showing hours. Defaults to the closest distance between
                 * two points on the axis.
                 *
                 * @type      {number}
                 * @since     2.3.0
                 * @apioption xAxis.minTickInterval
                 */
                /**
                 * The distance in pixels from the plot area to the axis line.
                 * A positive offset moves the axis with it's line, labels and ticks
                 * away from the plot area. This is typically used when two or more
                 * axes are displayed on the same side of the plot. With multiple
                 * axes the offset is dynamically adjusted to avoid collision, this
                 * can be overridden by setting offset explicitly.
                 *
                 * @sample {highcharts} highcharts/yaxis/offset/
                 *         Y axis offset of 70
                 * @sample {highcharts} highcharts/yaxis/offset-centered/
                 *         Axes positioned in the center of the plot
                 * @sample {highstock} stock/xaxis/offset/
                 *         Y axis offset by 70 px
                 *
                 * @type {number}
                 */
                offset: void 0,
                /**
                 * Whether to display the axis on the opposite side of the normal. The
                 * normal is on the left side for vertical axes and bottom for
                 * horizontal, so the opposite sides will be right and top respectively.
                 * This is typically used with dual or multiple axes.
                 *
                 * @sample {highcharts} highcharts/yaxis/opposite/
                 *         Secondary Y axis opposite
                 * @sample {highstock} stock/xaxis/opposite/
                 *         Y axis on left side
                 *
                 * @default   {highcharts|highstock|highmaps} false
                 * @default   {gantt} true
                 */
                opposite: false,
                /**
                 * In an ordinal axis, the points are equally spaced in the chart
                 * regardless of the actual time or x distance between them. This means
                 * that missing data periods (e.g. nights or weekends for a stock chart)
                 * will not take up space in the chart.
                 * Having `ordinal: false` will show any gaps created by the `gapSize`
                 * setting proportionate to their duration.
                 *
                 * In stock charts the X axis is ordinal by default, unless
                 * the boost module is used and at least one of the series' data length
                 * exceeds the [boostThreshold](#series.line.boostThreshold).
                 *
                 * For an ordinal axis, `minPadding` and `maxPadding` are ignored. Use
                 * [overscroll](#xAxis.overscroll) instead.
                 *
                 * @sample {highstock} stock/xaxis/ordinal-true/
                 *         True by default
                 * @sample {highstock} stock/xaxis/ordinal-false/
                 *         False
                 *
                 * @see [overscroll](#xAxis.overscroll)
                 *
                 * @type      {boolean}
                 * @default   true
                 * @since     1.1
                 * @product   highstock
                 * @apioption xAxis.ordinal
                 */
                /**
                 * Additional range on the right side of the xAxis. Works similar to
                 * `xAxis.maxPadding`, but value is set in milliseconds. Can be set for
                 * both main `xAxis` and the navigator's `xAxis`.
                 *
                 * @sample {highstock} stock/xaxis/overscroll/
                 *         One minute overscroll with live data
                 *
                 * @type      {number}
                 * @default   0
                 * @since     6.0.0
                 * @product   highstock
                 * @apioption xAxis.overscroll
                 */
                /**
                 * Refers to the index in the [panes](#panes) array. Used for circular
                 * gauges and polar charts. When the option is not set then first pane
                 * will be used.
                 *
                 * @sample highcharts/demo/gauge-vu-meter
                 *         Two gauges with different center
                 *
                 * @type      {number}
                 * @product   highcharts
                 * @apioption xAxis.pane
                 */
                /**
                 * The zoomed range to display when only defining one or none of `min`
                 * or `max`. For example, to show the latest month, a range of one month
                 * can be set.
                 *
                 * @sample {highstock} stock/xaxis/range/
                 *         Setting a zoomed range when the rangeSelector is disabled
                 *
                 * @type      {number}
                 * @product   highstock
                 * @apioption xAxis.range
                 */
                /**
                 * Whether to reverse the axis so that the highest number is closest
                 * to the origin. If the chart is inverted, the x axis is reversed by
                 * default.
                 *
                 * @sample {highcharts} highcharts/yaxis/reversed/
                 *         Reversed Y axis
                 * @sample {highstock} stock/xaxis/reversed/
                 *         Reversed Y axis
                 *
                 * @type      {boolean}
                 * @default   undefined
                 * @apioption xAxis.reversed
                 */
                reversed: void 0,
                /**
                 * This option determines how stacks should be ordered within a group.
                 * For example reversed xAxis also reverses stacks, so first series
                 * comes last in a group. To keep order like for non-reversed xAxis
                 * enable this option.
                 *
                 * @sample {highcharts} highcharts/xaxis/reversedstacks/
                 *         Reversed stacks comparison
                 * @sample {highstock} highcharts/xaxis/reversedstacks/
                 *         Reversed stacks comparison
                 *
                 * @since     6.1.1
                 * @product   highcharts highstock
                 */
                reversedStacks: false,
                /**
                 * An optional scrollbar to display on the X axis in response to
                 * limiting the minimum and maximum of the axis values.
                 *
                 * In styled mode, all the presentational options for the scrollbar are
                 * replaced by the classes `.highcharts-scrollbar-thumb`,
                 * `.highcharts-scrollbar-arrow`, `.highcharts-scrollbar-button`,
                 * `.highcharts-scrollbar-rifles` and `.highcharts-scrollbar-track`.
                 *
                 * @sample {highstock} stock/yaxis/heatmap-scrollbars/
                 *         Heatmap with both scrollbars
                 *
                 * @extends   scrollbar
                 * @since     4.2.6
                 * @product   highstock
                 * @apioption xAxis.scrollbar
                 */
                /**
                 * Whether to show the axis line and title when the axis has no data.
                 *
                 * @sample {highcharts} highcharts/yaxis/showempty/
                 *         When clicking the legend to hide series, one axis preserves
                 *         line and title, the other doesn't
                 * @sample {highstock} highcharts/yaxis/showempty/
                 *         When clicking the legend to hide series, one axis preserves
                 *         line and title, the other doesn't
                 *
                 * @since     1.1
                 */
                showEmpty: true,
                /**
                 * Whether to show the first tick label.
                 *
                 * @sample {highcharts} highcharts/xaxis/showfirstlabel-false/
                 *         Set to false on X axis
                 * @sample {highstock} stock/xaxis/showfirstlabel/
                 *         Labels below plot lines on Y axis
                 */
                showFirstLabel: true,
                /**
                 * Whether to show the last tick label. Defaults to `true` on cartesian
                 * charts, and `false` on polar charts.
                 *
                 * @sample {highcharts} highcharts/xaxis/showlastlabel-true/
                 *         Set to true on X axis
                 * @sample {highstock} stock/xaxis/showfirstlabel/
                 *         Labels below plot lines on Y axis
                 *
                 * @type    {boolean}
                 * @default undefined
                 * @product highcharts highstock gantt
                 */
                showLastLabel: true,
                /**
                 * A soft maximum for the axis. If the series data maximum is less than
                 * this, the axis will stay at this maximum, but if the series data
                 * maximum is higher, the axis will flex to show all data.
                 *
                 * @sample highcharts/yaxis/softmin-softmax/
                 *         Soft min and max
                 *
                 * @type      {number}
                 * @since     5.0.1
                 * @product   highcharts highstock gantt
                 * @apioption xAxis.softMax
                 */
                /**
                 * A soft minimum for the axis. If the series data minimum is greater
                 * than this, the axis will stay at this minimum, but if the series
                 * data minimum is lower, the axis will flex to show all data.
                 *
                 * @sample highcharts/yaxis/softmin-softmax/
                 *         Soft min and max
                 *
                 * @type      {number}
                 * @since     5.0.1
                 * @product   highcharts highstock gantt
                 * @apioption xAxis.softMin
                 */
                /**
                 * For datetime axes, this decides where to put the tick between weeks.
                 *  0 = Sunday, 1 = Monday.
                 *
                 * @sample {highcharts} highcharts/xaxis/startofweek-monday/
                 *         Monday by default
                 * @sample {highcharts} highcharts/xaxis/startofweek-sunday/
                 *         Sunday
                 * @sample {highstock} stock/xaxis/startofweek-1
                 *         Monday by default
                 * @sample {highstock} stock/xaxis/startofweek-0
                 *         Sunday
                 *
                 * @product highcharts highstock gantt
                 */
                startOfWeek: 1,
                /**
                 * Whether to force the axis to start on a tick. Use this option with
                 * the `minPadding` option to control the axis start.
                 *
                 * @productdesc {highstock}
                 * In Highcharts Stock, `startOnTick` is always `false` when
                 * the navigator is enabled, to prevent jumpy scrolling.
                 *
                 * @sample {highcharts} highcharts/xaxis/startontick-false/
                 *         False by default
                 * @sample {highcharts} highcharts/xaxis/startontick-true/
                 *         True
                 *
                 * @since 1.2.0
                 */
                startOnTick: false,
                /**
                 * The amount of ticks to draw on the axis. This opens up for aligning
                 * the ticks of multiple charts or panes within a chart. This option
                 * overrides the `tickPixelInterval` option.
                 *
                 * This option only has an effect on linear axes. Datetime, logarithmic
                 * or category axes are not affected.
                 *
                 * @sample {highcharts} highcharts/yaxis/tickamount/
                 *         8 ticks on Y axis
                 * @sample {highstock} highcharts/yaxis/tickamount/
                 *         8 ticks on Y axis
                 *
                 * @type      {number}
                 * @since     4.1.0
                 * @product   highcharts highstock gantt
                 * @apioption xAxis.tickAmount
                 */
                /**
                 * The interval of the tick marks in axis units. When `undefined`, the
                 * tick interval is computed to approximately follow the
                 * [tickPixelInterval](#xAxis.tickPixelInterval) on linear and datetime
                 * axes. On categorized axes, a `undefined` tickInterval will default to
                 * 1, one category. Note that datetime axes are based on milliseconds,
                 * so for example an interval of one day is expressed as
                 * `24 * 3600 * 1000`.
                 *
                 * On logarithmic axes, the tickInterval is based on powers, so a
                 * tickInterval of 1 means one tick on each of 0.1, 1, 10, 100 etc. A
                 * tickInterval of 2 means a tick of 0.1, 10, 1000 etc. A tickInterval
                 * of 0.2 puts a tick on 0.1, 0.2, 0.4, 0.6, 0.8, 1, 2, 4, 6, 8, 10, 20,
                 * 40 etc.
                 *
                 *
                 * If the tickInterval is too dense for labels to be drawn, Highcharts
                 * may remove ticks.
                 *
                 * If the chart has multiple axes, the [alignTicks](#chart.alignTicks)
                 * option may interfere with the `tickInterval` setting.
                 *
                 * @see [tickPixelInterval](#xAxis.tickPixelInterval)
                 * @see [tickPositions](#xAxis.tickPositions)
                 * @see [tickPositioner](#xAxis.tickPositioner)
                 *
                 * @sample {highcharts} highcharts/xaxis/tickinterval-5/
                 *         Tick interval of 5 on a linear axis
                 * @sample {highstock} stock/xaxis/tickinterval/
                 *         Tick interval of 0.01 on Y axis
                 *
                 * @type      {number}
                 * @apioption xAxis.tickInterval
                 */
                /**
                 * The pixel length of the main tick marks.
                 *
                 * @sample {highcharts} highcharts/xaxis/ticklength/
                 *         20 px tick length on the X axis
                 * @sample {highstock} stock/xaxis/ticks/
                 *         Formatted ticks on X axis
                 */
                tickLength: 10,
                /**
                 * If tickInterval is `null` this option sets the approximate pixel
                 * interval of the tick marks. Not applicable to categorized axis.
                 *
                 * The tick interval is also influenced by the [minTickInterval](
                 * #xAxis.minTickInterval) option, that, by default prevents ticks from
                 * being denser than the data points.
                 *
                 * @see [tickInterval](#xAxis.tickInterval)
                 * @see [tickPositioner](#xAxis.tickPositioner)
                 * @see [tickPositions](#xAxis.tickPositions)
                 *
                 * @sample {highcharts} highcharts/xaxis/tickpixelinterval-50/
                 *         50 px on X axis
                 * @sample {highstock} stock/xaxis/tickpixelinterval/
                 *         200 px on X axis
                 */
                tickPixelInterval: 100,
                /**
                 * For categorized axes only. If `on` the tick mark is placed in the
                 * center of the category, if `between` the tick mark is placed between
                 * categories. The default is `between` if the `tickInterval` is 1, else
                 * `on`.
                 *
                 * @sample {highcharts} highcharts/xaxis/tickmarkplacement-between/
                 *         "between" by default
                 * @sample {highcharts} highcharts/xaxis/tickmarkplacement-on/
                 *         "on"
                 *
                 * @product    highcharts gantt
                 * @validvalue ["on", "between"]
                 */
                tickmarkPlacement: 'between',
                /**
                 * The position of the major tick marks relative to the axis line.
                 * Can be one of `inside` and `outside`.
                 *
                 * @sample {highcharts} highcharts/xaxis/tickposition-outside/
                 *         "outside" by default
                 * @sample {highcharts} highcharts/xaxis/tickposition-inside/
                 *         "inside"
                 * @sample {highstock} stock/xaxis/ticks/
                 *         Formatted ticks on X axis
                 *
                 * @validvalue ["inside", "outside"]
                 */
                tickPosition: 'outside',
                /**
                 * A callback function returning array defining where the ticks are
                 * laid out on the axis. This overrides the default behaviour of
                 * [tickPixelInterval](#xAxis.tickPixelInterval) and [tickInterval](
                 * #xAxis.tickInterval). The automatic tick positions are accessible
                 * through `this.tickPositions` and can be modified by the callback.
                 *
                 * @see [tickPositions](#xAxis.tickPositions)
                 *
                 * @sample {highcharts} highcharts/xaxis/tickpositions-tickpositioner/
                 *         Demo of tickPositions and tickPositioner
                 * @sample {highstock} highcharts/xaxis/tickpositions-tickpositioner/
                 *         Demo of tickPositions and tickPositioner
                 *
                 * @type      {Highcharts.AxisTickPositionerCallbackFunction}
                 * @apioption xAxis.tickPositioner
                 */
                /**
                 * An array defining where the ticks are laid out on the axis. This
                 * overrides the default behaviour of [tickPixelInterval](
                 * #xAxis.tickPixelInterval) and [tickInterval](#xAxis.tickInterval).
                 *
                 * @see [tickPositioner](#xAxis.tickPositioner)
                 *
                 * @sample {highcharts} highcharts/xaxis/tickpositions-tickpositioner/
                 *         Demo of tickPositions and tickPositioner
                 * @sample {highstock} highcharts/xaxis/tickpositions-tickpositioner/
                 *         Demo of tickPositions and tickPositioner
                 *
                 * @type      {Array<number>}
                 * @apioption xAxis.tickPositions
                 */
                /**
                 * The pixel width of the major tick marks. Defaults to 0 on category
                 * axes, otherwise 1.
                 *
                 * In styled mode, the stroke width is given in the `.highcharts-tick`
                 * class, but in order for the element to be generated on category axes,
                 * the option must be explicitly set to 1.
                 *
                 * @sample {highcharts} highcharts/xaxis/tickwidth/
                 *         10 px width
                 * @sample {highcharts} highcharts/css/axis-grid/
                 *         Styled mode
                 * @sample {highstock} stock/xaxis/ticks/
                 *         Formatted ticks on X axis
                 * @sample {highstock} highcharts/css/axis-grid/
                 *         Styled mode
                 *
                 * @type      {undefined|number}
                 * @default   {highstock} 1
                 * @default   {highmaps} 0
                 * @apioption xAxis.tickWidth
                 */
                /**
                 * The axis title, showing next to the axis line.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps, the axis is hidden by default, but adding an axis title
                 * is still possible. X axis and Y axis titles will appear at the bottom
                 * and left by default.
                 */
                title: {
                    /**
                     * Alignment of the title relative to the axis values. Possible
                     * values are "low", "middle" or "high".
                     *
                     * @sample {highcharts} highcharts/xaxis/title-align-low/
                     *         "low"
                     * @sample {highcharts} highcharts/xaxis/title-align-center/
                     *         "middle" by default
                     * @sample {highcharts} highcharts/xaxis/title-align-high/
                     *         "high"
                     * @sample {highcharts} highcharts/yaxis/title-offset/
                     *         Place the Y axis title on top of the axis
                     * @sample {highstock} stock/xaxis/title-align/
                     *         Aligned to "high" value
                     *
                     * @type {Highcharts.AxisTitleAlignValue}
                     */
                    align: 'middle',
                    /**
                     * Deprecated. Set the `text` to `undefined` to disable the title.
                     *
                     * @deprecated
                     * @type      {boolean}
                     * @product   highcharts
                     * @apioption xAxis.title.enabled
                     */
                    /**
                     * The pixel distance between the axis labels or line and the title.
                     * Defaults to 0 for horizontal axes, 10 for vertical
                     *
                     * @sample {highcharts} highcharts/xaxis/title-margin/
                     *         Y axis title margin of 60
                     *
                     * @type      {number}
                     * @apioption xAxis.title.margin
                     */
                    /**
                     * The distance of the axis title from the axis line. By default,
                     * this distance is computed from the offset width of the labels,
                     * the labels' distance from the axis and the title's margin.
                     * However when the offset option is set, it overrides all this.
                     *
                     * @sample {highcharts} highcharts/yaxis/title-offset/
                     *         Place the axis title on top of the axis
                     * @sample {highstock} highcharts/yaxis/title-offset/
                     *         Place the axis title on top of the Y axis
                     *
                     * @type      {number}
                     * @since     2.2.0
                     * @apioption xAxis.title.offset
                     */
                    /**
                     * Whether to reserve space for the title when laying out the axis.
                     *
                     * @type      {boolean}
                     * @default   true
                     * @since     5.0.11
                     * @product   highcharts highstock gantt
                     * @apioption xAxis.title.reserveSpace
                     */
                    /**
                     * The rotation of the text in degrees. 0 is horizontal, 270 is
                     * vertical reading from bottom to top.
                     *
                     * @sample {highcharts} highcharts/yaxis/title-offset/
                     *         Horizontal
                     */
                    rotation: 0,
                    /**
                     * The actual text of the axis title. It can contain basic HTML tags
                     * like `b`, `i` and `span` with style.
                     *
                     * @sample {highcharts} highcharts/xaxis/title-text/
                     *         Custom HTML
                     * @sample {highstock} stock/xaxis/title-text/
                     *         Titles for both axes
                     *
                     * @type      {string|null}
                     * @apioption xAxis.title.text
                     */
                    /**
                     * Alignment of the text, can be `"left"`, `"right"` or `"center"`.
                     * Default alignment depends on the
                     * [title.align](xAxis.title.align):
                     *
                     * Horizontal axes:
                     * - for `align` = `"low"`, `textAlign` is set to `left`
                     * - for `align` = `"middle"`, `textAlign` is set to `center`
                     * - for `align` = `"high"`, `textAlign` is set to `right`
                     *
                     * Vertical axes:
                     * - for `align` = `"low"` and `opposite` = `true`, `textAlign` is
                     *   set to `right`
                     * - for `align` = `"low"` and `opposite` = `false`, `textAlign` is
                     *   set to `left`
                     * - for `align` = `"middle"`, `textAlign` is set to `center`
                     * - for `align` = `"high"` and `opposite` = `true` `textAlign` is
                     *   set to `left`
                     * - for `align` = `"high"` and `opposite` = `false` `textAlign` is
                     *   set to `right`
                     *
                     * @type      {Highcharts.AlignValue}
                     * @apioption xAxis.title.textAlign
                     */
                    /**
                     * Whether to [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                     * to render the axis title.
                     *
                     * @product   highcharts highstock gantt
                     */
                    useHTML: false,
                    /**
                     * Horizontal pixel offset of the title position.
                     *
                     * @since     4.1.6
                     * @product   highcharts highstock gantt
                     */
                    x: 0,
                    /**
                     * Vertical pixel offset of the title position.
                     *
                     * @product   highcharts highstock gantt
                     */
                    y: 0,
                    /**
                     * CSS styles for the title. If the title text is longer than the
                     * axis length, it will wrap to multiple lines by default. This can
                     * be customized by setting `textOverflow: 'ellipsis'`, by
                     * setting a specific `width` or by setting `whiteSpace: 'nowrap'`.
                     *
                     * In styled mode, the stroke width is given in the
                     * `.highcharts-axis-title` class.
                     *
                     * @sample {highcharts} highcharts/xaxis/title-style/
                     *         Red
                     * @sample {highcharts} highcharts/css/axis/
                     *         Styled mode
                     *
                     * @type    {Highcharts.CSSObject}
                     */
                    style: {
                        /** @internal */
                        color: "#666666" /* Palette.neutralColor60 */,
                        /** @internal */
                        fontSize: '0.8em'
                    }
                },
                /**
                 * The type of axis. Can be one of `linear`, `logarithmic`, `datetime`
                 * or `category`. In a datetime axis, the numbers are given in
                 * milliseconds, and tick marks are placed on appropriate values like
                 * full hours or days. In a category axis, the
                 * [point names](#series.line.data.name) of the chart's series are used
                 * for categories, if not a [categories](#xAxis.categories) array is
                 * defined.
                 *
                 * @sample {highcharts} highcharts/xaxis/type-linear/
                 *         Linear
                 * @sample {highcharts} highcharts/yaxis/type-log/
                 *         Logarithmic
                 * @sample {highcharts} highcharts/yaxis/type-log-minorgrid/
                 *         Logarithmic with minor grid lines
                 * @sample {highcharts} highcharts/xaxis/type-log-both/
                 *         Logarithmic on two axes
                 * @sample {highcharts} highcharts/yaxis/type-log-negative/
                 *         Logarithmic with extension to emulate negative values
                 *
                 * @type    {Highcharts.AxisTypeValue}
                 * @product highcharts gantt
                 */
                type: 'linear',
                /**
                 * If there are multiple axes on the same side of the chart, the pixel
                 * margin between the axes. Defaults to 0 on vertical axes, 15 on
                 * horizontal axes.
                 *
                 * @type      {number}
                 * @since     7.0.3
                 * @apioption xAxis.margin
                 */
                /**
                 * Applies only when the axis `type` is `category`. When `uniqueNames`
                 * is true, points are placed on the X axis according to their names.
                 * If the same point name is repeated in the same or another series,
                 * the point is placed on the same X position as other points of the
                 * same name. When `uniqueNames` is false, the points are laid out in
                 * increasing X positions regardless of their names, and the X axis
                 * category will take the name of the last point in each position.
                 *
                 * @sample {highcharts} highcharts/xaxis/uniquenames-true/
                 *         True by default
                 * @sample {highcharts} highcharts/xaxis/uniquenames-false/
                 *         False
                 *
                 * @since     4.2.7
                 * @product   highcharts gantt
                 */
                uniqueNames: true,
                /**
                 * Datetime axis only. An array determining what time intervals the
                 * ticks are allowed to fall on. Each array item is an array where the
                 * first value is the time unit and the second value another array of
                 * allowed multiples.
                 *
                 * Defaults to:
                 * ```js
                 * units: [[
                 *     'millisecond', // unit name
                 *     [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                 * ], [
                 *     'second',
                 *     [1, 2, 5, 10, 15, 30]
                 * ], [
                 *     'minute',
                 *     [1, 2, 5, 10, 15, 30]
                 * ], [
                 *     'hour',
                 *     [1, 2, 3, 4, 6, 8, 12]
                 * ], [
                 *     'day',
                 *     [1, 2]
                 * ], [
                 *     'week',
                 *     [1, 2]
                 * ], [
                 *     'month',
                 *     [1, 2, 3, 4, 6]
                 * ], [
                 *     'year',
                 *     null
                 * ]]
                 * ```
                 *
                 * @sample {highcharts} highcharts/xaxis/units/
                 *         Axis units demonstrated
                 *
                 * @type      {Array<Array<string,(Array<number>|null)>>}
                 * @product   highcharts highstock gantt
                 * @apioption xAxis.units
                 */
                /**
                 * Whether axis, including axis title, line, ticks and labels, should
                 * be visible.
                 *
                 * @since     4.1.9
                 * @product   highcharts highstock gantt
                 */
                visible: true,
                /**
                 * Color of the minor, secondary grid lines.
                 *
                 * In styled mode, the stroke width is given in the
                 * `.highcharts-minor-grid-line` class.
                 *
                 * @sample {highcharts} highcharts/yaxis/minorgridlinecolor/
                 *         Bright grey lines from Y axis
                 * @sample {highcharts|highstock} highcharts/css/axis-grid/
                 *         Styled mode
                 * @sample {highstock} stock/xaxis/minorgridlinecolor/
                 *         Bright grey lines from Y axis
                 *
                 * @type    {Highcharts.ColorType}
                 * @default #f2f2f2
                 */
                minorGridLineColor: "#f2f2f2" /* Palette.neutralColor5 */,
                /**
                 * Width of the minor, secondary grid lines.
                 *
                 * In styled mode, the stroke width is given in the
                 * `.highcharts-grid-line` class.
                 *
                 * @sample {highcharts} highcharts/yaxis/minorgridlinewidth/
                 *         2px lines from Y axis
                 * @sample {highcharts|highstock} highcharts/css/axis-grid/
                 *         Styled mode
                 * @sample {highstock} stock/xaxis/minorgridlinewidth/
                 *         2px lines from Y axis
                 */
                minorGridLineWidth: 1,
                /**
                 * Color for the minor tick marks.
                 *
                 * @sample {highcharts} highcharts/yaxis/minortickcolor/
                 *         Black tick marks on Y axis
                 * @sample {highstock} stock/xaxis/minorticks/
                 *         Black tick marks on Y axis
                 *
                 * @type    {Highcharts.ColorType}
                 * @default #999999
                 */
                minorTickColor: "#999999" /* Palette.neutralColor40 */,
                /**
                 * The color of the line marking the axis itself.
                 *
                 * In styled mode, the line stroke is given in the
                 * `.highcharts-axis-line` or `.highcharts-xaxis-line` class.
                 *
                 * @sample {highcharts} highcharts/yaxis/linecolor/
                 *         A red line on Y axis
                 * @sample {highcharts|highstock} highcharts/css/axis/
                 *         Axes in styled mode
                 * @sample {highstock} stock/xaxis/linecolor/
                 *         A red line on X axis
                 *
                 * @type    {Highcharts.ColorType}
                 */
                lineColor: "#333333" /* Palette.neutralColor80 */,
                /**
                 * The width of the line marking the axis itself.
                 *
                 * In styled mode, the stroke width is given in the
                 * `.highcharts-axis-line` or `.highcharts-xaxis-line` class.
                 *
                 * @sample {highcharts} highcharts/yaxis/linecolor/
                 *         A 1px line on Y axis
                 * @sample {highcharts|highstock} highcharts/css/axis/
                 *         Axes in styled mode
                 * @sample {highstock} stock/xaxis/linewidth/
                 *         A 2px line on X axis
                 *
                 * @default {highcharts|highstock} 1
                 * @default {highmaps} 0
                 */
                lineWidth: 1,
                /**
                 * Color of the grid lines extending the ticks across the plot area.
                 *
                 * In styled mode, the stroke is given in the `.highcharts-grid-line`
                 * class.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps, the grid lines are hidden by default.
                 *
                 * @sample {highcharts} highcharts/yaxis/gridlinecolor/
                 *         Green lines
                 * @sample {highcharts|highstock} highcharts/css/axis-grid/
                 *         Styled mode
                 * @sample {highstock} stock/xaxis/gridlinecolor/
                 *         Green lines
                 *
                 * @type    {Highcharts.ColorType}
                 * @default #e6e6e6
                 */
                gridLineColor: "#e6e6e6" /* Palette.neutralColor10 */,
                /**
                 * The width of the grid lines extending the ticks across the plot area.
                 * Defaults to 1 on the Y axis and 0 on the X axis, except for 3d
                 * charts.
                 *
                 * In styled mode, the stroke width is given in the
                 * `.highcharts-grid-line` class.
                 *
                 * @sample {highcharts} highcharts/yaxis/gridlinewidth/
                 *         2px lines
                 * @sample {highcharts|highstock} highcharts/css/axis-grid/
                 *         Styled mode
                 * @sample {highstock} stock/xaxis/gridlinewidth/
                 *         2px lines
                 *
                 * @type      {number}
                 * @apioption xAxis.gridLineWidth
                 */
                gridLineWidth: void 0,
                /**
                 * The height as the vertical axis. If it's a number, it is
                 * interpreted as pixels.
                 *
                 * Since Highcharts 2: If it's a percentage string, it is interpreted
                 * as percentages of the total plot height.
                 *
                 * @sample {highcharts} highcharts/xaxis/axis-position-properties
                 *         Different axis position properties
                 *
                 * @type      {number|string}
                 * @product   highcharts highstock
                 * @apioption xAxis.height
                 */
                /**
                 * The width as the horizontal axis. If it's a number, it is interpreted
                 * as pixels.
                 *
                 * Since Highcharts v5.0.13: If it's a percentage string, it is
                 * interpreted as percentages of the total plot width.
                 *
                 * @sample {highcharts} highcharts/xaxis/axis-position-properties
                 *         Different axis position properties
                 *
                 * @type      {number|string}
                 * @product   highcharts highstock
                 * @apioption xAxis.width
                 */
                /**
                 * Color for the main tick marks.
                 *
                 * In styled mode, the stroke is given in the `.highcharts-tick`
                 * class.
                 *
                 * @sample {highcharts} highcharts/xaxis/tickcolor/
                 *         Red ticks on X axis
                 * @sample {highcharts|highstock} highcharts/css/axis-grid/
                 *         Styled mode
                 * @sample {highstock} stock/xaxis/ticks/
                 *         Formatted ticks on X axis
                 *
                 * @type    {Highcharts.ColorType}
                 */
                tickColor: "#333333" /* Palette.neutralColor80 */
                // tickWidth: 1
            };
            /**
             * The Y axis or value axis. Normally this is the vertical axis,
             * though if the chart is inverted this is the horizontal axis.
             * In case of multiple axes, the yAxis node is an array of
             * configuration objects.
             *
             * See [the Axis object](/class-reference/Highcharts.Axis) for programmatic
             * access to the axis.
             *
             * @type         {*|Array<*>}
             * @extends      xAxis
             * @excluding    currentDateIndicator,ordinal,overscroll
             * @optionparent yAxis
             */
            AxisDefaults.defaultYAxisOptions = {
                /**
                 * The type of axis. Can be one of `linear`, `logarithmic`, `datetime`,
                 * `category` or `treegrid`. Defaults to `treegrid` for Gantt charts,
                 * `linear` for other chart types.
                 *
                 * In a datetime axis, the numbers are given in milliseconds, and tick
                 * marks are placed on appropriate values, like full hours or days. In a
                 * category or treegrid axis, the [point names](#series.line.data.name)
                 * of the chart's series are used for categories, if a
                 * [categories](#xAxis.categories) array is not defined.
                 *
                 * @sample {highcharts} highcharts/yaxis/type-log-minorgrid/
                 *         Logarithmic with minor grid lines
                 * @sample {highcharts} highcharts/yaxis/type-log-negative/
                 *         Logarithmic with extension to emulate negative values
                 * @sample {gantt} gantt/treegrid-axis/demo
                 *         Treegrid axis
                 *
                 * @type      {Highcharts.AxisTypeValue}
                 * @default   {highcharts} linear
                 * @default   {gantt} treegrid
                 * @product   highcharts gantt
                 * @apioption yAxis.type
                 */
                /**
                 * The height of the Y axis. If it's a number, it is interpreted as
                 * pixels.
                 *
                 * Since Highcharts 2: If it's a percentage string, it is interpreted as
                 * percentages of the total plot height.
                 *
                 * @see [yAxis.top](#yAxis.top)
                 *
                 * @sample {highstock} stock/demo/candlestick-and-volume/
                 *         Percentage height panes
                 *
                 * @type      {number|string}
                 * @product   highcharts highstock
                 * @apioption yAxis.height
                 */
                /**
                 * Solid gauge only. Unless [stops](#yAxis.stops) are set, the color
                 * to represent the maximum value of the Y axis.
                 *
                 * @sample {highcharts} highcharts/yaxis/mincolor-maxcolor/
                 *         Min and max colors
                 *
                 * @type      {Highcharts.ColorType}
                 * @default   #003399
                 * @since     4.0
                 * @product   highcharts
                 * @apioption yAxis.maxColor
                 */
                /**
                 * Solid gauge only. Unless [stops](#yAxis.stops) are set, the color
                 * to represent the minimum value of the Y axis.
                 *
                 * @sample {highcharts} highcharts/yaxis/mincolor-maxcolor/
                 *         Min and max color
                 *
                 * @type      {Highcharts.ColorType}
                 * @default   #e6ebf5
                 * @since     4.0
                 * @product   highcharts
                 * @apioption yAxis.minColor
                 */
                /**
                 * Whether to reverse the axis so that the highest number is closest
                 * to the origin.
                 *
                 * @sample {highcharts} highcharts/yaxis/reversed/
                 *         Reversed Y axis
                 * @sample {highstock} stock/xaxis/reversed/
                 *         Reversed Y axis
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock} false
                 * @default   {highmaps} true
                 * @default   {gantt} true
                 * @apioption yAxis.reversed
                 */
                /**
                 * If `true`, the first series in a stack will be drawn on top in a
                 * positive, non-reversed Y axis. If `false`, the first series is in
                 * the base of the stack.
                 *
                 * @sample {highcharts} highcharts/yaxis/reversedstacks-false/
                 *         Non-reversed stacks
                 * @sample {highstock} highcharts/yaxis/reversedstacks-false/
                 *         Non-reversed stacks
                 *
                 * @type      {boolean}
                 * @default   true
                 * @since     3.0.10
                 * @product   highcharts highstock
                 * @apioption yAxis.reversedStacks
                 */
                reversedStacks: true,
                /**
                 * Solid gauge series only. Color stops for the solid gauge. Use this
                 * in cases where a linear gradient between a `minColor` and `maxColor`
                 * is not sufficient. The stops is an array of tuples, where the first
                 * item is a float between 0 and 1 assigning the relative position in
                 * the gradient, and the second item is the color.
                 *
                 * For solid gauges, the Y axis also inherits the concept of
                 * [data classes](https://api.highcharts.com/highmaps#colorAxis.dataClasses)
                 * from the Highmaps color axis.
                 *
                 * @sample {highcharts} highcharts/demo/gauge-solid/
                 *         Gauge with stops
                 *
                 * @see [minColor](#yAxis.minColor)
                 * @see [maxColor](#yAxis.maxColor)
                 *
                 * @type      {Array<Array<number,Highcharts.ColorType>>}
                 * @since     4.0
                 * @product   highcharts
                 * @apioption yAxis.stops
                 */
                /**
                 * The pixel width of the major tick marks.
                 *
                 * @sample {highcharts} highcharts/xaxis/tickwidth/ 10 px width
                 * @sample {highstock} stock/xaxis/ticks/ Formatted ticks on X axis
                 *
                 * @type      {number}
                 * @default   0
                 * @product   highcharts highstock gantt
                 * @apioption yAxis.tickWidth
                 */
                /**
                 * Whether to force the axis to end on a tick. Use this option with
                 * the `maxPadding` option to control the axis end.
                 *
                 * This option is always disabled, when panning type is
                 * either `y` or `xy`.
                 *
                 * @see [type](#chart.panning.type)
                 *
                 *
                 * @sample {highcharts} highcharts/yaxis/endontick/
                 *         True by default
                 * @sample {highcharts} highcharts/yaxis/endontick-false/
                 *         False
                 * @sample {highstock} stock/demo/basic-line/
                 *         True by default
                 * @sample {highstock} stock/xaxis/endontick/
                 *         False for Y axis
                 *
                 * @since 1.2.0
                 */
                endOnTick: true,
                /**
                 * Padding of the max value relative to the length of the axis. A
                 * padding of 0.05 will make a 100px axis 5px longer. This is useful
                 * when you don't want the highest data value to appear on the edge
                 * of the plot area. When the axis' `max` option is set or a max extreme
                 * is set using `axis.setExtremes()`, the maxPadding will be ignored.
                 *
                 * Also the `softThreshold` option takes precedence over `maxPadding`,
                 * so if the data is tangent to the threshold, `maxPadding` may not
                 * apply unless `softThreshold` is set to false.
                 *
                 * @sample {highcharts} highcharts/yaxis/maxpadding-02/
                 *         Max padding of 0.2
                 * @sample {highstock} stock/xaxis/minpadding-maxpadding/
                 *         Greater min- and maxPadding
                 *
                 * @since   1.2.0
                 * @product highcharts highstock gantt
                 */
                maxPadding: 0.05,
                /**
                 * Padding of the min value relative to the length of the axis. A
                 * padding of 0.05 will make a 100px axis 5px longer. This is useful
                 * when you don't want the lowest data value to appear on the edge
                 * of the plot area. When the axis' `min` option is set or a max extreme
                 * is set using `axis.setExtremes()`, the maxPadding will be ignored.
                 *
                 * Also the `softThreshold` option takes precedence over `minPadding`,
                 * so if the data is tangent to the threshold, `minPadding` may not
                 * apply unless `softThreshold` is set to false.
                 *
                 * @sample {highcharts} highcharts/yaxis/minpadding/
                 *         Min padding of 0.2
                 * @sample {highstock} stock/xaxis/minpadding-maxpadding/
                 *         Greater min- and maxPadding
                 *
                 * @since   1.2.0
                 * @product highcharts highstock gantt
                 */
                minPadding: 0.05,
                /**
                 * @productdesc {highstock}
                 * In Highcharts Stock 1.x, the Y axis was placed
                 * on the left side by default.
                 *
                 * @sample {highcharts} highcharts/yaxis/opposite/
                 *         Secondary Y axis opposite
                 * @sample {highstock} stock/xaxis/opposite/
                 *         Y axis on left side
                 *
                 * @type      {boolean}
                 * @default   {highstock} true
                 * @default   {highcharts} false
                 * @product   highstock highcharts gantt
                 * @apioption yAxis.opposite
                 */
                /**
                 * @see [tickInterval](#xAxis.tickInterval)
                 * @see [tickPositioner](#xAxis.tickPositioner)
                 * @see [tickPositions](#xAxis.tickPositions)
                 */
                tickPixelInterval: 72,
                /**
                 * Whether to show the last tick label.
                 *
                 * @productdesc {highcharts|gantt}
                 * Defaults to `true` on cartesian charts, and `false` on polar charts.
                 *
                 * @productdesc {highstock}
                 * Defaults to `true` for categorized yAxis and `false` for other types
                 * of yAxis.
                 *
                 * @default undefined
                 */
                showLastLabel: true,
                /**
                 * @extends xAxis.labels
                 */
                labels: {
                    /**
                     * The label's pixel distance from the perimeter of the plot area.
                     * On cartesian charts, this is overridden if the `labels.y` setting
                     * is set.
                     *
                     * On polar charts, if it's a percentage string, it is interpreted
                     * the same as [series.radius](#plotOptions.gauge.radius), so the
                     * label can be aligned under the gauge's shape.
                     *
                     * @sample {highcharts} highcharts/yaxis/labels-distance/
                     *         Polar chart, labels centered under the arc
                     *
                     * @type      {number|string}
                     * @product   highcharts
                     * @apioption yAxis.labels.distance
                     */
                    /**
                     * The y position offset of all labels relative to the tick
                     * positions on the axis. For polar and radial axis consider the use
                     * of the [distance](#yAxis.labels.distance) option.
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-x/
                     *         Y axis labels placed on grid lines
                     *
                     * @type      {number}
                     * @default   {highcharts} 3
                     * @default   {highstock} -2
                     * @default   {highmaps} 3
                     * @apioption yAxis.labels.y
                     */
                    /**
                     * What part of the string the given position is anchored to. Can
                     * be one of `"left"`, `"center"` or `"right"`. The exact position
                     * also depends on the `labels.x` setting.
                     *
                     * Angular gauges and solid gauges defaults to `"center"`.
                     * Solid gauges with two labels have additional option `"auto"`
                     * for automatic horizontal and vertical alignment.
                     *
                     * @sample {highcharts} highcharts/yaxis/labels-align-left/
                     *         Left
                     * @sample {highcharts} highcharts/series-solidgauge/labels-auto-aligned/
                     *         Solid gauge labels auto aligned
                     *
                     * @type       {Highcharts.AlignValue}
                     * @default    {highstock} right
                     * @apioption  yAxis.labels.align
                     */
                    /**
                     * The x position offset of all labels relative to the tick
                     * positions on the axis. Defaults to -15 for left axis, 15 for
                     * right axis.
                     *
                     * @sample {highcharts} highcharts/xaxis/labels-x/
                     *         Y axis labels placed on grid lines
                     *
                     * @type {number}
                     */
                    x: void 0
                },
                /**
                 * @sample {highcharts} highcharts/yaxis/max-200/
                 *         Y axis max of 200
                 * @sample {highcharts} highcharts/yaxis/max-logarithmic/
                 *         Y axis max on logarithmic axis
                 * @sample {highstock} stock/yaxis/min-max/
                 *         Fixed min and max on Y axis
                 *
                 * @apioption yAxis.max
                 */
                /**
                 * @sample {highcharts} highcharts/yaxis/min-startontick-false/
                 *         -50 with startOnTick to false
                 * @sample {highcharts} highcharts/yaxis/min-startontick-true/
                 *         -50 with startOnTick true by default
                 * @sample {highstock} stock/yaxis/min-max/
                 *         Fixed min and max on Y axis
                 *
                 * @apioption yAxis.min
                 */
                /**
                 * An optional scrollbar to display on the Y axis in response to
                 * limiting the minimum an maximum of the axis values.
                 *
                 * In styled mode, all the presentational options for the scrollbar
                 * are replaced by the classes `.highcharts-scrollbar-thumb`,
                 * `.highcharts-scrollbar-arrow`, `.highcharts-scrollbar-button`,
                 * `.highcharts-scrollbar-rifles` and `.highcharts-scrollbar-track`.
                 *
                 * @sample {highstock} stock/yaxis/scrollbar/
                 *         Scrollbar on the Y axis
                 *
                 * @extends   scrollbar
                 * @since     4.2.6
                 * @product   highstock
                 * @excluding height
                 * @apioption yAxis.scrollbar
                 */
                /**
                 * Enable the scrollbar on the Y axis.
                 *
                 * @sample {highstock} stock/yaxis/scrollbar/
                 *         Enabled on Y axis
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     4.2.6
                 * @product   highstock
                 * @apioption yAxis.scrollbar.enabled
                 */
                /**
                 * Pixel margin between the scrollbar and the axis elements.
                 *
                 * @type      {number}
                 * @default   10
                 * @since     4.2.6
                 * @product   highstock
                 * @apioption yAxis.scrollbar.margin
                 */
                /* eslint-disable highcharts/doclet-apioption-last */
                /**
                 * Defines the position of the scrollbar. By default, it is positioned
                 * on the opposite of the main axis (right side of the chart).
                 * However, in the case of RTL languages could be set to `false`
                 * which positions the scrollbar on the left.
                 *
                 * Works only for vertical axes.
                 * This means yAxis in a non-inverted chart and xAxis in the inverted.
                 *
                 * @sample stock/yaxis/scrollbar-opposite/
                 *         A scrollbar not on the opposite side
                 *
                 * @type      {boolean}
                 * @default   true
                 * @since 9.3.0
                 *
                 * @apioption yAxis.scrollbar.opposite
                 * @apioption xAxis.scrollbar.opposite
                 *
                 */
                /* eslint-enable highcharts/doclet-apioption-last */
                /**
                 * Whether to show the scrollbar when it is fully zoomed out at max
                 * range. Setting it to `false` on the Y axis makes the scrollbar stay
                 * hidden until the user zooms in, like common in browsers.
                 *
                 * @type      {boolean}
                 * @default   true
                 * @since     4.2.6
                 * @product   highstock
                 * @apioption yAxis.scrollbar.showFull
                 */
                /**
                 * The width of a vertical scrollbar or height of a horizontal
                 * scrollbar. Defaults to 20 on touch devices.
                 *
                 * @type      {number}
                 * @default   14
                 * @since     4.2.6
                 * @product   highstock
                 * @apioption yAxis.scrollbar.size
                 */
                /**
                 * Z index of the scrollbar elements.
                 *
                 * @type      {number}
                 * @default   3
                 * @since     4.2.6
                 * @product   highstock
                 * @apioption yAxis.scrollbar.zIndex
                 */
                /**
                 * A soft maximum for the axis. If the series data maximum is less
                 * than this, the axis will stay at this maximum, but if the series
                 * data maximum is higher, the axis will flex to show all data.
                 *
                 * **Note**: The [series.softThreshold](
                 * #plotOptions.series.softThreshold) option takes precedence over this
                 * option.
                 *
                 * @sample highcharts/yaxis/softmin-softmax/
                 *         Soft min and max
                 *
                 * @type      {number}
                 * @since     5.0.1
                 * @product   highcharts highstock gantt
                 * @apioption yAxis.softMax
                 */
                /**
                 * A soft minimum for the axis. If the series data minimum is greater
                 * than this, the axis will stay at this minimum, but if the series
                 * data minimum is lower, the axis will flex to show all data.
                 *
                 * **Note**: The [series.softThreshold](
                 * #plotOptions.series.softThreshold) option takes precedence over this
                 * option.
                 *
                 * @sample highcharts/yaxis/softmin-softmax/
                 *         Soft min and max
                 *
                 * @type      {number}
                 * @since     5.0.1
                 * @product   highcharts highstock gantt
                 * @apioption yAxis.softMin
                 */
                /**
                 * Defines the horizontal alignment of the stack total label. Can be one
                 * of `"left"`, `"center"` or `"right"`. The default value is calculated
                 * at runtime and depends on orientation and whether the stack is
                 * positive or negative.
                 *
                 * @sample {highcharts} highcharts/yaxis/stacklabels-align-left/
                 *         Aligned to the left
                 * @sample {highcharts} highcharts/yaxis/stacklabels-align-center/
                 *         Aligned in center
                 * @sample {highcharts} highcharts/yaxis/stacklabels-align-right/
                 *         Aligned to the right
                 *
                 * @type      {Highcharts.AlignValue}
                 * @since     2.1.5
                 * @product   highcharts
                 * @apioption yAxis.stackLabels.align
                 */
                /**
                 * A format string for the data label. Available variables are the same
                 * as for `formatter`.
                 *
                 * @type      {string}
                 * @default   {total}
                 * @since     3.0.2
                 * @product   highcharts highstock
                 * @apioption yAxis.stackLabels.format
                 */
                /**
                 * Rotation of the labels in degrees.
                 *
                 * @sample {highcharts} highcharts/yaxis/stacklabels-rotation/
                 *         Labels rotated 45°
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.1.5
                 * @product   highcharts
                 * @apioption yAxis.stackLabels.rotation
                 */
                /**
                 * The text alignment for the label. While `align` determines where the
                 * texts anchor point is placed with regards to the stack, `textAlign`
                 * determines how the text is aligned against its anchor point. Possible
                 * values are `"left"`, `"center"` and `"right"`. The default value is
                 * calculated at runtime and depends on orientation and whether the
                 * stack is positive or negative.
                 *
                 * @sample {highcharts} highcharts/yaxis/stacklabels-textalign-left/
                 *         Label in center position but text-aligned left
                 *
                 * @type      {Highcharts.AlignValue}
                 * @since     2.1.5
                 * @product   highcharts
                 * @apioption yAxis.stackLabels.textAlign
                 */
                /**
                 * Whether to [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the labels.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     3.0
                 * @product   highcharts highstock
                 * @apioption yAxis.stackLabels.useHTML
                 */
                /**
                 * Defines the vertical alignment of the stack total label. Can be one
                 * of `"top"`, `"middle"` or `"bottom"`. The default value is calculated
                 * at runtime and depends on orientation and whether the stack is
                 * positive or negative.
                 *
                 * @sample {highcharts} highcharts/yaxis/stacklabels-verticalalign-top/
                 *         Vertically aligned top
                 * @sample {highcharts} highcharts/yaxis/stacklabels-verticalalign-middle/
                 *         Vertically aligned middle
                 * @sample {highcharts} highcharts/yaxis/stacklabels-verticalalign-bottom/
                 *         Vertically aligned bottom
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 * @since     2.1.5
                 * @product   highcharts
                 * @apioption yAxis.stackLabels.verticalAlign
                 */
                /**
                 * The x position offset of the label relative to the left of the
                 * stacked bar. The default value is calculated at runtime and depends
                 * on orientation and whether the stack is positive or negative.
                 *
                 * @sample {highcharts} highcharts/yaxis/stacklabels-x/
                 *         Stack total labels with x offset
                 *
                 * @type      {number}
                 * @since     2.1.5
                 * @product   highcharts
                 * @apioption yAxis.stackLabels.x
                 */
                /**
                 * The y position offset of the label relative to the tick position
                 * on the axis. The default value is calculated at runtime and depends
                 * on orientation and whether the stack is positive or negative.
                 *
                 * @sample {highcharts} highcharts/yaxis/stacklabels-y/
                 *         Stack total labels with y offset
                 *
                 * @type      {number}
                 * @since     2.1.5
                 * @product   highcharts
                 * @apioption yAxis.stackLabels.y
                 */
                /**
                 * Whether to force the axis to start on a tick. Use this option with
                 * the `maxPadding` option to control the axis start.
                 *
                 * This option is always disabled, when panning type is
                 * either `y` or `xy`.
                 *
                 * @see [type](#chart.panning.type)
                 *
                 * @sample {highcharts} highcharts/xaxis/startontick-false/
                 *         False by default
                 * @sample {highcharts} highcharts/xaxis/startontick-true/
                 *         True
                 * @sample {highstock} stock/xaxis/endontick/
                 *         False for Y axis
                 *
                 * @since   1.2.0
                 * @product highcharts highstock gantt
                 */
                startOnTick: true,
                title: {
                    /**
                     * The pixel distance between the axis labels and the title.
                     * Positive values are outside the axis line, negative are inside.
                     *
                     * @sample {highcharts} highcharts/xaxis/title-margin/
                     *         Y axis title margin of 60
                     *
                     * @type      {number}
                     * @default   40
                     * @apioption yAxis.title.margin
                     */
                    /**
                     * The rotation of the text in degrees. 0 is horizontal, 270 is
                     * vertical reading from bottom to top.
                     *
                     * @sample {highcharts} highcharts/yaxis/title-offset/
                     *         Horizontal
                     */
                    rotation: 270,
                    /**
                     * The actual text of the axis title. Horizontal texts can contain
                     * HTML, but rotated texts are painted using vector techniques and
                     * must be clean text. The Y axis title is disabled by setting the
                     * `text` option to `undefined`.
                     *
                     * @sample {highcharts} highcharts/xaxis/title-text/
                     *         Custom HTML
                     *
                     * @type    {string|null}
                     * @default {highcharts} Values
                     * @default {highstock} undefined
                     * @product highcharts highstock gantt
                     */
                    text: 'Values'
                },
                /**
                 * The top position of the Y axis. If it's a number, it is interpreted
                 * as pixel position relative to the chart.
                 *
                 * Since Highcharts 2: If it's a percentage string, it is interpreted as
                 * percentages of the plot height, offset from plot area top.
                 *
                 * @see [yAxis.height](#yAxis.height)
                 *
                 * @sample {highstock} stock/demo/candlestick-and-volume/
                 *         Percentage height panes
                 *
                 * @type      {number|string}
                 * @product   highcharts highstock
                 * @apioption yAxis.top
                 */
                /**
                 * The stack labels show the total value for each bar in a stacked
                 * column or bar chart. The label will be placed on top of positive
                 * columns and below negative columns. In case of an inverted column
                 * chart or a bar chart the label is placed to the right of positive
                 * bars and to the left of negative bars.
                 *
                 * @product highcharts
                 */
                stackLabels: {
                    /**
                     * Enable or disable the initial animation when a series is
                     * displayed for the `stackLabels`. The animation can also be set as
                     * a configuration object. Please note that this option only
                     * applies to the initial animation.
                     * For other animations, see [chart.animation](#chart.animation)
                     * and the animation parameter under the API methods.
                     * The following properties are supported:
                     *
                     * - `defer`: The animation delay time in milliseconds.
                     *
                     * @sample {highcharts} highcharts/plotoptions/animation-defer/
                     *          Animation defer settings
                     * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
                     * @since 8.2.0
                     * @apioption yAxis.stackLabels.animation
                     */
                    animation: {},
                    /**
                     * The animation delay time in milliseconds.
                     * Set to `0` renders stackLabel immediately.
                     * As `undefined` inherits defer time from the [series.animation.defer](#plotOptions.series.animation.defer).
                     *
                     * @type      {number}
                     * @since 8.2.0
                     * @apioption yAxis.stackLabels.animation.defer
                     */
                    /**
                     * Allow the stack labels to overlap.
                     *
                     * @sample {highcharts} highcharts/yaxis/stacklabels-allowoverlap-false/
                     *         Default false
                     *
                     * @since   5.0.13
                     * @product highcharts
                     */
                    allowOverlap: false,
                    /**
                     * The background color or gradient for the stack label.
                     *
                     * @sample {highcharts} highcharts/yaxis/stacklabels-box/
                     *          Stack labels box options
                     * @type      {Highcharts.ColorType}
                     * @since 8.1.0
                     * @apioption yAxis.stackLabels.backgroundColor
                     */
                    /**
                     * The border color for the stack label. Defaults to `undefined`.
                     *
                     * @sample {highcharts} highcharts/yaxis/stacklabels-box/
                     *          Stack labels box options
                     * @type      {Highcharts.ColorType}
                     * @since 8.1.0
                     * @apioption yAxis.stackLabels.borderColor
                     */
                    /**
                     * The border radius in pixels for the stack label.
                     *
                     * @sample {highcharts} highcharts/yaxis/stacklabels-box/
                     *          Stack labels box options
                     * @type      {number}
                     * @default   0
                     * @since 8.1.0
                     * @apioption yAxis.stackLabels.borderRadius
                     */
                    /**
                     * The border width in pixels for the stack label.
                     *
                     * @sample {highcharts} highcharts/yaxis/stacklabels-box/
                     *          Stack labels box options
                     * @type      {number}
                     * @default   0
                     * @since 8.1.0
                     * @apioption yAxis.stackLabels.borderWidth
                     */
                    /**
                     * Enable or disable the stack total labels.
                     *
                     * @sample {highcharts} highcharts/yaxis/stacklabels-enabled/
                     *         Enabled stack total labels
                     * @sample {highcharts} highcharts/yaxis/stacklabels-enabled-waterfall/
                     *         Enabled stack labels in waterfall chart
                     *
                     * @since   2.1.5
                     * @product highcharts
                     */
                    enabled: false,
                    /**
                     * Whether to hide stack labels that are outside the plot area.
                     * By default, the stack label is moved
                     * inside the plot area according to the
                     * [overflow](/highcharts/#yAxis/stackLabels/overflow)
                     * option.
                     *
                     * @type  {boolean}
                     * @since 7.1.3
                     */
                    crop: true,
                    /**
                     * How to handle stack total labels that flow outside the plot area.
                     * The default is set to `"justify"`,
                     * which aligns them inside the plot area.
                     * For columns and bars, this means it will be moved inside the bar.
                     * To display stack labels outside the plot area,
                     * set `crop` to `false` and `overflow` to `"allow"`.
                     *
                     * @sample highcharts/yaxis/stacklabels-overflow/
                     *         Stack labels flows outside the plot area.
                     *
                     * @type  {Highcharts.DataLabelsOverflowValue}
                     * @since 7.1.3
                     */
                    overflow: 'justify',
                    /* eslint-disable valid-jsdoc */
                    /**
                     * Callback JavaScript function to format the label. The value is
                     * given by `this.total`.
                     *
                     * @sample {highcharts} highcharts/yaxis/stacklabels-formatter/
                     *         Added units to stack total value
                     *
                     * @type    {Highcharts.FormatterCallbackFunction<Highcharts.StackItemObject>}
                     * @since   2.1.5
                     * @product highcharts
                     */
                    formatter: function () {
                        var numberFormatter = this.axis.chart.numberFormatter;
                        /* eslint-enable valid-jsdoc */
                        return numberFormatter(this.total || 0, -1);
                    },
                    /**
                     * CSS styles for the label.
                     *
                     * In styled mode, the styles are set in the
                     * `.highcharts-stack-label` class.
                     *
                     * @sample {highcharts} highcharts/yaxis/stacklabels-style/
                     *         Red stack total labels
                     *
                     * @type    {Highcharts.CSSObject}
                     * @since   2.1.5
                     * @product highcharts
                     */
                    style: {
                        /** @internal */
                        color: "#000000" /* Palette.neutralColor100 */,
                        /** @internal */
                        fontSize: '0.7em',
                        /** @internal */
                        fontWeight: 'bold',
                        /** @internal */
                        textOutline: '1px contrast'
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
                // tickWidth: 0
            };
            /**
             * The Z axis or depth axis for 3D plots.
             *
             * See the [Axis class](/class-reference/Highcharts.Axis) for programmatic
             * access to the axis.
             *
             * @sample {highcharts} highcharts/3d/scatter-zaxis-categories/
             *         Z-Axis with Categories
             * @sample {highcharts} highcharts/3d/scatter-zaxis-grid/
             *         Z-Axis with styling
             *
             * @type      {*|Array<*>}
             * @extends   xAxis
             * @since     5.0.0
             * @product   highcharts
             * @excluding breaks, crosshair, height, left, lineColor, lineWidth,
             *            nameToX, showEmpty, top, width
             * @apioption zAxis
             */
            // This variable extends the defaultOptions for left axes.
            AxisDefaults.defaultLeftAxisOptions = {
                title: {
                    rotation: 270
                }
            };
            // This variable extends the defaultOptions for right axes.
            AxisDefaults.defaultRightAxisOptions = {
                title: {
                    rotation: 90
                }
            };
            // This variable extends the defaultOptions for bottom axes.
            AxisDefaults.defaultBottomAxisOptions = {
                labels: {
                    autoRotation: [-45]
                    // overflow: undefined,
                    // staggerLines: null
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            };
            // This variable extends the defaultOptions for top axes.
            AxisDefaults.defaultTopAxisOptions = {
                labels: {
                    autoRotation: [-45]
                    // overflow: undefined
                    // staggerLines: null
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            };
        })(AxisDefaults || (AxisDefaults = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return AxisDefaults;
    });
    _registerModule(_modules, 'Core/Foundation.js', [_modules['Core/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent, isFunction = U.isFunction, objectEach = U.objectEach, removeEvent = U.removeEvent;
        /* *
         *
         *  Class Namespace
         *
         * */
        var Foundation;
        (function (Foundation) {
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * Register event options. If an event handler is set on the options, it
             * should be subject to Chart.update, Axis.update and Series.update. This is
             * contrary to general handlers that are set directly using addEvent either
             * on the class or on the instance. #6538, #6943, #10861.
             * @private
             */
            function registerEventOptions(component, options) {
                // A lookup over those events that are added by _options_ (not
                // programmatically). These are updated through .update()
                component.eventOptions = component.eventOptions || {};
                // Register event listeners
                objectEach(options.events, function (event, eventType) {
                    // If event does not exist, or is changed by the .update()
                    // function
                    if (component.eventOptions[eventType] !== event) {
                        // Remove existing if set by option
                        if (component.eventOptions[eventType]) {
                            removeEvent(component, eventType, component.eventOptions[eventType]);
                            delete component.eventOptions[eventType];
                        }
                        if (isFunction(event)) {
                            component.eventOptions[eventType] = event;
                            addEvent(component, eventType, event, {
                                order: 0 // #14080 fire those events as firsts
                            });
                        }
                    }
                });
            }
            Foundation.registerEventOptions = registerEventOptions;
        })(Foundation || (Foundation = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return Foundation;
    });
    _registerModule(_modules, 'Core/Axis/Tick.js', [_modules['Core/Templating.js'], _modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (F, H, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var deg2rad = H.deg2rad;
        var clamp = U.clamp, correctFloat = U.correctFloat, defined = U.defined, destroyObjectProperties = U.destroyObjectProperties, extend = U.extend, fireEvent = U.fireEvent, isNumber = U.isNumber, merge = U.merge, objectEach = U.objectEach, pick = U.pick;
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The Tick class.
         *
         * @class
         * @name Highcharts.Tick
         *
         * @param {Highcharts.Axis} axis
         * The axis of the tick.
         *
         * @param {number} pos
         * The position of the tick on the axis in terms of axis values.
         *
         * @param {string} [type]
         * The type of tick, either 'minor' or an empty string
         *
         * @param {boolean} [noLabel=false]
         * Whether to disable the label or not. Defaults to false.
         *
         * @param {Object} [parameters]
         * Optional parameters for the tick.
         */
        var Tick = /** @class */ (function () {
            /* *
             *
             *  Constructors
             *
             * */
            function Tick(axis, pos, type, noLabel, parameters) {
                this.isNew = true;
                this.isNewLabel = true;
                /**
                 * The related axis of the tick.
                 * @name Highcharts.Tick#axis
                 * @type {Highcharts.Axis}
                 */
                this.axis = axis;
                /**
                 * The logical position of the tick on the axis in terms of axis values.
                 * @name Highcharts.Tick#pos
                 * @type {number}
                 */
                this.pos = pos;
                /**
                 * The tick type, which can be `"minor"`, or an empty string.
                 * @name Highcharts.Tick#type
                 * @type {string}
                 */
                this.type = type || '';
                this.parameters = parameters || {};
                /**
                 * The mark offset of the tick on the axis. Usually `undefined`, numeric
                 * for grid axes.
                 * @name Highcharts.Tick#tickmarkOffset
                 * @type {number|undefined}
                 */
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options = this.parameters.options;
                fireEvent(this, 'init');
                if (!type && !noLabel) {
                    this.addLabel();
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Write the tick label.
             *
             * @private
             * @function Highcharts.Tick#addLabel
             */
            Tick.prototype.addLabel = function () {
                var tick = this, axis = tick.axis, options = axis.options, chart = axis.chart, categories = axis.categories, log = axis.logarithmic, names = axis.names, pos = tick.pos, labelOptions = pick(tick.options && tick.options.labels, options.labels), tickPositions = axis.tickPositions, isFirst = pos === tickPositions[0], isLast = pos === tickPositions[tickPositions.length - 1], animateLabels = (!labelOptions.step || labelOptions.step === 1) &&
                    axis.tickInterval === 1, tickPositionInfo = tickPositions.info;
                var label = tick.label, dateTimeLabelFormat, dateTimeLabelFormats, i;
                // The context value
                var value = this.parameters.category || (categories ?
                    pick(categories[pos], names[pos], pos) :
                    pos);
                if (log && isNumber(value)) {
                    value = correctFloat(log.lin2log(value));
                }
                // Set the datetime label format. If a higher rank is set for this
                // position, use that. If not, use the general format.
                if (axis.dateTime) {
                    if (tickPositionInfo) {
                        dateTimeLabelFormats = chart.time.resolveDTLFormat(options.dateTimeLabelFormats[(!options.grid &&
                            tickPositionInfo.higherRanks[pos]) ||
                            tickPositionInfo.unitName]);
                        dateTimeLabelFormat = dateTimeLabelFormats.main;
                    }
                    else if (isNumber(value)) { // #1441
                        dateTimeLabelFormat = axis.dateTime.getXDateFormat(value, options.dateTimeLabelFormats ||
                            {});
                    }
                }
                // set properties for access in render method
                /**
                 * True if the tick is the first one on the axis.
                 * @name Highcharts.Tick#isFirst
                 * @readonly
                 * @type {boolean|undefined}
                 */
                tick.isFirst = isFirst;
                /**
                 * True if the tick is the last one on the axis.
                 * @name Highcharts.Tick#isLast
                 * @readonly
                 * @type {boolean|undefined}
                 */
                tick.isLast = isLast;
                // Get the string
                var ctx = {
                    axis: axis,
                    chart: chart,
                    dateTimeLabelFormat: dateTimeLabelFormat,
                    isFirst: isFirst,
                    isLast: isLast,
                    pos: pos,
                    tick: tick,
                    tickPositionInfo: tickPositionInfo,
                    value: value
                };
                // Fire an event that allows modifying the context for use in
                // `labels.format` and `labels.formatter`.
                fireEvent(this, 'labelFormat', ctx);
                // Label formatting. When `labels.format` is given, we first run the
                // defaultFormatter and append the result to the context as `text`.
                // Handy for adding prefix or suffix while keeping default number
                // formatting.
                var labelFormatter = function (ctx) {
                    if (labelOptions.formatter) {
                        return labelOptions.formatter.call(ctx, ctx);
                    }
                    if (labelOptions.format) {
                        ctx.text = axis.defaultLabelFormatter.call(ctx, ctx);
                        return F.format(labelOptions.format, ctx, chart);
                    }
                    return axis.defaultLabelFormatter.call(ctx, ctx);
                };
                var str = labelFormatter.call(ctx, ctx);
                // Set up conditional formatting based on the format list if existing.
                var list = dateTimeLabelFormats && dateTimeLabelFormats.list;
                if (list) {
                    tick.shortenLabel = function () {
                        for (i = 0; i < list.length; i++) {
                            extend(ctx, { dateTimeLabelFormat: list[i] });
                            label.attr({
                                text: labelFormatter.call(ctx, ctx)
                            });
                            if (label.getBBox().width <
                                axis.getSlotWidth(tick) - 2 *
                                    labelOptions.padding) {
                                return;
                            }
                        }
                        label.attr({
                            text: ''
                        });
                    };
                }
                else {
                    // #15692
                    tick.shortenLabel = void 0;
                }
                // Call only after first render
                if (animateLabels && axis._addedPlotLB) {
                    tick.moveLabel(str, labelOptions);
                }
                // First call
                if (!defined(label) && !tick.movedLabel) {
                    /**
                     * The rendered text label of the tick.
                     * @name Highcharts.Tick#label
                     * @type {Highcharts.SVGElement|undefined}
                     */
                    tick.label = label = tick.createLabel({ x: 0, y: 0 }, str, labelOptions);
                    // Base value to detect change for new calls to getBBox
                    tick.rotation = 0;
                    // update
                }
                else if (label && label.textStr !== str && !animateLabels) {
                    // When resetting text, also reset the width if dynamically set
                    // (#8809)
                    if (label.textWidth &&
                        !labelOptions.style.width &&
                        !label.styles.width) {
                        label.css({ width: null });
                    }
                    label.attr({ text: str });
                    label.textPxLength = label.getBBox().width;
                }
            };
            /**
             * Render and return the label of the tick.
             *
             * @private
             * @function Highcharts.Tick#createLabel
             */
            Tick.prototype.createLabel = function (xy, str, labelOptions) {
                var axis = this.axis, chart = axis.chart, label = defined(str) && labelOptions.enabled ?
                    chart.renderer
                        .text(str, xy.x, xy.y, labelOptions.useHTML)
                        .add(axis.labelGroup) :
                    null;
                // Un-rotated length
                if (label) {
                    // Without position absolute, IE export sometimes is wrong
                    if (!chart.styledMode) {
                        label.css(merge(labelOptions.style));
                    }
                    label.textPxLength = label.getBBox().width;
                }
                return label;
            };
            /**
             * Destructor for the tick prototype
             *
             * @private
             * @function Highcharts.Tick#destroy
             */
            Tick.prototype.destroy = function () {
                destroyObjectProperties(this, this.axis);
            };
            /**
             * Gets the x and y positions for ticks in terms of pixels.
             *
             * @private
             * @function Highcharts.Tick#getPosition
             *
             * @param {boolean} horiz
             * Whether the tick is on an horizontal axis or not.
             *
             * @param {number} tickPos
             * Position of the tick.
             *
             * @param {number} tickmarkOffset
             * Tickmark offset for all ticks.
             *
             * @param {boolean} [old]
             * Whether the axis has changed or not.
             *
             * @return {Highcharts.PositionObject}
             * The tick position.
             *
             * @emits Highcharts.Tick#event:afterGetPosition
             */
            Tick.prototype.getPosition = function (horiz, tickPos, tickmarkOffset, old) {
                var axis = this.axis, chart = axis.chart, cHeight = (old && chart.oldChartHeight) || chart.chartHeight, pos = {
                    x: horiz ?
                        correctFloat(axis.translate(tickPos + tickmarkOffset, void 0, void 0, old) +
                            axis.transB) :
                        (axis.left +
                            axis.offset +
                            (axis.opposite ?
                                (((old && chart.oldChartWidth) ||
                                    chart.chartWidth) -
                                    axis.right -
                                    axis.left) :
                                0)),
                    y: horiz ?
                        (cHeight -
                            axis.bottom +
                            axis.offset -
                            (axis.opposite ? axis.height : 0)) :
                        correctFloat(cHeight -
                            axis.translate(tickPos + tickmarkOffset, void 0, void 0, old) -
                            axis.transB)
                };
                // Chrome workaround for #10516
                pos.y = clamp(pos.y, -1e5, 1e5);
                fireEvent(this, 'afterGetPosition', { pos: pos });
                return pos;
            };
            /**
             * Get the x, y position of the tick label
             * @private
             */
            Tick.prototype.getLabelPosition = function (x, y, label, horiz, labelOptions, tickmarkOffset, index, step) {
                var axis = this.axis, transA = axis.transA, reversed = ( // #7911
                axis.isLinked && axis.linkedParent ?
                    axis.linkedParent.reversed :
                    axis.reversed), staggerLines = axis.staggerLines, rotCorr = axis.tickRotCorr || { x: 0, y: 0 }, 
                // Adjust for label alignment if we use reserveSpace: true (#5286)
                labelOffsetCorrection = (!horiz && !axis.reserveSpaceDefault ?
                    -axis.labelOffset * (axis.labelAlign === 'center' ? 0.5 : 1) :
                    0), distance = labelOptions.distance, pos = {};
                var yOffset, line;
                if (axis.side === 0) {
                    yOffset = label.rotation ? -distance : -label.getBBox().height;
                }
                else if (axis.side === 2) {
                    yOffset = rotCorr.y + distance;
                }
                else {
                    // #3140, #3140
                    yOffset = Math.cos(label.rotation * deg2rad) *
                        (rotCorr.y - label.getBBox(false, 0).height / 2);
                }
                if (defined(labelOptions.y)) {
                    yOffset = axis.side === 0 && axis.horiz ?
                        labelOptions.y + yOffset :
                        labelOptions.y;
                }
                x = x +
                    pick(labelOptions.x, [0, 1, 0, -1][axis.side] * distance) +
                    labelOffsetCorrection +
                    rotCorr.x -
                    (tickmarkOffset && horiz ?
                        tickmarkOffset * transA * (reversed ? -1 : 1) :
                        0);
                y = y + yOffset - (tickmarkOffset && !horiz ?
                    tickmarkOffset * transA * (reversed ? 1 : -1) : 0);
                // Correct for staggered labels
                if (staggerLines) {
                    line = (index / (step || 1) % staggerLines);
                    if (axis.opposite) {
                        line = staggerLines - line - 1;
                    }
                    y += line * (axis.labelOffset / staggerLines);
                }
                pos.x = x;
                pos.y = Math.round(y);
                fireEvent(this, 'afterGetLabelPosition', { pos: pos, tickmarkOffset: tickmarkOffset, index: index });
                return pos;
            };
            /**
             * Get the offset height or width of the label
             *
             * @private
             * @function Highcharts.Tick#getLabelSize
             */
            Tick.prototype.getLabelSize = function () {
                return this.label ?
                    this.label.getBBox()[this.axis.horiz ? 'height' : 'width'] :
                    0;
            };
            /**
             * Extendible method to return the path of the marker
             * @private
             */
            Tick.prototype.getMarkPath = function (x, y, tickLength, tickWidth, horiz, renderer) {
                return renderer.crispLine([[
                        'M',
                        x,
                        y
                    ], [
                        'L',
                        x + (horiz ? 0 : -tickLength),
                        y + (horiz ? tickLength : 0)
                    ]], tickWidth);
            };
            /**
             * Handle the label overflow by adjusting the labels to the left and right
             * edge, or hide them if they collide into the neighbour label.
             *
             * @private
             * @function Highcharts.Tick#handleOverflow
             */
            Tick.prototype.handleOverflow = function (xy) {
                var tick = this, axis = this.axis, labelOptions = axis.options.labels, pxPos = xy.x, chartWidth = axis.chart.chartWidth, spacing = axis.chart.spacing, leftBound = pick(axis.labelLeft, Math.min(axis.pos, spacing[3])), rightBound = pick(axis.labelRight, Math.max(!axis.isRadial ? axis.pos + axis.len : 0, chartWidth - spacing[1])), label = this.label, rotation = this.rotation, factor = {
                    left: 0,
                    center: 0.5,
                    right: 1
                }[axis.labelAlign || label.attr('align')], labelWidth = label.getBBox().width, slotWidth = axis.getSlotWidth(tick), xCorrection = factor, css = {};
                var modifiedSlotWidth = slotWidth, goRight = 1, leftPos, rightPos, textWidth;
                // Check if the label overshoots the chart spacing box. If it does, move
                // it. If it now overshoots the slotWidth, add ellipsis.
                if (!rotation && labelOptions.overflow === 'justify') {
                    leftPos = pxPos - factor * labelWidth;
                    rightPos = pxPos + (1 - factor) * labelWidth;
                    if (leftPos < leftBound) {
                        modifiedSlotWidth =
                            xy.x + modifiedSlotWidth * (1 - factor) - leftBound;
                    }
                    else if (rightPos > rightBound) {
                        modifiedSlotWidth =
                            rightBound - xy.x + modifiedSlotWidth * factor;
                        goRight = -1;
                    }
                    modifiedSlotWidth = Math.min(slotWidth, modifiedSlotWidth); // #4177
                    if (modifiedSlotWidth < slotWidth && axis.labelAlign === 'center') {
                        xy.x += (goRight *
                            (slotWidth -
                                modifiedSlotWidth -
                                xCorrection * (slotWidth - Math.min(labelWidth, modifiedSlotWidth))));
                    }
                    // If the label width exceeds the available space, set a text width
                    // to be picked up below. Also, if a width has been set before, we
                    // need to set a new one because the reported labelWidth will be
                    // limited by the box (#3938).
                    if (labelWidth > modifiedSlotWidth ||
                        (axis.autoRotation && (label.styles || {}).width)) {
                        textWidth = modifiedSlotWidth;
                    }
                    // Add ellipsis to prevent rotated labels to be clipped against the edge
                    // of the chart
                }
                else if (rotation < 0 &&
                    pxPos - factor * labelWidth < leftBound) {
                    textWidth = Math.round(pxPos / Math.cos(rotation * deg2rad) - leftBound);
                }
                else if (rotation > 0 &&
                    pxPos + factor * labelWidth > rightBound) {
                    textWidth = Math.round((chartWidth - pxPos) /
                        Math.cos(rotation * deg2rad));
                }
                if (textWidth) {
                    if (tick.shortenLabel) {
                        tick.shortenLabel();
                    }
                    else {
                        css.width = Math.floor(textWidth) + 'px';
                        if (!(labelOptions.style || {}).textOverflow) {
                            css.textOverflow = 'ellipsis';
                        }
                        label.css(css);
                    }
                }
            };
            /**
             * Try to replace the label if the same one already exists.
             *
             * @private
             * @function Highcharts.Tick#moveLabel
             */
            Tick.prototype.moveLabel = function (str, labelOptions) {
                var tick = this, label = tick.label, axis = tick.axis;
                var moved = false, labelPos;
                if (label && label.textStr === str) {
                    tick.movedLabel = label;
                    moved = true;
                    delete tick.label;
                }
                else { // Find a label with the same string
                    objectEach(axis.ticks, function (currentTick) {
                        if (!moved &&
                            !currentTick.isNew &&
                            currentTick !== tick &&
                            currentTick.label &&
                            currentTick.label.textStr === str) {
                            tick.movedLabel = currentTick.label;
                            moved = true;
                            currentTick.labelPos = tick.movedLabel.xy;
                            delete currentTick.label;
                        }
                    });
                }
                // Create new label if the actual one is moved
                if (!moved && (tick.labelPos || label)) {
                    labelPos = tick.labelPos || label.xy;
                    tick.movedLabel = tick.createLabel(labelPos, str, labelOptions);
                    if (tick.movedLabel) {
                        tick.movedLabel.attr({ opacity: 0 });
                    }
                }
            };
            /**
             * Put everything in place
             *
             * @private
             * @param {number} index
             *
             * @param {boolean} [old]
             * Use old coordinates to prepare an animation into new position
             *
             * @param {number} [opacity]
             */
            Tick.prototype.render = function (index, old, opacity) {
                var tick = this, axis = tick.axis, horiz = axis.horiz, pos = tick.pos, tickmarkOffset = pick(tick.tickmarkOffset, axis.tickmarkOffset), xy = tick.getPosition(horiz, pos, tickmarkOffset, old), x = xy.x, y = xy.y, reverseCrisp = ((horiz && x === axis.pos + axis.len) ||
                    (!horiz && y === axis.pos)) ? -1 : 1; // #1480, #1687
                var labelOpacity = pick(opacity, tick.label && tick.label.newOpacity, // #15528
                1);
                opacity = pick(opacity, 1);
                this.isActive = true;
                // Create the grid line
                this.renderGridLine(old, opacity, reverseCrisp);
                // create the tick mark
                this.renderMark(xy, opacity, reverseCrisp);
                // the label is created on init - now move it into place
                this.renderLabel(xy, old, labelOpacity, index);
                tick.isNew = false;
                fireEvent(this, 'afterRender');
            };
            /**
             * Renders the gridLine.
             *
             * @private
             * @function Highcharts.Tick#renderGridLine
             * @param {boolean} old  Whether or not the tick is old
             * @param {number} opacity  The opacity of the grid line
             * @param {number} reverseCrisp  Modifier for avoiding overlapping 1 or -1
             */
            Tick.prototype.renderGridLine = function (old, opacity, reverseCrisp) {
                var tick = this, axis = tick.axis, options = axis.options, attribs = {}, pos = tick.pos, type = tick.type, tickmarkOffset = pick(tick.tickmarkOffset, axis.tickmarkOffset), renderer = axis.chart.renderer;
                var gridLine = tick.gridLine, gridLinePath, gridLineWidth = options.gridLineWidth, gridLineColor = options.gridLineColor, dashStyle = options.gridLineDashStyle;
                if (tick.type === 'minor') {
                    gridLineWidth = options.minorGridLineWidth;
                    gridLineColor = options.minorGridLineColor;
                    dashStyle = options.minorGridLineDashStyle;
                }
                if (!gridLine) {
                    if (!axis.chart.styledMode) {
                        attribs.stroke = gridLineColor;
                        attribs['stroke-width'] = gridLineWidth || 0;
                        attribs.dashstyle = dashStyle;
                    }
                    if (!type) {
                        attribs.zIndex = 1;
                    }
                    if (old) {
                        opacity = 0;
                    }
                    /**
                     * The rendered grid line of the tick.
                     * @name Highcharts.Tick#gridLine
                     * @type {Highcharts.SVGElement|undefined}
                     */
                    tick.gridLine = gridLine = renderer.path()
                        .attr(attribs)
                        .addClass('highcharts-' + (type ? type + '-' : '') + 'grid-line')
                        .add(axis.gridGroup);
                }
                if (gridLine) {
                    gridLinePath = axis.getPlotLinePath({
                        value: pos + tickmarkOffset,
                        lineWidth: gridLine.strokeWidth() * reverseCrisp,
                        force: 'pass',
                        old: old,
                        acrossPanes: false // #18025
                    });
                    // If the parameter 'old' is set, the current call will be followed
                    // by another call, therefore do not do any animations this time
                    if (gridLinePath) {
                        gridLine[old || tick.isNew ? 'attr' : 'animate']({
                            d: gridLinePath,
                            opacity: opacity
                        });
                    }
                }
            };
            /**
             * Renders the tick mark.
             *
             * @private
             * @function Highcharts.Tick#renderMark
             * @param {Highcharts.PositionObject} xy  The position vector of the mark
             * @param {number} opacity  The opacity of the mark
             * @param {number} reverseCrisp  Modifier for avoiding overlapping 1 or -1
             */
            Tick.prototype.renderMark = function (xy, opacity, reverseCrisp) {
                var tick = this, axis = tick.axis, options = axis.options, renderer = axis.chart.renderer, type = tick.type, tickSize = axis.tickSize(type ? type + 'Tick' : 'tick'), x = xy.x, y = xy.y, tickWidth = pick(options[type !== 'minor' ? 'tickWidth' : 'minorTickWidth'], !type && axis.isXAxis ? 1 : 0), // X axis defaults to 1
                tickColor = options[type !== 'minor' ? 'tickColor' : 'minorTickColor'];
                var mark = tick.mark;
                var isNewMark = !mark;
                if (tickSize) {
                    // negate the length
                    if (axis.opposite) {
                        tickSize[0] = -tickSize[0];
                    }
                    // First time, create it
                    if (!mark) {
                        /**
                         * The rendered mark of the tick.
                         * @name Highcharts.Tick#mark
                         * @type {Highcharts.SVGElement|undefined}
                         */
                        tick.mark = mark = renderer.path()
                            .addClass('highcharts-' + (type ? type + '-' : '') + 'tick')
                            .add(axis.axisGroup);
                        if (!axis.chart.styledMode) {
                            mark.attr({
                                stroke: tickColor,
                                'stroke-width': tickWidth
                            });
                        }
                    }
                    mark[isNewMark ? 'attr' : 'animate']({
                        d: tick.getMarkPath(x, y, tickSize[0], mark.strokeWidth() * reverseCrisp, axis.horiz, renderer),
                        opacity: opacity
                    });
                }
            };
            /**
             * Renders the tick label.
             * Note: The label should already be created in init(), so it should only
             * have to be moved into place.
             *
             * @private
             * @function Highcharts.Tick#renderLabel
             * @param {Highcharts.PositionObject} xy  The position vector of the label
             * @param {boolean} old  Whether or not the tick is old
             * @param {number} opacity  The opacity of the label
             * @param {number} index  The index of the tick
             */
            Tick.prototype.renderLabel = function (xy, old, opacity, index) {
                var tick = this, axis = tick.axis, horiz = axis.horiz, options = axis.options, label = tick.label, labelOptions = options.labels, step = labelOptions.step, tickmarkOffset = pick(tick.tickmarkOffset, axis.tickmarkOffset), x = xy.x, y = xy.y;
                var show = true;
                if (label && isNumber(x)) {
                    label.xy = xy = tick.getLabelPosition(x, y, label, horiz, labelOptions, tickmarkOffset, index, step);
                    // Apply show first and show last. If the tick is both first and
                    // last, it is a single centered tick, in which case we show the
                    // label anyway (#2100).
                    if ((tick.isFirst &&
                        !tick.isLast &&
                        !options.showFirstLabel) ||
                        (tick.isLast &&
                            !tick.isFirst &&
                            !options.showLastLabel)) {
                        show = false;
                        // Handle label overflow and show or hide accordingly
                    }
                    else if (horiz &&
                        !labelOptions.step &&
                        !labelOptions.rotation &&
                        !old &&
                        opacity !== 0) {
                        tick.handleOverflow(xy);
                    }
                    // apply step
                    if (step && index % step) {
                        // show those indices dividable by step
                        show = false;
                    }
                    // Set the new position, and show or hide
                    if (show && isNumber(xy.y)) {
                        xy.opacity = opacity;
                        label[tick.isNewLabel ? 'attr' : 'animate'](xy).show(true);
                        tick.isNewLabel = false;
                    }
                    else {
                        label.hide(); // #1338, #15863
                        tick.isNewLabel = true;
                    }
                }
            };
            /**
             * Replace labels with the moved ones to perform animation. Additionally
             * destroy unused labels.
             *
             * @private
             * @function Highcharts.Tick#replaceMovedLabel
             */
            Tick.prototype.replaceMovedLabel = function () {
                var tick = this, label = tick.label, axis = tick.axis;
                // Animate and destroy
                if (label && !tick.isNew) {
                    label.animate({ opacity: 0 }, void 0, label.destroy);
                    delete tick.label;
                }
                axis.isDirty = true;
                tick.label = tick.movedLabel;
                delete tick.movedLabel;
            };
            return Tick;
        }());
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * Optional parameters for the tick.
         * @private
         * @interface Highcharts.TickParametersObject
         */ /**
        * Set category for the tick.
        * @name Highcharts.TickParametersObject#category
        * @type {string|undefined}
        */ /**
        * @name Highcharts.TickParametersObject#options
        * @type {Highcharts.Dictionary<any>|undefined}
        */ /**
        * Set tickmarkOffset for the tick.
        * @name Highcharts.TickParametersObject#tickmarkOffset
        * @type {number|undefined}
        */
        /**
         * Additonal time tick information.
         *
         * @interface Highcharts.TimeTicksInfoObject
         * @extends Highcharts.TimeNormalizedObject
         */ /**
        * @name Highcharts.TimeTicksInfoObject#higherRanks
        * @type {Array<string>}
        */ /**
        * @name Highcharts.TimeTicksInfoObject#totalRange
        * @type {number}
        */
        (''); // keeps doclets above in JS file

        return Tick;
    });
    _registerModule(_modules, 'Core/Axis/Axis.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Axis/AxisDefaults.js'], _modules['Core/Color/Color.js'], _modules['Core/Defaults.js'], _modules['Core/Foundation.js'], _modules['Core/Globals.js'], _modules['Core/Axis/Tick.js'], _modules['Core/Utilities.js']], function (A, AxisDefaults, Color, D, F, H, Tick, U) {
        /* *
         *
         *  (c) 2010-2021 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var animObject = A.animObject;
        var defaultOptions = D.defaultOptions;
        var registerEventOptions = F.registerEventOptions;
        var deg2rad = H.deg2rad;
        var arrayMax = U.arrayMax, arrayMin = U.arrayMin, clamp = U.clamp, correctFloat = U.correctFloat, defined = U.defined, destroyObjectProperties = U.destroyObjectProperties, erase = U.erase, error = U.error, extend = U.extend, fireEvent = U.fireEvent, getClosestDistance = U.getClosestDistance, insertItem = U.insertItem, isArray = U.isArray, isNumber = U.isNumber, isString = U.isString, merge = U.merge, normalizeTickInterval = U.normalizeTickInterval, objectEach = U.objectEach, pick = U.pick, relativeLength = U.relativeLength, removeEvent = U.removeEvent, splat = U.splat, syncTimeout = U.syncTimeout;
        var getNormalizedTickInterval = function (axis, tickInterval) { return normalizeTickInterval(tickInterval, void 0, void 0, pick(axis.options.allowDecimals, 
        // If the tick interval is greather than 0.5, avoid decimals, as
        // linear axes are often used to render discrete values (#3363). If
        // a tick amount is set, allow decimals by default, as it increases
        // the chances for a good fit.
        tickInterval < 0.5 || axis.tickAmount !== void 0), !!axis.tickAmount); };
        /* *
         *
         *  Class
         *
         * */
        /**
         * Create a new axis object. Called internally when instanciating a new chart or
         * adding axes by {@link Highcharts.Chart#addAxis}.
         *
         * A chart can have from 0 axes (pie chart) to multiples. In a normal, single
         * series cartesian chart, there is one X axis and one Y axis.
         *
         * The X axis or axes are referenced by {@link Highcharts.Chart.xAxis}, which is
         * an array of Axis objects. If there is only one axis, it can be referenced
         * through `chart.xAxis[0]`, and multiple axes have increasing indices. The same
         * pattern goes for Y axes.
         *
         * If you need to get the axes from a series object, use the `series.xAxis` and
         * `series.yAxis` properties. These are not arrays, as one series can only be
         * associated to one X and one Y axis.
         *
         * A third way to reference the axis programmatically is by `id`. Add an `id` in
         * the axis configuration options, and get the axis by
         * {@link Highcharts.Chart#get}.
         *
         * Configuration options for the axes are given in options.xAxis and
         * options.yAxis.
         *
         * @class
         * @name Highcharts.Axis
         *
         * @param {Highcharts.Chart} chart
         * The Chart instance to apply the axis on.
         *
         * @param {Highcharts.AxisOptions} userOptions
         * Axis options
         */
        var Axis = /** @class */ (function () {
            /* *
             *
             *  Constructors
             *
             * */
            function Axis(chart, userOptions, coll) {
                this.alternateBands = void 0;
                this.bottom = void 0;
                this.chart = void 0;
                this.closestPointRange = void 0;
                this.coll = void 0;
                this.eventOptions = void 0;
                this.hasNames = void 0;
                this.hasVisibleSeries = void 0;
                this.height = void 0;
                this.index = void 0;
                this.isLinked = void 0;
                this.labelEdge = void 0; // @todo
                this.labelFormatter = void 0;
                this.left = void 0;
                this.len = void 0;
                this.max = void 0;
                this.maxLabelLength = void 0;
                this.min = void 0;
                this.minorTickInterval = void 0;
                this.minorTicks = void 0;
                this.minPixelPadding = void 0;
                this.names = void 0;
                this.offset = void 0;
                this.options = void 0;
                this.overlap = void 0;
                this.paddedTicks = void 0;
                this.plotLinesAndBands = void 0;
                this.plotLinesAndBandsGroups = void 0;
                this.pointRange = void 0;
                this.pointRangePadding = void 0;
                this.pos = void 0;
                this.positiveValuesOnly = void 0;
                this.right = void 0;
                this.series = void 0;
                this.side = void 0;
                this.tickAmount = void 0;
                this.tickInterval = void 0;
                this.tickmarkOffset = void 0;
                this.tickPositions = void 0;
                this.tickRotCorr = void 0;
                this.ticks = void 0;
                this.top = void 0;
                this.transA = void 0;
                this.transB = void 0;
                this.translationSlope = void 0;
                this.userOptions = void 0;
                this.visible = void 0;
                this.width = void 0;
                this.zoomEnabled = void 0;
                this.init(chart, userOptions, coll);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Overrideable function to initialize the axis.
             *
             * @see {@link Axis}
             *
             * @function Highcharts.Axis#init
             *
             * @param {Highcharts.Chart} chart
             * The Chart instance to apply the axis on.
             *
             * @param {AxisOptions} userOptions
             * Axis options.
             *
             * @emits Highcharts.Axis#event:afterInit
             * @emits Highcharts.Axis#event:init
             */
            Axis.prototype.init = function (chart, userOptions, coll) {
                if (coll === void 0) { coll = this.coll; }
                var isXAxis = coll === 'xAxis', axis = this;
                /**
                 * The Chart that the axis belongs to.
                 *
                 * @name Highcharts.Axis#chart
                 * @type {Highcharts.Chart}
                 */
                axis.chart = chart;
                /**
                 * Whether the axis is horizontal.
                 *
                 * @name Highcharts.Axis#horiz
                 * @type {boolean|undefined}
                 */
                axis.horiz = axis.isZAxis || (chart.inverted ? !isXAxis : isXAxis);
                /**
                 * Whether the axis is the x-axis.
                 *
                 * @name Highcharts.Axis#isXAxis
                 * @type {boolean|undefined}
                 */
                axis.isXAxis = isXAxis;
                /**
                 * The collection where the axis belongs, for example `xAxis`, `yAxis`
                 * or `colorAxis`. Corresponds to properties on Chart, for example
                 * {@link Chart.xAxis}.
                 *
                 * @name Highcharts.Axis#coll
                 * @type {string}
                 */
                axis.coll = coll;
                fireEvent(this, 'init', { userOptions: userOptions });
                // Needed in setOptions
                axis.opposite = pick(userOptions.opposite, axis.opposite);
                /**
                 * The side on which the axis is rendered. 0 is top, 1 is right, 2
                 * is bottom and 3 is left.
                 *
                 * @name Highcharts.Axis#side
                 * @type {number}
                 */
                axis.side = pick(userOptions.side, axis.side, (axis.horiz ?
                    (axis.opposite ? 0 : 2) : // top : bottom
                    (axis.opposite ? 1 : 3)) // right : left
                );
                /**
                 * Current options for the axis after merge of defaults and user's
                 * options.
                 *
                 * @name Highcharts.Axis#options
                 * @type {Highcharts.AxisOptions}
                 */
                axis.setOptions(userOptions);
                var options = this.options, labelsOptions = options.labels, type = options.type;
                /**
                 * User's options for this axis without defaults.
                 *
                 * @name Highcharts.Axis#userOptions
                 * @type {Highcharts.AxisOptions}
                 */
                axis.userOptions = userOptions;
                axis.minPixelPadding = 0;
                /**
                 * Whether the axis is reversed. Based on the `axis.reversed`,
                 * option, but inverted charts have reversed xAxis by default.
                 *
                 * @name Highcharts.Axis#reversed
                 * @type {boolean}
                 */
                axis.reversed = pick(options.reversed, axis.reversed);
                axis.visible = options.visible;
                axis.zoomEnabled = options.zoomEnabled;
                // Initial categories
                axis.hasNames =
                    type === 'category' || options.categories === true;
                /**
                 * If categories are present for the axis, names are used instead of
                 * numbers for that axis.
                 *
                 * Since Highcharts 3.0, categories can also be extracted by giving each
                 * point a name and setting axis type to `category`. However, if you
                 * have multiple series, best practice remains defining the `categories`
                 * array.
                 *
                 * @see [xAxis.categories](/highcharts/xAxis.categories)
                 *
                 * @name Highcharts.Axis#categories
                 * @type {Array<string>}
                 * @readonly
                 */
                axis.categories = options.categories || (axis.hasNames ? [] : void 0);
                if (!axis.names) { // Preserve on update (#3830)
                    axis.names = [];
                    axis.names.keys = {};
                }
                // Placeholder for plotlines and plotbands groups
                axis.plotLinesAndBandsGroups = {};
                // Shorthand types
                axis.positiveValuesOnly = !!axis.logarithmic;
                // Flag, if axis is linked to another axis
                axis.isLinked = defined(options.linkedTo);
                /**
                 * List of major ticks mapped by postition on axis.
                 *
                 * @see {@link Highcharts.Tick}
                 *
                 * @name Highcharts.Axis#ticks
                 * @type {Highcharts.Dictionary<Highcharts.Tick>}
                 */
                axis.ticks = {};
                axis.labelEdge = [];
                /**
                 * List of minor ticks mapped by position on the axis.
                 *
                 * @see {@link Highcharts.Tick}
                 *
                 * @name Highcharts.Axis#minorTicks
                 * @type {Highcharts.Dictionary<Highcharts.Tick>}
                 */
                axis.minorTicks = {};
                // List of plotLines/Bands
                axis.plotLinesAndBands = [];
                // Alternate bands
                axis.alternateBands = {};
                // Axis metrics
                axis.len = 0;
                axis.minRange = axis.userMinRange = options.minRange || options.maxZoom;
                axis.range = options.range;
                axis.offset = options.offset || 0;
                /**
                 * The maximum value of the axis. In a logarithmic axis, this is the
                 * logarithm of the real value, and the real value can be obtained from
                 * {@link Axis#getExtremes}.
                 *
                 * @name Highcharts.Axis#max
                 * @type {number|null}
                 */
                axis.max = null;
                /**
                 * The minimum value of the axis. In a logarithmic axis, this is the
                 * logarithm of the real value, and the real value can be obtained from
                 * {@link Axis#getExtremes}.
                 *
                 * @name Highcharts.Axis#min
                 * @type {number|null}
                 */
                axis.min = null;
                /**
                 * The processed crosshair options.
                 *
                 * @name Highcharts.Axis#crosshair
                 * @type {boolean|Highcharts.AxisCrosshairOptions}
                 */
                var crosshair = pick(options.crosshair, splat(chart.options.tooltip.crosshairs)[isXAxis ? 0 : 1]);
                axis.crosshair = crosshair === true ? {} : crosshair;
                // Register. Don't add it again on Axis.update().
                if (chart.axes.indexOf(axis) === -1) { //
                    if (isXAxis) { // #2713
                        chart.axes.splice(chart.xAxis.length, 0, axis);
                    }
                    else {
                        chart.axes.push(axis);
                    }
                    insertItem(this, chart[this.coll]);
                }
                chart.orderItems(axis.coll);
                /**
                 * All series associated to the axis.
                 *
                 * @name Highcharts.Axis#series
                 * @type {Array<Highcharts.Series>}
                 */
                axis.series = axis.series || []; // populated by Series
                // Reversed axis
                if (chart.inverted &&
                    !axis.isZAxis &&
                    isXAxis &&
                    typeof axis.reversed === 'undefined') {
                    axis.reversed = true;
                }
                axis.labelRotation = isNumber(labelsOptions.rotation) ?
                    labelsOptions.rotation :
                    void 0;
                // Register event listeners
                registerEventOptions(axis, options);
                fireEvent(this, 'afterInit');
            };
            /**
             * Merge and set options.
             *
             * @private
             * @function Highcharts.Axis#setOptions
             *
             * @param {Highcharts.AxisOptions} userOptions
             * Axis options.
             *
             * @emits Highcharts.Axis#event:afterSetOptions
             */
            Axis.prototype.setOptions = function (userOptions) {
                this.options = merge(AxisDefaults.defaultXAxisOptions, (this.coll === 'yAxis') && AxisDefaults.defaultYAxisOptions, [
                    AxisDefaults.defaultTopAxisOptions,
                    AxisDefaults.defaultRightAxisOptions,
                    AxisDefaults.defaultBottomAxisOptions,
                    AxisDefaults.defaultLeftAxisOptions
                ][this.side], merge(
                // if set in setOptions (#1053):
                defaultOptions[this.coll], userOptions));
                fireEvent(this, 'afterSetOptions', { userOptions: userOptions });
            };
            /**
             * The default label formatter. The context is a special config object for
             * the label. In apps, use the
             * [labels.formatter](https://api.highcharts.com/highcharts/xAxis.labels.formatter)
             * instead, except when a modification is needed.
             *
             * @function Highcharts.Axis#defaultLabelFormatter
             *
             * @param {Highcharts.AxisLabelsFormatterContextObject} this
             * Formatter context of axis label.
             *
             * @param {Highcharts.AxisLabelsFormatterContextObject} [ctx]
             * Formatter context of axis label.
             *
             * @return {string}
             * The formatted label content.
             */
            Axis.prototype.defaultLabelFormatter = function (ctx) {
                var axis = this.axis, chart = this.chart, numberFormatter = chart.numberFormatter, value = isNumber(this.value) ? this.value : NaN, time = axis.chart.time, categories = axis.categories, dateTimeLabelFormat = this.dateTimeLabelFormat, lang = defaultOptions.lang, numericSymbols = lang.numericSymbols, numSymMagnitude = lang.numericSymbolMagnitude || 1000, 
                // make sure the same symbol is added for all labels on a linear
                // axis
                numericSymbolDetector = axis.logarithmic ?
                    Math.abs(value) :
                    axis.tickInterval;
                var i = numericSymbols && numericSymbols.length, multi, ret;
                if (categories) {
                    ret = "".concat(this.value);
                }
                else if (dateTimeLabelFormat) { // datetime axis
                    ret = time.dateFormat(dateTimeLabelFormat, value);
                }
                else if (i && numericSymbolDetector >= 1000) {
                    // Decide whether we should add a numeric symbol like k (thousands)
                    // or M (millions). If we are to enable this in tooltip or other
                    // places as well, we can move this logic to the numberFormatter and
                    // enable it by a parameter.
                    while (i-- && typeof ret === 'undefined') {
                        multi = Math.pow(numSymMagnitude, i + 1);
                        if (
                        // Only accept a numeric symbol when the distance is more
                        // than a full unit. So for example if the symbol is k, we
                        // don't accept numbers like 0.5k.
                        numericSymbolDetector >= multi &&
                            // Accept one decimal before the symbol. Accepts 0.5k but
                            // not 0.25k. How does this work with the previous?
                            (value * 10) % multi === 0 &&
                            numericSymbols[i] !== null &&
                            value !== 0) { // #5480
                            ret = numberFormatter(value / multi, -1) + numericSymbols[i];
                        }
                    }
                }
                if (typeof ret === 'undefined') {
                    if (Math.abs(value) >= 10000) { // add thousands separators
                        ret = numberFormatter(value, -1);
                    }
                    else { // small numbers
                        ret = numberFormatter(value, -1, void 0, ''); // #2466
                    }
                }
                return ret;
            };
            /**
             * Get the minimum and maximum for the series of each axis. The function
             * analyzes the axis series and updates `this.dataMin` and `this.dataMax`.
             *
             * @private
             * @function Highcharts.Axis#getSeriesExtremes
             *
             * @emits Highcharts.Axis#event:afterGetSeriesExtremes
             * @emits Highcharts.Axis#event:getSeriesExtremes
             */
            Axis.prototype.getSeriesExtremes = function () {
                var axis = this, chart = axis.chart;
                var xExtremes;
                fireEvent(this, 'getSeriesExtremes', null, function () {
                    axis.hasVisibleSeries = false;
                    // Reset properties in case we're redrawing (#3353)
                    axis.dataMin = axis.dataMax = axis.threshold = null;
                    axis.softThreshold = !axis.isXAxis;
                    // Loop through this axis' series
                    axis.series.forEach(function (series) {
                        if (series.visible ||
                            !chart.options.chart.ignoreHiddenSeries) {
                            var seriesOptions = series.options;
                            var xData = void 0, threshold = seriesOptions.threshold, seriesDataMin = void 0, seriesDataMax = void 0;
                            axis.hasVisibleSeries = true;
                            // Validate threshold in logarithmic axes
                            if (axis.positiveValuesOnly && threshold <= 0) {
                                threshold = null;
                            }
                            // Get dataMin and dataMax for X axes
                            if (axis.isXAxis) {
                                xData = series.xData;
                                if (xData && xData.length) {
                                    xData = axis.logarithmic ?
                                        xData.filter(function (x) { return x > 0; }) :
                                        xData;
                                    xExtremes = series.getXExtremes(xData);
                                    // If xData contains values which is not numbers,
                                    // then filter them out. To prevent performance hit,
                                    // we only do this after we have already found
                                    // seriesDataMin because in most cases all data is
                                    // valid. #5234.
                                    seriesDataMin = xExtremes.min;
                                    seriesDataMax = xExtremes.max;
                                    if (!isNumber(seriesDataMin) &&
                                        // #5010:
                                        !(seriesDataMin instanceof Date)) {
                                        xData = xData.filter(isNumber);
                                        xExtremes = series.getXExtremes(xData);
                                        // Do it again with valid data
                                        seriesDataMin = xExtremes.min;
                                        seriesDataMax = xExtremes.max;
                                    }
                                    if (xData.length) {
                                        axis.dataMin = Math.min(pick(axis.dataMin, seriesDataMin), seriesDataMin);
                                        axis.dataMax = Math.max(pick(axis.dataMax, seriesDataMax), seriesDataMax);
                                    }
                                }
                                // Get dataMin and dataMax for Y axes, as well as handle
                                // stacking and processed data
                            }
                            else {
                                // Get this particular series extremes
                                var dataExtremes = series.applyExtremes();
                                // Get the dataMin and dataMax so far. If percentage is
                                // used, the min and max are always 0 and 100. If
                                // seriesDataMin and seriesDataMax is null, then series
                                // doesn't have active y data, we continue with nulls
                                if (isNumber(dataExtremes.dataMin)) {
                                    seriesDataMin = dataExtremes.dataMin;
                                    axis.dataMin = Math.min(pick(axis.dataMin, seriesDataMin), seriesDataMin);
                                }
                                if (isNumber(dataExtremes.dataMax)) {
                                    seriesDataMax = dataExtremes.dataMax;
                                    axis.dataMax = Math.max(pick(axis.dataMax, seriesDataMax), seriesDataMax);
                                }
                                // Adjust to threshold
                                if (defined(threshold)) {
                                    axis.threshold = threshold;
                                }
                                // If any series has a hard threshold, it takes
                                // precedence
                                if (!seriesOptions.softThreshold ||
                                    axis.positiveValuesOnly) {
                                    axis.softThreshold = false;
                                }
                            }
                        }
                    });
                });
                fireEvent(this, 'afterGetSeriesExtremes');
            };
            /**
             * Translate from axis value to pixel position on the chart, or back. Use
             * the `toPixels` and `toValue` functions in applications.
             *
             * @private
             * @function Highcharts.Axis#translate
             */
            Axis.prototype.translate = function (val, backwards, cvsCoord, old, handleLog, pointPlacement) {
                var axis = (this.linkedParent || this), // #1417
                localMin = (old && axis.old ? axis.old.min : axis.min);
                if (!isNumber(localMin)) {
                    return NaN;
                }
                var minPixelPadding = axis.minPixelPadding, doPostTranslate = (axis.isOrdinal ||
                    axis.brokenAxis && axis.brokenAxis.hasBreaks ||
                    (axis.logarithmic && handleLog)) && axis.lin2val;
                var sign = 1, cvsOffset = 0, localA = old && axis.old ? axis.old.transA : axis.transA, returnValue = 0;
                if (!localA) {
                    localA = axis.transA;
                }
                // In vertical axes, the canvas coordinates start from 0 at the top like
                // in SVG.
                if (cvsCoord) {
                    sign *= -1; // canvas coordinates inverts the value
                    cvsOffset = axis.len;
                }
                // Handle reversed axis
                if (axis.reversed) {
                    sign *= -1;
                    cvsOffset -= sign * (axis.sector || axis.len);
                }
                // From pixels to value
                if (backwards) { // reverse translation
                    val = val * sign + cvsOffset;
                    val -= minPixelPadding;
                    // from chart pixel to value:
                    returnValue = val / localA + localMin;
                    if (doPostTranslate) { // log, ordinal and broken axis
                        returnValue = axis.lin2val(returnValue);
                    }
                    // From value to pixels
                }
                else {
                    if (doPostTranslate) { // log, ordinal and broken axis
                        val = axis.val2lin(val);
                    }
                    var value = sign * (val - localMin) * localA;
                    returnValue = (!axis.isRadial ? correctFloat(value) : value) +
                        cvsOffset +
                        (sign * minPixelPadding) +
                        (isNumber(pointPlacement) ? localA * pointPlacement : 0);
                }
                return returnValue;
            };
            /**
             * Translate a value in terms of axis units into pixels within the chart.
             *
             * @function Highcharts.Axis#toPixels
             *
             * @param {number} value
             * A value in terms of axis units.
             *
             * @param {boolean} paneCoordinates
             * Whether to return the pixel coordinate relative to the chart or just the
             * axis/pane itself.
             *
             * @return {number}
             * Pixel position of the value on the chart or axis.
             */
            Axis.prototype.toPixels = function (value, paneCoordinates) {
                return this.translate(value, false, !this.horiz, void 0, true) +
                    (paneCoordinates ? 0 : this.pos);
            };
            /**
             * Translate a pixel position along the axis to a value in terms of axis
             * units.
             *
             * @function Highcharts.Axis#toValue
             *
             * @param {number} pixel
             * The pixel value coordinate.
             *
             * @param {boolean} [paneCoordinates=false]
             * Whether the input pixel is relative to the chart or just the axis/pane
             * itself.
             *
             * @return {number}
             * The axis value.
             */
            Axis.prototype.toValue = function (pixel, paneCoordinates) {
                return this.translate(pixel - (paneCoordinates ? 0 : this.pos), true, !this.horiz, void 0, true);
            };
            /**
             * Create the path for a plot line that goes from the given value on
             * this axis, across the plot to the opposite side. Also used internally for
             * grid lines and crosshairs.
             *
             * @function Highcharts.Axis#getPlotLinePath
             *
             * @param {Highcharts.AxisPlotLinePathOptionsObject} options
             * Options for the path.
             *
             * @return {Highcharts.SVGPathArray|null}
             * The SVG path definition for the plot line.
             */
            Axis.prototype.getPlotLinePath = function (options) {
                var axis = this, chart = axis.chart, axisLeft = axis.left, axisTop = axis.top, old = options.old, value = options.value, lineWidth = options.lineWidth, cHeight = (old && chart.oldChartHeight) || chart.chartHeight, cWidth = (old && chart.oldChartWidth) || chart.chartWidth, transB = axis.transB;
                var translatedValue = options.translatedValue, force = options.force, x1, y1, x2, y2, skip;
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Check if x is between a and b. If not, either move to a/b
                 * or skip, depending on the force parameter.
                 * @private
                 */
                function between(x, a, b) {
                    if (force !== 'pass' && (x < a || x > b)) {
                        if (force) {
                            x = clamp(x, a, b);
                        }
                        else {
                            skip = true;
                        }
                    }
                    return x;
                }
                var evt = {
                    value: value,
                    lineWidth: lineWidth,
                    old: old,
                    force: force,
                    acrossPanes: options.acrossPanes,
                    translatedValue: translatedValue
                };
                fireEvent(this, 'getPlotLinePath', evt, function (e) {
                    translatedValue = pick(translatedValue, axis.translate(value, void 0, void 0, old));
                    // Keep the translated value within sane bounds, and avoid Infinity
                    // to fail the isNumber test (#7709).
                    translatedValue = clamp(translatedValue, -1e5, 1e5);
                    x1 = x2 = Math.round(translatedValue + transB);
                    y1 = y2 = Math.round(cHeight - translatedValue - transB);
                    if (!isNumber(translatedValue)) { // no min or max
                        skip = true;
                        force = false; // #7175, don't force it when path is invalid
                    }
                    else if (axis.horiz) {
                        y1 = axisTop;
                        y2 = cHeight - axis.bottom;
                        x1 = x2 = between(x1, axisLeft, axisLeft + axis.width);
                    }
                    else {
                        x1 = axisLeft;
                        x2 = cWidth - axis.right;
                        y1 = y2 = between(y1, axisTop, axisTop + axis.height);
                    }
                    e.path = skip && !force ?
                        null :
                        chart.renderer.crispLine([['M', x1, y1], ['L', x2, y2]], lineWidth || 1);
                });
                return evt.path;
            };
            /**
             * Internal function to get the tick positions of a linear axis to round
             * values like whole tens or every five.
             *
             * @function Highcharts.Axis#getLinearTickPositions
             *
             * @param {number} tickInterval
             * The normalized tick interval.
             *
             * @param {number} min
             * Axis minimum.
             *
             * @param {number} max
             * Axis maximum.
             *
             * @return {Array<number>}
             * An array of axis values where ticks should be placed.
             */
            Axis.prototype.getLinearTickPositions = function (tickInterval, min, max) {
                var roundedMin = correctFloat(Math.floor(min / tickInterval) * tickInterval), roundedMax = correctFloat(Math.ceil(max / tickInterval) * tickInterval), tickPositions = [];
                var pos, lastPos, precision;
                // When the precision is higher than what we filter out in
                // correctFloat, skip it (#6183).
                if (correctFloat(roundedMin + tickInterval) === roundedMin) {
                    precision = 20;
                }
                // For single points, add a tick regardless of the relative position
                // (#2662, #6274)
                if (this.single) {
                    return [min];
                }
                // Populate the intermediate values
                pos = roundedMin;
                while (pos <= roundedMax) {
                    // Place the tick on the rounded value
                    tickPositions.push(pos);
                    // Always add the raw tickInterval, not the corrected one.
                    pos = correctFloat(pos + tickInterval, precision);
                    // If the interval is not big enough in the current min - max range
                    // to actually increase the loop variable, we need to break out to
                    // prevent endless loop. Issue #619
                    if (pos === lastPos) {
                        break;
                    }
                    // Record the last value
                    lastPos = pos;
                }
                return tickPositions;
            };
            /**
             * Resolve the new minorTicks/minorTickInterval options into the legacy
             * loosely typed minorTickInterval option.
             *
             * @function Highcharts.Axis#getMinorTickInterval
             *
             * @return {number|"auto"|null}
             * Legacy option
             */
            Axis.prototype.getMinorTickInterval = function () {
                var options = this.options;
                if (options.minorTicks === true) {
                    return pick(options.minorTickInterval, 'auto');
                }
                if (options.minorTicks === false) {
                    return null;
                }
                return options.minorTickInterval;
            };
            /**
             * Internal function to return the minor tick positions. For logarithmic
             * axes, the same logic as for major ticks is reused.
             *
             * @function Highcharts.Axis#getMinorTickPositions
             *
             * @return {Array<number>}
             * An array of axis values where ticks should be placed.
             */
            Axis.prototype.getMinorTickPositions = function () {
                var axis = this, options = axis.options, tickPositions = axis.tickPositions, minorTickInterval = axis.minorTickInterval, pointRangePadding = axis.pointRangePadding || 0, min = axis.min - pointRangePadding, // #1498
                max = axis.max + pointRangePadding, // #1498
                range = max - min;
                var minorTickPositions = [], pos;
                // If minor ticks get too dense, they are hard to read, and may cause
                // long running script. So we don't draw them.
                if (range && range / minorTickInterval < axis.len / 3) { // #3875
                    var logarithmic_1 = axis.logarithmic;
                    if (logarithmic_1) {
                        // For each interval in the major ticks, compute the minor ticks
                        // separately.
                        this.paddedTicks.forEach(function (_pos, i, paddedTicks) {
                            if (i) {
                                minorTickPositions.push.apply(minorTickPositions, logarithmic_1.getLogTickPositions(minorTickInterval, paddedTicks[i - 1], paddedTicks[i], true));
                            }
                        });
                    }
                    else if (axis.dateTime &&
                        this.getMinorTickInterval() === 'auto') { // #1314
                        minorTickPositions = minorTickPositions.concat(axis.getTimeTicks(axis.dateTime.normalizeTimeTickInterval(minorTickInterval), min, max, options.startOfWeek));
                    }
                    else {
                        for (pos = min + (tickPositions[0] - min) % minorTickInterval; pos <= max; pos += minorTickInterval) {
                            // Very, very, tight grid lines (#5771)
                            if (pos === minorTickPositions[0]) {
                                break;
                            }
                            minorTickPositions.push(pos);
                        }
                    }
                }
                if (minorTickPositions.length !== 0) {
                    axis.trimTicks(minorTickPositions); // #3652 #3743 #1498 #6330
                }
                return minorTickPositions;
            };
            /**
             * Adjust the min and max for the minimum range. Keep in mind that the
             * series data is not yet processed, so we don't have information on data
             * cropping and grouping, or updated `axis.pointRange` or
             * `series.pointRange`. The data can't be processed until we have finally
             * established min and max.
             *
             * @private
             * @function Highcharts.Axis#adjustForMinRange
             */
            Axis.prototype.adjustForMinRange = function () {
                var axis = this, options = axis.options, logarithmic = axis.logarithmic;
                var min = axis.min, max = axis.max, zoomOffset, spaceAvailable, closestDataRange, minArgs, maxArgs, minRange;
                // Set the automatic minimum range based on the closest point distance
                if (axis.isXAxis &&
                    typeof axis.minRange === 'undefined' &&
                    !logarithmic) {
                    if (defined(options.min) ||
                        defined(options.max) ||
                        defined(options.floor) ||
                        defined(options.ceiling)) {
                        axis.minRange = null; // don't do this again
                    }
                    else {
                        // Find the closest distance between raw data points, as opposed
                        // to closestPointRange that applies to processed points
                        // (cropped and grouped)
                        closestDataRange = getClosestDistance(axis.series.map(function (s) { var _a; 
                        // If xIncrement, we only need to measure the two first
                        // points to get the distance. Saves processing time.
                        return (s.xIncrement ? (_a = s.xData) === null || _a === void 0 ? void 0 : _a.slice(0, 2) : s.xData) || []; })) || 0;
                        axis.minRange = Math.min(closestDataRange * 5, axis.dataMax - axis.dataMin);
                    }
                }
                // if minRange is exceeded, adjust
                if (max - min < axis.minRange) {
                    spaceAvailable =
                        axis.dataMax - axis.dataMin >=
                            axis.minRange;
                    minRange = axis.minRange;
                    zoomOffset = (minRange - max + min) / 2;
                    // if min and max options have been set, don't go beyond it
                    minArgs = [
                        min - zoomOffset,
                        pick(options.min, min - zoomOffset)
                    ];
                    // If space is available, stay within the data range
                    if (spaceAvailable) {
                        minArgs[2] = logarithmic ?
                            logarithmic.log2lin(axis.dataMin) :
                            axis.dataMin;
                    }
                    min = arrayMax(minArgs);
                    maxArgs = [
                        min + minRange,
                        pick(options.max, min + minRange)
                    ];
                    // If space is availabe, stay within the data range
                    if (spaceAvailable) {
                        maxArgs[2] = logarithmic ?
                            logarithmic.log2lin(axis.dataMax) :
                            axis.dataMax;
                    }
                    max = arrayMin(maxArgs);
                    // now if the max is adjusted, adjust the min back
                    if (max - min < minRange) {
                        minArgs[0] = max - minRange;
                        minArgs[1] = pick(options.min, max - minRange);
                        min = arrayMax(minArgs);
                    }
                }
                // Record modified extremes
                axis.min = min;
                axis.max = max;
            };
            /**
             * Find the closestPointRange across all series, including the single data
             * series.
             *
             * @private
             * @function Highcharts.Axis#getClosest
             */
            Axis.prototype.getClosest = function () {
                var closestSingleDistance, closestDistance;
                if (this.categories) {
                    closestDistance = 1;
                }
                else {
                    var singleXs_1 = [];
                    this.series.forEach(function (series) {
                        var _a;
                        var seriesClosest = series.closestPointRange, visible = series.visible ||
                            !series.chart.options.chart.ignoreHiddenSeries;
                        if (((_a = series.xData) === null || _a === void 0 ? void 0 : _a.length) === 1) {
                            singleXs_1.push(series.xData[0]);
                        }
                        else if (!series.noSharedTooltip &&
                            defined(seriesClosest) &&
                            visible) {
                            closestDistance = defined(closestDistance) ?
                                Math.min(closestDistance, seriesClosest) :
                                seriesClosest;
                        }
                    });
                    if (singleXs_1.length) {
                        singleXs_1.sort(function (a, b) { return a - b; });
                        closestSingleDistance = getClosestDistance([singleXs_1]);
                    }
                }
                if (closestSingleDistance && closestDistance) {
                    return Math.min(closestSingleDistance, closestDistance);
                }
                return closestSingleDistance || closestDistance;
            };
            /**
             * When a point name is given and no x, search for the name in the existing
             * categories, or if categories aren't provided, search names or create a
             * new category (#2522).
             *
             * @private
             * @function Highcharts.Axis#nameToX
             *
             * @param {Highcharts.Point} point
             * The point to inspect.
             *
             * @return {number}
             * The X value that the point is given.
             */
            Axis.prototype.nameToX = function (point) {
                var explicitCategories = isArray(this.options.categories), names = explicitCategories ? this.categories : this.names;
                var nameX = point.options.x, x;
                point.series.requireSorting = false;
                if (!defined(nameX)) {
                    nameX = this.options.uniqueNames && names ?
                        (explicitCategories ?
                            names.indexOf(point.name) :
                            pick(names.keys[point.name], -1)) :
                        point.series.autoIncrement();
                }
                if (nameX === -1) { // Not found in currenct categories
                    if (!explicitCategories && names) {
                        x = names.length;
                    }
                }
                else {
                    x = nameX;
                }
                // Write the last point's name to the names array
                if (typeof x !== 'undefined') {
                    this.names[x] = point.name;
                    // Backwards mapping is much faster than array searching (#7725)
                    this.names.keys[point.name] = x;
                }
                else if (point.x) {
                    x = point.x; // #17438
                }
                return x;
            };
            /**
             * When changes have been done to series data, update the axis.names.
             *
             * @private
             * @function Highcharts.Axis#updateNames
             */
            Axis.prototype.updateNames = function () {
                var axis = this, names = this.names, i = names.length;
                if (i > 0) {
                    Object.keys(names.keys).forEach(function (key) {
                        delete (names.keys)[key];
                    });
                    names.length = 0;
                    this.minRange = this.userMinRange; // Reset
                    (this.series || []).forEach(function (series) {
                        // Reset incrementer (#5928)
                        series.xIncrement = null;
                        // When adding a series, points are not yet generated
                        if (!series.points || series.isDirtyData) {
                            // When we're updating the series with data that is longer
                            // than it was, and cropThreshold is passed, we need to make
                            // sure that the axis.max is increased _before_ running the
                            // premature processData. Otherwise this early iteration of
                            // processData will crop the points to axis.max, and the
                            // names array will be too short (#5857).
                            axis.max = Math.max(axis.max, series.xData.length - 1);
                            series.processData();
                            series.generatePoints();
                        }
                        series.data.forEach(function (point, i) {
                            var x;
                            if (point &&
                                point.options &&
                                typeof point.name !== 'undefined' // #9562
                            ) {
                                x = axis.nameToX(point);
                                if (typeof x !== 'undefined' && x !== point.x) {
                                    point.x = x;
                                    series.xData[i] = x;
                                }
                            }
                        });
                    });
                }
            };
            /**
             * Update translation information.
             *
             * @private
             * @function Highcharts.Axis#setAxisTranslation
             *
             * @emits Highcharts.Axis#event:afterSetAxisTranslation
             */
            Axis.prototype.setAxisTranslation = function () {
                var axis = this, range = axis.max - axis.min, linkedParent = axis.linkedParent, hasCategories = !!axis.categories, isXAxis = axis.isXAxis;
                var pointRange = axis.axisPointRange || 0, closestPointRange, minPointOffset = 0, pointRangePadding = 0, ordinalCorrection, transA = axis.transA;
                // Adjust translation for padding. Y axis with categories need to go
                // through the same (#1784).
                if (isXAxis || hasCategories || pointRange) {
                    // Get the closest points
                    closestPointRange = axis.getClosest();
                    if (linkedParent) {
                        minPointOffset = linkedParent.minPointOffset;
                        pointRangePadding = linkedParent.pointRangePadding;
                    }
                    else {
                        axis.series.forEach(function (series) {
                            var seriesPointRange = hasCategories ?
                                1 :
                                (isXAxis ?
                                    pick(series.options.pointRange, closestPointRange, 0) :
                                    (axis.axisPointRange || 0)), // #2806
                            pointPlacement = series.options.pointPlacement;
                            pointRange = Math.max(pointRange, seriesPointRange);
                            if (!axis.single || hasCategories) {
                                // TODO: series should internally set x- and y-
                                // pointPlacement to simplify this logic.
                                var isPointPlacementAxis = series.is('xrange') ?
                                    !isXAxis :
                                    isXAxis;
                                // minPointOffset is the value padding to the left of
                                // the axis in order to make room for points with a
                                // pointRange, typically columns. When the
                                // pointPlacement option is 'between' or 'on', this
                                // padding does not apply.
                                minPointOffset = Math.max(minPointOffset, isPointPlacementAxis && isString(pointPlacement) ?
                                    0 :
                                    seriesPointRange / 2);
                                // Determine the total padding needed to the length of
                                // the axis to make room for the pointRange. If the
                                // series' pointPlacement is 'on', no padding is added.
                                pointRangePadding = Math.max(pointRangePadding, isPointPlacementAxis && pointPlacement === 'on' ?
                                    0 :
                                    seriesPointRange);
                            }
                        });
                    }
                    // Record minPointOffset and pointRangePadding
                    ordinalCorrection = (axis.ordinal && axis.ordinal.slope && closestPointRange) ?
                        axis.ordinal.slope / closestPointRange :
                        1; // #988, #1853
                    axis.minPointOffset = minPointOffset =
                        minPointOffset * ordinalCorrection;
                    axis.pointRangePadding =
                        pointRangePadding = pointRangePadding * ordinalCorrection;
                    // pointRange means the width reserved for each point, like in a
                    // column chart
                    axis.pointRange = Math.min(pointRange, axis.single && hasCategories ? 1 : range);
                    // closestPointRange means the closest distance between points. In
                    // columns it is mostly equal to pointRange, but in lines pointRange
                    // is 0 while closestPointRange is some other value
                    if (isXAxis && closestPointRange) {
                        axis.closestPointRange = closestPointRange;
                    }
                }
                // Secondary values
                axis.translationSlope = axis.transA = transA =
                    axis.staticScale ||
                        axis.len / ((range + pointRangePadding) || 1);
                // Translation addend
                axis.transB = axis.horiz ? axis.left : axis.bottom;
                axis.minPixelPadding = transA * minPointOffset;
                fireEvent(this, 'afterSetAxisTranslation');
            };
            /**
             * @private
             * @function Highcharts.Axis#minFromRange
             */
            Axis.prototype.minFromRange = function () {
                var axis = this;
                return axis.max - axis.range;
            };
            /**
             * Set the tick positions to round values and optionally extend the extremes
             * to the nearest tick.
             *
             * @private
             * @function Highcharts.Axis#setTickInterval
             *
             * @param {boolean} secondPass
             * TO-DO: parameter description
             *
             * @emits Highcharts.Axis#event:foundExtremes
             */
            Axis.prototype.setTickInterval = function (secondPass) {
                var axis = this, chart = axis.chart, log = axis.logarithmic, options = axis.options, isXAxis = axis.isXAxis, isLinked = axis.isLinked, tickPixelIntervalOption = options.tickPixelInterval, categories = axis.categories, softThreshold = axis.softThreshold;
                var maxPadding = options.maxPadding, minPadding = options.minPadding, length, linkedParentExtremes, 
                // Only non-negative tickInterval is valid, #12961
                tickIntervalOption = isNumber(options.tickInterval) && options.tickInterval >= 0 ?
                    options.tickInterval : void 0, threshold = isNumber(axis.threshold) ? axis.threshold : null, thresholdMin, thresholdMax, hardMin, hardMax;
                if (!axis.dateTime && !categories && !isLinked) {
                    this.getTickAmount();
                }
                // Min or max set either by zooming/setExtremes or initial options
                hardMin = pick(axis.userMin, options.min);
                hardMax = pick(axis.userMax, options.max);
                // Linked axis gets the extremes from the parent axis
                if (isLinked) {
                    axis.linkedParent = chart[axis.coll][options.linkedTo];
                    linkedParentExtremes = axis.linkedParent.getExtremes();
                    axis.min = pick(linkedParentExtremes.min, linkedParentExtremes.dataMin);
                    axis.max = pick(linkedParentExtremes.max, linkedParentExtremes.dataMax);
                    if (options.type !== axis.linkedParent.options.type) {
                        // Can't link axes of different type
                        error(11, 1, chart);
                    }
                    // Initial min and max from the extreme data values
                }
                else {
                    // Adjust to hard threshold
                    if (softThreshold && defined(threshold)) {
                        if (axis.dataMin >= threshold) {
                            thresholdMin = threshold;
                            minPadding = 0;
                        }
                        else if (axis.dataMax <= threshold) {
                            thresholdMax = threshold;
                            maxPadding = 0;
                        }
                    }
                    axis.min = pick(hardMin, thresholdMin, axis.dataMin);
                    axis.max = pick(hardMax, thresholdMax, axis.dataMax);
                }
                if (log) {
                    if (axis.positiveValuesOnly &&
                        !secondPass &&
                        Math.min(axis.min, pick(axis.dataMin, axis.min)) <= 0) { // #978
                        // Can't plot negative values on log axis
                        error(10, 1, chart);
                    }
                    // The correctFloat cures #934, float errors on full tens. But it
                    // was too aggressive for #4360 because of conversion back to lin,
                    // therefore use precision 15.
                    axis.min = correctFloat(log.log2lin(axis.min), 16);
                    axis.max = correctFloat(log.log2lin(axis.max), 16);
                }
                // handle zoomed range
                if (axis.range && defined(axis.max)) {
                    // #618, #6773:
                    axis.userMin = axis.min = hardMin =
                        Math.max(axis.dataMin, axis.minFromRange());
                    axis.userMax = hardMax = axis.max;
                    axis.range = null; // don't use it when running setExtremes
                }
                // Hook for Highcharts Stock Scroller.
                // Consider combining with beforePadding.
                fireEvent(axis, 'foundExtremes');
                // Hook for adjusting this.min and this.max. Used by bubble series.
                if (axis.beforePadding) {
                    axis.beforePadding();
                }
                // Adjust min and max for the minimum range
                axis.adjustForMinRange();
                // Handle options for floor, ceiling, softMin and softMax (#6359)
                if (!isNumber(axis.userMin)) {
                    if (isNumber(options.softMin) && options.softMin < axis.min) {
                        axis.min = hardMin = options.softMin; // #6894
                    }
                }
                if (!isNumber(axis.userMax)) {
                    if (isNumber(options.softMax) && options.softMax > axis.max) {
                        axis.max = hardMax = options.softMax; // #6894
                    }
                }
                // Pad the values to get clear of the chart's edges. To avoid
                // tickInterval taking the padding into account, we do this after
                // computing tick interval (#1337).
                if (!categories &&
                    !axis.axisPointRange &&
                    !(axis.stacking && axis.stacking.usePercentage) &&
                    !isLinked &&
                    defined(axis.min) &&
                    defined(axis.max)) {
                    length = axis.max - axis.min;
                    if (length) {
                        if (!defined(hardMin) && minPadding) {
                            axis.min -= length * minPadding;
                        }
                        if (!defined(hardMax) && maxPadding) {
                            axis.max += length * maxPadding;
                        }
                    }
                }
                if (!isNumber(axis.userMin) && isNumber(options.floor)) {
                    axis.min = Math.max(axis.min, options.floor);
                }
                if (!isNumber(axis.userMax) && isNumber(options.ceiling)) {
                    axis.max = Math.min(axis.max, options.ceiling);
                }
                // When the threshold is soft, adjust the extreme value only if the data
                // extreme and the padded extreme land on either side of the threshold.
                // For example, a series of [0, 1, 2, 3] would make the yAxis add a tick
                // for -1 because of the default minPadding and startOnTick options.
                // This is prevented by the softThreshold option.
                if (softThreshold && defined(axis.dataMin)) {
                    threshold = threshold || 0;
                    if (!defined(hardMin) &&
                        axis.min < threshold &&
                        axis.dataMin >= threshold) {
                        axis.min = axis.options.minRange ?
                            Math.min(threshold, axis.max -
                                axis.minRange) :
                            threshold;
                    }
                    else if (!defined(hardMax) &&
                        axis.max > threshold &&
                        axis.dataMax <= threshold) {
                        axis.max = axis.options.minRange ?
                            Math.max(threshold, axis.min +
                                axis.minRange) :
                            threshold;
                    }
                }
                // If min is bigger than highest, or if max less than lowest value, the
                // chart should not render points. (#14417)
                if (isNumber(axis.min) &&
                    isNumber(axis.max) &&
                    !this.chart.polar &&
                    (axis.min > axis.max)) {
                    if (defined(axis.options.min)) {
                        axis.max = axis.min;
                    }
                    else if (defined(axis.options.max)) {
                        axis.min = axis.max;
                    }
                }
                // get tickInterval
                if (axis.min === axis.max ||
                    typeof axis.min === 'undefined' ||
                    typeof axis.max === 'undefined') {
                    axis.tickInterval = 1;
                }
                else if (isLinked &&
                    axis.linkedParent &&
                    !tickIntervalOption &&
                    tickPixelIntervalOption ===
                        axis.linkedParent.options.tickPixelInterval) {
                    axis.tickInterval = tickIntervalOption =
                        axis.linkedParent.tickInterval;
                }
                else {
                    axis.tickInterval = pick(tickIntervalOption, this.tickAmount ?
                        ((axis.max - axis.min) /
                            Math.max(this.tickAmount - 1, 1)) :
                        void 0, 
                    // For categoried axis, 1 is default, for linear axis use
                    // tickPix
                    categories ?
                        1 :
                        // don't let it be more than the data range
                        (axis.max - axis.min) *
                            tickPixelIntervalOption /
                            Math.max(axis.len, tickPixelIntervalOption));
                }
                // Now we're finished detecting min and max, crop and group series data.
                // This is in turn needed in order to find tick positions in ordinal
                // axes.
                if (isXAxis && !secondPass) {
                    var hasExtremesChanged_1 = axis.min !==
                        (axis.old && axis.old.min) ||
                        axis.max !== (axis.old && axis.old.max);
                    // First process all series assigned to that axis.
                    axis.series.forEach(function (series) {
                        // Allows filtering out points outside the plot area.
                        series.forceCrop = (series.forceCropping &&
                            series.forceCropping());
                        series.processData(hasExtremesChanged_1);
                    });
                    // Then apply grouping if needed. The hasExtremesChanged helps to
                    // decide if the data grouping should be skipped in the further
                    // calculations #16319.
                    fireEvent(this, 'postProcessData', { hasExtremesChanged: hasExtremesChanged_1 });
                }
                // set the translation factor used in translate function
                axis.setAxisTranslation();
                // hook for ordinal axes and radial axes
                fireEvent(this, 'initialAxisTranslation');
                // In column-like charts, don't cramp in more ticks than there are
                // points (#1943, #4184)
                if (axis.pointRange && !tickIntervalOption) {
                    axis.tickInterval = Math.max(axis.pointRange, axis.tickInterval);
                }
                // Before normalizing the tick interval, handle minimum tick interval.
                // This applies only if tickInterval is not defined.
                var minTickInterval = pick(options.minTickInterval, 
                // In datetime axes, don't go below the data interval, except when
                // there are scatter-like series involved (#13369).
                axis.dateTime &&
                    !axis.series.some(function (s) { return s.noSharedTooltip; }) ?
                    axis.closestPointRange : 0);
                if (!tickIntervalOption && axis.tickInterval < minTickInterval) {
                    axis.tickInterval = minTickInterval;
                }
                // For linear axes, normalize the interval
                if (!axis.dateTime && !axis.logarithmic && !tickIntervalOption) {
                    axis.tickInterval = getNormalizedTickInterval(axis, axis.tickInterval);
                }
                // Prevent ticks from getting so close that we can't draw the labels
                if (!this.tickAmount) {
                    axis.tickInterval = axis.unsquish();
                }
                this.setTickPositions();
            };
            /**
             * Now we have computed the normalized tickInterval, get the tick positions.
             *
             * @private
             * @function Highcharts.Axis#setTickPositions
             *
             * @emits Highcharts.Axis#event:afterSetTickPositions
             */
            Axis.prototype.setTickPositions = function () {
                var axis = this, options = this.options, tickPositionsOption = options.tickPositions, tickPositioner = options.tickPositioner, minorTickIntervalOption = this.getMinorTickInterval(), hasVerticalPanning = this.hasVerticalPanning(), isColorAxis = this.coll === 'colorAxis', startOnTick = ((isColorAxis || !hasVerticalPanning) && options.startOnTick), endOnTick = ((isColorAxis || !hasVerticalPanning) && options.endOnTick);
                var tickPositions = [], tickPositionerResult;
                // Set the tickmarkOffset
                this.tickmarkOffset = (this.categories &&
                    options.tickmarkPlacement === 'between' &&
                    this.tickInterval === 1) ? 0.5 : 0; // #3202
                // get minorTickInterval
                this.minorTickInterval =
                    minorTickIntervalOption === 'auto' &&
                        this.tickInterval ?
                        this.tickInterval / options.minorTicksPerMajor :
                        minorTickIntervalOption;
                // When there is only one point, or all points have the same value on
                // this axis, then min and max are equal and tickPositions.length is 0
                // or 1. In this case, add some padding in order to center the point,
                // but leave it with one tick. #1337.
                this.single =
                    this.min === this.max &&
                        defined(this.min) &&
                        !this.tickAmount &&
                        (
                        // Data is on integer (#6563)
                        parseInt(this.min, 10) === this.min ||
                            // Between integers and decimals are not allowed (#6274)
                            options.allowDecimals !== false);
                /**
                 * Contains the current positions that are laid out on the axis. The
                 * positions are numbers in terms of axis values. In a category axis
                 * they are integers, in a datetime axis they are also integers, but
                 * designating milliseconds.
                 *
                 * This property is read only - for modifying the tick positions, use
                 * the `tickPositioner` callback or [axis.tickPositions(
                 * https://api.highcharts.com/highcharts/xAxis.tickPositions) option
                 * instead.
                 *
                 * @name Highcharts.Axis#tickPositions
                 * @type {Highcharts.AxisTickPositionsArray|undefined}
                 */
                if (tickPositionsOption) {
                    // Find the tick positions. Work on a copy (#1565)
                    tickPositions = tickPositionsOption.slice();
                }
                else if (isNumber(this.min) && isNumber(this.max)) {
                    // Too many ticks (#6405). Create a friendly warning and provide two
                    // ticks so at least we can show the data series.
                    if ((!axis.ordinal || !axis.ordinal.positions) &&
                        ((this.max - this.min) /
                            this.tickInterval >
                            Math.max(2 * this.len, 200))) {
                        tickPositions = [this.min, this.max];
                        error(19, false, this.chart);
                    }
                    else if (axis.dateTime) {
                        tickPositions = axis.getTimeTicks(axis.dateTime.normalizeTimeTickInterval(this.tickInterval, options.units), this.min, this.max, options.startOfWeek, axis.ordinal && axis.ordinal.positions, this.closestPointRange, true);
                    }
                    else if (axis.logarithmic) {
                        tickPositions = axis.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max);
                    }
                    else {
                        var startingTickInterval = this.tickInterval;
                        var adjustedTickInterval = startingTickInterval;
                        while (adjustedTickInterval <= startingTickInterval * 2) {
                            tickPositions = this.getLinearTickPositions(this.tickInterval, this.min, this.max);
                            // If there are more tick positions than the set tickAmount,
                            // increase the tickInterval and continue until it fits.
                            // (#17100)
                            if (this.tickAmount &&
                                tickPositions.length > this.tickAmount) {
                                this.tickInterval = getNormalizedTickInterval(this, adjustedTickInterval *= 1.1);
                            }
                            else {
                                break;
                            }
                        }
                    }
                    // Too dense ticks, keep only the first and last (#4477)
                    if (tickPositions.length > this.len) {
                        tickPositions = [
                            tickPositions[0],
                            tickPositions[tickPositions.length - 1]
                        ];
                        // Reduce doubled value (#7339)
                        if (tickPositions[0] === tickPositions[1]) {
                            tickPositions.length = 1;
                        }
                    }
                    // Run the tick positioner callback, that allows modifying auto tick
                    // positions.
                    if (tickPositioner) {
                        // Make it available to the positioner
                        this.tickPositions = tickPositions;
                        tickPositionerResult = tickPositioner.apply(axis, [this.min, this.max]);
                        if (tickPositionerResult) {
                            tickPositions = tickPositionerResult;
                        }
                    }
                }
                this.tickPositions = tickPositions;
                // Reset min/max or remove extremes based on start/end on tick
                this.paddedTicks = tickPositions.slice(0); // Used for logarithmic minor
                this.trimTicks(tickPositions, startOnTick, endOnTick);
                if (!this.isLinked && isNumber(this.min) && isNumber(this.max)) {
                    // Substract half a unit (#2619, #2846, #2515, #3390), but not in
                    // case of multiple ticks (#6897)
                    if (this.single &&
                        tickPositions.length < 2 &&
                        !this.categories &&
                        !this.series.some(function (s) {
                            return (s.is('heatmap') && s.options.pointPlacement === 'between');
                        })) {
                        this.min -= 0.5;
                        this.max += 0.5;
                    }
                    if (!tickPositionsOption && !tickPositionerResult) {
                        this.adjustTickAmount();
                    }
                }
                fireEvent(this, 'afterSetTickPositions');
            };
            /**
             * Handle startOnTick and endOnTick by either adapting to padding min/max or
             * rounded min/max. Also handle single data points.
             *
             * @private
             * @function Highcharts.Axis#trimTicks
             *
             * @param {Array<number>} tickPositions
             * TO-DO: parameter description
             *
             * @param {boolean} [startOnTick]
             * TO-DO: parameter description
             *
             * @param {boolean} [endOnTick]
             * TO-DO: parameter description
             */
            Axis.prototype.trimTicks = function (tickPositions, startOnTick, endOnTick) {
                var roundedMin = tickPositions[0], roundedMax = tickPositions[tickPositions.length - 1], minPointOffset = (!this.isOrdinal && this.minPointOffset) || 0; // (#12716)
                fireEvent(this, 'trimTicks');
                if (!this.isLinked) {
                    if (startOnTick && roundedMin !== -Infinity) { // #6502
                        this.min = roundedMin;
                    }
                    else {
                        while (this.min - minPointOffset > tickPositions[0]) {
                            tickPositions.shift();
                        }
                    }
                    if (endOnTick) {
                        this.max = roundedMax;
                    }
                    else {
                        while (this.max + minPointOffset <
                            tickPositions[tickPositions.length - 1]) {
                            tickPositions.pop();
                        }
                    }
                    // If no tick are left, set one tick in the middle (#3195)
                    if (tickPositions.length === 0 &&
                        defined(roundedMin) &&
                        !this.options.tickPositions) {
                        tickPositions.push((roundedMax + roundedMin) / 2);
                    }
                }
            };
            /**
             * Check if there are multiple axes in the same pane.
             *
             * @private
             * @function Highcharts.Axis#alignToOthers
             *
             * @return {boolean|undefined}
             * True if there are other axes.
             */
            Axis.prototype.alignToOthers = function () {
                var axis = this, alignedAxes = [this], options = axis.options, alignThresholds = (this.coll === 'yAxis' &&
                    this.chart.options.chart.alignThresholds), thresholdAlignments = [];
                var hasOther;
                axis.thresholdAlignment = void 0;
                if ((
                // Only if alignTicks or alignThresholds is true
                (this.chart.options.chart.alignTicks !== false &&
                    options.alignTicks) || (alignThresholds)) &&
                    // Disabled when startOnTick or endOnTick are false (#7604)
                    options.startOnTick !== false &&
                    options.endOnTick !== false &&
                    // Don't try to align ticks on a log axis, they are not evenly
                    // spaced (#6021)
                    !axis.logarithmic) {
                    // Get a key identifying which pane the axis belongs to
                    var getKey_1 = function (axis) {
                        var horiz = axis.horiz, options = axis.options;
                        return [
                            horiz ? options.left : options.top,
                            options.width,
                            options.height,
                            options.pane
                        ].join(',');
                    };
                    var thisKey_1 = getKey_1(this);
                    this.chart[this.coll].forEach(function (otherAxis) {
                        var series = otherAxis.series;
                        if (
                        // #4442
                        series.length &&
                            series.some(function (s) { return s.visible; }) &&
                            otherAxis !== axis &&
                            getKey_1(otherAxis) === thisKey_1) {
                            hasOther = true; // #4201
                            alignedAxes.push(otherAxis);
                        }
                    });
                }
                if (hasOther && alignThresholds) {
                    // Handle alignThresholds. The `thresholdAlignments` array keeps
                    // records of where each axis in the group wants its threshold, from
                    // 0 which is on `axis.min`, to 1 which is on `axis.max`.
                    alignedAxes.forEach(function (otherAxis) {
                        var threshAlign = otherAxis.getThresholdAlignment(axis);
                        if (isNumber(threshAlign)) {
                            thresholdAlignments.push(threshAlign);
                        }
                    });
                    // For each of the axes in the group, record the average
                    // `thresholdAlignment`.
                    var thresholdAlignment_1 = thresholdAlignments.length > 1 ?
                        thresholdAlignments.reduce(function (sum, n) { return (sum += n); }, 0) / thresholdAlignments.length :
                        void 0;
                    alignedAxes.forEach(function (axis) {
                        axis.thresholdAlignment = thresholdAlignment_1;
                    });
                }
                return hasOther;
            };
            /**
             * Where the axis wants its threshold, from 0 which is on `axis.min`, to 1 which
             * is on `axis.max`.
             *
             * @private
             * @function Highcharts.Axis#getThresholdAlignment
             */
            Axis.prototype.getThresholdAlignment = function (callerAxis) {
                if (!isNumber(this.dataMin) ||
                    (this !== callerAxis &&
                        this.series.some(function (s) { return (s.isDirty || s.isDirtyData); }))) {
                    this.getSeriesExtremes();
                }
                if (isNumber(this.threshold)) {
                    var thresholdAlignment = clamp(((this.threshold - (this.dataMin || 0)) /
                        ((this.dataMax || 0) - (this.dataMin || 0))), 0, 1);
                    if (this.options.reversed) {
                        thresholdAlignment = 1 - thresholdAlignment;
                    }
                    return thresholdAlignment;
                }
            };
            /**
             * Find the max ticks of either the x and y axis collection, and record it
             * in `this.tickAmount`.
             *
             * @private
             * @function Highcharts.Axis#getTickAmount
             */
            Axis.prototype.getTickAmount = function () {
                var axis = this, options = this.options, tickPixelInterval = options.tickPixelInterval;
                var tickAmount = options.tickAmount;
                if (!defined(options.tickInterval) &&
                    !tickAmount &&
                    this.len < tickPixelInterval &&
                    !this.isRadial &&
                    !axis.logarithmic &&
                    options.startOnTick &&
                    options.endOnTick) {
                    tickAmount = 2;
                }
                if (!tickAmount && this.alignToOthers()) {
                    // Add 1 because 4 tick intervals require 5 ticks (including first
                    // and last)
                    tickAmount = Math.ceil(this.len / tickPixelInterval) + 1;
                }
                // For tick amounts of 2 and 3, compute five ticks and remove the
                // intermediate ones. This prevents the axis from adding ticks that are
                // too far away from the data extremes.
                if (tickAmount < 4) {
                    this.finalTickAmt = tickAmount;
                    tickAmount = 5;
                }
                this.tickAmount = tickAmount;
            };
            /**
             * When using multiple axes, adjust the number of ticks to match the highest
             * number of ticks in that group.
             *
             * @private
             * @function Highcharts.Axis#adjustTickAmount
             */
            Axis.prototype.adjustTickAmount = function () {
                var axis = this, finalTickAmt = axis.finalTickAmt, max = axis.max, min = axis.min, options = axis.options, tickPositions = axis.tickPositions, tickAmount = axis.tickAmount, thresholdAlignment = axis.thresholdAlignment, currentTickAmount = tickPositions && tickPositions.length, threshold = pick(axis.threshold, axis.softThreshold ? 0 : null);
                var len, i, tickInterval = axis.tickInterval, thresholdTickIndex;
                var 
                // Extend the tickPositions by appending a position
                append = function () { return tickPositions.push(correctFloat(tickPositions[tickPositions.length - 1] +
                    tickInterval)); }, 
                // Extend the tickPositions by prepending a position
                prepend = function () { return tickPositions.unshift(correctFloat(tickPositions[0] - tickInterval)); };
                // If `thresholdAlignment` is a number, it means the `alignThresholds`
                // option is true. The `thresholdAlignment` is a scalar value between 0
                // and 1 for where the threshold should be relative to `axis.min` and
                // `axis.max`. Now that we know the tick amount, convert this to the
                // tick index. Unless `thresholdAlignment` is exactly 0 or 1, avoid the
                // first or last tick because that would lead to series being clipped.
                if (isNumber(thresholdAlignment)) {
                    thresholdTickIndex = thresholdAlignment < 0.5 ?
                        Math.ceil(thresholdAlignment * (tickAmount - 1)) :
                        Math.floor(thresholdAlignment * (tickAmount - 1));
                    if (options.reversed) {
                        thresholdTickIndex = tickAmount - 1 - thresholdTickIndex;
                    }
                }
                if (axis.hasData() && isNumber(min) && isNumber(max)) { // #14769
                    // Adjust extremes and translation to the modified tick positions
                    var adjustExtremes = function () {
                        axis.transA *= (currentTickAmount - 1) / (tickAmount - 1);
                        // Do not crop when ticks are not extremes (#9841)
                        axis.min = options.startOnTick ?
                            tickPositions[0] :
                            Math.min(min, tickPositions[0]);
                        axis.max = options.endOnTick ?
                            tickPositions[tickPositions.length - 1] :
                            Math.max(max, tickPositions[tickPositions.length - 1]);
                    };
                    // When the axis is subject to the alignThresholds option. Use
                    // axis.threshold because the local threshold includes the
                    // `softThreshold`.
                    if (isNumber(thresholdTickIndex) && isNumber(axis.threshold)) {
                        // Throw away the previously computed tickPositions and start
                        // from scratch with only the threshold itself, then add ticks
                        // below the threshold first, then fill up above the threshold.
                        // If we are not able to fill up to axis.max, double the
                        // tickInterval and run again.
                        while (tickPositions[thresholdTickIndex] !== threshold ||
                            tickPositions.length !== tickAmount ||
                            tickPositions[0] > min ||
                            tickPositions[tickPositions.length - 1] < max) {
                            tickPositions.length = 0;
                            tickPositions.push(axis.threshold);
                            while (tickPositions.length < tickAmount) {
                                if (
                                // Start by prepending positions until the threshold
                                // is at the required index...
                                tickPositions[thresholdTickIndex] === void 0 ||
                                    tickPositions[thresholdTickIndex] > axis.threshold) {
                                    prepend();
                                }
                                else {
                                    // ... then append positions until we have the
                                    // required length
                                    append();
                                }
                            }
                            // Safety vent
                            if (tickInterval > axis.tickInterval * 8) {
                                break;
                            }
                            tickInterval *= 2;
                        }
                        adjustExtremes();
                    }
                    else if (currentTickAmount < tickAmount) {
                        while (tickPositions.length < tickAmount) {
                            // Extend evenly for both sides unless we're on the
                            // threshold (#3965)
                            if (tickPositions.length % 2 || min === threshold) {
                                append();
                            }
                            else {
                                prepend();
                            }
                        }
                        adjustExtremes();
                    }
                    // The finalTickAmt property is set in getTickAmount
                    if (defined(finalTickAmt)) {
                        i = len = tickPositions.length;
                        while (i--) {
                            if (
                            // Remove every other tick
                            (finalTickAmt === 3 && i % 2 === 1) ||
                                // Remove all but first and last
                                (finalTickAmt <= 2 && i > 0 && i < len - 1)) {
                                tickPositions.splice(i, 1);
                            }
                        }
                        axis.finalTickAmt = void 0;
                    }
                }
            };
            /**
             * Set the scale based on data min and max, user set min and max or options.
             *
             * @private
             * @function Highcharts.Axis#setScale
             *
             * @emits Highcharts.Axis#event:afterSetScale
             */
            Axis.prototype.setScale = function () {
                var axis = this;
                var isDirtyData = false, isXAxisDirty = false;
                axis.series.forEach(function (series) {
                    isDirtyData = isDirtyData || series.isDirtyData || series.isDirty;
                    // When x axis is dirty, we need new data extremes for y as
                    // well:
                    isXAxisDirty = (isXAxisDirty ||
                        (series.xAxis && series.xAxis.isDirty) ||
                        false);
                });
                // set the new axisLength
                axis.setAxisSize();
                var isDirtyAxisLength = axis.len !== (axis.old && axis.old.len);
                // do we really need to go through all this?
                if (isDirtyAxisLength ||
                    isDirtyData ||
                    isXAxisDirty ||
                    axis.isLinked ||
                    axis.forceRedraw ||
                    axis.userMin !== (axis.old && axis.old.userMin) ||
                    axis.userMax !== (axis.old && axis.old.userMax) ||
                    axis.alignToOthers()) {
                    if (axis.stacking) {
                        axis.stacking.resetStacks();
                        axis.stacking.buildStacks();
                    }
                    axis.forceRedraw = false;
                    // #18066 delete minRange property to ensure that it will be
                    // calculated again after dirty data in series
                    if (!axis.userMinRange) {
                        axis.minRange = void 0;
                    }
                    // get data extremes if needed
                    axis.getSeriesExtremes();
                    // get fixed positions based on tickInterval
                    axis.setTickInterval();
                    // Mark as dirty if it is not already set to dirty and extremes have
                    // changed. #595.
                    if (!axis.isDirty) {
                        axis.isDirty =
                            isDirtyAxisLength ||
                                axis.min !== (axis.old && axis.old.min) ||
                                axis.max !== (axis.old && axis.old.max);
                    }
                }
                else if (axis.stacking) {
                    axis.stacking.cleanStacks();
                }
                // Recalculate panning state object, when the data
                // has changed. It is required when vertical panning is enabled.
                if (isDirtyData && axis.panningState) {
                    axis.panningState.isDirty = true;
                }
                fireEvent(this, 'afterSetScale');
            };
            /**
             * Set the minimum and maximum of the axes after render time. If the
             * `startOnTick` and `endOnTick` options are true, the minimum and maximum
             * values are rounded off to the nearest tick. To prevent this, these
             * options can be set to false before calling setExtremes. Also, setExtremes
             * will not allow a range lower than the `minRange` option, which by default
             * is the range of five points.
             *
             * @sample highcharts/members/axis-setextremes/
             *         Set extremes from a button
             * @sample highcharts/members/axis-setextremes-datetime/
             *         Set extremes on a datetime axis
             * @sample highcharts/members/axis-setextremes-off-ticks/
             *         Set extremes off ticks
             * @sample stock/members/axis-setextremes/
             *         Set extremes in Highcharts Stock
             *
             * @function Highcharts.Axis#setExtremes
             *
             * @param {number} [newMin]
             * The new minimum value.
             *
             * @param {number} [newMax]
             * The new maximum value.
             *
             * @param {boolean} [redraw=true]
             * Whether to redraw the chart or wait for an explicit call to
             * {@link Highcharts.Chart#redraw}
             *
             * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [animation=true]
             * Enable or modify animations.
             *
             * @param {*} [eventArguments]
             * Arguments to be accessed in event handler.
             *
             * @emits Highcharts.Axis#event:setExtremes
             */
            Axis.prototype.setExtremes = function (newMin, newMax, redraw, animation, eventArguments) {
                var axis = this, chart = axis.chart;
                redraw = pick(redraw, true); // defaults to true
                axis.series.forEach(function (serie) {
                    delete serie.kdTree;
                });
                // Extend the arguments with min and max
                eventArguments = extend(eventArguments, {
                    min: newMin,
                    max: newMax
                });
                // Fire the event
                fireEvent(axis, 'setExtremes', eventArguments, function () {
                    axis.userMin = newMin;
                    axis.userMax = newMax;
                    axis.eventArgs = eventArguments;
                    if (redraw) {
                        chart.redraw(animation);
                    }
                });
            };
            /**
             * Overridable method for zooming chart. Pulled out in a separate method to
             * allow overriding in stock charts.
             *
             * @private
             * @function Highcharts.Axis#zoom
             */
            Axis.prototype.zoom = function (newMin, newMax) {
                var axis = this, dataMin = this.dataMin, dataMax = this.dataMax, options = this.options, min = Math.min(dataMin, pick(options.min, dataMin)), max = Math.max(dataMax, pick(options.max, dataMax)), evt = {
                    newMin: newMin,
                    newMax: newMax
                };
                fireEvent(this, 'zoom', evt, function (e) {
                    // Use e.newMin and e.newMax - event handlers may have altered them
                    var newMin = e.newMin, newMax = e.newMax;
                    if (newMin !== axis.min || newMax !== axis.max) { // #5790
                        // Prevent pinch zooming out of range. Check for defined is for
                        // #1946. #1734.
                        if (!axis.allowZoomOutside) {
                            // #6014, sometimes newMax will be smaller than min (or
                            // newMin will be larger than max).
                            if (defined(dataMin)) {
                                if (newMin < min) {
                                    newMin = min;
                                }
                                if (newMin > max) {
                                    newMin = max;
                                }
                            }
                            if (defined(dataMax)) {
                                if (newMax < min) {
                                    newMax = min;
                                }
                                if (newMax > max) {
                                    newMax = max;
                                }
                            }
                        }
                        // In full view, displaying the reset zoom button is not
                        // required
                        axis.displayBtn = (typeof newMin !== 'undefined' ||
                            typeof newMax !== 'undefined');
                        // Do it
                        axis.setExtremes(newMin, newMax, false, void 0, { trigger: 'zoom' });
                    }
                    e.zoomed = true;
                });
                return evt.zoomed;
            };
            /**
             * Update the axis metrics.
             *
             * @private
             * @function Highcharts.Axis#setAxisSize
             */
            Axis.prototype.setAxisSize = function () {
                var chart = this.chart, options = this.options, 
                // [top, right, bottom, left]
                offsets = options.offsets || [0, 0, 0, 0], horiz = this.horiz, 
                // Check for percentage based input values. Rounding fixes problems
                // with column overflow and plot line filtering (#4898, #4899)
                width = this.width = Math.round(relativeLength(pick(options.width, chart.plotWidth - offsets[3] + offsets[1]), chart.plotWidth)), height = this.height = Math.round(relativeLength(pick(options.height, chart.plotHeight - offsets[0] + offsets[2]), chart.plotHeight)), top = this.top = Math.round(relativeLength(pick(options.top, chart.plotTop + offsets[0]), chart.plotHeight, chart.plotTop)), left = this.left = Math.round(relativeLength(pick(options.left, chart.plotLeft + offsets[3]), chart.plotWidth, chart.plotLeft));
                // Expose basic values to use in Series object and navigator
                this.bottom = chart.chartHeight - height - top;
                this.right = chart.chartWidth - width - left;
                // Direction agnostic properties
                this.len = Math.max(horiz ? width : height, 0); // Math.max fixes #905
                this.pos = horiz ? left : top; // distance from SVG origin
            };
            /**
             * Get the current extremes for the axis.
             *
             * @sample highcharts/members/axis-getextremes/
             *         Report extremes by click on a button
             *
             * @function Highcharts.Axis#getExtremes
             *
             * @return {Highcharts.ExtremesObject}
             * An object containing extremes information.
             */
            Axis.prototype.getExtremes = function () {
                var axis = this, log = axis.logarithmic;
                return {
                    min: log ?
                        correctFloat(log.lin2log(axis.min)) :
                        axis.min,
                    max: log ?
                        correctFloat(log.lin2log(axis.max)) :
                        axis.max,
                    dataMin: axis.dataMin,
                    dataMax: axis.dataMax,
                    userMin: axis.userMin,
                    userMax: axis.userMax
                };
            };
            /**
             * Get the zero plane either based on zero or on the min or max value.
             * Used in bar and area plots.
             *
             * @function Highcharts.Axis#getThreshold
             *
             * @param {number} threshold
             * The threshold in axis values.
             *
             * @return {number}
             * The translated threshold position in terms of pixels, and corrected to
             * stay within the axis bounds.
             */
            Axis.prototype.getThreshold = function (threshold) {
                var axis = this, log = axis.logarithmic, realMin = log ? log.lin2log(axis.min) : axis.min, realMax = log ? log.lin2log(axis.max) : axis.max;
                if (threshold === null || threshold === -Infinity) {
                    threshold = realMin;
                }
                else if (threshold === Infinity) {
                    threshold = realMax;
                }
                else if (realMin > threshold) {
                    threshold = realMin;
                }
                else if (realMax < threshold) {
                    threshold = realMax;
                }
                return axis.translate(threshold, 0, 1, 0, 1);
            };
            /**
             * Compute auto alignment for the axis label based on which side the axis is
             * on and the given rotation for the label.
             *
             * @private
             * @function Highcharts.Axis#autoLabelAlign
             *
             * @param {number} rotation
             * The rotation in degrees as set by either the `rotation` or `autoRotation`
             * options.
             *
             * @return {Highcharts.AlignValue}
             * Can be `"center"`, `"left"` or `"right"`.
             */
            Axis.prototype.autoLabelAlign = function (rotation) {
                var angle = (pick(rotation, 0) - (this.side * 90) + 720) % 360, evt = { align: 'center' };
                fireEvent(this, 'autoLabelAlign', evt, function (e) {
                    if (angle > 15 && angle < 165) {
                        e.align = 'right';
                    }
                    else if (angle > 195 && angle < 345) {
                        e.align = 'left';
                    }
                });
                return evt.align;
            };
            /**
             * Get the tick length and width for the axis based on axis options.
             *
             * @private
             * @function Highcharts.Axis#tickSize
             *
             * @param {string} [prefix]
             * 'tick' or 'minorTick'
             *
             * @return {Array<number,number>|undefined}
             * An array of tickLength and tickWidth
             */
            Axis.prototype.tickSize = function (prefix) {
                var options = this.options, tickWidth = pick(options[prefix === 'tick' ? 'tickWidth' : 'minorTickWidth'], 
                // Default to 1 on linear and datetime X axes
                prefix === 'tick' && this.isXAxis && !this.categories ? 1 : 0);
                var tickLength = options[prefix === 'tick' ? 'tickLength' : 'minorTickLength'], tickSize;
                if (tickWidth && tickLength) {
                    // Negate the length
                    if (options[prefix + 'Position'] === 'inside') {
                        tickLength = -tickLength;
                    }
                    tickSize = [tickLength, tickWidth];
                }
                var e = { tickSize: tickSize };
                fireEvent(this, 'afterTickSize', e);
                return e.tickSize;
            };
            /**
             * Return the size of the labels.
             *
             * @private
             * @function Highcharts.Axis#labelMetrics
             */
            Axis.prototype.labelMetrics = function () {
                var renderer = this.chart.renderer, ticks = this.ticks, tick = ticks[Object.keys(ticks)[0]] || {};
                return this.chart.renderer.fontMetrics(tick.label ||
                    tick.movedLabel ||
                    renderer.box);
            };
            /**
             * Prevent the ticks from getting so close we can't draw the labels. On a
             * horizontal axis, this is handled by rotating the labels, removing ticks
             * and adding ellipsis. On a vertical axis remove ticks and add ellipsis.
             *
             * @private
             * @function Highcharts.Axis#unsquish
             */
            Axis.prototype.unsquish = function () {
                var labelOptions = this.options.labels, horiz = this.horiz, tickInterval = this.tickInterval, slotSize = this.len / (((this.categories ? 1 : 0) +
                    this.max -
                    this.min) /
                    tickInterval), rotationOption = labelOptions.rotation, 
                // We don't know the actual rendered line height at this point, but
                // it defaults to 0.75em
                lineHeight = this.labelMetrics().h * 0.75, range = Math.max(this.max - this.min, 0), 
                // Return the multiple of tickInterval that is needed to avoid
                // collision
                getStep = function (spaceNeeded) {
                    var step = spaceNeeded / (slotSize || 1);
                    step = step > 1 ? Math.ceil(step) : 1;
                    // Guard for very small or negative angles (#9835)
                    if (step * tickInterval > range &&
                        spaceNeeded !== Infinity &&
                        slotSize !== Infinity &&
                        range) {
                        step = Math.ceil(range / tickInterval);
                    }
                    return correctFloat(step * tickInterval);
                };
                var newTickInterval = tickInterval, rotation, bestScore = Number.MAX_VALUE, autoRotation;
                if (horiz) {
                    if (!labelOptions.staggerLines) {
                        if (isNumber(rotationOption)) {
                            autoRotation = [rotationOption];
                        }
                        else if (slotSize < labelOptions.autoRotationLimit) {
                            autoRotation = labelOptions.autoRotation;
                        }
                    }
                    if (autoRotation) {
                        var step = void 0, score = void 0;
                        // Loop over the given autoRotation options, and determine which
                        // gives the best score. The best score is that with the lowest
                        // number of steps and a rotation closest to horizontal.
                        for (var _i = 0, autoRotation_1 = autoRotation; _i < autoRotation_1.length; _i++) {
                            var rot = autoRotation_1[_i];
                            if (rot === rotationOption ||
                                (rot && rot >= -90 && rot <= 90)) { // #3891
                                step = getStep(Math.abs(lineHeight / Math.sin(deg2rad * rot)));
                                score = step + Math.abs(rot / 360);
                                if (score < bestScore) {
                                    bestScore = score;
                                    rotation = rot;
                                    newTickInterval = step;
                                }
                            }
                        }
                    }
                }
                else { // #4411
                    newTickInterval = getStep(lineHeight);
                }
                this.autoRotation = autoRotation;
                this.labelRotation = pick(rotation, isNumber(rotationOption) ? rotationOption : 0);
                return labelOptions.step ? tickInterval : newTickInterval;
            };
            /**
             * Get the general slot width for labels/categories on this axis. This may
             * change between the pre-render (from Axis.getOffset) and the final tick
             * rendering and placement.
             *
             * @private
             * @function Highcharts.Axis#getSlotWidth
             *
             * @param {Highcharts.Tick} [tick] Optionally, calculate the slot width
             * basing on tick label. It is used in highcharts-3d module, where the slots
             * has different widths depending on perspective angles.
             *
             * @return {number}
             * The pixel width allocated to each axis label.
             */
            Axis.prototype.getSlotWidth = function (tick) {
                // #5086, #1580, #1931
                var chart = this.chart, horiz = this.horiz, labelOptions = this.options.labels, slotCount = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), marginLeft = chart.margin[3];
                // Used by grid axis
                if (tick && isNumber(tick.slotWidth)) { // #13221, can be 0
                    return tick.slotWidth;
                }
                if (horiz && labelOptions.step < 2) {
                    if (labelOptions.rotation) { // #4415
                        return 0;
                    }
                    return ((this.staggerLines || 1) * this.len) / slotCount;
                }
                if (!horiz) {
                    // #7028
                    var cssWidth = labelOptions.style.width;
                    if (cssWidth !== void 0) {
                        return parseInt(String(cssWidth), 10);
                    }
                    if (marginLeft) {
                        return marginLeft - chart.spacing[3];
                    }
                }
                // Last resort, a fraction of the available size
                return chart.chartWidth * 0.33;
            };
            /**
             * Render the axis labels and determine whether ellipsis or rotation need to
             * be applied.
             *
             * @private
             * @function Highcharts.Axis#renderUnsquish
             */
            Axis.prototype.renderUnsquish = function () {
                var chart = this.chart, renderer = chart.renderer, tickPositions = this.tickPositions, ticks = this.ticks, labelOptions = this.options.labels, labelStyleOptions = labelOptions.style, horiz = this.horiz, slotWidth = this.getSlotWidth(), innerWidth = Math.max(1, Math.round(slotWidth - 2 * labelOptions.padding)), attr = {}, labelMetrics = this.labelMetrics(), textOverflowOption = labelStyleOptions.textOverflow;
                var commonWidth, commonTextOverflow, maxLabelLength = 0, label, i, pos;
                // Set rotation option unless it is "auto", like in gauges
                if (!isString(labelOptions.rotation)) {
                    // #4443
                    attr.rotation = labelOptions.rotation || 0;
                }
                // Get the longest label length
                tickPositions.forEach(function (tickPosition) {
                    var tick = ticks[tickPosition];
                    // Replace label - sorting animation
                    if (tick.movedLabel) {
                        tick.replaceMovedLabel();
                    }
                    if (tick &&
                        tick.label &&
                        tick.label.textPxLength > maxLabelLength) {
                        maxLabelLength = tick.label.textPxLength;
                    }
                });
                this.maxLabelLength = maxLabelLength;
                // Handle auto rotation on horizontal axis
                if (this.autoRotation) {
                    // Apply rotation only if the label is too wide for the slot, and
                    // the label is wider than its height.
                    if (maxLabelLength > innerWidth &&
                        maxLabelLength > labelMetrics.h) {
                        attr.rotation = this.labelRotation;
                    }
                    else {
                        this.labelRotation = 0;
                    }
                    // Handle word-wrap or ellipsis on vertical axis
                }
                else if (slotWidth) {
                    // For word-wrap or ellipsis
                    commonWidth = innerWidth;
                    if (!textOverflowOption) {
                        commonTextOverflow = 'clip';
                        // On vertical axis, only allow word wrap if there is room
                        // for more lines.
                        i = tickPositions.length;
                        while (!horiz && i--) {
                            pos = tickPositions[i];
                            label = ticks[pos].label;
                            if (label) {
                                // Reset ellipsis in order to get the correct
                                // bounding box (#4070)
                                if (label.styles &&
                                    label.styles.textOverflow === 'ellipsis') {
                                    label.css({ textOverflow: 'clip' });
                                    // Set the correct width in order to read
                                    // the bounding box height (#4678, #5034)
                                }
                                else if (label.textPxLength > slotWidth) {
                                    label.css({ width: slotWidth + 'px' });
                                }
                                if (label.getBBox().height > (this.len / tickPositions.length -
                                    (labelMetrics.h - labelMetrics.f))) {
                                    label.specificTextOverflow = 'ellipsis';
                                }
                            }
                        }
                    }
                }
                // Add ellipsis if the label length is significantly longer than ideal
                if (attr.rotation) {
                    commonWidth = (maxLabelLength > chart.chartHeight * 0.5 ?
                        chart.chartHeight * 0.33 :
                        maxLabelLength);
                    if (!textOverflowOption) {
                        commonTextOverflow = 'ellipsis';
                    }
                }
                // Set the explicit or automatic label alignment
                this.labelAlign = labelOptions.align ||
                    this.autoLabelAlign(this.labelRotation);
                if (this.labelAlign) {
                    attr.align = this.labelAlign;
                }
                // Apply general and specific CSS
                tickPositions.forEach(function (pos) {
                    var tick = ticks[pos], label = tick && tick.label, widthOption = labelStyleOptions.width, css = {};
                    if (label) {
                        // This needs to go before the CSS in old IE (#4502)
                        label.attr(attr);
                        if (tick.shortenLabel) {
                            tick.shortenLabel();
                        }
                        else if (commonWidth &&
                            !widthOption &&
                            // Setting width in this case messes with the bounding box
                            // (#7975)
                            labelStyleOptions.whiteSpace !== 'nowrap' &&
                            (
                            // Speed optimizing, #7656
                            commonWidth < label.textPxLength ||
                                // Resetting CSS, #4928
                                label.element.tagName === 'SPAN')) {
                            css.width = commonWidth + 'px';
                            if (!textOverflowOption) {
                                css.textOverflow = (label.specificTextOverflow ||
                                    commonTextOverflow);
                            }
                            label.css(css);
                            // Reset previously shortened label (#8210)
                        }
                        else if (label.styles &&
                            label.styles.width &&
                            !css.width &&
                            !widthOption) {
                            label.css({ width: null });
                        }
                        delete label.specificTextOverflow;
                        tick.rotation = attr.rotation;
                    }
                }, this);
                // Note: Why is this not part of getLabelPosition?
                this.tickRotCorr = renderer.rotCorr(labelMetrics.b, this.labelRotation || 0, this.side !== 0);
            };
            /**
             * Return true if the axis has associated data.
             *
             * @function Highcharts.Axis#hasData
             *
             * @return {boolean}
             * True if the axis has associated visible series and those series have
             * either valid data points or explicit `min` and `max` settings.
             */
            Axis.prototype.hasData = function () {
                return this.series.some(function (s) {
                    return s.hasData();
                }) ||
                    (this.options.showEmpty &&
                        defined(this.min) &&
                        defined(this.max));
            };
            /**
             * Adds the title defined in axis.options.title.
             *
             * @function Highcharts.Axis#addTitle
             *
             * @param {boolean} [display]
             * Whether or not to display the title.
             */
            Axis.prototype.addTitle = function (display) {
                var axis = this, renderer = axis.chart.renderer, horiz = axis.horiz, opposite = axis.opposite, options = axis.options, axisTitleOptions = options.title, styledMode = axis.chart.styledMode;
                var textAlign;
                if (!axis.axisTitle) {
                    textAlign = axisTitleOptions.textAlign;
                    if (!textAlign) {
                        textAlign = (horiz ? {
                            low: 'left',
                            middle: 'center',
                            high: 'right'
                        } : {
                            low: opposite ? 'right' : 'left',
                            middle: 'center',
                            high: opposite ? 'left' : 'right'
                        })[axisTitleOptions.align];
                    }
                    axis.axisTitle = renderer
                        .text(axisTitleOptions.text || '', 0, 0, axisTitleOptions.useHTML)
                        .attr({
                        zIndex: 7,
                        rotation: axisTitleOptions.rotation,
                        align: textAlign
                    })
                        .addClass('highcharts-axis-title');
                    // #7814, don't mutate style option
                    if (!styledMode) {
                        axis.axisTitle.css(merge(axisTitleOptions.style));
                    }
                    axis.axisTitle.add(axis.axisGroup);
                    axis.axisTitle.isNew = true;
                }
                // Max width defaults to the length of the axis
                if (!styledMode &&
                    !axisTitleOptions.style.width &&
                    !axis.isRadial) {
                    axis.axisTitle.css({
                        width: axis.len + 'px'
                    });
                }
                // hide or show the title depending on whether showEmpty is set
                axis.axisTitle[display ? 'show' : 'hide'](display);
            };
            /**
             * Generates a tick for initial positioning.
             *
             * @private
             * @function Highcharts.Axis#generateTick
             *
             * @param {number} pos
             * The tick position in axis values.
             *
             * @param {number} [i]
             * The index of the tick in {@link Axis.tickPositions}.
             */
            Axis.prototype.generateTick = function (pos) {
                var axis = this, ticks = axis.ticks;
                if (!ticks[pos]) {
                    ticks[pos] = new Tick(axis, pos);
                }
                else {
                    ticks[pos].addLabel(); // update labels depending on tick interval
                }
            };
            /**
             * Render the tick labels to a preliminary position to get their sizes
             *
             * @private
             * @function Highcharts.Axis#getOffset
             *
             * @emits Highcharts.Axis#event:afterGetOffset
             */
            Axis.prototype.getOffset = function () {
                var _this = this;
                var axis = this, chart = axis.chart, horiz = axis.horiz, options = axis.options, side = axis.side, ticks = axis.ticks, tickPositions = axis.tickPositions, coll = axis.coll, axisParent = axis.axisParent // Used in color axis
                , renderer = chart.renderer, invertedSide = (chart.inverted && !axis.isZAxis ?
                    [1, 0, 3, 2][side] :
                    side), hasData = axis.hasData(), axisTitleOptions = options.title, labelOptions = options.labels, hasCrossing = isNumber(options.crossing), axisOffset = chart.axisOffset, clipOffset = chart.clipOffset, directionFactor = [-1, 1, 1, -1][side], className = options.className;
                var showAxis, titleOffset = 0, titleOffsetOption, titleMargin = 0, labelOffset = 0, // reset
                labelOffsetPadded, lineHeightCorrection;
                // For reuse in Axis.render
                axis.showAxis = showAxis = hasData || options.showEmpty;
                // Set/reset staggerLines
                axis.staggerLines = (axis.horiz && labelOptions.staggerLines) || void 0;
                // Create the axisGroup and gridGroup elements on first iteration
                if (!axis.axisGroup) {
                    var createGroup = function (name, suffix, zIndex) { return renderer.g(name)
                        .attr({ zIndex: zIndex })
                        .addClass("highcharts-".concat(coll.toLowerCase()).concat(suffix, " ") +
                        (_this.isRadial ? "highcharts-radial-axis".concat(suffix, " ") : '') +
                        (className || ''))
                        .add(axisParent); };
                    axis.gridGroup = createGroup('grid', '-grid', options.gridZIndex);
                    axis.axisGroup = createGroup('axis', '', options.zIndex);
                    axis.labelGroup = createGroup('axis-labels', '-labels', labelOptions.zIndex);
                }
                if (hasData || axis.isLinked) {
                    // Generate ticks
                    tickPositions.forEach(function (pos) {
                        // i is not used here, but may be used in overrides
                        axis.generateTick(pos);
                    });
                    axis.renderUnsquish();
                    // Left side must be align: right and right side must
                    // have align: left for labels
                    axis.reserveSpaceDefault = (side === 0 ||
                        side === 2 ||
                        { 1: 'left', 3: 'right' }[side] === axis.labelAlign);
                    if (pick(labelOptions.reserveSpace, hasCrossing ? false : null, axis.labelAlign === 'center' ? true : null, axis.reserveSpaceDefault)) {
                        tickPositions.forEach(function (pos) {
                            // get the highest offset
                            labelOffset = Math.max(ticks[pos].getLabelSize(), labelOffset);
                        });
                    }
                    if (axis.staggerLines) {
                        labelOffset *= axis.staggerLines;
                    }
                    axis.labelOffset = labelOffset * (axis.opposite ? -1 : 1);
                }
                else { // doesn't have data
                    objectEach(ticks, function (tick, n) {
                        tick.destroy();
                        delete ticks[n];
                    });
                }
                if (axisTitleOptions &&
                    axisTitleOptions.text &&
                    axisTitleOptions.enabled !== false) {
                    axis.addTitle(showAxis);
                    if (showAxis &&
                        !hasCrossing &&
                        axisTitleOptions.reserveSpace !== false) {
                        axis.titleOffset = titleOffset =
                            axis.axisTitle.getBBox()[horiz ? 'height' : 'width'];
                        titleOffsetOption = axisTitleOptions.offset;
                        titleMargin = defined(titleOffsetOption) ?
                            0 :
                            pick(axisTitleOptions.margin, horiz ? 5 : 10);
                    }
                }
                // Render the axis line
                axis.renderLine();
                // handle automatic or user set offset
                axis.offset = directionFactor * pick(options.offset, axisOffset[side] ? axisOffset[side] + (options.margin || 0) : 0);
                axis.tickRotCorr = axis.tickRotCorr || { x: 0, y: 0 }; // polar
                if (side === 0) {
                    lineHeightCorrection = -axis.labelMetrics().h;
                }
                else if (side === 2) {
                    lineHeightCorrection = axis.tickRotCorr.y;
                }
                else {
                    lineHeightCorrection = 0;
                }
                // Find the padded label offset
                labelOffsetPadded = Math.abs(labelOffset) + titleMargin;
                if (labelOffset) {
                    labelOffsetPadded -= lineHeightCorrection;
                    labelOffsetPadded += directionFactor * (horiz ?
                        pick(labelOptions.y, axis.tickRotCorr.y +
                            directionFactor * labelOptions.distance) :
                        pick(labelOptions.x, directionFactor * labelOptions.distance));
                }
                axis.axisTitleMargin = pick(titleOffsetOption, labelOffsetPadded);
                if (axis.getMaxLabelDimensions) {
                    axis.maxLabelDimensions = axis.getMaxLabelDimensions(ticks, tickPositions);
                }
                // Due to GridAxis.tickSize, tickSize should be calculated after ticks
                // has rendered.
                if (coll !== 'colorAxis') {
                    var tickSize = this.tickSize('tick');
                    axisOffset[side] = Math.max(axisOffset[side], (axis.axisTitleMargin || 0) + titleOffset +
                        directionFactor * axis.offset, labelOffsetPadded, // #3027
                    tickPositions && tickPositions.length && tickSize ?
                        tickSize[0] + directionFactor * axis.offset :
                        0 // #4866
                    );
                    // Decide the clipping needed to keep the graph inside
                    // the plot area and axis lines
                    var clip = !axis.axisLine || options.offset ?
                        0 :
                        // #4308, #4371:
                        Math.floor(axis.axisLine.strokeWidth() / 2) * 2;
                    clipOffset[invertedSide] =
                        Math.max(clipOffset[invertedSide], clip);
                }
                fireEvent(this, 'afterGetOffset');
            };
            /**
             * Internal function to get the path for the axis line. Extended for polar
             * charts.
             *
             * @function Highcharts.Axis#getLinePath
             *
             * @param {number} lineWidth
             * The line width in pixels.
             *
             * @return {Highcharts.SVGPathArray}
             * The SVG path definition in array form.
             */
            Axis.prototype.getLinePath = function (lineWidth) {
                var chart = this.chart, opposite = this.opposite, offset = this.offset, horiz = this.horiz, lineLeft = this.left + (opposite ? this.width : 0) + offset, lineTop = chart.chartHeight - this.bottom -
                    (opposite ? this.height : 0) + offset;
                if (opposite) {
                    lineWidth *= -1; // crispify the other way - #1480, #1687
                }
                return chart.renderer
                    .crispLine([
                    [
                        'M',
                        horiz ?
                            this.left :
                            lineLeft,
                        horiz ?
                            lineTop :
                            this.top
                    ],
                    [
                        'L',
                        horiz ?
                            chart.chartWidth - this.right :
                            lineLeft,
                        horiz ?
                            lineTop :
                            chart.chartHeight - this.bottom
                    ]
                ], lineWidth);
            };
            /**
             * Render the axis line. Called internally when rendering and redrawing the
             * axis.
             *
             * @function Highcharts.Axis#renderLine
             */
            Axis.prototype.renderLine = function () {
                if (!this.axisLine) {
                    this.axisLine = this.chart.renderer.path()
                        .addClass('highcharts-axis-line')
                        .add(this.axisGroup);
                    if (!this.chart.styledMode) {
                        this.axisLine.attr({
                            stroke: this.options.lineColor,
                            'stroke-width': this.options.lineWidth,
                            zIndex: 7
                        });
                    }
                }
            };
            /**
             * Position the axis title.
             *
             * @private
             * @function Highcharts.Axis#getTitlePosition
             *
             * @return {Highcharts.PositionObject}
             * X and Y positions for the title.
             */
            Axis.prototype.getTitlePosition = function (axisTitle) {
                // compute anchor points for each of the title align options
                var horiz = this.horiz, axisLeft = this.left, axisTop = this.top, axisLength = this.len, axisTitleOptions = this.options.title, margin = horiz ? axisLeft : axisTop, opposite = this.opposite, offset = this.offset, xOption = axisTitleOptions.x, yOption = axisTitleOptions.y, fontMetrics = this.chart.renderer.fontMetrics(axisTitle), 
                // The part of a multiline text that is below the baseline of the
                // first line. Subtract 1 to preserve pixel-perfectness from the
                // old behaviour (v5.0.12), where only one line was allowed.
                textHeightOvershoot = axisTitle ? Math.max(axisTitle.getBBox(false, 0).height - fontMetrics.h - 1, 0) : 0, 
                // the position in the length direction of the axis
                alongAxis = ({
                    low: margin + (horiz ? 0 : axisLength),
                    middle: margin + axisLength / 2,
                    high: margin + (horiz ? axisLength : 0)
                })[axisTitleOptions.align], 
                // the position in the perpendicular direction of the axis
                offAxis = (horiz ? axisTop + this.height : axisLeft) +
                    (horiz ? 1 : -1) * // horizontal axis reverses the margin
                        (opposite ? -1 : 1) * // so does opposite axes
                        (this.axisTitleMargin || 0) +
                    [
                        -textHeightOvershoot,
                        textHeightOvershoot,
                        fontMetrics.f,
                        -textHeightOvershoot // left
                    ][this.side], titlePosition = {
                    x: horiz ?
                        alongAxis + xOption :
                        offAxis + (opposite ? this.width : 0) + offset + xOption,
                    y: horiz ?
                        offAxis + yOption - (opposite ? this.height : 0) + offset :
                        alongAxis + yOption
                };
                fireEvent(this, 'afterGetTitlePosition', { titlePosition: titlePosition });
                return titlePosition;
            };
            /**
             * Render a minor tick into the given position. If a minor tick already
             * exists in this position, move it.
             *
             * @function Highcharts.Axis#renderMinorTick
             *
             * @param {number} pos
             * The position in axis values.
             *
             * @param {boolean} slideIn
             * Whether the tick should animate in from last computed position
             */
            Axis.prototype.renderMinorTick = function (pos, slideIn) {
                var axis = this;
                var minorTicks = axis.minorTicks;
                if (!minorTicks[pos]) {
                    minorTicks[pos] = new Tick(axis, pos, 'minor');
                }
                // Render new ticks in old position
                if (slideIn && minorTicks[pos].isNew) {
                    minorTicks[pos].render(null, true);
                }
                minorTicks[pos].render(null, false, 1);
            };
            /**
             * Render a major tick into the given position. If a tick already exists
             * in this position, move it.
             *
             * @function Highcharts.Axis#renderTick
             *
             * @param {number} pos
             * The position in axis values.
             *
             * @param {number} i
             * The tick index.
             *
             * @param {boolean} slideIn
             * Whether the tick should animate in from last computed position
             */
            Axis.prototype.renderTick = function (pos, i, slideIn) {
                var axis = this, isLinked = axis.isLinked, ticks = axis.ticks;
                // Linked axes need an extra check to find out if
                if (!isLinked ||
                    (pos >= axis.min && pos <= axis.max) ||
                    (axis.grid && axis.grid.isColumn)) {
                    if (!ticks[pos]) {
                        ticks[pos] = new Tick(axis, pos);
                    }
                    // NOTE this seems like overkill. Could be handled in tick.render by
                    // setting old position in attr, then set new position in animate.
                    // render new ticks in old position
                    if (slideIn && ticks[pos].isNew) {
                        // Start with negative opacity so that it is visible from
                        // halfway into the animation
                        ticks[pos].render(i, true, -1);
                    }
                    ticks[pos].render(i);
                }
            };
            /**
             * Render the axis.
             *
             * @private
             * @function Highcharts.Axis#render
             *
             * @emits Highcharts.Axis#event:afterRender
             */
            Axis.prototype.render = function () {
                var axis = this, chart = axis.chart, log = axis.logarithmic, renderer = chart.renderer, options = axis.options, isLinked = axis.isLinked, tickPositions = axis.tickPositions, axisTitle = axis.axisTitle, ticks = axis.ticks, minorTicks = axis.minorTicks, alternateBands = axis.alternateBands, stackLabelOptions = options.stackLabels, alternateGridColor = options.alternateGridColor, crossing = options.crossing, tickmarkOffset = axis.tickmarkOffset, axisLine = axis.axisLine, showAxis = axis.showAxis, animation = animObject(renderer.globalAnimation);
                var from, to;
                // Reset
                axis.labelEdge.length = 0;
                axis.overlap = false;
                // Mark all elements inActive before we go over and mark the active ones
                [ticks, minorTicks, alternateBands].forEach(function (coll) {
                    objectEach(coll, function (tick) {
                        tick.isActive = false;
                    });
                });
                // Crossing
                if (isNumber(crossing)) {
                    var otherAxis = this.isXAxis ? chart.yAxis[0] : chart.xAxis[0], directionFactor = [1, -1, -1, 1][this.side];
                    if (otherAxis) {
                        var px = otherAxis.toPixels(crossing, true);
                        if (axis.horiz) {
                            px = otherAxis.len - px;
                        }
                        axis.offset = directionFactor * px;
                    }
                }
                // If the series has data draw the ticks. Else only the line and title
                if (axis.hasData() || isLinked) {
                    var slideInTicks_1 = axis.chart.hasRendered &&
                        axis.old && isNumber(axis.old.min);
                    // minor ticks
                    if (axis.minorTickInterval && !axis.categories) {
                        axis.getMinorTickPositions().forEach(function (pos) {
                            axis.renderMinorTick(pos, slideInTicks_1);
                        });
                    }
                    // Major ticks. Pull out the first item and render it last so that
                    // we can get the position of the neighbour label. #808.
                    if (tickPositions.length) { // #1300
                        tickPositions.forEach(function (pos, i) {
                            axis.renderTick(pos, i, slideInTicks_1);
                        });
                        // In a categorized axis, the tick marks are displayed
                        // between labels. So we need to add a tick mark and
                        // grid line at the left edge of the X axis.
                        if (tickmarkOffset && (axis.min === 0 || axis.single)) {
                            if (!ticks[-1]) {
                                ticks[-1] = new Tick(axis, -1, null, true);
                            }
                            ticks[-1].render(-1);
                        }
                    }
                    // alternate grid color
                    if (alternateGridColor) {
                        tickPositions.forEach(function (pos, i) {
                            to = typeof tickPositions[i + 1] !== 'undefined' ?
                                tickPositions[i + 1] + tickmarkOffset :
                                axis.max - tickmarkOffset;
                            if (i % 2 === 0 &&
                                pos < axis.max &&
                                to <= axis.max + (chart.polar ?
                                    -tickmarkOffset :
                                    tickmarkOffset)) { // #2248, #4660
                                if (!alternateBands[pos]) {
                                    // Should be imported from PlotLineOrBand.js, but
                                    // the dependency cycle with axis is a problem
                                    alternateBands[pos] = new H.PlotLineOrBand(axis);
                                }
                                from = pos + tickmarkOffset; // #949
                                alternateBands[pos].options = {
                                    from: log ? log.lin2log(from) : from,
                                    to: log ? log.lin2log(to) : to,
                                    color: alternateGridColor,
                                    className: 'highcharts-alternate-grid'
                                };
                                alternateBands[pos].render();
                                alternateBands[pos].isActive = true;
                            }
                        });
                    }
                    // custom plot lines and bands
                    if (!axis._addedPlotLB) { // only first time
                        axis._addedPlotLB = true;
                        (options.plotLines || [])
                            .concat(options.plotBands || [])
                            .forEach(function (plotLineOptions) {
                            axis
                                .addPlotBandOrLine(plotLineOptions);
                        });
                    }
                } // end if hasData
                // Remove inactive ticks
                [ticks, minorTicks, alternateBands].forEach(function (coll) {
                    var forDestruction = [], delay = animation.duration, destroyInactiveItems = function () {
                        var i = forDestruction.length;
                        while (i--) {
                            // When resizing rapidly, the same items
                            // may be destroyed in different timeouts,
                            // or the may be reactivated
                            if (coll[forDestruction[i]] &&
                                !coll[forDestruction[i]].isActive) {
                                coll[forDestruction[i]].destroy();
                                delete coll[forDestruction[i]];
                            }
                        }
                    };
                    objectEach(coll, function (tick, pos) {
                        if (!tick.isActive) {
                            // Render to zero opacity
                            tick.render(pos, false, 0);
                            tick.isActive = false;
                            forDestruction.push(pos);
                        }
                    });
                    // When the objects are finished fading out, destroy them
                    syncTimeout(destroyInactiveItems, coll === alternateBands ||
                        !chart.hasRendered ||
                        !delay ?
                        0 :
                        delay);
                });
                // Set the axis line path
                if (axisLine) {
                    axisLine[axisLine.isPlaced ? 'animate' : 'attr']({
                        d: this.getLinePath(axisLine.strokeWidth())
                    });
                    axisLine.isPlaced = true;
                    // Show or hide the line depending on options.showEmpty
                    axisLine[showAxis ? 'show' : 'hide'](showAxis);
                }
                if (axisTitle && showAxis) {
                    axisTitle[axisTitle.isNew ? 'attr' : 'animate'](axis.getTitlePosition(axisTitle));
                    axisTitle.isNew = false;
                }
                // Stacked totals:
                if (stackLabelOptions && stackLabelOptions.enabled && axis.stacking) {
                    axis.stacking.renderStackTotals();
                }
                // End stacked totals
                // Record old scaling for updating/animation
                axis.old = {
                    len: axis.len,
                    max: axis.max,
                    min: axis.min,
                    transA: axis.transA,
                    userMax: axis.userMax,
                    userMin: axis.userMin
                };
                axis.isDirty = false;
                fireEvent(this, 'afterRender');
            };
            /**
             * Redraw the axis to reflect changes in the data or axis extremes. Called
             * internally from Highcharts.Chart#redraw.
             *
             * @private
             * @function Highcharts.Axis#redraw
             */
            Axis.prototype.redraw = function () {
                if (this.visible) {
                    // render the axis
                    this.render();
                    // move plot lines and bands
                    this.plotLinesAndBands.forEach(function (plotLine) {
                        plotLine.render();
                    });
                }
                // mark associated series as dirty and ready for redraw
                this.series.forEach(function (series) {
                    series.isDirty = true;
                });
            };
            /**
             * Returns an array of axis properties, that should be untouched during
             * reinitialization.
             *
             * @private
             * @function Highcharts.Axis#getKeepProps
             */
            Axis.prototype.getKeepProps = function () {
                return (this.keepProps || Axis.keepProps);
            };
            /**
             * Destroys an Axis instance. See {@link Axis#remove} for the API endpoint
             * to fully remove the axis.
             *
             * @private
             * @function Highcharts.Axis#destroy
             *
             * @param {boolean} [keepEvents]
             * Whether to preserve events, used internally in Axis.update.
             */
            Axis.prototype.destroy = function (keepEvents) {
                var axis = this, plotLinesAndBands = axis.plotLinesAndBands, eventOptions = this.eventOptions;
                fireEvent(this, 'destroy', { keepEvents: keepEvents });
                // Remove the events
                if (!keepEvents) {
                    removeEvent(axis);
                }
                // Destroy collections
                [axis.ticks, axis.minorTicks, axis.alternateBands].forEach(function (coll) {
                    destroyObjectProperties(coll);
                });
                if (plotLinesAndBands) {
                    var i = plotLinesAndBands.length;
                    while (i--) { // #1975
                        plotLinesAndBands[i].destroy();
                    }
                }
                // Destroy elements
                ['axisLine', 'axisTitle', 'axisGroup',
                    'gridGroup', 'labelGroup', 'cross', 'scrollbar'].forEach(function (prop) {
                    if (axis[prop]) {
                        axis[prop] = axis[prop].destroy();
                    }
                });
                // Destroy each generated group for plotlines and plotbands
                for (var plotGroup in axis.plotLinesAndBandsGroups) { // eslint-disable-line guard-for-in
                    axis.plotLinesAndBandsGroups[plotGroup] =
                        axis.plotLinesAndBandsGroups[plotGroup].destroy();
                }
                // Delete all properties and fall back to the prototype.
                objectEach(axis, function (val, key) {
                    if (axis.getKeepProps().indexOf(key) === -1) {
                        delete axis[key];
                    }
                });
                this.eventOptions = eventOptions;
            };
            /**
             * Internal function to draw a crosshair.
             *
             * @function Highcharts.Axis#drawCrosshair
             *
             * @param {Highcharts.PointerEventObject} [e]
             * The event arguments from the modified pointer event, extended with
             * `chartX` and `chartY`
             *
             * @param {Highcharts.Point} [point]
             * The Point object if the crosshair snaps to points.
             *
             * @emits Highcharts.Axis#event:afterDrawCrosshair
             * @emits Highcharts.Axis#event:drawCrosshair
             */
            Axis.prototype.drawCrosshair = function (e, point) {
                var options = this.crosshair, snap = pick(options && options.snap, true), chart = this.chart;
                var path, pos, categorized, graphic = this.cross, crossOptions;
                fireEvent(this, 'drawCrosshair', { e: e, point: point });
                // Use last available event when updating non-snapped crosshairs without
                // mouse interaction (#5287)
                if (!e) {
                    e = this.cross && this.cross.e;
                }
                if (
                // Disabled in options
                !options ||
                    // Snap
                    ((defined(point) || !snap) === false)) {
                    this.hideCrosshair();
                }
                else {
                    // Get the path
                    if (!snap) {
                        pos = e &&
                            (this.horiz ?
                                e.chartX - this.pos :
                                this.len - e.chartY + this.pos);
                    }
                    else if (defined(point)) {
                        // #3834
                        pos = pick(this.coll !== 'colorAxis' ?
                            point.crosshairPos : // 3D axis extension
                            null, this.isXAxis ?
                            point.plotX :
                            this.len - point.plotY);
                    }
                    if (defined(pos)) {
                        crossOptions = {
                            // value, only used on radial
                            value: point && (this.isXAxis ?
                                point.x :
                                pick(point.stackY, point.y)),
                            translatedValue: pos
                        };
                        if (chart.polar) {
                            // Additional information required for crosshairs in
                            // polar chart
                            extend(crossOptions, {
                                isCrosshair: true,
                                chartX: e && e.chartX,
                                chartY: e && e.chartY,
                                point: point
                            });
                        }
                        path = this.getPlotLinePath(crossOptions) ||
                            null; // #3189
                    }
                    if (!defined(path)) {
                        this.hideCrosshair();
                        return;
                    }
                    categorized = this.categories && !this.isRadial;
                    // Draw the cross
                    if (!graphic) {
                        this.cross = graphic = chart.renderer
                            .path()
                            .addClass('highcharts-crosshair highcharts-crosshair-' +
                            (categorized ? 'category ' : 'thin ') +
                            (options.className || ''))
                            .attr({
                            zIndex: pick(options.zIndex, 2)
                        })
                            .add();
                        // Presentational attributes
                        if (!chart.styledMode) {
                            graphic.attr({
                                stroke: options.color ||
                                    (categorized ?
                                        Color
                                            .parse("#ccd3ff" /* Palette.highlightColor20 */)
                                            .setOpacity(0.25)
                                            .get() :
                                        "#cccccc" /* Palette.neutralColor20 */),
                                'stroke-width': pick(options.width, 1)
                            }).css({
                                'pointer-events': 'none'
                            });
                            if (options.dashStyle) {
                                graphic.attr({
                                    dashstyle: options.dashStyle
                                });
                            }
                        }
                    }
                    graphic.show().attr({
                        d: path
                    });
                    if (categorized && !options.width) {
                        graphic.attr({
                            'stroke-width': this.transA
                        });
                    }
                    this.cross.e = e;
                }
                fireEvent(this, 'afterDrawCrosshair', { e: e, point: point });
            };
            /**
             * Hide the crosshair if visible.
             *
             * @function Highcharts.Axis#hideCrosshair
             */
            Axis.prototype.hideCrosshair = function () {
                if (this.cross) {
                    this.cross.hide();
                }
                fireEvent(this, 'afterHideCrosshair');
            };
            /**
             * Check whether the chart has vertical panning ('y' or 'xy' type).
             *
             * @private
             * @function Highcharts.Axis#hasVerticalPanning
             */
            Axis.prototype.hasVert