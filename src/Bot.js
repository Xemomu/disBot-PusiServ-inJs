const fs = require('fs')
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

// client.once('ready', () => {
//     console.log('Ready!');
// });
//
// client.on('message', message => {
//     if (!message.content.startsWith(prefix) || message.author.bot) return;
//
//     const args = message.content.slice(prefix.length).trim().split(/ +/);
//     const command = args.shift().toLowerCase();
//
//     if (command === 'ping') {
//         message.channel.send('Pong.');
//
//
//     } else if (command === 'beep') {
//         message.channel.send('Boop.');
//
//
//     } else if (command === 'serverinfo') {
//         message.channel.send(`Nazwa tego zajebistego serwera: ${message.guild.name}\nLiczba członków: ${message.guild.memberCount}`);
//
//
//     } else if (command === 'userinfo') {
//         if (!message.mentions.users.size) {
//             return message.channel.send(`Nick boga: ${message.author.username}\nTwoje ID: ${message.author.id}`);
//         }
//         const userInfoList = message.mentions.users.map(user => {
//             return `Nick leszcza: ${user.username}\nID: ${user.id}`;
//         });
//         message.channel.send(userInfoList);
//
//
//     } else if (command === 'info') {
//         if (!args.length) {
//             return message.channel.send(`Podaj jakiś argument cfelu, ${message.author}!`);
//         } else if (args[0] === 'foo') {
//             return message.channel.send('bar');
//         }
//         message.channel.send(`Pierwszy argument: ${args[0]}`);
//
//
//     } else if (command === 'kick') {
//         if (!message.mentions.users.size) {
//             return message.reply('wybierz kogo chcesz wyjebać');
//         }
//         const taggedUser = message.mentions.users.first();
//         message.channel.send(`Chciałeś wyjebać: ${taggedUser.username}`);
//
//
//     } else if (command === 'avatar') {
//         if (!message.mentions.users.size) {
//             return message.channel.send(`Twój: <${message.author.displayAvatarURL({ dynamic: true })}>`);
//         }
//         const avatarList = message.mentions.users.map(user => {
//             return `Avatar ${user.username}: <${user.displayAvatarURL({ dynamic: true })}>`;
//         });
//         message.channel.send(avatarList);
//
//
//     } else if (command === 'clear') {
//         const amount = parseInt(args[0]) + 1;
//
//         if (isNaN(amount)) {
//             return message.reply('To nie wygląda na poprawną liczbę deklu\nPodaj liczbę z zakresu 1-100 po !clear');
//         } else if (amount <= 1 || amount > 100) {
//             return message.reply('Ma być to liczba z zakresu 1 - 100');
//         }
//
//         message.channel.bulkDelete(amount, true).catch(err => {
//             console.error(err);
//             message.channel.send('Wystąpił błąd przy próbie usunięcia wiadomości!');
//         });
//
//
//     } else if (command === 'help') {
//         message.channel.send('!ping\n!serverinfo\n!userinfo\n!kick\n!avatar - nick osoby po @\n!clear - liczba od 1 do 100');
//     }
// });

client.login(token);