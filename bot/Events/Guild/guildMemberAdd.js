const { GuildMember, EmbedBuilder, InteractionCollector } = require('discord.js')
const Schema = require('../../../Models/Welcome')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        Schema.findOne({ Guild: member.guild.id }, async (err, data) => {
            if (!data) return;
            let channel = data.Channel;
            let Msg = data.Msg || " ";
            let Role = data.Role;

            const { user, guild } = member;
            const welcomeChannel = member.guild.channels.cache.get(data.Channel)

            const welcomeEmbed = new EmbedBuilder()
                .setTitle('**New Member**')
                .setThumbnail(member.user.displayAvatarURL())
                .setDescription(data.Msg + `<@${member.user.id}>`)
                .setImage('https://cdn.discordapp.com/attachments/1059480405490811071/1078580915862769695/servant_bot.png')
                .setColor(0x037821)
                .addFields(
                    {
                        name: 'Total Members', value: `Count ${guild.memberCount}`, inline: false
                    },
                    {
                        name: `User: ${member.user.username}`, value: `ID: ${member.user.id}`, inline: false
                    }
                )
            welcomeChannel.send({ embeds: [welcomeEmbed] })
            member.roles.add(data.Role)
        })
    }
}