// module.exports =  {
//     name: 'say',
//     description: 'Say!',
//     cooldown: 3,
//     args: true,
//     execute(message, args){
//     if(message.member.permissions.has("MANAGE_MESSAGES")) {
//         message.delete().then(m=>{
//             return message.channel.send(args.join(" "));
//         });
//     }
//     else return message.reply("Nie masz do tego uprawnień!");
//     }
// }