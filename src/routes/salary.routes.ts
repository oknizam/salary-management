import { Router } from "express";
import { fetchGrossSalary } from "../controllers/salary.controller";

export const salaryRoute = Router();

salaryRoute.get("/:id", fetchGrossSalary);