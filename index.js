require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const express = require('express');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('!removebg') || message.author.bot) return;

  const attachment = message.attachments.first();
  if (!attachment || !attachment.contentType.startsWith('image/')) {
    return message.reply('Image where?🗡️(￣y▽￣)╭ Ohohoho..... use this ->`!removebg` ᓚᘏᗢ.');
  }

  const imageUrl = attachment.url;
  try {
    const form = new FormData();
    form.append('image_url', imageUrl);
    form.append('size', 'auto');

    const response = await axios.post('https://api.remove.bg/v1.0/removebg', form, {
      headers: {
        ...form.getHeaders(),
        'X-Api-Key': process.env.REMOVEBG_API_KEY,
      },
      responseType: 'arraybuffer',
    });

    const outputPath = path.join(__dirname, 'no-bg.png');
    fs.writeFileSync(outputPath, response.data);

    await message.reply({
      content: '✅ Jajan! ☆*: .｡. o(≧▽≦)o .｡.:*☆',
      files: [outputPath],
    });

    fs.unlinkSync(outputPath);
  } catch (err) {
    console.error(err.response?.data || err.message);
    message.reply('(っ °Д °;)っ I think sth went wrong there. ');
  }
});

client.login(process.env.DISCORD_TOKEN);
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web server is running on port ${PORT}`);
});