import Game from './game.js';

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = Game;
  }

  renderCircles() {
    setTimeout(this.game.circles.bind(this.game, this.ctx), 1000);
  }
}

export default GameView;
