import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";

import ActiveMatchTable from './ActiveMatchTable';
import EditScoreControls from './EditScoreControls';
import { totalScores, updateKillshots } from './playerHelper';
import PlayerTurn from './PlayerTurn';
import TeamSelect from './TeamSelect';
import styles from './TeamMatch.module.css';

const TeamMatch = ({ }) => {
  const [isMatchStarted, setIsMatchStarted] = useState(false);
  const [matchTeams, setMatchTeams] = useState();
  const [currentPlayerOne, setCurrentPlayerOne] = useState();
  const [currentPlayerTwo, setCurrentPlayerTwo] = useState();
  const [teamOneEditCell, setTeamOneEditCell] = useState();
  const [teamTwoEditCell, setTeamTwoEditCell] = useState();
  const [teamOneComplete, setTeamOneComplete] = useState(false);
  const [teamTwoComplete, setTeamTwoComplete] = useState(false);
  const [isTie, setIsTie] = useState(false);

  useEffect(() => {
    if (matchTeams?.length) {
      setIsMatchStarted(true);
      setCurrentPlayerOne(matchTeams[0].players.find((p) => p.id === matchTeams[0].currentPlayer));
      setCurrentPlayerTwo(matchTeams[1].players.find((p) => p.id === matchTeams[1].currentPlayer));
    }
  }, [matchTeams]);

  const onSetPlayers = (players, teamId) => {
    const newMatchTeams = [...matchTeams];
    const team = newMatchTeams.find((team) => team.id === teamId);
    team.players = players;
    setMatchTeams(newMatchTeams);
  };

  const addOvertimeThrow = () => {
    const newMatchTeams = [...matchTeams];

    newMatchTeams.map((team) => {
      team.players.map((player) => {
        player.matchThrows[player.currentRound] = 0;
      });
    });

    setMatchTeams(newMatchTeams);
  };

  const completeRound = (teamId) => {
    const newMatchTeams = [...matchTeams];
    const team = newMatchTeams.find((team) => team.id === teamId);
    const currentPlayer = team.players.find((p) => p.id === team.currentPlayer);

    let allPlayersComplete = true;
    newMatchTeams.find((team) => team.id === teamId).players.forEach((player) => {
      if (Object.keys(player.matchThrows).length >= player.currentRound) {
        allPlayersComplete = false;
      }
    });

    const appendToExistingMatchHistory = (existingHistory, matchTeams, matchWinner) => {
      existingHistory.push({
        matchDate: new Date(),
        teams: matchTeams,
        winner: matchWinner,
      });

      localStorage.setItem('matchHistory', JSON.stringify(existingHistory));
    }

    const setComplete = matchTeams[0].id === teamId ? setTeamOneComplete : setTeamTwoComplete;
    setMatchTeams(totalScores(newMatchTeams));

    if (!allPlayersComplete && currentPlayer.currentRound > 10) {
      onEndTurn(teamId);
    } else if (allPlayersComplete) {

      if (matchTeams[0].totalScore === matchTeams[1].totalScore) {
        setIsTie(true);
        addOvertimeThrow();
        setTeamOneComplete(false);
        setTeamTwoComplete(false);
        onEndTurn(matchTeams[0].id);
        onEndTurn(matchTeams[1].id);
      } else {
        const existingHistoryRaw = localStorage.getItem('matchHistory');
        let existingHistory;
        if (existingHistoryRaw) {
          existingHistory = JSON.parse(existingHistoryRaw);
        }

        // if (existingHistory) {
        //   appendToExistingMatchHistory(existingHistory, matchTeams, matchTeams[0].totalScore > matchTeams[1].totalScore ? matchTeams[0] : matchTeams[1]);
        // } 

        setComplete(true);
      }
    }
  };

  const onEndTurn = (teamId) => {
    const newMatchTeams = [...matchTeams];
    const team = newMatchTeams.find((team) => team.id === teamId);
    const currentPlayerIndex = team.players.findIndex((p) => p.id === team.currentPlayer);
    team.currentPlayer = team.players[currentPlayerIndex + 1]?.id || team.players[0].id;
    setMatchTeams(newMatchTeams);
  };

  const onModifyScore = (score, isKillshot = false) => {
    const editPlayers = teamOneEditCell ? matchTeams[0].players : matchTeams[1].players;
    const editCell = teamOneEditCell ? teamOneEditCell : teamTwoEditCell;

    const newPlayers = [...editPlayers];
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

    const newMatchTeams = [...matchTeams];
    if (teamOneEditCell) {
      newMatchTeams[0].players = newPlayers;
    } else {
      newMatchTeams[1].players = newPlayers;
    }

    setMatchTeams(totalScores(newMatchTeams));
    setTeamOneEditCell(null);
    setTeamTwoEditCell(null);
  };

  return (
    <>
      {!isMatchStarted && <TeamSelect setSelectedTeams={setMatchTeams} />}
      {isMatchStarted && currentPlayerOne && currentPlayerTwo && (
        <>
          {matchTeams?.map((team, index) => {
            const currentPlayer = team.players.find((p) => p.id === team.currentPlayer);
            const editCell = index === 0 ? teamOneEditCell : teamTwoEditCell;
            const setEditCell = index === 0 ? setTeamOneEditCell : setTeamTwoEditCell;

            return (
              <>
                <h5>{`${team.name} (${team.totalScore || 0})`}</h5>
                <ActiveMatchTable
                  editCell={editCell}
                  setEditCell={setEditCell}
                  currentRound={currentPlayer.currentRound}
                  currentPlayer={currentPlayer}
                  players={team.players}
                />
              </>
            )
          })}
          {teamOneComplete && teamTwoComplete && (
            <>
              <h5>{`Winner: ${matchTeams[0].totalScore > matchTeams[1].totalScore ? matchTeams[0].name : matchTeams[1].name}`}</h5>
              <Button onClick={() => {
                setMatchTeams(null);
                setTeamOneComplete(false);
                setTeamTwoComplete(false);
                setIsMatchStarted(false);
              }}>Next Match</Button>
            </>
          )}
          {(!teamOneComplete || !teamTwoComplete) && (
            <Container fluid>
              <Row>
                <Col sm="6" md="6" lg="6" xl="6">
                  {teamOneComplete && (
                    <h1>Waiting on Other Team</h1>
                  )}
                  {!teamOneComplete && teamOneEditCell && (
                    <EditScoreControls
                      isEdit={true}
                      onModifyScore={onModifyScore}
                      editCell={teamOneEditCell}
                      setEditCell={setTeamOneEditCell}
                    />
                  )}
                  {!teamOneComplete && !teamOneEditCell && (
                    <PlayerTurn
                      showEndMatch={false}
                      showTarget={false}
                      currentPlayer={currentPlayerOne}
                      players={matchTeams[0].players}
                      setPlayers={onSetPlayers}
                      completeRound={completeRound}
                      currentRound={currentPlayerOne.currentRound}
                      teamId={matchTeams[0].id}
                      endTurn={onEndTurn}
                    />
                  )}
                </Col>
                <Col sm="6" md="6" lg="6" xl="6">
                  {teamTwoComplete && (
                    <h1>Waiting on Other Team</h1>
                  )}
                  {!teamTwoComplete && teamTwoEditCell && (
                    <EditScoreControls
                      isEdit={true}
                      onModifyScore={onModifyScore}
                      editCell={teamTwoEditCell}
                      setEditCell={setTeamTwoEditCell}
                    />
                  )}
                  {!teamTwoComplete && !teamTwoEditCell && (
                    <PlayerTurn
                      showEndMatch={false}
                      showTarget={false}
                      currentPlayer={currentPlayerTwo}
                      players={matchTeams[1].players}
                      setPlayers={onSetPlayers}
                      completeRound={completeRound}
                      currentRound={currentPlayerTwo.currentRound}
                      teamId={matchTeams[1].id}
                      endTurn={onEndTurn}
                    />
                  )}
                </Col>
              </Row>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default TeamMatch;