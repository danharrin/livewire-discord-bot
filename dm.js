module.exports = async (msg) => {
    const mailCategory = msg.client.channels.resolve(process.env.MAIL_CHANNEL_CATEGORY_ID);

    let threadChannel = mailCategory.children.find(channel => channel.topic === `${msg.author.id}`);

    const logsChannel = mailCategory.guild.channels.resolve(process.env.MAIL_LOGS_CHANNEL_ID);

    if (! threadChannel) {
        threadChannel = await mailCategory.guild.channels.create(`${msg.author.username.replace(' ', '-').replace('_', '-').replace(/[^A-Za-z0-9\-]/g, '')}-${msg.author.id}`, {
            parent: mailCategory,
            topic: msg.author.id,
        });

        msg.channel.send('Thanks for contacting the Livewire staff team! Your message has been received, please await a response.');

        threadChannel.send(`<@&${process.env.STAFF_ROLE_ID}>`);

        logsChannel.send({
            embed: {
                color: 0x5bc612,
                timestamp: new Date(),
                title: `Mail thread opened with ${msg.author.tag}`,
            },
        });
    }

    threadChannel.createWebhook(`${msg.author.username } | ꜱᴇɴᴛ ᴛᴏ `, {
        avatar: msg.author.displayAvatarURL(),
    }).then(async (webhook) => {
        await webhook.send(msg.content);

        webhook.delete();
    }).catch(console.error);

    logsChannel.send({
        embed: {
            color: 0x21a0dd,
            description: msg.content,
            timestamp: new Date(),
            title: `New message from ${msg.author.tag}`,
        },
    });
};