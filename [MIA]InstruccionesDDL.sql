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

CREATE TABLE Detalle_Contacto(
	idDetalle_Contacto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipoContacto VARCHAR (80) NOT NULL,
    fecha_hora_inicio_contacto DATETIME NOT NULL,
    fecha_hora_fin_contacto DATETIME NOT NULL
);

CREATE TABLE Persona(
	idPersona INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (80) NOT NULL,
    apellido VARCHAR (80) NOT NULL,
    fecha_hora DATE NOT NULL	
);

CREATE TABLE Victima(
	idVictima INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR (80) NOT NULL,
    apellido VARCHAR (80) NOT NULL,
    direccion_victima VARCHAR (80) NOT NULL,
    estatusEnfermedad	VARCHAR (80) NOT NULL
);

CREATE TABLE Contacto(
	idContacto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idDetalle_Contacto INT NOT NULL,
    idVictima INT NOT NULL,
    idPersona INT NOT NULL,
    FOREIGN KEY (idDetalle_Contacto) REFERENCES Detalle_Contacto (idDetalle_Contacto),
    FOREIGN KEY (idVictima) REFERENCES Victima (idVictima),
    FOREIGN KEY (idPersona) REFERENCES Persona (idPersona)
    
);

CREATE TABLE Tratamiento(
	idTratamiento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    efectividad_paciente INT NOT NULL,
    idTipo_Tratamiento INT NOT NULL,
    idVictima INT NOT NULL,
    FOREIGN KEY (idTipo_Tratamiento) REFERENCES Tipo_Tratamiento (idTipo_Tratamiento),
    FOREIGN KEY (idVictima) REFERENCES Victima (idVictima)
);

CREATE TABLE RegistroVictima(
	idRegistroVictima INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idVictima INT NOT NULL,
	fecha_hora_primera_sospecha DATETIME NULL,
    fecha_hora_confirmacion DATETIME NULL,
	fecha_hora_registro DATETIME NULL,
    fecha_hora_fallecimiento DATETIME NULL,
    victima_hospitalizada INT NOT NULL,
    FOREIGN KEY (idVictima) REFERENCES Victima (idVictima)
);

CREATE TABLE Ubicacion(
	idUbicacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    direccion VARCHAR (80) NOT NULL,
    fecha	DATETIME NOT NULL,
    fecha_hora_llegada DATETIME NOT NULL,
    fecha_hora_salida DATETIME NOT NULL,
    idRegistroVictima INT NOT NULL,
	FOREIGN KEY (idRegistroVictima) REFERENCES RegistroVictima (idRegistroVictima)
);

CREATE TABLE Hospital(
	idHospital INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_hospital VARCHAR (80) NOT NULL,
    idUbicacion_Hospital INT NOT NULL,
    idRegistroVictima INT NOT NULL,
    FOREIGN KEY (idUbicacion_Hospital) REFERENCES Ubicacion_Hospital (idUbicacion_Hospital),
    FOREIGN KEY (idRegistroVictima) REFERENCES RegistroVictima (idRegistroVictima)
);