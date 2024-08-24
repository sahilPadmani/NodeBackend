import { Router } from "express";
import { GetAllStudent, SaveStudent } from "../controllers/student.controller.js";
const StudentRouter = Router();

StudentRouter.route("/getallstudent").get(GetAllStudent);

StudentRouter.route("/save").post(SaveStudent);

export  default StudentRouter;