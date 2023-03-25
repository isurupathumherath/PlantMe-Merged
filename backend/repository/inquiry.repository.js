import { Inquiry } from "../models/index.js";
import AppError from "../utils/appError.js";

export const saveInquiry = (data) =>
  Inquiry.create(data)
    .then((inquiry) => {
      return Promise.resolve(inquiry);
    })
    .catch((err) => {
      throw new AppError(`Internal Server Error: ${err}`, err.code);
    });

export const saveInquiryAnon = (data) =>
  Inquiry.create(data)
    .then((inquiry) => {
      return Promise.resolve(inquiry);
    })
    .catch((err) => {
      throw new AppError(`Internal Server Error: ${err}`, err.code);
    });

export const getInquiry = () =>
  Inquiry.find({})
    .then((inquiry) => {
      return Promise.resolve(inquiry);
    })
    .catch((err) => {
      throw new AppError(`Internal Server Error: ${err}`, 500);
    });

export const getInquiryById = (id) =>
  Inquiry.findById(id)
    .then((inquiry) => {
      if (!inquiry) {
        throw new AppError("Inquiry Details not Found", 404);
      }
      return Promise.resolve(inquiry);
    })
    .catch((err) => {
      throw new AppError(`Internal Server Error: ${err}`, 500);
    });

export const getInquiryByCustomerId = (id) =>
  Inquiry.find({ customerId: id })
    .then((inquiry) => {
      if (!inquiry) {
        throw new AppError("Inquiry Details not Found", 404);
      }
      return Promise.resolve(inquiry);
    })
    .catch((err) => {
      throw new AppError(`Internal Server Error: ${err}`, 500);
    });

export const updateInquiry = (id, data) =>
  Inquiry.findByIdAndUpdate(id, data, { new: true })
    .then((inquiry) => {
      if (!inquiry) {
        throw new AppError("Inquiry Details not Found", 404);
      }
      return Promise.resolve(inquiry);
    })
    .catch((err) => {
      throw new AppError(`Internal Server Error: ${err}`, 500);
    });

export const deleteInquiry = (id) =>
  Inquiry.findByIdAndDelete(id)
    .then((inquiry) => {
      if (!inquiry) {
        throw new AppError("Inquiry Details not Found", 404);
      }
      return Promise.resolve(inquiry);
    })
    .catch((err) => {
      throw new AppError(`Internal Server Error: ${err}`, 500);
    });
