const supertest = require('supertest');
const app = require('../app');
const NewsTest = require('./NewsTest');
const path = require('path');
const { decodeToken } = require('../utils/token');

describe('Create News', () => {
  beforeAll(async () => {
    await NewsTest.delete();
  });
  afterAll(async () => {
    await NewsTest.delete();
  });

  it('should create news', async () => {
    const userLogin = await supertest(app).post('/auth/login').send({
      username: 'Administrator',
      password: 'admin',
      is_simat: false
    });

    const token = userLogin.body.data.token;

    const filePath = path.join(__dirname, '../uploads/cover.png');
    const response = await supertest(app)
      .post('/news')
      .field('judul_berita', 'judul berita')
      .field('isi', 'isi berita')
      .field('dilihat', 0)
      .attach('cover', filePath)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.data.judul_berita).toBe('judul berita');
    expect(response.body.data.isi).toBe('isi berita');
    expect(response.body.data.cover).toBeDefined();
    expect(response.body.data.dilihat).toBe(0);
    expect(response.body.data.penulis_id).toBe(1);
  });

  it('should create news without cover', async () => {
    const userLogin = await supertest(app).post('/auth/login').send({
      username: 'Administrator',
      password: 'admin',
      is_simat: false
    });

    const token = userLogin.body.data.token;

    const response = await supertest(app).post('/news').send({
      judul_berita: 'judul berita',
      isi: 'isi berita',
      dilihat: 0,
    }).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.data.judul_berita).toBe('judul berita');
    expect(response.body.data.isi).toBe('isi berita');
    expect(response.body.data.cover).toBe(null);
    expect(response.body.data.dilihat).toBe(0);
    expect(response.body.data.penulis_id).toBe(1);
  });
});

describe('Update News', () => {
  beforeEach(async () => {
    await NewsTest.delete();
  });
  afterEach(async () => {
    await NewsTest.delete();
  });

  it('should update news', async () => {
    const userLogin = await supertest(app).post('/auth/login').send({
      username: 'Administrator',
      password: 'admin',
      is_simat: false
    });

    const token = userLogin.body.data.token;
    const penulis_id = decodeToken(token).id;

    const filePath = path.join(__dirname, '../uploads/cover.png');

    const news = await NewsTest.create(penulis_id);

    const response = await supertest(app)
      .put(`/news/${news.id}`)
      .field('judul_berita', 'update judul berita')
      .field('isi', 'update isi berita')
      .field('dilihat', 0)
      .attach('cover', filePath)
      .set('Authorization', `Bearer ${token}`);


    expect(response.status).toBe(200);
    expect(response.body.data.judul_berita).toBe('update judul berita');
    expect(response.body.data.isi).toBe('update isi berita');
    expect(response.body.data.cover).toBeDefined();
    expect(response.body.data.dilihat).toBe(0);
    expect(response.body.data.penulis_id).toBe(penulis_id);
  });

  it('should update news without cover', async () => {
    const userLogin = await supertest(app).post('/auth/login').send({
      username: 'Administrator',
      password: 'admin',
      is_simat: false
    });

    const token = userLogin.body.data.token;
    const penulis_id = decodeToken(token).id;

    const news = await NewsTest.create(penulis_id);

    const response = await supertest(app).put(`/news/${news.id}`)
      .field('judul_berita', 'Update judul berita')
      .field('isi', 'update isi berita')
      .field('dilihat', 1)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.judul_berita).toBe('Update judul berita');
    expect(response.body.data.isi).toBe('update isi berita');
    expect(response.body.data.cover).toBeDefined();
    expect(response.body.data.dilihat).toBe(1);
    expect(response.body.data.penulis_id).toBe(penulis_id);
  });
});

describe('Get News', () => {
  beforeAll(async () => {
    await NewsTest.delete();
    await NewsTest.create(1);
  });
  afterAll(async () => {
    await NewsTest.delete();
  });

  it('should get news', async () => {
    const response = await supertest(app).get('/news');
    expect(response.status).toBe(200);
    expect(response.body.data.data[0].judul_berita).toBe('judul berita');
    expect(response.body.data.data[0].isi).toBe('isi berita');
    expect(response.body.data.data[0].cover).toBe('cover.jpg');
    expect(response.body.data.data[0].dilihat).toBe(0);
    expect(response.body.data.data[0].penulis_id).toBe(1);
  });
});

describe('Delete News', () => {
  beforeAll(async () => {
    await NewsTest.delete();
  });
  afterAll(async () => {
    await NewsTest.delete();
  });

  it('should delete news', async () => {
    const news = await NewsTest.create(1);
    
    const userLogin = await supertest(app).post('/auth/login').send({
      username: 'Administrator',
      password: 'admin',
      is_simat: false
    });

    const token = userLogin.body.data.token;

    const response = await supertest(app).delete(`/news/${news.id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
