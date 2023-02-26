module.exports ={
    name: 'interactionCreate',

    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName)

            if (!command) {
                return interaction.reply({ content: "Outdate command! please check in later."})
            }
            command.execute(interaction, client)
        } else if (interaction.isButton()) {
            const { customId } = interaction;
            if (customId == 'debug') {
                const role = interaction.guild.roles.cache.get('1079206371767091351')
                return interaction.reply({
                    content: `Your Bug has been Fixed.`,
                    ephemeral: true,
                })
                
            }
        } else {
            return;
        }
    }
}