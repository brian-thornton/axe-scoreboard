import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import ActiveMatchTable from './ActiveMatchTable';
import DoublePlayerTurn from './DoublePlayerTurn';
import PlayersList from './PlayersList';
import PlayerTurn from './PlayerTurn';
import MatchComplete from './MatchComplete';
import NoMatchPlayers from './NoMatchPlayers';
import ScoreButtons from './ScoreButtons';
import styles from './Match.module.css';

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
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [isMatchStarted, setIsMatchStarted] = useState(false);
  const [isMatchComplete, setIsMatchComplete] = useState(false);
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [winner, setWinner] = useState();
  const [players, setPlayers] = useState(matchPlayers);
  const [tiedPlayers, setTiedPlayers] = useState([]);
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
    setIsTie(false)
    setTiedPlayers([]);

    if (players.length > 1 && localStorage['laneConfig'] === 'sideBySideTargets') {
      setCurrentPlayers(players.slice(0, 2));
    } else {
      setCurrentPlayer(players[0]);
    }

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
      player.dropped = false;
      player.matchTotal = 0;
      player.remainingKillshots = 2;
      player.totalKillshots = 2;
      player.killshotOneEnabled = true;
      player.killshotTwoEnabled = false;
      player.killshotThreeEnabled = false;
    });
  }

  const playersDefined = players.filter((player) => player.name !== '').length > 0;

  const isMatchTied = () => {
    const playerScores = players.map((player) => player.matchTotal);
    const maxScore = Math.max(...playerScores);

    if (!tiedPlayers.length) {
      setTiedPlayers(players.filter((p) => p.matchTotal === maxScore));
    }

    return {
      result: players.filter((p) => p.matchTotal === maxScore).length > 1,
      tiedPlayers: players.filter((p) => p.matchTotal === maxScore),
    }
  };

  const appendToExistingMatchHistory = (existingHistory, players, matchWinner) => {
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
  }

  const completeMatch = () => {
    setIsMatchComplete(true);

    if (players.length > 1) {
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
        appendToExistingMatchHistory(existingHistory, players, matchWinner);
      } else {
        localStorage.setItem('matchHistory', JSON.stringify(newMatchHistory));
      }
    }
  };

  const addOvertimeThrow = () => {
    const newPlayers = [...players];
    newPlayers.map((player) => {
      player.matchThrows[currentRound + 1] = 0;
    });
    setPlayers(newPlayers);
  };

  const handleEndMatch = () => {
    zeroScores();
    setCurrentRound(null);
    setCurrentPlayer(null);
    setIsMatchStarted(false);
    setIsMatchComplete(false);
    setWinner(undefined);
  };

  const onModifyScore = (score, isKillshot = false) => {
    const newPlayers = [...players];
    const player = newPlayers.find((player) => player.id === editCell.player?.id);
    player.matchThrows[editCell.matchThrow] = score === 'drop' ? 0 : score;
    player.matchTotal = Object.keys(player.matchThrows).reduce((accumulator, mt) => {
      return accumulator + player.matchThrows[mt];
    }, 0);

    if (isKillshot) {
      player.remainingKillshots -= 1;

      if (player.killshotOneEnabled) {
        player.killshotOneEnabled = false;
        player.killshotTwoEnabled = true;
      } else if (player.killshotTwoEnabled) {
        player.killshotTwoEnabled = false;
      }
    }

    setPlayers(newPlayers);
    setEditCell(null);
  };

  const onCompleteRound = () => {
    const currentPlayerIndex = players.findIndex((player) => player.id === currentPlayer.id);

    if (currentRound >= 10 && currentPlayerIndex === players.length - 1) {
      setLastThrowComplete(true);
      setCurrentPlayer(players[0]);
      setCurrentRound(currentRound + 1);

      if (isTie) {
        const newTiedPlayers = [...tiedPlayers];
        const tiedPlayerScores = newTiedPlayers.map((player) => player.matchTotal);
        const maxTiedScore = Math.max(...tiedPlayerScores);
        const updatedTiedPlayers = newTiedPlayers.filter((p) => p.matchTotal === maxTiedScore);
        setTiedPlayers(updatedTiedPlayers);
        setCurrentPlayer(updatedTiedPlayers[0]);

        const knockedOutPlayers = newTiedPlayers.filter((p) => p.matchTotal !== maxTiedScore);
        const newPlayers = [...players];
        knockedOutPlayers.map((player) => {
          newPlayers.find((p) => p.id === player.id).matchThrows = player.matchThrows;
        });

        setPlayers(newPlayers);

        if (updatedTiedPlayers.length === 1) {
          completeMatch();
        } else {
          addOvertimeThrow();
        }

        return;
      } else {
        const matchTied = isMatchTied();

        if (players.length > 1 && matchTied.result) {
          setIsTie(true);

          let nextElegiblePlayer;
          players.slice(currentPlayerIndex, players.length).map((player) => {
            if (tiedPlayers.find((tiedPlayer) => tiedPlayer.id === player.id)) {
              nextElegiblePlayer = player;
            } else {
              nextElegiblePlayer = matchTied.tiedPlayers[0];
            }
          });
          setCurrentPlayer(nextElegiblePlayer);
          addOvertimeThrow();
        } else {
          completeMatch();
        }
      }
    } else if (currentPlayerIndex === players.length - 1) {
      setCurrentPlayer(players[0]);
      setCurrentRound(currentRound + 1);
    } else {
      if (!isTie) {
        setCurrentPlayer(players[currentPlayerIndex + 1]);
      } else {
        const currentTiePlayerIndex = tiedPlayers.findIndex((player) => player.id === currentPlayer.id);
        if (currentTiePlayerIndex === tiedPlayers.length - 1) {
          setCurrentPlayer(tiedPlayers[0]);
          addOvertimeThrow();
          setCurrentRound(currentRound + 1);
        } else {
          setCurrentPlayer(tiedPlayers[currentTiePlayerIndex + 1]);
        }
      }
    }

    if (isTie && !isMatchTied().result) {
      const currentTiePlayerIndex = tiedPlayers.findIndex((player) => player.id === currentPlayer.id);

      if (currentTiePlayerIndex === tiedPlayers.length - 1) {
        completeMatch();
      }
    }
  };

  const buttonColumn = (onClick, text, cols = "4") => (
    <Col lg={cols} md={cols} sm={cols} xs={cols}>
      <Button className={styles.button} variant="outline-primary" onClick={onClick}>{text}</Button>
    </Col>
  );

  const activeMatchTable = (
    <ActiveMatchTable
      editCell={editCell}
      setEditCell={setEditCell}
      tiedPlayers={tiedPlayers}
      isTie={isTie}
      isMatchComplete={isMatchComplete}
      currentPlayer={currentPlayer}
      currentRound={currentRound}
      winner={winner}
      players={players}
    />
  );

  const onBeginMatch = () => {
    if (players.length > 1 && localStorage['laneConfig'] === 'sideBySideTargets') {
      setCurrentPlayers(players.slice(0, 2));
    } else {
      setCurrentPlayer(players[0]);
    }

    setIsAddPlayerOpen(false)
    setCurrentRound(1);
    setIsMatchStarted(true);
  };

  const onSetMatchPlayers = (pendingMatchPlayers) => {
    const playersReadyForMatch = pendingMatchPlayers.map((pending) => {
      return {
        id: pending.id,
        name: pending.name,
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
        dropped: false,
        matchTotal: 0,
        remainingKillshots: 2,
        totalKillshots: 2,
        killshotOneEnabled: true,
        killshotTwoEnabled: false,
        killshotThreeEnabled: false,
      }
    });

    setPlayers(playersReadyForMatch);
  };

  return (
    <>
      {!playersDefined && (
        <>
          {!isAddPlayerOpen && <NoMatchPlayers setIsAddPlayerOpen={setIsAddPlayerOpen} />}
          {isAddPlayerOpen && <PlayersList editEnabled={false} selectEnabled={true} selectedPlayers={players} setSelectedPlayers={onSetMatchPlayers} />}
        </>
      )}
      {(playersDefined && !isMatchStarted) && (
        <>
          {players.length && activeMatchTable}
          <>
            <Button
              disabled={!playersDefined}
              variant='primary'
              onClick={onBeginMatch}
            >
              {players.length > 1 ? 'Begin Match' : 'Begin Practice'}
            </Button>
          </>
          {isAddPlayerOpen && !isMatchStarted && <PlayersList editEnabled={false} selectEnabled={true} selectedPlayers={players} setSelectedPlayers={onSetMatchPlayers} />}
        </>
      )}
      {(playersDefined && isMatchStarted && !isMatchComplete) && (
        <>
          {players.length && <ActiveMatchTable editCell={editCell} setEditCell={setEditCell} tiedPlayers={tiedPlayers} isTie={isTie} isMatchComplete={isMatchComplete} currentPlayer={currentPlayer} currentRound={currentRound} winner={winner} players={players} />}
          {isAddPlayerOpen && <PlayersList editEnabled={false} selectEnabled={true} selectedPlayers={players} setSelectedPlayers={onSetMatchPlayers} />}
          {editCell && (
            <Container fluid>
              <Row>
                <div className={styles.editingLabel}>{`Now Editing: Throw ${editCell.matchThrow} for ${editCell.player.name}`}</div>
              </Row>
              <Row>
                <Col sm="3" md="3" lg="3" xl="3" />
                <Col sm="6" md="6" lg="6" xl="6">
                  <ScoreButtons isEdit={true} currentPlayer={editCell.player} onScore={onModifyScore} setPlayers={setPlayers} players={players} />
                </Col>
              </Row>
              <Row className={styles.row}>
                <Col sm="3" md="3" lg="3" xl="3" />
                {buttonColumn(() => setEditCell(null), 'Cancel Edit', "6")}
              </Row>
            </Container>
          )}
          {!editCell && localStorage["laneConfig"] === 'singleTarget' && (
            <PlayerTurn
              handleEndMatch={handleEndMatch}
              isTie={isTie}
              completeRound={onCompleteRound}
              currentPlayer={currentPlayer}
              players={players}
              currentRound={currentRound}
              setPlayers={setPlayers} />
          )}
          {!editCell && localStorage["laneConfig"] === 'sideBySideTargets' && (
            <DoublePlayerTurn
              handleEndMatch={handleEndMatch}
              isTie={isTie}
              completeRound={onCompleteRound}
              currentPlayers={currentPlayers}
              players={players}
              currentRound={currentRound}
              setPlayers={setPlayers}
            />
          )}
        </>
      )}
      {playersDefined && isMatchComplete && (
        <>
          {players.length && activeMatchTable}
          <MatchComplete goToLeaderboard={goToLeaderboard} startNextMatch={startNextMatch} players={players} winner={winner} />
        </>
      )}
    </>
  );
};

export default Match;