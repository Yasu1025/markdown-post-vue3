import express from 'express'
import cors from 'cors'
import { DateTime } from 'luxon'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const allPosts = [
  {
    id: '1',
    title: 'Test Post01',
    createdAt: DateTime.now().toISO(),
    markdown: 'test 01 01',
    html: '',
  },
  {
    id: '2',
    title: 'Test Post02',
    createdAt: DateTime.now().minus({ days: 5 }).toISO(),
    markdown: 'test 02 02',
    html: '',
  },
  {
    id: '3',
    title: 'Test Post03',
    createdAt: DateTime.now().minus({ weeks: 3 }).toISO(),
    markdown: 'test 03 03',
    html: '',
  },
]

app.get('/posts', (_, res) => {
  res.json(allPosts)
})

app.post('/posts', (req, res) => {
  const newPost = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allPosts.push(newPost)
  res.json()
})

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
