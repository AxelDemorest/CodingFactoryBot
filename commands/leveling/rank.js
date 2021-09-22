const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "rank",
    description: '',
    aliases: ['level'],
    category: "Leveling",
    clientPermissions: ['EMBED_LINKS'],
    async execute(client, message, args) {

        const data = await client.db.asyncQuery(`SELECT * FROM leveling WHERE user_id = ${message.author.id} AND guild_id = ${message.guild.id}`).catch(console.error);

        if(!data[0]) {
            message.channel.send({ embeds: [
                new MessageEmbed()
                .setColor("#F1413E")
                .setTitle("Level")
                .setDescription(`**Level :** 0\n**Xp :** 0\n**Xp needed :** 50`)
            ]})
        } else {
            message.channel.send({ embeds: [
                new MessageEmbed()
                .setColor("#F1413E")
                .setTitle("Level")
                .setDescription(`**Level :** ${data[0].level}\n**Xp :** ${data[0].xp}\n**Xp needed :** ${data[0].xp_needed}`)
            ]})
        }
        
    }
}