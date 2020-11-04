module.exports = client => {
    const channelId = '773164762275119166';

    client.on('guildMemberAdd', member => {
        console.log(member)

        const message = 'Witaj <@${member.id} na serwerze!';

        const channel = member.guild.channels.cache.get(channelId);
        channel.send(message);
    })
}