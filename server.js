const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const filePath = "./backend/data.json";

// Helper to read and write
const readData = () => JSON.parse(fs.readFileSync(filePath));
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Routes
app.get("/subscriptions", (req, res) => {
  res.json(readData());
});

app.post("/subscriptions", (req, res) => {
  const subscriptions = readData();
  const newSub = { id: Date.now(), ...req.body };
  subscriptions.push(newSub);
  writeData(subscriptions);
  res.status(201).json(newSub);
});

app.delete("/subscriptions/:id", (req, res) => {
  const subscriptions = readData();
  const updated = subscriptions.filter((s) => s.id !== parseInt(req.params.id));
  writeData(updated);
  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
