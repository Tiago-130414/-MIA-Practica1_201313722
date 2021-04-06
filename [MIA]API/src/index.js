const express = require('express');
const app = express();
const morgan = require('morgan'); //funcion que procesa datos antes que el servidor reciba

//herramientas
app.set('port',process.env.PORT || 3000);
app.set('json spaces',2);

//middlewear ;combined ; dev
app.use(morgan('dev'));
//tipos de archivos sencillos como cadenas
app.use(express.urlencoded({extended:false}));
//diciendole al servidor que use json
app.use(express.json());

//RUTAS
app.use(require('./routes/consultas'));

//iniciando el servidor
app.listen(app.get('port'),()=>{
    console.log('Server on port 3000');
});