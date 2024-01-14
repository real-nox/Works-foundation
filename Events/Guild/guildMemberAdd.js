const { EmbedBuilder } = require("@discordjs/builders");
const { Client, GuildMember, AttachmentBuilder } = require("discord.js");
const Schema = require("../../Models/Welcome")


module.exports = {
    name: "guildMemberAdd",
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

        const Message = `Hello <@${user.id}>, welcome to **${guild.name}**`

        if (Data.Channel !== null) {

            const welcomeChannel = member.guild.channels.cache.get(Data.Channel);

            const welcomeEmbed = new EmbedBuilder()
                .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
                .setDescription(`**New Member**\n${Msg}
                \nMember Count: ${guild.memberCount}`)
                .setThumbnail(user.displayAvatarURL())
                .setImage("https://media.discordapp.net/attachments/1117444118835113984/1117444211206271016/canvas-preview.30c4fe9e_1.png")
                .setFooter({ text: "by WORKS" })
                .setTimestamp()


            welcomeChannel.send({ content: `${Message}`, embeds: [welcomeEmbed] })
            member.roles.add(Data.Role);
            member.send(`**Hey ${user.tag}!** \n${Msg}\n\nSent from __${member.guild.name}__`)
        }
    }
}
