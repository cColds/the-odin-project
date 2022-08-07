import Modal from './components/modal/index.js';
import Form from './components/form/index.js';

window.addEventListener('load', () => {
  const app = document.getElementById('app');
  const loginBtn = app.querySelector('#log-in');
  const signupBtn = app.querySelector('#sign-up');

  // Init modal component
  const modal = new Modal({
    node: app,
  });

  if (loginBtn instanceof HTMLElement) {
    loginBtn.addEventListener('click', () => {
      const { modalContent } = modal.view.elements;

      (() => new Form({
        node: modalContent,
        onSubmit: () => modal.controller.toggleVisible(),
      }))();

      modal.controller.toggleVisible();
    });
  }

  if (signupBtn instanceof HTMLElement) {
    signupBtn.addEventListener('click', () => {
      const { modalContent } = modal.view.elements;

      (() => new Form({
        node: modalContent,
        tabId: 1,
        onSubmit: () => modal.controller.toggleVisible(),
      }))();

      modal.controller.toggleVisible();
    });

    signupBtn.click();
  }
});
