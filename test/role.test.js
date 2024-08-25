const supertest = require('supertest');
const app = require('../app');
const { destroy } = require('./RoleTest');

describe('Role Test', () => {
  let token;
  let role_id;

  beforeAll(async () => {
    const response = await supertest(app).post('/auth/login').send({
      username: 'Administrator',
      password: 'admin'
    });
    token = response.body.data.token;
  });

  afterAll(async () => {
    await destroy();
  });

  it('should create role', async () => {
    const response = await supertest(app).post('/roles').send({
      name: 'Role Test'
    }).set('Authorization', `Bearer ${token}`);
    role_id = response.body.data.id;
    expect(response.statusCode).toBe(201);
    expect(response.body.data.name).toBe('Role Test');
  });

  it('should get all roles', async () => {
    const response = await supertest(app).get('/roles').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  it('should get role by id', async () => {
    const response = await supertest(app).get(`/roles/${role_id}`).set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

  it('should update role', async () => {
    const response = await supertest(app).put(`/roles/${role_id}`).send({
      name: 'Role Test Updated'
    }).set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.name).toBe('Role Test Updated');
  });

  it('should delete role', async () => {
    const response = await supertest(app).delete(`/roles/${role_id}`).set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

});