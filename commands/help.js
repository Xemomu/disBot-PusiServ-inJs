const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lista wszystkich dostępnych komend, albo informacji na temat konkretnej komendy.',
    aliases: ['commands'],
    usage: ['command name'],
    cooldown: 4,
    execute(message) {
        const moderation = new Discord.MessageEmbed()
            .setTitle('Moderacja')
            .addField('`!kick`', 'Kickuje wspomnianego członka servera')
            .addField('`!clear`', 'Usuwa podaną ilość wiadomości z kanału')
            .addField('`!ban`', 'Banuje podanego użytkownika')
            .setTimestamp()

        const utility = new Discord.MessageEmbed()
            .setTitle('Różne')
            .addField('`!avatar`', 'Zwraca twój avatar, lub avatar podanego użytkownika')
            .addField('`!covid`', 'Śledź łączne staty COVID-19 na świecie lub w danym kraju')
            .addField('`!serverinfo`', 'Podstawowe informacje o serwerze')
            .addField('`!meme`', 'Zwraca losowego mema')
            .addField('`!weather`', 'Pokazuje aktualną pogodę w podanym miejscu')
            .setTimestamp()

        const music = new Discord.MessageEmbed()
            .setTitle('Muzyka')
            .addField('`!play`', 'Odtwórza wybraną muzykę')
            .addField('`!playlist`', 'Odtwórz wybraną playlistę')
            .addField('`!queue`', 'Pokaż piosenki w kolejce')
            .addField('`!search`', 'Wyszukaj piosenkę o podanej nazwie, następnie wybierz jej numer z listy')
            .addField('`!skip`', 'Przewiń piosenkę')
            .addField('`!skipto`', 'Przewiń do piosenki o danym numerze z kolejki')
            .addField('`!stop`', 'Zatrzymaj odtwarzanie piosenki')
            .addField('`!volume`', 'Ustaw głośność odtwarzania (0-100)')
            .addField('`!lyrics`', 'Wyświetl tekst aktualnie odtwarzanego utworu')
            .addField('`!nowplaying`', 'Pokaż co jest aktualnie odtwarzane')
            .addField('`!stop`', 'Zapętl aktualnie odtwarzany utwór')
            .addField('`!shuffle`', 'Wymieszaj kolejność piosenek w kolejce')
            .setTimestamp()

        const pages = [
            utility,
            music,
            moderation
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    },
};
//message.channel.send('!ping\n!serverinfo\n!userinfo\n!kick\n!avatar - nick osoby po @\n!clear - liczba od 1 do 100');
//const { prefix } = require('../config.json');
// const data = [];
// const { commands } = message.client;
//
// if (!args.length) {
//     data.push('Oto lista wszystkich moich komend:\n');
//     data.push(commands.map(command => command.name).join(',\t'));
//     data.push(`\nAby uzyskać info o konkretnej komendzie napisz: \`${prefix}help [command name]\` `);
//
//     return message.author.send(data, { split: true })
//         .then(() => {
//             if (message.channel.type === 'dm') return;
//             message.reply('Wysłałem Ci PW ze wszystkimi moimi komendami');
//         })
//         .catch(error => {
//             console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
//             message.reply('Nie mogę  wysłać do Ciebie wiadomości PW');
//         });
// }
// const name = args[0].toLowerCase();
// const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
//
// if (!command) {
//     return message.reply('To nie jest moja komenda');
// }
//
// data.push(`Nazwa: ${command.name}`);
//
// if (command.aliases) data.push(`Inne nazwy: ${command.aliases.join(', ')}`);
// if (command.description) data.push(`Opis: ${command.description}`);
// if (command.usage) data.push(`Użycie: ${prefix}${command.name} ${command.usage}`);
//
// data.push(`Cooldown: ${command.cooldown || 3} sekundy`);
//
// message.channel.send(data, { split: true });