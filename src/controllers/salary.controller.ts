import { Country, Tds } from "../constants";
import { db } from "../DB/dbConfig";
import { Employee } from "../models/employee.model";
import { calculateSalary } from "../services/calculateSalary.service";
import { getEmployeeById } from "../services/employee.service";

export async function fetchGrossSalary(req: any, res: any) {
  try {
    const id = Number(req.params.id);
    const response = getEmployeeById(id) as Employee;

    if (!response) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(calculateSalary(response.salary, response.country));

  }
  catch (err) {
    console.log("error in fething gross salary", err)
    return res.status(500).json({ message: "Internal server error" })

  }

}