import uplode from "../services/uplode.mjs";
import express from "express";
import { modelController } from "../controllers/Modelcontrolers.mjs"; 
const modelRouter = express.Router();

// Create a new Model
modelRouter.post('/', uplode.single("modelImage"),modelController.createModel);

// Get all Models
modelRouter.get('/', modelController.getAllModels);


//get image
modelRouter.get('/image/:id', modelController.getImage);

// Get Model by ID
modelRouter.get('/:id', modelController.getModelById);

// Update Model by ID
modelRouter.put('/:id', uplode.single("modelImage"), modelController.updateModel);

// Delete Model by ID
modelRouter.delete('/:id', modelController.deleteModel);

export default modelRouter;
