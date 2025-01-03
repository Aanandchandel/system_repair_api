import { Brand } from "../models/service_dealModel.mjs";  
import fs from "fs";
import mongoose from "mongoose";
import path from "path";

class BrandController {
    // Create a new Brand
    async createBrand(req, res) {
        try {
            const  brandImage =req.file.path;
            const { brandName } = req.body;

            // Validate request data
            if (!brandName || !brandImage) {
                if(req.file){
                    fs.unlink(path.join(process.cwd(),req.file.path),(err)=>{
                        console.log(err)})
                }
                return res.status(400).json({ message: "All fields are required" });
            }

            const brand = new Brand({ brandName, brandImage });
            await brand.save();

            res.status(201).json({ message: "Brand created successfully", data: brand });
        } catch (error) {
            if(req.file){
                fs.unlink(path.join(process.cwd(),req.file.path),(err)=>{
                    console.log(err)})
            }
            res.status(500).json({ message: "Error creating brand", error: error.message });
        }
    }

    async getImage(req, res) {
        try {
            // Fetch brand information from the database using the ID from the request params
            const brandInfo = await Brand.findById(req.params.id);
    
            // If no brand is found, return an error response
            if (!brandInfo) {
                return res.status(404).json({ message: "Brand not found" }); // Use 404 for 'not found'
            }
    
            // Construct the file path using process.cwd() and the brand image path
            const filePath = path.join(process.cwd(), brandInfo.brandImage);
    
            // Check if the file exists before attempting to send it
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: "Image file not found" });
            }
    
            // Send the file to the client
            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error("Error sending file:", err);
                    return res.status(500).json({ message: "Error sending file", error: err.message });
                }
            });
        } catch (error) {
            // Catch any unexpected errors and return a 500 response
            console.error("Error in getImage:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
                           
    // Get all Brands
    async getAllBrands(req, res) {
        try {
            const brands = await Brand.find();
            res.status(200).json({ data: brands });
        } catch (error) {
            res.status(500).json({ message: "Error fetching brands", error: error.message });
        }
    }

    // Get a Brand by ID
    async getBrandById(req, res) {
        try {
            const { id } = req.params;
            const brand = await Brand.findById(id);

            if (!brand) {
                return res.status(404).json({ message: "Brand not found" });
            }

            res.status(200).json({ data: brand });
        } catch (error) {
            res.status(500).json({ message: "Error fetching brand", error: error.message });
        }
    }
    async updateBrand(req, res) {
        try {
            const { id } = req.params;
            // console.log("deleting......")
    
            // Validate ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid ID format" });
            }
    
            // Get existing brand data
            const pastData = await Brand.findById(id);
            if (!pastData) {
                return res.status(404).json({ message: "Brand not found" });
            }
    
            let brandImage;
            if (req.file) {
                brandImage = req.file.path;
                 // Delete old image if a new one is uploaded
                const oldImagePath = pastData.brandImage;
                if (oldImagePath) {
                    fs.unlink(path.join(process.cwd(), oldImagePath), (err) => {
                        if (err) {
                            console.error(`Failed to delete old image: ${err.message}`);
                        }
                    });
                }
            }
    
            const updateData = { brandName: req.body.brandName };
            if (brandImage) updateData.brandImage = brandImage;
    
            // Update brand
            const brand = await Brand.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
            if (!brand) {
                return res.status(404).json({ message: "Brand not found" });
            }
    
            res.status(200).json({ message: "Brand updated successfully", data: brand });
        } catch (error) {
            console.error(`Error updating brand: ${error.message}`);
            res.status(500).json({ message: "Error updating brand", error: error.message });
        }
    }
    // Delete a Brand by ID
    async deleteBrand(req, res) {
        try {

            const { id } = req.params;
            const brandDetail=await Brand.findById(id);
            const filePath=brandDetail.brandImage;
            fs.unlink(path.join(process.cwd(),filePath),(err)=>{
                console.log(err ,"error deleting file")
            });

            const brand = await Brand.findByIdAndDelete(id);

            if (!brand) {
                return res.status(404).json({ message: "Brand not found" });
            }

            res.status(200).json({ message: "Brand deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting brand", error: error.message });
        }
    }
}

// Export an instance of the controller
export const brandController = new BrandController();
