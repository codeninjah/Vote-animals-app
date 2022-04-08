const Animals = require('../models')

async function setup(){
    await Animals.sync({force: true})
}

setup()