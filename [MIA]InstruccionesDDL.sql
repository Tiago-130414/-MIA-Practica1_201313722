DROP DATABASE IF EXISTS GVE;

CREATE DATABASE GVE;

USE GVE;

CREATE TABLE Ubicacion_Hospital(
	idUbicacion_Hospital INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    direccion VARCHAR (80) NOT NULL
);

CREATE TABLE Tipo_Tratamiento(
	idTipo_Tratamiento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion_tipo VARCHAR (80) NOT NULL,
    efectividad_tipo_tratamiento INT NOT NULL
);

CREATE TABLE Persona(
	idPersona INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (80) NOT NULL,
    apellido VARCHAR (80) NOT NULL
);

CREATE TABLE Victima(
	idVictima INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (80) NOT NULL,
    apellido VARCHAR (80) NOT NULL,
    direccion_victima VARCHAR (80) NOT NULL,
    estatusEnfermedad	VARCHAR (80) NOT NULL,
    fecha_hora_fallecimiento DATETIME NULL
);

CREATE TABLE Contacto(
	idContacto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idVictima INT NOT NULL,
    idPersona INT NOT NULL,
    FOREIGN KEY (idVictima) REFERENCES Victima (idVictima),
    FOREIGN KEY (idPersona) REFERENCES Persona (idPersona)
);

CREATE TABLE Detalle_Contacto(
	idDetalle_Contacto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipoContacto VARCHAR (80) NOT NULL,
    fecha_hora_inicio_contacto DATETIME NOT NULL,
    fecha_hora_fin_contacto DATETIME NOT NULL,
    fecha_conocio DATETIME NOT NULL,
    idContacto	INT NOT NULL,
    FOREIGN KEY (idContacto) REFERENCES Contacto (idContacto)
);

CREATE TABLE Tratamiento(
	idTratamiento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    efectividad_paciente INT NOT NULL,
    fechaInicioTratamiento DATETIME NOT NULL,
    fechaFinTratamiento DATETIME NOT NULL,
    idTipo_Tratamiento INT NOT NULL,
    idVictima INT NOT NULL,
    FOREIGN KEY (idTipo_Tratamiento) REFERENCES Tipo_Tratamiento (idTipo_Tratamiento),
    FOREIGN KEY (idVictima) REFERENCES Victima (idVictima)
);

CREATE TABLE Hospital(
	idHospital INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_hospital VARCHAR (80) NOT NULL,
    idUbicacion_Hospital INT NOT NULL,
    FOREIGN KEY (idUbicacion_Hospital) REFERENCES Ubicacion_Hospital (idUbicacion_Hospital)
);

CREATE TABLE RegistroVictima(
	idRegistroVictima INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idVictima INT NOT NULL,
    fecha_hora_confirmacion DATETIME NULL,
	fecha_hora_registro DATETIME NULL,
    fecha_hora_fallecimiento DATETIME NULL,
	idHospital	INT NOT NULL,
    FOREIGN KEY (idHospital) REFERENCES Hospital (idHospital),
    FOREIGN KEY (idVictima) REFERENCES Victima (idVictima)
);

CREATE TABLE Ubicacion(
	idUbicacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    direccion VARCHAR (80) NOT NULL,
    fecha_hora_llegada DATETIME NOT NULL,
    fecha_hora_salida DATETIME NOT NULL,
    idRegistroVictima INT NOT NULL,
	FOREIGN KEY (idRegistroVictima) REFERENCES RegistroVictima (idRegistroVictima)
);


DROP TABLE IF EXISTS Detalle_Contacto;
DROP TABLE IF EXISTS Contacto;
DROP TABLE IF EXISTS Persona;
DROP TABLE IF EXISTS Ubicacion;
DROP TABLE IF EXISTS RegistroVictima;
DROP TABLE IF EXISTS Hospital;
DROP TABLE IF EXISTS Ubicacion_Hospital;
DROP TABLE IF EXISTS Tratamiento;
DROP TABLE IF EXISTS Tipo_Tratamiento;
DROP TABLE IF EXISTS Victima;

CREATE TABLE Temporal(
	idTemporal INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NOMBRE_VICTIMA VARCHAR (50) NOT NULL,
    APELLIDO_VICTIMA VARCHAR (50) NOT NULL,
    DIRECCION_VICTIMA VARCHAR (70) NOT NULL,
    FECHA_PRIMERA_SOSPECHA DATETIME NOT NULL,
    FECHA_CONFIRMACION DATETIME NOT NULL,
    FECHA_MUERTE DATETIME NULL,
    ESTADO_VICTIMA VARCHAR (40) NOT NULL,
    NOMBRE_ASOCIADO VARCHAR (50) NULL,
    APELLIDO_ASOCIADO VARCHAR (50) NULL,
    FECHA_CONOCIO DATETIME NULL,
    CONTACTO_FISICO VARCHAR (50) NULL,
    FECHA_INICIO_CONTACTO DATETIME NULL,
    FECHA_FIN_CONTACTO DATETIME NULL,
    NOMBRE_HOSPITAL VARCHAR(50) NULL,
    DIRECCION_HOSPITAL VARCHAR(70) NULL,
    UBICACION_VICTIMA VARCHAR (50) NULL,
    FECHA_LLEGADA DATETIME NULL,
    FECHA_RETIRO DATETIME NULL,
    TRATAMIENTO VARCHAR (50) NULL,
    EFECTIVIDAD INT NULL,
    FECHA_INICIO_TRATAMIENTO DATETIME NULL,
    FECHA_FIN_TRATAMIENTO DATETIME NULL,
    EFECTIVIDAD_EN_VICTIMA INT NULL
);
