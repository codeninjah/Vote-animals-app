const { Sequelize, Model, DataTypes } = require('sequelize')
const Animals = require('../models')


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/animals-app.sqlite'
})

Animals.sync()
.then(() => {
    return Animals.bulkCreate([
        {
            name: 'Male Lion',
            picLink: 'https://i.pinimg.com/originals/31/28/d4/3128d4f82cf1519c0978f67da77c553e.jpg',
            likes: 0,
        },
        {
            name: 'Wild Cat',
            picLink: 'https://i0.wp.com/wilderness-society.org/wp-content/uploads/2017/12/Lynx-fotolia_71111270.jpg',
            likes: 0,
        },
        {
        name:'Pitbullterrier',
        picLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/American_Pit_Bull_Terrier_-_Seated.jpg/1024px-American_Pit_Bull_Terrier_-_Seated.jpg',
        likes: 0,
    }   
    ])
    .catch((err) => {
        console.error(err)
    })
})