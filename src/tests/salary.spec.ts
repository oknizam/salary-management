import { getEmployeeById } from "../services/employee.service";
import { Country, Tds } from "../constants";
import { fetchGrossSalary } from "../controllers/salary.controller";

jest.mock("../services/employee.service");
jest.mock("../DB/dbConfig", () => ({
  db: {
    prepare: jest.fn(),
  },
}));

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Salary Controller Tests", () => {

  describe("fetchGrossSalary", () => {
    it("should return gross and net salary for valid employee", async () => {
      const req: any = { params: { id: "1" } };
      const res = mockResponse();

      (getEmployeeById as jest.Mock).mockReturnValue({
        id: 1,
        salary: 1000,
        country: Country.INDIA,
      });

      await fetchGrossSalary(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        grossSalary: 1000,
        netSalary: 1000 - 1000 * Tds.INDIA,
        tds: 1000 * Tds.INDIA,
      });
    });

    it("should return 404 if employee not found", async () => {
      const req: any = { params: { id: "1" } };
      const res = mockResponse();

      (getEmployeeById as jest.Mock).mockReturnValue(null);

      await fetchGrossSalary(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Not found" });
    });

    it("should handle errors", async () => {
      const req: any = { params: { id: "1" } };
      const res = mockResponse();

      (getEmployeeById as jest.Mock).mockImplementation(() => {
        throw new Error("DB error");
      });

      await fetchGrossSalary(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
})