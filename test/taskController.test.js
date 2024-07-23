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

describe('GET /tasks', () => {
  it('should return all tasks', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  }, 10000);
});

describe('POST /tasks', () => {
  it('should create a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        id: '1',
        title: 'New Task',
        description: 'Description of it',
      })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'New Task');
  }, 10000);
});

describe('GET /tasks/:id', () => {
  it('should return a specific task', async () => {
    const task = await createTestTask({
      id: '1',
      title: 'New Task',
      description: 'Description of it',
    });

    const res = await request(app)
      .get(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', task.id);
  }, 10000);
});

describe('PUT /tasks/:id', () => {
  it('should update a task', async () => {
    const task = await createTestTask({
      id: '1',
      title: 'New Task',
      description: 'Description of it',
    });

    const res = await request(app)
      .put(`/tasks/${task.id}`)
      .send({ title: 'New Updated Task' })
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'New Updated Task');
  }, 10000);
});

describe('DELETE /tasks/:id', () => {
  it('should delete a task', async () => {
    const task = await createTestTask({
      id: '1',
      title: 'New Task',
      description: 'Description of it',
    });

    const res = await request(app)
      .delete(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('{"message":"Task deleted"}');
  }, 10000);
});

async function createTestTask(taskData) {
  const res = await request(app)
    .post('/tasks')
    .send(taskData)
    .set('Authorization', `Bearer ${token}`);
  return res.body;
}
