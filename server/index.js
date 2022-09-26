const express = require('express')
const cors = require('cors')

const app = express()
const path = require('path')

app.use(express.json())
app.use(cors())

const { getposes } = require('./controller')

// app.post('/poses', (req, res) => {
//     // add new object to list
// })

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/poses', getposes)

app.put('/poses/:id', (req, res) => {
    // toggle favorites / add to list / remove from list
})

app.get('/categories', (req, res) => {
    // return cat list to html
})


app.listen(5500, () => console.log('Listening on port 5500'))