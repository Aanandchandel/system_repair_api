import { Service } from '../models/service_dealModel.mjs'; // Adjust the import path as needed

class ServiceController {
    // Create a new Service
    async createService(req, res) {
        try {
            const { serviceName, serviceImage } = req.body;

            // Validate request data
            if (!serviceName || !serviceImage) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const service = new Service({ serviceName, serviceImage });
            await service.save();

            res.status(201).json({ message: "Service created successfully", data: service });
        } catch (error) {
            res.status(500).json({ message: "Error creating service", error: error.message });
        }
    }

    // Get all Services
    async getAllServices(req, res) {
        try {
            const services = await Service.find();
            res.status(200).json({ data: services });
        } catch (error) {
            res.status(500).json({ message: "Error fetching services", error: error.message });
        }
    }

    // Get a Service by ID
    async getServiceById(req, res) {
        try {
            const { id } = req.params;
            const service = await Service.findById(id);

            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }

            res.status(200).json({ data: service });
        } catch (error) {
            res.status(500).json({ message: "Error fetching service", error: error.message });
        }
    }

    // Update a Service by ID
    async updateService(req, res) {
        try {
            const { id } = req.params;
            const { serviceName, serviceImage } = req.body;

            const service = await Service.findByIdAndUpdate(
                id,
                { serviceName, serviceImage },
                { new: true, runValidators: true }
            );

            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }

            res.status(200).json({ message: "Service updated successfully", data: service });
        } catch (error) {
            res.status(500).json({ message: "Error updating service", error: error.message });
        }
    }

    // Delete a Service by ID
    async deleteService(req, res) {
        try {
            const { id } = req.params;

            const service = await Service.findByIdAndDelete(id);

            if (!service) {
                return res.status(404).json({ message: "Service not found" });
            }

            res.status(200).json({ message: "Service deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting service", error: error.message });
        }
    }
}

// Export an instance of the controller
export const serviceController = new ServiceController();
