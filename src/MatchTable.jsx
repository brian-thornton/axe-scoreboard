import Card from 'react-bootstrap/Card';
import React from "react";
import Table from "react-bootstrap/Table";

const MatchTable = ({ match }) => {
  const roundCell = (player, matchThrow) => {
    if (player.matchThrows[matchThrow] === 6) {
      return <td style={{ borderWidth: '2px', borderColor: 'red' }}>{player.matchThrows[matchThrow]}</td>;
    } else if (player.matchThrows[matchThrow] === 8) {
      return <td style={{ borderWidth: '2px', borderColor: 'blue' }}>{player.matchThrows[matchThrow]}</td>;
    }

    return <td>{player.matchThrows[matchThrow]}</td>
  };

  const totalCell = (player, winningTeam) => {
    if (winningTeam) {
      return <td style={{ backgroundColor: '#4dff00' }}>{player.matchTotal}</td>
    } else {
      if (match.winner?.id === player.id) {
        return <td style={{ backgroundColor: '#4dff00' }}>{player.matchTotal}</td>
      } else {
        return <td>{player.matchTotal}</td>
      }
    }
  }

  const playerRows = (players, winningTeam) => {
    const rows = [];

    players.filter((p) => p.name !== '').map((player) => {
      return rows.push(
        <tr key={player.id}>
          <td>{player.name}</td>
          {Object.keys(player.matchThrows).map((matchThrow) => {
            return roundCell(player, matchThrow);
          })}
          {totalCell(player, winningTeam)}
        </tr>
      );
    });

    return rows;
  };

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const matchDate = new Date(match.matchDate);

  const matchTable = () => {
    return (
      <>
        {!match.teams && (
          <Card border="dark" style={{ margin: '20px' }}>
            <Card.Header>Individual Match {matchDate.toLocaleDateString(undefined, options)} {matchDate.toLocaleTimeString('en-US')}</Card.Header>
            <Card.Body>
              <Table style={{ marginBottom: '20px' }} striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    {Object.keys(match.players[0].matchThrows).map((matchThrow) => {
                      if (matchThrow <= 10) {
                        return <th>{matchThrow}</th>
                      } else {
                        return <th style={{ backgroundColor: '#3de0fd' }}>{matchThrow}</th>
                      }
                    })}
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {playerRows(match.players)}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
        {match.teams && (
          <Card border="dark" style={{ margin: '20px' }}>
            <Card.Header>Team Match {matchDate.toLocaleDateString(undefined, options)} {matchDate.toLocaleTimeString('en-US')}</Card.Header>
            <Card.Body>
              <Table style={{ marginBottom: '20px' }} striped bordered hover>
                <thead>
                  <tr>
                    <th>{match.teams[0].name} ({match.teams[0].totalScore})</th>
                    {Object.keys(match.teams[0].players[0].matchThrows).map((matchThrow) => {
                      if (matchThrow <= 10) {
                        return <th>{matchThrow}</th>
                      } else {
                        return <th style={{ backgroundColor: '#3de0fd' }}>{matchThrow}</th>
                      }
                    })}
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {playerRows(match.teams[0].players, match.teams[0].totalScore > match.teams[1].totalScore)}
                </tbody>
              </Table>
              <Table style={{ marginBottom: '20px' }} striped bordered hover>
                <thead>
                  <tr>
                    <th>{match.teams[1].name} ({match.teams[1].totalScore})</th>
                    {Object.keys(match.teams[1].players[0].matchThrows).map((matchThrow) => {
                      if (matchThrow <= 10) {
                        return <th>{matchThrow}</th>
                      } else {
                        return <th style={{ backgroundColor: '#3de0fd' }}>{matchThrow}</th>
                      }
                    })}
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {playerRows(match.teams[1].players, match.teams[1].totalScore > match.teams[0].totalScore)}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </>
    );
  };

  return (
    <>
      {matchTable()}
    </>
  )
};

export default MatchTable;