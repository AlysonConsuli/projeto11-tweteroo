import express from "express"
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const users = []
const tweets = []

app.post('/sign-up', (req, res) => {
    const user = req.body
    users.push(user)
    res.send('OK')
})

app.post('/tweets', (req, res) => {
    const user = users[users.length - 1]
    const {tweet} = req.body
    tweets.push({...user, tweet})
    res.send('OK')
})

app.get('/tweets', (req, res) => {
    (tweets.length > 10 && tweets.shift())
    const recentTweets = tweets.slice(0).reverse()
    res.send(recentTweets)
})

app.listen(5000, () => console.log("Server is running on: http://localhost:5000"))