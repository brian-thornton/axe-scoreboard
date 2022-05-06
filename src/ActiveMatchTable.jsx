import React, { useState } from "react";
import Table from "react-bootstrap/Table";

import styles from './ActiveMatchTable.module.css';

const ActiveMatchTable = ({ setEditCell, editCell, isMatchComplete, currentPlayer, currentRound, winner, players, isTie, tiedPlayers }) => {
  const onCellClick = (player, matchThrow) => {
    setEditCell({
      player,
      matchThrow,
    });
  };

  const roundCell = (player, matchThrow, index) => {
    if (isTie && index >= 10 && !tiedPlayers.filter((t) => t.id === player.id).length) {
      return <td onClick={() => onCellClick(player, matchThrow)}>{player.matchThrows[matchThrow]}</td>
    } else {
      if (editCell && editCell.player === player && editCell.matchThrow === matchThrow && matchThrow < currentRound) {
        return (
          <td className={styles.edit}>
            {player.matchThrows[matchThrow]}
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
    }
  };

  const totalCell = (player) => {
    if (winner?.id === player.id) {
      return <td className={styles.winner}>{player.matchTotal}</td>
    } else {
      return <td>{player.matchTotal}</td>
    }
  };

  const playerName = (player) => {
    if (isTie && !tiedPlayers.filter((t) => t.id === player.id).length) {
      return <td style={{ textDecoration: 'line-through' }}>{player.name}</td>;
    } else if (!isMatchComplete && currentPlayer?.id === player.id) {
      return <td className={styles.active}>{player.name}</td>;
    } else {
      return <td>{player.name}</td>;
    }
  }

  const playerRows = () => {
    const rows = [];

    players.filter((p) => p.name !== '').map((player) => {
      return rows.push(
        <tr key={player.id}>
          {playerName(player)}
          {/* {(!isTie || tiedPlayers.filter((t) => t.id === player.id)) && isMatchComplete && <td>{player.name}F</td>} */}
          {Object.keys(player.matchThrows).map((matchThrow, index) => {
            return roundCell(player, matchThrow, index);
          })}
          {totalCell(player)}
        </tr>
      );
    });

    return rows;
  };

  return (
    <Table striped bordered hover style={{ backgroundImage: 'linear-gradient(to top, #a6a6aa, #bcbcbf, #d2d2d4, #e8e8e9, #ffffff);' }}>
      <thead>
        <tr>
          <th>Name</th>
          {Object.keys(players[0].matchThrows).map((matchThrow) => {
            if (matchThrow > 10) {
              return <th>{`Overtime`}</th>
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