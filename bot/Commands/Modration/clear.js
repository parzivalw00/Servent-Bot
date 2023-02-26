const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clear a specific amount of message from a target or channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option
            .setName('amount')
            .setDescription('amount of message to clear.')
            .setRequired(true)
        )
        .addUserOption(option =>
            option
            .setName('target')
            .setDescription('select a target to clear their message.')
            .setRequired(false)
        ),
    async execute(interaction) {
        const {
            channel,
            options
        } = interaction;
        const amount = options.getInteger('amount')
        const target = options.getUser('target')

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        })
        const res = new EmbedBuilder()
            .setColor(0x5fb041)

        if (target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg)
                    i++;
                }
            })
            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`succesfully deleted ${messages.size} messages from ${target}`)
                interaction.reply({
                    embeds: [res]
                }) // you can use epheremal.
            })
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`succesfully deleted ${messages.size} messages from the channel.`)
                interaction.reply({
                    embeds: [res]
                })
            })
        }
    }
}