import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import ActiveMatchTable from './ActiveMatchTable';
import AddPlayer from './AddPlayer';
import PlayerTurn from './PlayerTurn';
import MatchComplete from './MatchComplete';
import NoMatchPlayers from './NoMatchPlayers';

const Match = ({
  matchPlayers,
  matchHistory,
  setMatchPlayers,
  setMatchHistory,
  setShowLeaderboard,
}) => {
  const [lastThrowComplete, setLastThrowComplete] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState();
  const [isMatchStarted, setIsMatchStarted] = useState(false);
  const [isMatchComplete, setIsMatchComplete] = useState(false);
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [winner, setWinner] = useState();
  const [players, setPlayers] = useState(matchPlayers);
  const [editCell, setEditCell] = useState();
  const [isTie, setIsTie] = useState(false);

  const goToLeaderboard = () => {
    setMatchPlayers([]);
    setIsMatchComplete(false);
    setIsMatchStarted(false);
    setShowLeaderboard(true);
  };

  const startNextMatch = () => {
    zeroScores();
    setCurrentRound(1);
    setCurrentPlayer(players[0]);
    setIsMatchStarted(true);
    setIsMatchComplete(false);
    setWinner(undefined);
  };

  const zeroScores = () => {
    players.map((player) => {
      player.matchThrows = {
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
      player.matchTotal = 0;
    });
  }

  const playersDefined = players.filter((player) => player.name !== '').length > 0;

  const isMatchTied = () => {
    const playerScores = players.map((player) => player.matchTotal);
    const maxScore = Math.max(...playerScores);
    const minScore = Math.min(...playerScores);
    const tie = maxScore === minScore;
    return tie;
  };

  const completeMatch = () => {
    setIsMatchComplete(true);

    const matchWinner = players.reduce(function (prev, current) {
      if (+current.matchTotal > +prev.matchTotal) {
        return current;
      } else {
        return prev;
      }
    });

    setWinner(matchWinner);

    const newMatchHistory = [...matchHistory];
    newMatchHistory.push({
      matchDate: new Date(),
      players: players.map((player) => {
        return {
          id: player.id,
          name: player.name,
          matchThrows: player.matchThrows,
          matchTotal: player.matchTotal,
        };
      }),
      winner: matchWinner,
    });
    setMatchHistory(newMatchHistory);

    const existingHistoryRaw = localStorage.getItem('matchHistory');
    let existingHistory;
    if (existingHistoryRaw) {
      existingHistory = JSON.parse(existingHistoryRaw);
    }

    if (existingHistory) {
      existingHistory.push({
        matchDate: new Date(),
        players: players.map((player) => {
          return {
            id: player.id,
            name: player.name,
            matchThrows: player.matchThrows,
            matchTotal: player.matchTotal,
          };
        }),
        winner: matchWinner,
      });

      localStorage.setItem('matchHistory', JSON.stringify(existingHistory));
    } else {
      localStorage.setItem('matchHistory', JSON.stringify(newMatchHistory));
    }
  };

  const addOvertimeThrow = () => {
    const newPlayers = [...players];
    newPlayers.map((player) => {
      player.matchThrows[currentRound + 1] = 0;
    });
    setPlayers(newPlayers);
  };

  return (
    <>
      {!playersDefined && (
        <>
          {!isAddPlayerOpen && <NoMatchPlayers setIsAddPlayerOpen={setIsAddPlayerOpen} />}
          {isAddPlayerOpen && <AddPlayer setIsAddPlayerOpen={setIsAddPlayerOpen} players={players} setPlayers={setPlayers} />}
        </>
      )}
      {(playersDefined && !isMatchStarted) && (
        <>
          {players.length && <ActiveMatchTable isMatchComplete={isMatchComplete} currentPlayer={currentPlayer} currentRound={currentRound} winner={winner} players={players} />}
          {!isAddPlayerOpen && (
            <>
              <Button variant='primary' onClick={() => setIsAddPlayerOpen(true)}>Add Player</Button>
              <Button
                disabled={!playersDefined}
                variant='primary'
                style={{ float: 'right' }}
                onClick={() => {
                  setCurrentRound(1);
                  setCurrentPlayer(players[0]);
                  setIsMatchStarted(true);
                }}>
                Begin Match
              </Button>
            </>
          )}
          {isAddPlayerOpen && <AddPlayer setIsAddPlayerOpen={setIsAddPlayerOpen} players={players} setPlayers={setPlayers} />}
        </>
      )}
      {(playersDefined && isMatchStarted && !isMatchComplete) && (
        <>
          {players.length && <ActiveMatchTable isMatchComplete={isMatchComplete} currentPlayer={currentPlayer} currentRound={currentRound} winner={winner} players={players} />}
          <PlayerTurn isTie={isTie} completeRound={() => {
            const currentPlayerIndex = players.findIndex((player) => player.id === currentPlayer.id);

            if (currentRound >= 10 && currentPlayerIndex === players.length - 1) {
              setLastThrowComplete(true);
              setCurrentPlayer(players[0]);
              setCurrentRound(currentRound + 1);

              if (isMatchTied()) {
                setIsTie(true);
                addOvertimeThrow();
              } else {
                completeMatch();
              }
            } else if (currentPlayerIndex === players.length - 1) {
              setCurrentPlayer(players[0]);
              setCurrentRound(currentRound + 1);
            } else {
              setCurrentPlayer(players[currentPlayerIndex + 1]);
            }
          }} currentPlayer={currentPlayer} players={players} currentRound={currentRound} setPlayers={setPlayers} />
        </>
      )}
      {playersDefined && isMatchComplete && (
        <>
          {players.length && <ActiveMatchTable isMatchComplete={isMatchComplete} currentPlayer={currentPlayer} currentRound={currentRound} winner={winner} players={players} />}
          <MatchComplete goToLeaderboard={goToLeaderboard} startNextMatch={startNextMatch} players={players} winner={winner} />
        </>
      )}
    </>
  );
};

export default Match;