import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import captureRoutes from './routes/captureRoutes.js';
import dataRoutes from './routes/dataRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', dataRoutes);
app.use('/', captureRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

