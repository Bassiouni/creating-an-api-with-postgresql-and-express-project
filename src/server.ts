import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/router'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

const app: express.Application = express()
const address = '0.0.0.0:3000'

app.use(cors()).use(bodyParser.json()).use(helmet()).use(morgan('dev'))

app.use('/', router)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
