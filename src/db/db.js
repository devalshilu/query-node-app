const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://deval:Deval111@cluster0-90tef.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
