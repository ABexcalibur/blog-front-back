const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/' , (req , res)=>{
   res.render('index');
})

app.get('/contact', ( req, res ) => {
    res.render('contact')
})

app.get('/about', ( req, res ) => {
    res.render('about')
})

app.get('/post', ( req, res ) => {
    res.render('post')
})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))