const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/e-comm')

const db = mongoose.connection

db.on('connected',()=>{
   console.log('connected to mongodb server')
})

db.on('disconnected',()=>{
    console.log('disconnected to mongodb server')
})

db.on('error',(err)=>{
    console.log('error',err)
})

module.exports = db