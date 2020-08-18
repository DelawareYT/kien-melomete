const { MessageEmbed } = require("discord.js");
const { YOUTUBE_API_KEY } = require("../config.json");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
  name: "busca",
  description: "Busca y selecciona un video de youtube",
  async execute(message, args) {
    if (!args.length)
      return message.reply(`Uso: ${message.client.prefix}${module.exports.name} <Nombre de Video>`).catch(console.error);
    if (message.channel.activeCollector)
      return message.reply("el colector de mensajes esta activado en este canal");
    if (!message.member.voice.channel)
      return message.reply("Necesitas estar en un canal de voz primero").catch(console.error);
    const search = args.join(" ");

    let resultsEmbed = new MessageEmbed()
      .setTitle(`**Responde con el numero de la cancion que quieres poner**`)
      .setDescription(`Resultados de: ${search}`)
      .setColor("#F8AA2A");

    try {
      const results = await youtube.searchVideos(search, 10);
      results.map((video, index) => resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`));

      var resultsMessage = await message.channel.send(resultsEmbed);

      function filter(msg) {
        const pattern = /(^[1-9][0-9]{0,1}$)/g;
        return pattern.test(msg.content) && parseInt(msg.content.match(pattern)[0]) <= 10;
      }

      message.channel.activeCollector = true;
      const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] });
      const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;

      message.channel.activeCollector = false;
      message.client.commands.get("pon").execute(message, [choice]);
      resultsMessage.delete().catch(console.error);
    } catch (error) {
      console.error(error);
      message.channel.activeCollector = false;
    }
  }
};
