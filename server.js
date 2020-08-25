const express = require('express')

// use process.env variables to keep private variables,
// be sure to ignore the .env file in github
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : '',
    database : 'todo-express-server'
  }
});

// Controllers - aka, the db queries
const main = require('./controllers/main')

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/api/v1/test', (req, res) => res.send('hello world'))
app.get('/api/v1/todos', (req, res) => main.getTodos(req, res, db))
app.post('/api/v1/todos', (req, res) => main.postTodos(req, res, db))
app.put('/api/v1/todos/:id', (req, res) => main.putTodos(req, res, db))
app.delete('/api/v1/todos/:id', (req, res) => main.deleteTodos(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})