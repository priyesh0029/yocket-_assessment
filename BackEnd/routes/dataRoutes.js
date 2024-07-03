import express from 'express';
import { getCities, getPlaces, getVehicles } from '../controllers/dataController.js';

const router = express.Router();

router.get('/cities', getCities);
router.get('/vehicles', getVehicles);
router.get('/places', getPlaces);


export default router;
