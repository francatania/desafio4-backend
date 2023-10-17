import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import ProductManager from './productManager.js';

import app from './app.js';

const serverHTTP = http.createServer(app);
const serverSocket = new Server(serverHTTP);

const productManager = new ProductManager('products.json')

const PORT = 8080;

serverHTTP.listen(PORT, () => {
    console.log(`Servidor corriendo correctamente en el puerto ${PORT}/`);
  });


  
serverSocket.on('connection', (socketClient) =>{
    console.log(`Se ha conectado un nuevo cliente (${socketClient.id})`)

    socketClient.emit('start', async ()=>{
      const products = await productManager.getProducts('products.json');
      return products;
    })

    socketClient.on('new-product', async (body)=>{
      const newProduct ={
        id: uuidv4(),
        ...body
      }

      await productManager.addProduct(newProduct);
    })

});
