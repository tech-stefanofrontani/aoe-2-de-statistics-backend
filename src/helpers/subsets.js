function getAllSubsets(players) {
  const subsets = [[]];
  for (const player of players) {
      const last = subsets.length-1;
      for (let i = 0; i <= last; i++) {
          subsets.push( [...subsets[i], player] );
      };
  };
  return subsets;
};

function getAllTeams(players, maxNumberOfTeamPlayers) {
  let subsetsOfPlayers = getAllSubsets(players);
  let teams = [];
  for (let i = 2; i < maxNumberOfTeamPlayers + 1; i++) {
      teams = [ ...teams, ...subsetsOfPlayers.filter(subset => subset.length == i) ];
  }
  return teams;
}

module.exports = { getAllSubsets, getAllTeams }