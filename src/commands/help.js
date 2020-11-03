module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message, args) {
        message.channel.send('!ping\n!serverinfo\n!userinfo\n!kick\n!avatar - nick osoby po @\n!clear - liczba od 1 do 100');
    },
};