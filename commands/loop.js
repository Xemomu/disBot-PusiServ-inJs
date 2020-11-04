const { canModifyQueue } = require("../util/PusiBot.js");

module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "Włącz powtórzenie piosenki",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Nic nie leci.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`Powtórka jest teraz ${queue.loop ? "**włączona**" : "**wyłączona**"}`)
      .catch(console.error);
  }
};
