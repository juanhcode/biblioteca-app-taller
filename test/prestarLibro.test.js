const request = require('supertest');
const app = require('../index'); // Asegúrate de importar tu aplicación Express desde el archivo adecuado

describe('Endpoint de Prestar Libro', () => {
  it('debería prestar un libro con éxito', async () => {
    const response = await request(app)
      .post('/prestar-libro')
      .send({ libroId: 2, usuarioId: 2 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('El libro se ha prestado exitosamente');
  });

  it('debería devolver un mensaje de error si el libro ya está prestado', async () => {
    // Suponemos que el libro con ID 1 ya está prestado
    const response = await request(app)
      .post('/prestar-libro')
      .send({ libroId: 1, usuarioId: 2 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('El libro no está disponible para préstamo');
  });

  it('debería devolver un mensaje de error si el libro no existe', async () => {
    // Suponemos que el libro con ID 999 no existe
    const response = await request(app)
      .post('/prestar-libro')
      .send({ libroId: 999, usuarioId: 2 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('El libro no está disponible para préstamo');
  });
});
