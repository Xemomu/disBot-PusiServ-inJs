module.exports = {
    name: 'userinfo',
    description: 'UserInfo',
    execute(message, args) {
        message.channel.send(`if (!message.mentions.users.size) {
            return message.channel.send(\`Nick boga: ${message.author.username}\\nTwoje ID: ${message.author.id}\`);
        }
        const userInfoList = message.mentions.users.map(user => {
            return \`Nick leszcza: ${user.username}\\nID: ${user.id}\`;
        });
        message.channel.send(userInfoList);`);
    },
};