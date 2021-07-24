const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const app = express()
const articleRouter = require('./routes/articles')
const port = process.env.PORT || 5000

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use('/articles',articleRouter)

const db = 'mongodb+srv://saumya:ss%40123456@cluster0.4iave.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology:true })
  .then(res => console.log("Connected to DB"))
  .catch(err => console.log(err))

app.set('view engine', 'ejs');

app.get('/' , async (req , res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
   res.render('index', {
       articles: articles
   });
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