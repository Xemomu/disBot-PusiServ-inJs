module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('wybierz kogo chcesz wyjebać');
        }
        const taggedUser = message.mentions.users.first();
        message.channel.send(`Chciałeś wyjebać: ${taggedUser.username}`);

    },
};