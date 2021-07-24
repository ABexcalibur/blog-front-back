const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')
const port = process.env.PORT || 5000

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use('/articles',articleRouter)

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

app.get('/signup', ( req, res ) => {
    res.render('_not_complete', {
        title: "Sign Up"
    })
})

app.get('/login', ( req, res ) => {
    res.render('_not_complete', {
        title: "Login"
    })
})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))