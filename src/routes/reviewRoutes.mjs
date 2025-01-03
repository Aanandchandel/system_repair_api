// routes/reviewRoutes.mjs
import express from "express";
import ReviewController from "../controllers/reviewController.mjs";

const router = express.Router();

// Routes for reviews
router.post("/", ReviewController.createReview);
router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getReviewById);
router.put("/:id", ReviewController.updateReview);
router.delete("/:id", ReviewController.deleteReview);

export default router;
