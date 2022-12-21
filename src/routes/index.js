const userRouter = require('./user');
const cookieRouter = require('./cookie');
const {requireAuth, checkUser} = require('../app/middleware/authMiddleware');

function route(app) {
    app.use('*', checkUser);
    app.use('/', userRouter);
    app.use('/', cookieRouter);
    app.use('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
    app.use('/', (req, res) => res.render('home'));
}

module.exports = route;