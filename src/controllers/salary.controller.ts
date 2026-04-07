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

export async function fetchSalariesByCountry(req: any, res: any) {
  try {
    const country = req.params.country;

    if (!country) {
      return res.status(400).json({ message: "please send country" })
    }

    const response = db.prepare(`SELECT avg(salary) as avgSalary, max(salary) as maxSalary, min(salary) as minSalary FROM employees WHERE country = ?`).get(country.toLowerCase())


    return res.status(200).json(response);

  }
  catch (err) {
    console.log("error in fething gross salary", err)
    return res.status(500).json({ message: "Internal server error" })
  }

}

export async function fetchAvgSalariesByJob(req: any, res: any) {
  try {
    const jobtitle = req.params.jobtitle;

    if (!jobtitle) {
      return res.status(400).json({ message: "please send job title" })
    }

    const response = db.prepare(`SELECT avg(salary) as avgSalary FROM employees WHERE jobTitle = ?`).get(jobtitle.toLowerCase())


    return res.status(200).json(response);

  }
  catch (err) {
    console.log("error in fething gross salary", err)
    return res.status(500).json({ message: "Internal server error" })
  }

}