const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "salta",
  aliases: ["sa"],
  description: "Salta al numero de la canción que quieras",
  execute(message, args) {
    if (!args.length)
      return message
        .reply(`Uso: ${message.client.prefix}${module.exports.name} <numero de la lista>`)
        .catch(console.error);

    if (isNaN(args[0]))
      return message
        .reply(`Uso: ${message.client.prefix}${module.exports.name} <numero de la lista>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("No hay Lista").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (args[0] > queue.songs.length)
      return message.reply(`La lista es de solo${queue.songs.length} canciones`).catch(console.error);

    queue.playing = true;
    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ saltaste ${args[0] - 1} songs`).catch(console.error);
  }
};
