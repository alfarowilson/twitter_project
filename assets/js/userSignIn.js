document.addEventListener('DOMContentLoaded', () => {

  const fromManager = document.getElementById('formManager');
  const userUsername = document.getElementById('username');
  const userPassword = document.getElementById('password');

  const instantFeedback = document.getElementById('instantFeedback');

  instantFeedback.style.display = 'none';

  const userManager = new User();

  fromManager.addEventListener('submit', (event) => {

    event.preventDefault();

    const userData = {
      username: userUsername.value,
      password: userPassword.value,
    };

    const result = userManager.userSignIn(userData);

    if(result.success){
      instantFeedback.style.display = 'none';
      localStorage.setItem('usernameLoggedIn', userUsername.value);
      // arahkan pengguna ke halaman lain, yaitu ke halaman login
      return window.location.href = '../index.html';
    } 
    else {
      instantFeedback.style.display = 'flex';
      instantFeedback.textContent = result.error;
    };

  });

});