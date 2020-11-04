const { canModifyQueue } = require("../util/PusiBot.js");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Pomiń do piosenki o wybranym numerze z kolejki",
  execute(message, args) {
    if (!args.length)
      return message
        .reply(`Usage: ${message.client.prefix}${module.exports.name} <Queue Number>`)
        .catch(console.error);

    if (isNaN(args[0]))
      return message
        .reply(`Usage: ${message.client.prefix}${module.exports.name} <Queue Number>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Nie ma kolejki.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (args[0] > queue.songs.length)
      return message.reply(`Kolejka ma tylko ${queue.songs.length} piosenek!`).catch(console.error);

    queue.playing = true;
    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ pominął ${args[0] - 1} piosenek`).catch(console.error);
  }
};
