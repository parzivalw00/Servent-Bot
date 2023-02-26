const mongoose = require('mongoose')
const config = require('../../../config.json')
require('colors')
module.exports = {
    name: 'ready',
    once: true,

    async execute(interaction, client) {
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true
        })

        if (mongoose.connect)
        console.log('[MONGODB]'.green, 'Database Connected.')
        console.log(`[${client.user.username}]`.blue, `Online.`, '\n[SERVERS]'.yellow, `${client.guilds.cache.size} Joined.`)
    }
}