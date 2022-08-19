export default class MenuView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};
  }

  render() {
    const self = this;
    const { menu } = self.elements;
    const { node, appendMode = 'append' } = self.module.params;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!menu || !(menu instanceof HTMLElement)) {
      self.elements.menu = document.createElement('form');
      self.elements.menu.className = 'menu';

      node[appendMode](self.elements.menu);
    } else {
      self.elements.menu.innerHTML = '';
    }

    self.elements.menu.innerHTML = `
      <div class="menu__player">
        <div class="player player_first">
          <img class="player__image" src="./assets/player-1.png" width="512" height="512" aria-label="Player Avatar">

          <div class="player__setting">
            <div class="setting">
              <label class="setting__label" for="first-p-name">Name</label>
              <input id="first-p-name" class="setting__input" type="text" name="first-p-name" placeholder="Player X">
            </div>

            <div class="setting">
              <label class="setting__label">Type</label>

              <div class="setting-set">
                <div class="radio">
                  <input id="first-p-type-player" class="radio__input" type="radio" name="first-p-type" value="0" checked>
                  <label class="radio__label" for="first-p-type-player">Player</label>
                </div>

                <div class="radio">
                  <input id="first-p-type-computer" class="radio__input" type="radio" name="first-p-type" value="1">
                  <label class="radio__label" for="first-p-type-computer">Computer</label>
                </div>
              </div>
            </div>

            <div class="setting setting-difficulty">
              <label class="setting__label">Difficulty</label>

              <div class="setting-set">
                <div class="radio">
                  <input id="first-p-diff-n" class="radio__input" type="radio" name="first-p-diff" value="0" checked>
                  <label class="radio__label" for="first-p-diff-n">Normal</label>
                </div>

                <div class="radio">
                  <input id="first-p-diff-h" class="radio__input" type="radio" name="first-p-diff" value="1">
                  <label class="radio__label" for="first-p-diff-h">Hard</label>
                </div>

                <div class="radio">
                  <input id="first-p-diff-i" class="radio__input" type="radio" name="first-p-diff" value="2">
                  <label class="radio__label" for="first-p-diff-i">Impossible</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="player player_secnd">
          <img class="player__image" src="./assets/player-2.png" width="366" height="366" aria-label="Player Avatar">

          <div class="player__setting">
            <div class="setting">
              <label class="setting__label" for="secnd-p-name">Name</label>
              <input id="secnd-p-name" class="setting__input" type="text" name="secnd-p-name" placeholder="Player O">
            </div>

            <div class="setting">
              <label class="setting__label">Type</label>

              <div class="setting-set">
                <div class="radio">
                  <input id="secnd-p-type-player" class="radio__input" type="radio" name="secnd-p-type" value="0">
                  <label class="radio__label" for="secnd-p-type-player">Player</label>
                </div>

                <div class="radio">
                  <input id="secnd-p-type-computer" class="radio__input" type="radio" name="secnd-p-type" value="1" checked>
                  <label class="radio__label" for="secnd-p-type-computer">Computer</label>
                </div>
              </div>
            </div>

            <div class="setting setting-difficulty">
              <label class="setting__label">Difficulty</label>

              <div class="setting-set">
                <div class="radio">
                  <input id="secnd-p-diff-n" class="radio__input" type="radio" name="secnd-p-diff" value="0" checked>
                  <label class="radio__label" for="secnd-p-diff-n">Normal</label>
                </div>

                <div class="radio">
                  <input id="secnd-p-diff-h" class="radio__input" type="radio" name="secnd-p-diff" value="1">
                  <label class="radio__label" for="secnd-p-diff-h">Hard</label>
                </div>

                <div class="radio">
                  <input id="secnd-p-diff-i" class="radio__input" type="radio" name="secnd-p-diff" value="2">
                  <label class="radio__label" for="secnd-p-diff-i">Impossible</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button class="submit" type="submit" aria-label="Start Game">start game</button>
    `;

    self.module.events.publish('render');
  }
}
