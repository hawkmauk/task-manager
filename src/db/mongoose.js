const mongoose = require('mongoose')

console.log(process.env.MONGODB_CONNECTION)
mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})