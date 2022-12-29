const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/foto_dev',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect seccess!!')
    } catch (err) {
        console.log('fail!!')
    }
}

module.exports = { connect };
