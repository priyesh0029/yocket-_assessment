import cities from "../config/cities.js";
import places from "../config/places.js";

export const captureFugitive = (req, res) => {
  const copsSelections = req.body;
  // console.log("copsSelections : ", req.body);

  if (copsSelections.length != 3) {
    return res
      .status(400)
      .json({ status: false, message: "All details not received" });
  }

  const fugitiveCity = cities[Math.floor(Math.random() * cities.length)];
  const fugitivePlace = places[Math.floor(Math.random() * places.length)];
  // console.log("fugitiveCity : ", fugitiveCity);
   const result = copsSelections.find((cop) => cop.city === fugitiveCity.name && cop.place === fugitivePlace.name);
 

  if (result) {
    res.json({ success: true, cop: result.copName ,city: result.city,place: result.place});
  } else {
    res.json({ success: false });
  }
};
