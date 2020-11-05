const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "weather",
    description: "Pokazuje aktualną pogodę dla podanego miejsca",
    args: true,
    cooldown: 4,
    execute(message, args){

        weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
            // if(error) return message.channel.send(error);
            if(!args[0]) return message.channel.send('Podaj lokalizację')

            if(result === undefined || result.length === 0) return message.channel.send('Nieprawidłowa lokalizacja');

            const current = result[0].current;
            //const location = result[0].location;

            const weatherinfo = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Pogoda w ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x111111)
                .addField('Temperatura', `${current.temperature}°`, true)
                .addField('Wiatr', current.winddisplay, true)
                .addField('Odczuwalna', `${current.feelslike}°`, true)
                .addField('Wilgotność', `${current.humidity}%`, true)

            message.channel.send(weatherinfo)
        })
    }
}