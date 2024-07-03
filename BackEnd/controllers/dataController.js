import cities from '../config/cities.js';
import places from '../config/places.js';
import vehicles from '../config/vehicles.js';

export const getCities = (req, res) => res.json(cities);
export const getVehicles = (req, res) => res.json(vehicles);
export const getPlaces = (req, res) => res.json(places);

