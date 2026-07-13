document.addEventListener('DOMContentLoaded', () => {
  const galletas = document.querySelectorAll('.galleta');
  const resumen = document.getElementById('pedido-resumen');
  const lista = document.getElementById('pedido-lista');
  const subtotalEl = document.getElementById('pedido-subtotal');
  const descuentoEl = document.getElementById('pedido-descuento');
  const totalEl = document.getElementById('pedido-total');
  const btnEnviar = document.getElementById('pedido-enviar');

  function actualizarResumen() {
    let items = [];
    let subtotal = 0;

    galletas.forEach((g) => {
      const input = g.querySelector('.galleta__cantidad');
      const cantidad = parseInt(input.value, 10) || 0;
      if (cantidad > 0) {
        const nombre = g.querySelector('.galleta__nombre').textContent;
        const precio = parseFloat(g.dataset.precio);
        const totalItem = cantidad * precio;
        subtotal += totalItem;
        items.push({ nombre, cantidad, precio, totalItem });
      }
    });

    if (items.length === 0) {
      resumen.style.display = 'none';
      return;
    }

    resumen.style.display = 'block';

    lista.innerHTML = items
      .map(
        (i) =>
          `<li><span>${i.nombre} × ${i.cantidad}</span><span>${i.totalItem.toFixed(2)} €</span></li>`
      )
      .join('');

    const descuento = subtotal >= 30 ? subtotal * 0.1 : 0;
    const total = subtotal - descuento;

    subtotalEl.textContent = subtotal.toFixed(2);
    descuentoEl.textContent = `-${descuento.toFixed(2)}`;
    totalEl.textContent = total.toFixed(2);
  }

  galletas.forEach((g) => {
    const input = g.querySelector('.galleta__cantidad');
    const btnMas = g.querySelector('.galleta__btn--mas');
    const btnMenos = g.querySelector('.galleta__btn--menos');

    function cambiarCantidad(delta) {
      let val = parseInt(input.value, 10) || 0;
      val = Math.max(0, Math.min(99, val + delta));
      input.value = val;
      actualizarResumen();
    }

    btnMas.addEventListener('click', () => cambiarCantidad(1));
    btnMenos.addEventListener('click', () => cambiarCantidad(-1));

    input.addEventListener('change', () => {
      let val = parseInt(input.value, 10);
      if (isNaN(val) || val < 0) val = 0;
      if (val > 99) val = 99;
      input.value = val;
      actualizarResumen();
    });
  });

  btnEnviar.addEventListener('click', async () => {
    const items = [];
    galletas.forEach((g) => {
      const input = g.querySelector('.galleta__cantidad');
      const cantidad = parseInt(input.value, 10) || 0;
      if (cantidad > 0) {
        const id = g.dataset.sabor;
        items.push({ cookie_id: id, quantity: cantidad });
      }
    });

    if (items.length === 0) return;

    try {
      const res = await fetch('/api/auth/me', { credentials: 'same-origin' });
      if (!res.ok) {
        window.location.href = '/login';
        return;
      }
    } catch (e) {
      window.location.href = '/login';
      return;
    }

    const slugToId = {
      'avena': 1, 'chocolate-chips': 2, 'red-velvet': 3,
      'mantequilla': 4, 'jengibre': 5, 'peanut-butter': 6
    };

    const payload = {
      items: items.map(i => ({
        cookie_id: slugToId[i.cookie_id] || i.cookie_id,
        quantity: i.quantity
      }))
    };

    try {
      const res = await fetch('/api/orders', {
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
        alert('Pedido enviado correctamente');
        galletas.forEach((g) => {
          g.querySelector('.galleta__cantidad').value = 0;
        });
        actualizarResumen();
      } else {
        const data = await res.json();
        alert(data.error || 'Error al enviar el pedido');
      }
    } catch (e) {
      alert('Error de conexión');
    }
  });
});
