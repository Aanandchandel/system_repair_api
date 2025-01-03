import { ServiceDeal } from "../models/service_dealModel.mjs"; // Adjust the import path

class ServiceDealController {
    // Create a new Service Deal
    async createServiceDeal(req, res) {
        try {
            const { price, discount, serviceId, brandId, seriesId, modelId } = req.body;

            if (!price || !discount || !serviceId || !brandId || !seriesId || !modelId) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const serviceDeal = new ServiceDeal({ price, discount, serviceId, brandId, seriesId, modelId });
            await serviceDeal.save();

            res.status(201).json({ message: "Service deal created successfully", data: serviceDeal });
        } catch (error) {
            res.status(500).json({ message: "Error creating service deal", error: error.message });
        }
    }

    // Get all Service Deals
    async getAllServiceDeals(req, res) {
        try {
            const serviceDeals = await ServiceDeal.find().populate(["serviceId", "brandId", "seriesId", "modelId"]);
            res.status(200).json({ data: serviceDeals });
        } catch (error) {
            res.status(500).json({ message: "Error fetching service deals", error: error.message });
        }
    }

    // Get Service Deal by ID
    async getServiceDealById(req, res) {
        try {
            const { id } = req.params;
            const serviceDeal = await ServiceDeal.findById(id).populate(["serviceId", "brandId", "seriesId", "modelId"]);

            if (!serviceDeal) {
                return res.status(404).json({ message: "Service deal not found" });
            }

            res.status(200).json({ data: serviceDeal });
        } catch (error) {
            res.status(500).json({ message: "Error fetching service deal", error: error.message });
        }
    }

    // Update Service Deal by ID
    async updateServiceDeal(req, res) {
        try {
            const { id } = req.params;
            const { price, discount, serviceId, brandId, seriesId, modelId } = req.body;

            const serviceDeal = await ServiceDeal.findByIdAndUpdate(
                id,
                { price, discount, serviceId, brandId, seriesId, modelId },
                { new: true, runValidators: true }
            );

            if (!serviceDeal) {
                return res.status(404).json({ message: "Service deal not found" });
            }

            res.status(200).json({ message: "Service deal updated successfully", data: serviceDeal });
        } catch (error) {
            res.status(500).json({ message: "Error updating service deal", error: error.message });
        }
    }

    // Delete Service Deal by ID
    async deleteServiceDeal(req, res) {
        try {
            const { id } = req.params;

            const serviceDeal = await ServiceDeal.findByIdAndDelete(id);

            if (!serviceDeal) {
                return res.status(404).json({ message: "Service deal not found" });
            }

            res.status(200).json({ message: "Service deal deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting service deal", error: error.message });
        }
    }
}

export const serviceDealController = new ServiceDealController();
