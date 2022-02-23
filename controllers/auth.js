const router = require('express').Router();
const { isUser, isGuest } = require('../middleware/guards.js');
const { register, login } = require('../services/userService.js');
const { mapErrors } = require('../util/mappers.js');

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' })
})

router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '') {
            throw new Error('password is required!')
        } else if (req.body.password != req.body.repass) {
            throw new Error('Password don`t match!');
        }


        const user = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/')
    } catch (err) { //TODO: send error messages
        console.error(err);
        const errors = mapErrors(err)
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        res.render('register', { title: 'register Page', data, errors })
    }

})


router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' });
})

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/');//TODO: check redirect requirement
    } catch (err) { //TODO: send error messages
        console.error(err);
        const errors = mapErrors(err)
        const data = {
            email: req.body.email,
            password: req.body.password
        }
        res.render('login', { title: 'register Page', data, errors })
    }
});

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/');
})

module.exports = router;