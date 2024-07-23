const request = require('supertest');
const { app, startServer, stopServer } = require('../index');

let server;
let token;

beforeAll(async () => {
  server = startServer();

  const res = await request(app).post('/register').send({
    username: 'admin',
    password: 'password',
  });

  const loginRes = await request(app).post('/login').send({
    username: 'admin',
    password: 'password',
  });

  token = loginRes.body.token;
});

afterAll(async () => {
  stopServer();
});

describe('POST /login', () => {
  it('deve retornar um token JWT para credenciais válidas', async () => {
    const res = await request(app).post('/login').send({
      username: 'admin',
      password: 'password',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
