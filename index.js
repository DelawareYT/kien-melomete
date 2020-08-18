/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json");


const client = new Client({ disableMentions: "everyone" });

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
    client.user.setStatus('online');
     
   
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);



/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
  
});
client.on('message', async message => {
  //Receiving the message
  console.log(message.content);
  if (message.content === 'MMG') {
    message.reply('shupame la pinga');
  }

  if (message.content === 'hola Bot') {
    message.reply('klk, manin');
  }

  if (message.content === 'ci') {
    message.channel.send('https://data.whicdn.com/images/119955929/original.jpg')
  }

  if (message.content === 'emoji') {
    message.channel.send(`no mas mmg`)
  }

  if (message.content === ('mmgbot')) {
    message.channel.send(`klk rapatumadre sigo en linea, MMG`)

  }

  if (message.content === 'kienmelomete') {
    message.reply('yo te lo meto soy vato :3');
  }

  if (message.content === 'mlink') {
    message.channel.send('Este es nuestro link de discord invita a tus amigos! https://discord.gg/he4zaWp  https://discord.gg/TpxBMmn');
    ;
  }

  if (message.content === 'jordan') {
    message.channel.send('https://external-preview.redd.it/HMQuhZDuWnVcNhf9CcCnHaCakkqHLFTD170E_LBQqEM.png?format=pjpg&auto=webp&s=af151ae8b03e2913753926a013e41fe45187924e')
  }



  if (message.content === 'racista') {
    message.channel.send('https://i.pinimg.com/564x/ae/e1/c2/aee1c22479df24070b8ecec52f502947.jpg')
  }

  if (message.content === 'correcto mi estimado') {
    message.channel.send('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSetiSGdYQGq_w5dI6XBfCRAOxT3t-XnIeaZQ&usqp=CAU')
  }


  if (message.content === 'paja mortal') {
    message.channel.send('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCWZyjItKJcgjTZW_HaLRqxgZGnOzLfxHNpQ&usqp=CAU')
    message.channel.send('Regreso ahora');
  }

  if (message.content === 'te voy a meter preso') {
    message.channel.send(`https://d5qmjlya0ygtg.cloudfront.net/434/382/446/70003016-1r6rlqp-gfaahkpsi3e64lk/original/52.jpg`)

  }

  if (message.content === 'toi drogao') {
    message.channel.send(`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTm8if4Av31-FcFPqoKy17eiCC7Xbt62t1utQ&usqp=CAU`)
  }

  if (message.content === 'tt') {
    message.channel.send(`no me diga eso que pienso que quieres toto y me prendo`)
  }
  if (message.content === 'panda') {
    message.channel.send('https://media1.tenor.com/images/5d2df2d7c05e7457d63a6e630d1cd469/tenor.gif')
  }
  if (message.content === 'callate') {
    message.channel.send('https://pm1.narvii.com/7306/8a1324e101b4103a1fdf744413abdc9b54cef2a4r1-370-441v2_hq.jpg')
  }
  if (message.content === 'nou') {
    message.channel.send('https://i.ytimg.com/vi/h4UROwMvGMU/hqdefault.jpg')
  }
  if (message.content === 'goku pelon') {
    message.channel.send('https://cdn.discordapp.com/attachments/410197118263754753/730601249170391090/religion-imagenes.jpg')
    message.channel.send('Goku Pelón');
  }
    if (message.content === 'khe') {
    message.channel.send('https://cdn.discordapp.com/attachments/410197118263754753/727365872125214821/Anotacion_2020-05-05_011232.png')
  }
    if (message.content === 'mip') {
    message.channel.send('IP: 103.195.103.226:25454')
  }
   if (message.content === 'opresor') {
    message.channel.send('https://lh3.googleusercontent.com/proxy/VG4d_jd3w5ONlXU7W6mRlwSAHxM0YpAa4zwch-Rt7Mops4sAYrlWTei3f-Zss46gyI_uros9FhMWqzTM2TY-m72a3DFQBys_kZna-_MGv_zmwOGC')
   }
     if (message.content === 'pal admin') {
    message.channel.send('https://cdn.discordapp.com/attachments/410197118263754753/735246225787453530/IMG-20200611-WA0013-1.png')
  }
       if (message.content === 'don comedia') {
    message.channel.send('https://cdn.discordapp.com/attachments/410197118263754753/715991838779244675/video0.mp4')
       }
      if (message.content === 'silencio') {
    message.channel.send('https://pbs.twimg.com/media/EYPjWo2WkAIsB4T.jpg:large')
       }
  
  if (message.content.startsWith('!clear')) {
    async function clear() {
      try {
        // await message.delete();
        const fetched = await message.channel.fetchMessages({ limit: 99 });
        message.channel.bulkDelete(fetched);;
        console.log('Messages deleted');
        
        
        
      }
      catch (e) {
        3
        console.log(e);
      }
    }
    clear();
  }
});