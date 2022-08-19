export default class Player {
  constructor({
    name = 'Default',
    img = '../assets/player-1.png',
  }) {
    const self = this;
    self.name = name;
    self.img = img;
  }
}
