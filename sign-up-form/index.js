import Modal from './components/modal/index.js';

window.addEventListener('load', () => {
  const app = document.getElementById('app');
  const loginBtn = app.querySelector('#log-in');
  const signupBtn = app.querySelector('#sign-up');

  // Init modal component
  const modal = new Modal({
    node: app,
  });

  if (loginBtn instanceof HTMLElement) {
    loginBtn.addEventListener('click', () => modal.controller.toggleVisible());
  }

  if (signupBtn instanceof HTMLElement) {
    signupBtn.addEventListener('click', () => modal.controller.toggleVisible());
  }
});
