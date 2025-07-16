// src/app/api/updateproducts/route.js
import Product from '@/lib/models/Product.js'
import connectDB from '@/lib/DBConnection/conn.js'
import mongoose from 'mongoose'

export const PUT = async (req) => {
  try {
    await connectDB()

    const body = await req.json()
    const { _id, updates } = body

    if (!_id || !updates) {
      return Response.json(
        { success: false, error: '_id and updates object are required.' },
        { status: 400 }
      )
    }

    // Validate _id format
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return Response.json(
        { success: false, error: 'Invalid MongoDB _id.' },
        { status: 400 }
      )
    }

    // Optionally validate the inventory structure
    if (updates.inventory && !Array.isArray(updates.inventory)) {
      return Response.json(
        { success: false, error: 'Inventory must be an array.' },
        { status: 400 }
      )
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      { $set: updates },
      { new: true }
    )

    if (!updatedProduct) {
      return Response.json(
        { success: false, error: 'Product not found.' },
        { status: 404 }
      )
    }

    return Response.json({ success: true, product: updatedProduct })
  } catch (err) {
    console.error('Error in PUT /api/updateproducts:', err)
    return Response.json(
      { success: false, error: 'Failed to update product.' },
      { status: 500 }
    )
  }
}
