const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "Hace un loop",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("No hay nada reproduciendo").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`El loop esta ${queue.loop ? "**activado**" : "**desactivado**"}`)
      .catch(console.error);
  }
};
