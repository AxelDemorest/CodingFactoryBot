const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        function checkPermission(message, permissions, member) {
            const missing = message.channel.permissionsFor(member).missing(permissions);
            if (missing.length > 0) {
                return `la ou les permission(s) suivante(s): ${missing.map(perm => `**${perm}**`).join(', ')}`;
            }
            return false;
        }

        const prefix = "$";

        const regex = message.content.match(`^<@!?889563855070568458> *|^\\${prefix}`);

        if (!regex || message.author.bot) return;

        const [commandName, ...args] = message.content.slice(regex[0].length).trimStart().toLowerCase().split(/\s+/)

        const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        if (command.ownerOnly && message.author.id !== "378617147858878465") return;

        if (command.guildOnly && message.channel.type === 'dm') return;

        if (message.channel.type === 'GUILD_TEXT') {
            if (!message.channel.permissionsFor(message.guild.me).has(["VIEW_CHANNEL", "SEND_MESSAGES"])) return;
        }

        if (command.DMOnly && message.channel.type === 'GUILD_TEXT') {
            return message.channel.send({ embeds: [client.util.errorMsg(message.author, "La commande ne peut être exécutée que dans les messages privés du bot.")] });
        }

        if (message.channel.type === 'GUILD_TEXT') {
            if (command.clientPermissions) {
                const needPerms = checkPermission(message, command.clientPermissions, message.guild.me);
                if (needPerms) return message.channel.send({ embeds: [client.util.errorMsg(message.author, 'Il me manque ' + needPerms)] });
            }

            if (command.userPermissions) {
                const needPerms = checkPermission(message, command.userPermissions, message.member);
                if (needPerms) return message.channel.send({ embeds: [client.util.errorMsg(message.author, 'Il te manque ' + needPerms)] });
            }
        }

        if (command.args && !args.length) {
            let reply = `Tu n'as indiqué aucun argument.`;

            if (command.usage) {
                reply += `\n\n\`\`\`Usage:\n\n> ${prefix}${command.name} ${command.usage}\`\`\``;
            }

            return message.channel.send({ embeds: [client.util.errorMsg(message.author, reply)] });
        }

        try {
            command.execute(client, message, args);
        } catch (error) {
            console.error(error);
            return message.channel.send({ embeds: [client.util.errorMsg(message.author, "J'ai rencontré une erreur lors de l'exécution de la commande.")] });
        }
    },
};