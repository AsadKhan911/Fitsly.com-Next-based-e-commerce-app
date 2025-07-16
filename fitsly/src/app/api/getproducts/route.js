// app/api/products/route.js
import Product from '@/lib/models/Product.js';
import connectDB from '@/lib/DBConnection/conn.js';

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();

    let tshirts = {};

    for (let item of products) {
      // Filter inventory with qty > 0
      const availableVariants = item.inventory.filter(variant => variant.qty > 0);

      if (availableVariants.length === 0) continue; // Skip product if no stock

      if (tshirts[item.title]) {
        for (let variant of availableVariants) {
          if (!tshirts[item.title].color.includes(variant.color)) {
            tshirts[item.title].color.push(variant.color);
          }
          if (!tshirts[item.title].size.includes(variant.size)) {
            tshirts[item.title].size.push(variant.size);
          }
        }
      } else {
        tshirts[item.title] = {
          _id: item._id,
          title: item.title,
          slug: item.slug,
          desc: item.desc,
          img: item.img,
          category: item.category,
          price: item.price,
          color: [],
          size: []
        };

        for (let variant of availableVariants) {
          if (!tshirts[item.title].color.includes(variant.color)) {
            tshirts[item.title].color.push(variant.color);
          }
          if (!tshirts[item.title].size.includes(variant.size)) {
            tshirts[item.title].size.push(variant.size);
          }
        }
      }
    }

    if (Object.keys(tshirts).length === 0) {
      return Response.json({
        success: true,
        products: [],
        message: 'No products found.'
      });
    }

    return Response.json({ success: true, tshirts: Object.values(tshirts) });
  } catch (err) {
    console.error('Error fetching products:', err);
    return Response.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}


