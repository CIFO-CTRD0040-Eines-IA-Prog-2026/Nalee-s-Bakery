document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('header-nav');
  const langToggle = document.getElementById('lang-toggle');
  const langDropdown = document.getElementById('lang-dropdown');
  const authLink = document.getElementById('auth-link');
  const authUser = document.getElementById('auth-user');
  const logoutLink = document.getElementById('logout-link');

  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('header__nav--open');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-selector')) {
      langDropdown.classList.remove('lang-dropdown--open');
    }
  });

  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('lang-dropdown--open');
  });

  document.querySelectorAll('.lang-option').forEach((opt) => {
    opt.addEventListener('click', () => {
      const lang = opt.dataset.lang;
      langToggle.textContent = lang.toUpperCase();
      langDropdown.classList.remove('lang-dropdown--open');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      nav.classList.remove('header__nav--open');
    });
  });

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    authLink.style.display = 'none';
    authUser.textContent = user;
    authUser.style.display = 'inline';
    logoutLink.style.display = 'inline';
  }

  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    authLink.style.display = 'inline';
    authUser.style.display = 'none';
    logoutLink.style.display = 'none';
  });
});
