const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volumen",
  aliases: ["v"],
  description: "Cambia el volumen de la canción",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("No hay nada reproduciendo").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Necesitas estar en el canal de voz primero").catch(console.error);

    if (!args[0]) return message.reply(`🔊 el volumen actual es: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("usa un numero para poner el volumen").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("usa un numero de 0 - 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Volumen puesto a: **${args[0]}%**`).catch(console.error);
  }
};
