export const updateKillshots = (player) => {
  const updatedPlayer = [...player];

  updatedPlayer.remainingKillshots -= 1;

  if (updatedPlayer.killshotOneEnabled) {
    updatedPlayer.killshotOneEnabled = false;
    updatedPlayer.killshotTwoEnabled = true;
  } else if (updatedPlayer.killshotTwoEnabled) {
    updatedPlayer.killshotTwoEnabled = false;
  }

  return updatedPlayer;
}

export const totalScores = (teams) => {
  const newTeams = [...teams];

  newTeams.forEach((team) => {
    let teamScore = 0;
    team.players.forEach((player) => {
      teamScore += player.matchTotal;
    });

    team.totalScore = teamScore;
  });

  return newTeams;
};

export const zeroPlayerScore = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
};

export default zeroPlayerScore;