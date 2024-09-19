const express = require('express')
const codeRoutes = require('./routes/codeRoutes')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello, Coders!')
})

app.use('/execute', codeRoutes)


const port = 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
