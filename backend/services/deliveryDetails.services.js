import {
  saveDeliveryData,
  deleteDeliveryData,
  updateDeliveryData,
  getDeliveryData,
  getAllDeliveryData,
} from "../repository/index.js";
import AppError from "../utils/appError.js";

export const saveDeliveryDataService = async (data) => {
  const {
    itemName,
    quantity,
    Name,
    deliveryAddress,
    requiredDate,
    mobileNo,
    status,
  } = data;
  try {
    const delivery = await saveDeliveryData({
      itemName,
      quantity,
      Name,
      deliveryAddress,
      requiredDate,
      mobileNo,
      status,
    });
    return Promise.resolve(delivery);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const deleteDeliveryDataService = async (id) => {
  try {
    const delivery = await deleteDeliveryData(id);
    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }
    return Promise.resolve(delivery);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const updateDeliveryDataService = async (id, data) => {
  try {
    const delivery = await updateDeliveryData(id, data);
    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }
    return Promise.resolve(delivery);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const getDeliveryDataService = async (id) => {
  try {
    const delivery = await getDeliveryData(id);
    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }
    return Promise.resolve(delivery);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const getAllDeliveryDataService = async () => {
  try {
    const deliveries = await getAllDeliveryData();
    return Promise.resolve(deliveries);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};
