import express from 'express'
import cors from 'cors'
import { DateTime } from 'luxon'

const app = express()
app.use(cors())

app.get('/posts', (_, res) => {
  const dummyData = [
    {
      id: '1',
      title: 'Test Post01',
      createdAt: DateTime.now().toISO(),
    },
    {
      id: '2',
      title: 'Test Post02',
      createdAt: DateTime.now().minus({ days: 5 }).toISO(),
    },
    {
      id: '3',
      title: 'Test Post03',
      createdAt: DateTime.now().minus({ weeks: 3 }).toISO(),
    },
  ]
  res.json(dummyData)
})

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
