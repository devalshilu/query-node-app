const mongoose = require('mongoose')
var Schema = mongoose.Schema;
const QuerySchema = mongoose.Schema({
    queryData: {
        type: Array,
        required: true,
        trim: true
    },
    user : {
        type: Schema.Types.ObjectId, ref: 'User'
    }
    
})

const Query = mongoose.model('Query', QuerySchema)

module.exports = Query