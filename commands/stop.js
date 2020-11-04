const { canModifyQueue } = require("../util/PusiBot.js");

module.exports = {
  name: "stop",
  description: "Zatrzymuje piosnekę",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("Nic nie leci.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ zatrzymał odtwarzanie!`).catch(console.error);
  }
};
