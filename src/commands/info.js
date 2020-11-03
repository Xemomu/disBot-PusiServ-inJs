module.exports = {
    name: 'info',
    description: 'Info',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`Podaj jakiś argument cfelu, ${message.author}!`);
        } else if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        message.channel.send(`Pierwszy argument: ${args[0]}`);
    },
};