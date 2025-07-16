import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  inventory: [
    {
      size: String,
      color: String,
      qty: Number
    }
  ]
}, { timestamps: true });


mongoose.models = {}
export default mongoose.model("Product" , ProductSchema)