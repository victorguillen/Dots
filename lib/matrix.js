import Particle from './particle';

export const locations = [
  [[42, 240], [42, 192], [42, 144], [42, 96], [42, 48], [42, 0]],
  [[90, 240], [90, 192], [90, 144], [90, 96], [90, 48], [90, 0]],
  [[138, 240], [138, 192], [138, 144], [138, 96], [138, 48], [138, 0]],
  [[186, 240], [186, 192], [186, 144], [186, 96], [186, 48], [186, 0]],
  [[234, 240], [234, 192], [234, 144], [234, 96], [234, 48], [234, 0]],
  [[282, 240], [282, 192], [282, 144], [282, 96], [282, 48], [282, 0]]
];

class Matrix {
  constructor() {
    this.matrix = [];
    this.sub = [];
    this.build();
  }

  build() {
    for (var i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        this.sub.push(new Particle(locations[i][j][0], locations[i][j][1], i, j));
      }
      this.matrix.push(this.sub);
      this.sub = [];
    }
  }
}




export default Matrix;
