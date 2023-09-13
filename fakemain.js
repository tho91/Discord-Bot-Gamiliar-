// const { compareWith } = require('./data/jsonFunctions');
const jsonFunctions = require('./data/jsonFunctions')
const steamAPI = require('./imports/steamAPI')



//TEST MAIN FOR DB FUNCTIONS

// //addUser with game optional
// jsonFunctions.addUser('Tony','MarioBros');
// jsonFunctions.addUser('phoenix123','fifa 10');
// jsonFunctions.addUser('michael232');

// //list all user Games 
// jsonFunctions.allUserGames((gameIDs) => {
//   console.log(gameIDs);
// });

// const steamList = steamAPI.getSteamGames("76561197998736129");
// console.log(steamAPI.removeSteam("499045651397738496"));
// console.log(jsonFunctions.getGameList("499045651397738496"));
// jsonFunctions.setSteamID("499045651397738496", "this is the new SteamID hello")