const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Peric',
    email: 'pericdevelopment@gmail.com',
    password: '56what!!',
    active: true,
    tokens: [{
        token: jwt.sign({ id: userOneId }, process.env.JWT_SECRET)
    }]
};

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

// test('Should signup a new user', async () => {
//     await request(app).post('/user').send({
//         name: 'Dusko',
//         email: 'dule@teretane.net',
//         password: 'MyPass777!'
//     }).expect(201)
// });

test('Should login existing user', async () => {
    const response= await request(app).post('/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
    expect(response.body.user.name).toBe(userOne.name);
});

test('Should not login nonexisting user', async () => {
    await request(app).post('/login').send({
        email: userOne.email,
        password: 'thisisnot'
    }).expect(500);
});

test('Should get profile for user', async () => {        
    await request(app)
        .get('/user')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});