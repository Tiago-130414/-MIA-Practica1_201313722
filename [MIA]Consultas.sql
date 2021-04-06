USE GVE;

/*CONSULTA 1 - 74 */

-- Mostrar el nombre del hospital, su dirección y el número de fallecidos por
-- cada hospital registrado.
SELECT DATOS_FALLECIDOS_HOSPITAL.nombre,DATOS_FALLECIDOS_HOSPITAL.direccion,DATOS_FALLECIDOS_HOSPITAL.fallecidos
FROM(
SELECT Hospital.nombre_hospital AS nombre, Ubicacion_Hospital.direccion AS direccion , COUNT(RegistroVictima.fecha_hora_fallecimiento) as fallecidos
FROM Hospital
INNER JOIN Ubicacion_Hospital ON Hospital.idUbicacion_Hospital = Ubicacion_Hospital.idUbicacion_Hospital
INNER JOIN RegistroVictima  ON Hospital.idHospital = RegistroVictima.idHospital
GROUP BY nombre,direccion
)DATOS_FALLECIDOS_HOSPITAL WHERE DATOS_FALLECIDOS_HOSPITAL.fallecidos > 0; 


/*CONSULTA 2 - 6*/

-- Mostrar el nombre, apellido de todas las víctimas en cuarentena que
-- presentaron una efectividad mayor a 5 en el tratamiento “Transfusiones de
-- sangre”

SELECT Victima.nombre, Victima.apellido
FROM Victima
INNER JOIN Tratamiento ON Tratamiento.idVictima = Victima.idVictima
INNER JOIN Tipo_Tratamiento ON Tratamiento.idTipo_Tratamiento = Tipo_Tratamiento.idTipo_Tratamiento
WHERE Victima.estatusEnfermedad LIKE '%En Cuarentena%' AND Tipo_Tratamiento.descripcion_tipo LIKE '%Transfusiones de sangre%' AND Tratamiento.efectividad_paciente > 5;


/*CONSULTA 3 - 97*/ -- 313

-- Mostrar el nombre, apellido y dirección de las víctimas fallecidas con más de
-- tres personas asociadas.

SELECT DATOS_MUERTOS.nombre,DATOS_MUERTOS.apellido,DATOS_MUERTOS.direccion
FROM(
SELECT Victima.nombre AS nombre ,Victima.apellido AS apellido,Victima.direccion_victima AS direccion, Victima.fecha_hora_fallecimiento AS fechaF, COUNT(Contacto.idPersona) AS conteo
FROM Victima 
INNER JOIN Contacto ON Victima.idVictima = Contacto.idVictima
WHERE Victima.fecha_hora_fallecimiento is not null
GROUP BY nombre,apellido,direccion,fechaF
)DATOS_MUERTOS WHERE DATOS_MUERTOS.conteo > 3;

/*CONSULTA 4 - 5*/

-- Mostrar el nombre y apellido de todas las víctimas en estado “Sospecha”
-- que tuvieron contacto físico de tipo “Beso” con más de 2 de sus asociados.
SELECT INFORMACION_CONTACTO.nombre , INFORMACION_CONTACTO.apellido
FROM(
SELECT Victima.nombre AS nombre,Victima.apellido AS apellido, COUNT(Contacto.idPersona)AS conteo
FROM Victima
INNER JOIN Contacto ON Victima.idVictima = Contacto.idVictima
INNER JOIN Detalle_Contacto ON Contacto.idContacto = Detalle_Contacto.idContacto AND Detalle_Contacto.tipoContacto LIKE '%Beso%' 
WHERE Victima.estatusEnfermedad LIKE '%Sospecha%'
GROUP BY nombre,apellido
)INFORMACION_CONTACTO WHERE INFORMACION_CONTACTO.conteo > 2;

/*CONSULTA 5 */

-- Top 5 de víctimas que más tratamientos se han aplicado del tratamiento
-- “Oxígeno”.

SELECT Nombre,Apellido,Direccion,Tratamiento,COUNT(idTratamiento) AS Cantidad
FROM(
SELECT Victima.nombre AS Nombre,Victima.apellido AS Apellido, Victima.direccion_victima AS Direccion, 
Tipo_Tratamiento.descripcion_tipo AS Tratamiento,Tratamiento.idTipo_Tratamiento AS idTratamiento
FROM Victima
INNER JOIN Tratamiento ON Victima.idVictima  = Tratamiento.idVictima
INNER JOIN Tipo_Tratamiento ON Tratamiento.idTipo_Tratamiento = Tipo_Tratamiento.idTipo_Tratamiento
)DATOS_TRATAMIENTOS WHERE Tratamiento LIKE 'Oxígeno'
GROUP BY Nombre,Apellido,Direccion,Tratamiento 
ORDER BY Cantidad DESC 
LIMIT 5;


/*CONSULTA 6 -  1 */

-- Mostrar el nombre, el apellido y la fecha de fallecimiento de todas las
-- víctimas que se movieron por la dirección “1987 Delphine Well” a los cuales
-- se les aplicó "Manejo de la presión arterial" como tratamiento.

SELECT DISTINCT DATOS_VICTIMA.nombre,DATOS_VICTIMA.apellido
FROM Ubicacion
INNER JOIN(
SELECT RegistroVictima.idRegistroVictima AS registroVictima, Victima.nombre AS nombre, Victima.apellido AS apellido
FROM Victima
INNER JOIN Tratamiento ON Victima.idVictima = Tratamiento.idVictima
INNER JOIN Tipo_Tratamiento ON Tratamiento.idTipo_Tratamiento = Tipo_Tratamiento.idTipo_Tratamiento AND Tipo_Tratamiento.descripcion_tipo LIKE '%Manejo de la presión arterial%'
INNER JOIN RegistroVictima ON Victima.idVictima = RegistroVictima.idVictima
WHERE Victima.fecha_hora_fallecimiento is not null
)DATOS_VICTIMA WHERE DATOS_VICTIMA.registroVictima = Ubicacion.idRegistroVictima AND Ubicacion.direccion LIKE '%1987 Delphine Well%';

/*CONSULTA 7*/

-- Mostrar nombre, apellido y dirección de las víctimas que tienen menos de 2
-- allegados los cuales hayan estado en un hospital y que se le hayan aplicado
-- únicamente dos tratamientos.

SELECT Victima.nombre,Victima.apellido,Victima.direccion_victima
FROM ((Contacto 
INNER JOIN Victima ON Contacto.idVictima = Victima.idVictima)
INNER JOIN Persona ON Contacto.idPersona = Persona.idPersona)
INNER JOIN(
SELECT Victima.nombre , Victima.apellido 
FROM Contacto
INNER JOIN Persona ON Contacto.idPersona = Persona.idPersona
INNER JOIN Victima ON Victima.nombre = Persona.nombre AND Victima.apellido = Persona.apellido
INNER JOIN RegistroVictima ON RegistroVictima.idVictima = Victima.idVictima
INNER JOIN Tratamiento ON Tratamiento.idVictima = Victima.idVictima
GROUP BY Victima.idVictima
HAVING COUNT(Victima.idVictima) = 2
) AS Datos_Asociado ON Datos_Asociado.nombre = Persona.nombre AND Datos_Asociado.apellido = Persona.apellido
GROUP BY Victima.idVictima
HAVING COUNT(Victima.idVictima) < 2;

-- Mostrar nombre, apellido y dirección de las víctimas que tienen menos de 2
-- allegados los cuales hayan estado en un hospital y que se le hayan aplicado
-- únicamente dos tratamientos.

SELECT Victima.nombre , Victima.apellido , Victima.direccion_victima
FROM Victima
INNER JOIN RegistroVictima ON RegistroVictima.idVictima = Victima.idVictima
INNER JOIN (
	SELECT Contacto.idVictima, COUNT(Contacto.idVictima) AS asociados
    FROM Contacto
    GROUP BY Contacto.idVictima
)AS conteo_asociados ON conteo_asociados.idVictima = Victima.idVictima
INNER JOIN(
	SELECT Tratamiento.idVictima, COUNT(Tratamiento.idVictima) AS tratamiento
    FROM Tratamiento
    GROUP BY Tratamiento.idVictima
)AS conteo_tratamiento ON conteo_tratamiento.idVictima = Victima.idVictima
WHERE conteo_asociados.asociados < 2 AND conteo_tratamiento.tratamiento = 2;

/*CONSULTA 8*/

-- Mostrar el número de mes ,de la fecha de la primera sospecha, nombre y
-- apellido de las víctimas que más tratamientos se han aplicado y las que
-- menos. (Todo en una sola consulta)

-- Deben hacer un top 5 de los que más y 
-- un top 5 de los que menos y realizar una unión, 
-- la consulta final tendría que mostrar 10 registros.

SELECT MAYOR.MES,MAYOR.NOMBRE,MAYOR.APELLIDO,MAYOR.CONTEO
FROM(
SELECT MONTH(RegistroVictima.fecha_hora_registro) AS MES, Victima.nombre AS NOMBRE, Victima.apellido AS APELLIDO, COUNT(Tratamiento.idVictima) AS CONTEO
FROM Victima
INNER JOIN RegistroVictima ON Victima.idVictima = RegistroVictima.idVictima
INNER JOIN Tratamiento ON Victima.idVictima = Tratamiento.idVictima
GROUP BY MES,NOMBRE,APELLIDO
ORDER BY CONTEO DESC
LIMIT 5
)MAYOR

UNION ALL

SELECT MENOR.MES,MENOR.NOMBRE,MENOR.APELLIDO,MENOR.CONTEO
FROM(
SELECT MONTH(RegistroVictima.fecha_hora_registro) AS MES, Victima.nombre AS NOMBRE, Victima.apellido AS APELLIDO, COUNT(Tratamiento.idVictima) AS CONTEO
FROM Victima
INNER JOIN RegistroVictima ON Victima.idVictima = RegistroVictima.idVictima
INNER JOIN Tratamiento ON Victima.idVictima = Tratamiento.idVictima
GROUP BY MES,NOMBRE,APELLIDO
ORDER BY CONTEO ASC
LIMIT 5
)MENOR;


/*CONSULTA 9*/
-- Mostrar el porcentaje de víctimas que le corresponden a cada hospital.

SELECT Hospital.nombre_hospital AS HOSPITAL,
	COUNT(RegistroVictima.idVictima)/ 
    (SELECT SUM(TOTAL_VICTIMAS.T_VICTIMAS)
	FROM(
		SELECT COUNT(RegistroVictima.idVictima) AS T_VICTIMAS
		FROM RegistroVictima
		INNER JOIN Hospital ON RegistroVictima.idHospital = Hospital.idHospital
		GROUP BY Hospital.idHospital
	)TOTAL_VICTIMAS) * 100 AS PORCENTAJE
FROM RegistroVictima
INNER JOIN Hospital ON RegistroVictima.idHospital = Hospital.idHospital
GROUP BY Hospital.idHospital;


/*CONSULTA 10*/
-- Mostrar el porcentaje del contacto físico más común de cada hospital de la
-- siguiente manera: nombre de hospital, nombre del contacto físico, porcentaje
-- de víctimas.

	SELECT Hospital.idHospital,Hospital.nombre_hospital , Detalle_Contacto.tipoContacto, COUNT(Detalle_Contacto.tipoContacto) AS Cantidad
	FROM Hospital
	INNER JOIN RegistroVictima ON RegistroVictima.idHospital  = Hospital.idHospital
	INNER JOIN Victima ON RegistroVictima.idVictima = Victima.idVictima
	INNER JOIN Contacto ON Victima.idVictima = Contacto.idVictima
	INNER JOIN Detalle_Contacto ON Contacto.idContacto = Detalle_Contacto.idContacto
	GROUP BY Hospital.idHospital ,Nombre, Detalle_Contacto.tipoContacto
	ORDER BY Hospital.idHospital ASC

	