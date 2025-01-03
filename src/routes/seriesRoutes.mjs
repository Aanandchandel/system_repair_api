import express from "express";

import { seriesController } from "../controllers/SeriesControllers.mjs"; 

const seriesRouter = express.Router();

// Create a new Series
seriesRouter.post('/', seriesController.createSeries);

// Get all Series
seriesRouter.get('/', seriesController.getAllSeries);

// Get Series by ID
seriesRouter.get('/:id', seriesController.getSeriesById);

// Update Series by ID
seriesRouter.put('/:id', seriesController.updateSeries);

// Delete Series by ID
seriesRouter.delete('/:id', seriesController.deleteSeries);

export default seriesRouter;
