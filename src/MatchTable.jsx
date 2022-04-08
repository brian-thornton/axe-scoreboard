import React from "react";
import Table from "react-bootstrap/Table";

const MatchTable = ({ match }) => {
  const roundCell = (player, matchThrow) => {
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

  const matchTable = () => {
    return (
      <>
      {matchDate.toLocaleDateString(undefined, options)}
      <Table style={{marginBottom: '40px'}} striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
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