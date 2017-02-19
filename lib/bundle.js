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
	
	var drop = document.getElementById("myAudio");
	// import drop from './drop.wav';
	
	
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	// ctx.canvas.width  = window.innerWidth;
	// ctx.canvas.height = window.innerHeight;
	var selectedParticles = [];
	var possibleTargets = [];
	
	var Game = function () {
	  function Game(ctx1) {
	    _classCallCheck(this, Game);
	
	    this.ctx = ctx1;
	    this.initialize();
	    this.restart();
	    this.timer();
	    this.drop = new Audio("lib/drop.wav");
	    this.timesout = new Audio("lib/timesout.wav");
	    this.pause = true;
	    this.connections = [];
	    this.pointsCount = 0;
	    this.particleHighlight;
	    this.lineParticles = [];
	    this.time = 60;
	    this.mute = true;
	    this.buttons = [[90, 430, 36], [234, 430, 36]]; // x, y, radius play/pause, restart
	    this.gameOver = false;
	  }
	
	  _createClass(Game, [{
	    key: 'initialize',
	    value: function initialize() {
	      var _this = this;
	
	      var breakLoop = setInterval(function () {
	        _this.ctx.fillStyle = "white";
	        _this.ctx.fillRect(0, 0, canvas.width, canvas.height);
	        _this.countDown();
	        _this.drawCircles();
	        _this.lines();
	        _this.drawButtons();
	        _this.gameover();
	
	        // if(this.gameOver === true) {
	        //   debugger;
	        //   clearInterval(breakLoop);
	        // }
	      }, 25);
	    }
	  }, {
	    key: 'timer',
	    value: function timer() {
	      var _this2 = this;
	
	      var timeInterval = setInterval(function () {
	        if (!_this2.pause) {
	          _this2.time -= 1;
	        }
	      }, 1000);
	    }
	  }, {
	    key: 'pauseG',
	    value: function pauseG() {
	      this.pause = !this.pause;
	    }
	  }, {
	    key: 'restart',
	    value: function restart() {
	      this.board = new _matrix2.default();
	      this.boardState = this.board.matrix;
	      this.pause = true;
	      this.time = 60;
	      this.pointsCount = 0;
	    }
	  }, {
	    key: 'gameover',
	    value: function gameover() {
	      if (this.time <= 0) {
	        if (this.mute) {
	          this.timesout.play();
	        }
	
	        this.restart();
	      }
	    }
	  }, {
	    key: 'muteS',
	    value: function muteS() {
	      this.mute = !this.mute;
	    }
	  }, {
	    key: 'drawButtons',
	    value: function drawButtons() {
	      if (this.pause) {
	        this.ctx.beginPath();
	        this.ctx.arc(this.buttons[0][0], this.buttons[0][1], this.buttons[0][2], 0, Math.PI * 2, false);
	        this.ctx.fillStyle = "#8CBDFE";
	        this.ctx.fill();
	        this.ctx.closePath();
	
	        this.ctx.beginPath();
	        this.ctx.strokeStyle = "#FFFFFF";
	        this.ctx.lineWidth = 1;
	        this.ctx.moveTo(76, 408);
	        this.ctx.lineTo(76, 452);
	        this.ctx.lineTo(112, 430);
	        this.ctx.lineTo(76, 408);
	        this.ctx.stroke();
	      } else {
	        this.ctx.beginPath();
	        this.ctx.arc(this.buttons[0][0], this.buttons[0][1], this.buttons[0][2], 0, Math.PI * 2, false);
	        this.ctx.fillStyle = "#E75A4A";
	        this.ctx.fill();
	        this.ctx.closePath();
	
	        this.ctx.beginPath();
	        this.ctx.strokeStyle = "#FFFFFF";
	        this.ctx.lineWidth = 1;
	        this.ctx.moveTo(78, 412);
	        this.ctx.lineTo(78, 448);
	        this.ctx.stroke();
	
	        this.ctx.beginPath();
	        this.ctx.strokeStyle = "#FFFFFF";
	        this.ctx.lineWidth = 1;
	        this.ctx.moveTo(102, 412);
	        this.ctx.lineTo(102, 448);
	        this.ctx.stroke();
	      }
	      this.ctx.beginPath();
	      this.ctx.arc(this.buttons[1][0], this.buttons[1][1], this.buttons[1][2], 0, Math.PI * 2, false);
	      this.ctx.fillStyle = "#8CE794";
	      this.ctx.fill();
	      this.ctx.closePath();
	
	      this.ctx.beginPath();
	      this.ctx.arc(234, 430, 24, 2 * Math.PI / 4, 6 * Math.PI / 4, false);
	      this.ctx.strokeStyle = "#FFFFFF";
	      this.ctx.lineTo(222, 418);
	      this.ctx.stroke();
	
	      this.ctx.beginPath();
	      this.ctx.arc(234, 430, 24, 0, 6 * Math.PI / 4, false);
	      this.ctx.strokeStyle = "#FFFFFF";
	      this.ctx.lineTo(218, 402);
	      this.ctx.stroke();
	    }
	  }, {
	    key: 'drawCircles',
	    value: function drawCircles() {
	      for (var i = 0; i < 6; i++) {
	        for (var j = 0; j < 6; j++) {
	          if (this.particleHighlight === this.boardState[i][j]) {
	            this.boardState[i][j].highlights(this.ctx);
	          } else {
	            this.boardState[i][j].initBounce(this.ctx);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'lines',
	    value: function lines() {
	      var _this3 = this;
	
	      if (this.lineParticles.length > 1) {
	        this.lineParticles.forEach(function (particle, index) {
	          if (_this3.lineParticles[index + 1]) {
	            var p2 = _this3.lineParticles[index + 1];
	            _this3.ctx.beginPath();
	            _this3.ctx.strokeStyle = particle.color;
	            _this3.ctx.lineWidth = 7;
	            _this3.ctx.moveTo(particle.x, particle.y);
	            _this3.ctx.lineTo(p2.x, p2.y);
	            _this3.ctx.stroke();
	          }
	        });
	      }
	    }
	  }, {
	    key: 'countDown',
	    value: function countDown() {
	      ctx.font = '18px Avenir Next';
	      ctx.fillStyle = "#000000 ";
	      ctx.fillText('Time: ' + this.time, 40, 50);
	
	      ctx.font = '18px Avenir Next';
	      ctx.fillStyle = "#000000 ";
	      ctx.fillText('Score: ' + this.pointsCount, 165, 50);
	
	      if (this.mute) {
	        this.ctx.beginPath();
	        this.ctx.arc(275, 45, 20, 0, Math.PI * 2, false);
	        this.ctx.fillStyle = "#FFFFFF";
	        this.ctx.fill();
	        this.ctx.closePath();
	
	        this.ctx.beginPath();
	        this.ctx.strokeStyle = "#000000";
	        this.ctx.arc(275, 45, 20, 0, Math.PI * 2, false);
	        this.ctx.stroke();
	
	        this.ctx.beginPath();
	        this.ctx.strokeStyle = "#000000";
	        this.ctx.arc(265, 45, 4, 3 * Math.PI / 2, Math.PI / 2, false);
	        this.ctx.stroke();
	
	        this.ctx.beginPath();
	        this.ctx.strokeStyle = "#000000";
	        this.ctx.arc(270, 45, 6, 3 * Math.PI / 2, Math.PI / 2, false);
	        this.ctx.stroke();
	
	        this.ctx.beginPath();
	        this.ctx.strokeStyle = "#000000";
	        this.ctx.arc(275, 45, 10, 3 * Math.PI / 2, Math.PI / 2, false);
	        this.ctx.stroke();
	      } else {
	
	        this.ctx.beginPath();
	        this.ctx.arc(275, 45, 20, 0, Math.PI * 2, false);
	        this.ctx.fillStyle = "#000000";
	        this.ctx.fill();
	        this.ctx.closePath();
	
	        this.ctx.beginPath();
	        this.ctx.strokeStyle = "#FFFFFF";
	        this.ctx.arc(275, 45, 20, 0, Math.PI * 2, false);
	        this.ctx.stroke();
	
	        this.ctx.beginPath();
	        this.ctx.strokeStyle = "#FFFFFF";
	        this.ctx.arc(265, 45, 4, 3 * Math.PI / 2, Math.PI / 2, false);
	        this.ctx.stroke();
	
	        this.ctx.beginPath();
	        this.ctx.strokeStyle = "#FFFFFF";
	        this.ctx.arc(270, 45, 6, 3 * Math.PI / 2, Math.PI / 2, false);
	        this.ctx.stroke();
	
	        this.ctx.beginPath();
	        this.ctx.strokeStyle = "#FFFFFF";
	        this.ctx.arc(275, 45, 10, 3 * Math.PI / 2, Math.PI / 2, false);
	        this.ctx.stroke();
	      }
	    }
	  }, {
	    key: 'parse',
	    value: function parse(particles) {
	      if (particles.length === 1) {
	        this.particleHighlight = particles[0];
	      } else if (particles.length > 1) {
	        this.lineParticles = particles;
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.particleHighlight = {};
	      this.lineParticles = [];
	      selectedParticles = [];
	      possibleTargets = [];
	      // for (let i = 0; i < 6; i++) {
	      //   for (let j = 0; j < 6; j++) {
	      //     this.boardState[i][j].resetParams();
	      //   }
	      // }
	    }
	  }, {
	    key: 'posibleSelect',
	    value: function posibleSelect(particle, selected) {
	      var positions = this.posiblePos(particle);
	      var possibleP = [];
	
	      this.boardState.forEach(function (col) {
	        col.forEach(function (boardP) {
	          positions.some(function (pos) {
	            if (pos[0] === boardP.i && pos[1] === boardP.j) {
	              if (particle.color === boardP.color) {
	                if (selected.includes(boardP)) {} else {
	                  possibleP.push(boardP);
	                }
	              }
	            }
	          });
	        });
	      });
	      return possibleP;
	    }
	  }, {
	    key: 'posiblePos',
	    value: function posiblePos(particle) {
	      return [[particle.i, particle.j - 1], [particle.i, particle.j + 1], [particle.i + 1, particle.j], [particle.i - 1, particle.j]];
	    }
	  }, {
	    key: 'delete',
	    value: function _delete(particles) {
	      if (this.mute) {
	        this.drop.play();
	        // debugger;
	      }
	      this.reset();
	      this.pointsCount += particles.length;
	      var cols = [];
	      var that = this;
	      var loc = _matrix.locations;
	      particles.forEach(function (particle) {
	        if (!cols.includes(particle.i)) {
	          cols.push(particle.i);
	        }
	      });
	      cols.sort();
	      cols.forEach(function (i) {
	        var newSub = [];
	        var sub = [];
	        particles.forEach(function (p) {
	          that.boardState[i].forEach(function (el) {
	            if (el != p) {
	              sub.push(el);
	            } else {
	              newSub.push(new _particle2.default(p.x, 0, 0, 0));
	            }
	          });
	          that.boardState[i] = sub.concat(newSub);
	          sub = [];
	          newSub = [];
	        });
	      });
	      cols.forEach(function (j) {
	        for (var m = 0; m < that.boardState[j].length; m++) {
	          var tempP = that.boardState[j][m];
	          tempP.i = j;
	          tempP.j = m;
	          tempP.endY = loc[j][m][1] + 100;
	          that.boardState[j][m] = tempP;
	        }
	      });
	    }
	  }]);
	
	  return Game;
	}();
	
	var game = new Game(ctx);
	
	canvas.addEventListener("click", function () {
	  var offset = canvas.getBoundingClientRect();
	  var mouseX = parseInt(event.clientX - offset.left);
	  var mouseY = parseInt(event.clientY - offset.top);
	  var flag = false;
	
	  var dbx = mouseX - game.buttons[0][0];
	  var dby = mouseY - game.buttons[0][1];
	  var radb = game.buttons[0][2] * game.buttons[0][2];
	
	  if (dbx * dbx + dby * dby < radb) {
	    game.pauseG();
	  }
	
	  var dbx2 = mouseX - game.buttons[1][0];
	  var dby2 = mouseY - game.buttons[1][1];
	  var radb2 = game.buttons[1][2] * game.buttons[1][2];
	
	  if (dbx2 * dbx2 + dby2 * dby2 < radb2) {
	    game.restart();
	  }
	
	  var dmx = mouseX - 275;
	  var dmy = mouseY - 45;
	  var radm = 20 * 20;
	
	  if (dmx * dmx + dmy * dmy < radm) {
	    game.muteS();
	  }
	
	  if (!game.pause) {
	    for (var i = 0; i < game.boardState.length; i++) {
	      var subM = game.boardState[i];
	      for (var k = 0; k < subM.length; k++) {
	        var particle = subM[k];
	        var dx = mouseX - particle.x;
	        var dy = mouseY - particle.y;
	        var rad = particle.radius * particle.radius * 4;
	
	        if (dx * dx + dy * dy < rad) {
	          // debugger;
	          flag = true;
	
	          if (selectedParticles.length === 0) {
	            possibleTargets = game.posibleSelect(particle, []);
	            selectedParticles.push(particle);
	          } else {
	            if (possibleTargets.includes(particle) && !selectedParticles.includes(particle)) {
	              possibleTargets = game.posibleSelect(particle, selectedParticles);
	
	              selectedParticles.push(particle);
	            } else {
	              flag = false;
	            }
	          }
	        }
	      }
	    }
	
	    if (flag === false) {
	      game.reset();
	    }
	    if (selectedParticles.length > 1 && possibleTargets.length === 0) {
	      game.delete(selectedParticles);
	    } else {
	      game.parse(selectedParticles);
	    }
	  }
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
	    this.endY = y + 100;
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
	        this.fade.red += 5;
	      } else {
	        this.redflag = false;
	        // this.fade.red = this.resetColor.red;
	      }
	      if (this.fade.green <= 255 && this.greenflag) {
	        this.fade.green += 5;
	      } else {
	        this.greenflag = false;
	        // this.fade.green = this.resetColor.green;
	      }
	      if (this.fade.blue <= 255 && this.blueflag) {
	        this.fade.blue += 5;
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
	      if (this.y > this.originalY + 98) {
	        // debugger;
	      }
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
	    key: "erase",
	    value: function erase() {
	      this.colorFade();
	      context.beginPath();
	      context.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2, false);
	      context.fillStyle = 'rgb(' + parseInt(this.fade.red) + ',' + parseInt(this.fade.green) + ',' + parseInt(this.fade.blue) + ')';
	      context.fill();
	      context.closePath();
	      context.beginPath();
	      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	      context.fillStyle = 'rgb(' + parseInt(this.fade.red) + ',' + parseInt(this.fade.green) + ',' + parseInt(this.fade.blue) + ')';
	      context.fill();
	      context.closePath();
	    }
	  }, {
	    key: "resetParams",
	    value: function resetParams() {
	
	      this.x = this.originalX;
	      this.y = this.originalY + 100;
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
	exports.locations = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _particle = __webpack_require__(1);
	
	var _particle2 = _interopRequireDefault(_particle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var locations = exports.locations = [[[42, 240], [42, 192], [42, 144], [42, 96], [42, 48], [42, 0]], [[90, 240], [90, 192], [90, 144], [90, 96], [90, 48], [90, 0]], [[138, 240], [138, 192], [138, 144], [138, 96], [138, 48], [138, 0]], [[186, 240], [186, 192], [186, 144], [186, 96], [186, 48], [186, 0]], [[234, 240], [234, 192], [234, 144], [234, 96], [234, 48], [234, 0]], [[282, 240], [282, 192], [282, 144], [282, 96], [282, 48], [282, 0]]];
	
	var Matrix = function () {
	  function Matrix() {
	    _classCallCheck(this, Matrix);
	
	    this.matrix = [];
	    this.sub = [];
	    this.build();
	  }
	
	  _createClass(Matrix, [{
	    key: 'build',
	    value: function build() {
	      for (var i = 0; i < 6; i++) {
	        for (var j = 0; j < 6; j++) {
	          this.sub.push(new _particle2.default(locations[i][j][0], locations[i][j][1], i, j));
	        }
	        this.matrix.push(this.sub);
	        this.sub = [];
	      }
	    }
	  }]);
	
	  return Matrix;
	}();
	
	exports.default = Matrix;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map