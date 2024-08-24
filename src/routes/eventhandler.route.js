import { GetEventHandlerByGmail, SaveEventHandler } from "../controllers/eventhandler.controller.js";
import { Router } from "express";

const EventHandlerRouter = Router();

EventHandlerRouter.route("/save").post(SaveEventHandler);

EventHandlerRouter.route("/find").get(GetEventHandlerByGmail);

export  default EventHandlerRouter;