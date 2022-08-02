window.addEventListener('load', () => {
  const app = document.getElementById('app');
  const appMain = app.querySelector('.app__main .wrapper');
  const loginBtn = app.querySelector('#log-in');
  const signupBtn = app.querySelector('#sign-up');

  if (loginBtn instanceof HTMLElement) {
    loginBtn.addEventListener('click', () => console.log('#log-in'));
  }

  if (signupBtn instanceof HTMLElement) {
    signupBtn.addEventListener('click', () => console.log('#sign-up'));
  }

  if (appMain instanceof HTMLElement) {
    console.log('.app__main');
  }
});
