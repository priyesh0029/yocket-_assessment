import express from 'express';
import { getCities, getVehicles } from '../controllers/dataController.js';

const router = express.Router();

router.get('/cities', getCities);
router.get('/vehicles', getVehicles);

export default router;
