import express from 'express'
import morgan from 'morgan'
import itemRouter from './resources/item/item.router.js'
import userRouter from './resources/user/user.router'
import listRouter from './resources/list/list.router'
import { signin, signup, protect } from './utils/auth.js'

const app = express()

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(morgan('dev'))


app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/item', itemRouter)
app.use('/api/user', userRouter)
app.use('/api/list', listRouter)


export const start = () => {
    app.listen(3000, () => {
        console.log('server listening on port 3000')
    })
}