import { db } from "../DB/dbConfig"
import { createEmployee, deleteEmployee, getEmployeeById as getByID } from "../services/employee.service";

export const createEmployeeEntry = async (req: any, res: any) => {
  try {
    const { fullName, jobTitle, salary, country } = req.body;
    if (!fullName || !jobTitle || !salary || !country) {
      return res.status(400).json({ message: "All fields are required: fullName, jobTitle, salary, country" })
    }

    const response = createEmployee(req.body);
    return res.status(200).json(response);
  }
  catch (err) {
    console.log("error in get employees", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const getEmployees = async (_req: any, res: any) => {
  try {
    const response = db.prepare('SELECT * FROM employees').all();
    return res.status(200).json({ data: response });
  }
  catch (err) {
    console.log("error in get employees", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}


export const getEmployeeById = async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ message: "please send employee id" })
    }
    const response = getByID(req.params.id);
    return res.status(200).json(response);
  }
  catch (err) {
    console.log("error in get employees", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}



export const putEmployee = async (req: any, res: any) => {
  try {
    const id = Number(req.params.id);
    const { fullName, jobTitle, country, salary } = req.body;

    if (!fullName || !jobTitle || !country || !salary) {
      return res.status(400).json({ error: "All fields are required: fullName, jobTitle, salary, country" });
    }

    const result = db.prepare(`
    UPDATE employees
    SET fullName = ?, jobTitle = ?, country = ?, salary = ?
    WHERE id = ?
  `).run(fullName, jobTitle, country, salary, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully" });
  }
  catch (err) {
    console.log("error in get employees", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}


export const updatEmployee = async (req: any, res: any) => {
  try {
    const id = Number(req.params.id);
    const updates = req.body;

    const fields = [];
    const values = [];


    for (const key in updates) {
      fields.push(`${key} = ?`);
      values.push(updates[key]);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields provided" });
    }

    const query = `
    UPDATE employees
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

    const result = db.prepare(query).run(...values, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee partially updated" });
  }
  catch (err) {
    console.log("error in get employees", err)
    return res.status(500).json({ message: "Internal server error" })
  }
}


export const deleteEmployeeById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Employee id is required" });
    }

    const deletedEmployee = await deleteEmployee(id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee deleted successfully",
      data: deletedEmployee
    });
  } catch (err) {
    console.log("error in delete employee", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};