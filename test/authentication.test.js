const supertest = require('supertest');
const app = require('../app');
const UserTest = require('./UserTest');
const jwt = require('jsonwebtoken');

describe('Authentication SIMAT', () => {
  beforeAll(async () => {
    await UserTest.delete();
  });

  afterAll(async () => {
    await UserTest.delete();
  });

  it('should register user', async () => {
    const res = await supertest(app)
      .post('/auth/register')
      .send({
        username: "2020520018",
        password: "158666",
        is_simat: false,
        email: "umar.ovie@gmail.com",
        nama: "Muhammad Umar Mansyur",
        phone: "081234567891"
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.data.username).toBe("2020520018");
    expect(res.body.data.email).toBe("umar.ovie@gmail.com");
    expect(res.body.data.nama).toBe("Muhammad Umar Mansyur");
    expect(res.body.data.phone).toBe("081234567891");
    expect(res.body.data.is_simat).toBe(false);
    expect(res.body.data.has_verified_email).toBe(false);
    expect(res.body.data.password).toBeDefined();
  });
});

describe('Login by SIMAT', () => {
  beforeAll(async () => {
    await UserTest.delete();
  });

  afterAll(async () => {
    await UserTest.delete();
  });

  it('should login user', async () => {
    const res = await supertest(app)
      .post('/auth/login')
      .send({
        username: "2020520018",
        password: "158666",
        is_simat: true
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.token).toBeDefined();
  });
});

describe('Login by non-SIMAT', () => {
  beforeAll(async () => {
    await UserTest.create();
  });

  afterAll(async () => {
    await UserTest.delete();
  });

  it('should login user', async () => {
    const res = await supertest(app)
      .post('/auth/login')
      .send({
        username: "2020520018",
        password: "158666",
        is_simat: false
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.token).toBeDefined();
  });
});

describe('Forgot Password', () => {
  beforeAll(async () => {
    await UserTest.create();
  });

  afterAll(async () => {
    await UserTest.delete();
  });

  it('should send email', async () => {
    const res = await supertest(app)
      .post('/auth/forgot-password')
      .send({
        email: "umar.ovie@gmail.com"
      });
    expect(res.statusCode).toEqual(200);
  });
});

describe('Reset Password', () => {
  afterAll(async () => {
    await UserTest.delete();
  });

  it('should reset password', async () => {
    const user = await UserTest.create();
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const res = await supertest(app)
      .post('/auth/reset-password')
      .send({
        password: "123456",
        token
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Password berhasil direset");
  });
});


describe('Change Password', () => {
  afterAll(async () => {
    await UserTest.delete();
  });

  it('should change password', async () => {
    const user = await UserTest.create();
    const res = await supertest(app)
      .post('/auth/change-password')
      .send({
        password: "123456",
        id: user.id
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Password berhasil diubah");
  });
})