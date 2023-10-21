CREATE TABLE rol (
  id_rol SERIAL PRIMARY KEY NOT NULL,
  nombre_rol VARCHAR(64) NOT NULL
);

CREATE TABLE libro (
    id_libro SERIAL PRIMARY KEY NOT NULL,
    titulo VARCHAR(50) NOT NULL
);

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY NOT NULL,
	nombre_usuario VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
	contrasenia VARCHAR (50) NOT NULL,
	id_rol INT NOT NULL,
	FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

CREATE TABLE usuario_prestamo (
    id_prestamo SERIAL NOT NULL,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE,
    devuelto BOOLEAN NOT NULL,
    id_usuario INT NOT NULL,
    id_libro INT NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
	FOREIGN KEY (id_libro) REFERENCES libro(id_libro)
);
