const app = require('../index');
const request = require('supertest');
require('dotenv').config();
describe('Pruebas para agregar y eliminar libros', () => {
    it('Debería agregar un libro', async () => {
        const response = await request(app)
            .post('/v1/libro')
            .set('Authorization', `Bearer ${process.env.TOKEN_TEST}`)
            .send({titulo:"Libro 2",autor:"Juan Hoyossss Contreras"});
        expect(response.status).toBe(200);
    });
    it('Debería eliminar un libro', async () => {
        const id = 47;
        const response = await request(app)
            .delete(`/v1/libro/${id}`)
            .set('Authorization', `Bearer ${process.env.TOKEN_TEST}`)
        expect(response.status).toBe(200);
        expect(response.body.msg).toBe(`Libro con el id ${id} ha sido eliminado.`);
    });
});
