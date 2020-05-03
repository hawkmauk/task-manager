require('../src/db/mongoose')
const Task = require('../src/models/task')

// 5e2efa2f1db53d21f85b49af - user
// 5e2efc8f7adf924d447c7ede -task
// Task.findByIdAndDelete('5e2f48c7f51b5c1ee0a2d8d6').then(() => {
//     return Task.find({
//         completed: false
//     })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {

    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments( {completed: false})
    return count

}

deleteTaskAndCount('5e2f4d02c40d414c64b5a5c8')
.then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})