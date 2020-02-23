require('../src/db/mongoose')
const User = require('../src/models/user')

// 5e2efa2f1db53d21f85b49af
// User.findByIdAndUpdate('5e2efa2f1db53d21f85b49af',{
//     age: 1
// }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1})
// }).then((users) => {
//     console.log(users)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments( { age })
    return count
}

updateAgeAndCount('5e2efa2f1db53d21f85b49af',2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})