const fs = require('fs')
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
require('ytdl-core');

const client = new Discord.Client({disableMentions: "everyone"});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
client.queue = new Map();
const cooldowns = new Discord.Collection();

client.once('ready', () => {
    console.log(`${client.user.username} ready!`);
});
client.once('reconnecting', () => {
    console.log('Reconnecting!');
});
client.once('disconnect', () => {
    console.log('Disconnect!');
});
client.once("warn", (info) => console.log(info));
client.once("error", console.error);
client.once('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

    if (command.args && !args.length) {
        return message.channel.send(`Nie podałeś/łaś żadnego argumentu, ${message.author}!`);
    }

    // if (command.guildOnly && message.channel.type === 'dm') {
    //     return message.reply('I can\'t execute that command inside DMs!');
    // }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 4) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Czekjaj pozostało jeszcze ${timeLeft.toFixed(1)} sekund, przed ponowym użyciem komendy \`${command.name}\`.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Wystąpił błąd przy próbie wykonania komendy!');
    }
});

client.login(token);