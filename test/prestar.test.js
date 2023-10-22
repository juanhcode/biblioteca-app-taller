const request = require('supertest');
const app = require('../index'); // Asegúrate de importar tu aplicación Express desde el archivo adecuado
require('dotenv').config();
const token = process.env.TOKEN_TEST

describe('Endpoint de Prestar Libro', () => {
  it('debería prestar un libro con éxito', async () => {

    const response = await request(app)
      .post('/v1/user/prestar-libro')
      .set('Authorization', `Bearer ${token}`)
      .send({ libroId: 29, usuarioId: 1,fechaDevolucion:"2023/10/29" });

    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe('El libro se ha prestado exitosamente');
  });
  it('debería devolver un mensaje de error si el libro ya está prestado', async () => {
    // Suponemos que el libro con ID 1 ya está prestado
    const response = await request(app)
      .post('/v1/user/prestar-libro')
      .set('Authorization', `Bearer ${token}`)
      .send({ libroId: 3, usuarioId: 1,fechaDevolucion:"2023/10/31" });

    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe('El libro no está disponible para préstamo');
  });
  it('debería devolver un mensaje de error si el libro no existe', async () => {
    // Suponemos que el libro con ID 999 no existe
    const response = await request(app)
      .post('/v1/user/prestar-libro')
      .set('Authorization', `Bearer ${token}`)
      .send({ libroId: 999, usuarioId: 1 });

    expect(response.body.code).toBe(400);
    expect(response.body.message).toBe('El libro no está disponible para préstamo');
  })

});
