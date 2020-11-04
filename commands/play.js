const { play } = require("../include/play");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const scdl = require("soundcloud-downloader");

let YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID;
try {
    const config = require("../config.json");
    YOUTUBE_API_KEY = config.YOUTUBE_API_KEY;
    SOUNDCLOUD_CLIENT_ID = config.SOUNDCLOUD_CLIENT_ID;
} catch (error) {
    YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
}
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
    name: "play",
    cooldown: 3,
    aliases: ["p"],
    description: "Bot dołącza na kanał użytkownika i odtwarza wybraną muzykę z linku YouTube lub SoundCloud.",
    args: true,
    async execute(message, args) {
        const { channel } = message.member.voice;

        const serverQueue = message.client.queue.get(message.guild.id);
        if (!channel) return message.reply("Wpierw dołącz na kanał głosowy!").catch(console.error);
        if (serverQueue && channel !== message.guild.me.voice.channel)
            return message.reply(`Musisz być na tym samym kanale co ${message.client.user}`).catch(console.error);

        if (!args.length)
            return message
                .reply(`Usage: ${message.client.prefix}play <YouTube URL | Video Name | Soundcloud URL>`)
                .catch(console.error);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT"))
            return message.reply("Nie mogę dołączyć do kanału, brak uprawnień!");
        if (!permissions.has("SPEAK"))
            return message.reply("Nie mogę rozmawiać na tym kanale, upewnij się, czy mam odpowiednie uprawnienia!");

        const search = args.join(" ");
        const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
        const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
        const url = args[0];
        const urlValid = videoPattern.test(args[0]);

        // Start the playlist if playlist url was provided
        if (!videoPattern.test(args[0]) && playlistPattern.test(args[0]) || scdl.isValidUrl(url) && url.includes("/sets/")) {
            return message.client.commands.get("playlist").execute(message, args);
        }

        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            loop: false,
            volume: 100,
            playing: true
        };

        let songInfo = null;
        let song = null;

        if (urlValid) {
            try {
                songInfo = await ytdl.getInfo(url);
                song = {
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    duration: songInfo.videoDetails.lengthSeconds
                };
            } catch (error) {
                console.error(error);
                return message.reply(error.message).catch(console.error);
            }
        } else if (scRegex.test(url)) {
            try {
                const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
                song = {
                    title: trackInfo.title,
                    url: trackInfo.permalink_url,
                    duration: Math.ceil(trackInfo.duration / 1000)
                };
            } catch (error) {
                if (error.statusCode === 404)
                    return message.reply("Nie mogę odnaleźć tej piosenki na SoundCloudzie.").catch(console.error);
                return message.reply("Wystąpił błąd przy odtwarzaniu piosenki.").catch(console.error);
            }
        } else {
            try {
                const results = await youtube.searchVideos(search, 1);
                songInfo = await ytdl.getInfo(results[0].url);
                song = {
                    title: songInfo.videoDetails.title,
                    url: songInfo.videoDetails.video_url,
                    duration: songInfo.videoDetails.lengthSeconds
                };
            } catch (error) {
                console.error(error);
                return message.reply("Nie znaleziono wideo o tym tytule.").catch(console.error);
            }
        }

        if (serverQueue) {
            serverQueue.songs.push(song);
            return serverQueue.textChannel
                .send(`✅ **${song.title}** została dodana do kolejki przez ${message.author}`)
                .catch(console.error);
        }

        queueConstruct.songs.push(song);
        message.client.queue.set(message.guild.id, queueConstruct);

        try {
            queueConstruct.connection = await channel.join();
            await queueConstruct.connection.voice.setSelfDeaf(true);
            play(queueConstruct.songs[0], message);
        } catch (error) {
            console.error(error);
            message.client.queue.delete(message.guild.id);
            await channel.leave();
            return message.channel.send(`Nie mogę dołączyć do kanału: ${error}`).catch(console.error);
        }
    }
};