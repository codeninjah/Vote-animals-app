const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const { Sequelize } = require('sequelize')
const Animals = require('./models/index')

const app = express()

const db = new sqlite3.Database('animal-app.db')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/animal-app.sqlite'
})

//Random animal rendered
app.get("/", async(req, res) => {
    let animal = await Animals.findOne({
        order: sequelize.random()
    })

    res.render('index', { animal })
    console.log(animal)
})

app.get('/multiple', async(req, res)=> {
    const animals = await Animals.findAll()
    res.render('multiple', { animals })
})

//Jobbar med följande

app.post("/", async(req, res) => {
    const { like } = req.body
    const animal = await Animals.findOne({where:{id:like}})
    animal.likes++
    animal.save()

    res.redirect('/')
})

//Slut på labbet


app.listen(8000, () => {
    console.log("App is up and running")
})