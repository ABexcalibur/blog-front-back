const express = require('express')
const router = express.Router()

router.use(express.static('./../public'));

router.get('/request', (req, res) => {
    res.render('request');
});

router.post('/request' , (req , res)=>{
    const { name, heading, description, password, article } = req.body;
    
})

module.exports = router