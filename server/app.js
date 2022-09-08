require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
var bcrypt = require('bcryptjs')
const cors = require('cors')
const db = require('./db')
const createAllTables = require('./db/util')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
// const createAllTables = require('./util')
// const User = require('./db').User
const app = express()

const PORT = process.env.SERVER_PORT || 8000

const corsOptions = { origin: 'http://localhost:3000', credentials: true }

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.post('/login', async (req, res) => {
  console.log('req.body', req.body)
  try {
    const { username, password } = req.body

    // const encryptedPassword = await bcrypt.hash(password, 10)

    const oldUser = await db.query(
      'SELECT * FROM dashboard_users WHERE username = $1',
      [username]
    )
    if (oldUser?.rows?.length) {
      if (oldUser.rows[0].password !== password) {
        return res.status(409).send('wrong username or password')
      } else {
        // Create token
        const token = jwt.sign({ username, password }, process.env.TOKEN_KEY, {
          expiresIn: '2h',
        })

        res.cookie('token', token)

        return res.status(201).send({ username })
      }
    }

    return res.status(409).send('username does not exit, please sign up')
  } catch (err) {
    console.log(err)
  }
  res.end()
})

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body
    // const encryptedPassword = await bcrypt.hash(password, 10)

    const oldUser = await db.query(
      'SELECT * FROM dashboard_users WHERE username = $1',
      [username]
    )

    if (oldUser?.rows?.length) {
      console.log('oldUser.rows', oldUser.rows)
      return res.status(409).send('User Already Exist. Please Login')
    }

    // Create token
    const token = jwt.sign({ username, password }, process.env.TOKEN_KEY, {
      expiresIn: '2h',
    })

    // Create user in our database
    await db.query(
      'INSERT INTO dashboard_users (username, password, token) VALUES ($1, $2, $3)',
      [username, password, token]
    )

    // return new user
    res.cookie('token', token)

    return res.status(201).send({ username })
  } catch (error) {}
})

app.post('/logout', (req, res) => {
  res.clearCookie('token').end()
})

app.get('/filter', async (req, res) => {
  const token = req.cookies.token
  if (!token) return res.status(401).send('please log in')

  const { school, subject } = req.query

  const data = await db.query(
    'SELECT * FROM dashboard_score WHERE school = $1 AND subject = $2',
    [school, subject]
  )
  res.json(data.rows)
})

createAllTables()

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`)
})
