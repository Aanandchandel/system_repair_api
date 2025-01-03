import { Model } from "../models/service_dealModel.mjs"; 
import fs from "fs";
import mongoose from "mongoose";
import path from 'path'; 
class ModelController {
    // Create a new Model
    async createModel(req, res) {
        try {
            const  modelImage =req.file.path
            const { modelName } = req.body;

            if (!modelName || !modelImage) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const model = new Model({ modelName, modelImage });
            await model.save();

            res.status(201).json({ message: "Model created successfully", data: model });
        } catch (error) {
            if(req.file){
                            fs.unlink(path.join(process.cwd(),req.file.path),(err)=>{
                                console.log(err)})
                        }
            
            res.status(500).json({ message: "Error creating model", error: error.message });
        }
    }

    // Get all Models
    async getAllModels(req, res) {
        try {
            const models = await Model.find();
            res.status(200).json({ data: models });
        } catch (error) {
            res.status(500).json({ message: "Error fetching models", error: error.message });
        }
    }


       //get model image
        async getImage(req, res) {
            try {
                // Fetch model information from the database using the ID from the request params
                const modelInfo = await Model.findById(req.params.id);
        
                // If no model is found, return an error response
                if (!modelInfo) {
                    return res.status(404).json({ message: "Model not found" }); // Use 404 for 'not found'
                }
        
                // Construct the file path using process.cwd() and the model image path
                const filePath = path.join(process.cwd(), modelInfo.modelImage);
        
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

    // Get Model by ID
    async getModelById(req, res) {
        try {
            const { id } = req.params;
            const model = await Model.findById(id);

            if (!model) {
                return res.status(404).json({ message: "Model not found" });
            }

            res.status(200).json({ data: model });
        } catch (error) {
            res.status(500).json({ message: "Error fetching model", error: error.message });
        }
    }

async updateModel(req, res) {
        try {
            const { id } = req.params;
            // console.log("deleting......")
    
            // Validate ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid ID format" });
            }
    
            // Get existing model data
            const pastData = await Model.findById(id);
            if (!pastData) {
                return res.status(404).json({ message: "Model not found" });
            }
    
            let modelImage;
            if (req.file) {
                modelImage = req.file.path;
                 // Delete old image if a new one is uploaded
                const oldImagePath = pastData.modelImage;
                if (oldImagePath) {
                    fs.unlink(path.join(process.cwd(), oldImagePath), (err) => {
                        if (err) {
                            console.error(`Failed to delete old image: ${err.message}`);
                        }
                    });
                }
            }
    
            const updateData = { modelName: req.body.modelName };
            if (modelImage) updateData.modelImage = modelImage;
    
            // Update model
            const model = await Model.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
            if (!model) {
                return res.status(404).json({ message: "Model not found" });
            }
    
            res.status(200).json({ message: "Model updated successfully", data: model });
        } catch (error) {
            if(req.file){
                fs.unlink(path.join(process.cwd(),req.file.path),(err)=>{
                    console.log(err)})
            }
            console.error(`Error updating model: ${error.message}`);
            res.status(500).json({ message: "Error updating model", error: error.message });
        }
    }



    // Delete Model by ID
    async deleteModel(req, res) {
        try {

            const { id } = req.params;
            //delete image
            
            const modelInfo=await Model.findById(id);
            if(!modelInfo){
                return res.status(404).json({message:"model not found"})
            }
            const filepath=modelInfo.modelImage
            
            
            fs.unlink(path.join(process.cwd(),filepath),(err)=>{
                console.log(err)
            })

            const model = await Model.findByIdAndDelete(id);

            if (!model) {
                return res.status(404).json({ message: "Model not found" });
            }

            res.status(200).json({ message: "Model deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting model", error: error.message });
        }
    }
}

export const modelController = new ModelController();
