import express, { Request, Response } from 'express'
import cors from 'cors'
import { DateTime } from 'luxon'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jsonwebtoken from 'jsonwebtoken'
import { Post } from '@/types/posts'
import { NewUser, User } from '@/types/user'

const app = express()
app.use(cors())
app.use(cookieParser())
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

const SECRET = 'my-secret'
const COOKIE = 'markdown-poster-jwt'

// Post ------------------------------------------------------

app.get('/posts', (_, res) => {
  res.json(allPosts)
})

app.post<{}, {}, Post>('/posts', (req, res) => {
  const newPost = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allPosts.push(newPost)
  res.json()
})

// Auth & User ------------------------------------------------------

function authenticate(id: string, _: Request, res: Response) {
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: 'markdown-poster',
    expiresIn: '30 days',
  })

  res.cookie(COOKIE, token)
}

app.post<{}, {}, User>('/users', (req, res) => {
  const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() }
  allUsers.push(user)
  authenticate(user.id, req, res)
  const { password, ...rest } = user
  res.json(rest)
})

app.get('/current-user', (req, res) => {
  try {
    const token = req.cookies[COOKIE]
    const result = jsonwebtoken.verify(token, SECRET)
    res.json(result)
  } catch (error) {
    res.status(404).end()
  }
})

app.post<{}, {}, NewUser>('/login', (req, res) => {
  const targetUser = allUsers.find(x => x.username === req.body.username)

  if (!targetUser || targetUser.password !== req.body.password) {
    res.status(401).end()
  } else {
    authenticate(targetUser.id, req, res)
    res.status(200).end()
  }
})

app.post('/logout', (_, res) => {
  res.cookie(COOKIE, '', { httpOnly: true })
  res.status(200).end()
})

// Listen ------------------------------------------------------

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
