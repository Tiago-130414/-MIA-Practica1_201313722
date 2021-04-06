const {Router} = require('express');
const api = Router();

api.get("/",(req,res)=>{
    res.json({"Title":"Practica 1" , 
                "Estudiante":"Santiago Rivadeneira" , 
                "Registro academico":"201313722"});
});

var mysql = require('mysql');
var connection = mysql.createConnection({
   multipleStatements: true,
   host: 'localhost',
   user: 'root',
   password: '130414',
   database: 'GVE',
   port: 3306
});

//CONSULTA 1
api.get("/consulta1",(req,res)=>{
    var consulta = consulta1();
    connection.query(consulta, function (err, result) {
        if(err){
           res.end(JSON.stringify({"Error" : "Problema al ejecutar consulta 1"},null,2));
        }else{
           res.end(JSON.stringify(result,null,2));
        }
    });    
});

//CONSULTA 2
api.get("/consulta2",(req,res)=>{
    var consulta = consulta2();
    connection.query(consulta, function (err, result) {
        if(err){
           res.end(JSON.stringify({"Error" : "Problema al ejecutar consulta 2"},null,2));
        }else{
           res.end(JSON.stringify(result,null,2));
        }
    });   
});

//CONSULTA 3
api.get("/consulta3",(req,res)=>{
    var consulta = consulta3();
    connection.query(consulta, function (err, result) {
        if(err){
           res.end(JSON.stringify({"Error" : "Problema al ejecutar consulta 3"},null,2));
        }else{
           res.end(JSON.stringify(result,null,2));
        }
    });   
});

//CONSULTA 4
api.get("/consulta4",(req,res)=>{
    var consulta = consulta4();
    connection.query(consulta, function (err, result) {
        if(err){
           res.end(JSON.stringify({"Error" : "Problema al ejecutar consulta 4"},null,2));
        }else{
           res.end(JSON.stringify(result,null,2));
        }
    });   
});

//CONSULTA 5
api.get("/consulta5",(req,res)=>{
    var consulta = consulta5();
    connection.query(consulta, function (err, result) {
        if(err){
           res.end(JSON.stringify({"Error" : "Problema al ejecutar consulta 5"},null,2));
        }else{
           res.end(JSON.stringify(result,null,2));
        }
    });  
});

//CONSULTA 6
api.get("/consulta6",(req,res)=>{
    var consulta = consulta6();
    connection.query(consulta, function (err, result) {
        if(err){
           res.end(JSON.stringify({"Error" : "Problema al ejecutar consulta 6"},null,2));
        }else{
           res.end(JSON.stringify(result,null,2));
        }
    });  
});

//CONSULTA 7
api.get("/consulta7",(req,res)=>{
    var consulta = consulta7();
    connection.query(consulta, function (err, result) {
        if(err){
           res.end(JSON.stringify({"Error" : "Problema al ejecutar consulta 7"},null,2));
        }else{
           res.end(JSON.stringify(result,null,2));
        }
    });  
});

//CONSULTA 8
api.get("/consulta8",(req,res)=>{
    var consulta = consulta8();
    connection.query(consulta, function (err, result) {
        if(err){
           res.end(JSON.stringify({"Error" : "Problema al ejecutar consulta 8"},null,2));
        }else{
           res.end(JSON.stringify(result,null,2));
        }
    });  
});

//CONSULTA 9
api.get("/consulta9",(req,res)=>{
    var consulta = consulta9();
    connection.query(consulta, function (err, result) {
        if(err){
           res.end(JSON.stringify({"Error" : "Problema al ejecutar consulta 9"},null,2));
        }else{
           res.end(JSON.stringify(result,null,2));
        }
    });  
});

//CONSULTA 10
api.get("/consulta10",(req,res)=>{
    var consulta = consulta10();
    connection.query(consulta, function (err, result) {
        if(err){
           res.end(JSON.stringify({"Error" : "Problema al ejecutar consulta 10"},null,2));
        }else{
           res.end(JSON.stringify(result,null,2));
        }
    });  
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
    var cModelo = crearModelo();
    connection.query(cModelo, function (err, result) {
        if(err){
            console.log("PROBLEMA AL CREAR MODELO");
        }else{
            console.log("MODELO CREADO EXITOSAMENTE");
        }
    });

    var carga = cargarModelo();
    connection.query(carga, function (err, result) {
        if(err){
           res.end(JSON.stringify({"Error" : "Problema al ejecutar carga de modelo"},null,2));
        }else{
           res.end(JSON.stringify({"Title" : "Carga de base de datos exitosa!"},null,2));
        }
    });
});


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
///// FUNCIONES PARA  LAS CONSULTAS

//cargar tabla temporal
function crearTemporal(ruta){
    var errCrear = 1;
    var crearT = " DROP TABLE IF EXISTS Temporal;\
        CREATE TABLE IF NOT EXISTS Temporal(\
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

    var cargarDatos ="LOAD  DATA LOCAL INFILE \'"+ruta+"\'\
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
        console.log(result);
    });
    
    return errCrear;
    
}

//eliminar temporal
function eliminarTemporal(){
    //elimina los datos de la tabla temporal
    var eliminarT = "TRUNCATE TABLE Temporal;";
    var t = 1;
    connection.query(eliminarT, function (err, result) {
        if(err) t =  0
    });
    return t;
}

//eliminar base de datos
function eliminarModelo(){
    var eliminarT = "DROP TABLE IF EXISTS Detalle_Contacto;\
    DROP TABLE IF EXISTS Contacto;\
    DROP TABLE IF EXISTS Persona;\
    DROP TABLE IF EXISTS Ubicacion;\
    DROP TABLE IF EXISTS RegistroVictima;\
    DROP TABLE IF EXISTS Hospital;\
    DROP TABLE IF EXISTS Ubicacion_Hospital;\
    DROP TABLE IF EXISTS Tratamiento;\
    DROP TABLE IF EXISTS Tipo_Tratamiento;\
    DROP TABLE IF EXISTS Victima;\
    ";
    var t = 1;
    connection.query(eliminarT, function (err, result) {
        if(err) t =  0
    });
    return t;
}

function crearModelo(){
    
    var consulta ="DROP TABLE IF EXISTS Detalle_Contacto;\
    DROP TABLE IF EXISTS Contacto;\
    DROP TABLE IF EXISTS Persona;\
    DROP TABLE IF EXISTS Ubicacion;\
    DROP TABLE IF EXISTS RegistroVictima;\
    DROP TABLE IF EXISTS Hospital;\
    DROP TABLE IF EXISTS Ubicacion_Hospital;\
    DROP TABLE IF EXISTS Tratamiento;\
    DROP TABLE IF EXISTS Tipo_Tratamiento;\
    DROP TABLE IF EXISTS Victima;\
    CREATE TABLE Ubicacion_Hospital(\
        idUbicacion_Hospital INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        direccion VARCHAR (80) NOT NULL\
    );\
    \
    CREATE TABLE Tipo_Tratamiento(\
        idTipo_Tratamiento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        descripcion_tipo VARCHAR (80) NOT NULL,\
        efectividad_tipo_tratamiento INT NOT NULL\
    );\
    \
    CREATE TABLE Persona(\
        idPersona INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        nombre VARCHAR (80) NOT NULL,\
        apellido VARCHAR (80) NOT NULL\
    );\
    \
    CREATE TABLE Victima(\
        idVictima INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        nombre VARCHAR (80) NOT NULL,\
        apellido VARCHAR (80) NOT NULL,\
        direccion_victima VARCHAR (80) NOT NULL,\
        estatusEnfermedad	VARCHAR (80) NOT NULL,\
        fecha_hora_fallecimiento DATETIME NULL\
    );\
    \
    CREATE TABLE Contacto(\
        idContacto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        idVictima INT NOT NULL,\
        idPersona INT NOT NULL,\
        FOREIGN KEY (idVictima) REFERENCES Victima (idVictima),\
        FOREIGN KEY (idPersona) REFERENCES Persona (idPersona)\
    );\
    \
    CREATE TABLE Detalle_Contacto(\
        idDetalle_Contacto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        tipoContacto VARCHAR (80) NOT NULL,\
        fecha_hora_inicio_contacto DATETIME NOT NULL,\
        fecha_hora_fin_contacto DATETIME NOT NULL,\
        fecha_conocio DATETIME NOT NULL,\
        idContacto	INT NOT NULL,\
        FOREIGN KEY (idContacto) REFERENCES Contacto (idContacto)\
    );\
    \
    CREATE TABLE Tratamiento(\
        idTratamiento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        efectividad_paciente INT NOT NULL,\
        fechaInicioTratamiento DATETIME,\
        fechaFinTratamiento DATETIME,\
        idTipo_Tratamiento INT NOT NULL,\
        idVictima INT NOT NULL,\
        FOREIGN KEY (idTipo_Tratamiento) REFERENCES Tipo_Tratamiento (idTipo_Tratamiento),\
        FOREIGN KEY (idVictima) REFERENCES Victima (idVictima)\
    );\
    \
    CREATE TABLE Hospital(\
        idHospital INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        nombre_hospital VARCHAR (80) NOT NULL,\
        idUbicacion_Hospital INT NOT NULL,\
        FOREIGN KEY (idUbicacion_Hospital) REFERENCES Ubicacion_Hospital (idUbicacion_Hospital)\
    );\
    \
    CREATE TABLE RegistroVictima(\
        idRegistroVictima INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        idVictima INT NOT NULL,\
        fecha_hora_confirmacion DATETIME NULL,\
        fecha_hora_registro DATETIME NULL,\
        fecha_hora_fallecimiento DATETIME NULL,\
        idHospital	INT NOT NULL,\
        FOREIGN KEY (idHospital) REFERENCES Hospital (idHospital),\
        FOREIGN KEY (idVictima) REFERENCES Victima (idVictima)\
    );\
    \
    CREATE TABLE Ubicacion(\
        idUbicacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
        direccion VARCHAR (80) NOT NULL,\
        fecha_hora_llegada DATETIME NOT NULL,\
        fecha_hora_salida DATETIME NOT NULL,\
        idRegistroVictima INT NOT NULL,\
        FOREIGN KEY (idRegistroVictima) REFERENCES RegistroVictima (idRegistroVictima)\
    );\
    ";
    return consulta;
}

function cargarModelo(){
    var consulta = "INSERT INTO Persona(nombre,apellido)\
    SELECT DISTINCT Temporal.NOMBRE_ASOCIADO, Temporal.APELLIDO_ASOCIADO\
    FROM Temporal\
    WHERE Temporal.NOMBRE_ASOCIADO != \"\" AND Temporal.APELLIDO_ASOCIADO != \"\";\
    \
    INSERT INTO Tipo_Tratamiento(descripcion_tipo, efectividad_tipo_tratamiento)\
    SELECT DISTINCT Temporal.Tratamiento , Temporal.EFECTIVIDAD\
    FROM Temporal\
    WHERE Temporal.Tratamiento != \"\" AND Temporal.EFECTIVIDAD != 0;\
    \
    INSERT INTO Ubicacion_Hospital(direccion)\
    SELECT DISTINCT Temporal.DIRECCION_HOSPITAL\
    FROM Temporal\
    WHERE Temporal.DIRECCION_HOSPITAL != \"\";\
    \
    INSERT INTO Victima (nombre,apellido,direccion_victima,estatusEnfermedad,fecha_hora_fallecimiento)\
    SELECT DISTINCT Temporal.NOMBRE_VICTIMA,Temporal.APELLIDO_VICTIMA,Temporal.DIRECCION_VICTIMA,Temporal.ESTADO_VICTIMA ,Temporal.FECHA_MUERTE\
    FROM Temporal\
    WHERE Temporal.NOMBRE_VICTIMA != \"\" AND Temporal.APELLIDO_VICTIMA != \"\" AND Temporal.DIRECCION_VICTIMA != \"\" AND Temporal.ESTADO_VICTIMA != \"\";\
    \
    INSERT INTO Tratamiento (efectividad_paciente,fechaInicioTratamiento,fechaFinTratamiento,idTipo_Tratamiento,idVictima)\
    SELECT DISTINCT Temporal.EFECTIVIDAD_EN_VICTIMA,Temporal.FECHA_INICIO_TRATAMIENTO,Temporal.FECHA_FIN_TRATAMIENTO ,Tipo_Tratamiento.idTipo_Tratamiento,Victima.idVictima  FROM Temporal\
    INNER JOIN Victima ON Temporal.DIRECCION_VICTIMA = Victima.direccion_victima AND Temporal.NOMBRE_VICTIMA = Victima.nombre AND Temporal.APELLIDO_VICTIMA = Victima.apellido\
    INNER JOIN Tipo_Tratamiento ON Temporal.TRATAMIENTO = Tipo_Tratamiento.descripcion_tipo;\
    \
    INSERT INTO Hospital (nombre_hospital, idUbicacion_Hospital)\
    SELECT nombre , idUbicacion\
    FROM(\
    SELECT DISTINCT Temporal.NOMBRE_HOSPITAL AS nombre,Temporal.DIRECCION_HOSPITAL, Ubicacion_Hospital.idUbicacion_Hospital AS idUbicacion\
    FROM Temporal\
    INNER JOIN Ubicacion_Hospital ON  Temporal.DIRECCION_HOSPITAL = Ubicacion_Hospital.direccion\
    WHERE Temporal.NOMBRE_HOSPITAL != \"\" AND Temporal.DIRECCION_HOSPITAL != \"\"\
    )Nombres_Hospitales;\
    \
    INSERT INTO RegistroVictima(idVictima,fecha_hora_confirmacion,fecha_hora_registro,fecha_hora_fallecimiento,idHospital)\
    SELECT idVictimaAg, fechaC,fechaR,fechaM,idHospitalAg\
    FROM(\
    SELECT DISTINCT Victima.idVictima AS idVictimaAg ,PRUEBA.idH AS idHospitalAg, Temporal.NOMBRE_VICTIMA , Temporal.APELLIDO_VICTIMA , Temporal.FECHA_CONFIRMACION AS fechaC,Temporal.FECHA_PRIMERA_SOSPECHA AS fechaR, Temporal.FECHA_MUERTE AS fechaM\
    FROM Temporal\
    INNER JOIN Victima ON Victima.nombre = Temporal.NOMBRE_VICTIMA AND Victima.apellido = Temporal.APELLIDO_VICTIMA\
    INNER JOIN (\
    SELECT Hospital.idHospital AS idH , Ubicacion_Hospital.idUbicacion_Hospital AS idUbi,Ubicacion_Hospital.direccion AS ubi,Hospital.nombre_hospital AS nomH\
    FROM Hospital\
    INNER JOIN Ubicacion_Hospital ON Hospital.idUbicacion_Hospital = Ubicacion_Hospital.idUbicacion_Hospital\
    )PRUEBA ON Temporal.NOMBRE_HOSPITAL = nomH AND Temporal.DIRECCION_HOSPITAL = ubi\
    )DATOS;\
    \
    INSERT INTO Ubicacion (direccion,fecha_hora_llegada,fecha_hora_salida,idRegistroVictima)\
    SELECT DISTINCT  Temporal.UBICACION_VICTIMA,Temporal.FECHA_LLEGADA,\
    Temporal.FECHA_RETIRO, DATOS_VICTIMA.idVic\
    FROM Temporal\
    INNER JOIN(\
    SELECT RegistroVictima.idRegistroVictima AS idVic, Victima.nombre AS nomVic, Victima.apellido AS apeVic, Victima.direccion_victima AS dirVic\
    FROM RegistroVictima\
    INNER JOIN Victima ON RegistroVictima.idVictima = Victima.idVictima\
    )DATOS_VICTIMA WHERE Temporal.NOMBRE_VICTIMA = nomVic AND Temporal.APELLIDO_VICTIMA = apeVic AND Temporal.DIRECCION_VICTIMA = dirVic AND Temporal.UBICACION_VICTIMA != \"\";\
    \
    INSERT INTO Contacto (idVictima,idPersona)\
    SELECT ID_CONOCIDOS.victimaID,Persona.idPersona\
    FROM Persona\
    INNER JOIN (\
    SELECT Victima.idVictima AS victimaID, Victima.nombre AS nombreVictima, CONOCIDOS.nAsociado AS nombAsociado, CONOCIDOS.apAsociado AS apeAsociado\
    FROM Victima\
    INNER JOIN(\
    SELECT DISTINCT Temporal.NOMBRE_VICTIMA AS nVictima, Temporal.APELLIDO_VICTIMA AS apVictima, Temporal.DIRECCION_VICTIMA AS dirVictima,\
    Temporal.NOMBRE_ASOCIADO AS nAsociado, Temporal.APELLIDO_ASOCIADO AS apAsociado , Temporal.FECHA_CONOCIO AS fecha\
    FROM Temporal\
    WHERE Temporal.NOMBRE_VICTIMA != \"\" AND Temporal.NOMBRE_ASOCIADO != \"\"\
    )CONOCIDOS ON Victima.nombre = CONOCIDOS.nVictima AND Victima.apellido = CONOCIDOS.apVictima AND Victima.direccion_victima = CONOCIDOS.dirVictima\
    )ID_CONOCIDOS ON Persona.nombre =  ID_CONOCIDOS.nombAsociado AND Persona.apellido = ID_CONOCIDOS.apeAsociado;\
    \
    INSERT INTO Detalle_Contacto (tipoContacto, fecha_hora_inicio_contacto, fecha_hora_fin_contacto,fecha_conocio,idContacto)\
    SELECT DISTINCT Temporal.CONTACTO_FISICO,Temporal.FECHA_INICIO_CONTACTO,Temporal.FECHA_FIN_CONTACTO, Temporal.FECHA_CONOCIO,DETALLE_CONTACTO.idCont\
    FROM Temporal\
    INNER JOIN (\
    SELECT Contacto.idContacto AS idCont, Victima.nombre AS nVictima ,Victima.apellido AS apVictima, Victima.direccion_victima AS dirVictima,\
    Persona.nombre AS nAsociado , Persona.apellido AS apAsociado\
    FROM Contacto\
    INNER JOIN Victima ON Contacto.idVictima = Victima.idVictima\
    INNER JOIN Persona ON Contacto.idPersona = Persona.idPersona\
    )DETALLE_CONTACTO ON Temporal.NOMBRE_VICTIMA = DETALLE_CONTACTO.nVictima AND Temporal.APELLIDO_VICTIMA = DETALLE_CONTACTO.apVictima\
    AND Temporal.DIRECCION_VICTIMA = DETALLE_CONTACTO.dirVictima AND Temporal.NOMBRE_ASOCIADO = DETALLE_CONTACTO.nAsociado\
    AND Temporal.APELLIDO_ASOCIADO = DETALLE_CONTACTO.apAsociado AND Temporal.CONTACTO_FISICO != \"\";\
    ";
    return consulta;
}

function consulta1(){
    //-- Mostrar el nombre del hospital, su dirección y el número de fallecidos por
    //-- cada hospital registrado.
    var consulta = "SELECT DATOS_FALLECIDOS_HOSPITAL.nombre,DATOS_FALLECIDOS_HOSPITAL.direccion,DATOS_FALLECIDOS_HOSPITAL.fallecidos\
    FROM(\
    SELECT Hospital.nombre_hospital AS nombre, Ubicacion_Hospital.direccion AS direccion , COUNT(RegistroVictima.fecha_hora_fallecimiento) as fallecidos\
    FROM Hospital\
    INNER JOIN Ubicacion_Hospital ON Hospital.idUbicacion_Hospital = Ubicacion_Hospital.idUbicacion_Hospital\
    INNER JOIN RegistroVictima  ON Hospital.idHospital = RegistroVictima.idHospital\
    GROUP BY nombre,direccion\
    )DATOS_FALLECIDOS_HOSPITAL WHERE DATOS_FALLECIDOS_HOSPITAL.fallecidos > 0;";
    return consulta;
}

function consulta2(){
    var consulta = "SELECT Victima.nombre, Victima.apellido\
    FROM Victima\
    INNER JOIN Tratamiento ON Tratamiento.idVictima = Victima.idVictima\
    INNER JOIN Tipo_Tratamiento ON Tratamiento.idTipo_Tratamiento = Tipo_Tratamiento.idTipo_Tratamiento\
    WHERE Victima.estatusEnfermedad LIKE '%En Cuarentena%' AND Tipo_Tratamiento.descripcion_tipo LIKE '%Transfusiones de sangre%' AND Tratamiento.efectividad_paciente > 5;\
    ";
    return consulta;
}

function consulta3(){
    var consulta = "SELECT DATOS_MUERTOS.nombre,DATOS_MUERTOS.apellido,DATOS_MUERTOS.direccion\
    FROM(\
    SELECT Victima.nombre AS nombre ,Victima.apellido AS apellido,Victima.direccion_victima AS direccion, Victima.fecha_hora_fallecimiento AS fechaF, COUNT(Contacto.idPersona) AS conteo\
    FROM Victima\
    INNER JOIN Contacto ON Victima.idVictima = Contacto.idVictima\
    WHERE Victima.fecha_hora_fallecimiento is not null\
    GROUP BY nombre,apellido,direccion,fechaF\
    )DATOS_MUERTOS WHERE DATOS_MUERTOS.conteo > 3;\
    ";
    return consulta;
}

function consulta4(){
    var consulta = "SELECT INFORMACION_CONTACTO.nombre , INFORMACION_CONTACTO.apellido\
    FROM(\
    SELECT Victima.nombre AS nombre,Victima.apellido AS apellido, COUNT(Contacto.idPersona)AS conteo\
    FROM Victima\
    INNER JOIN Contacto ON Victima.idVictima = Contacto.idVictima\
    INNER JOIN Detalle_Contacto ON Contacto.idContacto = Detalle_Contacto.idContacto AND Detalle_Contacto.tipoContacto LIKE '%Beso%'\
    WHERE Victima.estatusEnfermedad LIKE '%Sospecha%'\
    GROUP BY nombre,apellido\
    )INFORMACION_CONTACTO WHERE INFORMACION_CONTACTO.conteo > 2;\
    ";
    return consulta;
}

function consulta5(){
    var consulta = "SELECT Nombre,Apellido,Direccion,Tratamiento,COUNT(idTratamiento) AS Cantidad\
    FROM(\
    SELECT Victima.nombre AS Nombre,Victima.apellido AS Apellido, Victima.direccion_victima AS Direccion,\
    Tipo_Tratamiento.descripcion_tipo AS Tratamiento,Tratamiento.idTipo_Tratamiento AS idTratamiento\
    FROM Victima\
    INNER JOIN Tratamiento ON Victima.idVictima  = Tratamiento.idVictima\
    INNER JOIN Tipo_Tratamiento ON Tratamiento.idTipo_Tratamiento = Tipo_Tratamiento.idTipo_Tratamiento\
    )DATOS_TRATAMIENTOS WHERE Tratamiento LIKE 'Oxígeno'\
    GROUP BY Nombre,Apellido,Direccion,Tratamiento\
    ORDER BY Cantidad DESC\
    LIMIT 5;\
    ";
    return consulta;
}

function consulta6(){
    var consulta = "SELECT DISTINCT DATOS_VICTIMA.nombre,DATOS_VICTIMA.apellido\
    FROM Ubicacion\
    INNER JOIN(\
    SELECT RegistroVictima.idRegistroVictima AS registroVictima, Victima.nombre AS nombre, Victima.apellido AS apellido\
    FROM Victima\
    INNER JOIN Tratamiento ON Victima.idVictima = Tratamiento.idVictima\
    INNER JOIN Tipo_Tratamiento ON Tratamiento.idTipo_Tratamiento = Tipo_Tratamiento.idTipo_Tratamiento AND Tipo_Tratamiento.descripcion_tipo LIKE '%Manejo de la presión arterial%'\
    INNER JOIN RegistroVictima ON Victima.idVictima = RegistroVictima.idVictima\
    WHERE Victima.fecha_hora_fallecimiento is not null\
    )DATOS_VICTIMA WHERE DATOS_VICTIMA.registroVictima = Ubicacion.idRegistroVictima AND Ubicacion.direccion LIKE '%1987 Delphine Well%';\
    ";
    return consulta;
}

function consulta7(){
    var consulta = "SELECT Victima.nombre , Victima.apellido , Victima.direccion_victima\
    FROM Victima\
    INNER JOIN RegistroVictima ON RegistroVictima.idVictima = Victima.idVictima\
    INNER JOIN (\
        SELECT Contacto.idVictima, COUNT(Contacto.idVictima) AS asociados\
        FROM Contacto\
        GROUP BY Contacto.idVictima\
    )AS conteo_asociados ON conteo_asociados.idVictima = Victima.idVictima\
    INNER JOIN(\
        SELECT Tratamiento.idVictima, COUNT(Tratamiento.idVictima) AS tratamiento\
        FROM Tratamiento\
        GROUP BY Tratamiento.idVictima\
    )AS conteo_tratamiento ON conteo_tratamiento.idVictima = Victima.idVictima\
    WHERE conteo_asociados.asociados < 2 AND conteo_tratamiento.tratamiento = 2\
    ";

    return consulta;
}

function consulta8(){
    var consulta = "SELECT MAYOR.MES,MAYOR.NOMBRE,MAYOR.APELLIDO,MAYOR.CONTEO\
    FROM(\
    SELECT MONTH(RegistroVictima.fecha_hora_registro) AS MES, Victima.nombre AS NOMBRE, Victima.apellido AS APELLIDO, COUNT(Tratamiento.idVictima) AS CONTEO\
    FROM Victima\
    INNER JOIN RegistroVictima ON Victima.idVictima = RegistroVictima.idVictima\
    INNER JOIN Tratamiento ON Victima.idVictima = Tratamiento.idVictima\
    GROUP BY MES,NOMBRE,APELLIDO\
    ORDER BY CONTEO DESC\
    LIMIT 5\
    )MAYOR\
    \
    UNION ALL\
    \
    SELECT MENOR.MES,MENOR.NOMBRE,MENOR.APELLIDO,MENOR.CONTEO\
    FROM(\
    SELECT MONTH(RegistroVictima.fecha_hora_registro) AS MES, Victima.nombre AS NOMBRE, Victima.apellido AS APELLIDO, COUNT(Tratamiento.idVictima) AS CONTEO\
    FROM Victima\
    INNER JOIN RegistroVictima ON Victima.idVictima = RegistroVictima.idVictima\
    INNER JOIN Tratamiento ON Victima.idVictima = Tratamiento.idVictima\
    GROUP BY MES,NOMBRE,APELLIDO\
    ORDER BY CONTEO ASC\
    LIMIT 5\
    )MENOR;\
    ";
    return consulta;
}

function consulta9(){
    var consulta = "SELECT Hospital.nombre_hospital AS HOSPITAL,\
	COUNT(RegistroVictima.idVictima)/ \
    (SELECT SUM(TOTAL_VICTIMAS.T_VICTIMAS)\
	FROM(\
		SELECT COUNT(RegistroVictima.idVictima) AS T_VICTIMAS\
		FROM RegistroVictima\
		INNER JOIN Hospital ON RegistroVictima.idHospital = Hospital.idHospital\
		GROUP BY Hospital.idHospital\
	)TOTAL_VICTIMAS) * 100 AS PORCENTAJE\
    FROM RegistroVictima\
    INNER JOIN Hospital ON RegistroVictima.idHospital = Hospital.idHospital\
    GROUP BY Hospital.idHospital\
    ";
    return consulta;
}

function consulta10(){
   var consulta = "SELECT Hospital.idHospital,Hospital.nombre_hospital , Detalle_Contacto.tipoContacto, COUNT(Detalle_Contacto.tipoContacto) AS Cantidad\
	FROM Hospital\
	INNER JOIN RegistroVictima ON RegistroVictima.idHospital  = Hospital.idHospital\
	INNER JOIN Victima ON RegistroVictima.idVictima = Victima.idVictima\
	INNER JOIN Contacto ON Victima.idVictima = Contacto.idVictima\
	INNER JOIN Detalle_Contacto ON Contacto.idContacto = Detalle_Contacto.idContacto\
	GROUP BY Hospital.idHospital ,Nombre, Detalle_Contacto.tipoContacto\
	ORDER BY Hospital.idHospital ASC\
   "; 
   return consulta;
}


module.exports = api;