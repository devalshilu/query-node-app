const express = require('express');
var cors = require('cors');
const port = process.env.PORT || 3000;
const userRouter = require('./routers/user');
require('./db/db');

const app = express()
app.use(cors())
app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
