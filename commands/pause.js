const { canModifyQueue } = require("../util/PusiBot.js");

module.exports = {
  name: "pause",
  description: "Zatrzymaj aktualnie odtwarzaną muzykę",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Nic nie leci.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ zatrzymał/a muzykę.`).catch(console.error);
    }
  }
};
