const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const Student = require('./studentModel')

const app = express()

app.use(cors())
app.use(express.json())

// connect to mongodb
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/studentdb')
.then(() => {
    console.log('connected to mongodb')
})
.catch((err) => {
    console.log('error connecting to mongodb')
    console.log(err)
})

// add new student
app.post('/api/students', async (req, res) => {
    try {
        const student = new Student(req.body)
        const result = await student.save()
        res.json(result)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// get all students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find()
        res.json(students)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// get one student
app.get('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        if (!student) return res.status(404).json({ message: 'Student not found' })
        res.json(student)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// update student
app.put('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!student) return res.status(404).json({ message: 'Student not found' })
        res.json(student)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// delete student
app.delete('/api/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id)
        res.json({ message: 'student deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
