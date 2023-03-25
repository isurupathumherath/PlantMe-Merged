import mongoose from "mongoose";

const { Schema } = mongoose;

const DeliverySchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    Name: {
      type: String,
      required: false,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    requiredDate: {
      type: Date,
      required: false,
    },
    mobileNo: {
      type: Number,
      required: false,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);
export const DeliveryData = mongoose.model("DeliveryData", DeliverySchema);
