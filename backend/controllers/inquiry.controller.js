import {
  saveInquiryService,
  getInquiryService,
  getInquiryByCustomerIdService,
  getInquiryByIdService,
  updateInquiryService,
  deleteInquiryService,
  saveInquiryAnonService,
} from "../services/index.js";
import Success from "../utils/success.js";

export const saveInquiryController = async (req, res) => {
  try {
    if (req.user) {
      const customerId = req.user._id;
      const inquiry = await saveInquiryService(req.body, customerId);
      res.json(Success(inquiry, " Successfully Inquiry Added."));
    } else {
      const inquiry = await saveInquiryAnonService(req.body);
      res.json(Success(inquiry, " Successfully Inquiry Added."));
    }
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

export const getInquiryController = async (req, res) => {
  try {
    const inquiry = await getInquiryService();
    res.json(Success(inquiry, "Successfully Inquiry Fetched."));
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

export const getInquiryByCustomerIdController = async (req, res) => {
  try {
    const customerId = req.user._id;
    const inquiry = await getInquiryByCustomerIdService(customerId);
    res.json(Success(inquiry, "Successfully Inquiry Fetched."));
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

export const getInquiryByIdController = async (req, res) => {
  try {
    const inquiry = await getInquiryByIdService(req.params.id);
    res.json(Success(inquiry, "Successfully Inquiry Fetched."));
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

export const updateInquiryController = async (req, res) => {
  try {
    const inquiry = await updateInquiryService(req.params.id, req.body);
    res.json(Success(inquiry, "Successfully Inquiry Updated."));
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};

export const deleteInquiryController = async (req, res) => {
  try {
    const inquiry = await deleteInquiryService(req.params.id);
    res.json(Success(inquiry, "Successfully Inquiry Deleted."));
  } catch (err) {
    res.status(err.status).json(err.message);
  }
};
