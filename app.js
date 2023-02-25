const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/test', (req, res) => {
  res.send('Hello! from NayanVR ;)');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
