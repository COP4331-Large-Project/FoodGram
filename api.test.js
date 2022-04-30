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

describe("reset-password tests", () => {

  test("user not found",async() =>{
    const response = await request('localhost:5000').post('/api/reset-password')
    .send({
      new_password: "password123",
      confirm_password:"testsetset"
    })
    expect(response.statusCode).toBe(422);  
    expect(response.body.error).toBe('password: the password you entered does not match');
  })
})

describe("unbookmark tests", () => {

  test("valid user and instructions",async() =>{
    const response = await request('localhost:5000').post('/api/unbookmark')
    .send({
      userID: "626b2b5ec6bb58c81e1d0ada",
      instructionsID: "626b34f2f7ebffcc2619a17f"
    })
    expect(response.statusCode).toBe(200);  
    expect(response.body.error).toBe('Instructions unbookmarked!');
    expect(response.body.id).toBe(1);
  })

  test("invalid user",async() =>{
    const response = await request('localhost:5000').post('/api/unbookmark')
    .send({
      userID: "624f9957fc7b933ae3d87e7i",
      instructionsID: "62612ad1b972215dd6b26493"
    })
    expect(response.statusCode).toBe(200);  
    expect(response.body.error).toBe('Invalid user');
    expect(response.body.id).toBe(-1);
  })

  test("invalid instructions",async() =>{
    const response = await request('localhost:5000').post('/api/unbookmark')
    .send({
      userID: "624f9957fc7b933ae3d87e9d",
      instructionsID: "62612ad1b972215dd6b26493"
    })
    expect(response.statusCode).toBe(200);  
    expect(response.body.error).toBe('Invalid instructions');
    expect(response.body.id).toBe(-1);
  })
})

describe("bookmark tests", () => {

  test("valid user and instructions",async() =>{
    const response = await request('localhost:5000').post('/api/bookmark')
    .send({
      userID: "626b2b5ec6bb58c81e1d0ada",
      instructionsID: "626b34f2f7ebffcc2619a17f"
    })
    expect(response.statusCode).toBe(200);  
    expect(response.body.error).toBe('Instructions saved!');
    expect(response.body.id).toBe(1);
  })

  test("invalid user",async() =>{
    const response = await request('localhost:5000').post('/api/bookmark')
    .send({
      userID: "624f9957fc7b933ae3d87e7i",
      instructionsID: "62612ad1b972215dd6b26493"
    })
    expect(response.statusCode).toBe(200);  
    expect(response.body.error).toBe('Invalid user');
    expect(response.body.id).toBe(-1);
  })

  test("invalid instructions",async() =>{
    const response = await request('localhost:5000').post('/api/bookmark')
    .send({
      userID: "624f9957fc7b933ae3d87e9d",
      instructionsID: "62612ad1b972215dd6b26493"
    })
    expect(response.statusCode).toBe(200);  
    expect(response.body.error).toBe('Invalid instructions');
    expect(response.body.id).toBe(-1);
  })
})

describe("delete recipie tests", () => {

  test("valid user and instructions",async() =>{
    const response = await request('localhost:5000').post('/api/search')
    .send({
      search: "water"
    })
    expect(response.statusCode).toBe(200);  
    //expect(response.body.error).toBe('Invalid user');
    //expect(response.body.id).toBe(-1);
  })
})

describe("search tests", () => {

  test("valid user and instructions",async() =>{
    const response = await request('localhost:5000').post('/api/search')
    .send({
      search: "water"
    })
    expect(response.statusCode).toBe(200);  
    //expect(response.body.error).toBe('Invalid user');
    //expect(response.body.id).toBe(-1);
  })
})