const { canModifyQueue } = require("../util/EvobotUtil");


module.exports = {
  name: "para",
  description: "Detiene al música",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("No hay nada reproduciendo").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ Paraste la musica`).catch(console.error);
  }
};
