module.exports = {
    name: 'reload',
    description: 'Odświeżenie komend',
    execute(message, args) {
        if (!args.length) return message.channel.send(`Nie podałeś żadnek komendy do odświeżenia, ${message.author}!`);
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`Nie ma komendy o podanej nazwie \`${commandName}\`, ${message.author}!`);

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Komenda \`${command.name}\` została ponownie załadowana!`);
        } catch (error) {
            console.error(error);
            message.channel.send(`Wystąpił błąd przy próbie ponownego załadowania komendy! \`${command.name}\`:\n\`${error.message}\``);
        }
    },
};