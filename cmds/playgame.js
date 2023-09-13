
const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
class Game {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
  }
}

class Database {
  constructor() {
    this.games = [];
  }
  
  addGame(game) {
    this.games.push(game);
    console.log(`Added game: ${game.name}, genre: ${game.genre}`);
  }
}

const db = new Database();
module.exports = {
  
  data: new SlashCommandBuilder()
    .setName('playgame')
    .setDescription('Add multiple games to the database'),
  async execute(interaction) {
    
    const modal = new ModalBuilder()
      .setCustomId('addgames_addGamesModal')
      .setTitle('Add games to the database');
  
    const nameInput = new TextInputBuilder()
      .setCustomId('addgames_gameNameInput')
      .setLabel('Enter the name of the game')
      .setStyle(TextInputStyle.Short)
      //setStyle(TextInputStyle.Primary)

;
const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
  
    const genreInput = new TextInputBuilder()
      .setCustomId('addgames_gameGenreInput')
      .setLabel('Enter the genre of the game')
      .setStyle(TextInputStyle.Short);
      //setStyle(TextInputStyle.Primary);

      
      const secondActionRow = new ActionRowBuilder().addComponents(genreInput);
      
    modal.addComponents(firstActionRow,secondActionRow);
    await interaction.showModal(modal);
   // if (!interaction.isModalSubmit()) return;
  },
  async modelSubmit(interaction) {
    if (!interaction.isModalSubmit()) return;
    const name = interaction.fields.getTextInputValue('addgames_gameNameInput');
    const genre = interaction.fields.getTextInputValue('addgames_gameGenreInput');
    // Add the game to the database
    db.addGame(new Game(name, genre));



    await interaction.reply(`Added game: ${name}, genre: ${genre}`);
  }
};
