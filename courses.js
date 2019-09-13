const express = require('express');
const app  = express()
var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
//home page api
app.get('/',(req,res) =>{
   return res.send("Hello, welcome to our page")
});
app.get('/api/courses',(req,res) =>{
    var courses = [1,3,4,5]
    return res.send(courses)
});
app.post('http://localhost:4000/api/form', (req,res) =>{
    return res.send("form received!!!!")
});
app.post('/submit-student-data', function (req, res) { 
    var name = req.body.firstName + ' ' + req.body.lastName; 
    res.send(name + ' Submitted Successfully!'); 
});
//make port
const port = 4000;
app.listen(port, () =>console.log(`Server runing on port ${port}`));