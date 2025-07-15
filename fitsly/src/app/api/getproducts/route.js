// app/api/products/route.js
import Product from '@/lib/models/Product.js';
import connectDB from '@/lib/DBConnection/conn.js';

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();

    if (products.length === 0) {
      return Response.json({ success: true, products: [], message: "No products found." });
    }

    return Response.json({ success: true, products });
  } catch (err) {
    console.error("Error fetching products:", err);
    return Response.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}