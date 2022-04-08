import React, {  useState } from 'react';
import { Button } from 'react-bootstrap';

import Match from './Match';
import Leaderboard from './Leaderboard';

const MatchManager = () => {
  const [isMatchStarted, setIsMatchStarted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(true);
  const [matchHistory, setMatchHistory] = useState([]);
  const [matchPlayers, setMatchPlayers] = useState([]);

  const zeroMatchPlayerScores = () => {
    const players = [];

    matchPlayers?.map((player) => {
      return players.push({
        ...player,
        matchThrows: {
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
        },
        matchTotal: 0,
      });
    });

    setMatchPlayers(players);
  };

  const startMatch = () => {
    setIsMatchStarted(true);
    setShowLeaderboard(false);
    zeroMatchPlayerScores();
  }

  return (
    <>
      {(!isMatchStarted && !showLeaderboard) && <Button onClick={startMatch}>Start New Match</Button>}
      {(isMatchStarted && !showLeaderboard) && <Match setMatchPlayers={setMatchPlayers} matchPlayers={matchPlayers} setShowLeaderboard={setShowLeaderboard} matchHistory={matchHistory} setMatchHistory={setMatchHistory} isMatchStarted={isMatchStarted} setIsMatchStarted={setIsMatchStarted} />}
      {showLeaderboard && <Leaderboard startMatch={startMatch} matchHistory={matchHistory} matchPlayers={matchPlayers} setMatchPlayers={setMatchPlayers} />}
    </>
  );
};

export default MatchManager;