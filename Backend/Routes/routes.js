const express = require('express');
const multer = require('multer');
const UploadController = require('../Controller/UploadController');
const LoginController = require('../Controller/LoginController');
const Authorization = require('../Middleware/Authorization');
const ResultController = require('../Controller/ResultController');


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
});
router.post('/adduser',LoginController.postuser);
router.post('/jwt',LoginController.login);
router.get("/dashboard", Authorization, (req, res) => {
  res.send(`Welcome, ${req.user.username}!`);
});

router.post('/upload', Authorization, upload.single('pdf'), UploadController.uploadFile);
router.get('/upload',  Authorization,UploadController.getFiles);
router.post('/generate-content', UploadController.generateQuestions);


router.get('/user-results', Authorization, ResultController.getUserResults);
router.post('/result', Authorization, ResultController.storeQuizResult);
module.exports = router;