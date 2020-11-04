// module.exports = {
//     name: 'play',
//     description: 'Bot dołącza na kanał użytkownika i odtwarza wybraną muzykę.',
//    //aliases: ['', 'pfp'],
//     execute(message) {
//
//         const ytdl = require('ytdl-core');
//
//         message.author.join().then(connection => {
//             const stream = ytdl('<youtubelink>', { filter: 'audioonly' });
//             const dispatcher = connection.play(stream);
//
//             dispatcher.on('finish', () => voiceChannel.leave());
//         })
//     },
// };