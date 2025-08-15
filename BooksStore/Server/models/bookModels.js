import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorID: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ["Fiction", "Non-Fiction", "Education", "Technology", "Business", "Other"],
      default: "Other",
    },
    price: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Books", bookSchema);

export default Store;
