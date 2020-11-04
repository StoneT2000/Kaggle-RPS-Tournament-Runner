/**
 * Configuration for the RPS tournament runner
 */

/**
 * The participating competitors, add and remove from this list and provide a 
 * path to the file for the agent and a identifying name 
 * e.g { file: "path/to/bot.py", name: "my_name" }
 */ 
let botlist = [
  { file: "agents/rock.py", name: "rock only" },
  { file: "agents/paper.py", name: "paper only" },
  { file: "agents/random.py", name: "random" }, 
  { file: "agents/random.py", name: "random agent 2" }, 
  { file: "agents/random.py", name: "random agent 3" }, 
]

const configs = {
  // rank system to use, choose from ELO, Microsoft TrueSkill, or total Win Loss
  rankSystem: "elo", // "trueskill", "wins"

  // whether or not to store standard error output of each episode
  storeErrorLogs: false,

  // maximum concurrent matches
  maxConcurrentMatches: 4,

  // set to a positive number to make tournament stop running after some number of matches / episodes
  maxTotalMatches: null,

  // to end tournament after 1 hour = 1 * 60 mins * 60 s * 1000 ms set it as
  // endDate: new Date((new Date().valueOf() + 1 * 60 * 60 * 1000))
  endDate: null,

  // whether to activate live tournament API
  activateAPI: false,
}
configs.botlist = botlist;

module.exports = configs;