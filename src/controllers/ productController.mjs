import path from "path";
import fs from "fs";

import Product from "../models/productModel.mjs";

class ProductController {
  // Create a new product
  async createProduct(req, res) {
    
    try {
      const { product_name, description, product_price } = req.body;
      if(req.file){
        return res.status(403).json({message:"send product image"})
      }
      const product_image=req.file.path
      const newProduct = new Product({
        product_name,
        description,
        product_price,
        product_image
      });

      await newProduct.save();
      res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
       if(req.file){
                   fs.unlink(path.join(process.cwd(),req.file.path),(err)=>{
                  console.log(err)})
                              }
      res.status(500).json({ error: error.message });
    }
  }

  // Get all products
  async getAllProducts(req, res) {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a product by ID
  async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

 
async updateProduct(req, res) {
  try {
    const data = req.body;

    if (req.file) {
      // Fetch the previous product data to delete the old image if a new one is uploaded
      const previousData = await Product.findById(req.params.id);
      if (!previousData) {
        return res.status(404).json({ message: "Product not found" }); // Fixed .join() to .json()
      }

      // Delete the previous image from the server
      fs.unlink(path.join(process.cwd(), previousData.product_image), (err) => {
        if (err) {
          console.log("Error deleting previous image:", err); // Log if there's an issue deleting the image
        }
      });

      // Set the new image path
      const product_image = req.file.path;
      data.product_image = product_image;
    }

    // Update the product with the new data (including new image if uploaded)
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not updated" });
    }

    // Return a success response
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    // If there is an error during the file upload or product update
    if (req.file) {
      // Delete the uploaded file if there’s an error
      fs.unlink(path.join(process.cwd(), req.file.path), (err) => {
        if (err) {
          console.log("Error deleting newly uploaded image:", err);
        }
      });
    }

    // Log the error and return a generic server error
    console.error("Error in updateProduct:", error);
    res.status(500).json({ error: error.message });
  }
}

  // Delete a product
  async deleteProduct(req, res) {
    try {
      const productInfo=await Product.findById(req.params.id)
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const filename= productInfo.product_image;
      const filePath = path.join(process.cwd(),filename);

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ProductController();
