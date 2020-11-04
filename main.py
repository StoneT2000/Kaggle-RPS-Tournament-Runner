import sys
from kaggle_environments import evaluate
args = sys.argv
agents=[args[1], args[2]]
rewards = evaluate("rps", agents=agents, configuration={"episodeSteps": 1000})
print('\nD_MATCH_FINISHED')
print(rewards[0])