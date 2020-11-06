const randomPuppy = require('random-puppy');
const Discord = require('discord.js');
//const got = require('got');

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


// const embed = new Discord.MessageEmbed();
// got('https://www.reddit.com/r/memes/random/.json').then(response => {
//     let content = JSON.parse(response.body);
//     let permalink = content[0].data.children[0].data.permalink;
//     let memeUrl = `https://reddit.com${permalink}`;
//     let memeImage = content[0].data.children[0].data.url;
//     let memeTitle = content[0].data.children[0].data.title;
//     let memeUpvotes = content[0].data.children[0].data.ups;
//     let memeNumComments = content[0].data.children[0].data.num_comments;
//     embed.setTitle(`${memeTitle}`);
//     embed.setURL(`${memeUrl}`)
//     embed.setColor('RANDOM')
//     embed.setImage(memeImage);
//     embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
//     message.channel.send(embed)
// }).catch(console.error);