import { Router } from "express";
import { SaveGroup } from "../controllers/group.controller.js";
const GroupRouter = Router();

GroupRouter.route("/save").get(SaveGroup);

export  default GroupRouter;