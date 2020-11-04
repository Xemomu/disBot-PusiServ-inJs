module.exports = {
    name: 'kick',
    description: 'Kick!',
    guildOnly: true,

    execute(message, args) {
        // if (!message.mentions.users.size) {
        //     return message.reply('wybierz kogo chcesz wyjebać');
        // }
        // const taggedUser = message.mentions.users.first();
        // message.channel.send(`Chciałeś wyjebać: ${taggedUser.username}`);
        const discord = require('discord.js');
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Nie masz uprawinień")
        let User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if (!User) return message.channel.send("Nieprawidłowy użytkownik")
        let kickReason = args.join(" ").slice(22);
        if (!kickReason) {
            kickReason = "None"
        }
        User.kick({reason: kickReason})
        const person = message.mentions.users.first()
        const embed = new discord.MessageEmbed()
            .setTitle(person.username + " wyjebany/a przez " + message.author.username)
            .setThumbnail("https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.custom-cursor.com%2Fcursors%2Fyah_yeet_1207.png&imgrefurl=https%3A%2F%2Fcustom-cursor.com%2Fen%2Fcollection%2Fmemes%2Fyah-yeet&tbnid=WW6SP6LmHsB2dM&vet=12ahUKEwjrrKTr1ufsAhWYu6QKHZfZDuIQMygCegUIARChAQ..i&docid=VSSiLewz0wjJMM&w=651&h=326&q=yeet&hl=pl&client=opera&ved=2ahUKEwjrrKTr1ufsAhWYu6QKHZfZDuIQMygCegUIARChAQ")
        message.channel.send(embed)
    },
};