const mongoose = require('mongoose')
const SubjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
})

const Subject = mongoose.model('Subject', SubjectSchema)

module.exports = Subject