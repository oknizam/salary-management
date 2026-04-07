import express from "express";
import { initDB } from "./DB/dbConfig";


const app = express();
const PORT = 8000;

initDB();

app.use(express.json());



app.listen(PORT, () => {
  console.log(`listening to ${PORT}`)
})