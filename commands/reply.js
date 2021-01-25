module.exports = async (args, msg) => {
    const member = msg.guild.members.resolve(msg.channel.topic);

    if (! member) return;

    const dmChannel = await member.user.createDM();

    dmChannel.send(args.join(' '));

    msg.channel.createWebhook(`${msg.member.nickname ? msg.member.nickname : msg.author.username } | ꜱᴇɴᴛ ʙʏ `, {
        avatar: msg.author.displayAvatarURL(),
    }).then(async (webhook)=> {
        await webhook.send(args.join(' '));

        webhook.delete();
    }).catch(console.error);

    const logsChannel = msg.guild.channels.resolve(process.env.MAIL_LOGS_CHANNEL_ID);

    logsChannel.send({
        embed: {
            color: 0x21a0dd,
            description: args.join(' '),
            timestamp: new Date(),
            title: `New message from ${msg.author.tag} to ${member.user.tag}`,
        },
    });

    msg.delete();
};