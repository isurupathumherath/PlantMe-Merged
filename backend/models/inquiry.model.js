import mongoose from "mongoose";

const { Schema } = mongoose;

const InquirySchama = new Schema(
  {
    customerId: {
      type: String,
      required: false,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmailAddress: {
      type: String,
      required: false,
    },
    customerMobileNumber: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    customerMessage: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Inquiry = mongoose.model("Inquiry", InquirySchama);
