import express from 'express'
import cors from 'cors'
import { DateTime } from 'luxon'
import bodyParser from 'body-parser'
import { Post } from '@/types/posts'
import { User } from '@/types/user'

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

const allUsers: User[] = []

app.get('/posts', (_, res) => {
  res.json(allPosts)
})

app.post<{}, {}, Post>('/posts', (req, res) => {
  const newPost = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allPosts.push(newPost)
  res.json()
})

app.post<{}, {}, User>('/users', (req, res) => {
  const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allUsers.push(user)
  const { password, ...rest } = user
  res.json(rest)
})

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
