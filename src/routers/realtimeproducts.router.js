import { Router } from 'express';
import path from 'path';
import ProductManager from '../productManager.js';
import { emitFromApi } from '../socket.js';
import { __dirname } from '../utils.js';

const router = Router();

const productManager = new ProductManager(path.join(__dirname, '../src/products.json'));


router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        emitFromApi('update-products', products);
        res.render('realTimeProducts', { style:"index.css", title: "Productos", body: { products } });
    } catch (error) {
        res.status(400).json({ message: "Ha ocurrido un error" });
    }
});



export default router;



