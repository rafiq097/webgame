import express from "express";
import http from "http";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import { initSocket } from "./socket";
import { ensureGrid, getGrid, getHistory } from "./utils/gridUtils";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/api/grid", async (req, res) => {
  const grid = await getGrid();
  res.json(grid);
});

app.get("/api/history", async (req, res) => {
  const h = await getHistory(500);
  res.json(h);
});

const server = http.createServer(app);

initSocket(server);

async function start() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongo) {
    throw new Error("MONGO_URI not defined");
  }

  await mongoose.connect(mongoUri!);
  await ensureGrid(10);
  server.listen(port, () => console.log(`Server listening on ${port}`));
}

start().catch((err) => {
  console.error("Failed to start", err);
  process.exit(1);
});
