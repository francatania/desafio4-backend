import { Server } from 'socket.io';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { __dirname } from './utils.js';
import ProductManager from './productManager.js';

const absolutePath = path.resolve(__dirname, '../src/products.json');

const productManager = new ProductManager(absolutePath);

let io;

export const init = (httpServer)=>{
    io = new Server(httpServer);

    io.on('connection', (socketClient)=>{
        console.log(`Se ha conectado un nuevo cliente (${socketClient.id})`)

        socketClient.emit('start', async ()=>{
          const products = await productManager.getProducts();
          return products;
        })
    
        socketClient.on('new-product', async (body)=>{
          const newProduct ={
            id: uuidv4(),
            ...body
          }
    
          await productManager.addProduct(newProduct);
          const products = await productManager.getProducts();
          socketClient.emit('update-products', products);
        })

        socketClient.on('delete-product', async(id)=>{
          // const products = await productManager.getProducts();
          // const index = products.findIndex((p) => p.id == id);

          // products.splice(index, 1);
          await productManager.deleteProducts(id);
          const products = await productManager.getProducts();
          socketClient.emit('update-products', products);
        })

        socketClient.on('disconnect', ()=>{
          console.log(`Se ha desconectado el cliente ${socketClient.id}`);
        })

    })
    console.log(`Server socket running`)
}

export const emitFromApi = (event, data) => io.emit(event, data);