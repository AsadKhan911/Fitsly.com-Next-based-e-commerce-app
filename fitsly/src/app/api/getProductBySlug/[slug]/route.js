// app/api/getproduct/[slug]/route.js
import Product from '@/lib/models/Product.js'
import connectDB from '@/lib/DBConnection/conn.js'

export async function GET(req, { params }) {
  try {
    await connectDB()

    const product = await Product.findOne({ slug: params.slug })

    if (!product) {
      return Response.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      )
    }

    // Optionally filter out variants with qty = 0 if needed
    const availableVariants = product.inventory.filter(v => v.qty > 0)

    return Response.json({
      success: true,
      product: {
        _id: product._id,
        title: product.title,
        slug: product.slug,
        desc: product.desc,
        img: product.img,
        category: product.category,
        price: product.price,
        inventory: availableVariants
      }
    })
  } catch (err) {
    console.error('Error fetching product by slug:', err)
    return Response.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
