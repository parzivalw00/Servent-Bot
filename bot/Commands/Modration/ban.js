const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('ban a user from the guild.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('user to be ban.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('reason for the ban.')
        ),

    async execute(interaction) {
        const {
            channel,
            options
        } = interaction;
        const user = options.getUser('target')
        const reason = options.getString('reason') || 'No reason provided.';
        const member = await interaction.guild.members.fetch(user.id)

        const errEmbed = new EmbedBuilder()
            .setDescription(`You can't take action on **${user.username} since they a higher role.`)
            .setColor(0x72c3b)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({
                embeds: [errEmbed],
                ephemeral: true
            })
        await member.ban({
            reason
        })

        const embed = new EmbedBuilder()
            .setDescription(`Succesfully banned ${user} with reason ${reason}`)
            .setColor(0x5fb041)
            .setTimestamp()

        await interaction.reply({
            embeds: [embed]
        })

    }
}