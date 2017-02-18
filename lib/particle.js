let particles = {};
let particleIndex = 0;

class Particle {

  constructor(x, y, i, j) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.i =  i;
    this.j = j;
    this.radius = 12;
    this.fadeRadius = this.radius;
    this.endY = y + 100;
    this.vy = 5;
    this.gravity = 1;
    this.redflag = true;
    this.greenflag = true;
    this.blueflag = true;
    this.colors = [
      ["#8CBDFE", {red: 140, green: 189, blue: 254}],
      ["#E75A4A", {red: 231, green: 90, blue: 74}],
      ["#995AB4", {red: 153, green: 90, blue: 180}],
      ["#8CE794", {red: 140, green: 231, blue: 148}]
    ];
    //RED, BLUE, GREEN, PURPLE
    this.pickColor();
    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;
  }

  pickColor() {
      let color = this.colors[Math.floor( Math.random() * (4) )];
      this.color = color[0];
      this.fade = color[1];
      this.resetColor = {red: color[1].red, green: color[1].green, blue: color[1].blue};
  }

  colorFade() {
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

  initBounce(context) {

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
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  render(context) {
    context.beginPath();
    context.arc(this.x, this.endY, this.radius, 0, Math.PI*2, false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  highlights(context) {

    this.colorFade();
    context.beginPath();
    context.arc(this.x, this.y, this.radius*2, 0, Math.PI*2, false);
    context.fillStyle = 'rgb(' + parseInt(this.fade.red) + ',' + parseInt(this.fade.green) + ',' + parseInt(this.fade.blue) + ')';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();

  }

  erase() {
    this.colorFade();
    context.beginPath();
    context.arc(this.x, this.y, this.radius*2, 0, Math.PI*2, false);
    context.fillStyle = 'rgb(' + parseInt(this.fade.red) + ',' + parseInt(this.fade.green) + ',' + parseInt(this.fade.blue) + ')';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    context.fillStyle = 'rgb(' + parseInt(this.fade.red) + ',' + parseInt(this.fade.green) + ',' + parseInt(this.fade.blue) + ')';
    context.fill();
    context.closePath();
  }

  resetParams() {

    this.x = this.originalX;
    this.y = this.originalY + 100;
    this.fade.blue = this.resetColor.blue;
    this.fade.green = this.resetColor.green;
    this.fade.red = this.resetColor.red;
    this.redflag = true;
    this.greenflag = true;
    this.blueflag = true;
  }
}

export default Particle;
