const http = require('http');
const XLSX = require('xlsx');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:3000/admin/data';
const OUTPUT_DIR = path.join(__dirname, '..', 'exports');

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error('Error parsing JSON: ' + e.message)); }
      });
    }).on('error', reject);
  });
}

function generarExcel(clientes, pedidos) {
  const wb = XLSX.utils.book_new();

  const clientesData = clientes.map(c => ({
    ID: c.id,
    Nombre: c.name,
    Email: c.email,
    'Fecha Registro': c.created_at,
    'Total Pedidos': c.total_pedidos,
    'Gasto Total (€)': Number(c.gasto_total).toFixed(2)
  }));
  const wsClientes = XLSX.utils.json_to_sheet(clientesData);
  XLSX.utils.book_append_sheet(wb, wsClientes, 'Clientes');

  const pedidosData = pedidos.map(p => ({
    ID: p.id,
    Cliente: p.cliente,
    'ID Usuario': p.user_id,
    Subtotal: Number(p.subtotal).toFixed(2),
    Descuento: Number(p.discount).toFixed(2),
    Total: Number(p.total).toFixed(2),
    Estado: p.status,
    Fecha: p.created_at
  }));
  const wsPedidos = XLSX.utils.json_to_sheet(pedidosData);
  XLSX.utils.book_append_sheet(wb, wsPedidos, 'Pedidos');

  const filePath = path.join(OUTPUT_DIR, 'nalees-report.xlsx');
  XLSX.writeFile(wb, filePath);
  return filePath;
}

function generarPDF(clientes, pedidos) {
  const doc = new PDFDocument({ margin: 30, size: 'A4' });
  const filePath = path.join(OUTPUT_DIR, 'nalees-report.pdf');
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.font('Helvetica-Bold').fontSize(22).text('NALEE\'s Bakery', { align: 'center' });
  doc.fontSize(14).font('Helvetica').text('Informe de Clientes y Pedidos', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(9).fillColor('#666').text('Generado: ' + new Date().toLocaleString('es-ES'), { align: 'center' });
  doc.fillColor('#000');
  doc.moveDown(1);

  doc.font('Helvetica-Bold').fontSize(14).text('Clientes');
  doc.moveDown(0.3);

  const colClientes = ['ID', 'Nombre', 'Email', 'Pedidos', 'Gasto Total'];
  const wClientes = [25, 130, 180, 55, 80];
  const startX = 30;
  let y = doc.y;

  doc.font('Helvetica-Bold').fontSize(8);
  let x = startX;
  colClientes.forEach((h, i) => {
    doc.text(h, x, y, { width: wClientes[i], align: 'left' });
    x += wClientes[i];
  });
  doc.moveDown(0.3);
  doc.rect(startX, y - 2, x - startX, 14).stroke('#ccc');

  doc.font('Helvetica').fontSize(8);
  clientes.forEach(c => {
    y = doc.y + 2;
    if (y > 750) { doc.addPage(); y = 30; }
    x = startX;
    const vals = [String(c.id), c.name, c.email, String(c.total_pedidos), Number(c.gasto_total).toFixed(2) + ' \u20ac'];
    vals.forEach((v, i) => {
      doc.text(v, x, y, { width: wClientes[i], align: 'left' });
      x += wClientes[i];
    });
    doc.moveDown(0.3);
  });

  doc.moveDown(1);
  y = doc.y + 5;
  if (y > 750) { doc.addPage(); y = 30; }

  doc.font('Helvetica-Bold').fontSize(14).text('Pedidos', startX, y);
  doc.moveDown(0.3);

  const colPedidos = ['ID', 'Cliente', 'Subtotal', 'Dto', 'Total', 'Estado', 'Fecha'];
  const wPedidos = [25, 120, 55, 40, 55, 65, 120];
  y = doc.y;
  x = startX;

  doc.font('Helvetica-Bold').fontSize(8);
  colPedidos.forEach((h, i) => {
    doc.text(h, x, y, { width: wPedidos[i], align: 'left' });
    x += wPedidos[i];
  });
  doc.moveDown(0.3);
  doc.rect(startX, y - 2, x - startX, 14).stroke('#ccc');

  doc.font('Helvetica').fontSize(8);
  pedidos.forEach(p => {
    y = doc.y + 2;
    if (y > 750) { doc.addPage(); y = 30; }
    x = startX;
    const vals = [
      String(p.id), p.cliente,
      Number(p.subtotal).toFixed(2) + '\u20ac',
      Number(p.discount).toFixed(2) + '\u20ac',
      Number(p.total).toFixed(2) + '\u20ac',
      p.status,
      p.created_at
    ];
    vals.forEach((v, i) => {
      doc.text(v, x, y, { width: wPedidos[i], align: 'left' });
      x += wPedidos[i];
    });
    doc.moveDown(0.3);
  });

  doc.end();
  return new Promise(resolve => stream.on('finish', () => resolve(filePath)));
}

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  try {
    const data = await fetchJSON(API_URL);
    const excelPath = generarExcel(data.clientes, data.pedidos);
    console.log('Excel generado: ' + excelPath);

    const pdfPath = await generarPDF(data.clientes, data.pedidos);
    console.log('PDF generado: ' + pdfPath);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
