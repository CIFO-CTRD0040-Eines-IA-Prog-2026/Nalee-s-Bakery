async function cargarCatalogo() {
  try {
    const res = await fetch('/api/cookies');
    if (!res.ok) throw new Error('Error al cargar el catálogo');
    const cookies = await res.json();

    window.cookieMap = {};
    cookies.forEach(function (cookie) {
      var galleta = document.querySelector('.galleta[data-sabor="' + cookie.slug + '"]');
      if (!galleta) return;

      galleta.dataset.id = cookie.id;
      galleta.dataset.precio = cookie.price;

      var precioEl = galleta.querySelector('.galleta__precio');
      if (precioEl) precioEl.textContent = parseFloat(cookie.price).toFixed(2) + ' €';

      var keyBase = 'galleta_' + cookie.slug.replace(/-/g, '_');
      translations.es[keyBase + '_nombre'] = cookie.name_es;
      translations.es[keyBase + '_desc'] = cookie.desc_es;
      translations.en[keyBase + '_nombre'] = cookie.name_en;
      translations.en[keyBase + '_desc'] = cookie.desc_en;

      window.cookieMap[cookie.id] = {
        nombre_es: cookie.name_es,
        nombre_en: cookie.name_en,
        slug: cookie.slug
      };
    });

    if (typeof applyTranslations === 'function') {
      applyTranslations(currentLang);
    }
  } catch (e) {
    console.error('Error cargando catálogo:', e);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var galletas = document.querySelectorAll('.galleta');
  var resumen = document.getElementById('pedido-resumen');
  var lista = document.getElementById('pedido-lista');
  var subtotalEl = document.getElementById('pedido-subtotal');
  var descuentoEl = document.getElementById('pedido-descuento');
  var totalEl = document.getElementById('pedido-total');
  var btnEnviar = document.getElementById('pedido-enviar');

  function actualizarResumen() {
    var items = [];
    var subtotal = 0;

    galletas.forEach(function (g) {
      var input = g.querySelector('.galleta__cantidad');
      var cantidad = parseInt(input.value, 10) || 0;
      if (cantidad > 0) {
        var nombre = g.querySelector('.galleta__nombre').textContent;
        var precio = parseFloat(g.dataset.precio);
        var totalItem = cantidad * precio;
        subtotal += totalItem;
        items.push({ nombre: nombre, cantidad: cantidad, precio: precio, totalItem: totalItem });
      }
    });

    if (items.length === 0) {
      resumen.style.display = 'none';
      return;
    }

    resumen.style.display = 'block';

    lista.innerHTML = items
      .map(function (i) {
        return '<li><span>' + i.nombre + ' \u00d7 ' + i.cantidad + '</span><span>' + i.totalItem.toFixed(2) + ' \u20ac</span></li>';
      })
      .join('');

    var totalUnidades = items.reduce(function (sum, i) { return sum + i.cantidad; }, 0);
    var descuento = totalUnidades > 10 ? subtotal * 0.1 : 0;
    var total = subtotal - descuento;

    subtotalEl.textContent = subtotal.toFixed(2);
    descuentoEl.textContent = '-' + descuento.toFixed(2);
    totalEl.textContent = total.toFixed(2);
  }

  galletas.forEach(function (g) {
    var input = g.querySelector('.galleta__cantidad');
    var btnMas = g.querySelector('.galleta__btn--mas');
    var btnMenos = g.querySelector('.galleta__btn--menos');

    function cambiarCantidad(delta) {
      var val = parseInt(input.value, 10) || 0;
      val = Math.max(0, Math.min(99, val + delta));
      input.value = val;
      actualizarResumen();
    }

    btnMas.addEventListener('click', function () { cambiarCantidad(1); });
    btnMenos.addEventListener('click', function () { cambiarCantidad(-1); });

    input.addEventListener('change', function () {
      var val = parseInt(input.value, 10);
      if (isNaN(val) || val < 0) val = 0;
      if (val > 99) val = 99;
      input.value = val;
      actualizarResumen();
    });
  });

  btnEnviar.addEventListener('click', async function () {
    var items = [];
    galletas.forEach(function (g) {
      var input = g.querySelector('.galleta__cantidad');
      var cantidad = parseInt(input.value, 10) || 0;
      if (cantidad > 0) {
        var id = parseInt(g.dataset.id, 10);
        if (!id) return;
        items.push({ cookie_id: id, quantity: cantidad });
      }
    });

    if (items.length === 0) return;

    try {
      var res = await fetch('/api/auth/me', { credentials: 'same-origin' });
      if (!res.ok) {
        window.location.href = '/login';
        return;
      }
    } catch (e) {
      window.location.href = '/login';
      return;
    }

    var payload = { items: items };

    try {
      var res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin'
      });

      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }

      if (res.ok) {
        var order = await res.json();
        mostrarConfirmacion(order);
        galletas.forEach(function (g) {
          g.querySelector('.galleta__cantidad').value = 0;
        });
        actualizarResumen();
        if (typeof cargarPedidos === 'function') cargarPedidos();
      } else {
        var data = await res.json();
        alert(data.error || 'Error al enviar el pedido');
      }
    } catch (e) {
      alert('Error de conexión');
    }
  });

  function mostrarConfirmacion(order) {
    try {
      var overlay = document.getElementById('modal-overlay');
      if (!overlay) { console.error('modal-overlay not found'); return; }
      var modalLogin = document.getElementById('modal-login');
      var modalReg = document.getElementById('modal-registro');
      var modalConf = document.getElementById('modal-confirmacion');
      if (!modalConf) { console.error('modal-confirmacion not found'); return; }

      if (modalLogin) modalLogin.style.display = 'none';
      if (modalReg) modalReg.style.display = 'none';
      modalConf.style.display = 'block';

      var idEl = document.getElementById('confirmacion-id');
      if (idEl) idEl.textContent = order.id;
      else console.error('confirmacion-id not found');

      var lista = document.getElementById('confirmacion-lista');
      var lang = typeof currentLang !== 'undefined' ? currentLang : 'es';
      if (lista) {
        lista.innerHTML = '';
        if (order.lines) {
          order.lines.forEach(function (line) {
            var cookieData = window.cookieMap && window.cookieMap[line.cookie_id];
            var nombre = cookieData ? (cookieData['nombre_' + lang] || cookieData.nombre_es) : 'Galleta #' + line.cookie_id;
            var li = document.createElement('li');
            li.innerHTML = '<span>' + nombre + ' \u00d7 ' + line.quantity + '</span><span>' + parseFloat(line.subtotal).toFixed(2) + ' \u20ac</span>';
            lista.appendChild(li);
          });
        }
      }

      var subEl = document.getElementById('confirmacion-subtotal');
      if (subEl) subEl.textContent = parseFloat(order.subtotal).toFixed(2);
      var descEl = document.getElementById('confirmacion-descuento');
      if (descEl) descEl.textContent = '-' + parseFloat(order.discount).toFixed(2);
      var totalEl = document.getElementById('confirmacion-total');
      if (totalEl) totalEl.textContent = parseFloat(order.total).toFixed(2);

      var statusKey = 'mis_pedidos_' + order.status;
      var statusText = (typeof translations !== 'undefined' && translations[lang] && translations[lang][statusKey]) ? translations[lang][statusKey] : order.status;
      var statusEl = document.getElementById('confirmacion-status');
      if (statusEl) statusEl.textContent = statusText;

      overlay.classList.add('modal-overlay--open');
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    } catch (e) {
      console.error('Error en mostrarConfirmacion:', e);
    }
  }

  document.getElementById('confirmacion-cerrar').addEventListener('click', function () {
    var overlay = document.getElementById('modal-overlay');
    var modalConf = document.getElementById('modal-confirmacion');
    overlay.classList.remove('modal-overlay--open');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    modalConf.style.display = 'none';
  });

  cargarCatalogo();
});
