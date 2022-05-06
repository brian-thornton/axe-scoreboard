import React from "react";
import Table from "react-bootstrap/Table";

const MatchTable = ({ match }) => {
  const roundCell = (player, matchThrow) => {
    if (player.matchThrows[matchThrow] === 6) {
      return <td style={{borderWidth: '2px', borderColor: 'red'}}>{player.matchThrows[matchThrow]}</td>;
    } else if (player.matchThrows[matchThrow] === 8) {
      return <td style={{borderWidth: '2px', borderColor: 'blue'}}>{player.matchThrows[matchThrow]}</td>;
    }

    return <td>{player.matchThrows[matchThrow]}</td>
  };

  const totalCell = (player) => {
    if (match.winner?.id === player.id) {
      return <td style={{ backgroundColor: '#4dff00' }}>{player.matchTotal}</td>
    } else {
      return <td>{player.matchTotal}</td>
    }
  }

  const playerRows = () => {
    const rows = [];

    match.players.filter((p) => p.name !== '').map((player) => {
      return rows.push(
        <tr key={player.id}>
          <td>{player.name}</td>
          {Object.keys(player.matchThrows).map((matchThrow) => {
            return roundCell(player, matchThrow);
          })}
          {totalCell(player)}
        </tr>
      );
    });

    return rows;
  };

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const matchDate = new Date(match.matchDate);
  const overtimeMatch = match.players.filter((p) => p.matchThrows[11] !== undefined).length > 0;

  const matchTable = () => {
    return (
      <>
      {matchDate.toLocaleDateString(undefined, options)} {matchDate.toLocaleTimeString('en-US')}
      <Table style={{marginBottom: '40px'}} striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            {Object.keys(match.players[0].matchThrows).map((matchThrow) => {
              if (matchThrow <= 10) {
              return <th>{matchThrow}</th>
              } else {
                return <th style={{backgroundColor: '#3de0fd'}}>{matchThrow}</th>
              }
            })} 
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {playerRows()}
        </tbody>
      </Table>
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