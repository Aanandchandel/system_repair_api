import express from "express";
import ProductController from "../controllers/ productController.mjs";
import uplode from "../services/uplode.mjs";

const router = express.Router();

// Routes for products
router.post("/", uplode.single("product_image"), ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id",uplode.single("product_image"), ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;
