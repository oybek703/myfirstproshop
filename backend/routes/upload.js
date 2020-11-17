const path = require('path');
const {Router} = require('express');
const multer = require('multer');
const router = Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function checkFileType(file, cb) {
    const fileTypes = /jpg|png|jpeg/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = file.mimetype.startsWith('image/');
    if(extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only.', false);
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
})

module.exports = router;