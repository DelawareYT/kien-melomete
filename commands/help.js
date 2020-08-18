const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ayuda",
  aliases: ["a"],
  description: "Muestra todos los comandos",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle("Ayuda by  : DelawareYT")
      .setDescription("Lista de comandos by: DelawareYT")
      .setColor("#F8AA2A");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
