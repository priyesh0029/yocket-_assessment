import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "node:http";

import captureRoutes from "./routes/captureRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/", dataRoutes);
app.use("/", captureRoutes);

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
