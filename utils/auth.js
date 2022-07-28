import jwt from 'jsonwebtoken'
import { User } from '../resources/user/user.model'
import config from '../config'

export const newToken = user => {
    return jwt.sign({ id: user.id }, config.secrets.jwt, {
      expiresIn: config.secrets.jwtExp
    })
  }
  
  export const verifyToken = token =>
    new Promise((resolve, reject) => {
      jwt.verify(token, config.secrets.jwt, (err, payload) => {
        if (err) return reject(err)
        resolve(payload)
      })
    })
  
  export const signup = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) res.status(400).send({ message: 'requires email and password' })

    try {
        const newUser = await User.create(req.body).exec()
        const token = newToken(newUser)
        return res.status(201).send({ token })
    } catch (e) {
        console.error(e)
        return res.status(400).end()
    }
  }
  
  export const signin = async (req, res) => {
    if (!req.body.email || !req.body.password) res.status(400).send({ message: 'requires email and password' })

    const user = await User.findOne({email: req.body.email}).exec()
    
    if (!user) res.status(401).end()

    try {
        const passwordMatch = await user.checkPassword(req.body.password)
        if (!passwordMatch) res.status(401).send({ message: 'passwords must match'})
        const token = newToken(user)
        res.status(201).send({ data: token })
    } catch (e) {
        console.error('error', e)
        res.status(401).send({ message: 'passwords must match' })
    }
  }
  

export const protect = async (req, res, next) => {
    if (!req.headers.authorization) res.status(401).end()

    let token = req.headers.authorization.split('Bearer ')[1]

    if (!token) res.status(401).end()

    try {
        const payload = await verifyToken(token)
        const user = await User.findById({_id: payload.id})
        // mongoose model method, returns fields except for password
            .select('-password')
            // converts to json
            .lean()
            .exec()
        req.user = user
        next()
    } catch (e) {
        console.error(e)
        res.status(401).end()
    }
  }