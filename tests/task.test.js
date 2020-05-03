const request = require("supertest")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const app = require('../src/app')
const Task = require('../src/models/task')
const {user1,
    user1Id,
    user2,
    user2Id,
    task1,
    task2,
    task3,
    setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Should return all tasks for user1', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send()
        .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Should not delete task for other user', async () => {

    const response = await request(app)
        .delete(`/tasks/${task1._id}`)
        .set('Authorization', `Bearer ${user2.tokens[0].token}`)
        .send()
        .expect(404)
    
        invalidTaskId = await Task.findById(task1._id)

        expect(invalidTaskId).not.toBeNull
    
})