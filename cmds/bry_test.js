const fetch = require("node-fetch");
const {RichEmbed} = require("discord.js");
const { SlashCommandBuilder } = require('discord.js');

module.exports =
{
    data: new SlashCommandBuilder()
        .setName("bry")
        .setDescription("test")
        .addStringOption(option => 
            option
                .setName("arg")
                .setDescription("need args")
        ),
    execute: async (interact) =>
    {
        const token = "3F7A550C2BFDF567B183F6A5448A8EA1"
        //if(! ) return "Please provide a account name. (Make sure your )";
        const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${ interact.options.getString("arg") }`;

        fetch(url).then(res => res.json()).then(body =>
        {
            if (body.response.success === 42) return interact.reply("There is no steam profile with that name");

            const id = body.response.steamid;
            const library = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${token}&steamid=${id}&format=json`;

            interact.channel.send(id);
            
            fetch(library).then(res => res.json()).then(body => {
                if (body.response.success === 42) return interact.reply("Lib. Not Found");

                interact.reply( String(body.response.game_count) );
            });
        });



    }

}