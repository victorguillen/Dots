let particles = {};
let particleIndex = 0;
let particleNum = 6;

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// debugger;

class Particle {
  constructor(x, y) {
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

  pickColor() {
    return (
      this.colors[Math.floor( Math.random() * (4) )]
    );
  }

  draw(context) {
    // debugger;
    this.y += this.vy;
    this.vy += 1;
    if (this.y > this.endY) {
      this.vy *= -.3;
      this.y = this.endY;
    }
    this.vy += this.gravity;
    context.beginPath();
    context.arc(this.x, this.y, 12, 0, Math.PI*2, false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  drop(endX, endY) {

  }

  initialize() {

  }
}

let locations = [
  [[42, 240], [42, 192], [42, 144], [42, 96], [42, 48], [42, 0]],
  [[90, 240], [90, 192], [90, 144], [90, 96], [90, 48], [90, 0]],
  [[138, 240], [138, 192], [138, 144], [138, 96], [138, 48], [138, 0]],
  [[186, 240], [186, 192], [186, 144], [186, 96], [186, 48], [186, 0]],
  [[234, 240], [234, 192], [234, 144], [234, 96], [234, 48], [234, 0]],
  [[282, 240], [282, 192], [282, 144], [282, 96], [282, 48], [282, 0]]
];

for (var j = 0; j < 6; j++) {
  for (let i = 0; i < particleNum; i++) {
    // debugger;
    new Particle(locations[j][i][0], locations[j][i][1]);
  }
}



setInterval( () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // setTimeout( () => {

    for (let i in particles) {
      particles[i].draw(ctx);
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
}, 30 );
