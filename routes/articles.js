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
    let article = new Article();
    res.render('request',{
        title: "New Article",
        article: article
    });
});

router.post('/request' , (req , res, next)=>{
    req.article = new Article()
    next()
}, saveArticleAndRedirect('request'));

router.get('/edit/:slug', async (req, res) => {
    const article = await Article.findOne({
        slug: req.params.slug
    });
    if (article == null){ res.redirect('/request'); }
    res.render('edit', {
        article: article,
        title: "Edit Blog"
    })
});

router.post('/edit/:slug', async (req, res, next) => {
    req.article = await Article.findOne({
        slug: req.params.slug
    });
    if (req.article == null){ res.redirect(`/edit/${req.params.slug}`); }
    next()
}, saveArticleAndRedirect(`edit`));

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug:
        req.params.slug });
    if (article == null){ res.redirect('/'); }
    res.render('view', {
        article: article,
        title: article.title
    });
});

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        const { name, heading, description, password, blog } = req.body;
        //if (checkPassword(req.password, password)){
            let article = req.article
            article.name = name;
            article.title = heading;
            article.description = description;
            article.markdown = blog;
            const salt = await bcrypt.genSalt(10);
            article.password = await bcrypt.hash(password, salt);
            try {
                article = await article.save()
                res.redirect(`/articles/${article.slug}`)
            } catch (e) {
                res.render(`${path}`, { 
                    article: article,
                    title: path
                })
            }
       // } else {
       //     let alert = require('alert');
       //     alert('Wrong Password');
       //     res.redirect(`/edit/${req.article.slug}`);
       // }
    }
}

module.exports = router