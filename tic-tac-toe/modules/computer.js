import Player from './player.js';

export default class Computer extends Player {
  constructor({
    name,
    img,
    difficulty = 0,
  }) {
    super({ name, img });
    const self = this;
    self.difficulty = difficulty;
  }
}
