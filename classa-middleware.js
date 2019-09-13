const auth =require('./authenticate')
const log =require('./logger')
const express = require('express')
const app = express()
app.use(log)
app.use(auth)
//middle ware
app.use(express.json())
let courses = [
    {id:1, name:'course 1'},
    {id:2, name:'course 2'},
    {id:3, name:'course 3'},
    {id:4, name:'course 4'},
]
//get all courses
app.get('/api/courses',(req, res)=>{
    return res.send(courses)
})
const port =6666;
app.listen(port,()=> console.log(`Server running on port ${port}`))