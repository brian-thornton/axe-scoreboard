import React, { useState } from "react";
import Table from "react-bootstrap/Table";

import styles from './ActiveMatchTable.module.css';

const ActiveMatchTable = ({ framesToDisplay, setEditCell, editCell, isMatchComplete, currentPlayer, currentRound, winner, players, isTie, tiedPlayers }) => {
  const onCellClick = (player, matchThrow) => {
    setEditCell({
      player,
      matchThrow,
    });
  };

  const renderCell = (player, matchThrow, className = '') => (
    <td className={className} onClick={() => onCellClick(player, matchThrow)}>
      {player.matchThrows[matchThrow]}
    </td>
  );
  
  const roundCell = (player, matchThrow, index) => {
    const isPlayerTied = tiedPlayers?.some((t) => t.id === player.id);
    const isEditing = editCell && editCell.player === player && editCell.matchThrow === matchThrow;
    const isActive = !isMatchComplete && currentPlayer?.id === player.id && currentRound.toString() === matchThrow.toString();
    const isBull = player.matchThrows[matchThrow] === 6;
    const isKillshot = player.matchThrows[matchThrow] === 8;
  
    let className = '';
  
    if (isTie && index >= 10 && !isPlayerTied) {
      className = '';
    } else if (isEditing && matchThrow < currentRound) {
      className = styles.edit;
    } else if (isActive) {
      className = styles.active;
    } else if (isBull) {
      className = styles.bull;
    } else if (isKillshot) {
      className = styles.killshot;
    }
  
    return renderCell(player, matchThrow, className);
  };

  const totalCell = (player) => {
    const className = winner?.id === player.id ? styles.winner : '';
    return <td className={className}>{player.matchTotal}</td>
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