import express from "express";
import {
  saveDeliveryDataController,
  deleteDeliveryDataController,
  updateDeliveryDataController,
  getAllDeliveryDataController,
  getDeliveryDataController,
} from "../controllers/index.js";

const DeliveryRoute = express.Router();

DeliveryRoute.post("/", saveDeliveryDataController);
DeliveryRoute.delete("/:id", deleteDeliveryDataController);
DeliveryRoute.put("/:id", updateDeliveryDataController);
DeliveryRoute.get("/", getAllDeliveryDataController);
DeliveryRoute.get("/item/:id", getDeliveryDataController);

export default DeliveryRoute;
