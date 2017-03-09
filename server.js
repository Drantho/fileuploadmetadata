var http = require('http');
var multer  = require('multer');
var express = require('express');

var router = express();
var server = http.createServer(router);

var upload = multer({ dest: 'uploads/' });

//create engine
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
router.engine('handlebars', handlebars.engine);
router.set('view engine', 'handlebars');

router.get('/', function (req, res) {
    res.render('index');
});

router.post('/get-file-size', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
  res.render('get-file-size', {file : req.file.originalname ,size : req.file.size});
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});
