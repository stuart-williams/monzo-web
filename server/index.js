const express = require('express')
const app = express()
const request = require('request')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const graphqlHTTP = require('express-graphql')

const { auth } = require('../config.json')
const port = 5000

require('dotenv').config()

app.use(express.static('public'))
app.set('view engine', 'pug')

app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore()
}))

app.use('/graphql', graphqlHTTP({
  schema: require('./graphql/schema'),
  graphiql: true
}))

app.get('/', (req, res) => {
  if (!req.session.user) res.redirect('/login')
  res.render('index', { user: req.session.user })
})

app.get('/login', (req, res) => {
  res.render('login', {
    clientId: auth.clientId,
    redirectUri: auth.redirectUri,
    responseType: 'code',
    state: '1234'
  })
})

app.get('/logout', (req, res) => {
  req.session.user = null
  res.redirect('/login')
})

app.get('/auth-redirect', (req, res) => {
  const { code } = req.query

  request.post('https://api.monzo.com/oauth2/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'authorization_code',
      client_id: auth.clientId,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: auth.redirectUri,
      code
    }
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.send('Oops, someting went wrong...')
    }

    const { user_id: id, access_token: token } = JSON.parse(body)

    req.session.user = { id, token }
    res.redirect('/')
  })
})

app.listen(port, () => console.log(`Monzo Web listening on port ${port}`))
