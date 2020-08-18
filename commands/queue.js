const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");

module.exports = {
  name: "lista",
  aliases: ["L"],
  description: "Muestra la lista de musica y la actual",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("No hay nada reproduciendo").catch(console.error);

    const description = queue.songs.map((song, index) => `${index + 1}. ${escapeMarkdown(song.title)}`);

    let queueEmbed = new MessageEmbed()
      .setTitle("Lista de Musica")
      .setDescription(description)
      .setColor("#F8AA2A");

    const splitDescription = splitMessage(description, {
      maxLength: 2048,
      char: "\n",
      prepend: "",
      append: ""
    });

    splitDescription.forEach(async (m) => {
      queueEmbed.setDescription(m);
      message.channel.send(queueEmbed);
    });
  }
};
