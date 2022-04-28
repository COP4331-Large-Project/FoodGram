const  app = require('./server');
const request = require('supertest');

test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
  });

describe("login tests", () => {
  test("invalid username",async() =>{
    const response = await request('localhost:5000').post('/api/login')
    .send({
      login: "does not exist",
      password: "imnotreal"
    })
    expect(response.statusCode).toBe(200);  
  })
})
/*
describe("register tests", () => {
  test("passwords dont match",async() =>{
    await request(app).post("/api/register")
    .send({
      login: "does not exist",
      password: "imnotreal"
    })
    expect((res) => {
      res.body.status = 500;
      res.body.error = "Login/Password Invalid"
    })
  })
})

describe("reset-password tests", () => {
  test("passwords dont match",async() =>{
    await request(api).post("/api/forgot-password")
    .send({
      login: "does not exist",
      password: "imnotreal"
    })
    .expect((res) => {
      res.body.status = 500;
      res.body.error = "Login/Password Invalid"
    })
  })
})
*/
