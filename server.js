import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://favqs.com/api/qotd");
    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
