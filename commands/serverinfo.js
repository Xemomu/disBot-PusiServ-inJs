const Discord = require('discord.js')

module.exports = {
    name: 'serverinfo',
    description: 'Podstawowe informacje o serwerze.',
    aliases: ['si'],
    cooldown: 4,
    execute(message) {
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days === 1 ? " dzień" : " dni") + " temu";
        }
        //let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
        let region = {
            "brazil": ":flag_br: Brazil",
            "eu-central": ":flag_eu: Central Europe",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "eu-west": ":flag_eu: Western Europe",
            "vip-us-east": ":flag_us: VIP U.S. East",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Russia",
            "southafrica": ":flag_za:  South Africa"
        };
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}`)
            .addField("ID", message.guild.id, true)
            .addField("Właściciel", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
            .addField("Region", region[message.guild.region], true)
            .addField("Liczba członków", `${message.guild.members.size}`, true)
            .addField("Kanały", message.guild.channels.size, true)
            .addField("Data powstania", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
            .setThumbnail(message.guild.iconURL)
        message.channel.send({embed});
    }
}
//.addField("Verification Level", verifLevels[message.guild.verificationLevel], true)
//.setAuthor(message.guild.name, message.guild.iconURL)