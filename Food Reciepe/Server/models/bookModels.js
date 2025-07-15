import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
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
    isFree: {
      type: Boolean,
      default: false,
    },
    coverImage: {
      type: String, // URL
    },
    contentURL: {
      type: String, // PDF or EPUB hosted file
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        review: String,
      },
    ],
    tags: [String],
    isPublished: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Books", bookSchema);

export default Store;
