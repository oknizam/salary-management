import { Router } from "express";
import { createEmployeeEntry, getEmployees, getEmployeeById, putEmployee, updatEmployee, deleteEmployeeById } from "../controllers/employee.controller";

export const employeeRoute = Router();

employeeRoute.get("/", getEmployees);
employeeRoute.post("/", createEmployeeEntry);
employeeRoute.get("/:id", getEmployeeById);
employeeRoute.put("/:id", putEmployee);
employeeRoute.patch("/:id", updatEmployee);
employeeRoute.delete("/:id", deleteEmployeeById);