module.exports = {
    name: 'avatar',
    description: 'Zwraca link do twojego avataru, lub avataru otagowanego użytkownika',
    aliases: ['icon', 'pfp'],

    execute(message) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Twój avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);
        }
        const avatarList = message.mentions.users.map(user => {
            return `Avatar ${user.username}: <${user.displayAvatarURL({ dynamic: true })}>`;
        });
        message.channel.send(avatarList);
    },
};