document.addEventListener('DOMContentLoaded', async () => {
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('header-nav');
  const authLink = document.getElementById('auth-link');
  const authUser = document.getElementById('auth-user');
  const logoutLink = document.getElementById('logout-link');
  const overlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  const modalLogin = document.getElementById('modal-login');
  const modalReg = document.getElementById('modal-registro');
  const toReg = document.getElementById('modal-to-registro');
  const toLogin = document.getElementById('modal-to-login');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('header__nav--open');
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      if (nav) nav.classList.remove('header__nav--open');
    });
  });

  async function checkSession() {
    if (!authLink || !authUser || !logoutLink) return;
    try {
      const res = await fetch('/api/auth/me', { credentials: 'same-origin' });
      if (res.ok) {
        const user = await res.json();
        authLink.style.display = 'none';
        authUser.textContent = user.name;
        authUser.style.display = 'inline';
        logoutLink.style.display = 'inline';
        if (typeof cargarPedidos === 'function') cargarPedidos();
      }
    } catch (e) {}
  }

  await checkSession();

  function openModal(view) {
    if (!overlay) return;
    if (view === 'registro' && modalLogin && modalReg) {
      modalLogin.style.display = 'none';
      modalReg.style.display = 'block';
    } else if (modalLogin && modalReg) {
      modalLogin.style.display = 'block';
      modalReg.style.display = 'none';
    }
    overlay.classList.add('modal-overlay--open');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('modal-overlay--open');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    if (modalLogin && modalReg) {
      modalLogin.style.display = 'block';
      modalReg.style.display = 'none';
    }
  }

  if (authLink) {
    authLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('login');
    });
  }

  if (toReg) {
    toReg.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('registro');
    });
  }

  if (toLogin) {
    toLogin.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('login');
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  if (logoutLink) {
    logoutLink.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
      } catch (e) {}
      authLink.style.display = 'inline';
      authUser.style.display = 'none';
      logoutLink.style.display = 'none';
      if (typeof ocultarPedidos === 'function') ocultarPedidos();
    });
  }

  const formLogin = document.getElementById('form-login');
  if (formLogin && !overlay) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const errorEl = document.getElementById('login-error');
      const errEmail = document.getElementById('error-email');
      const errPass = document.getElementById('error-password');
      errEmail.textContent = ''; errPass.textContent = ''; errorEl.textContent = '';
      let hasError = false;
      if (!email) { errEmail.textContent = 'Todos los campos son obligatorios'; hasError = true; }
      if (!password) { errPass.textContent = 'Todos los campos son obligatorios'; hasError = true; }
      if (hasError) return;
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }), credentials: 'same-origin'
        });
        if (res.ok) window.location.href = '/';
        else if (res.status === 401) errorEl.textContent = 'Email o contraseña incorrectos';
        else { const d = await res.json(); errorEl.textContent = d.error || 'Error al iniciar sesión'; }
      } catch (e) { errorEl.textContent = 'Error de conexión'; }
    });
  }

  const formRegistro = document.getElementById('form-registro');
  if (formRegistro && !overlay) {
    formRegistro.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('registro-nombre').value.trim();
      const email = document.getElementById('registro-email').value.trim();
      const password = document.getElementById('registro-password').value;
      const confirmar = document.getElementById('registro-confirmar').value;
      const errorEl = document.getElementById('registro-error');
      const errNom = document.getElementById('error-nombre');
      const errRegEmail = document.getElementById('error-email');
      const errPass = document.getElementById('error-password');
      const errConf = document.getElementById('error-confirmar');
      [errNom, errRegEmail, errPass, errConf].forEach(el => el.textContent = '');
      errorEl.textContent = '';
      let hasError = false;
      if (!name) { errNom.textContent = 'Todos los campos son obligatorios'; hasError = true; }
      if (!email) { errRegEmail.textContent = 'Todos los campos son obligatorios'; hasError = true; }
      if (!password) { errPass.textContent = 'Todos los campos son obligatorios'; hasError = true; }
      if (!confirmar) { errConf.textContent = 'Todos los campos son obligatorios'; hasError = true; }
      if (hasError) return;
      if (password.length < 4) { errPass.textContent = 'La contraseña debe tener al menos 4 caracteres'; return; }
      if (password !== confirmar) { errConf.textContent = 'Las contraseñas no coinciden'; return; }
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }), credentials: 'same-origin'
        });
        if (res.ok) window.location.href = '/';
        else if (res.status === 409) errorEl.textContent = 'Ya existe una cuenta con ese email';
        else { const d = await res.json(); errorEl.textContent = d.error || 'Error al registrar'; }
      } catch (e) { errorEl.textContent = 'Error de conexión'; }
    });
  }

  const modalFormLogin = document.getElementById('modal-form-login');
  if (modalFormLogin) {
    modalFormLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('modal-email').value.trim();
      const password = document.getElementById('modal-password').value;
      const errorEl = document.getElementById('modal-login-error');
      const errEmail = document.getElementById('modal-error-email');
      const errPass = document.getElementById('modal-error-password');
      errEmail.textContent = ''; errPass.textContent = ''; errorEl.textContent = '';
      let hasError = false;
      if (!email) { errEmail.textContent = 'Todos los campos son obligatorios'; hasError = true; }
      if (!password) { errPass.textContent = 'Todos los campos son obligatorios'; hasError = true; }
      if (hasError) return;
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }), credentials: 'same-origin'
        });
        if (res.ok) { closeModal(); await checkSession(); }
        else if (res.status === 401) errorEl.textContent = 'Email o contraseña incorrectos';
        else { const d = await res.json(); errorEl.textContent = d.error || 'Error al iniciar sesión'; }
      } catch (e) { errorEl.textContent = 'Error de conexión'; }
    });
  }

  const modalFormReg = document.getElementById('modal-form-registro');
  if (modalFormReg) {
    modalFormReg.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-reg-nombre').value.trim();
      const email = document.getElementById('modal-reg-email').value.trim();
      const password = document.getElementById('modal-reg-password').value;
      const confirmar = document.getElementById('modal-reg-confirmar').value;
      const errorEl = document.getElementById('modal-reg-error');
      const errNom = document.getElementById('modal-error-nombre');
      const errEmail = document.getElementById('modal-error-reg-email');
      const errPass = document.getElementById('modal-error-reg-password');
      const errConf = document.getElementById('modal-error-confirmar');
      [errNom, errEmail, errPass, errConf].forEach(el => el.textContent = '');
      errorEl.textContent = '';
      let hasError = false;
      if (!name) { errNom.textContent = 'Todos los campos son obligatorios'; hasError = true; }
      if (!email) { errEmail.textContent = 'Todos los campos son obligatorios'; hasError = true; }
      if (!password) { errPass.textContent = 'Todos los campos son obligatorios'; hasError = true; }
      if (!confirmar) { errConf.textContent = 'Todos los campos son obligatorios'; hasError = true; }
      if (hasError) return;
      if (password.length < 4) { errPass.textContent = 'La contraseña debe tener al menos 4 caracteres'; return; }
      if (password !== confirmar) { errConf.textContent = 'Las contraseñas no coinciden'; return; }
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }), credentials: 'same-origin'
        });
        if (res.ok) { closeModal(); await checkSession(); }
        else if (res.status === 409) errorEl.textContent = 'Ya existe una cuenta con ese email';
        else { const d = await res.json(); errorEl.textContent = d.error || 'Error al registrar'; }
      } catch (e) { errorEl.textContent = 'Error de conexión'; }
    });
  }

  const contactoForm = document.getElementById('contacto-form');
  if (contactoForm) {
    contactoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Mensaje enviado correctamente');
      contactoForm.reset();
    });
  }

  const newsletterForm = document.getElementById('footer-newsletter');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por suscribirte!');
      newsletterForm.reset();
    });
  }
});
