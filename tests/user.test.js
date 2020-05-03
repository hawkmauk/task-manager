const request = require("supertest")
const app = require('../src/app')
const User = require('../src/models/user')
const {user1, user1Id,user2, user2Id, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should sign up a new user', async () => {
    
    const response = await request(app).post('/users').send({
        name: 'Michael',
        email: 'michael@runcrypto.com',
        password: 'MyPass777!'
    }).expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Michael',
            email: 'michael@runcrypto.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass777!')
})

test('Should log in existing user', async () => {
    const response = await request(app)
    .post('/users/login')
    .send({
        email: user1.email,
        password: user1.password
    })
    .expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        token: user.tokens[1].token
    })
})

test('Should not log in bad user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'invalid@example.com',
            password: user1.password
        })
        .expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthorised user', async () => {

    await request(app)
        .get('/users/me')
        .send()
        .expect(401)

})

test('Should delete account for user', async () => {

    const response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(user1._id)

    expect(user).toBeNull()
    })

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async() => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .attach('avatar','tests/fixtures/profile-pic.jpg')
        .send()
        .expect(200)

    const user = await User.findById(user1._id)

    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user field', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({ name: 'Updated'})
        .expect(200)

    const user = await User.findById(user1._id)
    expect(user.name).toBe('Updated')
})

test('Should not update invalid user field', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({ location: 'Northampton'})
        .expect(400)
})