import express from "express";
import { serviceDealController } from "../controllers/ServiceDealControlers.mjs";

const serviceDealRouter = express.Router();

// Create a new ServiceDeal
serviceDealRouter.post('/', serviceDealController.createServiceDeal);

// Get all ServiceDeals
serviceDealRouter.get('/', serviceDealController.getAllServiceDeals);

// Get ServiceDeal by ID
serviceDealRouter.get('/:id', serviceDealController.getServiceDealById);

// Update ServiceDeal by ID
serviceDealRouter.put('/:id', serviceDealController.updateServiceDeal);

// Delete ServiceDeal by ID
serviceDealRouter.delete('/:id', serviceDealController.deleteServiceDeal);

export default serviceDealRouter;
