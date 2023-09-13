const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, BaseSelectMenuComponent, ButtonBuilder, ButtonStyle } = require("discord.js");
const { compareAll } = require("../data/jsonFunctions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll to choose which game to play with other users'),
  async execute(interaction) {
    
    //all members even if offline; 
    memberIds = (await interaction.guild.members.fetch()).map(member=> member.id);
    const commonGames = compareAll(memberIds);
    console.log(commonGames);
    
    // sort the games by count of users who play it by using array of arrays
    const sortedGames = Object.entries(commonGames).sort((a, b) => {
      return b[1].length - a[1].length;
    });

    const embed = new EmbedBuilder()
    .setColor("Gold")
    .setFooter(`Which game do you want to play with  ${interaction.user}`)

    const buttons = [];
    for (const [gameId, userIds] of sortedBuckets) {
      const label = `Upvote ${gameId} (${userIds.length})`;
      const customId = `upvote_${gameId}`;
      const button = new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(ButtonStyle.Primary);
      buttons.push(button);
    }

    const buttonRow = new ActionRowBuilder().addComponents(buttons);

    // send the message with the buttons
    const message = await interaction.channel.send({
      embeds: [embed],
      components: [buttonRow]
    });
    
    // listen for button clicks and update the upvote count for the corresponding game
    const collector = message.createMessageComponentCollector({
      filter: i => i.isButton(),
    });
    
    collector.on('collect', async i => {
      const game = i.customId;
      const currentUpvotes = gameUpvotes.get(game);
      gameUpvotes.set(game, currentUpvotes + 1);
      await i.update({
        components: [buttonRow]
      });
    });
  
}

}