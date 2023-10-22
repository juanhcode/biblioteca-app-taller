const app = require('../index');
const request = require('supertest');
require('dotenv').config();
const token = process.env.TOKEN_TEST

describe('Pruebas para agregar y eliminar libros', () => {
    it('Debería agregar un libro', async () => {
        const response = await request(app)
            .post('/v1/libro')
            .set('Authorization', `Bearer ${token}`)
            .send({titulo:"Libro 2",autor:"Juan Hoyossss Contreras"});
        expect(response.status).toBe(200);
    });
    it('Debería eliminar un libro', async () => {
        const id = 47;
        const response = await request(app)
            .delete(`/v1/libro/${id}`)
            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe(`Libro con el id ${id} ha sido eliminado.`);
    });
});
