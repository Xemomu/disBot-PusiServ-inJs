const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Lista wszystkich dostępnych komend, albo informacji na temat konkretnej komendy.',
    aliases: ['commands'],
    usage: ['command name'],
    cooldown: 4,
    execute(message, args) {
        //message.channel.send('!ping\n!serverinfo\n!userinfo\n!kick\n!avatar - nick osoby po @\n!clear - liczba od 1 do 100');
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Oto lista wszystkich moich komend:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nAby uzyskać info o konkretnej komendzie napisz: \`${prefix}help [command name]\` `);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('Wysłałem Ci PW ze wszystkimi moimi komendami');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('Nie mogę  wysłać do Ciebie wiadomości PW');
                });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('To nie jest moja komenda');
        }

        data.push(`Nazwa: ${command.name}`);

        if (command.aliases) data.push(`Inne nazwy: ${command.aliases.join(', ')}`);
        if (command.description) data.push(`Opis: ${command.description}`);
        if (command.usage) data.push(`Użycie: ${prefix}${command.name} ${command.usage}`);

        data.push(`Cooldown: ${command.cooldown || 3} sekund`);

        message.channel.send(data, { split: true });
    },
};