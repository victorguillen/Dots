import GameView from './gameView.js';

const canvasEl = document.getElementById("canvas");
const ctx = canvasEl.getContext("2d");

new GameView(ctx);
