module.exports = {
    name: 'serverinfo',
    description: 'ServerInfo',
    execute(message, args) {
        message.channel.send(`Nazwa tego zajebistego serwera: ${message.guild.name}\nLiczba członków: ${message.guild.memberCount}`);
    },
};