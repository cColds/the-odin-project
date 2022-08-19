import Menu from '../menu/menu.js';
import Game from '../game/game.js';
import Modal from '../modal/modal.js';
import FormApply from '../formApply/formApply.js';

export default class AppView {
  constructor(module) {
    const self = this;
    self.module = module;
    self.elements = {};

    // Events
    self.module.events
      .subscribe('renderScene', (params) => self.renderScene(params))
      .subscribe('showPlayerTurn', (sign) => self.showPlayerTurn(sign))
      .subscribe('modalWinner', (player) => {
        self.showMessage({
          message: `<span class="message_bolder">${player.name}</span> won this game!`,
        });
      })
      .subscribe('modalDraw', () => {
        self.showMessage({
          message: '<span class="message_bolder">DRAW</span>...',
        });
      });
  }

  showMessage({ message }) {
    const self = this;
    const { modal } = self.elements;

    (() => new FormApply({
      node: modal.view.elements.content,
      message,
      btn: {
        submit: {
          title: 'RESTART',
          callback: () => {
            modal.controller.hide();
            self.module.events.publish('resetGame');
          },
        },
        reset: {
          title: 'MENU',
          callback: () => {
            modal.controller.hide();
            self.module.events.publish('goToMenu');
          },
        },
      },
    }))();

    modal.controller.setTitle('Message');
    modal.controller.show();
  }

  showPlayerTurn(sign) {
    const self = this;
    const { scene } = self.elements;

    scene.controller.showPlayerTurn(sign);
  }

  renderScene(params) {
    const self = this;
    const { appMain } = self.elements;

    appMain.innerHTML = '';

    if (params.name === 'menu') {
      self.elements.scene = new Menu({
        node: appMain,
      });

      self.elements.scene.module.events
        .subscribe('submit', (formData) => self.module.events.publish('createPlayers', formData));
    } else if (params.name === 'game') {
      self.elements.scene = new Game({
        node: appMain,
        players: params.players,
      });

      self.module.events
        .subscribe('setCell', (data) => self.elements.scene.controller.setCell(data));

      self.elements.scene.module.events
        .subscribe('setTurn', (cell) => self.module.events.publish('setTurn', cell));
    }
  }

  render() {
    const self = this;
    const { app } = self.elements;
    const { node, appendMode = 'append' } = self.module.params;

    if (!(node instanceof HTMLElement)) {
      throw new Error('Can\'t rendering, bad node');
    }

    if (!app || !(app instanceof HTMLElement)) {
      self.elements.app = document.createElement('div');
      self.elements.app.className = 'app';

      node[appendMode](self.elements.app);
    } else {
      self.elements.app.innerHTML = '';
    }

    self.elements.app.innerHTML = `
      <header class="app__header">
        <div class="wrapper">
          <h1 class="header__title">tic tac toe</h1>
        </div>
      </header>

      <main class="app__main">
        <div class="wrapper">
        </div>
      </main>

      <footer class="app__footer">
        <div class="wrapper">
          <span class="footer__copyright">
            <a class="copyright__link" href="http://github.com/vyachnd" target="_blank" rel="noopener">
              <svg class="icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.375 1.25H3.625C2.58984 1.25 1.75 2.08984 1.75 3.125V16.875C1.75 17.9102 2.58984 18.75 3.625 18.75H17.375C18.4102 18.75 19.25 17.9102 19.25 16.875V3.125C19.25 2.08984 18.4102 1.25 17.375 1.25ZM12.582 16.2383C12.2539 16.2969 12.1328 16.0938 12.1328 15.9258C12.1328 15.7148 12.1406 14.6367 12.1406 13.7656C12.1406 13.1562 11.9375 12.7695 11.6992 12.5664C13.1445 12.4063 14.668 12.207 14.668 9.71094C14.668 9 14.4141 8.64453 14 8.1875C14.0664 8.01953 14.2891 7.32812 13.9336 6.42969C13.3906 6.26172 12.1484 7.12891 12.1484 7.12891C11.6328 6.98438 11.0742 6.91016 10.5234 6.91016C9.97266 6.91016 9.41406 6.98438 8.89844 7.12891C8.89844 7.12891 7.65625 6.26172 7.11328 6.42969C6.75781 7.32422 6.97656 8.01562 7.04688 8.1875C6.63281 8.64453 6.4375 9 6.4375 9.71094C6.4375 12.1953 7.89453 12.4063 9.33984 12.5664C9.15234 12.7344 8.98438 13.0234 8.92578 13.4375C8.55469 13.6055 7.60547 13.8945 7.03906 12.8945C6.68359 12.2773 6.04297 12.2266 6.04297 12.2266C5.41016 12.2188 6 12.625 6 12.625C6.42188 12.8203 6.71875 13.5703 6.71875 13.5703C7.09766 14.7305 8.91016 14.3398 8.91016 14.3398C8.91016 14.8828 8.91797 15.7656 8.91797 15.9258C8.91797 16.0938 8.80078 16.2969 8.46875 16.2383C5.89062 15.375 4.08594 12.9219 4.08594 10.0547C4.08594 6.46875 6.82812 3.74609 10.4141 3.74609C14 3.74609 16.9062 6.46875 16.9062 10.0547C16.9102 12.9219 15.1602 15.3789 12.582 16.2383ZM8.75 13.8516C8.67578 13.8672 8.60547 13.8359 8.59766 13.7852C8.58984 13.7266 8.64062 13.6758 8.71484 13.6602C8.78906 13.6523 8.85938 13.6836 8.86719 13.7344C8.87891 13.7852 8.82812 13.8359 8.75 13.8516ZM8.37891 13.8164C8.37891 13.8672 8.32031 13.9102 8.24219 13.9102C8.15625 13.918 8.09766 13.875 8.09766 13.8164C8.09766 13.7656 8.15625 13.7227 8.23438 13.7227C8.30859 13.7148 8.37891 13.7578 8.37891 13.8164ZM7.84375 13.7734C7.82812 13.8242 7.75 13.8477 7.68359 13.8242C7.60938 13.8086 7.55859 13.75 7.57422 13.6992C7.58984 13.6484 7.66797 13.625 7.73438 13.6406C7.8125 13.6641 7.86328 13.7227 7.84375 13.7734ZM7.36328 13.5625C7.32812 13.6055 7.25391 13.5977 7.19531 13.5391C7.13672 13.4883 7.12109 13.4141 7.16016 13.3789C7.19531 13.3359 7.26953 13.3438 7.32812 13.4023C7.37891 13.4531 7.39844 13.5312 7.36328 13.5625ZM7.00781 13.207C6.97266 13.2305 6.90625 13.207 6.86328 13.1484C6.82031 13.0898 6.82031 13.0234 6.86328 12.9961C6.90625 12.9609 6.97266 12.9883 7.00781 13.0469C7.05078 13.1055 7.05078 13.1758 7.00781 13.207ZM6.75391 12.8281C6.71875 12.8633 6.66016 12.8438 6.61719 12.8047C6.57422 12.7539 6.56641 12.6953 6.60156 12.668C6.63672 12.6328 6.69531 12.6523 6.73828 12.6914C6.78125 12.7422 6.78906 12.8008 6.75391 12.8281ZM6.49219 12.5391C6.47656 12.5742 6.42578 12.582 6.38281 12.5547C6.33203 12.5312 6.30859 12.4883 6.32422 12.4531C6.33984 12.4297 6.38281 12.418 6.43359 12.4375C6.48438 12.4648 6.50781 12.5078 6.49219 12.5391Z"
                  fill="currentColor"
                />
              </svg>
              vyachnd
            </a>, 2022
          </span>
        </div>
      </footer>
    `;

    self.elements.appMain = self.elements.app.querySelector('.app__main .wrapper');
    self.elements.modal = new Modal({
      node: self.elements.app,
      isClose: false,
    });

    self.module.events.publish('render');
  }
}
