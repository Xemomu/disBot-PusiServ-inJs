module.exports = {
    canModifyQueue(member) {
        const { channelID } = member.voice;
        const botChannel = member.guild.voice.channelID;

        if (channelID !== botChannel) {
            member.send("Musisz najpierw dołączyć na jakiś kanał głosowy!").catch(console.error);
            return;
        }

        return true;
    }
};