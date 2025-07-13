require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');
const express = require('express');
const axios = require('axios');
const FormData = require('form-data');

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'removebg') {
        const attachment = interaction.options.getAttachment('image');

        if (!attachment || !attachment.contentType?.startsWith('image/')) {
            return interaction.reply({
                content: 'Where valid image?🗡️(￣y▽￣)╭ Ohohoho.....',
                ephemeral: true,
            });
        }

        await interaction.deferReply();

        try {
            const form = new FormData();
            form.append('image_url', attachment.url);
            form.append('size', 'auto');

            const response = await axios.post('https://api.remove.bg/v1.0/removebg', form, {
                headers: {
                    ...form.getHeaders(),
                    'X-Api-Key': process.env.REMOVEBG_API_KEY,
                },
                responseType: 'arraybuffer',
            });

            await interaction.editReply({
                content: '✅ Jajan! ☆: .｡. o(≧▽≦)o .｡.:☆',
                files: [{
                    attachment: Buffer.from(response.data),
                    name: 'no-bg.png',
                }],
            });
        } catch (error) {
            console.error(error.response?.data || error.message || error);
            await interaction.editReply({
                content: '❌ (っ °Д °;)っ Uhhhhhh...I think sth went wrong there.',
            });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

const app = express();
app.get('/', (req, res) => {
    res.send('Pupu is still alive!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Web server is running on port ${PORT}`);
});
