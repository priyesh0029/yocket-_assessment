import express from 'express';
import { captureFugitive } from '../controllers/captureConrtoller.js';

const router = express.Router();

router.post('/capture', captureFugitive);

export default router;
