require("dotenv").config();
const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require("discord.js");
const mongoose = require('mongoose');
const { handleLogs } = require("../Handlers/handlelogs");
const { loadEvents } = require("..//Handlers/eventHandler");
const { loadCommands } = require("../Handlers/commandHandler");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});
mongoose.set("strictQuery", false);

client.on("unhandledRejection", (reason, p) => {
  const ChannelID = "1115671887155036321";
  console.error("Unhandled promise rejection:", reason, p);
  const Embed = new EmbedBuilder()
    .setColor("#235ee7")
    .setTimestamp()
    .setFooter({ text: "Crash Prevention" })
    .setTitle("Error Encountered");
  const Channel = client.channels.cache.get(ChannelID);
  if (!Channel) return;
  Channel.send({
    embeds: [
      Embed.setDescription(
        "**Unhandled Rejection/Catch:\n\n** ```" + reason + "```"
      ),
    ],
  });
});
const Token = process.env.CLIENT_TOKEN

client.config = require("./config/config.js")
client.giveawayConfig = require("./config/config.js");
client.commands = new Collection();

['giveawaysEventsHandler', 'giveawaysManager'].forEach((x) => {
  require(`../Utils/${x}`)(client);
})

module.exports = client;

client.login(Token).then(() => {
  loadEvents(client);
  handleLogs(client);
  loadCommands(client);
});