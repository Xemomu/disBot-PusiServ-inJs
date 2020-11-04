module.exports = {
    name: 'serverinfo',
    description: 'Podstawowe informacje na temat obecnego servera',
    execute(message) {
        message.channel.send(`Nazwa tego zajebistego serwera: ${message.guild.name}\nLiczba członków: ${message.guild.memberCount}\nData powstania ${message.guild.createdAt}`);
    },
};