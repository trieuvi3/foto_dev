const express = require("express");
const UserController = require("../app/controller/UserController");
const router = express.Router();

router.get('/signup', UserController.signup);
router.post('/signup', UserController.signup_post);
router.get('/login', UserController.login);
router.post('/login', UserController.login_post);
router.get('/logout', UserController.logout);

router.get('/edit-user/:id', UserController.edit_user);
router.put('/edit-user/:id', UserController.update_user);

router.put('/delete-user/:id', UserController.delete_user);

router.get('/manages/details', UserController.details);

module.exports = router;