const { MessageEmbed } = require("discord.js");
const templates = require("../../utils/templates")

module.exports = {
    name: "help",
    description: 'List and information about all of commands',
    category: "Information",
    clientPermissions: ['EMBED_LINKS'],
    async execute(client, message, args) {

        const { commands } = client;

        const prefix = "$";

        const embedHelp = new MessageEmbed()
            .setColor("#70D9F3")
            .setTitle("Need Help ?")
            .setDescription(`・To obtain more information about a command, use \`${prefix}help <command>\`.`)
        client.categories.filter(category => message.author.id !== "378617147858878465" ? category !== "<:pinkcrown:843967542472474624> - Propriétaire" : category).map(cat => {
            embedHelp.addField(`• ${cat}`, client.commands.filter(cmd => cmd.category === cat).map(cmd => `\`${cmd.name}\``).join(' | '))
        });


        if (!args.length) {
            return message.channel.send({ embeds: [embedHelp] });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        /* if (!command) return message.channel.send({ embeds: client.util.errorMsg(message.author.tag, "La commande est introuvable.") }); */

        message.channel.send(
            {
                embeds: [
                    new MessageEmbed()
                        .setColor("#70D9F3")
                        .setAuthor("More informations about command")
                        .setTitle(`<a:bluearrow:884849722672685117> ${templates.capitalizeFirstLetter(command.name)} command`)
                        .setDescription(`・**Aliases**︰${command.aliases ? command.aliases.join(', ') : "No aliases"}
・**Description**︰${command.description ? command.description : "No description"}
・**Usage**︰${command.usage ? `\`${command.usage}\`` : "No usage"}
・**Category**︰${command.category} commands
・**Permission**︰${command.userPermissions ? `\`${command.userPermissions}\`` : "No permission needed"}
・**Examples**︰${command.exemples ? `\n\`\`\`${command.exemples.join("\n")}\`\`\`` : "No examples"}`)
                        .setFooter("<> = required, [] = optional・don't use when using the command.")

                ]
            }

        )

    }
}