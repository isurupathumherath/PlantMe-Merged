import { DeliveryData } from "../models/index.js";
import AppError from "../utils/appError.js";

export const saveDeliveryData = (data) =>
  DeliveryData.create(data)
    .then((delivery) => {
      return Promise.resolve(delivery);
    })
    .catch(() => {
      throw new AppError("Internal server error.", 500);
    });

export const deleteDeliveryData = (id) => {
  return DeliveryData.findByIdAndDelete(id)
    .then((delivery) => {
      if (!delivery) {
        throw new AppError("Delivery not found.", 404);
      }
      return Promise.resolve(delivery);
    })
    .catch(() => {
      throw new AppError("Internal server error.", 500);
    });
};

export const updateDeliveryData = (id, data) => {
  return DeliveryData.findByIdAndUpdate(id, data, { new: true })
    .then((delivery) => {
      if (!delivery) {
        throw new AppError("Delivery not found.", 404);
      }
      return Promise.resolve(delivery);
    })
    .catch(() => {
      throw new AppError("Internal server error.", 500);
    });
};

export const getDeliveryData = (id) => {
  return DeliveryData.findById(id)
    .then((delivery) => {
      if (!delivery) {
        throw new AppError("Delivery not found.", 404);
      }
      return Promise.resolve(delivery);
    })
    .catch(() => {
      throw new AppError("Internal server error.", 500);
    });
};

export const getAllDeliveryData = () =>
  DeliveryData.find({})
    .then((deliveries) => {
      return Promise.resolve(deliveries);
    })
    .catch(() => {
      throw new AppError("Internal server error.", 500);
    });
