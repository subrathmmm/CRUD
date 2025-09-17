import express from "express";
import { 
  getAllEmployee, 
  getEmployee, 
  createEmployee, 
  deleteEmployee, 
  updateEmployee 
} from "../controllers/employee.js";

import verifyJWT from "./utils/verifyJWT.js";


const router = express.Router();

// ✅ Protect "get all employees" with JWT
router.get("/", verifyJWT, getAllEmployee);

router.post("/", createEmployee);

router.get("/:id", getEmployee);

router.delete("/:id", deleteEmployee);

router.put("/:id", updateEmployee);

export default router;

