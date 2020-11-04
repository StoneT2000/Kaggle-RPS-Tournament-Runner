import sys
from kaggle_environments import evaluate
args = sys.argv
agents=[args[1], args[2]]
### Do not edit above

rewards = evaluate("rps", agents=agents, configuration={"episodeSteps": 1000})

### Do not edit below
print('\nD_MATCH_FINISHED')
print(rewards[0])