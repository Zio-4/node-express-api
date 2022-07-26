import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(morgan('dev'))

const log = (req, res, next) => {
    console.log('logging')
    next()
}
app.use(log())

let db = []


app.get('/', log, (req, res) => [
    res.send({ message: 'Hello from Express'})
])

app.get('/message', [log, log], (req, res) => {
    res.send({db})
})

app.delete('/message', (req, res) => {
    console.log('db before', db)
    db = db.filter(m => m.text !== req.body.text)
    console.log('db after', db)
    res.send({ message: 'Successfully deleted'})
})

app.post('/', (req, res) => {
    console.log('request body: ', req.body)
    db.push(req.body)
    res.send({ message: 'message created'})
})

export const start = () => {
    app.listen(3000, () => {
        console.log('server listening on port 3000')
    })
}