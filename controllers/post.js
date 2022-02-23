const { isUser } = require('../middleware/guards.js');
const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Post' })
})

module.exports = router