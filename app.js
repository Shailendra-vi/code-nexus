const express = require('express')
const cors = require('cors');

const codeRoutes = require('./routes/codeRoutes')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello, Coders!')
})

app.use('/execute', codeRoutes)
app.use(express.static(`public`))



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
