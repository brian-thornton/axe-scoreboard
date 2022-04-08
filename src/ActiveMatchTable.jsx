import React, { useState } from "react";
import Table from "react-bootstrap/Table";

import styles from './ActiveMatchTable.module.css';

const ActiveMatchTable = ({ isMatchComplete, currentPlayer, currentRound, winner, players }) => {
  const [editCell, setEditCell] = useState();

  const onCellClick = (player, matchThrow) => {
    setEditCell({
      player,
      matchThrow,
    });
  };

  const roundCell = (player, matchThrow) => {
    if (editCell && editCell.player === player && editCell.matchThrow === matchThrow && matchThrow < currentRound) {
      return (
        <td className={styles.edit}>
          <input className={styles.editInput} autoFocus value={player.matchThrows[matchThrow]} />
        </td>
      );
    } else {
      if (!isMatchComplete && currentPlayer?.id === player.id && currentRound.toString() === matchThrow.toString()) {
        return <td className={styles.active}>{player.matchThrows[matchThrow]}</td>
      } else if (player.matchThrows[matchThrow] === 6) {
        return <td className={styles.bull} onClick={() => onCellClick(player, matchThrow)}>{player.matchThrows[matchThrow]}</td>
      } else if (player.matchThrows[matchThrow] === 8) {
        return <td className={styles.killshot} onClick={() => onCellClick(player, matchThrow)}>{player.matchThrows[matchThrow]}</td>
      } else {
        return <td onClick={() => onCellClick(player, matchThrow)}>{player.matchThrows[matchThrow]}</td>
      }
    }
  };

  const totalCell = (player) => {
    if (winner?.id === player.id) {
      return <td className={styles.winner}>{player.matchTotal}</td>
    } else {
      return <td>{player.matchTotal}</td>
    }
  };

  const playerRows = () => {
    const rows = [];

    players.filter((p) => p.name !== '').map((player) => {
      return rows.push(
        <tr key={player.id}>
          {(!isMatchComplete && currentPlayer?.id === player.id) && (
            <td className={styles.active}>{player.name}</td>
          )}
          {(!isMatchComplete && currentPlayer?.id !== player.id) && (
            <td>{player.name}</td>
          )}
          {isMatchComplete && <td>{player.name}</td>}
          {Object.keys(player.matchThrows).map((matchThrow) => {
            return roundCell(player, matchThrow);
          })}
          {totalCell(player)}
        </tr>
      );
    });

    return rows;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          {Object.keys(players[0].matchThrows).map((matchThrow) => {
            if (matchThrow > 10) {
              return <th>{`Overtime Round ${matchThrow - 10}`}</th>
            }

            return <th>{matchThrow}</th>
          })}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {playerRows()}
      </tbody>
    </Table>
  );
};

export default ActiveMatchTable;