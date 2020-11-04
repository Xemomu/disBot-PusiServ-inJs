const { canModifyQueue } = require("../util/PusiBot.js");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Zmień głośność aktualnie odtwarzanej piosenki",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Nic nie leci.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Wpierw dołącz na kanał!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Aktualna głośność: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Wybierz liczbę do ustawienia głośności.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Liczba ma być z zakresu 0 - 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Głośność ustawiona na: **${args[0]}%**`).catch(console.error);
  }
};
