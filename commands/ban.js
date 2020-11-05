const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Banuje wybranego członka serwera",

    execute: function (message, args) {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Nie masz uprawnień do wykonania tej komendy!')
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Nie mam uprawnień do wykonania tej komendy.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send('Wybierz kogo chcesz zbanować');

        if (!member) return message.channel.send('Nie mogę znaleźć podanego użytkownika');
        if (!member.bannable) return message.channel.send('Nie mogę zbanować podanego użytkownika, ma lepszą rangę od Ciebie lub mnie');

        if (member.id === message.author.id) return message.channel.send('Nie możesz zbanować samego siebie!');

        let reason = args.slice(1).join(" ");

        if (!reason) reason = 'Nie podano';

        member.ban()
            .catch(err => {
                if (err) return message.channel.send('Wystąpił błąd')
            })

        const banembed = new Discord.MessageEmbed()
            .setTitle('BANNED')
            .setThumbnail(member.user.displayAvatarURL())
            .addField('Zbanowamy użytkownik', member)
            .addField('Zbanowany przez', message.author)
            .addField('Powód', reason)
            .setTimestamp()

        message.channel.send(banembed);


    }
}