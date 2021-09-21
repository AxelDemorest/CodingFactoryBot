const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "github",
    description: 'List and information about all of commands',
    category: "Information",
    clientPermissions: ['EMBED_LINKS'],
    async execute(client, message, args) {

        message.channel.send({ embeds: [
            new MessageEmbed()
            .setColor("#F1413E")
            .setTitle("Code source")
            .setDescription("<a:a_BlueArrow:889566187925680138> https://github.com/AxelDemorest/CodingFactoryBot")
            .setFooter(`Requête effectué par ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        ]})

    }
}