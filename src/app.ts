import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { router } from './routes'
import { errorHandler } from './middlewares/ErrorHandler'

const app = express()
app.use(cors())
app.use(json())
app.use(urlencoded({ extended:true }))
app.use(router)
app.use(errorHandler)

export { app }