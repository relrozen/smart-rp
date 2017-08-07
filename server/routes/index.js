//require express library
var express = require('express');
//require the express router
var router = express.Router();
//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');
/* GET home page. */

//our file upload function.
router.post('/', function (req, res, next) {
     var path = '';
     upload(req, res, function (err) {
        console.log(req.file);
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }  
       // No error occured.
        path = req.file.path;
        return res.send(req.file); 
  });     
})
module.exports = router;