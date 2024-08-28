import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({
    limit:"16kb"
}));

app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}));

app.use(express.static("public"));

app.use(cookieParser());

import EventRouter from "./routes/event.route.js";
import EventHandlerRouter from "./routes/eventhandler.route.js";
import StudentRouter from "./routes/student.route.js";
import GroupRouter from "./routes/group.route.js";

const apiRouter = express.Router();

apiRouter.use("/event",EventRouter);
apiRouter.use("/eventhandler",EventHandlerRouter)
apiRouter.use("/student",StudentRouter);
apiRouter.use("/group",GroupRouter);

app.use("/eventx/api",apiRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
    if (err) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors
        });
    }
});

export default app;