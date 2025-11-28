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
router.get('/market/AllProducts', getAllProducts);
router.get('/market/Getproduct', getProducerProducts);
router.get('/market/products/:id', getProductById);
router.put('/market/products/:id', updateProduct);
router.delete('/market/products/:id', deleteProduct);

export default router; 