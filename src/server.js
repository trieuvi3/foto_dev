const express = require('express');
const bodyParser = require('body-parser');
const route = require("./routes/index");
const db = require('./configs/db');
const configViewEngine = require('./configs/viewEngine');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(methodOverride('_method'));

//db connect
db.connect();

//cookies
app.use(cookieParser());

// routes
configViewEngine(app);
route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
