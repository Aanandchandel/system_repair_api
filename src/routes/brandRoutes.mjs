import express from "express";
import uplode from "../services/uplode.mjs";
import { brandController } from "../controllers/brandControllers.mjs"; 

const router = express.Router();

router.post('/',uplode.single("brandImage"), brandController.createBrand);
router.get('/', brandController.getAllBrands);
router.get('/:id', brandController.getBrandById);
router.get('/image/:id', brandController.getImage);

router.put('/:id',uplode.single("brandImage"), brandController.updateBrand);
router.delete('/:id', brandController.deleteBrand);

export default router;
