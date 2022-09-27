const express = require('express')
require('dotenv').config()
const cors = require('cors')

const app = express()
const path = require('path')

const port = process.env.PORT || 5000


app.use(express.json())
app.use(cors())

const { addposes, getposes, togglefav, getfavs } = require('./controller')

app.post('/poses', addposes)

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/poses', getposes)

app.put('/poses/:id', togglefav)

app.get('/favorites', getfavs)


// html end-points
app.get('/css', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/styles.css'))
})
app.get('/headericon', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/images/yogaIcon.jpeg'))
})
app.get('/heart', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/images/heart.png'))
})
app.get('/love', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/images/love.png'))
})
app.get('/lgc', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/fonts/Louis\ George\ Cafe.ttf'))
})
app.get('/lgclight', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/fonts//Louis\ George\ Cafe\ Light\ Italic.ttf'))
})
app.get('/axiosnodes', (req, res) => {
    res.sendFile(path.join(__dirname, '../node_modules/axios/dist/axios.min.js'))
})
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/main.js'))
})


app.listen(port, () => console.log('Listening on port ' + port))