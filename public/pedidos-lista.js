document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('mis-pedidos');
  const lista = document.getElementById('mis-pedidos-lista');
  const empty = document.getElementById('mis-pedidos-empty');

  function getStatusText(status) {
    const key = 'mis_pedidos_' + status;
    if (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang][key]) {
      return translations[currentLang][key];
    }
    return status;
  }

  window.cargarPedidos = async function () {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'same-origin' });
      if (!res.ok) {
        section.style.display = 'none';
        return;
      }
    } catch (e) {
      section.style.display = 'none';
      return;
    }

    try {
      const res = await fetch('/api/orders', { credentials: 'same-origin' });
      if (!res.ok) {
        section.style.display = 'none';
        return;
      }

      const orders = await res.json();
      section.style.display = 'block';

      if (orders.length === 0) {
        lista.innerHTML = '';
        empty.style.display = 'block';
        return;
      }

      empty.style.display = 'none';
      lista.innerHTML = orders.map(o => {
        const fecha = new Date(o.created_at).toLocaleDateString();
        const total = parseFloat(o.total).toFixed(2);
        const statusText = getStatusText(o.status);
        const statusClass = 'mis-pedidos__status--' + o.status;
        const cancelBtn = o.status === 'pending'
          ? `<button class="mis-pedidos__cancel-btn" data-id="${o.id}" title="Cancel·lar pedido">✕</button>`
          : '';
        return `<div class="mis-pedidos__item">
          <div class="mis-pedidos__item-info">
            <span class="mis-pedidos__item-id">#${o.id}</span>
            <span class="mis-pedidos__item-fecha">${fecha}</span>
            <span class="mis-pedidos__item-total">${total} €</span>
            <span class="mis-pedidos__status ${statusClass}">${statusText}</span>
          </div>
          ${cancelBtn}
        </div>`;
      }).join('');

      lista.querySelectorAll('.mis-pedidos__cancel-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.id;
          if (!confirm('¿Seguro que quieres cancelar este pedido?')) return;
          btn.disabled = true;
          btn.textContent = '...';
          try {
            const res = await fetch('/api/orders/' + id + '/cancel', {
              method: 'PATCH',
              credentials: 'same-origin'
            });
            if (res.ok) {
              await cargarPedidos();
            } else {
              const data = await res.json();
              alert(data.error || 'Error al cancelar el pedido');
              btn.disabled = false;
              btn.innerHTML = '✕';
            }
          } catch (e) {
            alert('Error de conexión');
            btn.disabled = false;
            btn.innerHTML = '✕';
          }
        });
      });
    } catch (e) {
      section.style.display = 'none';
    }
  };

  window.ocultarPedidos = function () {
    section.style.display = 'none';
  };
});
