/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@labsgs/problema_pruebas/library/sounds_component/sound.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@labsgs/problema_pruebas/library/sounds_component/sound.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SoundsComponent: () => (/* binding */ SoundsComponent)\n/* harmony export */ });\nclass SoundsComponent extends HTMLElement {\r\n    constructor() {\r\n        super();\r\n        this.audio = new Audio('./../../src/sounds/fairy.mp3'); \r\n    }\r\n\r\n    playSonidoMp3() {\r\n        this.audio.play();\r\n    }\r\n}\r\n\r\ncustomElements.define('sounds-component', SoundsComponent);\r\n\n\n//# sourceURL=webpack://material_problema/./node_modules/@labsgs/problema_pruebas/library/sounds_component/sound.js?");

/***/ }),

/***/ "./node_modules/@labsgs/problema_pruebas/library/timer/TimerPartComponent.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@labsgs/problema_pruebas/library/timer/TimerPartComponent.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TimerPartComponent: () => (/* binding */ TimerPartComponent)\n/* harmony export */ });\n\n\nclass TimerPartComponent extends HTMLElement {\n    constructor() {\n        super();\n        this.attachShadow({ mode: 'open' }).innerHTML = `\n            <link rel=\"stylesheet\" href=\"./../../../../src/css/style.css\">\n            <div class=\"tiempo\">\n                <span class=\"time-part horas\"></span>\n                <span>:</span>\n                <span class=\"time-part minutos\"></span>\n                <span>:</span>\n                <span class=\"time-part segundos\"></span>\n            </div>\n        `;\n        this.segundos = Number(this.getAttribute('start')) || 10;\n        this.interval = null;\n        this.updateTime();\n    }\n\n    startTime() {\n        if (!this.interval) {\n            this.interval = setInterval(() => {\n                this.segundos--;\n                if (this.segundos <= 0) {\n                    clearInterval(this.interval);\n                    this.dispatchEvent(new CustomEvent('endTime', { bubbles: true }));\n                }\n                this.updateTime();\n            }, 1000);\n        }\n    }\n\n    pauseTime() {\n        clearInterval(this.interval);\n        this.interval = null;\n    }\n\n    resetTime() {\n        this.pauseTime();\n        this.segundos = Number(this.getAttribute('start')) || 10;\n        this.updateTime();\n    }\n\n    updateTime() {\n        const horas = ('0' + Math.floor(this.segundos / 3600)).slice(-2);\n        const minutos = ('0' + Math.floor((this.segundos % 3600) / 60)).slice(-2);\n        const segundos = ('0' + (this.segundos % 60)).slice(-2);\n        this.shadowRoot.querySelector('.horas').textContent = horas;\n        this.shadowRoot.querySelector('.minutos').textContent = minutos;\n        this.shadowRoot.querySelector('.segundos').textContent = segundos;\n    }\n}\n\ncustomElements.define('timer-part-component', TimerPartComponent);\n\n\n//# sourceURL=webpack://material_problema/./node_modules/@labsgs/problema_pruebas/library/timer/TimerPartComponent.js?");

/***/ }),

/***/ "./node_modules/@labsgs/problema_pruebas/library/timer/TimerPlayerComponent.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@labsgs/problema_pruebas/library/timer/TimerPlayerComponent.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TimerPlayerComponent: () => (/* binding */ TimerPlayerComponent)\n/* harmony export */ });\n/* harmony import */ var _sounds_component_sound_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../sounds_component/sound.js */ \"./node_modules/@labsgs/problema_pruebas/library/sounds_component/sound.js\");\n\n\nclass TimerPlayerComponent extends HTMLElement {\n    constructor() {\n        super();\n        this.attachShadow({ mode: 'open' }).innerHTML = `\n            <link rel=\"stylesheet\" href=\"./../../../../src/css/style.css\">\n            <h1 class=\"smsfinish\">¡Ready!</h1>\n            <slot name=\"timerplayer\"></slot>\n            <button class=\"pause\">Pause</button>\n            <button class=\"play\">Play</button>\n            <button class=\"reset\">Reset</button> \n            <div class=\"start\">\n                <label for=\"startInput\">Configurar</label>\n                <input class=\"startInput\" id=\"startInput\" type=\"number\" value=\"10\">\n                <label for=\"startInput\">  segundos</label>\n            </div>\n            <button class=\"save\" id=\"saveButton\">Guardar</button>\n        `;\n    }\n\n    connectedCallback() {\n        const timerComponent = this.querySelector('timer-part-component');\n        const smsfinish = this.shadowRoot.querySelector('.smsfinish');\n        const startInput = this.shadowRoot.getElementById('startInput');\n        const saveButton = this.shadowRoot.getElementById('saveButton');\n\n        saveButton.addEventListener('click', () => {\n            const startValue = parseInt(startInput.value);\n            if (!isNaN(startValue)) {\n                timerComponent.setAttribute('start', startValue.toString());\n                timerComponent.resetTime();\n            }\n        });\n\n        this.shadowRoot.querySelector('.play').addEventListener('click', () => timerComponent.startTime());\n        this.shadowRoot.querySelector('.pause').addEventListener('click', () => timerComponent.pauseTime());\n        this.shadowRoot.querySelector('.reset').addEventListener('click', () => {\n            timerComponent.resetTime();\n            smsfinish.style.display = 'none';\n        });\n\n        timerComponent.addEventListener('endTime', () => {\n            smsfinish.style.display = 'block';\n            //Sonido\n            const soundsComponent = new _sounds_component_sound_js__WEBPACK_IMPORTED_MODULE_0__.SoundsComponent();\n            this.appendChild(soundsComponent);\n            soundsComponent.playSonidoMp3();\n        });\n    }\n}\n\ncustomElements.define('timer-player-component', TimerPlayerComponent);\n\n\n//# sourceURL=webpack://material_problema/./node_modules/@labsgs/problema_pruebas/library/timer/TimerPlayerComponent.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_labsgs_problema_pruebas_library_timer_TimerPartComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@labsgs/problema_pruebas/library/timer/TimerPartComponent.js */ \"./node_modules/@labsgs/problema_pruebas/library/timer/TimerPartComponent.js\");\n/* harmony import */ var _node_modules_labsgs_problema_pruebas_library_timer_TimerPlayerComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@labsgs/problema_pruebas/library/timer/TimerPlayerComponent.js */ \"./node_modules/@labsgs/problema_pruebas/library/timer/TimerPlayerComponent.js\");\n\n\nif (!customElements.get('timer-part-component')) {\n  customElements.define('timer-part-component', _node_modules_labsgs_problema_pruebas_library_timer_TimerPartComponent_js__WEBPACK_IMPORTED_MODULE_0__.TimerPartComponent);\n}\nif (!customElements.get('timer-player-component')) {\n  customElements.define('timer-player-component', _node_modules_labsgs_problema_pruebas_library_timer_TimerPlayerComponent_js__WEBPACK_IMPORTED_MODULE_1__.TimerPlayerComponent);\n}\ndocument.addEventListener('DOMContentLoaded', () => {\n  const timerDiv = document.getElementById('timer');\n  timerDiv.innerHTML = `\n    <img src=\"./src/logos/TimerPWA-logos_transparent.png\" width=\"400px\" height=\"400px\" alt=\"Logo\">\n    <timer-player-component>\n      <timer-part-component slot=\"timerplayer\"></timer-part-component>\n    </timer-player-component>\n  `;\n});\nif ('serviceWorker' in navigator) {\n  navigator.serviceWorker.register('./sw.js', {\n    scope: './'\n  }).then(() => console.log('Service worker registered')).catch(err => console.error('Failed to register service worker', err));\n}\n\n//# sourceURL=webpack://material_problema/./main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;