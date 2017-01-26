import Particle from './particle';
import matrix from './matrix';


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let selectedParticles = [];


class Game {
  constructor(ctx1, matrix1) {
    this.ctx = ctx1;
    this.initialize();
    this.boardState = matrix1;
    this.connections = [];
  }
  initialize() {
    let breakLoop = setInterval( () => {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);
      // debugger;
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          this.boardState[i][j].initBounce(ctx);
        }
      }

      setTimeout( () => {
        this.reset();
        clearInterval(breakLoop);
      }, 700);
    }, 25 );
  }

  parse(particles) {
    if (particles.length === 1) {
      this.highlight(particles[0]);
    } else if (particles.length > 1) {

      this.lines(particles);
    }
  }

  reset(){
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        this.boardState[i][j].render(this.ctx);
        this.boardState[i][j].resetParams();
      }
    }
  }

  highlight(particle){
    let breakLoop = setInterval( () => {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          if (this.boardState[i][j].x === particle.x && this.boardState[i][j].y === particle.y) {
            particle.highlights(this.ctx);
          } else {
            this.boardState[i][j].render(this.ctx);
          }
        }
      }

      setTimeout( () => {
        this.reset();
        clearInterval(breakLoop);
      }, 700);
    }, 1 );
  }

  lines(particles) {
    let lineLoop;
    let counterX;
    let counterY;
    let pStart = particles.slice(-2)[0];
    let pEnd = particles.slice(-1)[0];

      counterX = pStart.x;
      counterY = pStart.y;
      lineLoop = setInterval( () => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = pStart.color;
        this.ctx.lineWidth = 7;
        this.ctx.moveTo(pStart.x, pStart.y);
        this.ctx.lineTo(counterX, counterY);
        this.ctx.stroke();
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
        setTimeout( () => {

          clearInterval(lineLoop);
        }, 250);
      }, 5);
    }

    particleCheck(lastP, p) {
      if(lastP.color === p.color && lastP.id != p.id) {
        let iLast = lastP.i;
        let jLast = lastP.j;
        let ip = p.i;
        let jp = p.j;
        switch (true) {
          case (iLast === ip && jLast === (jp -1)):
            return true;
          case (iLast === ip && jLast === (jp +1)):
            return true;
          case (jLast === jp && iLast === (ip -1)):
            return true;
          case (jLast === jp && iLast === (ip +1)):
            return true;
          default:
            return false;
        }
      }
      return false;
    }

}

let game = new Game(ctx, matrix);

canvas.addEventListener("click", () => {
  let offset = canvas.getBoundingClientRect();
  let mouseX = parseInt(event.clientX - offset.left);
  let mouseY = parseInt(event.clientY - offset.top);
  let flag = false;

  for (let i = 0; i < game.boardState.length; i++) {
    let subM = matrix[i];
    for (let k = 0; k < subM.length; k++) {
      let particle = subM[k];
      let dx = mouseX - particle.x;
      let dy = mouseY - particle.y;
      let rad = particle.radius*particle.radius;

      if (dx*dx + dy*dy < rad) {
        flag = true;
        // debugger;
        if (selectedParticles.length === 0) {
          selectedParticles.push(particle);
        } else {
          let lastParticle = selectedParticles.slice(-1)[0];
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
