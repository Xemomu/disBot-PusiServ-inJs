const { canModifyQueue } = require("../util/PusiBot.js");

module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Pomiń aktualnie odtwarzaną piosenkę",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("Nic nie leci.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ pominął piosenkę`).catch(console.error);
  }
};
