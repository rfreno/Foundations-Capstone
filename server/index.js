const express = require('express')
const cors = require('cors')

const app = express()
const path = require('path')

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


app.listen(9256, () => console.log('Listening on port 9256'))