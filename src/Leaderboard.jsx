import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React from "react";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import logo from "./target.svg";
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
      {!matchHistory?.length && (
        <Card className={styles.noHistoryCard}>
          <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Container fluid>
              <Row style={{ marginBottom: "20px" }}>
                <img src={logo} alt="Axe" />
              </Row>
              <Row style={{ marginBottom: "20px" }}>
                No Match Data. Play a match to view Leaderboard data.
              </Row>
              <Row>
                <Button onClick={startMatch}>Start Match</Button>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Leaderboard;