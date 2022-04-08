const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const { Sequelize } = require('sequelize')
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
app.get("/", (req, res) => {
    //res.send("Hej!")
    const sql = "SELECT * FROM animals ORDER BY RANDOM() LIMIT 1"
    const animals = db.get(sql, (err, row) => {
        console.log(row)
        res.render("index", {row})
    })
    
    console.log(animals)
})



app.get("/multiple", (req, res) => {
    const sql = "SELECT * FROM animals"
    let animalArray = [], records = []
    function getRows(){
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if(err){
                   reject(err)
                }
                rows.forEach((row) => {
                    animalArray.push(row)
                })

                resolve(animalArray)
            })
        })
    }

    async function asyncGetRows(){
        records = await getRows()
        console.log("Records length is " + records.length)

        res.render('multiple', {records})
        //return records
    }

    asyncGetRows()
})

//Jobbar med följande

app.post("/", (req, res) => {

    /*
    const sql = `UPDATE animals                `
    const animals = db.get(sql, (err, row) => {
        console.log(row)
        res.render("index", {row})
    })
    
    console.log(animals)
    */
})

//Slut på labbet


app.listen(8000, () => {
    console.log("App is up and running")
})