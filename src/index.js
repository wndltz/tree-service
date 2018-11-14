import express from 'express'
import bodyParser from 'body-parser'
import insertDocument from './insert-document'
import getDocument from './get-document'

const app = express()

app.use(bodyParser.json())

const errorMiddleware = fn => async (req, res, next) => {
  try {
    await fn(req, res)
    next()
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

app.post('/tree/:id', errorMiddleware(async (req, res) => {
  const { id } = req.params
  const { aspects } = req.body
  await insertDocument(id, aspects)
  res.sendStatus(201)
}))

app.get('/tree/:id', errorMiddleware(async (req, res) => {
  const { id } = req.params
  const doc = await getDocument(id)
  res.send(doc)
}))

app.listen(8082, () => {
  console.log('server started')
})
