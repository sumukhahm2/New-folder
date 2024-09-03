import {Router} from 'express'

import {Todo} from '../models/todo'

const todos: Todo[]=[]

const router=Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos})
})

router.post('/todo',(req,res,next)=>{
    const newTodo: Todo={
        id:new Date().toISOString(),
        text:req.body.text
    }
    todos.push(newTodo)
    res.status(200).json({todo:newTodo})
})

router.post('/delete/:id',(req,res,next)=>{
   const todoId= req.params.id
    
  if(todoId)
  {
  const updatedTodo= todos.filter((todo)=>todo.id!=todoId)

res.status(200).json({todos:updatedTodo})
  }
  else{
    res.status(404).json('Todo Item Not Found')
  }


   
})
router.post('/edit/:id',(req,res,next)=>{
  const todoId= req.params.id
   console.log(todoId)
 if(todoId)
 {
 const index= todos.findIndex((todo)=>todo.id === todoId)
  console.log(index)
 let updatedTodo=[...todos]
 if(index)
 {
   let x=updatedTodo[index]
   todos[index]={...x,text:req.body.text}
   console.log(todos)
   res.status(200).json({todo:todos})
 }

 }
 else{
   res.status(404).json('Todo Item Not Found')
 }


  
})
export default router