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

const { EmbedBuilder } = require('discord.js')
const { inspect } = require('util');

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

client.on('messageCreate', async message => {
    const args = message.content.split(' ');
    const command = args.shift().toLowerCase();
    const embed = new EmbedBuilder()
    .setDescription('**Result :**```js\n' + `${eval}` + '```')
    .setColor('Gold')
    .setFooter({ text: 'Evaled', iconURL: `${message.author.displayAvatarURL()}` })
    
    if (command === '!eval') {
  
      if (message.author.id !== '311194511931998209') return;
      
      let evaled;
      try {
        evaled = await eval(args.join(' '));
        message.channel.send({ embeds: [embed] });
      }
      
      catch (error) {
          const errEmbed = new  EmbedBuilder()
      .setDescription('**Erroe :**```js\n' + `${error}` + '```')
      .setColor('Red')
        console.error(error);
        message.reply({ embeds:
           [errEmbed],
           ephemeral: true
          });
      }
    }
  });