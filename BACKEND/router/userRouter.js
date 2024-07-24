import express from "express";
import { addnewAdmin, login, patientRegister } from "../controller/userController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";



const router =express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addnew",isAdminAuthenticated,addnewAdmin)

export default router;