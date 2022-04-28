import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import React from "react";
import Table from "react-bootstrap/Table";

import NoMatchData from './NoMatchData';
import styles from './Leaderboard.module.css';

const Leaderboard = ({ startMatch, matchPlayers, setMatchPlayers }) => {
  const uniqueListOfPlayers = () => {
    const players = [];

    matchHistory.map((match) => {
      match.players.map((player) => {
        if (!players.map((p) => p.id).includes(player.id)) {
          players.push(player);
        }
      });
    });

    return players;
  };

  const getPlayerWins = (player) => {
    let wins = 0;

    matchHistory.map((match) => {
      match.players.map((matchPlayer) => {
        if (matchPlayer.id === player.id) {
          wins += match.winner.id === matchPlayer.id ? 1 : 0;
        }
      });
    });

    return wins;
  };

  const getPlayerLosses = (player) => {
    let losses = 0;

    matchHistory.map((match) => {
      match.players.map((matchPlayer) => {
        if (matchPlayer.id === player.id) {
          losses += match.winner.id === matchPlayer.id ? 0 : 1;
        }
      });
    });

    return losses;
  };

  const rows = () => {
    const rows = [];

    uniqueListOfPlayers().map((player) => {
      if (player.name !== '') {
        rows.push(
          <tr key={player.id}>
            <td>{player.name}</td>
            <td>{getPlayerWins(player)}</td>
            <td>{getPlayerLosses(player)}</td>
            <td><Form.Check
              type="checkbox"
              onChange={(event) => {
                if (event.target.checked) {
                  if (matchPlayers) {
                    setMatchPlayers([...matchPlayers, player]);
                  } else {
                    setMatchPlayers([player]);
                  }
                }
              }}
            /></td>
          </tr>
        );
      }
    });

    return rows;
  }

  const matchHistoryStorage = localStorage.getItem('matchHistory');
  let matchHistory = [];
  if (matchHistoryStorage) {
    matchHistory = JSON.parse(matchHistoryStorage);
  }

  return (
    <>
      {matchHistory?.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Player</th>
                <th>Matches Won</th>
                <th>Matches Lost</th>
              </tr>
            </thead>
            <tbody>
              {rows()}
            </tbody>
          </Table>
          <Button onClick={startMatch}>Start Match</Button>
        </>
      )}
      {!matchHistory?.length && <NoMatchData startMatch={startMatch} />}
    </>
  );
};

export default Leaderboard;