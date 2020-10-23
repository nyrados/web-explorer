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

/***/ "./src/component/app/create.ts":
/*!*************************************!*\
  !*** ./src/component/app/create.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return create; });\nfunction createTrInput(we, after, complete) {\r\n    var tr = document.createElement('tr');\r\n    tr.innerHTML =\r\n        '<td colspan=\"' + we.settings.rows.length + '\">' +\r\n            '<input type=\"text\" class=\"form-control\" placeholder=\"Name\">';\r\n    '</td>';\r\n    after.parentNode.insertBefore(tr, after.nextSibling);\r\n    var input = tr.querySelector('input');\r\n    input.select();\r\n    input.addEventListener('blur', function () {\r\n        complete(this);\r\n    });\r\n    input.addEventListener('keypress', function (e) {\r\n        if (e.which === 13 /* Enter */) {\r\n            this.blur();\r\n        }\r\n    });\r\n}\r\nfunction create(we) {\r\n    ['file', 'dir'].forEach(function (type) {\r\n        we.apps.set('we-create-' + type, function (we, file, e) {\r\n            return createTrInput(we, e.target.parentElement, function (input) {\r\n                var create = we.path;\r\n                if (create !== '/') {\r\n                    create += '/';\r\n                }\r\n                we.client.request('create_' + type, create + input.value).then(function () { return we.refresh(); });\r\n            });\r\n        });\r\n    });\r\n    we.settings.menu.items.copy = {\r\n        app: 'we-copy',\r\n        text: 'Copy',\r\n        before: 'we-clipboard-clear',\r\n        multiple: true,\r\n        condition: function (we, file) { return file !== {}; }\r\n    };\r\n    we.settings.menu.items['create-dir'] = {\r\n        text: 'Create Directory',\r\n        app: 'we-create-dir'\r\n    };\r\n    we.settings.menu.items['create-file'] = {\r\n        text: 'Create File',\r\n        app: 'we-create-file'\r\n    };\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/component/app/create.ts?");

/***/ }),

/***/ "./src/component/app/edit.ts":
/*!***********************************!*\
  !*** ./src/component/app/edit.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return edit; });\n/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../clipboard */ \"./src/component/clipboard.ts\");\n\r\nfunction edit(we) {\r\n    var clipboard = new _clipboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    we.apps.set('we-delete', function (we, file) {\r\n        we.client.request('delete', file.path).then(function () { return we.refresh(); });\r\n    });\r\n    we.apps.set('we-download', function (we, file) {\r\n        return window.location.href = we.server + '?action=download&file=' + file.path;\r\n    });\r\n    we.apps.set('we-clipboard-clear', function () { return clipboard.clear(); });\r\n    we.apps.set('we-copy', function (we, file) { return clipboard.copy(file); });\r\n    we.apps.set('we-cut', function (we, file) { return clipboard.cut(file); });\r\n    we.apps.set('we-paste', function (we) {\r\n        var mode = clipboard.isCut ? 'rename' : 'copy';\r\n        var path = we.path;\r\n        if (we.path !== '/') {\r\n            path = path + '/';\r\n        }\r\n        clipboard.clipboard.forEach(function (item) {\r\n            we.client.request(mode, item.path, { to: path + item.name }).then(function () { return we.refresh(); });\r\n        });\r\n    });\r\n    we.settings.menu.items.copy = {\r\n        app: 'we-copy',\r\n        text: 'Copy',\r\n        before: 'we-clipboard-clear',\r\n        multiple: true,\r\n        condition: function (we, file) { return !!file.name; }\r\n    };\r\n    we.settings.menu.items.delete = {\r\n        text: 'Delete',\r\n        app: 'we-delete',\r\n        multiple: true,\r\n        condition: function (we, file) { return !!file.name; }\r\n    };\r\n    we.settings.menu.items.cut = {\r\n        text: 'Cut',\r\n        app: 'we-cut',\r\n        before: 'we-clipboard-clear',\r\n        multiple: true,\r\n        condition: function (we, file) { return !!file.name; }\r\n    };\r\n    we.settings.menu.items.paste = {\r\n        text: 'Paste',\r\n        app: 'we-paste',\r\n        condition: function (we) {\r\n            return  true || false;\r\n        }\r\n    };\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/component/app/edit.ts?");

/***/ }),

/***/ "./src/component/app/viewer.ts":
/*!*************************************!*\
  !*** ./src/component/app/viewer.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return viewer; });\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modal */ \"./src/component/modal.ts\");\n\r\nvar modal = new _modal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\nfunction viewer(we) {\r\n    we.apps.set('we-viewer-audio', function (we, file) { return modal.open(file.name, '<audio controls class=\"w-100 no-outline\">' +\r\n        '<source ' +\r\n        'src=\"' + we.server + '?action=view&file=' + file.path + '\" ' +\r\n        'type=\"' + file.mime + '\"' +\r\n        '>' +\r\n        '</audio>'); });\r\n    we.apps.set('we-viewer-image', function (we, file) { return modal.open(file.name, '<img class=\"w-100\" src=\"' + we.server + '?action=view&file=' + file.path + '\">'); });\r\n    we.apps.set('we-viewer-video', function (we, file) { return modal.open(file.name, '<video controls class=\"w-100\">' +\r\n        '<source ' +\r\n        'src=\"' + we.server + '?action=view&file=' + file.path + '\" ' +\r\n        'type=\"' + file.mime + '\"' +\r\n        '>' +\r\n        '</video>'); });\r\n    we.apps.set('we-viewer-default', function (we, file) { return modal.open(file.name, '<p>No file viewer is integrated!</p>'); });\r\n    we.apps.set('we-viewer-text', function (we, file) { return we.client.request('view', file.path)\r\n        .then(function (response) {\r\n        return modal.open('View: ' + file.name, '<pre>' + response.xhr.responseText + '</pre>');\r\n    }); });\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/component/app/viewer.ts?");

/***/ }),

/***/ "./src/component/clipboard.ts":
/*!************************************!*\
  !*** ./src/component/clipboard.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar FileClipboard = /** @class */ (function () {\r\n    function FileClipboard() {\r\n        this.clipboard = [];\r\n        this.isCut = false;\r\n    }\r\n    FileClipboard.prototype.clear = function () {\r\n        this.clipboard = [];\r\n    };\r\n    FileClipboard.prototype.copy = function (file) {\r\n        if (this.isCut) {\r\n            this.clear();\r\n            this.isCut = false;\r\n        }\r\n        this.add(file);\r\n    };\r\n    FileClipboard.prototype.add = function (file) {\r\n        this.clipboard.push(file);\r\n    };\r\n    FileClipboard.prototype.cut = function (file) {\r\n        if (!this.isCut) {\r\n            this.clear();\r\n            this.isCut = true;\r\n        }\r\n        this.add(file);\r\n    };\r\n    return FileClipboard;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (FileClipboard);\r\n\n\n//# sourceURL=webpack:///./src/component/clipboard.ts?");

/***/ }),

/***/ "./src/component/core/apps.ts":
/*!************************************!*\
  !*** ./src/component/core/apps.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _open__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./open */ \"./src/component/core/open.ts\");\n\r\nvar Apps = /** @class */ (function () {\r\n    function Apps(we) {\r\n        this.apps = {};\r\n        this.we = we;\r\n        this.set('open', (new _open__WEBPACK_IMPORTED_MODULE_0__[\"default\"](we)).get());\r\n    }\r\n    Apps.prototype.set = function (name, callback) {\r\n        this.apps[name] = callback;\r\n    };\r\n    Apps.prototype.call = function (name, file, event) {\r\n        if (!this.has(name)) {\r\n            throw new Error('Invalid App: ' + name);\r\n        }\r\n        this.apps[name](this.we, file, event);\r\n    };\r\n    Apps.prototype.has = function (name) {\r\n        return !!this.apps[name];\r\n    };\r\n    return Apps;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Apps);\r\n\n\n//# sourceURL=webpack:///./src/component/core/apps.ts?");

/***/ }),

/***/ "./src/component/core/client.ts":
/*!**************************************!*\
  !*** ./src/component/core/client.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Client = /** @class */ (function () {\r\n    function Client(server) {\r\n        this.methods = {\r\n            list: 'GET',\r\n            view: 'GET',\r\n            create_file: 'POST',\r\n            create_dir: 'POST',\r\n            delete: 'POST',\r\n            rename: 'POST',\r\n            copy: 'POST'\r\n        };\r\n        this.server = server;\r\n        this.setErrorHandler(function (error) {\r\n            console.error('Error appeared on request:');\r\n            console.error(error);\r\n        });\r\n    }\r\n    Client.prototype.setErrorHandler = function (callback) {\r\n        this.handler = callback;\r\n    };\r\n    Client.prototype.request = function (action, file, data) {\r\n        var _this = this;\r\n        if (data === void 0) { data = {}; }\r\n        if (!this.methods[action]) {\r\n            throw new Error('Unsupported action: ' + action);\r\n        }\r\n        data.file = file;\r\n        var url = this.server + '?action=' + action;\r\n        var xhr = new XMLHttpRequest();\r\n        var method = this.methods[action];\r\n        var query = Object.keys(data)\r\n            .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]); })\r\n            .join('&');\r\n        if (method === 'GET') {\r\n            url += '&' + query;\r\n        }\r\n        xhr.open(method, url, true);\r\n        if (method !== 'GET') {\r\n            xhr.setRequestHeader(\"Content-type\", \"application/x-www-form-urlencoded\");\r\n        }\r\n        return new Promise(function (resolve, reject) {\r\n            xhr.onreadystatechange = function () {\r\n                if (xhr.readyState == 4) {\r\n                    var result = {\r\n                        xhr: xhr,\r\n                        action: action,\r\n                        file: file,\r\n                        data: xhr.getResponseHeader('Content-Type') === 'application/json'\r\n                            ? JSON.parse(xhr.responseText)\r\n                            : []\r\n                    };\r\n                    if (xhr.status.toString()[0] === '2') {\r\n                        resolve(result);\r\n                    }\r\n                    else {\r\n                        _this.handler(result);\r\n                        reject(result);\r\n                    }\r\n                }\r\n            };\r\n            if (method === 'GET') {\r\n                xhr.send();\r\n            }\r\n            else {\r\n                xhr.send(query);\r\n            }\r\n        });\r\n    };\r\n    return Client;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Client);\r\n\n\n//# sourceURL=webpack:///./src/component/core/client.ts?");

/***/ }),

/***/ "./src/component/core/open.ts":
/*!************************************!*\
  !*** ./src/component/core/open.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Open = /** @class */ (function () {\r\n    function Open(we) {\r\n        this.we = we;\r\n        this.rules = we.settings.fileHandler;\r\n    }\r\n    Open.prototype.call = function (file) {\r\n        if (file.type === 'dir') {\r\n            return this.openDir(file);\r\n        }\r\n        return this.openFile(file);\r\n    };\r\n    Open.prototype.get = function () {\r\n        var _this = this;\r\n        return function (we, file) {\r\n            _this.call(file);\r\n        };\r\n    };\r\n    Open.prototype.openDir = function (file) {\r\n        this.we.openDir(file.path);\r\n    };\r\n    Open.prototype.openFile = function (file) {\r\n        this.we.apps.call(this.fetchAppName(file), file);\r\n    };\r\n    Open.prototype.fetchAppName = function (file) {\r\n        if (this.rules[file.mime]) {\r\n            return this.rules[file.mime];\r\n        }\r\n        var group = file.mime.split('/')[0];\r\n        if (this.rules[group]) {\r\n            return this.rules[group];\r\n        }\r\n        if (this.rules[file.extension]) {\r\n            return this.rules[file.extension];\r\n        }\r\n        return this.rules.default;\r\n    };\r\n    return Open;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Open);\r\n\n\n//# sourceURL=webpack:///./src/component/core/open.ts?");

/***/ }),

/***/ "./src/component/core/selection.ts":
/*!*****************************************!*\
  !*** ./src/component/core/selection.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Selection = /** @class */ (function () {\r\n    function Selection(we) {\r\n        var _this = this;\r\n        this.items = {};\r\n        this.we = we;\r\n        this.we.addRowListener('click', function (rowEvent) { return _this.clickListener(rowEvent); });\r\n        this.we.addRowListener('contextmenu', function (rowEvent) { return _this.contextListener(rowEvent); });\r\n    }\r\n    Selection.prototype.clear = function () {\r\n        this.items = {};\r\n        Array.prototype.slice.call(this.we.e.children).forEach(function (child) {\r\n            child.classList.remove('we-selected');\r\n        });\r\n    };\r\n    Selection.prototype.select = function (index) {\r\n        var _this = this;\r\n        this.clear();\r\n        if (!Array.isArray(index)) {\r\n            index = [index];\r\n        }\r\n        index.forEach(function (i) {\r\n            _this.items[i] = _this.we.data[i];\r\n            _this.we.e.querySelector('[data-index=\"' + i + '\"]').classList.add('we-selected');\r\n        });\r\n    };\r\n    Selection.prototype.each = function (callback) {\r\n        var _this = this;\r\n        Object.keys(this.items)\r\n            .map(function (string) { return parseInt(string); })\r\n            .forEach(function (key) { return callback(_this.items[key], key); });\r\n    };\r\n    Selection.prototype.contextListener = function (rowEvent) {\r\n        rowEvent.event.preventDefault();\r\n        if (!rowEvent.target.dataset.index || this.items[parseInt(rowEvent.target.dataset.index)]) {\r\n            return;\r\n        }\r\n        this.clear();\r\n        this.select(parseInt(rowEvent.target.dataset.index));\r\n    };\r\n    Selection.prototype.clickListener = function (rowEvent) {\r\n        var event = rowEvent.event;\r\n        var current = parseInt(rowEvent.target.dataset.index);\r\n        var index = [];\r\n        if (event.ctrlKey || event.shiftKey) {\r\n            index = index.concat(Object.keys(this.items).map(function (string) { return parseInt(string); }));\r\n        }\r\n        if (event.shiftKey && index.length > 0) {\r\n            if (Math.min.apply(Math, index) < current) {\r\n                for (var i = Math.max.apply(Math, index) + 1; i < current; i++) {\r\n                    index.push(i);\r\n                }\r\n            }\r\n            else {\r\n                for (var i = Math.min.apply(Math, index) - 1; i > current; i--) {\r\n                    index.push(i);\r\n                }\r\n            }\r\n        }\r\n        if (current || current === 0) {\r\n            index.push(current);\r\n        }\r\n        this.select(index);\r\n    };\r\n    return Selection;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Selection);\r\n\n\n//# sourceURL=webpack:///./src/component/core/selection.ts?");

/***/ }),

/***/ "./src/component/dragfile.ts":
/*!***********************************!*\
  !*** ./src/component/dragfile.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar DragFile = /** @class */ (function () {\r\n    function DragFile(we) {\r\n        this.we = we;\r\n    }\r\n    DragFile.prototype.register = function () {\r\n        var _this = this;\r\n        this.we.addRowListener('dragover', function (e) { return _this.over(e); });\r\n        this.we.addRowListener('dragstart', function (e) { return _this.start(e); });\r\n        this.we.addRowListener('drop', function (e) { return _this.drop(e); });\r\n    };\r\n    DragFile.prototype.start = function (rowEvent) {\r\n        rowEvent.event.dataTransfer.setData('application/we-file-index', rowEvent.target.dataset.index);\r\n    };\r\n    DragFile.prototype.over = function (rowEvent) {\r\n        var data = rowEvent.target.dataset;\r\n        var index = data.index;\r\n        if (data.app === 'back' || (this.we.data[index] && this.we.data[index].type === 'dir')) {\r\n            rowEvent.event.preventDefault();\r\n        }\r\n    };\r\n    DragFile.prototype.drop = function (rowEvent) {\r\n        var _this = this;\r\n        rowEvent.event.preventDefault();\r\n        var fileIndex = rowEvent.event.dataTransfer.getData('application/we-file-index');\r\n        var data = rowEvent.target.dataset;\r\n        if (fileIndex === '' || parseInt(fileIndex) === parseInt(data.index) || !this.we.data[parseInt(fileIndex)]) {\r\n            return false;\r\n        }\r\n        var path = this.we.path;\r\n        if (this.we.path !== '/') {\r\n            path = path + '/';\r\n        }\r\n        var location = data.app === 'back' ? this.we.getParent() : path + this.we.data[parseInt(data.index)].name;\r\n        this.we.selection.each(function (item) {\r\n            return _this.we.client.request('rename', item.path, { to: location + '/' + item.name })\r\n                .then(function () { return _this.we.refresh(); });\r\n        });\r\n    };\r\n    return DragFile;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (DragFile);\r\n\n\n//# sourceURL=webpack:///./src/component/dragfile.ts?");

/***/ }),

/***/ "./src/component/menu.ts":
/*!*******************************!*\
  !*** ./src/component/menu.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n;\r\nvar Menu = /** @class */ (function () {\r\n    function Menu(we) {\r\n        var _this = this;\r\n        this.we = we;\r\n        this.order = we.settings.menu.order;\r\n        this.items = we.settings.menu.items;\r\n        this.outer = document.createElement('div');\r\n        this.outer.id = 'we-context-outer';\r\n        this.outer.classList.add('we-context');\r\n        this.outer.classList.add('card');\r\n        this.outer.innerHTML = '<nav id=\"we-context\" class=\"nav flex-column\"></nav>';\r\n        document.body.appendChild(this.outer);\r\n        this.menu = document.getElementById('we-context');\r\n        we.addRowListener('contextmenu', function (rowEvent) { return _this.openMenu(rowEvent); });\r\n        document.addEventListener('click', function () { return _this.outer.style.display = 'none'; });\r\n    }\r\n    Menu.prototype.openMenu = function (rowEvent) {\r\n        var _this = this;\r\n        var file;\r\n        if (rowEvent.target.dataset.index) {\r\n            file = this.we.data[rowEvent.target.dataset.index];\r\n        }\r\n        rowEvent.event.preventDefault();\r\n        var event = rowEvent.event;\r\n        this.outer.style.left = event.pageX + 'px';\r\n        this.outer.style.top = event.pageY + 'px';\r\n        this.outer.style.display = 'block';\r\n        this.menu.innerHTML = '';\r\n        this.order.forEach(function (item) { return _this.renderItem(item, file, rowEvent); });\r\n    };\r\n    Menu.prototype.renderItem = function (name, file, rowEvent) {\r\n        var _this = this;\r\n        var a = document.createElement('a');\r\n        a.href = '#';\r\n        a.classList.add('nav-link');\r\n        if (name === '-') {\r\n            a.classList.add('separator');\r\n            this.menu.appendChild(a);\r\n            return;\r\n        }\r\n        if (!this.items[name]) {\r\n            throw new Error('Invalid Context Entry: ' + name);\r\n        }\r\n        var item = this.items[name];\r\n        a.innerHTML = item.text;\r\n        if (item.app) {\r\n            a.addEventListener('click', function () { return _this.itemClick(item, file, rowEvent); });\r\n        }\r\n        if (!item.condition || item.condition(this.we, file)) {\r\n            this.menu.appendChild(a);\r\n        }\r\n    };\r\n    Menu.prototype.itemClick = function (item, file, rowEvent) {\r\n        var _this = this;\r\n        if (item.before) {\r\n            this.we.apps.call(item.before, file, rowEvent.event);\r\n        }\r\n        if (item.multiple) {\r\n            this.we.selection.each(function (selectedFile) {\r\n                return _this.we.apps.call(item.app, selectedFile, rowEvent.event);\r\n            });\r\n            return;\r\n        }\r\n        this.we.apps.call(item.app, file, rowEvent.event);\r\n    };\r\n    return Menu;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Menu);\r\n\n\n//# sourceURL=webpack:///./src/component/menu.ts?");

/***/ }),

/***/ "./src/component/modal.ts":
/*!********************************!*\
  !*** ./src/component/modal.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar template = \"<div class=\\\"we-modal-content modal-dialog modal-lg\\\">\\n        <div class=\\\"modal-content\\\">\\n            <div class=\\\"modal-header\\\">\\n                <h5 class=\\\"modal-title\\\" id=\\\"we-modal-title\\\"></h5>\\n                <button type=\\\"button\\\" class=\\\"close\\\" data-dismiss=\\\"modal\\\" aria-label=\\\"Close\\\">\\n                <span aria-hidden=\\\"true\\\">&times;</span>\\n                </button>\\n            </div>\\n            <div class=\\\"modal-body\\\" id=\\\"we-modal-content\\\"></div>\\n            <div class=\\\"modal-footer\\\">\\n                <button type=\\\"button\\\" class=\\\"btn btn-secondary\\\" data-dismiss=\\\"modal\\\">Close</button>\\n            </div>\\n        </div>\\n    </div>\";\r\nvar Modal = /** @class */ (function () {\r\n    function Modal() {\r\n        if (this.modal = document.getElementById('we-modal')) {\r\n            return;\r\n        }\r\n        this.modal = document.createElement('div');\r\n        this.modal.id = 'we-modal';\r\n        this.modal.innerHTML = template;\r\n        document.body.appendChild(this.modal);\r\n    }\r\n    Modal.prototype.open = function (title, content) {\r\n        document.getElementById('we-modal-title').innerHTML = title;\r\n        document.getElementById('we-modal-content').innerHTML = content;\r\n        var style = this.modal.style;\r\n        style.display = 'block';\r\n        document.querySelectorAll('[data-dismiss=\"modal\"]').forEach(function (e) {\r\n            return e.addEventListener('click', function () {\r\n                style.display = 'none';\r\n                document.getElementById('we-modal-title').innerHTML = '';\r\n                document.getElementById('we-modal-content').innerHTML = '';\r\n            });\r\n        });\r\n    };\r\n    return Modal;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Modal);\r\n\n\n//# sourceURL=webpack:///./src/component/modal.ts?");

/***/ }),

/***/ "./src/component/modal_error_handler.ts":
/*!**********************************************!*\
  !*** ./src/component/modal_error_handler.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return handleModalError; });\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ \"./src/component/modal.ts\");\n\r\nfunction handleModalError(error) {\r\n    (new _modal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()).open('Error!', '<p>An error occured during <code>' + error.action + '</code> on file <code>' + error.file + '</code>!<p>' +\r\n        '<p><pre>' + error.data.message + \"\\n\\n\" + '<small>(' + error.data.error + ')</small></pre></p>');\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/component/modal_error_handler.ts?");

/***/ }),

/***/ "./src/event/row.ts":
/*!**************************!*\
  !*** ./src/event/row.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar RowEvent = /** @class */ (function () {\r\n    function RowEvent(we, target, event) {\r\n        this.target = target;\r\n        this.event = event;\r\n        this.we = we;\r\n        if (target.dataset.index) {\r\n            this.index = parseInt(target.dataset.index);\r\n            this.file = we.data[target.dataset.index];\r\n        }\r\n    }\r\n    return RowEvent;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (RowEvent);\r\n\n\n//# sourceURL=webpack:///./src/event/row.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _we__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./we */ \"./src/we.ts\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ \"./src/settings.ts\");\n/* harmony import */ var _component_app_viewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/app/viewer */ \"./src/component/app/viewer.ts\");\n/* harmony import */ var _component_app_create__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/app/create */ \"./src/component/app/create.ts\");\n/* harmony import */ var _component_app_edit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/app/edit */ \"./src/component/app/edit.ts\");\n/* harmony import */ var _component_dragfile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/dragfile */ \"./src/component/dragfile.ts\");\n/* harmony import */ var _component_menu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/menu */ \"./src/component/menu.ts\");\n/* harmony import */ var _component_modal_error_handler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./component/modal_error_handler */ \"./src/component/modal_error_handler.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nwindow.webExplorer = function (id, server) {\r\n    var we = new _we__WEBPACK_IMPORTED_MODULE_0__[\"default\"](id, server, _settings__WEBPACK_IMPORTED_MODULE_1__[\"settings\"]);\r\n    we.client.setErrorHandler(_component_modal_error_handler__WEBPACK_IMPORTED_MODULE_7__[\"default\"]);\r\n    //Enable some stuff\r\n    Object(_component_app_viewer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(we);\r\n    Object(_component_app_create__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(we);\r\n    Object(_component_app_edit__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(we);\r\n    //Enable components \r\n    var drag = new _component_dragfile__WEBPACK_IMPORTED_MODULE_5__[\"default\"](we);\r\n    drag.register();\r\n    new _component_menu__WEBPACK_IMPORTED_MODULE_6__[\"default\"](we);\r\n    we.openDir('/');\r\n    return we;\r\n};\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/settings.ts":
/*!*************************!*\
  !*** ./src/settings.ts ***!
  \*************************/
/*! exports provided: settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return settings; });\nvar settings = {\r\n    rows: ['icon', 'name', 'mime', 'path', 'size'],\r\n    renderRow: {\r\n        icon: function (we, file) {\r\n            return '<td><i class=\"fas fa-' +\r\n                (function () {\r\n                    if (file.type === 'dir') {\r\n                        return we.settings.icons['directory'];\r\n                    }\r\n                    if (we.settings.icons[file.mime]) {\r\n                        return we.settings.icon[file.mime];\r\n                    }\r\n                    var group = file.mime.split('/')[0];\r\n                    if (we.settings.icons[group]) {\r\n                        return we.settings.icons[group];\r\n                    }\r\n                    if (we.settings.icons[file.extension]) {\r\n                        return we.settings.icons[file.extension];\r\n                    }\r\n                    return we.settings.icons['default'];\r\n                })() +\r\n                '\"></i></td>';\r\n        },\r\n        size: function (we, file) {\r\n            if (!file.size) {\r\n                return '<td></td>';\r\n            }\r\n            if (file.size === 0) {\r\n                return '<td>0 Bytes</td>';\r\n            }\r\n            var k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(file.size) / Math.log(k));\r\n            return '<td>' + parseFloat((file.size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i] + '</td>';\r\n        }\r\n    },\r\n    fileHandler: {\r\n        'audio': 'we-viewer-audio',\r\n        'video': 'we-viewer-video',\r\n        'image': 'we-viewer-image',\r\n        'text': 'we-viewer-text',\r\n        'application/json': 'we-viewer-text',\r\n        'default': 'we-viewer-default'\r\n    },\r\n    icons: {\r\n        'audio': 'file-audio',\r\n        'video': 'file-video',\r\n        'image': 'file-image',\r\n        'text': 'file-alt',\r\n        'directory': 'folder',\r\n        'default': 'file'\r\n    },\r\n    menu: {\r\n        order: ['open', 'download', '-', 'delete', 'copy', 'cut', 'paste', '-', 'create-dir', 'create-file'],\r\n        items: {\r\n            open: {\r\n                text: '<b>Open</b>',\r\n                app: 'we-open'\r\n            },\r\n            download: {\r\n                text: 'Download',\r\n                app: 'we-download',\r\n                condition: function (we, file) { return file.type === 'file'; }\r\n            }\r\n        }\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./src/settings.ts?");

/***/ }),

/***/ "./src/we.ts":
/*!*******************!*\
  !*** ./src/we.ts ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component/modal */ \"./src/component/modal.ts\");\n/* harmony import */ var _component_core_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/core/client */ \"./src/component/core/client.ts\");\n/* harmony import */ var _component_core_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/core/selection */ \"./src/component/core/selection.ts\");\n/* harmony import */ var _event_row__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./event/row */ \"./src/event/row.ts\");\n/* harmony import */ var _component_core_apps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/core/apps */ \"./src/component/core/apps.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\n\r\n\r\n\r\n\r\n\r\nvar WebExplorer = /** @class */ (function () {\r\n    function WebExplorer(id, server, settings) {\r\n        var _this = this;\r\n        this.data = [];\r\n        this.path = '/';\r\n        this.modal = new _component_modal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.rowListener = {};\r\n        this.settings = settings;\r\n        // Dependencies\r\n        this.modal = new _component_modal__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.client = new _component_core_client__WEBPACK_IMPORTED_MODULE_1__[\"default\"](server);\r\n        this.apps = new _component_core_apps__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this);\r\n        this.selection = new _component_core_selection__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this);\r\n        this.server = server;\r\n        // DOM\r\n        this.e = document.getElementById(id);\r\n        this.e.classList.add('we');\r\n        // Initialization\r\n        this.apps.set('back', function () { return _this.openDir(_this.getParent()); });\r\n        this.addRowListener('dblclick', function (rowEvent) {\r\n            if (rowEvent.file) {\r\n                return _this.apps.call('open', rowEvent.file, rowEvent.event);\r\n            }\r\n            if (rowEvent.target.dataset.app) {\r\n                return _this.apps.call(rowEvent.target.dataset.app, null, rowEvent.event);\r\n            }\r\n        });\r\n    }\r\n    ;\r\n    WebExplorer.prototype.refresh = function () {\r\n        this.openDir(this.path);\r\n    };\r\n    WebExplorer.prototype.getParent = function () {\r\n        var split = this.path.split('/');\r\n        split.pop();\r\n        return split.join('/');\r\n    };\r\n    WebExplorer.prototype.addRowListener = function (event, callback) {\r\n        if (!Array.isArray(this.rowListener[event])) {\r\n            this.rowListener[event] = [];\r\n        }\r\n        this.rowListener[event].push(callback);\r\n    };\r\n    WebExplorer.prototype.setSettings = function (settings) {\r\n        this.settings = settings;\r\n    };\r\n    WebExplorer.prototype.openDir = function (path) {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var we;\r\n            var _this = this;\r\n            return __generator(this, function (_a) {\r\n                we = this;\r\n                path = path === '' ? '/' : path;\r\n                return [2 /*return*/, this.client.request('list', path)\r\n                        .then(function (response) {\r\n                        _this.path = path;\r\n                        response.data.forEach(function (value, index) {\r\n                            response.data[index]['index'] = index;\r\n                        });\r\n                        we.data = response.data;\r\n                        document.querySelectorAll(\"[data-content='we-current']\").forEach(function (e) {\r\n                            e.innerHTML = path;\r\n                        });\r\n                        var html = '';\r\n                        if (path !== '/') {\r\n                            // Render Back Row at first tr\r\n                            html += (function () {\r\n                                var before = 0;\r\n                                var tr = '<tr data-app=\"back\" class=\"we-row\">';\r\n                                _this.settings.rows.every(function (value) {\r\n                                    if (value === 'name') {\r\n                                        return false;\r\n                                    }\r\n                                    before++;\r\n                                    return true;\r\n                                });\r\n                                var after = _this.settings.rows.length - before - 1;\r\n                                if (before > 0) {\r\n                                    tr += '<td colspan=\"' + before + '\"></td>';\r\n                                }\r\n                                tr += '<td>..</td>';\r\n                                if (after > 0) {\r\n                                    tr += '<td colspan=\"' + after + '\"></td>';\r\n                                }\r\n                                return tr + '</tr>';\r\n                            })();\r\n                        }\r\n                        response.data.forEach(function (file, index) { return html += _this.renderRow(file, index); });\r\n                        we.e.innerHTML = html;\r\n                    })\r\n                        .then(function () {\r\n                        return we.e.querySelectorAll('tr').forEach(function (e) {\r\n                            return Object.keys(_this.rowListener).forEach(function (event) {\r\n                                return _this.rowListener[event].forEach(function (listener) {\r\n                                    return e.addEventListener(event, function (rowEvent) { return listener(new _event_row__WEBPACK_IMPORTED_MODULE_3__[\"default\"](_this, e, rowEvent)); });\r\n                                });\r\n                            });\r\n                        });\r\n                    })];\r\n            });\r\n        });\r\n    };\r\n    WebExplorer.prototype.renderRow = function (file, index) {\r\n        var _this = this;\r\n        var row = '<tr class=\"we-row\" draggable=\"true\" data-app=\"we-open\" data-index=\"' + index + '\">';\r\n        this.settings.rows.forEach(function (rowName) {\r\n            return row += (function () {\r\n                if (_this.settings.renderRow[rowName] instanceof Function) {\r\n                    return _this.settings.renderRow[rowName](_this, file);\r\n                }\r\n                if (file.hasOwnProperty(rowName)) {\r\n                    return '<td>' + file[rowName] + '</td>';\r\n                }\r\n                return '<td></td>';\r\n            })();\r\n        });\r\n        return row + '</tr>';\r\n    };\r\n    return WebExplorer;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (WebExplorer);\r\n\n\n//# sourceURL=webpack:///./src/we.ts?");

/***/ })

/******/ });