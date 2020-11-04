const { canModifyQueue } = require("../util/PusiBot.js");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Wznów aktualnie odtwarzaną piosenkę",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Nic nie leci.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ wznowił/a odtwarzanie!`).catch(console.error);
    }

    return message.reply("Kolejka nie jest zatrzymana.").catch(console.error);
  }
};
