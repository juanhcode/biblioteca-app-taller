const request = require('supertest');
const app = require('../index');

describe('Endpoint de Devolver Libro', () => {
    it('debería devolver un libro con éxito', async () => {
        const response = await request(app)
            .post('/v1/user/devolver-libro')
            .send({ libroId: 20, usuarioId: 1 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('El libro se ha devuelto exitosamente');
    });

    it('debería devolver un mensaje de error si el libro no está prestado por el usuario', async () => {
        const response = await request(app)
            .post('/v1/user/devolver-libro')
            .send({ libroId: 3, usuarioId: 1 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('El libro no puede ser devuelto (no está prestado por este usuario)');
    });


    it('debería devolver un mensaje de error si el libro no existe', async () => {
        const response = await request(app)
            .post('/v1/user/devolver-libro')
            .send({ libroId: 999, usuarioId: 1 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('El libro no puede ser devuelto (no está prestado por este usuario)');
    });


    it('debería devolver un mensaje de error si falta el ID del libro', async () => {
        const response = await request(app)
            .post('/v1/user/devolver-libro')
            .send({ usuarioId: 1 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Se requiere el ID del libro para la devolución');
    });
    it('debería devolver un mensaje de error si falta el ID del usuario', async () => {
        const response = await request(app)
            .post('/v1/user/devolver-libro')
            .send({ libroId: 3 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Se requiere el ID del usuario para la devolución');
    });
});
