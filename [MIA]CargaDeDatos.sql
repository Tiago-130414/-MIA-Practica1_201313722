USE GVE;

-- //PARA PERSONAS

INSERT INTO Persona(nombre,apellido)
SELECT DISTINCT Temporal.NOMBRE_ASOCIADO, Temporal.APELLIDO_ASOCIADO
FROM Temporal
WHERE Temporal.NOMBRE_ASOCIADO != "" AND Temporal.APELLIDO_ASOCIADO != "";

-- //PARA TIPOS DE TRATAMIENTO

INSERT INTO Tipo_Tratamiento(descripcion_tipo, efectividad_tipo_tratamiento)
SELECT DISTINCT Temporal.Tratamiento , Temporal.EFECTIVIDAD
FROM Temporal
WHERE Temporal.Tratamiento != "" AND Temporal.EFECTIVIDAD != 0;

-- //PARA UBICACION DE HOSPITAL

INSERT INTO Ubicacion_Hospital(direccion)
SELECT DISTINCT Temporal.DIRECCION_HOSPITAL
FROM Temporal
WHERE Temporal.DIRECCION_HOSPITAL != "";

-- //PARA VICTIMAS DE HOSPITAL

INSERT INTO Victima (nombre,apellido,direccion_victima,estatusEnfermedad,fecha_hora_fallecimiento)
SELECT DISTINCT Temporal.NOMBRE_VICTIMA,Temporal.APELLIDO_VICTIMA,Temporal.DIRECCION_VICTIMA,Temporal.ESTADO_VICTIMA ,Temporal.FECHA_MUERTE
FROM Temporal
WHERE Temporal.NOMBRE_VICTIMA != "" AND Temporal.APELLIDO_VICTIMA != "" AND Temporal.DIRECCION_VICTIMA != "" AND Temporal.ESTADO_VICTIMA != "";

-- //PARA TRATAMIENTO

INSERT INTO Tratamiento (efectividad_paciente,fechaInicioTratamiento,fechaFinTratamiento,idTipo_Tratamiento,idVictima)
SELECT DISTINCT Temporal.EFECTIVIDAD_EN_VICTIMA,Temporal.FECHA_INICIO_TRATAMIENTO,Temporal.FECHA_FIN_TRATAMIENTO ,Tipo_Tratamiento.idTipo_Tratamiento,Victima.idVictima  FROM Temporal
INNER JOIN Victima ON Temporal.DIRECCION_VICTIMA = Victima.direccion_victima AND Temporal.NOMBRE_VICTIMA = Victima.nombre AND Temporal.APELLIDO_VICTIMA = Victima.apellido
INNER JOIN Tipo_Tratamiento ON Temporal.TRATAMIENTO = Tipo_Tratamiento.descripcion_tipo;

-- //PARA HOSPITALES

INSERT INTO Hospital (nombre_hospital, idUbicacion_Hospital)
SELECT nombre , idUbicacion
FROM(
SELECT DISTINCT Temporal.NOMBRE_HOSPITAL AS nombre,Temporal.DIRECCION_HOSPITAL, Ubicacion_Hospital.idUbicacion_Hospital AS idUbicacion
FROM Temporal
INNER JOIN Ubicacion_Hospital ON  Temporal.DIRECCION_HOSPITAL = Ubicacion_Hospital.direccion
WHERE Temporal.NOMBRE_HOSPITAL != "" AND Temporal.DIRECCION_HOSPITAL != ""
)Nombres_Hospitales;

-- //PARA REGISTRO VICTIMA

INSERT INTO RegistroVictima(idVictima,fecha_hora_confirmacion,fecha_hora_registro,fecha_hora_fallecimiento,idHospital)
SELECT idVictimaAg, fechaC,fechaR,fechaM,idHospitalAg
FROM(
SELECT DISTINCT Victima.idVictima AS idVictimaAg ,PRUEBA.idH AS idHospitalAg, Temporal.NOMBRE_VICTIMA , Temporal.APELLIDO_VICTIMA , Temporal.FECHA_CONFIRMACION AS fechaC,Temporal.FECHA_PRIMERA_SOSPECHA AS fechaR, Temporal.FECHA_MUERTE AS fechaM
FROM Temporal
INNER JOIN Victima ON Victima.nombre = Temporal.NOMBRE_VICTIMA AND Victima.apellido = Temporal.APELLIDO_VICTIMA
INNER JOIN (
SELECT Hospital.idHospital AS idH , Ubicacion_Hospital.idUbicacion_Hospital AS idUbi,Ubicacion_Hospital.direccion AS ubi,Hospital.nombre_hospital AS nomH 
FROM Hospital
INNER JOIN Ubicacion_Hospital ON Hospital.idUbicacion_Hospital = Ubicacion_Hospital.idUbicacion_Hospital
)PRUEBA ON Temporal.NOMBRE_HOSPITAL = nomH AND Temporal.DIRECCION_HOSPITAL = ubi
)DATOS;

-- PARA UBICACION

INSERT INTO Ubicacion (direccion,fecha_hora_llegada,fecha_hora_salida,idRegistroVictima)
SELECT DISTINCT  Temporal.UBICACION_VICTIMA,Temporal.FECHA_LLEGADA,
Temporal.FECHA_RETIRO, DATOS_VICTIMA.idVic
FROM Temporal
INNER JOIN(
SELECT RegistroVictima.idRegistroVictima AS idVic, Victima.nombre AS nomVic, Victima.apellido AS apeVic, Victima.direccion_victima AS dirVic
FROM RegistroVictima
INNER JOIN Victima ON RegistroVictima.idVictima = Victima.idVictima
)DATOS_VICTIMA WHERE Temporal.NOMBRE_VICTIMA = nomVic AND Temporal.APELLIDO_VICTIMA = apeVic AND Temporal.DIRECCION_VICTIMA = dirVic AND Temporal.UBICACION_VICTIMA != ""
;

-- PARA CONTACTO

INSERT INTO Contacto (idVictima,idPersona)
SELECT ID_CONOCIDOS.victimaID,Persona.idPersona
FROM Persona
INNER JOIN (
SELECT Victima.idVictima AS victimaID, Victima.nombre AS nombreVictima, CONOCIDOS.nAsociado AS nombAsociado, CONOCIDOS.apAsociado AS apeAsociado
FROM Victima
INNER JOIN(
SELECT DISTINCT Temporal.NOMBRE_VICTIMA AS nVictima, Temporal.APELLIDO_VICTIMA AS apVictima, Temporal.DIRECCION_VICTIMA AS dirVictima, 
Temporal.NOMBRE_ASOCIADO AS nAsociado, Temporal.APELLIDO_ASOCIADO AS apAsociado , Temporal.FECHA_CONOCIO AS fecha
FROM Temporal
WHERE Temporal.NOMBRE_VICTIMA != "" AND Temporal.NOMBRE_ASOCIADO != ""
)CONOCIDOS ON Victima.nombre = CONOCIDOS.nVictima AND Victima.apellido = CONOCIDOS.apVictima AND Victima.direccion_victima = CONOCIDOS.dirVictima
)ID_CONOCIDOS ON Persona.nombre =  ID_CONOCIDOS.nombAsociado AND Persona.apellido = ID_CONOCIDOS.apeAsociado ;


-- PARA DETALLE CONTACTO

INSERT INTO Detalle_Contacto (tipoContacto, fecha_hora_inicio_contacto, fecha_hora_fin_contacto,fecha_conocio,idContacto)
SELECT DISTINCT Temporal.CONTACTO_FISICO,Temporal.FECHA_INICIO_CONTACTO,Temporal.FECHA_FIN_CONTACTO, Temporal.FECHA_CONOCIO,DETALLE_CONTACTO.idCont
FROM Temporal 
INNER JOIN (
SELECT Contacto.idContacto AS idCont, Victima.nombre AS nVictima ,Victima.apellido AS apVictima, Victima.direccion_victima AS dirVictima, 
Persona.nombre AS nAsociado , Persona.apellido AS apAsociado
FROM Contacto
INNER JOIN Victima ON Contacto.idVictima = Victima.idVictima
INNER JOIN Persona ON Contacto.idPersona = Persona.idPersona
)DETALLE_CONTACTO ON Temporal.NOMBRE_VICTIMA = DETALLE_CONTACTO.nVictima AND Temporal.APELLIDO_VICTIMA = DETALLE_CONTACTO.apVictima 
AND Temporal.DIRECCION_VICTIMA = DETALLE_CONTACTO.dirVictima AND Temporal.NOMBRE_ASOCIADO = DETALLE_CONTACTO.nAsociado 
AND Temporal.APELLIDO_ASOCIADO = DETALLE_CONTACTO.apAsociado AND Temporal.CONTACTO_FISICO != "";

