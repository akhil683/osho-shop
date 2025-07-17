import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [40, "Name cannot be more than 40 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [200, "Description cannot be more than 200 characters"],
  },
  price: {
    type: String,
    required: [true, "Please add a price"],
  },
  originalPrice: {
    type: String,
    required: [true, "Please add original price"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
  },
  subCategory: {
    type: String,
    // required: [true, "Please add a sub category"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please add an image URL"],
  },
  isStock: {
    type: Boolean,
    default: true,
  },
  isNew: {
    type: Boolean,
    default: true,
  },
  isSale: {
    type: Boolean,
    default: true,
  },
});

export default mongoose?.models?.Product ||
  mongoose.model("Product", ProductSchema);
