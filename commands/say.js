module.exports = async (args, msg) => {
    if (! msg.member.roles.cache.has(process.env.STAFF_ROLE_ID)) return;

    msg.delete();

    const content = args.join(' ');

    if (! content) return;

	msg.channel.send(content);
};