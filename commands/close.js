module.exports = async (args, msg) => {
    const member = await msg.guild.members.resolve(msg.channel.topic);

    msg.channel.delete();

    const logsChannel = msg.guild.channels.resolve(process.env.MAIL_LOGS_CHANNEL_ID);

    logsChannel.send({
        embed: {
            color: 0xb32536,
            timestamp: new Date(),
            title: `Mail thread closed with ${member.user.tag}`,
        },
    });
};