"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(200).json({ todo: newTodo });
});
router.post('/delete/:id', (req, res, next) => {
    const todoId = req.params.id;
    if (todoId) {
        const updatedTodo = todos.filter((todo) => todo.id != todoId);
        res.status(200).json({ todos: updatedTodo });
    }
    else {
        res.status(404).json('Todo Item Not Found');
    }
});
router.post('/edit/:id', (req, res, next) => {
    const todoId = req.params.id;
    console.log(todoId);
    if (todoId) {
        const index = todos.findIndex((todo) => todo.id === todoId);
        console.log(index);
        let updatedTodo = [...todos];
        if (index) {
            let x = updatedTodo[index];
            todos[index] = Object.assign(Object.assign({}, x), { text: req.body.text });
            console.log(todos);
            res.status(200).json({ todo: todos });
        }
    }
    else {
        res.status(404).json('Todo Item Not Found');
    }
});
exports.default = router;
