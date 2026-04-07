import {
  createEmployeeEntry,
  getEmployees,
  getEmployeeById,
  putEmployee,
  updatEmployee,
  deleteEmployeeById,
} from "../controllers/employee.controller";

import { db } from "../DB/dbConfig";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById as getByID,
} from "../services/employee.service";

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

describe("Employee Controller Tests", () => {


  describe("createEmployeeEntry", () => {
    it("should create employee", async () => {
      const req: any = {
        body: {
          fullName: "Nizam",
          jobTitle: "developer",
          salary: 1000,
          country: "india",
        },
      };
      const res = mockResponse();

      (createEmployee as jest.Mock).mockReturnValue(req.body);

      await createEmployeeEntry(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it("should return 400 if fields missing", async () => {
      const req: any = { body: {} };
      const res = mockResponse();

      await createEmployeeEntry(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should handle errors", async () => {
      const req: any = {
        body: {
          fullName: "test",
          jobTitle: "dev",
          salary: 1000,
          country: "india",
        },
      };
      const res = mockResponse();

      (createEmployee as jest.Mock).mockImplementation(() => {
        throw new Error("error");
      });

      await createEmployeeEntry(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });


  describe("getEmployees", () => {
    it("should return all employees", async () => {
      const req: any = {};
      const res = mockResponse();

      const mockAll = jest.fn().mockReturnValue([
        { id: 1, name: "Nizam" },
      ]);

      (db.prepare as jest.Mock).mockReturnValue({ all: mockAll });

      await getEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: [{ id: 1, name: "Nizam" }],
      });
    });

    it("should handle errors", async () => {
      const req: any = {};
      const res = mockResponse();

      (db.prepare as jest.Mock).mockImplementation(() => {
        throw new Error("db error");
      });

      await getEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });


  describe("getEmployeeById", () => {
    it("should return employee by id", async () => {
      const req: any = { params: { id: "1" } };
      const res = mockResponse();

      (getByID as jest.Mock).mockReturnValue({ id: 1 });

      await getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1 });
    });

    it("should return 400 if id missing", async () => {
      const req: any = { params: {} };
      const res = mockResponse();

      await getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should handle errors", async () => {
      const req: any = { params: { id: "1" } };
      const res = mockResponse();

      (getByID as jest.Mock).mockImplementation(() => {
        throw new Error("error");
      });

      await getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });


  describe("putEmployee", () => {
    it("should update employee", async () => {
      const req: any = {
        params: { id: "1" },
        body: {
          fullName: "Nizam",
          jobTitle: "dev",
          salary: 1000,
          country: "india",
        },
      };
      const res = mockResponse();

      const mockRun = jest.fn().mockReturnValue({ changes: 1 });
      (db.prepare as jest.Mock).mockReturnValue({ run: mockRun });

      await putEmployee(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Employee updated successfully",
      });
    });

    it("should return 400 if fields missing", async () => {
      const req: any = {
        params: { id: "1" },
        body: {},
      };
      const res = mockResponse();

      await putEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return 404 if no changes", async () => {
      const req: any = {
        params: { id: "1" },
        body: {
          fullName: "Nizam",
          jobTitle: "dev",
          salary: 1000,
          country: "india",
        },
      };
      const res = mockResponse();

      const mockRun = jest.fn().mockReturnValue({ changes: 0 });
      (db.prepare as jest.Mock).mockReturnValue({ run: mockRun });

      await putEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });


  describe("updatEmployee", () => {
    it("should partially update employee", async () => {
      const req: any = {
        params: { id: "1" },
        body: { fullName: "Updated" },
      };
      const res = mockResponse();

      const mockRun = jest.fn().mockReturnValue({ changes: 1 });
      (db.prepare as jest.Mock).mockReturnValue({ run: mockRun });

      await updatEmployee(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "Employee partially updated",
      });
    });

    it("should return 400 if no fields", async () => {
      const req: any = {
        params: { id: "1" },
        body: {},
      };
      const res = mockResponse();

      await updatEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return 404 if not found", async () => {
      const req: any = {
        params: { id: "1" },
        body: { fullName: "test" },
      };
      const res = mockResponse();

      const mockRun = jest.fn().mockReturnValue({ changes: 0 });
      (db.prepare as jest.Mock).mockReturnValue({ run: mockRun });

      await updatEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });


  describe("deleteEmployeeById", () => {
    it("should delete employee", async () => {
      const req: any = { params: { id: "1" } };
      const res = mockResponse();

      (deleteEmployee as jest.Mock).mockResolvedValue({
        id: 1,
        name: "Nizam",
      });

      await deleteEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Employee deleted successfully",
        data: { id: 1, name: "Nizam" },
      });
    });

    it("should return 400 if id missing", async () => {
      const req: any = { params: {} };
      const res = mockResponse();

      await deleteEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return 404 if not found", async () => {
      const req: any = { params: { id: "1" } };
      const res = mockResponse();

      (deleteEmployee as jest.Mock).mockResolvedValue(null);

      await deleteEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("should handle errors", async () => {
      const req: any = { params: { id: "1" } };
      const res = mockResponse();

      (deleteEmployee as jest.Mock).mockRejectedValue(new Error("error"));

      await deleteEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});