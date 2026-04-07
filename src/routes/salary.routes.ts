import { Router } from "express";
import { fetchGrossSalary, fetchSalariesByCountry } from "../controllers/salary.controller";

export const salaryRoute = Router();

salaryRoute.get("/bycountry/:country", fetchSalariesByCountry);
salaryRoute.get("/:id", fetchGrossSalary);