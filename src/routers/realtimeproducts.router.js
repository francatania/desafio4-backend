import { Router } from 'express';
import ProductManager from '../productManager.js';

const router = Router();

const productManager = new ProductManager('products.json');


router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts('products.json');
        res.render('realTimeProducts', { style:"index.css", title: "Productos", body: { products } });
    } catch (error) {
        res.status(400).json({ message: "Ha ocurrido un error" });
    }
});


export default router;



