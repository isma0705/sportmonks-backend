// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

// Tomamos el token desde la variable de entorno
const TOKEN = process.env.SPORTMONKS_TOKEN;

// Validación simple del token
if (!TOKEN) {
  console.error('ERROR: La variable de entorno SPORTMONKS_TOKEN no está definida.');
  process.exit(1);
}

// ✅ ENDPOINT PARA PARTIDOS EN VIVO
app.get('/livescores', async (req, res) => {
  try {
    const apiUrl = `https://api.sportmonks.com/v3/football/livescores/inplay?include=participants,scores,periods,events,league.country,round&api_token=${TOKEN}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const text = await response.text();
      console.error('Error desde Sportmonks API (livescores):', text);
      return res.status(response.status).json({ error: 'Error al obtener los partidos', details: text });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error al llamar a la API (livescores):', err);
    res.status(500).json({ error: 'No se pudieron obtener los partidos', details: err.message });
  }
});

// ✅ NUEVO ENDPOINT PARA LIGAS
app.get('/leagues', async (req, res) => {
  try {
    const apiUrl = `https://api.sportmonks.com/v3/football/leagues?api_token=${TOKEN}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const text = await response.text();
      console.error('Error desde Sportmonks API (leagues):', text);
      return res.status(response.status).json({ error: 'Error al obtener las ligas', details: text });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error al llamar a la API (leagues):', err);
    res.status(500).json({ error: 'No se pudieron obtener las ligas', details: err.message });
  }
});

// Arrancamos el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
