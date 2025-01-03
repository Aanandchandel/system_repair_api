import { Series } from "../models/service_dealModel.mjs"; 

class SeriesController {
    // Create a new Series
    async createSeries(req, res) {
        try {
            const { seriesName } = req.body;

            if (!seriesName) {
                return res.status(400).json({ message: "Series name is required" });
            }

            const series = new Series({ seriesName });
            await series.save();

            res.status(201).json({ message: "Series created successfully", data: series });
        } catch (error) {
            res.status(500).json({ message: "Error creating series", error: error.message });
        }
    }

    // Get all Series
    async getAllSeries(req, res) {
        try {
            const seriesList = await Series.find();
            res.status(200).json({ data: seriesList });
        } catch (error) {
            res.status(500).json({ message: "Error fetching series", error: error.message });
        }
    }

    // Get Series by ID
    async getSeriesById(req, res) {
        try {
            const { id } = req.params;
            const series = await Series.findById(id);

            if (!series) {
                return res.status(404).json({ message: "Series not found" });
            }

            res.status(200).json({ data: series });
        } catch (error) {
            res.status(500).json({ message: "Error fetching series", error: error.message });
        }
    }

    // Update Series by ID
    async updateSeries(req, res) {
        try {
            const { id } = req.params;
            const { seriesName } = req.body;

            const series = await Series.findByIdAndUpdate(
                id,
                { seriesName },
                { new: true, runValidators: true }
            );

            if (!series) {
                return res.status(404).json({ message: "Series not found" });
            }

            res.status(200).json({ message: "Series updated successfully", data: series });
        } catch (error) {
            res.status(500).json({ message: "Error updating series", error: error.message });
        }
    }

    // Delete Series by ID
    async deleteSeries(req, res) {
        try {
            const { id } = req.params;

            const series = await Series.findByIdAndDelete(id);

            if (!series) {
                return res.status(404).json({ message: "Series not found" });
            }

            res.status(200).json({ message: "Series deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting series", error: error.message });
        }
    }
}

export const seriesController = new SeriesController();
