const express = require("express");
const router = express.Router();

router.get('/set-cookies', (req, res, next) => {
    //res.setHeader('Set-Cookie', 'newUser=true');
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, {maxAge:1000 * 60 * 60 * 24, httpOnly: true});
    res.send('you got the cookies!!!');
});

router.get('/read-cookies', (req, res, next) => {
    const cookies = req.cookies;

    res.json(cookies);
});

module.exports = router;