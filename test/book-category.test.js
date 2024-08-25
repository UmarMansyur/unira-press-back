const supertest = require('supertest');
const app = require('../app');
const BookCategoryTest = require('./BookCategoryTest');
describe('create book category', () => {
  beforeAll(async () => {
    await BookCategoryTest.delete();
  });

  afterAll(async () => {
    await BookCategoryTest.delete();
  });

  it('Should create book category', async () => {
    const response = await supertest(app).post('/book-categories').send({
      name: 'Terjemahan Fiksi',
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body.data.name).toBe('Terjemahan Fiksi');
  });
});

describe('get book category', () => {
  beforeAll(async () => {
    await BookCategoryTest.delete();
  });

  afterAll(async () => {
    await BookCategoryTest.delete();
  });

  it('Should get book category', async () => {
    const news = await BookCategoryTest.create();
    const response = await supertest(app).get('/book-categories');
    expect(response.statusCode).toEqual(200);
    expect(response.body.data[5].name).toBe('Terjemahan Fiksi');
  });
});

describe('update book category', () => {
  beforeAll(async () => {
    await BookCategoryTest.delete();
  });

  afterAll(async () => {
    await BookCategoryTest.delete();
  });

  it('Should update book category', async () => {
    const bookCategory = await BookCategoryTest.create();
    const response = await supertest(app)
      .put(`/book-categories/${bookCategory.id}`)
      .send({
        name: 'Terjemahan NonFiksi',
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body.data.name).toBe('Terjemahan NonFiksi');
  });
});

describe('delete book category', () => {
  beforeAll(async () => {
    await BookCategoryTest.delete();
  });

  afterAll(async () => {
    await BookCategoryTest.delete();
  });

  it('Should delete book category', async () => {
    const bookCategory = await BookCategoryTest.create();
    const response = await supertest(app).delete(`/book-categories/${bookCategory.id}`);
    expect(response.statusCode).toEqual(200);
  });
});