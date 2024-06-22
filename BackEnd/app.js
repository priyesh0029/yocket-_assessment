const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const cities = [
    { name: "Yapkashnagar", distance: 60 },
    { name: "Lihaspur", distance: 50 },
    { name: "Narmis City", distance: 40 },
    { name: "Shekharvati", distance: 30 },
    { name: "Nuravgram", distance: 20 }
  ];
  
  const vehicles = [
    { kind: "EV Bike", range: 60, count: 2 },
    { kind: "EV Car", range: 100, count: 1 },
    { kind: "EV SUV", range: 120, count: 1 }
  ];
  

app.get('/cities', (req, res) => res.json(cities));
app.get('/vehicles', (req, res) => res.json(vehicles));

app.post('/capture', (req, res) => {
  const { copsSelections } = req.body;
  const fugitiveCity = cities[Math.floor(Math.random() * cities.length)];
  
  const result = copsSelections.find(cop => cop.city === fugitiveCity.name);
  
  if (result) {
    res.json({ success: true, cop: result.copName });
  } else {
    res.json({ success: false });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
