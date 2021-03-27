const {Router} = require('express');
const api = Router();

api.get("/",(req,res)=>{
    res.json({"Title":"Practica 1" , 
                "Estudiante":"Santiago Rivadeneira" , 
                "Registro academico":"201313722"});
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
    res.json({"Title":"Eliminar Temporal"});
});

//ELIMINAR MODELO
api.get("/eliminarModelo",(req,res)=>{
    res.json({"Title":"Eliminar Modelo"});
});

//CARGA TEMPORAL
api.get("/cargaTemporal",(req,res)=>{
    res.json({"Title":"Carga Temporal"});
});

//CARGAR MODELO
api.get("/cargarModelo",(req,res)=>{
    res.json({"Title":"Cargar Modelo"});
});


module.exports = api;