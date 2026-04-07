import express from "express";
import { initDB } from "./DB/dbConfig";
import { employeeRoute } from "./routes/employee.route"


const app = express();
const PORT = 8000;

initDB();

app.use(express.json());

app.use('/employees', employeeRoute)


app.listen(PORT, () => {
  console.log(`listening to ${PORT}`)
})