const express = require('express')
require('dotenv').config()
const cors = require('cors')

const app = express()
const path = require('path')

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

// deconstruct functions from controller file for use in requests below
const { addposes, getposes, togglefav, getfavs, addroutine, getroutines, arcroutine, getarchives } = require('./controller')

app.post('/poses', addposes)

app.get('/poses', getposes)

app.put('/poses/:id', togglefav)

app.get('/favorites', getfavs)

app.post('/routines', addroutine)

app.get('/routines', getroutines)

app.put('/routines/:id', arcroutine)

app.get('/archives', getarchives)


// end-point references - html pages, images, fonts, etc
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})
app.get('/poseList', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/poses.html'))
})
app.get('/categories', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/categories.html'))
})
app.get('/favoriteList', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/favorites.html'))
})
app.get('/routineform', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/form.html'))
})
app.get('/routineList', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/routines.html'))
})
app.get('/css', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/styles.css'))
})
app.get('/background', (req, res) => {
    res.sendFile(path.join(__dirname,'../client/images/background.png'))
})
app.get('/headericon', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/images/yogaIcon.jpeg'))
})
app.get('/heart', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/images/heart.png'))
})
app.get('/love', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/images/purple.png'))
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
app.get('/archiveList', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/archives.html'))
})

app.listen(port, () => console.log('Listening on port ' + port))