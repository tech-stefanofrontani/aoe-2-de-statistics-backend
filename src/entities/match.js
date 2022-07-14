class Match {
  static isMatchPlayedWithTeamPlayers(match, teamFriendsSteamIds) {
    let counter = 0;
    const team = match.players.find((matchPlayer) => matchPlayer.steam_id == teamFriendsSteamIds[0]).team;
    teamFriendsSteamIds.forEach((teamFriendSteamId) => {
      const teamPlayerFound = match.players.find((matchPlayer) => (matchPlayer.team === team) && (matchPlayer.steam_id == teamFriendSteamId))
      if (teamPlayerFound) {
        counter++;
      };
    });
    return (match.players.length) === (teamFriendsSteamIds.length * 2) && (counter == teamFriendsSteamIds.length);
  };

  constructor({ ranked, players, ratingType, teamFriendsSteamIds }) {
    this.ranked = !!ranked;
    this.players = players;
    this.ratingType = ratingType;
    this.teams = this.setTeams(teamFriendsSteamIds);
    this.won = this.setMatchWon();
  };

  setTeams(teamFriendsSteamIds) {
    const friendsTeam = this.players.find((matchPlayer) => matchPlayer.steam_id == teamFriendsSteamIds[0]).team;
    return this.players.reduce((teams, matchPlayer) => {
      const teamName = matchPlayer.team === friendsTeam ? "friends" : "enemies";
      return { ...teams, [teamName]: [ ...teams[teamName], matchPlayer ] };
    }, { friends: [], enemies: []})
  };

  setMatchWon() {
    return this.teams.friends[0].won;
  }
}

module.exports = Match;