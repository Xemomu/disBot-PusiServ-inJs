const Commando = require('discord.js-commando')

module.exports = class SimJoinCommand extends Commando.Command{
    constructor(client) {
        super(client, {
            name: 'simjoin',
            description: 'Symuluje dołączenie kogoś na serwer',
            cooldown: 4,
        });
    }

    execute(message) {
        this.client.emit('guildMemberAdd',message.member)
    }
};