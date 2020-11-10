const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const WOKCommands = require('wokcommands')

let TOKEN, PREFIX;
try {
    const config = require("./config.json");
    TOKEN = config.TOKEN;
    PREFIX = config.PREFIX;
} catch (error) {
    TOKEN = process.env.TOKEN;
    PREFIX = process.env.PREFIX;
}

const client = new Client({ disableMentions: "everyone" });


client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Client Events
 */
client.on("ready", () => {
    console.log(`${client.user.username} ready!`);
    new WOKCommands(client, 'commands', 'features')
        .setSyntaxError('Niepoprawnie użyta komenda! Przykład poprawnego użycia: {PREFIX}{COMMAND} {ARGUMENTS}')
        .setDefaultPrefix('!')
    client.user.setActivity(`twoją matkę`, { type : "WATCHING" });
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
// const commandsFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
// for (const file of commandsFiles) {
//     const command = require(join(__dirname, "commands", `${file}`));
//     client.commands.set(command.name, command);
// }


client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;


    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [matchedPrefix] = message.content.match(prefixRegex);


    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
        client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));


    if (!command) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(
                `pozostało jeszcze ${timeLeft.toFixed(1)} sekund, aby móc ponownie użyć komendy: \`${command.name}\``
            );
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("Wystąpił błąd przy próbie wykonania tej komendy.").catch(console.error);
    }
});

client.on("guildMemberAdd", (member) => {
    console.log(`${member.id} dołączył`)
    //member.roles.add(member.guild.roles.cache.find(i => i.name === ''))
    //console.log(`New User "${member.user.username}" dołączył na serwer "${member.guild.name}"` );
    member.guild.channels.find(c => c.name === "👋-pusiteam").send(`"${member.user.username}" dołączył na serwer`);
    // const welcomeEmbed = new Client.MessageEmbed()
    //     .setColor('#5cf000')
    //     .setTitle('Witaj na serwerze' + member.user.username)
    //
    //
    // member.guild.channels.get('773164762275119166').send(welcomeEmbed);



    // const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'ogólne')
    // const embed = new Client.MessageEmbed()
    //     .setTitle(`Witaj na kanale ${member}!`)
    //     .addField(`Zanim cokolwiek tu zrobisz zapoznaj się z regulaminem `)
    // welcomeChannel.send (embed);
})





client.login(TOKEN);