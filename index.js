const startupDebug = require('debug')('app:startup')
const dbDebug = require('debug')('app:db')
const config = require('config')
const Joi = require('joi')
const morgan = require('morgan')
const express = require('express');
const app = express();
const auth = require('./auth')
const log = require('./logger')
//test config
//console.log(process.env)
//console.log(`Application name:${config.get('appName')} belonging to ${config.get('companyName')} is started!`)
console.log(`We are using dbms:${config.get('dbConfig.dbms')} running on port:${config.get('dbConfig.port')}`)
console.log(`Db credentials username:${config.get('dbConfig.username')}.....password:${config.get('dbConfig.password')}`)
startupDebug(`Application ${config.get('appName')} is started!`)
//dbDebug(`We are using dbms:${config.get('dbConfig.dbms')} running on port:${config.get('dbConfig.port')}`)
//dbDebug(`Db credentials username:${config.get('dbConfig.username')}.....password:${config.get('dbConfig.password')}`)
 
let courses = [{
        id: 1,
        name: 'course 1'
    },
    {
        id: 2,
        name: 'course 2'
    },
    {
        id: 3,
        name: 'course 3'
    },
    {
        id: 4,
        name: 'course 4'
    },
    {
        id: 5,
        name: 'course 5'
    },
]
//built in middlewaes
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
//third party middlewares
//console.log(process.env)
console.log('app:environment....'+app.get('env'))
console.log('NODE:environment....'+process.env.NODE_ENV)
if(app.get('env') =='development'){
//if(process.env.NODE_ENV =='development'){
    app.use(morgan('tiny'))
    //custom middlewares
    app.use(log);    
}
app.use(auth);
//get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
//get one course by id
app.get('/api/courses/:id', (req, res, next) => {
    //look up the course in the courses list using its id
    let course = courses.find(myCourse => myCourse.id === parseInt(req.params.id))
    //if course is not found return 404
    if (!course) {
        let err = new Error('Course not found');
        err.httpStatusCode = 404;
        next(err);
    }
    //otherwise return the course
    return res.send(course)
});
​
​
//create new and validate with joi
app.post('/api/courses',(req,res,next) =>{
    const schema = {
        name: Joi.string().min(3).max(30).required()
    }
    const result = Joi.validate(req.body,schema);
    //console.log(result)
    if(result.error){
       let  myError = new Error(result.error.details[0].message)
       myError.httpStatusCode = 400;
       next(myError)
    }
    let course  = {
        id: courses.length +1,
        name: req.body.name
    }
    courses.push(course)
    return res.status(201).send(course)
})
//err handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    if (!res.headersSent) {
        let errorMessage = err.message
        res.status(err.httpStatusCode || 500).send(errorMessage || 'UnknownError');
    }
});
const port = process.env.PORT || 5000
app.listen(port, function () {
    console.log(`Server running on port ${port}`)
});



