const express = require('express')
const { get } = require('mongoose')
const bcrypt = require('bcrypt')
const Article = require('./../models/article')
const router = express.Router()


router.use(express.static('./../public'));

router.get('/' , async (req , res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('index', {
        articles: articles
    });
 })

router.get('/request', (req, res) => {
    res.render('request');
});

router.post('/request' , (req , res, next)=>{
    req.article = new Article()
    next()
}, saveArticleAndRedirect('request'));

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug:
        req.params.slug });
    console.log(article);
    if (article == null){ res.redirect('/'); }
    res.render('view', {
        article: article
    });
});

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        const { name, heading, description, password, blog } = req.body;
        let article = req.article
        article.name = name;
        article.title = heading;
        article.description = description;
        article.markdown = blog;
        const salt = await bcrypt.genSalt(10);
        article.password = await bcrypt.hash(password, salt);
        console.log(article);
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {
            res.render(`${path}`, { article: article })
        }
    }
}

module.exports = router