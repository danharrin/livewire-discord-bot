module.exports = async (args, msg) => {
    if (! msg.member.roles.cache.has(process.env.STAFF_ROLE_ID)) return;

    const res = await msg.channel.send('Ping?');

	res.edit(`Pong! Latency is ${res.createdTimestamp - msg.createdTimestamp}ms.`);
};