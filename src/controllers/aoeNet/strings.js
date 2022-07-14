const axios = require("axios");
const { Team } = require('../../entities');

function isMatchPlayedWithFriends(match, playerId, friendsPlayersIds) {
  const matchPlayers = match.players;
  const myTeam = matchPlayers.find(player => player.steam_id == playerId).team;
  for (let friendPlayerId of friendsPlayersIds) {
    const friendFound = matchPlayers.filter(player => (player.team == myTeam)).find(player => (player.steam_id == friendPlayerId));
    if(friendFound) return true;
  };
  return false;
};

const getStrings = async (req, res) => {
  const { query } = req;
  const game = query.game || "aoe2de";
  const language = query.language || "en";
  
  axios({
    method: "GET",
    url: `https://aoe2.net/api/strings?game=${game}&language=${language}`,  
  }).then(response => {
    const strings = response.data;
    res.send(strings);
  });
};

module.exports = {
  getStrings
};