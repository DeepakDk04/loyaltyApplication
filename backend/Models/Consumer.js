import mongoose from "mongoose";

const ConsumerProfileSchema = new mongoose.Schema({
  meta: {
    firstName: {
      type: String,
      minlength: [1, "Minimum 1 letter Required"],
      maxlength: [25, "Maximum 25 characters only"],
      required: [true, "Please provide your firstname"],
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: [25, "Maximum 25 characters only"],
      required: false,
      trim: true,
    },
    age: {
      type: Number,
      min: [10, "Must be at least 10, got {VALUE}"],
      max: [100, "{VALUE} is a Invalid Age"],
      required: [true, "Please provide your age"],
    },
    sex: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not supported",
      },
      required: [true, "kindly specify gender (male/female/others)"],
    },
    bio: {
      type: String,
      maxlength: [50, "Maximum 50 characters only"],
      required: false,
      trim: true,
    },
    crown: {
      type: String,
      enum: {
        values: ["basic", "bronze", "silver", "gold", "platinum"],
        message: "{VALUE} is not supported",
      },
      default: "basic",
    },
    status: {
      type: String,
      enum: {
        values: ["registered", "active", "in-active", "block"],
        message: "{VALUE} is not supported",
      },
      default: "registered",
    },
    lastActive: {
      type: Date,
      default: Date.now(),
    },
  },
  verify: {
    emailCode: {
      type: String,
      required: true,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    verifiedPhone: {
      type: Boolean,
      default: false,
    },
  },
  wallet: {
    points: {
      type: Number,
      min: [0, "Must be at least 0, got {VALUE}"],
      default: 0,
    },
    latestTransactions: [
      {
        vendorName: {
          type: String,
          minlength: [2, "Minimum 2 letter Required"],
          maxlength: [50, "Maximum 50 characters only"],
          required: [true, "must specify the vendor name"],
          trim: true,
        },
        amount: {
          type: Number,
          min: [1, "Must be at least 1, got {VALUE}"],
          required: [true, "must specify the amount"],
        },
        date: {
          type: Date,
          default: Date.now(),
        },
        earnedPoints: {
          type: Number,
          min: [0, "Must be at least 0, got {VALUE}"],
          required: [true, "must specify the earned points"],
        },
      },
    ],
  },
});

const Consumer = mongoose.model("Consumer", ConsumerProfileSchema);

export default Consumer;
