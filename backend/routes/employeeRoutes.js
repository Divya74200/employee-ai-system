import express from "express";

import {
  addEmployee,
  getEmployees,
  searchEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", addEmployee);

router.get("/", getEmployees);

router.get("/search", searchEmployees);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

export default router;