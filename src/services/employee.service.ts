import { db } from "../DB/dbConfig";
import { Employee } from "../models/employee.model";

export const createEmployee = (emp: Employee) => {
  const stmt = db.prepare(`
    INSERT INTO employees (fullName, jobTitle, country, salary)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(
    emp.fullName.toLowerCase(),
    emp.jobTitle.toLowerCase(),
    emp.country.toLowerCase(),
    emp.salary
  );

  return { id: result.lastInsertRowid, ...emp };
};

export const getEmployeeById = (id: number) => {
  return db.prepare(`SELECT * FROM employees WHERE id = ?`).get(id);
};

export const deleteEmployee = (id: string) => {
  const stmt = db.prepare("DELETE FROM employees WHERE id = ?");
  const result = stmt.run(id);

  if (result.changes === 0) {
    return null;
  }

  return { id };
};