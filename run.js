const Dimension = require('dimensions-ai');
let Tournament = Dimension.Tournament;
let Logger = Dimension.Logger;

// Setup the halite 4 envionment and integrate with dimensions-ai
let pathtorunner = "./run.sh";
let rps = Dimension.Design.createCustom('rps', {
  resultHandler: (res) => {
    try {
      // we run only one episode, so we take the first element
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
  observe: false,
  activateStation: false, // turns off the API
  id: 'rps'
})

/**
 * The participating competitors, add and remove from this list and provide a 
 * path to the file for the agent and a identifying name 
 * e.g { file: "path/to/bot.py", name: "my_name" }
 */ 
let botlist = [
  { file: "agents/rock.py", name: "rock only" },
  { file: "agents/paper.py", name: "paper only" },
  { file: "agents/random.py", name: "random" }, 
]

// Create our tournament
let tourney = rpsDimension.createTournament(botlist, {
  type: Tournament.Type.LADDER,
  id: 'rpsLadder',
  name: 'Your RPS Ladder',
  // change to Tournament.RankSystemTypes.TRUESKILL for Trueskill ranking
  // change to Tournament.RankSystemTypes.WINS for ranking by total wins / losses
  rankSystem: Tournament.RankSystemTypes.ELO, 
  loggingLevel: Logger.LEVEL.WARN,
  consoleDisplay: true,
  defaultMatchConfigs: {
    loggingLevel: Logger.LEVEL.NONE,
    storeErrorLogs: true // change to false to stop generating error logs from matches
  },
  resultHandler: (res) => {
    return {ranks: res.ranks};
  },
  agentsPerMatch: [2],
  tournamentConfigs: {
    maxConcurrentMatches: 1,
    storePastResults: false,

    // maxTotalMatches: 100,

    // end after 1 hour = 1 * 60 mins * 60 s * 1000 ms
    // endDate: new Date((new Date().valueOf() + 1 * 60 * 60 * 1000))
  }
});
// run the tournament
tourney.run();