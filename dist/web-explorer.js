/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/component/app/create.js":
/*!*************************************!*\
  !*** ./src/component/app/create.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return create; });\nfunction createTrInput(we, after, complete) {\n  var tr = document.createElement('tr');\n  tr.innerHTML = '<td colspan=\"' + we.settings.rows.length + '\">' + '<input type=\"text\" class=\"form-control\" placeholder=\"Name\">';\n  '</td>';\n  after.parentNode.insertBefore(tr, after.nextSibling);\n  var input = tr.querySelector('input');\n  input.select();\n  input.addEventListener('blur', function () {\n    complete(this);\n  });\n  input.addEventListener('keypress', function (e) {\n    if (e.which === 13\n    /* Enter */\n    ) {\n        this.blur();\n      }\n  });\n}\n\nfunction create(we) {\n  ['file', 'dir'].forEach(function (type) {\n    we.apps.set('we-create-' + type, function (we, file, e) {\n      return createTrInput(we, e.target, function (input) {\n        var create = we.path;\n\n        if (create !== '/') {\n          create += '/';\n        }\n\n        we.client.request('create_' + type, create + input.value).then(function () {\n          return we.refresh();\n        });\n      });\n    });\n  });\n  we.settings.menu.items.copy = {\n    app: 'we-copy',\n    text: 'Copy',\n    before: 'we-clipboard-clear',\n    multiple: true,\n    condition: function condition(we, file) {\n      return !!file.name;\n    }\n  };\n  we.settings.menu.items['create-dir'] = {\n    text: 'Create Directory',\n    app: 'we-create-dir'\n  };\n  we.settings.menu.items['create-file'] = {\n    text: 'Create File',\n    app: 'we-create-file'\n  };\n}\n;\n\n//# sourceURL=webpack:///./src/component/app/create.js?");

/***/ }),

/***/ "./src/component/app/edit.js":
/*!***********************************!*\
  !*** ./src/component/app/edit.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return edit; });\n/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../clipboard */ \"./src/component/clipboard.js\");\n\nfunction edit(we) {\n  var clipboard = new _clipboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"](we);\n  we.apps.set('we-delete', function (we, file) {\n    we.client.request('delete', file.path).then(function () {\n      return we.refresh();\n    });\n  });\n  we.apps.set('we-download', function (we, file) {\n    return window.location.href = we.server + '?action=download&file=' + file.path;\n  });\n  we.apps.set('we-clipboard-clear', function () {\n    return clipboard.clear();\n  });\n  we.apps.set('we-copy', function (we, file) {\n    return clipboard.copy(file);\n  });\n  we.apps.set('we-cut', function (we, file) {\n    return clipboard.cut(file);\n  });\n  we.apps.set('we-paste', function (we) {\n    var mode = clipboard.isCut ? 'rename' : 'copy';\n    var path = we.path;\n\n    if (we.path !== '/') {\n      path = path + '/';\n    }\n\n    clipboard.clipboard.forEach(function (item) {\n      we.client.request(mode, item.path, {\n        to: path + item.name\n      }).then(function () {\n        return we.refresh();\n      });\n    });\n  });\n  we.settings.menu.items.copy = {\n    app: 'we-copy',\n    text: 'Copy',\n    before: 'we-clipboard-clear',\n    multiple: true,\n    condition: function condition(we, file) {\n      return !!file.name;\n    }\n  };\n  we.settings.menu.items[\"delete\"] = {\n    text: 'Delete',\n    app: 'we-delete',\n    multiple: true,\n    condition: function condition(we, file) {\n      return !!file.name;\n    }\n  };\n  we.settings.menu.items.cut = {\n    text: 'Cut',\n    app: 'we-cut',\n    before: 'we-clipboard-clear',\n    multiple: true,\n    condition: function condition(we, file) {\n      return !!file.name;\n    }\n  };\n  we.settings.menu.items.paste = {\n    text: 'Paste',\n    app: 'we-paste',\n    condition: function condition(we) {\n      return  true || false;\n    }\n  };\n}\n;\n\n//# sourceURL=webpack:///./src/component/app/edit.js?");

/***/ }),

/***/ "./src/component/app/viewer.js":
/*!*************************************!*\
  !*** ./src/component/app/viewer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return viewer; });\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modal */ \"./src/component/modal.ts\");\n\nvar modal = new _modal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nfunction viewer(we) {\n  we.apps.set('we-viewer-audio', function (we, file) {\n    return modal.open(file.name, '<audio controls class=\"w-100 no-outline\">' + '<source ' + 'src=\"' + we.server + '?action=view&file=' + file.path + '\" ' + 'type=\"' + file.mime + '\"' + '>' + '</audio>');\n  });\n  we.apps.set('we-viewer-image', function (we, file) {\n    return modal.open(file.name, '<img class=\"w-100\" src=\"' + we.server + '?action=view&file=' + file.path + '\">');\n  });\n  we.apps.set('we-viewer-video', function (we, file) {\n    return modal.open(file.name, '<video controls class=\"w-100\">' + '<source ' + 'src=\"' + we.server + '?action=view&file=' + file.path + '\" ' + 'type=\"' + file.mime + '\"' + '>' + '</video>');\n  });\n  we.apps.set('we-viewer-default', function (we, file) {\n    return modal.open(file.name, '<p>No file viewer is integrated!</p>');\n  });\n  we.apps.set('we-viewer-text', function (we, file) {\n    return we.client.request('view', file.path).then(function (response) {\n      return modal.open('View: ' + file.name, '<pre>' + response.xhr.responseText + '</pre>');\n    });\n  });\n}\n;\n\n//# sourceURL=webpack:///./src/component/app/viewer.js?");

/***/ }),

/***/ "./src/component/clipboard.js":
/*!************************************!*\
  !*** ./src/component/clipboard.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FileClipboard; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar FileClipboard = /*#__PURE__*/function () {\n  function FileClipboard(we) {\n    _classCallCheck(this, FileClipboard);\n\n    _defineProperty(this, \"clipboard\", []);\n\n    _defineProperty(this, \"isCut\", false);\n\n    this.we = we;\n  }\n\n  _createClass(FileClipboard, [{\n    key: \"clear\",\n    value: function clear() {\n      this.clipboard = [];\n    }\n  }, {\n    key: \"copy\",\n    value: function copy(file) {\n      if (this.isCut) {\n        this.clear();\n        this.isCut = false;\n      }\n\n      this.add(file);\n    }\n  }, {\n    key: \"add\",\n    value: function add(file) {\n      this.clipboard.push(file);\n    }\n  }, {\n    key: \"cut\",\n    value: function cut(file) {\n      if (!this.isCut) {\n        this.clear();\n        this.isCut = true;\n      }\n\n      this.add(file);\n    }\n  }]);\n\n  return FileClipboard;\n}();\n\n\n\n//# sourceURL=webpack:///./src/component/clipboard.js?");

/***/ }),

/***/ "./src/component/core/apps.js":
/*!************************************!*\
  !*** ./src/component/core/apps.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Apps; });\n/* harmony import */ var _open__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./open */ \"./src/component/core/open.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar Apps = /*#__PURE__*/function () {\n  function Apps(we) {\n    _classCallCheck(this, Apps);\n\n    _defineProperty(this, \"apps\", {});\n\n    this.we = we;\n    this.set('open', new _open__WEBPACK_IMPORTED_MODULE_0__[\"default\"](we).get());\n  }\n\n  _createClass(Apps, [{\n    key: \"set\",\n    value: function set(name, callback) {\n      this.apps[name] = callback;\n    }\n  }, {\n    key: \"call\",\n    value: function call(name) {\n      var file = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n      var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n      if (!this.has(name)) {\n        throw new Error('Invalid App: ' + name);\n      }\n\n      this.apps[name](this.we, file, event);\n    }\n  }, {\n    key: \"has\",\n    value: function has(name) {\n      return !!this.apps[name];\n    }\n  }]);\n\n  return Apps;\n}();\n\n\n\n//# sourceURL=webpack:///./src/component/core/apps.js?");

/***/ }),

/***/ "./src/component/core/client.ts":
/*!**************************************!*\
  !*** ./src/component/core/client.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Client = /** @class */ (function () {\r\n    function Client(server) {\r\n        this.methods = {\r\n            list: 'GET',\r\n            view: 'GET',\r\n            create_file: 'GET',\r\n            create_dir: 'GET',\r\n            delete: 'GET',\r\n            rename: 'GET',\r\n            copy: 'GET'\r\n        };\r\n        this.server = server;\r\n    }\r\n    Client.prototype.request = function (action, file, data) {\r\n        if (data === void 0) { data = {}; }\r\n        if (!this.methods[action]) {\r\n            throw new Error('Unsupported action: ' + action);\r\n        }\r\n        data.file = file;\r\n        var url = this.server + '?action=' + action;\r\n        var xhr = new XMLHttpRequest();\r\n        var method = this.methods[action];\r\n        var query = Object.keys(data)\r\n            .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]); })\r\n            .join('&');\r\n        if (method === 'GET') {\r\n            url += '&' + query;\r\n        }\r\n        else {\r\n            xhr.setRequestHeader(\"Content-type\", \"application/x-www-form-urlencoded\");\r\n        }\r\n        xhr.open(method, url, true);\r\n        return new Promise(function (resolve, reject) {\r\n            xhr.onreadystatechange = function () {\r\n                if (xhr.readyState == 4) {\r\n                    var result = {\r\n                        xhr: xhr,\r\n                        action: action,\r\n                        file: file,\r\n                        data: xhr.getResponseHeader('Content-Type') === 'application/json'\r\n                            ? JSON.parse(xhr.responseText)\r\n                            : []\r\n                    };\r\n                    if (xhr.status.toString()[0] === '2') {\r\n                        resolve(result);\r\n                    }\r\n                    else {\r\n                        reject(result);\r\n                    }\r\n                }\r\n            };\r\n            if (method === 'GET') {\r\n                xhr.send();\r\n            }\r\n            else {\r\n                xhr.send(query);\r\n            }\r\n        });\r\n    };\r\n    return Client;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Client);\r\n\n\n//# sourceURL=webpack:///./src/component/core/client.ts?");

/***/ }),

/***/ "./src/component/core/open.js":
/*!************************************!*\
  !*** ./src/component/core/open.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Open; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar Open = /*#__PURE__*/function () {\n  function Open(we) {\n    _classCallCheck(this, Open);\n\n    _defineProperty(this, \"rules\", {});\n\n    this.we = we;\n    this.rules = we.settings.fileHandler;\n  }\n\n  _createClass(Open, [{\n    key: \"call\",\n    value: function call(file) {\n      if (file.type === 'dir') {\n        return this.openDir(file);\n      }\n\n      return this.openFile(file);\n    }\n  }, {\n    key: \"get\",\n    value: function get() {\n      var _this = this;\n\n      return function (we) {\n        var file = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n        var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n        _this.call(file);\n      };\n    }\n  }, {\n    key: \"openDir\",\n    value: function openDir(file) {\n      this.we.openDir(file.path);\n    }\n  }, {\n    key: \"openFile\",\n    value: function openFile(file) {\n      this.we.apps.call(this.fetchAppName(file), file);\n    }\n  }, {\n    key: \"fetchAppName\",\n    value: function fetchAppName(file) {\n      if (this.rules[file.mime]) {\n        return this.rules[file.mime];\n      }\n\n      var group = file.mime.split('/')[0];\n\n      if (this.rules[group]) {\n        return this.rules[group];\n      }\n\n      if (this.rules[file.extension]) {\n        return this.rules[file.extension];\n      }\n\n      return this.rules[\"default\"];\n    }\n  }]);\n\n  return Open;\n}();\n\n\n\n//# sourceURL=webpack:///./src/component/core/open.js?");

/***/ }),

/***/ "./src/component/core/selection.js":
/*!*****************************************!*\
  !*** ./src/component/core/selection.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Selection; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar Selection = /*#__PURE__*/function () {\n  function Selection(we) {\n    var _this = this;\n\n    _classCallCheck(this, Selection);\n\n    _defineProperty(this, \"items\", {});\n\n    this.we = we;\n    this.we.addRowListener('click', function (rowEvent) {\n      return _this.clickListener(rowEvent);\n    });\n    this.we.addRowListener('contextmenu', function (rowEvent) {\n      return _this.contextListener(rowEvent);\n    });\n  }\n\n  _createClass(Selection, [{\n    key: \"clear\",\n    value: function clear() {\n      this.items = {};\n      Array.prototype.slice.call(this.we.e.children).forEach(function (child) {\n        child.classList.remove('we-selected');\n      });\n    }\n  }, {\n    key: \"select\",\n    value: function select(index) {\n      var _this2 = this;\n\n      this.clear();\n\n      if (!Array.isArray(index)) {\n        index = [parseInt(index)];\n      }\n\n      index.forEach(function (index) {\n        _this2.items[parseInt(index)] = _this2.we.data[index];\n\n        _this2.we.e.querySelector('[data-index=\"' + index + '\"]').classList.add('we-selected');\n      });\n    }\n  }, {\n    key: \"each\",\n    value: function each(callback) {\n      Object.values(this.items).forEach(function (file) {\n        return callback(file);\n      });\n    }\n  }, {\n    key: \"contextListener\",\n    value: function contextListener(rowEvent) {\n      rowEvent.event.preventDefault();\n\n      if (!rowEvent.target.dataset.index || this.items[rowEvent.target.dataset.index]) {\n        return;\n      }\n\n      this.clear();\n      this.select(rowEvent.target.dataset.index);\n    }\n  }, {\n    key: \"clickListener\",\n    value: function clickListener(rowEvent) {\n      var event = rowEvent.event;\n      var current = rowEvent.target.dataset.index;\n      var index = [];\n\n      if (event.ctrlKey || event.shiftKey) {\n        index = index.concat(Object.keys(this.items));\n      }\n\n      index = index.map(function (index) {\n        return parseInt(index);\n      });\n\n      if (event.shiftKey && index.length > 0) {\n        if (Math.min.apply(Math, _toConsumableArray(index)) < current) {\n          for (var i = Math.max.apply(Math, _toConsumableArray(index)) + 1; i < current; i++) {\n            index.push(i);\n          }\n        } else {\n          for (var _i = Math.min.apply(Math, _toConsumableArray(index)) - 1; _i > current; _i--) {\n            index.push(_i);\n          }\n        }\n      }\n\n      if (current || current === 0) {\n        index.push(parseInt(current));\n      }\n\n      this.select(index);\n    }\n  }]);\n\n  return Selection;\n}();\n\n\n\n//# sourceURL=webpack:///./src/component/core/selection.js?");

/***/ }),

/***/ "./src/component/dragfile.js":
/*!***********************************!*\
  !*** ./src/component/dragfile.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DragFile; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar DragFile = /*#__PURE__*/function () {\n  function DragFile(we) {\n    _classCallCheck(this, DragFile);\n\n    this.we = we;\n  }\n\n  _createClass(DragFile, [{\n    key: \"register\",\n    value: function register() {\n      var _this = this;\n\n      this.we.addRowListener('dragover', function (e) {\n        return _this.over(e);\n      });\n      this.we.addRowListener('dragstart', function (e) {\n        return _this.start(e);\n      });\n      this.we.addRowListener('stop', function (e) {\n        return _this.stop(e);\n      });\n    }\n  }, {\n    key: \"start\",\n    value: function start(rowEvent) {\n      rowEvent.event.dataTransfer.setData('application/we-file-index', rowEvent.target.dataset.index);\n    }\n  }, {\n    key: \"over\",\n    value: function over(rowEvent) {\n      var data = rowEvent.target.dataset;\n\n      if (data.app === 'back' || this.we.data[data.index] && this.we.data[data.index].type === 'dir') {\n        rowEvent.event.preventDefault();\n      }\n    }\n  }, {\n    key: \"drop\",\n    value: function drop(rowEvent) {\n      rowEvent.event.preventDefault();\n      var id = rowEvent.event.dataTransfer.getData('application/we-file-index');\n      var data = rowEvent.target.dataset;\n\n      if (id === '' || id === data.index || !we.data[id]) {\n        return false;\n      }\n\n      var path = we.path;\n\n      if (this.we.path !== '/') {\n        path = path + '/';\n      }\n\n      var location = data.app === 'back' ? we.getParent() : path + this.we.data[data.index].name;\n      this.we.selection.each(function (item) {\n        return we.client.request('rename', item.path, {\n          to: location + '/' + item.name\n        }).then(function () {\n          return we.refresh();\n        });\n      });\n    }\n  }]);\n\n  return DragFile;\n}();\n\n\n\n//# sourceURL=webpack:///./src/component/dragfile.js?");

/***/ }),

/***/ "./src/component/menu.ts":
/*!*******************************!*\
  !*** ./src/component/menu.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n;\r\nvar Menu = /** @class */ (function () {\r\n    function Menu(we) {\r\n        var _this = this;\r\n        this.we = we;\r\n        this.order = we.settings.menu.order;\r\n        this.items = we.settings.menu.items;\r\n        this.outer = document.createElement('div');\r\n        this.outer.id = 'we-context-outer';\r\n        this.outer.classList.add('we-context');\r\n        this.outer.classList.add('card');\r\n        this.outer.innerHTML = '<nav id=\"we-context\" class=\"nav flex-column\"></nav>';\r\n        document.body.appendChild(this.outer);\r\n        this.menu = document.getElementById('we-context');\r\n        we.addRowListener('contextmenu', function (rowEvent) { return _this.openMenu(rowEvent); });\r\n        document.addEventListener('click', function () { return _this.outer.style.display = 'none'; });\r\n    }\r\n    Menu.prototype.openMenu = function (rowEvent) {\r\n        var _this = this;\r\n        var file = {};\r\n        if (rowEvent.target.dataset.index) {\r\n            file = this.we.data[rowEvent.target.dataset.index];\r\n        }\r\n        rowEvent.event.preventDefault();\r\n        this.outer.style.left = rowEvent.event.pageX + 'px';\r\n        this.outer.style.top = rowEvent.event.pageY + 'px';\r\n        this.outer.style.display = 'block';\r\n        this.menu.innerHTML = '';\r\n        this.order.forEach(function (item) { return _this.renderItem(item, file, rowEvent); });\r\n    };\r\n    Menu.prototype.renderItem = function (name, file, rowEvent) {\r\n        var _this = this;\r\n        var a = document.createElement('a');\r\n        a.href = '#';\r\n        a.classList.add('nav-link');\r\n        if (name === '-') {\r\n            a.classList.add('separator');\r\n            this.menu.appendChild(a);\r\n            return;\r\n        }\r\n        if (!this.items[name]) {\r\n            throw new Error('Invalid Context Entry: ' + name);\r\n        }\r\n        var item = this.items[name];\r\n        a.innerHTML = item.text;\r\n        if (item.app) {\r\n            a.addEventListener('click', function () { return _this.itemClick(item, file, rowEvent); });\r\n        }\r\n        if (!item.condition || item.condition(this.we, file)) {\r\n            this.menu.appendChild(a);\r\n        }\r\n    };\r\n    Menu.prototype.itemClick = function (item, file, rowEvent) {\r\n        var _this = this;\r\n        if (item.before) {\r\n            this.we.apps.call(item.before, file, rowEvent);\r\n        }\r\n        if (item.multiple) {\r\n            this.we.selection.each(function (selectedFile) {\r\n                return _this.we.apps.call(item.app, selectedFile, rowEvent);\r\n            });\r\n            return;\r\n        }\r\n        this.we.apps.call(item.app, file, rowEvent);\r\n    };\r\n    return Menu;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Menu);\r\n\n\n//# sourceURL=webpack:///./src/component/menu.ts?");

/***/ }),

/***/ "./src/component/modal.ts":
/*!********************************!*\
  !*** ./src/component/modal.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar template = \"<div class=\\\"we-modal-content modal-dialog modal-lg\\\">\\n        '<div class=\\\"modal-content\\\">\\n            '<div class=\\\"modal-header\\\">\\n                '<h5 class=\\\"modal-title\\\" id=\\\"we-modal-title\\\"></h5>\\n                '<button type=\\\"button\\\" class=\\\"close\\\" data-dismiss=\\\"modal\\\" aria-label=\\\"Close\\\">\\n                '<span aria-hidden=\\\"true\\\">&times;</span>\\n                '</button>\\n            '</div>\\n            '<div class=\\\"modal-body\\\" id=\\\"we-modal-content\\\"></div>\\n            '<div class=\\\"modal-footer\\\">\\n                '<button type=\\\"button\\\" class=\\\"btn btn-secondary\\\" data-dismiss=\\\"modal\\\">Close</button>\\n            '</div>\\n        '</div>\\n    '</div>\";\r\nvar Modal = /** @class */ (function () {\r\n    function Modal() {\r\n        if (this.modal = document.getElementById('we-modal')) {\r\n            return;\r\n        }\r\n        this.modal = document.createElement('div');\r\n        this.modal.id = 'we-modal';\r\n        this.modal.innerHTML = template;\r\n        document.body.appendChild(this.modal);\r\n    }\r\n    Modal.prototype.open = function (title, content) {\r\n        document.getElementById('we-modal-title').innerHTML = title;\r\n        document.getElementById('we-modal-content').innerHTML = content;\r\n        var style = this.modal.style;\r\n        style.display = 'block';\r\n        document.querySelectorAll('[data-dismiss=\"modal\"]').forEach(function (e) {\r\n            return e.addEventListener('click', function () {\r\n                style.display = 'none';\r\n                document.getElementById('we-modal-title').innerHTML = '';\r\n                document.getElementById('we-modal-content').innerHTML = '';\r\n            });\r\n        });\r\n    };\r\n    return Modal;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Modal);\r\n\n\n//# sourceURL=webpack:///./src/component/modal.ts?");

/***/ }),

/***/ "./src/event/row.js":
/*!**************************!*\
  !*** ./src/event/row.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return RowEvent; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar RowEvent = function RowEvent(we, target, event) {\n  _classCallCheck(this, RowEvent);\n\n  this.target = target;\n  this.event = event;\n  this.we = we;\n\n  if (target.dataset.index) {\n    this.index = parseInt(target.dataset.index);\n    this.file = we.data[target.dataset.index];\n  }\n};\n\n\n\n//# sourceURL=webpack:///./src/event/row.js?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _we__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./we */ \"./src/we.ts\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ \"./src/settings.ts\");\n/* harmony import */ var _component_dragfile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/dragfile */ \"./src/component/dragfile.js\");\n/* harmony import */ var _component_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/menu */ \"./src/component/menu.ts\");\n/* harmony import */ var _component_app_viewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/app/viewer */ \"./src/component/app/viewer.js\");\n/* harmony import */ var _component_app_create__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/app/create */ \"./src/component/app/create.js\");\n/* harmony import */ var _component_app_edit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/app/edit */ \"./src/component/app/edit.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nwindow.webExplorer = function (id, server) {\r\n    var we = new _we__WEBPACK_IMPORTED_MODULE_0__[\"default\"](id, server, _settings__WEBPACK_IMPORTED_MODULE_1__[\"settings\"]);\r\n    //Enable some stuff\r\n    Object(_component_app_viewer__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(we);\r\n    Object(_component_app_create__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(we);\r\n    Object(_component_app_edit__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(we);\r\n    //Enable components \r\n    var drag = new _component_dragfile__WEBPACK_IMPORTED_MODULE_2__[\"default\"](we);\r\n    drag.register();\r\n    new _component_menu__WEBPACK_IMPORTED_MODULE_3__[\"default\"](we);\r\n    we.openDir('/');\r\n    return we;\r\n};\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/settings.ts":
/*!*************************!*\
  !*** ./src/settings.ts ***!
  \*************************/
/*! exports provided: settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return settings; });\nvar settings = {\r\n    rows: ['icon', 'name', 'mime', 'path', 'size'],\r\n    renderRow: {\r\n        icon: function (file, we) {\r\n            return '<td><i class=\"fas fa-' +\r\n                (function () {\r\n                    if (file.type === 'dir') {\r\n                        return we.settings.icons['directory'];\r\n                    }\r\n                    if (we.settings.icons[file.mime]) {\r\n                        return we.settings.icon[file.mime];\r\n                    }\r\n                    var group = file.mime.split('/')[0];\r\n                    if (we.settings.icons[group]) {\r\n                        return we.settings.icons[group];\r\n                    }\r\n                    if (we.settings.icons[file.extension]) {\r\n                        return we.settings.icons[file.extension];\r\n                    }\r\n                    return we.settings.icons['default'];\r\n                })() +\r\n                '\"></i></td>';\r\n        },\r\n        size: function (file) {\r\n            if (!file.size) {\r\n                return '<td></td>';\r\n            }\r\n            if (file.size === 0) {\r\n                return '<td>0 Bytes</td>';\r\n            }\r\n            var k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(file.size) / Math.log(k));\r\n            return '<td>' + parseFloat((file.size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i] + '</td>';\r\n        }\r\n    },\r\n    fileHandler: {\r\n        'audio': 'we-viewer-audio',\r\n        'video': 'we-viewer-video',\r\n        'image': 'we-viewer-image',\r\n        'text': 'we-viewer-text',\r\n        'application/json': 'we-viewer-text',\r\n        'default': 'we-viewer-default'\r\n    },\r\n    icons: {\r\n        'audio': 'file-audio',\r\n        'video': 'file-video',\r\n        'image': 'file-image',\r\n        'text': 'file-alt',\r\n        'directory': 'folder',\r\n        'default': 'file'\r\n    },\r\n    menu: {\r\n        order: ['open', 'download', '-', 'delete', 'copy', 'cut', 'paste', '-', 'create-dir', 'create-file'],\r\n        items: {\r\n            open: {\r\n                text: '<b>Open</b>',\r\n                app: 'we-open'\r\n            },\r\n            download: {\r\n                text: 'Download',\r\n                app: 'we-download',\r\n                condition: function (we, file) { return file.type === 'file'; }\r\n            }\r\n        }\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./src/settings.ts?");

/***/ }),

/***/ "./src/we.ts":
/*!*******************!*\
  !*** ./src/we.ts ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component/modal */ \"./src/component/modal.ts\");\n/* harmony import */ var _component_core_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/core/client */ \"./src/component/core/client.ts\");\n/* harmony import */ var _component_core_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/core/selection */ \"./src/component/core/selection.js\");\n/* harmony import */ var _event_row__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event/row */ \"./src/event/row.js\");\n/* harmony import */ var _component_core_apps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/core/apps */ \"./src/component/core/apps.js\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\n\r\n\r\n\r\n\r\n\r\nvar WebExplorer = /** @class */ (function () {\r\n    function WebExplorer(id, server, settings) {\r\n        var _this = this;\r\n        this.data = [];\r\n        this.path = '/';\r\n        this.modal = new _component_modal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.rowListener = {};\r\n        this.settings = settings;\r\n        // Dependencies\r\n        this.modal = new _component_modal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.client = new _component_core_client__WEBPACK_IMPORTED_MODULE_1__[\"default\"](server);\r\n        this.apps = new _component_core_apps__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this);\r\n        this.selection = new _component_core_selection__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this);\r\n        // DOM\r\n        this.e = document.getElementById(id);\r\n        this.e.classList.add('we');\r\n        // Initialization\r\n        this.apps.set('back', function () { return _this.openDir(_this.getParent()); });\r\n        this.addRowListener('dblclick', function (rowEvent) {\r\n            if (rowEvent.file) {\r\n                return _this.apps.call('open', rowEvent.file, rowEvent.event);\r\n            }\r\n            if (rowEvent.target.dataset.app) {\r\n                return _this.apps.call(rowEvent.target.dataset.app, null, rowEvent.event);\r\n            }\r\n        });\r\n    }\r\n    ;\r\n    WebExplorer.prototype.refresh = function () {\r\n        this.openDir(this.path);\r\n    };\r\n    WebExplorer.prototype.getParent = function () {\r\n        var split = this.path.split('/');\r\n        split.pop();\r\n        return split.join('/');\r\n    };\r\n    WebExplorer.prototype.addRowListener = function (event, callback) {\r\n        if (!Array.isArray(this.rowListener[event])) {\r\n            this.rowListener[event] = [];\r\n        }\r\n        this.rowListener[event].push(callback);\r\n    };\r\n    WebExplorer.prototype.setSettings = function (settings) {\r\n        this.settings = settings;\r\n    };\r\n    WebExplorer.prototype.openDir = function (path) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var we;\r\n            var _this = this;\r\n            return __generator(this, function (_a) {\r\n                we = this;\r\n                path = path === '' ? '/' : path;\r\n                return [2 /*return*/, this.client.request('list', path)\r\n                        .then(function (response) {\r\n                        _this.path = path;\r\n                        response.data.forEach(function (value, index) {\r\n                            response.data[index]['index'] = index;\r\n                        });\r\n                        we.data = response.data;\r\n                        document.querySelectorAll(\"[data-content='we-current']\").forEach(function (e) {\r\n                            e.innerHTML = path;\r\n                        });\r\n                        var html = '';\r\n                        if (path !== '/') {\r\n                            // Render Back Row at first tr\r\n                            html += (function () {\r\n                                var before = 0;\r\n                                var tr = '<tr data-app=\"back\" class=\"we-row\">';\r\n                                _this.settings.rows.every(function (value) {\r\n                                    if (value === 'name') {\r\n                                        return false;\r\n                                    }\r\n                                    before++;\r\n                                    return true;\r\n                                });\r\n                                var after = _this.settings.rows.length - before - 1;\r\n                                if (before > 0) {\r\n                                    tr += '<td colspan=\"' + before + '\"></td>';\r\n                                }\r\n                                tr += '<td>..</td>';\r\n                                if (after > 0) {\r\n                                    tr += '<td colspan=\"' + after + '\"></td>';\r\n                                }\r\n                                return tr + '</tr>';\r\n                            })();\r\n                        }\r\n                        response.data.forEach(function (file, index) { return html += _this.renderRow(file, index); });\r\n                        we.e.innerHTML = html;\r\n                    })\r\n                        .then(function () {\r\n                        return we.e.querySelectorAll('tr').forEach(function (e) {\r\n                            return Object.keys(_this.rowListener).forEach(function (event) {\r\n                                return _this.rowListener[event].forEach(function (listener) {\r\n                                    return e.addEventListener(event, function (rowEvent) { return listener(new _event_row__WEBPACK_IMPORTED_MODULE_3__[\"default\"](_this, e, rowEvent)); });\r\n                                });\r\n                            });\r\n                        });\r\n                    })];\r\n            });\r\n        });\r\n    };\r\n    WebExplorer.prototype.renderRow = function (file, index) {\r\n        var _this = this;\r\n        var row = '<tr class=\"we-row\" draggable=\"true\" data-app=\"we-open\" data-index=\"' + index + '\">';\r\n        this.settings.rows.forEach(function (rowName) {\r\n            return row += (function () {\r\n                if (_this.settings.renderRow[rowName] instanceof Function) {\r\n                    return _this.settings.renderRow[rowName](file, _this);\r\n                }\r\n                if (file.hasOwnProperty(rowName)) {\r\n                    return '<td>' + file[rowName] + '</td>';\r\n                }\r\n                return '<td></td>';\r\n            })();\r\n        });\r\n        return row + '</tr>';\r\n    };\r\n    return WebExplorer;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (WebExplorer);\r\n\n\n//# sourceURL=webpack:///./src/we.ts?");

/***/ })

/******/ });