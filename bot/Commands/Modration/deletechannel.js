const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('delete-channel')
    .setDescription('Delete a discord channel.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addChannelOption(option =>
        option
        .setName('channel')
        .setDescription('Select a channel you wanna delete.')
        .setRequired(true)
    ),
    async execute(interaction) {
        const { options } = interaction;

        const channel = options.getChannel('channel')
        const embed = new EmbedBuilder()
        .setDescription(`The **__${channel.name}__** was succesfully deleted.`)
        .setColor('DarkGreen')

        channel.delete()

        await interaction.reply({ embeds: [embed]})
    }
}