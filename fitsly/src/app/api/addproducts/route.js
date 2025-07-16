// app/api/products/route.js
import Product from '@/lib/models/Product.js';
import connectDB from '@/lib/DBConnection/conn.js';

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();

    const {
      title,
      slug,
      desc,
      img,
      category,
      price,
      inventory // Array of objects: [{ size, color, qty }]
    } = body;

    // Validate required fields
    if (!title || !slug || !desc || !img || !category || !price || !Array.isArray(inventory)) {
      return Response.json(
        { success: false, error: 'Missing or invalid required fields.' },
        { status: 400 }
      );
    }

    // Validate inventory format
    for (const variant of inventory) {
      if (!variant.size || !variant.color || typeof variant.qty !== 'number') {
        return Response.json(
          { success: false, error: 'Invalid inventory format.' },
          { status: 400 }
        );
      }
    }

    const product = new Product({
      title,
      slug,
      desc,
      img,
      category,
      price,
      inventory
    });

    await product.save();

    return Response.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error('🔴 Error in POST /api/addproducts:', error);
    return Response.json(
      { success: false, error: 'Failed to add product.' },
      { status: 500 }
    );
  }
};


// const handler = async (req, res) => {
//   if (req.method === 'POST') {
//     for (let i = 0; i < req.body.length; i++) {
//       let p = new Product({
//         title: req.body[i].title,
//         slug: req.body[i].slug,
//         desc: req.body[i].desc,
//         img: req.body[i].img,
//         category: req.body[i].category,
//         size: req.body[i].size,
//         color: req.body[i].color,
//         price: req.body[i].price,
//         availableQty: req.body[i].availableQty
//       })
//     }

//     await p.save()
//   }
//       res.status(200).json({ success: "success" })

//   else {
//     res.status(400).json({ error: "This method is not allowed" })
//   }
//   let products = await Product.find()
//   res.status(200).json({ products })
// }

// export default connectDB(handler)