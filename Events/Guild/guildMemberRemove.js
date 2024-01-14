const { EmbedBuilder } = require("@discordjs/builders");
const { Client, GuildMember, AttachmentBuilder } = require("discord.js");
const Schema = require("../../Models/Leave")


module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member, client) {
        const { user, guild } = member;

        const Data = await Schema.findOne({ Guild: guild.id }).catch(err => { })
        if (!Data) return;

        let channel = Data.Channel;
        let Role = Data.Role;
        let Msg = Data.Msg || " ";

        const Message = `Member <@${user.id}> has left **${guild.name}**`

        if (Data.Channel !== null) {

            const welcomeChannel = member.guild.channels.cache.get(Data.Channel);

            const welcomeEmbed = new EmbedBuilder()
                .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
                .setDescription(`**Member Left**\n${Msg}`)
                .setThumbnail(user.displayAvatarURL())
                .setImage("https://media.discordapp.net/attachments/1117444118835113984/1117444210862342164/canvas-preview.30c4fe9e_2.png")
                .setFooter({ text: "by WORKS Bot" })
                .setTimestamp()


            welcomeChannel.send({ content: `${Message}`, embeds: [welcomeEmbed] })
        }
    }
}
