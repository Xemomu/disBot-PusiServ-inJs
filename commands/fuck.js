const Discord = require('discord.js')

module.exports = {
    name: 'fuck',
    description: 'FUCK',
    cooldown: 3,
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(`YOU ${message.author.username}` )
            .setColor('RANDOM')

        message.channel.send(embed );
    },
};