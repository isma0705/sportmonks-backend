const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const TOKEN = ' process.env.SPORTMONKS_TOKEN';

app.get('/livescores', async (req, res) => {
  try {
    const apiUrl = `https://api.sportmonks.com/v3/football/livescores/inplay?include=participants;scores;periods;events;league.country;round&api_token=${TOKEN}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'No se pudieron obtener los partidos' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Servidor corriendo'));
