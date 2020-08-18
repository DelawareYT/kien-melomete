const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "deten",
  description: "Pausa la canción",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("No hay nada reproduciendo").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ pausó la musica`).catch(console.error);
    }
  }
};
