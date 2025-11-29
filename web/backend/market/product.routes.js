import express from 'express';

import {
    createProduct,
    getAllProducts,
    getProductById,
    getProducerProducts,
    updateProduct,
    deleteProduct
} from './product.controller.js';


const router = express.Router();


router.post('/market/createProduct', createProduct);

router.get('/market/all-products', getAllProducts); // Public route for buyers
router.get('/market/Getproduct', getProducerProducts); // Authenticated route for producers
router.get('/market/products/:id', getProductById);
router.put('/market/products/:id', updateProduct);
router.delete('/market/products/:id', deleteProduct);

export default router; 