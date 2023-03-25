import express from "express";
import userRouter from "./user.route.js";
import deliveryRoute from "./deliveryDetails.routes.js";
import inquiryRouter from "./inquiry.route.js";
import plantRouter from "./plant.route.js";

const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/delivery", deliveryRoute);
apiRouter.use("/inquiry", inquiryRouter);
apiRouter.use("/plant", plantRouter);

export default apiRouter;
