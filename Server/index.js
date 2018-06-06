const express = require('express')
const app = express()
const db = require('monk')('mongodb://DesignGeek:password1@ds247830.mlab.com:47830/mountain-crafter-db')
const appointmentCollection = db.get('scheduleRequest')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(req.body)
    next()
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
    next()
})

app.get('/scheduleRequest', async (req, res) => {
    const appointment = await appointmentCollection.find({})
    res.send(appointment)
})

app.post('/scheduleRequest', async (req, res) => {
    try {
        const newAppointment = req.body
        console.log('request recived')
        const savedAppointment = await appointmentCollection.insert(newAppointment)
        console.log('saved Appointment')
        res.send(savedAppointment)
    } catch (err) {
        console.log('OOPS! Somthing Went Wrong', err)
    }
})

app.listen(3001, () => console.log('running on port 3001'))