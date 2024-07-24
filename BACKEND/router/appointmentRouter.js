import express from "express";
import { deleteAppointments, getAllAppointments, postAppointment, updateAppointments } from "../controller/appointmentController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";

const router =express.Router();

router.post("/post",isPatientAuthenticated,postAppointment);
router.get("/getAll",isAdminAuthenticated,getAllAppointments);
router.put("/update/:id",isAdminAuthenticated,updateAppointments);
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointments);
export default router;