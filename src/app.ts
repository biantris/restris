import cors from "cors";
//import dotenv from "dotenv";
import bodyParser from "body-parser";
//import { connectDatabase } from "./mongo";
import express from "express";

//connectDatabase();

const app = express();

//dotenv.config();

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", (req, res) => {
  res.json({
    status: 200,
    message: "RESTRIS",
  });
});

app.use("/api/version", (req, res) => {
  res.json({
    status: 200,
    message: "API Rodando com Sucesso!!",
  });
});

export default app;
