import express from 'express';
import { serviceController } from '../controllers/ServiceControllers.mjs'; 

const router = express.Router();

router.post('/services', serviceController.createService);
router.get('/services', serviceController.getAllServices);
router.get('/services/:id', serviceController.getServiceById);
router.put('/services/:id', serviceController.updateService);
router.delete('/services/:id', serviceController.deleteService);

export default router;
