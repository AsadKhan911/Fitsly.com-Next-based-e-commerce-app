// app/api/products/route.js
import Product from '@/lib/models/Product.js';
import connectDB from '@/lib/DBConnection/conn.js';

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();

    const {
      title, slug, desc, img,
      category, size, color, price, availableQty
    } = body;

    if (!title || !slug || !desc || !img || !category || !price || availableQty == null) {
      return Response.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    const product = new Product({
      title, slug, desc, img,
      category, size, color, price, availableQty
    });

    await product.save();

    return Response.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("🔴 Error in POST /api/addproducts:", error); // <--- log it
    return Response.json({ success: false, error: "Failed to add product." }, { status: 500 });
  }
};

