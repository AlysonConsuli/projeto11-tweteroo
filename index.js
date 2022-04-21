import express from "express";
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.send('Teste')
})

app.listen(5000, () => console.log("Server is running on: http://localhost:5000"))