/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var particles = {};
	var particleIndex = 0;
	var particleNum = 6;
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	// debugger;
	
	var Particle = function () {
	  function Particle(x, y) {
	    _classCallCheck(this, Particle);
	
	    this.x = x;
	    this.y = y;
	    this.endY = y + 200;
	    this.vy = 5;
	    this.gravity = 1;
	    this.colors = ["#8CBDFE", "#E75A4A", "#995AB4", "#8CE794"]; //RED, BLUE, GREEN, PURPLE
	    this.color = this.pickColor();
	    particleIndex++;
	    particles[particleIndex] = this;
	    this.id = particleIndex;
	  }
	
	  _createClass(Particle, [{
	    key: "pickColor",
	    value: function pickColor() {
	      return this.colors[Math.floor(Math.random() * 4)];
	    }
	  }, {
	    key: "draw",
	    value: function draw(context) {
	      // debugger;
	      this.y += this.vy;
	      this.vy += 1;
	      if (this.y > this.endY) {
	        this.vy *= -.3;
	        this.y = this.endY;
	      }
	      this.vy += this.gravity;
	      context.beginPath();
	      context.arc(this.x, this.y, 12, 0, Math.PI * 2, false);
	      context.fillStyle = this.color;
	      context.fill();
	      context.closePath();
	    }
	  }, {
	    key: "drop",
	    value: function drop(endX, endY) {}
	  }, {
	    key: "initialize",
	    value: function initialize() {}
	  }]);
	
	  return Particle;
	}();
	
	var locations = [[[42, 240], [42, 192], [42, 144], [42, 96], [42, 48], [42, 0]], [[90, 240], [90, 192], [90, 144], [90, 96], [90, 48], [90, 0]], [[138, 240], [138, 192], [138, 144], [138, 96], [138, 48], [138, 0]], [[186, 240], [186, 192], [186, 144], [186, 96], [186, 48], [186, 0]], [[234, 240], [234, 192], [234, 144], [234, 96], [234, 48], [234, 0]], [[282, 240], [282, 192], [282, 144], [282, 96], [282, 48], [282, 0]]];
	
	for (var j = 0; j < 6; j++) {
	  for (var i = 0; i < particleNum; i++) {
	    // debugger;
	    new Particle(locations[j][i][0], locations[j][i][1]);
	  }
	}
	
	setInterval(function () {
	  ctx.fillStyle = "white";
	  ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	  // setTimeout( () => {
	
	  for (var _i in particles) {
	    particles[_i].draw(ctx);
	  }
	  // },100);
	
	  // delete particles[20];
	  // for (let i in particles) {
	  //   particles[i].draw(ctx);
	  // }
	
	  // particles[21].vy =  5;
	  // particles[21].y =  192;
	  // particles[21].endY =  192 + 200;
	
	  // for (let i in particles) {
	  //   particles[i].draw(ctx);
	  // }
	}, 30);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map