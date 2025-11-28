
import prisma from '../../prisma/client.js';


export const createProduct = async (req, res) => {
    
    const producerId = req.user ? parseInt(req.user.id) : 1; 
    
    const { name, category, description, quantity } = req.body;

    if (!name || !category || !description || !quantity) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }

    try {
        const newProduct = await prisma.product.create({
            data: {
                producerId: producerId,
                name: name,
                category: category,
                description: description,
                quantity: parseInt(quantity), 
            },
        });
        
        res.status(201).json({ 
            message: "Product successfully published for review.", 
            product: newProduct 
        });
    } catch (error) {
        console.error("Prisma Error:", error);
        res.status(500).json({ message: "Error publishing product.", error: error.message });
    }
};


export const getProductById = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        
        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                // FIX: Relation name must be lowercase 'images' to match the schema.prisma
                images: true, 
                producer: { select: { id: true, name: true } }
            },
        });
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Prisma Error:", error);
      
        res.status(400).json({ message: "Invalid product ID or internal server error", error: error.message });
    }
};


export const getProducerProducts = async (req, res) => {
    const producerId = req.user ? parseInt(req.user.id) : 1;

    try {
        const products = await prisma.product.findMany({
            where: { producerId: producerId },
            include: {
                // FIX: Relation name must be lowercase 'images'
                images: true,
            },
            select: {
                id: true,
                name: true,
                category: true,
                quantity: true,
                state: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc', 
            }
        });

        res.status(200).json(products);

    }catch (error) {
        console.error("Prisma Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


export const updateProduct = async (req, res) => {
    const producerId = req.user ? parseInt(req.user.id) : 1;
    const productId = parseInt(req.params.id);
    const updates = req.body;

    // Filter out non-updatable fields (like 'producerId' or 'state')
    delete updates.producerId; 
    delete updates.state; 

    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: productId,
                producerId: producerId, //  Ensure only the owner can update
            },
            data: {
                ...updates,
                // Reset state to pending upon update, if desired
                state: 'pending', 
              
                quantity: updates.quantity ? parseInt(updates.quantity) : undefined,
            },
        });

        res.status(200).json({ 
            message: "Product updated successfully. Status reset to pending for verification.",
            product: updatedProduct 
        });

    } catch (error) {
        // P2025 aw record not found f prisma
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Product not found or you don't own this product." });
        }
        console.error("Prisma Error:", error);
        res.status(500).json({ message: "Error updating product.", error: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    const producerId = req.user ? parseInt(req.user.id) : 1;
    const productId = parseInt(req.params.id);

    try {
        
        await prisma.product.delete({
            where: {
                id: productId,
                producerId: producerId, // : Ensure only the owner can delete
            },
        });

        res.status(200).json({ message: "Product successfully deleted." });

    } catch (error) {
        
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Product not found or you don't own this product." });
        }
        console.error("Prisma Error:", error);
        res.status(500).json({ message: "Error deleting product.", error: error.message });
    }
};