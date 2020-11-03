module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Twój: <${message.author.displayAvatarURL({ dynamic: true })}>`);
        }
        const avatarList = message.mentions.users.map(user => {
            return `Avatar ${user.username}: <${user.displayAvatarURL({ dynamic: true })}>`;
        });
        message.channel.send(avatarList);

    },
};