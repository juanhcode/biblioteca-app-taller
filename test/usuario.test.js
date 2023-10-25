const request = require('supertest');
const app = require('../index');
require('dotenv').config();
const token = process.env.TOKEN_TEST

describe('Pruebas de registro de usuario', () => {
  it('Deberia registrarse con el formulario completo', async () => {
    const response = await request(app)
    .post('/v1/user')
    .send({
      nombre_usuario: "usuario8",
      nombres: "usuario8",
      apellidos: "usuario88",
      contrasenia: "1234",
      id_rol: 1
    })
    expect(response.status).toBe(201);
    expect(response.body.msg).toBe('Usuario: usuario8 ha sido creado correctamente')
  })

  it('Deberia fallar el registro con un nombre de usuario repetido', async () => {
    const response = await request(app)
    .post('/v1/user')
    .send({
      nombre_usuario: "usuario3",
      nombres: "usuario5",
      apellidos: "usuario55",
      contrasenia: "1234",
      id_rol: 1
    })
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe('Ya existe un usuario con ese nombre de usuario: usuario3')
  })

  it('Deberia fallar el registro cuando falta por llenar un campo', async () => {
    const response = await request(app)
    .post('/v1/user')
    .send({
      nombre_usuario: "usuario3",
    },
    {},
    {
      nombre_usuario: "usuario3",
      apellidos: "usuario55"
    })
    for (const campo in response.body) {
      if (campo.startsWith('Falta el campo obligatorio: ')) {
        const campoFaltante = campo.replace('Falta el campo obligatorio: ', '');
        expect(response.status).toBe(400);
        expect(campo).toBe(`Falta el campo obligatorio: ${campoFaltante}`);
      }
    }
  })
})

describe('API de Usuario', () => {
  it('debería buscar libros por título', async () => {
    const response = await request(app)
      .get('/v1/user/find?titulo=V de vendetta')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.libro).toHaveLength(1);
  });

  it('debería buscar libros por autor', async () => {
    const response = await request(app)
      .get('/v1/user/find?autor=Alan Moore')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.libro).toHaveLength(1);
  });

  it('debería buscar libros por título y autor', async () => {
    const response = await request(app)
      .get('/v1/user/find?autor=Alan Moore&titulo=V de vendetta')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.libro).toHaveLength(1); // Asegura que se encontró al menos un libro
  });

  it('debería recibir un mensaje de error si no se proporcionan parámetros de búsqueda', async () => {
    const response = await request(app)
      .get('/v1/user/find')
      .set('Authorization', `Bearer ${token}`);
      console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Debes proporcionar al menos un parámetro de búsqueda (titulo o autor)');
  });

  it('debería manejar errores de búsqueda de libros', async () => {
    // Mockear el servicio de búsqueda de libros para forzar un error
    jest.mock('../services/usuario.service', () => ({
      buscarLibro: jest.fn(() => {
        throw new Error('Error de búsqueda');
      }),
    }));

    const response = await request(app)
      .get('/v1/user/find?titulo=El%20nombre%20del%20viento')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error al buscar libros');
  });
});
