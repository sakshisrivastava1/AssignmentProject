import { uploadOnCloudinary } from "../config/cloudinary.js";
import productModel from "../models/productModel.js";


export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body
    
    if (!req.file) {
     return res.status(400).json({ message: "Image is required" });
    }

    const image = await uploadOnCloudinary(req.file.path)

    const productData = {
      name,
      description,
      price:Number(price),
      category,
      image,
      createdBy: req.user.id
    }

    const product = await productModel.create(productData);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.status(200).json({
      success: true,
      products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    res.status(200).json({
      success: true,
      product
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
