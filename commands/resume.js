const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "continua",
  aliases: ["c"],
  description: "continua reproduciendo",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("no  hay nada reproduciendo").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ Se reanudó la musica`).catch(console.error);
    }

    return message.reply("la lista ya no esta pausada").catch(console.error);
  }
};
