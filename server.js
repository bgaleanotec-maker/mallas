const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

let DATA = {};
try {
  const raw = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8');
  DATA = JSON.parse(raw);
  console.log('Datos cargados: ' + Object.keys(DATA).length + ' municipios');
} catch (err) {
  console.error('Error cargando data.json:', err.message);
}

app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/data', (_req, res) => { res.json(DATA); });
app.get('/health', (_req, res) => res.json({ status: 'ok', municipios: Object.keys(DATA).length }));
app.get('*', (_req, res) => { res.sendFile(path.join(__dirname, 'public', 'index.html')); });
app.listen(PORT, () => { console.log('Mallas Vanti en puerto ' + PORT); });
