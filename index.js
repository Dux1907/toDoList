import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
const app = express()
app.use(bodyparser.text())
app.use(cors())
let todos = []
app.get('/todos', (req,res) => {
    res.send(todos)
})

app.post('/todos',(req,res) =>{
    todos.push(req.body)
    res.status(201).send(todos)
})

app.delete('/todos/:i',(req,res) =>{
    const index = todos.findIndex((todo,index) => index == req.params.i)
    if(index == -1)
    res.status(404).send()
    else{
        todos.splice(index,1)
        res.status(200).send(todos)
    }

    res.status(200).send(todos)
})
app.use(() => {
    console.log('Route  not found!')
})
app.listen(1907, () => {
    console.log('Server started!')
})