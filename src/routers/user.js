const express = require('express')
const User = require('../models/User')
const Subject = require('../models/Subject')
const Student = require('../models/Student')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/addusers', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/addsubject', async (req, res) => {
    // Create a new subject
    try {
        const subject = new Subject(req.body)
        await subject.save()
        res.status(201).send(subject)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/addstudent', async (req, res) => {
    // Create a new student
    try {
        const student = new Student(req.body)
        await student.save()
        res.status(201).send(subject)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get('/subject', auth, async (req, res) => {
    try {
        const data = await Subject.find({});
        res.send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/runQuery', auth, async (req, res) => {
    var input = req.body.map((ele) => {
        var one = {};
        if (ele[1] === "LESS_THAN") {
            one[ele[0]] = { $lt: ele[2] }
        } else if (ele[1] === "GREATER_THAN") {
            one[ele[0]] = { $gt: ele[2] }
        }
        return one;
    })
    try {
        const data = await Student.find({
            $and: input
        });
        res.send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/users/login', async (req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router