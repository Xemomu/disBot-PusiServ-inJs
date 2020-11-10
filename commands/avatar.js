const Discord = require('discord.js')

module.exports = {
    minArgs: 0,
    maxArgs: 1,
    callback: (message) => {
            let member = message.mentions.users.first() || message.author

            let avatar = member.displayAvatarURL({size: 1024})

            const embed = new Discord.MessageEmbed()
                .setTitle(`Avatar ${member.username}`)
                .setImage(avatar)
                .setColor("RANDOM")

            message.channel.send(embed);
        }
};
// if (!message.mentions.users.size) {
//     const embed = new Discord.MessageEmbed()
//         .setAuthor("Twój avatar")
//         .setImage( message.author.displayAvatarURL({ dynamic: true }))
//     message.channel.send({embed});
// }
// const avatarList = message.mentions.users.map(user => {
//     const embed = new Discord.MessageEmbed()
//         .setAuthor("Avatar ${user.username}")
//         .setImage( message.user.displayAvatarURL({ dynamic: true }))
//     message.channel.send({embed});
// });
// message.channel.send(avatarList);
//return `Avatar ${user.username}: <${user.displayAvatarURL({ dynamic: true })}>`;
//return message.channel.send(`Twój avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);