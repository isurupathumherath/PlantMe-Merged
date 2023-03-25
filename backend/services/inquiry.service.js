import {
  saveInquiry,
  getInquiry,
  getInquiryById,
  getInquiryByCustomerId,
  updateInquiry,
  deleteInquiry,
  saveInquiryAnon,
} from "../repository/index.js";
import AppError from "../utils/appError.js";

export const saveInquiryService = async (data, customerId) => {
  const {
    customerName,
    customerEmailAddress,
    customerMobileNumber,
    type,
    customerMessage,
    status,
  } = data;
  try {
    const inquiry = await saveInquiry({
      customerId,
      customerName,
      customerEmailAddress,
      customerMobileNumber,
      type,
      customerMessage,
      status,
    });
    return Promise.resolve(inquiry);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const saveInquiryAnonService = async (data) => {
  const {
    customerName,
    customerEmailAddress,
    customerMobileNumber,
    type,
    customerMessage,
    status,
  } = data;
  try {
    const inquiry = await saveInquiryAnon({
      customerName,
      customerEmailAddress,
      customerMobileNumber,
      type,
      customerMessage,
      status,
    });
    return Promise.resolve(inquiry);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const getInquiryService = async () => {
  try {
    const inquiry = await getInquiry();
    return Promise.resolve(inquiry);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const getInquiryByCustomerIdService = async (id) => {
  try {
    const inquiry = await getInquiryByCustomerId(id);
    return Promise.resolve(inquiry);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const getInquiryByIdService = async (id) => {
  try {
    const inquiry = await getInquiryById(id);
    return Promise.resolve(inquiry);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const updateInquiryService = async (id, data) => {
  try {
    const inquiry = await updateInquiry(id, data);
    return Promise.resolve(inquiry);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};

export const deleteInquiryService = async (id) => {
  try {
    const inquiry = await deleteInquiry(id);
    return Promise.resolve(inquiry);
  } catch (err) {
    throw new AppError(err.message, err.status);
  }
};
