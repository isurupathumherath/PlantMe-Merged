import {
  saveDeliveryDataService,
  deleteDeliveryDataService,
  updateDeliveryDataService,
  getDeliveryDataService,
  getAllDeliveryDataService,
} from "../services/index.js";

export const saveDeliveryDataController = async (req, res, next) => {
  try {
    const delivery = await saveDeliveryDataService(req.body);
    res.status(201).json({
      status: "success",
      data: {
        delivery,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteDeliveryDataController = async (req, res, next) => {
  try {
    const delivery = await deleteDeliveryDataService(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        delivery,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateDeliveryDataController = async (req, res, next) => {
  try {
    const delivery = await updateDeliveryDataService(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: {
        delivery,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getDeliveryDataController = async (req, res, next) => {
  try {
    const delivery = await getDeliveryDataService(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        delivery,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllDeliveryDataController = async (req, res, next) => {
  try {
    const deliveries = await getAllDeliveryDataService();
    res.status(200).json({
      status: "success",
      results: deliveries.length,
      data: {
        deliveries,
      },
    });
  } catch (err) {
    next(err);
  }
};
