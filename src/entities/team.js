const Match = require("./match");

class Team {
  constructor(teamPlayers) {
    this.players = teamPlayers;
    this.matchesByRatingType = {};
  }

  addStructureForMatchesBy(ratingTypeId) {
    this.matchesByRatingType[ratingTypeId] = {
      all: { total: 0, matches: []},
      won: { total: 0, percentage: 0, matches: []},
      lost: { total: 0, percentage: 0, matches: []},
    }
  }

  calculatePercentageBy(rankingTypeId) {
    const totalWonMatches = this.matchesByRatingType[rankingTypeId].won.total;
    const totalLostMatches = this.matchesByRatingType[rankingTypeId].lost.total;
    const totalAllMatches = this.matchesByRatingType[rankingTypeId].all.total;
    
    this.matchesByRatingType[rankingTypeId] = {
      ...this.matchesByRatingType[rankingTypeId],
      won: {
        ...this.matchesByRatingType[rankingTypeId].won,
        percentage: Math.round((totalWonMatches / totalAllMatches) * 100) / 100
      },
      lost: {
        ...this.matchesByRatingType[rankingTypeId].lost,
        percentage: Math.round((totalLostMatches / totalAllMatches) * 100) / 100
      }
    }
  }

  addMatchWon(match) {
    if (!this.matchesByRatingType[match.ratingType]) {
      this.addStructureForMatchesBy(match.ratingType);
    }

    const totalAllMatches = this.matchesByRatingType[match.ratingType].all.total + 1;
    const allMatches = [ ...this.matchesByRatingType[match.ratingType].all.matches, match ]
    const totalWonMatches = this.matchesByRatingType[match.ratingType].won.total + 1;
    const wonMatches = [ ...this.matchesByRatingType[match.ratingType].won.matches, match ]

    this.matchesByRatingType[match.ratingType] = {
      ...this.matchesByRatingType[match.ratingType],
      won: {
        ...this.matchesByRatingType[match.ratingType].won,
        total: totalWonMatches,
        matches: wonMatches
      },
      all: {
        ...this.matchesByRatingType[match.ratingType].all,
        total: totalAllMatches,
        matches: allMatches
      }
    }
    this.calculatePercentageBy(match.ratingType);
  }

  addMatchLost(match) {
    if (!this.matchesByRatingType[match.ratingType]) {
      this.addStructureForMatchesBy(match.ratingType);
    }

    const totalAllMatches = this.matchesByRatingType[match.ratingType].all.total + 1;
    const allMatches = [ ...this.matchesByRatingType[match.ratingType].all.matches, match ]
    const totalLostMatches = this.matchesByRatingType[match.ratingType].lost.total + 1;
    const lostMatches = [ ...this.matchesByRatingType[match.ratingType].lost.matches, match ]

    this.matchesByRatingType[match.ratingType] = {
      ...this.matchesByRatingType[match.ratingType],
      lost: {
        ...this.matchesByRatingType[match.ratingType].lost,
        total: totalLostMatches,
        matches: lostMatches
      },
      all: {
        ...this.matchesByRatingType[match.ratingType].all,
        total: totalAllMatches,
        matches: allMatches
      }
    }
    this.calculatePercentageBy(match.ratingType);
  }

  addMatch(match) {
    if (match.won) {
      this.addMatchWon(match);
    } else {
      this.addMatchLost(match);
    }
  };
}

module.exports = Team;