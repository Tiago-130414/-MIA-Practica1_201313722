const {Router} = require('express');
const api = Router();

api.get("/",(req,res)=>{
    res.json({"Title":"Practica 1" , 
                "Estudiante":"Santiago Rivadeneira" , 
                "Registro academico":"201313722"});
});

var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '130414',
   database: 'GVE',
   port: 3306
});

//CONSULTA 1
api.get("/consulta1",(req,res)=>{
    res.json({"Title":"Consulta 1"});
});

//CONSULTA 2
api.get("/consulta2",(req,res)=>{
    res.json({"Title":"Consulta 2"});
});

//CONSULTA 3
api.get("/consulta3",(req,res)=>{
    res.json({"Title":"Consulta 3"});
});

//CONSULTA 4
api.get("/consulta4",(req,res)=>{
    res.json({"Title":"Consulta 4"});
});

//CONSULTA 5
api.get("/consulta5",(req,res)=>{
    res.json({"Title":"Consulta 5"});
});

//CONSULTA 6
api.get("/consulta6",(req,res)=>{
    res.json({"Title":"Consulta 6"});
});

//CONSULTA 7
api.get("/consulta7",(req,res)=>{
    res.json({"Title":"Consulta 7"});
});

//CONSULTA 8
api.get("/consulta8",(req,res)=>{
    res.json({"Title":"Consulta 8"});
});

//CONSULTA 9
api.get("/consulta9",(req,res)=>{
    res.json({"Title":"Consulta 9"});
});

//CONSULTA 10
api.get("/consulta10",(req,res)=>{
    res.json({"Title":"Consulta 10"});
});

//ELIMINAR TEMPORAL
api.get("/eliminarTemporal",(req,res)=>{
    var eval = eliminarTemporal();
    if(eval == 1){
        res.json({"Title":"Tabla Temporal Eliminada"});
    }else{
        res.json({"Title":"Problema Al Eliminar Temporal"});
    }

});

//ELIMINAR MODELO
api.get("/eliminarModelo",(req,res)=>{
    var eval = eliminarModelo();
    if(eval == 1){
        res.json({"Title":"Modelo Eliminado"});
    }else{
        res.json({"Title":"Problema Al Eliminar DB"});
    }
});

//CARGA TEMPORAL
api.post("/cargarTemporal",(req,res)=>{
    var t = crearTemporal(req.body.Ruta);
    if(t == 1){
        res.json({"Title":"Creacion y carga de tabla Temporal Exitosa!"});
    }else if (t == 0){
        res.json({"Title":"Problema al crear tabla Temporal"});
    }else{
        res.json({"Title":"Problema al cargar el archivo"});
    }
});

//CARGAR MODELO
api.get("/cargarModelo",(req,res)=>{
    res.json({"Title":"Cargar Modelo"});
});


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
///// FUNCIONES PARA  LAS CONSULTAS

//cargar tabla temporal
function crearTemporal(ruta){
    var errCrear = 1;
    var crearT = "CREATE TABLE Temporal(\
        idTemporal INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        NOMBRE_VICTIMA VARCHAR (50) NOT NULL,\
        APELLIDO_VICTIMA VARCHAR (50) NOT NULL,\
        DIRECCION_VICTIMA VARCHAR (70) NOT NULL,\
        FECHA_PRIMERA_SOSPECHA DATETIME NOT NULL,\
        FECHA_CONFIRMACION DATETIME NOT NULL,\
        FECHA_MUERTE DATETIME NULL,\
        ESTADO_VICTIMA VARCHAR (40) NOT NULL,\
        NOMBRE_ASOCIADO VARCHAR (50) NULL,\
        APELLIDO_ASOCIADO VARCHAR (50) NULL,\
        FECHA_CONOCIO DATETIME NULL,\
        CONTACTO_FISICO VARCHAR (50) NULL,\
        FECHA_INICIO_CONTACTO DATETIME NULL,\
        FECHA_FIN_CONTACTO DATETIME NULL,\
        NOMBRE_HOSPITAL VARCHAR(50) NULL,\
        DIRECCION_HOSPITAL VARCHAR(70) NULL,\
        UBICACION_VICTIMA VARCHAR (50) NULL,\
        FECHA_LLEGADA DATETIME NULL,\
        FECHA_RETIRO DATETIME NULL,\
        TRATAMIENTO VARCHAR (50) NULL,\
        EFECTIVIDAD INT NULL,\
        FECHA_INICIO_TRATAMIENTO DATETIME NULL,\
        FECHA_FIN_TRATAMIENTO DATETIME NULL,\
        EFECTIVIDAD_EN_VICTIMA INT NULL\
    );";
    //console.log(ruta);
    //console.log(crearT);
    
    connection.query(crearT, function (err, result) {
        if (err) errCrear = 0;
        console.log("Tabla Temporal Creada");
    });
    //si hubo un problema al crearse la tabla temporal
    if(errCrear == 0){
        return errCrear;
    }
    var cargarDatos ="LOAD  DATA LOCAL INFILE \'"+ ruta +"\'\
    into table Temporal\
    character set utf8mb4\
    fields terminated by ';'\
    ignore 1 lines\
    (NOMBRE_VICTIMA,APELLIDO_VICTIMA,DIRECCION_VICTIMA,@FECHA_PRIMERA_SOSPECHA,@FECHA_CONFIRMACION,@FECHA_MUERTE,ESTADO_VICTIMA,NOMBRE_ASOCIADO,APELLIDO_ASOCIADO,@FECHA_CONOCIO,CONTACTO_FISICO,@FECHA_INICIO_CONTACTO,@FECHA_FIN_CONTACTO,NOMBRE_HOSPITAL,DIRECCION_HOSPITAL,UBICACION_VICTIMA,@FECHA_LLEGADA,@FECHA_RETIRO,TRATAMIENTO,EFECTIVIDAD,@FECHA_INICIO_TRATAMIENTO,@FECHA_FIN_TRATAMIENTO,EFECTIVIDAD_EN_VICTIMA)\
    set FECHA_PRIMERA_SOSPECHA = STR_TO_DATE (@FECHA_PRIMERA_SOSPECHA, '%Y-%m-%d %H:%i:%s'),\
    FECHA_CONFIRMACION = STR_TO_DATE (@FECHA_CONFIRMACION, '%Y-%m-%d %H:%i:%s'),\
    FECHA_MUERTE = STR_TO_DATE (@FECHA_MUERTE, '%Y-%m-%d %H:%i:%s'),\
    FECHA_CONOCIO = STR_TO_DATE (@FECHA_CONOCIO, '%Y-%m-%d %H:%i:%s'),\
    FECHA_INICIO_CONTACTO = STR_TO_DATE (@FECHA_INICIO_CONTACTO, '%Y-%m-%d %H:%i:%s'),\
    FECHA_FIN_CONTACTO = STR_TO_DATE (@FECHA_FIN_CONTACTO, '%Y-%m-%d %H:%i:%s'),\
    FECHA_LLEGADA = STR_TO_DATE (@FECHA_LLEGADA, '%Y-%m-%d %H:%i:%s'),\
    FECHA_RETIRO = STR_TO_DATE (@FECHA_RETIRO, '%Y-%m-%d %H:%i:%s'),\
    FECHA_INICIO_TRATAMIENTO = STR_TO_DATE (@FECHA_INICIO_TRATAMIENTO, '%Y-%m-%d %H:%i:%s'),\
    FECHA_FIN_TRATAMIENTO = STR_TO_DATE (@FECHA_FIN_TRATAMIENTO, '%Y-%m-%d %H:%i:%s');\
    ";

    connection.query(cargarDatos, function (err, result) {
        if (err) errCrear = 2;
        console.log("Tabla Temporal Cargada");
    });
    
    return errCrear;
    
}

//eliminar temporal
function eliminarTemporal(){
    var eliminarT = "DROP TABLE IF EXISTS Temporal;";
    var t = 1;
    connection.query(eliminarT, function (err, result) {
        if(err) t =  0
    });
    return t;
}

//eliminar base de datos
function eliminarModelo(){
    var eliminarT = "DROP DATABASE IF EXISTS GVE;";
    var t = 1;
    connection.query(eliminarT, function (err, result) {
        if(err) t =  0
    });
    return t;
}

module.exports = api;