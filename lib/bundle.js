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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _particle = __webpack_require__(1);
	
	var _particle2 = _interopRequireDefault(_particle);
	
	var _matrix = __webpack_require__(2);
	
	var _matrix2 = _interopRequireDefault(_matrix);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var selectedParticles = [];
	
	var Game = function () {
	  function Game(ctx1, matrix1) {
	    _classCallCheck(this, Game);
	
	    this.ctx = ctx1;
	    this.initialize();
	    this.boardState = matrix1;
	    this.connections = [];
	  }
	
	  _createClass(Game, [{
	    key: 'initialize',
	    value: function initialize() {
	      var _this = this;
	
	      var breakLoop = setInterval(function () {
	        _this.ctx.fillStyle = "white";
	        _this.ctx.fillRect(0, 0, canvas.width, canvas.height);
	        // debugger;
	        for (var i = 0; i < 6; i++) {
	          for (var j = 0; j < 6; j++) {
	            _this.boardState[i][j].initBounce(ctx);
	          }
	        }
	
	        setTimeout(function () {
	          _this.reset();
	          clearInterval(breakLoop);
	        }, 700);
	      }, 25);
	    }
	  }, {
	    key: 'parse',
	    value: function parse(particles) {
	      if (particles.length === 1) {
	        this.highlight(particles[0]);
	      } else if (particles.length > 1) {
	
	        this.lines(particles);
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      for (var i = 0; i < 6; i++) {
	        for (var j = 0; j < 6; j++) {
	          this.boardState[i][j].render(this.ctx);
	          this.boardState[i][j].resetParams();
	        }
	      }
	    }
	  }, {
	    key: 'highlight',
	    value: function highlight(particle) {
	      var _this2 = this;
	
	      var breakLoop = setInterval(function () {
	        _this2.ctx.fillStyle = "white";
	        _this2.ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	        for (var i = 0; i < 6; i++) {
	          for (var j = 0; j < 6; j++) {
	            if (_this2.boardState[i][j].x === particle.x && _this2.boardState[i][j].y === particle.y) {
	              particle.highlights(_this2.ctx);
	            } else {
	              _this2.boardState[i][j].render(_this2.ctx);
	            }
	          }
	        }
	
	        setTimeout(function () {
	          _this2.reset();
	          clearInterval(breakLoop);
	        }, 700);
	      }, 1);
	    }
	  }, {
	    key: 'lines',
	    value: function lines(particles) {
	      var _this3 = this;
	
	      var lineLoop = void 0;
	      var counterX = void 0;
	      var counterY = void 0;
	      var pStart = particles.slice(-2)[0];
	      var pEnd = particles.slice(-1)[0];
	
	      counterX = pStart.x;
	      counterY = pStart.y;
	      lineLoop = setInterval(function () {
	        _this3.ctx.beginPath();
	        _this3.ctx.strokeStyle = pStart.color;
	        _this3.ctx.lineWidth = 7;
	        _this3.ctx.moveTo(pStart.x, pStart.y);
	        _this3.ctx.lineTo(counterX, counterY);
	        _this3.ctx.stroke();
	        if (pStart.x === pEnd.x) {
	          if (pStart.y > pEnd.y) {
	            counterY -= 1;
	          } else if (pStart.y < pEnd.y) {
	            counterY += 1;
	          }
	        }
	        if (pStart.y === pEnd.y) {
	          if (pStart.x > pEnd.x) {
	            counterX -= 1;
	          } else if (pStart.x < pEnd.x) {
	            counterX += 1;
	          }
	        }
	        setTimeout(function () {
	
	          clearInterval(lineLoop);
	        }, 250);
	      }, 5);
	    }
	  }, {
	    key: 'particleCheck',
	    value: function particleCheck(lastP, p) {
	      if (lastP.color === p.color && lastP.id != p.id) {
	        var iLast = lastP.i;
	        var jLast = lastP.j;
	        var ip = p.i;
	        var jp = p.j;
	        switch (true) {
	          case iLast === ip && jLast === jp - 1:
	            return true;
	          case iLast === ip && jLast === jp + 1:
	            return true;
	          case jLast === jp && iLast === ip - 1:
	            return true;
	          case jLast === jp && iLast === ip + 1:
	            return true;
	          default:
	            return false;
	        }
	      }
	      return false;
	    }
	  }]);
	
	  return Game;
	}();
	
	var game = new Game(ctx, _matrix2.default);
	
	canvas.addEventListener("click", function () {
	  var offset = canvas.getBoundingClientRect();
	  var mouseX = parseInt(event.clientX - offset.left);
	  var mouseY = parseInt(event.clientY - offset.top);
	  var flag = false;
	
	  for (var i = 0; i < game.boardState.length; i++) {
	    var subM = _matrix2.default[i];
	    for (var k = 0; k < subM.length; k++) {
	      var particle = subM[k];
	      var dx = mouseX - particle.x;
	      var dy = mouseY - particle.y;
	      var rad = particle.radius * particle.radius;
	
	      if (dx * dx + dy * dy < rad) {
	        flag = true;
	        // debugger;
	        if (selectedParticles.length === 0) {
	          selectedParticles.push(particle);
	        } else {
	          var lastParticle = selectedParticles.slice(-1)[0];
	          if (game.particleCheck(lastParticle, particle)) {
	            selectedParticles.push(particle);
	          } else {
	            flag = false;
	          }
	        }
	      }
	    }
	  }
	  // debugger;
	  if (flag === false) {
	    selectedParticles = [];
	    game.reset();
	  }
	  console.log(selectedParticles);
	  game.parse(selectedParticles);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var particles = {};
	var particleIndex = 0;
	
	var Particle = function () {
	  function Particle(x, y, i, j) {
	    _classCallCheck(this, Particle);
	
	    this.x = x;
	    this.y = y;
	    this.originalX = x;
	    this.originalY = y;
	    this.i = i;
	    this.j = j;
	    this.radius = 12;
	    this.fadeRadius = this.radius;
	    this.endY = y + 200;
	    this.vy = 5;
	    this.gravity = 1;
	    this.redflag = true;
	    this.greenflag = true;
	    this.blueflag = true;
	    this.colors = [["#8CBDFE", { red: 140, green: 189, blue: 254 }], ["#E75A4A", { red: 231, green: 90, blue: 74 }], ["#995AB4", { red: 153, green: 90, blue: 180 }], ["#8CE794", { red: 140, green: 231, blue: 148 }]];
	    //RED, BLUE, GREEN, PURPLE
	    this.pickColor();
	    particleIndex++;
	    particles[particleIndex] = this;
	    this.id = particleIndex;
	  }
	
	  _createClass(Particle, [{
	    key: "pickColor",
	    value: function pickColor() {
	      var color = this.colors[Math.floor(Math.random() * 4)];
	      this.color = color[0];
	      this.fade = color[1];
	      this.resetColor = { red: color[1].red, green: color[1].green, blue: color[1].blue };
	    }
	  }, {
	    key: "colorFade",
	    value: function colorFade() {
	      if (this.fade.red <= 255 && this.redflag) {
	        this.fade.red += 1;
	      } else {
	        this.redflag = false;
	        // this.fade.red = this.resetColor.red;
	      }
	      if (this.fade.green <= 255 && this.greenflag) {
	        this.fade.green += 1;
	      } else {
	        this.greenflag = false;
	        // this.fade.green = this.resetColor.green;
	      }
	      if (this.fade.blue <= 255 && this.blueflag) {
	        this.fade.blue += 1;
	      } else {
	        this.blueflag = false;
	        // this.fade.blue = this.resetColor.blue;
	      }
	    }
	  }, {
	    key: "initBounce",
	    value: function initBounce(context) {
	
	      this.y += this.vy;
	      this.vy += 1;
	      if (this.y > this.endY) {
	        this.vy *= -.3;
	        this.y = this.endY;
	      }
	      this.vy += this.gravity;
	      context.beginPath();
	      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	      context.fillStyle = this.color;
	      context.fill();
	      context.closePath();
	    }
	  }, {
	    key: "render",
	    value: function render(context) {
	      context.beginPath();
	      context.arc(this.x, this.endY, this.radius, 0, Math.PI * 2, false);
	      context.fillStyle = this.color;
	      context.fill();
	      context.closePath();
	    }
	  }, {
	    key: "highlights",
	    value: function highlights(context) {
	
	      this.colorFade();
	      context.beginPath();
	      context.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2, false);
	      context.fillStyle = 'rgb(' + parseInt(this.fade.red) + ',' + parseInt(this.fade.green) + ',' + parseInt(this.fade.blue) + ')';
	      context.fill();
	      context.closePath();
	      context.beginPath();
	      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	      context.fillStyle = this.color;
	      context.fill();
	      context.closePath();
	    }
	  }, {
	    key: "resetParams",
	    value: function resetParams() {
	
	      this.x = this.originalX;
	      this.y = this.originalY + 200;
	      this.fade.blue = this.resetColor.blue;
	      this.fade.green = this.resetColor.green;
	      this.fade.red = this.resetColor.red;
	      this.redflag = true;
	      this.greenflag = true;
	      this.blueflag = true;
	    }
	  }]);
	
	  return Particle;
	}();
	
	exports.default = Particle;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _particle = __webpack_require__(1);
	
	var _particle2 = _interopRequireDefault(_particle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var locations = [[[42, 240], [42, 192], [42, 144], [42, 96], [42, 48], [42, 0]], [[90, 240], [90, 192], [90, 144], [90, 96], [90, 48], [90, 0]], [[138, 240], [138, 192], [138, 144], [138, 96], [138, 48], [138, 0]], [[186, 240], [186, 192], [186, 144], [186, 96], [186, 48], [186, 0]], [[234, 240], [234, 192], [234, 144], [234, 96], [234, 48], [234, 0]], [[282, 240], [282, 192], [282, 144], [282, 96], [282, 48], [282, 0]]];
	var matrix = [];
	var sub = [];
	
	for (var i = 0; i < 6; i++) {
	  for (var j = 0; j < 6; j++) {
	    sub.push(new _particle2.default(locations[i][j][0], locations[i][j][1], i, j));
	  }
	  matrix.push(sub);
	  sub = [];
	}
	
	exports.default = matrix;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map