const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = {
    name: "meme",
    description: "Zwraca mema",
    cooldown: 3,
    async execute(message) {
        const subReddits = ["dankmemes", "meme", "memes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random);

        const memeEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`Mem z r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)

        message.channel.send(memeEmbed);
    }
}