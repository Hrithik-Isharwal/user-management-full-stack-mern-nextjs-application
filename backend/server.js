const express = require('express');
const app = express();

const port = 8080;

app.get('/', function(req, res){
    res.send("Home Page");
})

app.listen(port, ()=>{
    console.log(`App is listening at http://localhost:${port}`);
})