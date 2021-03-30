USE GVE;

/*CONSULTA 1*/
/*
SELECT Hospital.nombre_hospital AS nombre, Ubicacion_Hospital.direccion AS direccion , COUNT(RegistroVictima.fecha_hora_fallecimiento) as fallecidos
FROM Hospital
INNER JOIN Ubicacion_Hospital ON Hospital.idUbicacion_Hospital = Ubicacion_Hospital.idUbicacion_Hospital
INNER JOIN RegistroVictima  ON Hospital.idRegistroVictima = RegistroVictima.idRegistroVictima
GROUP BY nombre,direccion;
*/

/*CONSULTA 2*/
/*
SELECT Nombre, Apellido
FROM(
SELECT Tratamiento.idVictima AS idVictima , Tratamiento.efectividad_paciente AS efePaciente, Tipo_Tratamiento.descripcion_tipo AS tratamiento, Victima.nombre AS Nombre , Victima.apellido AS Apellido 
FROM Tratamiento
INNER JOIN Tipo_Tratamiento ON Tratamiento.idTipo_Tratamiento = Tipo_Tratamiento.idTipo_Tratamiento
INNER JOIN Victima ON Victima.idVictima = Tratamiento.idVictima
)informacionVictima WHERE tratamiento LIKE '%Transfusiones de sangre%%' AND efePaciente > 5;
*/

/*CONSULTA 3*/
/*
SELECT RegistroVictima.fecha_hora_fallecimiento AS muerto ,Victima.idVictima AS idV ,Victima.nombre AS Nombre,Victima.apellido AS Apellido,Contacto.idVictima as idConteo, COUNT(Contacto.idVictima) as conteo
FROM RegistroVictima
INNER JOIN Victima ON RegistroVictima.idVictima = Victima.idVictima AND RegistroVictima.fecha_hora_fallecimiento != NULL
INNER JOIN Contacto ON RegistroVictima.idVictima = Contacto.idVictima AND conteo > 3
GROUP BY Nombre,Apellido;
*/
/*
SELECT 
FROM Contacto
GROUP BY Contacto.idVictima;
*/


