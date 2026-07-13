var currentLang = localStorage.getItem('lang') || 'es';

function applyTranslations(lang) {
  var t = translations[lang];
  if (!t) return;

  currentLang = lang;
  localStorage.setItem('lang', lang);

  var elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  var placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
  placeholderElements.forEach(function (el) {
    var key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  var toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = currentLang.toUpperCase();
  }
}

function changeLang(lang) {
  applyTranslations(lang);
}

function initI18n() {
  applyTranslations(currentLang);

  var toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = currentLang.toUpperCase();
    toggleBtn.addEventListener('click', function () {
      var dropdown = document.getElementById('lang-dropdown');
      if (dropdown) {
        dropdown.classList.toggle('lang-dropdown--open');
      }
    });
  }

  var options = document.querySelectorAll('.lang-option');
  options.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang');
      changeLang(lang);
      var dropdown = document.getElementById('lang-dropdown');
      if (dropdown) {
        dropdown.classList.remove('lang-dropdown--open');
      }
    });
  });

  document.addEventListener('click', function (e) {
    var dropdown = document.getElementById('lang-dropdown');
    var toggle = document.getElementById('lang-toggle');
    if (dropdown && toggle) {
      if (!dropdown.contains(e.target) && !toggle.contains(e.target)) {
        dropdown.classList.remove('lang-dropdown--open');
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
