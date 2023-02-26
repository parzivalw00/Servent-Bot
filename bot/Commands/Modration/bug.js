const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bug")
        .setDescription("report bugs to the server developers and configures.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((opt) =>
            opt
                .setName("description")
                .setDescription("what's the bug about?")
                .setRequired(true)
        ),
    async execute(interaction) {
        const string = interaction.options.getString("description");

        const embed = new EmbedBuilder()
            .setTitle(`🌀 • **Reported A bug!**`)
            .setDescription(`**User**: <@${interaction.user.id}> \n**Message**: ${string}`)
            .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
            .setColor('Gold')
            .setTimestamp()

        if (interaction.channel.id !== '1079196531757940766') return interaction.reply({
            content: 'This command can only be used in channel **bug**', ephemeral: true
        })
        let msg = await interaction.guild.channels.cache.get('1079196575324192859').send({
            embeds: [embed],
            components: [
                new ActionRowBuilder()
                    .setComponents(
                        new ButtonBuilder()
                            .setCustomId('debug')
                            .setLabel('Debuuged')
                            .setStyle(ButtonStyle.Success),
                    )
            ]
        })
        const Embed = new EmbedBuilder()
            .setDescription(`<@${interaction.user.id}> Succesfully your bug report Climed.`)
            .setColor('Random')
        await interaction.reply({ embeds: [Embed] })
    }
}