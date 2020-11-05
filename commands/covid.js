const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "Śledź łączne staty COVID-19 na świecie lub w danym kraju",
    args: true,
    execute(message, args){

        let countries = args.join(" ");

        //Credit to Sarastro#7725 for the command :)

        const noArgs = new Discord.MessageEmbed()
            .setTitle('Brak argumentu')
            .setColor(0xFF0000)
            .setDescription('Podaj jakiś argument (np: !covid all || !covid Poland)')
            .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all" || args[0] === "world" || args[0] === "worldwide"){
            fetch(`https://covid19.mathdro.id/api`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Dotychczasowe staty COVID-19 na świecie 🌎`)
                        .addField('Potwierdzone przypadki', confirmed)
                        .addField('Wyleczone', recovered)
                        .addField('Zgony', deaths)

                    message.channel.send(embed)
                })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Dotychczasowe staty COVID-19 w **${countries}**`)
                        .addField('Potwierdzone przypadki', confirmed)
                        .addField('Wyleczone', recovered)
                        .addField('Zgony', deaths)

                    message.channel.send(embed)
                }).catch(e => {
                return message.channel.send('Nieznaleziono państwa')
            })
        }
    }
}