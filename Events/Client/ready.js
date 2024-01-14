require("dotenv").config();
const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
require("colors");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(process.env.DB || '', {
            keepAlive: true,
        });

        if (mongoose.connect) {
            console.log('[+]'.green + ' MongoDB connection succesful.')
        }

        const activities = ["Works Studio", ` on ${client.guilds.cache.size} servers! `, "Helping "];
        let i = 0;

        setInterval(() => client.user.setPresence({ activities: [{ name: activities[i++ % activities.length], type: ActivityType.Playing }] }), 15000);
        console.log(`[ONLINE]`.green + ` ${client.user.tag} is online in ${client.guilds.cache.size} servers! `);
    },
};