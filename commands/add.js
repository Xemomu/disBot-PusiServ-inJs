const fs = require('fs');

module.exports = {
    callback: (message, args) => {
        if (!args.length)
            return message
                .reply(`Podaj kogo chcesz dodać do listy`)
                .catch(console.error);

        let nick = args[0];
        
        fs.writeFile('lista.txt', nick, (err) => {

            if (err) throw err;
        })
    },
};