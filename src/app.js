import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { __dirname } from './utils.js';
import ProductManager from './productManager.js';
import realTimeProductsRouter from './routers/realtimeproducts.router.js'

const productManager = new ProductManager('products.json');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '../public')))

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', realTimeProductsRouter );
app.use(express.static('public', { extensions: ['css'] }));

app.get('/', async (req, res)=>{
    try {
        const products = await productManager.getProducts('products.json');
        res.render('index', {title:"Productos", body:{products}});
    } catch (error) {
        res.status(400).json({message:"Ha ocurrido un error"});
    }
})



export default app;