const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "siguiente",
  aliases: ["s"],
  description: "Pasa a la siguiente canción",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("no hay nada reproduciendo que pueda esquivar").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ pasaste a la siguiente`).catch(console.error);
  }
};
