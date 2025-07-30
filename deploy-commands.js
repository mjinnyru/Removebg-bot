  const { REST, Routes, SlashCommandBuilder } = require('discord.js');
  const e = require('express');
  require('dotenv').config();

  const commands = [
      new SlashCommandBuilder()
      .setName('removebg')
      .setDescription('Remove the background of an image')
      .addAttachmentOption(option =>
          option
          .setName('image')
          .setDescription('Image to remove background from')
          .setRequired(true)),
  ]
  .map(command => command.toJSON());

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  (async () => {
      try{
          console.log('Started refreshing application (/) commands.');

          //This for global commands
          await rest.put(
              Routes.applicationCommands(process.env.CLIENT_ID),
              {body: commands},
          );
          //This for guild commands
          // await rest.put(
          //     Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
          //     {body: commands}
          // );
          console.log('Successfully reloaded application (/) commands.');
      } catch(error){
          console.error(error);
      }
  })();
