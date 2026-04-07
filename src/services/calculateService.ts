import { Country, Tds } from "../constants";

export function calculateSalary(salary: number, country: string) {
  let tds = 0
  if (country.toLowerCase() === Country.INDIA.toLowerCase()) {
    tds = salary * Tds.INDIA;
  } else if (country.toLowerCase() === Country.US.toLowerCase()) {
    tds = salary * Tds.US;
  }
  return { grossSalary: salary, netSalary: salary - tds, tds }
}