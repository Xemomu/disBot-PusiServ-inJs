module.exports = {
    name: 'points',
    description: 'Wyświetlenie ilości Twoich pkt. oraz Twój obecny lvl',

    async execute(message) {
        return message.reply(`Obecnie posiadasz ${score.points} punktów oraz ${score.level} lvl!`);
    },
};