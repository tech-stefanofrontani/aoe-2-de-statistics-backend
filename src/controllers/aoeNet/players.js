const axios = require("axios");
const { Team, Match } = require('../../entities');

const getMatchesByPlayer = async (req, res) => {
  console.log("matches called");
  const { query } = req;
  const game = query.game || "aoe2de";
  const count = query.count || "1000";
  const start = query.start || "0";
  const queryPlayersSteamIds = query.playersIds.includes(",") ? query.playersIds.split(",") : [ query.playersIds ];
  const team = new Team(queryPlayersSteamIds);

  axios({
    method: "GET",
    url: `https://aoe2.net/api/player/matches?game=${game}&steam_id=${queryPlayersSteamIds[0]}&start=${start}&count=${count}`,  
  }).then(response => {
    const apiMatches = response.data;
    const matches = apiMatches
      .filter((_match) => Match.isMatchPlayedWithTeamPlayers(_match, queryPlayersSteamIds))
      .map(_match => {
        const match = new Match({ ranked: _match.ranked, players: _match.players, ratingType: _match.rating_type, teamFriendsSteamIds: queryPlayersSteamIds });
        return match;
      });

    matches.forEach((match) => {
      team.addMatch(match);
    });

    res.send(team);
  });
};

module.exports = {
  getMatchesByPlayer
}