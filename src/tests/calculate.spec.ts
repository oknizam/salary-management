import { calculateSalary } from "../services/calculateSalary.service";

describe("Salary Calculation", () => {
  it("should calculate India TDS correctly", () => {
    const result = calculateSalary(1000, "india");

    expect(result.tds).toBe(100);
    expect(result.netSalary).toBe(900);
  });

  it("should calculate US TDS correctly", () => {
    const result = calculateSalary(1000, "us");

    expect(result.tds).toBe(120);
    expect(result.netSalary).toBe(880);
  });

  it("should have no deduction for other countries", () => {
    const result = calculateSalary(1000, "canada");

    expect(result.tds).toBe(0);
    expect(result.netSalary).toBe(1000);
  });
});

