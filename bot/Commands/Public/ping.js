const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('View bot pin'),

    async execute(interaction) {
        return interaction.reply({ content: 'Pong!})
    }
}
