const fs = require('fs');

module.exports = {
    name: 'add',
    description: 'Dodaj gościa do listy zjebów.',
    args: true,
    execute(message, args) {

        if (!args.length)
            return message
                .reply(`Podaj kogo chcesz dodać do listy`)
                .catch(console.error);

        let nick = args[0];
        
        fs.writeFile('lista.txt', nick, (err) => {

            Zjebów
            if (err) throw err;
        })
    },
};