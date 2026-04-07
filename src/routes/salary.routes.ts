import { Router } from "express";
import { fetchGrossSalary, fetchSalariesByCountry, fetchAvgSalariesByJob } from "../controllers/salary.controller";

export const salaryRoute = Router();

salaryRoute.get("/bycountry/:country", fetchSalariesByCountry);
salaryRoute.get("/byjob/:jobtitle", fetchAvgSalariesByJob);
salaryRoute.get("/:id", fetchGrossSalary);