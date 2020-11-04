const Dimension = require('dimensions-ai');
const configs = require('./configs');
let Tournament = Dimension.Tournament;
let Logger = Dimension.Logger;

// Setup the rps envionment and integrate with dimensions-ai
let pathtorunner = "./run.sh";
let rps = Dimension.Design.createCustom('rps', {
  resultHandler: (res) => {
    try {
      // we run only one match, so we take the first element
      let rewards = JSON.parse(res[0])
      rewards = rewards.map((r, index) => {
        return {
          agentID: index,
          score: r
        }
      });
      rewards.sort((a, b) => b.score - a.score)
      let results = rewards.map((info, index) => {
        return {
          agentID: info.agentID,
          rank: index + 1
        }
      });
      return {ranks: results}
    } catch(err) {
      console.error('Unexpected results', res);
      return {ranks: [], message: 'match error!'};
    }
  },
  command: pathtorunner,
  arguments: ['D_FILES']
});

// Create the dimension with the halite 4 environment
let rpsDimension = Dimension.create(rps, {
  name: 'rps Dimension',
  observe: configs.activateAPI,
  activateStation: configs.activateAPI,
  id: 'rps'
})


// Create our tournament
let tourney = rpsDimension.createTournament(configs.botlist, {
  type: Tournament.Type.LADDER,
  id: 'rpsLadder',
  name: 'Your RPS Ladder',
  rankSystem: configs.rankSystem,
  loggingLevel: Logger.LEVEL.WARN,
  consoleDisplay: true,
  defaultMatchConfigs: {
    loggingLevel: Logger.LEVEL.NONE,
    storeErrorLogs: configs.storeErrorLogs
  },
  resultHandler: (res) => {
    return {ranks: res.ranks};
  },
  agentsPerMatch: [2],
  tournamentConfigs: {
    maxConcurrentMatches: configs.maxConcurrentMatches,
    storePastResults: false,

    maxTotalMatches: configs.maxTotalMatches,

    endDate: configs.endDate,
  }
});
// run the tournament
tourney.run();