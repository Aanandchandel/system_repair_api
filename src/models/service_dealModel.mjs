import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    serviceImage: {
        type: String,
        required: true
    }
}, { timestamps: true });

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    brandImage: {
        type: String,
        required: true
    }
}, { timestamps: true });

const seriesSchema = new mongoose.Schema({
    seriesName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const modelSchema = new mongoose.Schema({
    modelName: {
        type: String,
        required: true
    },
    modelImage: {
        type: String,
        required: true
    }
}, { timestamps: true });

const serviceDealSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        required: true,
        min: 0
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    seriesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Series",
        required: true
    },
    modelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Model",
        required: true
    }
}, { timestamps: true });

// Export models
export const Service = mongoose.model("Service", serviceSchema);
export const Brand = mongoose.model("Brand", brandSchema);
export const Series = mongoose.model("Series", seriesSchema);
export const Model = mongoose.model("Model", modelSchema);
export const ServiceDeal = mongoose.model("ServiceDeal", serviceDealSchema);
