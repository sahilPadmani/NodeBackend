import { Router } from "express";
import { GetAllEvent, SaveEvent } from "../controllers/event.controller.js";
const router = Router();

router.route("/getallevent").get(GetAllEvent);

router.route("/save").post(SaveEvent);

export  default router;