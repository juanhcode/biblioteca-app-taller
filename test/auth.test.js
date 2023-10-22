const app = require('../index');
const request = require('supertest');
describe('Pruebas de inicio de sesión', () => {
    it('Debería iniciar sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post('/v1/login')
            .send({
                nombre_usuario: "usuario1",
                contrasenia: "1234"
            })

        expect(response.status).toBe(200);
        //expect(response.body.message).toBe('Acceso permitido');
    });
    it('Debería fallar el inicio de sesión con credenciales incorrectas', async () => {
        const response = await request(app)
            .post('/v1/login')
            .send({
                nombre_usuario: "usuarioNoExiste",
                contrasenia: "1234454"
            });

        expect(response.status).toBe(404);
        expect(response.body.msg).toBe('No existe el usuario: usuarioNoExiste');
    });
    it('Debería fallar el inicio de sesión si el usuario no existe', async () => {
        const response = await request(app)
            .post('/v1/login')
            .send({
                nombre_usuario: "usuarioNoExiste",
                contrasenia: "1234"
            });

        expect(response.status).toBe(404);
        expect(response.body.msg).toBe(`No existe el usuario: usuarioNoExiste`);
    });
    it('Debería fallar el inicio de sesión con contraseña incorrecta', async () => {
        const response = await request(app)
            .post('/v1/login')
            .send({
                nombre_usuario: "usuario1",
                contrasenia: "12344"
            });

        expect(response.status).toBe(401);
        expect(response.body.msg).toBe('Contrasenia incorrecta');
    });
    it('Debería fallar el inicio de sesión si no se proporcionan credenciales', async () => {
        const response = await request(app)
            .post('/v1/login')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.msg).toBe('Falta información de inicio de sesión');
    });

})