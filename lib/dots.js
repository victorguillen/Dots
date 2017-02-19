import Particle from './particle';
import {locations} from './matrix';
import Matrix from './matrix';
let drop = document.getElementById("myAudio");
// import drop from './drop.wav';



let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
// ctx.canvas.width  = window.innerWidth;
// ctx.canvas.height = window.innerHeight;
let selectedParticles = [];
let possibleTargets = [];


class Game {
  constructor(ctx1) {
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

  initialize() {
    let breakLoop = setInterval( () => {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.countDown();
      this.drawCircles();
      this.lines();
      this.drawButtons();
      this.gameover();


      // if(this.gameOver === true) {
      //   debugger;
      //   clearInterval(breakLoop);
      // }
    }, 25 );
  }


  timer() {
    let timeInterval = setInterval(() => {
      if(!this.pause) {
        this.time -= 1;
      }

    }, 1000);
  }

  pauseG() {
    this.pause = !this.pause;
  }

  restart() {
    this.board = new Matrix();
    this.boardState = this.board.matrix;
    this.pause = true;
    this.time = 60;
    this.pointsCount = 0;
  }

  gameover() {
    if(this.time <= 0) {
      if(this.mute) {
        this.timesout.play();
      }

      this.restart();
    }
  }

  muteS() {
    this.mute = !this.mute;
  }

  drawButtons() {
    if(this.pause) {
      this.ctx.beginPath();
      this.ctx.arc(this.buttons[0][0], this.buttons[0][1], this.buttons[0][2], 0, Math.PI*2, false);
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
      this.ctx.arc(this.buttons[0][0], this.buttons[0][1], this.buttons[0][2], 0, Math.PI*2, false);
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
    this.ctx.arc(this.buttons[1][0], this.buttons[1][1], this.buttons[1][2], 0, Math.PI*2, false);
    this.ctx.fillStyle = "#8CE794";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(234, 430, 24, 2*Math.PI/4, 6*Math.PI/4, false);
    this.ctx.strokeStyle = "#FFFFFF";
    this.ctx.lineTo(222, 418);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(234, 430, 24, 0, 6*Math.PI/4, false);
    this.ctx.strokeStyle = "#FFFFFF";
    this.ctx.lineTo(218, 402);
    this.ctx.stroke();
  }


  drawCircles() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if(this.particleHighlight === this.boardState[i][j]) {
          this.boardState[i][j].highlights(this.ctx);
        } else {
          this.boardState[i][j].initBounce(this.ctx);
        }
      }
    }
  }

  lines() {
    if(this.lineParticles.length > 1) {
      this.lineParticles.forEach( (particle, index) => {
        if(this.lineParticles[index + 1]) {
          let p2 = this.lineParticles[index + 1];
          this.ctx.beginPath();
          this.ctx.strokeStyle = particle.color;
          this.ctx.lineWidth = 7;
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      });
    }
  }

  countDown() {
    ctx.font = '18px Avenir Next';
    ctx.fillStyle = "#000000 ";
    ctx.fillText(`Time: ${this.time}`, 40 , 50);

    ctx.font = '18px Avenir Next';
    ctx.fillStyle = "#000000 ";
    ctx.fillText(`Score: ${this.pointsCount}`, 165, 50);

    if(this.mute) {
      this.ctx.beginPath();
      this.ctx.arc(275, 45, 20, 0, Math.PI*2, false);
      this.ctx.fillStyle = "#FFFFFF";
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.strokeStyle = "#000000";
      this.ctx.arc(275, 45, 20, 0, Math.PI*2, false);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.strokeStyle = "#000000";
      this.ctx.arc(265, 45, 4, 3*Math.PI/2, Math.PI/2, false);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.strokeStyle = "#000000";
      this.ctx.arc(270, 45, 6, 3*Math.PI/2, Math.PI/2, false);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.strokeStyle = "#000000";
      this.ctx.arc(275, 45, 10, 3*Math.PI/2, Math.PI/2, false);
      this.ctx.stroke();
    } else {

      this.ctx.beginPath();
      this.ctx.arc(275, 45, 20, 0, Math.PI*2, false);
      this.ctx.fillStyle = "#000000";
      this.ctx.fill();
      this.ctx.closePath();

      this.ctx.beginPath();
      this.ctx.strokeStyle = "#FFFFFF";
      this.ctx.arc(275, 45, 20, 0, Math.PI*2, false);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.strokeStyle = "#FFFFFF";
      this.ctx.arc(265, 45, 4, 3*Math.PI/2, Math.PI/2, false);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.strokeStyle = "#FFFFFF";
      this.ctx.arc(270, 45, 6, 3*Math.PI/2, Math.PI/2, false);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.strokeStyle = "#FFFFFF";
      this.ctx.arc(275, 45, 10, 3*Math.PI/2, Math.PI/2, false);
      this.ctx.stroke();
    }


  }



  parse(particles) {
    if (particles.length === 1) {
      this.particleHighlight = particles[0];
    } else if (particles.length > 1) {
      this.lineParticles = particles;
    }
  }

  reset(){
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

  posibleSelect(particle, selected) {
    let positions = this.posiblePos(particle);
    let possibleP = [];

    this.boardState.forEach( (col) => {
      col.forEach( (boardP) => {
        positions.some( (pos) => {
          if(pos[0] === boardP.i && pos[1] === boardP.j) {
            if(particle.color === boardP.color) {
              if (selected.includes(boardP)) {
              } else {
                possibleP.push(boardP);
              }
            }
          }
        });
      });
    });
    return possibleP;
  }

  posiblePos(particle) {
    return [
      [particle.i, particle.j - 1],
      [particle.i, particle.j + 1],
      [particle.i + 1, particle.j],
      [particle.i - 1, particle.j],
    ];
  }

  delete(particles) {
    if(this.mute) {
      this.drop.play();
      // debugger;
    }
    this.reset();
    this.pointsCount += particles.length;
    let cols = [];
    let that = this;
    let loc = locations;
    particles.forEach( (particle) => {
      if (!cols.includes(particle.i)) {
        cols.push(particle.i);
      }
    });
    cols.sort();
    cols.forEach( (i) => {
      let newSub = [];
      let sub = [];
      particles.forEach( (p) => {
        that.boardState[i].forEach( (el) => {
          if(el != p) {
            sub.push(el);
          } else {
            newSub.push(new Particle(p.x, 0, 0, 0));
          }
        });
        that.boardState[i] = sub.concat(newSub);
        sub = [];
        newSub = [];
      });
    });
    cols.forEach( (j) => {
      for (var m = 0; m < that.boardState[j].length; m++) {
        let tempP = that.boardState[j][m];
        tempP.i = j;
        tempP.j = m;
        tempP.endY = loc[j][m][1] + 100;
        that.boardState[j][m] = tempP;
      }
    });
  }

}

let game = new Game(ctx);

canvas.addEventListener("click", () => {
  let offset = canvas.getBoundingClientRect();
  let mouseX = parseInt(event.clientX - offset.left);
  let mouseY = parseInt(event.clientY - offset.top);
  let flag = false;

  let dbx = mouseX - game.buttons[0][0];
  let dby = mouseY - game.buttons[0][1];
  let radb = game.buttons[0][2]*game.buttons[0][2];

  if (dbx*dbx + dby*dby < radb) {
        game.pauseG();
  }

  let dbx2 = mouseX - game.buttons[1][0];
  let dby2 = mouseY - game.buttons[1][1];
  let radb2 = game.buttons[1][2]*game.buttons[1][2];

  if (dbx2*dbx2 + dby2*dby2 < radb2) {
        game.restart();
  }

  let dmx = mouseX - 275;
  let dmy = mouseY - 45;
  let radm = 20*20;

  if (dmx*dmx + dmy*dmy < radm) {
        game.muteS();
  }


  if(!game.pause) {
    for (let i = 0; i < game.boardState.length; i++) {
      let subM = game.boardState[i];
      for (let k = 0; k < subM.length; k++) {
        let particle = subM[k];
        let dx = mouseX - particle.x;
        let dy = mouseY - particle.y;
        let rad = particle.radius*particle.radius*4;

        if (dx*dx + dy*dy < rad) {
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
