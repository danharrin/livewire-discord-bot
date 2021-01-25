require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (msg.webhookID) return;

    if (msg.author.bot) return;

    if (msg.content.startsWith('!')) {
        let args = msg.content.slice(1).trim().split(/ +/g);

        const command = args.shift().toLowerCase();

        if (command === 'close') return await require('./commands/close')(args, msg);

        if (command === 'open') return await require('./commands/open')(args, msg);

        if (command === 'reply' || command === 'r') return await require('./commands/reply')(args, msg);

        if (command === 'say') return await require('./commands/say')(args, msg);

        if (command === 'status') return await require('./commands/status')(args, msg);
    };

    if (msg.channel.type === 'dm') return await require('./dm')(msg);
});

client.login(process.env.TOKEN).then(() => {
    // client.user.setPresence({
    //     'activity': {
    //         'name': 'DM to contact admins',
    //         'type': 'WATCHING',
    //     },
    // });
});