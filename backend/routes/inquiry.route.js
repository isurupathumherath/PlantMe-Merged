import express from "express";
import {
  saveInquiryController,
  getInquiryController,
  getInquiryByCustomerIdController,
  getInquiryByIdController,
  updateInquiryController,
  deleteInquiryController,
} from "../controllers/index.js";

const inquiryRouter = express.Router();

inquiryRouter.post("/", saveInquiryController);
inquiryRouter.put("/:id", updateInquiryController);
inquiryRouter.delete("/:id", deleteInquiryController);
inquiryRouter.get("/:id", getInquiryByIdController);
inquiryRouter.get("/", getInquiryController);
inquiryRouter.get("/cus/:id", getInquiryByCustomerIdController);

export default inquiryRouter;
