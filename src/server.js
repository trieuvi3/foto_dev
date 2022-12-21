const express = require('express');
const route = require("./routes/index");
const db = require('./configs/db');
const configViewEngine = require('./configs/viewEngine');
const cookieParser = require('cookie-parser')

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

//db connect
db.connect();

//cookies
app.use(cookieParser())

// routes
configViewEngine(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
