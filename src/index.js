import express from "express";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
  res.send({ Hi: "There" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("Application is running on port:", PORT);
});
