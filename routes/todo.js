var express = require('express');
const { handlebars } = require('hbs');
var router = express.Router();
const { v4 : uuid } = require('uuid');

const todoList = [
    {
        id: 'test-1',
        todo: 'Decide to get this out of local memory',
        complete: false
    },
    {
        id: 'test-2',
        todo: 'Make proper database',
        complete: false
    },
    {
        id: 'test-3',
        todo: 'Move this to websockets as per original plan',
        complete: false
    },
]

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('todo', { title: 'Todo\'s', todoList });
});

router.post('/add', function(req, res, next) {
    if(req.body.new_todo) {
        todoList.push({id: uuid(), todo: req.body.new_todo, complete: false})
    }
    res.render('partials/todo-list', { todoList, layout: false });
});

router.patch('/complete/:id', function(req, res, next) {
    const index = todoList.findIndex(({id}) => id == req.params.id)
    if (index === -1) return res.statusCode = 404

    const newItem = {
        ...todoList[index],
        complete: !todoList[index].complete,
    }

    todoList[index] = newItem
    res.render('partials/todo-item', { ...newItem, layout: false });
});

router.get('/edit/:id', function(req, res, next) {
    const index = todoList.findIndex(({id}) => id == req.params.id)
    if (index === -1) return res.statusCode = 404

    res.render('partials/todo-item-editable', { ...todoList[index], layout: false });
});

router.patch('/edit/:id', function(req, res, next) {
    const index = todoList.findIndex(({id}) => id == req.params.id)
    if (index === -1) return res.statusCode = 404

    const newItem = {
        ...todoList[index],
        todo: req.body.edit_todo
    }

    todoList[index] = newItem
    res.render('partials/todo-item', { ...newItem, layout: false });
});

router.delete('/delete/:id', function(req, res, next) {
    const index = todoList.findIndex(({id}) => id == req.params.id)
    if (index === -1) return res.statusCode(404)
    
    todoList.splice(index, 1)

    res.render('partials/todo-list', { todoList, layout: false });
});

module.exports = router;
