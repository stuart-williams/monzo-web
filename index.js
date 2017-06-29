const express = require('express')
const app = express()
const request = require('request')
const session = require('express-session')

const { auth } = require('./config.json')
const port = 5000

require('dotenv').config()

app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 60000
  }
}))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  if (req.session.userId) {
    return res.render('index', {
      userId: res.session.userId,
      accessToken: res.session.accessToken
    })
  }

  res.render('login', {
    clientId: auth.clientId,
    redirectUri: auth.redirectUri,
    responseType: 'code',
    state: '1234'
  })
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

    const { user_id: userId, access_token: accessToken } = JSON.parse(body)

    req.session.userId = userId
    req.session.accessToken = accessToken
    req.session.save(() => res.redirect('/'))
  })
})

app.listen(port, () => {
  console.log(`Monzo Web listening on port ${port}`)
})
