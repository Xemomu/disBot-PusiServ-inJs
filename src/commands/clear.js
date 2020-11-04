module.exports = {
    name: 'clear',
    description: 'Clear',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('To nie wygląda na poprawną liczbę deklu\nPodaj liczbę z zakresu 1-100 po !clear');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('Ma być to liczba z zakresu 1 - 100');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('Wystąpił błąd przy próbie usunięcia wiadomości!');
        });
    },
};