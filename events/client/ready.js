const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        client.user.setActivity(`$help`, { type: 'WATCHING' })

        console.log(chalk.cyan(`${client.user.tag} est désormais connecté !`));

    },
};