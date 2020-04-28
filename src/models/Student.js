const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    "result": 
    {
        type :Array
    }
})
const Student = mongoose.model('Student', StudentSchema)
module.exports = Student