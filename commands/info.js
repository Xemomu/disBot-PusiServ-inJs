module.exports = {
    name: 'info',
    description: 'Info',
    args: true,
    execute(message, args) {
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        message.channel.send(`Pierwszy argument: ${args[0]}`);
    },
};