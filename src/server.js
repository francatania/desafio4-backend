import http from 'http';

import app from './app.js';
import { init } from './socket.js';

const serverHTTP = http.createServer(app);

init(serverHTTP);


const PORT = 8080;

serverHTTP.listen(PORT, () => {
    console.log(`Servidor corriendo correctamente en el puerto ${PORT}/`);
  });



  
  