import { Router } from "express";
import { GetAllEvent } from "../controllers/event.controller.js";
const router = Router();

router.route("/getAllEvent").get(GetAllEvent);

export  default router;