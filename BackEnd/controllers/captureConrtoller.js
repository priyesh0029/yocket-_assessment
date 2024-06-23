import cities from '../config/cities.js';

export const captureFugitive = (req, res) => {
  const copsSelections = req.body;
  console.log("copsSelections : ", req.body);
  const fugitiveCity = cities[Math.floor(Math.random() * cities.length)];
  console.log("fugitiveCity : ", fugitiveCity);
  const result = copsSelections.find((cop) => cop.city === fugitiveCity.name);

  if (result) {
    res.json({ success: true, cop: result.copName });
  } else {
    res.json({ success: false });
  }
};
