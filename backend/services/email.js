const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

let transporter = null;

const EMAIL_LOG = path.resolve(__dirname, '..', 'emails-enviados.log');

function logEmail(cliente, pedido, previewUrl) {
  const line = `[${new Date().toISOString()}] Pedido #${pedido.id} | ${cliente.name} <${cliente.email}> | ${previewUrl}\n`;
  fs.appendFileSync(EMAIL_LOG, line, 'utf-8');
}

function templateConfirmacion({ cliente, pedido, lines, lang }) {
  lang = lang || 'es';
  const locale = lang === 'en' ? 'en-EN' : 'es-ES';
  const date = new Date(pedido.created_at).toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const texts = {
    es: {
      tagline: 'Repostería artesana desde 2024',
      greeting: 'Hola,',
      thanks: '¡Gracias por tu compra! Hemos recibido tu pedido y lo hemos confirmado. En breve lo recibirás en casa.',
      orderLabel: 'Pedido',
      dateLabel: 'Fecha',
      statusLabel: 'Estado',
      statusValue: 'Confirmado',
      thProduct: 'Producto',
      thQty: 'Cant.',
      thPrice: 'Precio ud.',
      thSubtotal: 'Subtotal',
      discount: 'Descuento (10%)',
      total: 'Total',
      help: 'Si tienes cualquier duda, puedes responder este correo o contactar con nosotros.',
      footer: 'Repostería artesana hecha con amor',
      footerThanks: 'Gracias por confiar en nosotros'
    },
    en: {
      tagline: 'Artisan bakery since 2024',
      greeting: 'Hello,',
      thanks: 'Thank you for your purchase! We have received your order and confirmed it. You will receive it at home shortly.',
      orderLabel: 'Order',
      dateLabel: 'Date',
      statusLabel: 'Status',
      statusValue: 'Confirmed',
      thProduct: 'Product',
      thQty: 'Qty',
      thPrice: 'Unit price',
      thSubtotal: 'Subtotal',
      discount: 'Discount (10%)',
      total: 'Total',
      help: 'If you have any questions, feel free to reply to this email or contact us.',
      footer: 'Artisan bakery made with love',
      footerThanks: 'Thank you for trusting us'
    }
  };

  const t = texts[lang] || texts.es;

  let linesHtml = '';
  for (const line of lines) {
    linesHtml += `<tr>
      <td style="padding:10px;border-bottom:1px solid #e8a598;">${line.cookie_name}</td>
      <td style="padding:10px;border-bottom:1px solid #e8a598;text-align:center;">${line.quantity}</td>
      <td style="padding:10px;border-bottom:1px solid #e8a598;text-align:center;">${line.unit_price.toFixed(2)} €</td>
      <td style="padding:10px;border-bottom:1px solid #e8a598;text-align:right;">${line.subtotal.toFixed(2)} €</td>
    </tr>`;
  }

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin:0; padding:0; background:#faf6f0; font-family:'Source Sans 3',Arial,sans-serif; }
    .container { max-width:600px; margin:40px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(92,61,53,0.1); }
    .header { background:#5c3d35; padding:30px; text-align:center; }
    .header h1 { font-family:'Playfair Display',Georgia,serif; color:#faf6f0; margin:0; font-size:28px; }
    .header p { color:#d0b8a8; margin:5px 0 0; font-size:14px; }
    .body { padding:30px; }
    .greeting { font-size:18px; color:#4a3030; margin-bottom:20px; }
    .greeting strong { color:#5c3d35; }
    .order-info { background:#faf6f0; border-radius:8px; padding:15px; margin-bottom:20px; font-size:14px; color:#4a3030; }
    .order-info span { display:block; margin-bottom:5px; }
    .order-info strong { color:#5c3d35; }
    table { width:100%; border-collapse:collapse; margin:20px 0; }
    th { background:#e8a598; color:#5c3d35; padding:12px; font-size:14px; text-align:left; }
    td { padding:10px; border-bottom:1px solid #f7d4d0; font-size:14px; color:#4a3030; }
    .total-row td { font-weight:600; color:#5c3d35; border-top:2px solid #e8a598; }
    .discount-row td { color:#9a7a6a; font-style:italic; }
    .footer { background:#f7d4d0; padding:20px; text-align:center; font-size:13px; color:#5c3d35; line-height:1.6; }
    .footer strong { font-family:'Playfair Display',Georgia,serif; font-size:16px; }
    .btn { display:inline-block; background:#e8a598; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:50px; font-weight:600; margin-top:15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>NALEE's Bakery</h1>
      <p>${t.tagline}</p>
    </div>
    <div class="body">
      <p class="greeting">${t.greeting} <strong>${cliente.name}</strong>,</p>
      <p style="font-size:15px;color:#4a3030;line-height:1.6;">${t.thanks}</p>

      <div class="order-info">
        <span><strong>${t.orderLabel} #${pedido.id}</strong></span>
        <span>${t.dateLabel}: ${date}</span>
        <span>${t.statusLabel}: <strong style="color:#065f46;">${t.statusValue}</strong></span>
      </div>

      <table>
        <thead>
          <tr><th>${t.thProduct}</th><th style="text-align:center;">${t.thQty}</th><th style="text-align:center;">${t.thPrice}</th><th style="text-align:right;">${t.thSubtotal}</th></tr>
        </thead>
        <tbody>
          ${linesHtml}
        </tbody>
      </table>

      <table style="margin-top:0;">
        <tbody>
          ${pedido.discount > 0 ? `<tr class="discount-row"><td colspan="3" style="text-align:right;border:none;">${t.discount}:</td><td style="text-align:right;border:none;">-${pedido.discount.toFixed(2)} €</td></tr>` : ''}
          <tr class="total-row"><td colspan="3" style="text-align:right;border:none;">${t.total}:</td><td style="text-align:right;border:none;">${pedido.total.toFixed(2)} €</td></tr>
        </tbody>
      </table>

      <p style="font-size:14px;color:#8a7060;margin-top:20px;">${t.help}</p>
    </div>
    <div class="footer">
      <strong>NALEE's Bakery</strong><br>
      ${t.footer}<br>
      <span style="color:#8a7060;">${t.footerThanks}</span>
    </div>
  </div>
</body>
</html>`;
}

async function getTransporter() {
  if (transporter) return transporter;

  if (process.env.SMTP_HOST) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log(`Ethereal email: ${testAccount.user}`);
  }

  return transporter;
}

async function enviarConfirmacionPedido(cliente, pedido, lines, lang) {
  try {
    const transport = await getTransporter();
    const html = templateConfirmacion({ cliente, pedido, lines, lang });

    lang = lang || 'es';
    const subjectText = lang === 'en'
      ? `Order #${pedido.id} confirmed — NALEE's Bakery`
      : `Pedido #${pedido.id} confirmado — NALEE's Bakery`;
    const info = await transport.sendMail({
      from: '"NALEE\'s Bakery" <pedidos@naleesbakery.com>',
      to: `${cliente.name} <${cliente.email}>`,
      subject: subjectText,
      html
    });

    if (process.env.SMTP_HOST) {
      console.log(`Correo enviado a ${cliente.email}: ${info.messageId}`);
    } else {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`Correo de prueba (Ethereal): ${previewUrl}`);
      logEmail(cliente, pedido, previewUrl);
    }

    return true;
  } catch (err) {
    console.error('Error enviando correo:', err);
    return false;
  }
}

module.exports = { enviarConfirmacionPedido };
