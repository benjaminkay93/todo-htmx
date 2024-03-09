var express = require('express');
var router = express.Router();

const todos = [
    {
        todo: 'Decide to get this out of local memory',
        complete: false
    },
    {
        todo: 'Make proper database',
        complete: false
    },
    {
        todo: 'Move this to websockets as per original plan',
        complete: false
    },
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('todo', { title: 'Todo\'s' });
});

module.exports = router;
