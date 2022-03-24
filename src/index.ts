import express from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors()).use(bodyParser.json()).use(helmet()).use(morgan('dev'))

app.get('/', function (req: express.Request, res: express.Response) {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
