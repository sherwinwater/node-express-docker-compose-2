import express from 'express'
const app = express()
import ChatGPT from 'chatgpt-official'
import { config } from 'dotenv'
import bodyParser from 'body-parser'
 
config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let bot = new ChatGPT(process.env.OPENAI_API_KEY)

const port = 3200
console.log('id', process.env.APPID, process.env.NAME)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/',  function (req, res) {
  res.send("hello")
})

app.use(
  express.urlencoded({
    extended: true
  })
)

app.post('/ask', async function (req, res) {
  console.log('ask', req.body)
  var question = req.body.question
  let ans = await bot.ask(question)
  res.send(ans)
})
