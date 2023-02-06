const express = require('express')
const cors = require ('cors');
const {dbConection} = require('../database/config')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        this.conectarDB();

        this.middlewares();


        //Rutas
        this.routes();

    }
    //Un middleware es una funcion que se ejecuta antes de las rutas
    middlewares(){

        //CORS

        this.app.use(cors());

        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public') )


    }

    async conectarDB(){
        await dbConection();
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuario'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor Corriendo en puerto', this.port);
        })
    }
}


module.exports = Server;