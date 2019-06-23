var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function(req, res, next) {
  res.send({
    a:1,
    b:'a',
    c:'hahah'
  });
});

module.exports = router;
