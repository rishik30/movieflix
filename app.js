const express = require('express')
const path = require('path')
var cors = require('cors')

const port = process.env.PORT || 8080
const app = express()

app.use(express.static(path.resolve(__dirname)))
app.use(cors())

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})
