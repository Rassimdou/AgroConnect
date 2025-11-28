import express from 'express';
import upload from '../middleware/upload.js';

import {
    createProduct,
    getProductById,
    getProducerProducts,
    updateProduct,
    deleteProduct
} from './product.controller.js';


const router = express.Router();


router.post('/market/createProduct', upload.array('images', 5), createProduct);

router.get('/market/Getproduct', getProducerProducts);
router.get('/market/products/:id', getProductById);
router.put('/market/products/:id', updateProduct);
router.delete('/market/products/:id', deleteProduct);

export default router;