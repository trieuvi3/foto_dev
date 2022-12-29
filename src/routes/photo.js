const express = require("express");
const PhotoController = require("../app/controller/PhotoController");
const router = express.Router();
const multer = require('multer');
const path = require('path');
var appRoot = require('app-root-path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,appRoot + '/src/public/images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) { 
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

router.get('/details/', PhotoController.details);
router.get('/create/', PhotoController.create);
router.post('/store/', upload.single('image'), PhotoController.store);

router.get('/edit/:id', PhotoController.edit);
router.put('/update/:id', upload.single('image'), PhotoController.update);

router.put('/delete/:id', PhotoController.delete);

module.exports = router;