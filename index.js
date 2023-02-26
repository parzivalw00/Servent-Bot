const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection
} = require('discord.js')
const express = require('express')
const http = require('http')
const { Server } = require('ws')
const path = require('path')

const port = 3001;
const app = express()
const server = http.createServer(app)
const wss = new Server({ server })

const { loadCommands } = require('./bot/Handlers/commandHandler')
const { loadEvents } = require('./bot/Handlers/eventHandler')

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)]
})

client.commands = new Collection()
client.config = require('./config.json')

client.login(client.config.token).then(() =>{
    loadCommands(client)
    loadEvents(client)
})

app.use(express.static(path.join(__dirname, "/website/build")))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/website/build", "index.html"))
})

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(`Recived message: ${message}`)
    })
})

server.listen(port, () => {
    console.log(`[LISTENING ON PORT]: ${port}`)
})