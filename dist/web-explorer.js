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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/create.js":
/*!***************************!*\
  !*** ./src/app/create.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Create; });\nfunction createTrInput(after, complete) {\n  var tr = document.createElement('tr');\n  tr.innerHTML = '<td colspan=\"' + we.settings.rows.length + '\">' + '<input type=\"text\" class=\"form-control\" placeholder=\"Name\">';\n  '</td>';\n  after.parentNode.insertBefore(tr, after.nextSibling);\n  var input = tr.querySelector('input');\n  input.select();\n  input.addEventListener('blur', function () {\n    complete(this);\n  });\n  input.addEventListener('keypress', function (e) {\n    if (e.which === 13\n    /* Enter */\n    ) {\n        this.blur();\n      }\n  });\n}\n\nfunction Create(we) {\n  ['file', 'dir'].forEach(function (type) {\n    we.apps.set('we-create-' + type, function (we, file, e) {\n      return createTrInput(e.target, function (input) {\n        var create = we.path;\n\n        if (create !== '/') {\n          create += '/';\n        }\n\n        we.client.request('create_' + type, create + input.value).then(function () {\n          return we.refresh();\n        });\n      });\n    });\n  });\n  we.settings.menu.items.copy = {\n    app: 'we-copy',\n    text: 'Copy',\n    before: 'we-clipboard-clear',\n    multiple: true,\n    condition: function condition(we, file) {\n      return !!file.name;\n    }\n  };\n  we.settings.menu.items['create-dir'] = {\n    text: 'Create Directory',\n    app: 'we-create-dir'\n  };\n  we.settings.menu.items['create-file'] = {\n    text: 'Create File',\n    app: 'we-create-file'\n  };\n}\n;\n\n//# sourceURL=webpack:///./src/app/create.js?");

/***/ }),

/***/ "./src/app/edit.js":
/*!*************************!*\
  !*** ./src/app/edit.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Edit; });\n/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../clipboard */ \"./src/clipboard.js\");\n\nfunction Edit(we) {\n  var clipboard = new _clipboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"](we);\n  we.apps.set('we-delete', function (we, file) {\n    we.client.request('delete', file.path).then(function () {\n      return we.refresh();\n    });\n  });\n  we.apps.set('we-download', function (we, file) {\n    return window.location.href = we.server + '?action=download&file=' + file.path;\n  });\n  we.apps.set('we-clipboard-clear', function () {\n    return clipboard.clear();\n  });\n  we.apps.set('we-copy', function (we, file) {\n    return clipboard.copy(file);\n  });\n  we.apps.set('we-cut', function (we, file) {\n    return clipboard.cut(file);\n  });\n  we.apps.set('we-paste', function (we) {\n    var mode = clipboard.isCut ? 'rename' : 'copy';\n    var path = we.path;\n\n    if (we.path !== '/') {\n      path = path + '/';\n    }\n\n    clipboard.clipboard.forEach(function (item) {\n      we.client.request(mode, item.path, {\n        to: path + item.name\n      }).then(function () {\n        return we.refresh();\n      });\n    });\n  });\n  we.settings.menu.items.copy = {\n    app: 'we-copy',\n    text: 'Copy',\n    before: 'we-clipboard-clear',\n    multiple: true,\n    condition: function condition(we, file) {\n      return !!file.name;\n    }\n  };\n  we.settings.menu.items[\"delete\"] = {\n    text: 'Delete',\n    app: 'we-delete',\n    multiple: true,\n    condition: function condition(we, file) {\n      return !!file.name;\n    }\n  };\n  we.settings.menu.items.cut = {\n    text: 'Cut',\n    app: 'we-cut',\n    before: 'we-clipboard-clear',\n    multiple: true,\n    condition: function condition(we, file) {\n      return !!file.name;\n    }\n  };\n  we.settings.menu.items.paste = {\n    text: 'Paste',\n    app: 'we-paste',\n    condition: function condition(we) {\n      return  true || false;\n    }\n  };\n}\n;\n\n//# sourceURL=webpack:///./src/app/edit.js?");

/***/ }),

/***/ "./src/app/open.js":
/*!*************************!*\
  !*** ./src/app/open.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Open; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar Open = /*#__PURE__*/function () {\n  function Open(we) {\n    _classCallCheck(this, Open);\n\n    _defineProperty(this, \"rules\", {});\n\n    this.we = we;\n    this.rules = we.settings.fileHandler;\n  }\n\n  _createClass(Open, [{\n    key: \"call\",\n    value: function call(file) {\n      if (file.type === 'dir') {\n        return this.openDir(file);\n      }\n\n      return this.openFile(file);\n    }\n  }, {\n    key: \"get\",\n    value: function get() {\n      var _this = this;\n\n      return function (we) {\n        var file = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n        var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n        _this.call(file);\n      };\n    }\n  }, {\n    key: \"openDir\",\n    value: function openDir(file) {\n      this.we.openDir(file.path);\n    }\n  }, {\n    key: \"openFile\",\n    value: function openFile(file) {\n      this.we.apps.call(this.fetchAppName(file), file);\n    }\n  }, {\n    key: \"fetchAppName\",\n    value: function fetchAppName(file) {\n      if (this.rules[file.mime]) {\n        return this.rules[file.mime];\n      }\n\n      var group = file.mime.split('/')[0];\n\n      if (this.rules[group]) {\n        return this.rules[group];\n      }\n\n      if (this.rules[file.extension]) {\n        return this.rules[file.extension];\n      }\n\n      return this.rules[\"default\"];\n    }\n  }]);\n\n  return Open;\n}();\n\n\n\n//# sourceURL=webpack:///./src/app/open.js?");

/***/ }),

/***/ "./src/app/viewer.js":
/*!***************************!*\
  !*** ./src/app/viewer.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Viewer; });\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modal */ \"./src/modal.js\");\n\nvar modal = new _modal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nfunction Viewer(we) {\n  we.apps.set('we-viewer-audio', function (we, file) {\n    return modal.open(file.name, '<audio controls class=\"w-100 no-outline\">' + '<source ' + 'src=\"' + we.server + '?action=view&file=' + file.path + '\" ' + 'type=\"' + file.mime + '\"' + '>' + '</audio>');\n  });\n  we.apps.set('we-viewer-image', function (we, file) {\n    return modal.open(file.name, '<img class=\"w-100\" src=\"' + we.server + '?action=view&file=' + file.path + '\">');\n  });\n  we.apps.set('we-viewer-video', function (we, file) {\n    return modal.open(file.name, '<video controls class=\"w-100\">' + '<source ' + 'src=\"' + we.server + '?action=view&file=' + file.path + '\" ' + 'type=\"' + file.mime + '\"' + '>' + '</video>');\n  });\n  we.apps.set('we-viewer-default', function (we, file) {\n    return modal.open(file.name, '<p>No file viewer is integrated!</p>');\n  });\n  we.apps.set('we-viewer-text', function (we, file) {\n    return we.client.request('view', file.path).then(function (response) {\n      return modal.open('View: ' + file.name, '<pre>' + response.xhr.responseText + '</pre>');\n    });\n  });\n}\n;\n\n//# sourceURL=webpack:///./src/app/viewer.js?");

/***/ }),

/***/ "./src/apps.js":
/*!*********************!*\
  !*** ./src/apps.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Apps; });\n/* harmony import */ var _app_open__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/open */ \"./src/app/open.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar Apps = /*#__PURE__*/function () {\n  function Apps(we) {\n    _classCallCheck(this, Apps);\n\n    _defineProperty(this, \"apps\", {});\n\n    this.we = we;\n    this.set('open', new _app_open__WEBPACK_IMPORTED_MODULE_0__[\"default\"](we).get());\n  }\n\n  _createClass(Apps, [{\n    key: \"set\",\n    value: function set(name, callback) {\n      this.apps[name] = callback;\n    }\n  }, {\n    key: \"call\",\n    value: function call(name) {\n      var file = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n      var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n      if (!this.has(name)) {\n        throw new Error('Invalid App: ' + name);\n      }\n\n      this.apps[name](this.we, file, event);\n    }\n  }, {\n    key: \"has\",\n    value: function has(name) {\n      return !!this.apps[name];\n    }\n  }]);\n\n  return Apps;\n}();\n\n\n\n//# sourceURL=webpack:///./src/apps.js?");

/***/ }),

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Client; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar Client = /*#__PURE__*/function () {\n  function Client(server) {\n    _classCallCheck(this, Client);\n\n    _defineProperty(this, \"methods\", {\n      list: 'GET',\n      view: 'GET',\n      create_file: 'GET',\n      create_dir: 'GET',\n      \"delete\": 'GET',\n      rename: 'GET',\n      copy: 'GET'\n    });\n\n    this.server = server;\n  }\n\n  _createClass(Client, [{\n    key: \"request\",\n    value: function request(action, file) {\n      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n\n      if (!this.methods[action]) {\n        throw new Error('Unsupported action: ' + action);\n      }\n\n      data.file = file;\n      var url = this.server + '?action=' + action;\n      var xhr = new XMLHttpRequest();\n      var method = this.methods[action];\n      var query = Object.keys(data).map(function (k) {\n        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);\n      }).join('&');\n\n      if (method === 'GET') {\n        url += '&' + query;\n      } else {\n        xhr.setRequestHeader(\"Content-type\", \"application/x-www-form-urlencoded\");\n      }\n\n      xhr.open(method, url, true);\n      return new Promise(function (resolve, reject) {\n        xhr.onreadystatechange = function () {\n          if (xhr.readyState == 4) {\n            var result = {\n              xhr: xhr,\n              action: action,\n              file: file,\n              data: xhr.getResponseHeader('Content-Type') === 'application/json' ? JSON.parse(xhr.responseText) : []\n            };\n\n            if (xhr.status.toString()[0] === '2') {\n              resolve(result);\n            } else {\n              reject(result);\n            }\n          }\n        };\n\n        if (method === 'GET') {\n          xhr.send();\n        } else {\n          xhr.send(query);\n        }\n      });\n    }\n  }]);\n\n  return Client;\n}();\n\n\n\n//# sourceURL=webpack:///./src/client.js?");

/***/ }),

/***/ "./src/clipboard.js":
/*!**************************!*\
  !*** ./src/clipboard.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FileClipboard; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar FileClipboard = /*#__PURE__*/function () {\n  function FileClipboard(we) {\n    _classCallCheck(this, FileClipboard);\n\n    _defineProperty(this, \"clipboard\", []);\n\n    _defineProperty(this, \"isCut\", false);\n\n    this.we = we;\n  }\n\n  _createClass(FileClipboard, [{\n    key: \"clear\",\n    value: function clear() {\n      this.clipboard = [];\n    }\n  }, {\n    key: \"copy\",\n    value: function copy(file) {\n      if (this.isCut) {\n        this.clear();\n        this.isCut = false;\n      }\n\n      this.add(file);\n    }\n  }, {\n    key: \"add\",\n    value: function add(file) {\n      this.clipboard.push(file);\n    }\n  }, {\n    key: \"cut\",\n    value: function cut(file) {\n      if (!this.isCut) {\n        this.clear();\n        this.isCut = true;\n      }\n\n      this.add(file);\n    }\n  }]);\n\n  return FileClipboard;\n}();\n\n\n\n//# sourceURL=webpack:///./src/clipboard.js?");

/***/ }),

/***/ "./src/dragfile.js":
/*!*************************!*\
  !*** ./src/dragfile.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DragFile; });\nfunction DragFile(we) {\n  we.addRowListener('dragover', function (rowEvent) {\n    var data = rowEvent.target.dataset;\n\n    if (data.app === 'back' || we.data[data.index] && we.data[data.index].type === 'dir') {\n      rowEvent.event.preventDefault();\n    }\n  });\n  we.addRowListener('dragstart', function (rowEvent) {\n    return rowEvent.event.dataTransfer.setData('application/we-file-index', rowEvent.target.dataset.index);\n  });\n  we.addRowListener('drop', function (rowEvent) {\n    rowEvent.event.preventDefault();\n    var id = rowEvent.event.dataTransfer.getData('application/we-file-index');\n    var data = rowEvent.target.dataset;\n\n    if (id === '' || id === data.index || !we.data[id]) {\n      return;\n    }\n\n    var path = we.path;\n\n    if (we.path !== '/') {\n      path = path + '/';\n    }\n\n    var location = data.app === 'back' ? we.getParent() : path + we.data[data.index].name;\n    we.selection.each(function (item) {\n      return we.client.request('rename', item.path, {\n        to: location + '/' + item.name\n      }).then(function () {\n        return we.refresh();\n      });\n    });\n  });\n}\n;\n\n//# sourceURL=webpack:///./src/dragfile.js?");

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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_viewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/viewer */ \"./src/app/viewer.js\");\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ \"./src/menu.js\");\n/* harmony import */ var _app_create__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/create */ \"./src/app/create.js\");\n/* harmony import */ var _app_edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/edit */ \"./src/app/edit.js\");\n/* harmony import */ var _dragfile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dragfile */ \"./src/dragfile.js\");\n/* harmony import */ var _we__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./we */ \"./src/we.js\");\n\n\n\n\n\n\n\nwindow.webExplorer = function (id, server) {\n  var we = new _we__WEBPACK_IMPORTED_MODULE_5__[\"default\"](id, server); //Enable Context Menu\n\n  new _menu__WEBPACK_IMPORTED_MODULE_1__[\"default\"](we); //Enable some apps\n\n  Object(_app_viewer__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(we);\n  Object(_app_create__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(we);\n  Object(_app_edit__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(we);\n  Object(_dragfile__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(we);\n  we.openDir('/');\n  return we;\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Menu; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Menu = /*#__PURE__*/function () {\n  function Menu(we) {\n    var _this = this;\n\n    _classCallCheck(this, Menu);\n\n    this.we = we;\n    this.order = we.settings.menu.order;\n    this.items = we.settings.menu.items;\n    this.outer = document.createElement('div');\n    this.outer.id = 'we-context-outer';\n    this.outer.classList.add('we-context');\n    this.outer.classList.add('card');\n    this.outer.innerHTML = '<nav id=\"we-context\" class=\"nav flex-column\"></nav>';\n    document.body.appendChild(this.outer);\n    this.menu = document.getElementById('we-context');\n    we.addRowListener('contextmenu', function (rowEvent) {\n      return _this.openMenu(rowEvent);\n    });\n    document.addEventListener('click', function () {\n      return _this.outer.style.display = 'none';\n    });\n  }\n\n  _createClass(Menu, [{\n    key: \"openMenu\",\n    value: function openMenu(rowEvent) {\n      var _this2 = this;\n\n      var file = {};\n\n      if (rowEvent.target.dataset.index) {\n        file = this.we.data[rowEvent.target.dataset.index];\n      }\n\n      rowEvent.event.preventDefault();\n      this.outer.style.left = rowEvent.event.pageX + 'px';\n      this.outer.style.top = rowEvent.event.pageY + 'px';\n      this.outer.style.display = 'block';\n      this.menu.innerHTML = '';\n      this.order.forEach(function (item) {\n        return _this2.renderItem(item, file, rowEvent);\n      });\n    }\n  }, {\n    key: \"renderItem\",\n    value: function renderItem(name, file, rowEvent) {\n      var _this3 = this;\n\n      var a = document.createElement('a');\n      a.href = '#';\n      a.classList.add('nav-link');\n\n      if (name === '-') {\n        a.classList.add('separator');\n        this.menu.appendChild(a);\n        return;\n      }\n\n      if (!this.items[name]) {\n        throw new Error('Invalid Context Entry: ' + name);\n      }\n\n      var item = this.items[name];\n      a.innerHTML = item.text;\n\n      if (item.app) {\n        a.addEventListener('click', function () {\n          return _this3.itemClick(item, file, rowEvent);\n        });\n      }\n\n      if (!item.condition || item.condition(we, file)) {\n        this.menu.appendChild(a);\n      }\n    }\n  }, {\n    key: \"itemClick\",\n    value: function itemClick(item, file, rowEvent) {\n      var _this4 = this;\n\n      if (item.before) {\n        this.we.apps.call(item.before, file, rowEvent);\n      }\n\n      if (item.multiple) {\n        this.we.selection.each(function (selectedFile) {\n          return _this4.we.apps.call(item.app, selectedFile, rowEvent);\n        });\n        return;\n      }\n\n      this.we.apps.call(item.app, file, rowEvent);\n    }\n  }]);\n\n  return Menu;\n}();\n\n\n\n//# sourceURL=webpack:///./src/menu.js?");

/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Modal; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar template = '<div class=\"we-modal-content modal-dialog modal-lg\">' + '<div class=\"modal-content\">' + '<div class=\"modal-header\">' + '<h5 class=\"modal-title\" id=\"we-modal-title\"></h5>' + '<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">' + '<span aria-hidden=\"true\">&times;</span>' + '</button>' + '</div>' + '<div class=\"modal-body\" id=\"we-modal-content\"></div>' + '<div class=\"modal-footer\">' + '<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>' + '</div>' + '</div>' + '</div>';\n\nvar Modal = /*#__PURE__*/function () {\n  function Modal() {\n    _classCallCheck(this, Modal);\n\n    if (this.modal = document.getElementById('we-modal')) {\n      return;\n    }\n\n    this.modal = document.createElement('div');\n    this.modal.id = 'we-modal';\n    this.modal.innerHTML = template;\n    document.body.appendChild(this.modal);\n  }\n\n  _createClass(Modal, [{\n    key: \"open\",\n    value: function open(title, content) {\n      document.getElementById('we-modal-title').innerHTML = title;\n      document.getElementById('we-modal-content').innerHTML = content;\n      var style = this.modal.style;\n      style.display = 'block';\n      document.querySelectorAll('[data-dismiss=\"modal\"]').forEach(function (e) {\n        return e.addEventListener('click', function () {\n          style.display = 'none';\n          document.getElementById('we-modal-title').innerHTML = '';\n          document.getElementById('we-modal-content').innerHTML = '';\n        });\n      });\n    }\n  }]);\n\n  return Modal;\n}();\n\n\n\n//# sourceURL=webpack:///./src/modal.js?");

/***/ }),

/***/ "./src/selection.js":
/*!**************************!*\
  !*** ./src/selection.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Selection; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar Selection = /*#__PURE__*/function () {\n  function Selection(we) {\n    var _this = this;\n\n    _classCallCheck(this, Selection);\n\n    _defineProperty(this, \"items\", {});\n\n    this.we = we;\n    this.we.addRowListener('click', function (rowEvent) {\n      return _this.clickListener(rowEvent);\n    });\n    this.we.addRowListener('contextmenu', function (rowEvent) {\n      return _this.contextListener(rowEvent);\n    });\n  }\n\n  _createClass(Selection, [{\n    key: \"clear\",\n    value: function clear() {\n      this.items = {};\n      Array.prototype.slice.call(this.we.e.children).forEach(function (child) {\n        child.classList.remove('we-selected');\n      });\n    }\n  }, {\n    key: \"select\",\n    value: function select(index) {\n      var _this2 = this;\n\n      this.clear();\n\n      if (!Array.isArray(index)) {\n        index = [parseInt(index)];\n      }\n\n      index.forEach(function (index) {\n        _this2.items[parseInt(index)] = _this2.we.data[index];\n\n        _this2.we.e.querySelector('[data-index=\"' + index + '\"]').classList.add('we-selected');\n      });\n    }\n  }, {\n    key: \"each\",\n    value: function each(callback) {\n      Object.values(this.items).forEach(function (file) {\n        return callback(file);\n      });\n    }\n  }, {\n    key: \"contextListener\",\n    value: function contextListener(rowEvent) {\n      rowEvent.event.preventDefault();\n\n      if (!rowEvent.target.dataset.index || this.items[rowEvent.target.dataset.index]) {\n        return;\n      }\n\n      this.clear();\n      this.select(rowEvent.target.dataset.index);\n    }\n  }, {\n    key: \"clickListener\",\n    value: function clickListener(rowEvent) {\n      var event = rowEvent.event;\n      var current = rowEvent.target.dataset.index;\n      var index = [];\n\n      if (event.ctrlKey || event.shiftKey) {\n        index = index.concat(Object.keys(this.items));\n      }\n\n      index = index.map(function (index) {\n        return parseInt(index);\n      });\n\n      if (event.shiftKey && index.length > 0) {\n        if (Math.min.apply(Math, _toConsumableArray(index)) < current) {\n          for (var i = Math.max.apply(Math, _toConsumableArray(index)) + 1; i < current; i++) {\n            index.push(i);\n          }\n        } else {\n          for (var _i = Math.min.apply(Math, _toConsumableArray(index)) - 1; _i > current; _i--) {\n            index.push(_i);\n          }\n        }\n      }\n\n      if (current || current === 0) {\n        index.push(parseInt(current));\n      }\n\n      this.select(index);\n    }\n  }]);\n\n  return Selection;\n}();\n\n\n\n//# sourceURL=webpack:///./src/selection.js?");

/***/ }),

/***/ "./src/settings/settings.js":
/*!**********************************!*\
  !*** ./src/settings/settings.js ***!
  \**********************************/
/*! exports provided: settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return settings; });\nvar settings = {\n  rows: ['icon', 'name', 'mime', 'path', 'size'],\n  renderRow: {\n    icon: function icon(file, we) {\n      return '<td><i class=\"fas fa-' + function () {\n        if (file.type === 'dir') {\n          return we.settings.icons['directory'];\n        }\n\n        if (we.settings.icons[file.mime]) {\n          return we.settings.icon[file.mime];\n        }\n\n        var group = file.mime.split('/')[0];\n\n        if (we.settings.icons[group]) {\n          return we.settings.icons[group];\n        }\n\n        if (we.settings.icons[file.extension]) {\n          return we.settings.icons[file.extension];\n        }\n\n        return we.settings.icons['default'];\n      }() + '\"></i></td>';\n    },\n    size: function size(file) {\n      if (!file.size) {\n        return '<td></td>';\n      }\n\n      if (file.size === 0) {\n        return '<td>0 Bytes</td>';\n      }\n\n      var k = 1024,\n          sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],\n          i = Math.floor(Math.log(file.size) / Math.log(k));\n      return '<td>' + parseFloat((file.size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i] + '</td>';\n    }\n  },\n  fileHandler: {\n    'audio': 'we-viewer-audio',\n    'video': 'we-viewer-video',\n    'image': 'we-viewer-image',\n    'text': 'we-viewer-text',\n    'application/json': 'we-viewer-text',\n    'default': 'we-viewer-default'\n  },\n  icons: {\n    'audio': 'file-audio',\n    'video': 'file-video',\n    'image': 'file-image',\n    'text': 'file-alt',\n    'directory': 'folder',\n    'default': 'file'\n  },\n  menu: {\n    order: ['open', 'download', '-', 'delete', 'copy', 'cut', 'paste', '-', 'create-dir', 'create-file'],\n    items: {\n      'open': {\n        text: '<b>Open</b>',\n        app: 'we-open'\n      },\n      'download': {\n        text: 'Download',\n        app: 'we-download',\n        condition: function condition(we, file) {\n          return file.type === 'file';\n        }\n      }\n    }\n  }\n};\n\n//# sourceURL=webpack:///./src/settings/settings.js?");

/***/ }),

/***/ "./src/we.js":
/*!*******************!*\
  !*** ./src/we.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return WebExplorer; });\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ \"./src/modal.js\");\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client */ \"./src/client.js\");\n/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selection */ \"./src/selection.js\");\n/* harmony import */ var _event_row__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event/row */ \"./src/event/row.js\");\n/* harmony import */ var _apps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./apps */ \"./src/apps.js\");\n/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clipboard */ \"./src/clipboard.js\");\n/* harmony import */ var _settings_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings/settings */ \"./src/settings/settings.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\nvar WebExplorer = /*#__PURE__*/function () {\n  function WebExplorer(id, server) {\n    var _this = this;\n\n    _classCallCheck(this, WebExplorer);\n\n    _defineProperty(this, \"data\", {});\n\n    _defineProperty(this, \"settings\", {});\n\n    _defineProperty(this, \"path\", '/');\n\n    _defineProperty(this, \"rowListener\", {});\n\n    this.server = server;\n    this.settings = _settings_settings__WEBPACK_IMPORTED_MODULE_6__[\"settings\"]; // Dependencies\n\n    this.modal = new _modal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.client = new _client__WEBPACK_IMPORTED_MODULE_1__[\"default\"](server);\n    this.apps = new _apps__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this);\n    this.selection = new _selection__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this); // DOM\n\n    this.e = document.getElementById(id);\n    this.e.classList.add('we'); // Initialization\n\n    this.apps.set('back', function () {\n      return _this.openDir(_this.getParent());\n    });\n    this.addRowListener('dblclick', function (rowEvent) {\n      if (rowEvent.file) {\n        return _this.apps.call('open', rowEvent.file, rowEvent.event);\n      }\n\n      if (rowEvent.target.dataset.app) {\n        return _this.apps.call(rowEvent.target.dataset.app, null, rowEvent.event);\n      }\n    });\n  }\n\n  _createClass(WebExplorer, [{\n    key: \"refresh\",\n    value: function refresh() {\n      this.openDir(this.path);\n    }\n  }, {\n    key: \"getParent\",\n    value: function getParent() {\n      var split = this.path.split('/');\n      split.pop();\n      return split.join('/');\n    }\n  }, {\n    key: \"addRowListener\",\n    value: function addRowListener(event, callback) {\n      if (!Array.isArray(this.rowListener[event])) {\n        this.rowListener[event] = [];\n      }\n\n      this.rowListener[event].push(callback);\n    }\n  }, {\n    key: \"setSettings\",\n    value: function setSettings(settings) {\n      this.settings = settings;\n    }\n  }, {\n    key: \"openDir\",\n    value: function openDir(path) {\n      var _this2 = this;\n\n      var we = this;\n      path = path === '' ? '/' : path;\n      return this.client.request('list', path).then(function (response) {\n        _this2.path = path;\n        response.data.forEach(function (value, index) {\n          response.data[index]['index'] = index;\n        });\n        we.data = response.data;\n        document.querySelectorAll(\"[data-content='we-current']\").forEach(function (e) {\n          e.innerHTML = path;\n        });\n        var html = '';\n\n        if (path !== '/') {\n          // Render Back Row at first tr\n          html += function () {\n            var before = 0;\n            var tr = '<tr data-app=\"back\" class=\"we-row\">';\n\n            _this2.settings.rows.every(function (value) {\n              if (value === 'name') {\n                return false;\n              }\n\n              before++;\n              return true;\n            });\n\n            var after = _this2.settings.rows.length - before - 1;\n\n            if (before > 0) {\n              tr += '<td colspan=\"' + before + '\"></td>';\n            }\n\n            tr += '<td>..</td>';\n\n            if (after > 0) {\n              tr += '<td colspan=\"' + after + '\"></td>';\n            }\n\n            return tr + '</tr>';\n          }();\n        }\n\n        response.data.forEach(function (file, index) {\n          return html += _this2.renderRow(file, index);\n        });\n        we.e.innerHTML = html;\n      }).then(function () {\n        return we.e.querySelectorAll('tr').forEach(function (e) {\n          return Object.keys(_this2.rowListener).forEach(function (event) {\n            return _this2.rowListener[event].forEach(function (listener) {\n              return e.addEventListener(event, function (rowEvent) {\n                return listener(new _event_row__WEBPACK_IMPORTED_MODULE_3__[\"default\"](_this2, e, rowEvent));\n              });\n            });\n          });\n        });\n      });\n    }\n  }, {\n    key: \"renderRow\",\n    value: function renderRow(file, index) {\n      var _this3 = this;\n\n      var row = '<tr class=\"we-row\" draggable=\"true\" data-app=\"we-open\" data-index=\"' + index + '\">';\n      this.settings.rows.forEach(function (rowName) {\n        return row += function () {\n          if (_this3.settings.renderRow[rowName] instanceof Function) {\n            return _this3.settings.renderRow[rowName](file, _this3);\n          }\n\n          if (typeof file[rowName] === 'undefined') {\n            return '<td></td>';\n          }\n\n          return '<td>' + file[rowName] + '</td>';\n        }();\n      });\n      return row + '</tr>';\n    }\n  }]);\n\n  return WebExplorer;\n}();\n\n\n\n//# sourceURL=webpack:///./src/we.js?");

/***/ })

/******/ });