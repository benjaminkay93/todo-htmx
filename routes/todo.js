var express = require('express');
const { handlebars } = require('hbs');
var router = express.Router();

const todoList = [
    {
        id: 0,
        todo: 'Decide to get this out of local memory',
        complete: false
    },
    {
        id: 1,
        todo: 'Make proper database',
        complete: false
    },
    {
        id: 2,
        todo: 'Move this to websockets as per original plan',
        complete: false
    },
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('todo', { title: 'Todo\'s', todoList });
});

router.post('/add', function(req, res, next) {
    console.log(req.body)
    if(req.body.new_todo) {
        todoList.push({id: todoList.length, todo: req.body.new_todo, complete: false})
    }
    res.render('partials/todo-list', { todoList, layout: false });
  });

module.exports = router;
