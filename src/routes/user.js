const express = require("express");
const UserController = require("../app/controller/UserController");
const router = express.Router();

router.get('/signup', UserController.signup);
router.post('/signup', UserController.signup_post);
router.get('/login', UserController.login);
router.post('/login', UserController.login_post);
router.get('/logout', UserController.logout);

module.exports = router;