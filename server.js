import express from 'express'

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.get('/', (req, res) => [
    res.send({ message: 'Hello from Express'})
])

app.post('/', (req, res) => {
    console.log('request body: ', req.body)
    res.send({ message: 'post back'})
})

export const start = () => {
    app.listen(3000, () => {
        console.log('server listening on port 3000')
    })
}