// controllers/reviewController.mjs
import Review from "../models/service_dealModel.mjs";

class ReviewController {
  // Create a new review
  async createReview(req, res) {
    const { stars, description, user_id } = req.body;

    try {
      const newReview = new Review({
        stars,
        description,
        user_id,
      });

      await newReview.save();
      res.status(201).json({ message: "Review created successfully", review: newReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all reviews
  async getAllReviews(req, res) {
    try {
      const reviews = await Review.find().populate("user_id", "full_name email");
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a review by ID
  async getReviewById(req, res) {
    try {
      const review = await Review.findById(req.params.id).populate("user_id", "full_name email");

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a review
  async updateReview(req, res) {
    const { stars, description } = req.body;

    try {
      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        { stars, description },
        { new: true, runValidators: true }
      );

      if (!updatedReview) {
        return res.status(404).json({ message: "Review not found" });
      }

      res.status(200).json({ message: "Review updated successfully", review: updatedReview });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a review
  async deleteReview(req, res) {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ReviewController();
