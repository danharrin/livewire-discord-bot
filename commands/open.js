module.exports = async (args, msg) => {
    const user = msg.mentions.users.first();

    if (! user) return msg.reply('please specify a member to open a mail thread with.');

    const mailCategory = msg.guild.channels.resolve(process.env.MAIL_CHANNEL_CATEGORY_ID);

    if (mailCategory.children.find(channel => channel.topic === `${user.id}`)) return msg.reply('a mail thread already exists with this user.');

    const threadChannel = await msg.guild.channels.create(`${user.username.replace(' ', '-').replace('_', '-').replace(/[^A-Za-z0-9\-]/g, '')}-${user.id}`, {
        parent: mailCategory,
        topic: user.id,
    });

    threadChannel.send(`${msg.author}, a new thread was created with ${msg.mentions.members.first()}.`);

    const logsChannel = msg.guild.channels.resolve(process.env.MAIL_LOGS_CHANNEL_ID);

    logsChannel.send({
        embed: {
            color: 0x5bc612,
            timestamp: new Date(),
            title: `Mail thread opened with ${user.tag}`,
        },
    });
};