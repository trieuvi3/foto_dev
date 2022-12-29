const Photo = require("../models/Photo");
const multer = require('multer');

const upload = multer().single('image');


class PhotoController {
    details(req, res, next) {
       Photo.find({})
       .then(photos => {
           res.render("photos/details", {
            photos
           });
       })
       .catch(next);
    };

    create(req, res, next) {
        res.render("photos/create");
    };

    store(req, res, next) {
        let body = req.body;
        upload(req, res, function(err) {
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            // else if (err) {
            //     console.log(err);
            //     return res.send(err);
            // }
    
            // Display uploaded image for user validation
            body.image = req.file.filename;
            const photos = new Photo(body)
            photos.save()
            .then(() => res.redirect('/'))
            .catch(err => {
            });
       });
    }

    edit(req, res, next) {
        Photo.findById(req.params.id)
        .then(photo => {
            res.render("photos/edit", {
                photo
            });
        })
        .catch({next})
    }

    update(req, res, next) {
        let body = req.body;
        console.log(body);
        upload(req, res, function(err) {
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            // else if (err) {
            //     console.log(err);
            //     return res.send(err);
            // }
    
            // Display uploaded image for user validation
            body.image = req.file.filename;
            console.log(body)
            Photo.updateOne({ _id: req.params.id }, body)
            .then(() => res.redirect('/photos/details'))
            .catch(next);
       });
    }

    async delete(req, res, next) {
        let flagDeleted = 0;
        await Photo.updateOne({ _id: req.params.id }, {flagDeleted})
        .then(() => res.redirect('/photos/details'))
        .catch(next);
    }
}




module.exports = new PhotoController;