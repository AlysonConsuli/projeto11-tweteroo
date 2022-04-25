import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const users = []
const tweets = []

app.post('/sign-up', (req, res) => {
    const user = req.body
    if (user.username === '' || user.avatar === '') {
        return res.status(422).send('Fill all fields')
    }
    users.push(user)
    res.status(201).send('Created')
})

app.post('/tweets', (req, res) => {
    const user = users[users.length - 1]
    if (!user) {
        return res.status(404).send('User not found');
    }
    let username = req.header('User')
    if (!username) {
        username = user.username
    }
    const { avatar } = user
    const { tweet } = req.body
    if (!username || !tweet) {
        return res.status(422).send('Fill all fields')
    }
    tweets.push({
        username,
        avatar,
        tweet
    })
    res.status(201).send('Created')
})

app.get('/tweets', (req, res) => {
    const { page } = req.query
    const recentTweets = tweets.slice(0).reverse()
    if (!page) {
        const lastTenTweets = recentTweets.filter((tweet, i) => i < 10)
        return res.send(lastTenTweets)
    }
    if (page < 1) {
        return res.status(422).send('Inform a valid page!')
    }
    const tweetsPage = recentTweets.filter((tweet, i) => i < page * 10 && i >= page * 10 - 10)
    res.send(tweetsPage)
})

app.get('/tweets/:username', (req, res) => {
    const { username } = req.params
    const recentTweets = tweets.slice(0).reverse()
    const userTweets = recentTweets.filter(tweet => tweet.username === username)
    res.send(userTweets)
})

app.listen(5000, () => console.log('Server is running on: http://localhost:5000'))