const  app = require('./server');
const request = require('supertest');

describe("login tests", () => {

  test("correct username/password",async() =>{
    const response = await request('localhost:5000').post('/api/login')
    .send({
      login: "correct",
      password: "password123"
    })
    expect(response.statusCode).toBe(200);  
    expect(response.body.error).toBe("");
  })

  test("invalid username/password",async() =>{
    const response = await request('localhost:5000').post('/api/login')
    .send({
      login: "does not exist",
      password: "imnotreal"
    })
    expect(response.statusCode).toBe(200);  
    expect(response.body.error).toBe("User/Password combination incorrect");
  })

  test("password blank",async() =>{
    const response = await request('localhost:5000').post('/api/login')
    .send({
      login: "test1",
      password: ""
    })
    expect(response.statusCode).toBe(422);  
    //expect(response.body.error).toBe("can't be blank");
  })

  test("login blank",async() =>{
    const response = await request('localhost:5000').post('/api/login')
    .send({
      login: "",
      password: "password1234"
    })
    expect(response.statusCode).toBe(422);  
    //expect(response.body.error).toBe("can't be blank");
  })

  test("unverified email",async() =>{
    const response = await request('localhost:5000').post('/api/login')
    .send({
      login: "unverified",
      password: "password123"
    })
    expect(response.statusCode).toBe(200);  
    expect(response.body.error).toBe("Please verify your email!");
  })
})

describe("register tests", () => {

  test("user already exists",async() =>{
    const response = await request('localhost:5000').post('/api/register')
    .send({
      FirstName: "John",
      LastName: "Doe",
      Login: "jdoe23",
      Password: "password",
      Email: "testtest@gmail.com"
    })
    expect(response.statusCode).toBe(200);  
    expect(response.body.error).toBe("User already exists");
  })

  test("email already exists",async() =>{
    const response = await request('localhost:5000').post('/api/register')
    .send({
      FirstName: "John",
      LastName: "Doe",
      Login: "testtest123",
      Password: "password",
      Email: "jdoe@gmail.com"
    })
    expect(response.statusCode).toBe(200);  
    expect(response.body.error).toBe("Email already exists");
  })

})

/*
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