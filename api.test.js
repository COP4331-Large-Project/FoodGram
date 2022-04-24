const  api = require('./api');
const request = require('supertest')

test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
  });

describe("login tests", () => {
  test("invalid username",async() =>{
    await request(api).post("/api/login")
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