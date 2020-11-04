const { canModifyQueue } = require("../util/PusiBot.js");

module.exports = {
  name: "remove",
  description: "Usuń piosenkę z kolejki",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Nie ma kolejki.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    
    if (!args.length) return message.reply(`Usage: ${message.client.prefix}remove <Queue Number>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}remove <Queue Number>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ usunął/ęła **${song[0].title}** z kolejki.`);
  }
};
