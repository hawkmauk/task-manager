const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const user1Id = new mongoose.Types.ObjectId()
const user1 = {
    _id: user1Id,
    name: 'Alice',
    email: 'alice@example.com',
    password: '56what!',
    tokens: [{
        token: jwt.sign({ _id: user1Id}, process.env.JWT_SECRET)
    }]
}

const user2Id = new mongoose.Types.ObjectId()
const user2 = {
    _id: user2Id,
    name: 'Bob',
    email: 'bob@example.com',
    password: '999dd!@',
    tokens: [{
        token: jwt.sign({ _id: user2Id}, process.env.JWT_SECRET)
    }] 
}

const task1 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First Task',
    completed: false,
    owner: user1Id
}

const task2 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second Task',
    completed: true,
    owner: user1Id
}

const task3 = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third Task',
    completed: false,
    owner: user2Id
}

const setupDatabase = async () => {
    
    await User.deleteMany()
    await new User(user1).save()
    await new User(user2).save()
    await Task.deleteMany()
    await new Task(task1).save()
    await new Task(task2).save()
    await new Task(task3).save()
}

module.exports = {
    user1,
    user1Id,
    user2,
    user2Id,
    task1,
    task2,
    task3,
    setupDatabase
}