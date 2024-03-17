import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";

import AddPlayer from '../AddPlayer';
import PlayersList from "../PlayersList";
import loadFromStorage from '../helpers/dataHelper';

import styles from './Players.module.css';

const Players = () => {
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [players, setPlayers] = useState(loadFromStorage('players'));
  const [selectedPlayer, setSelectedPlayer] = useState(undefined);

  useEffect(() => {
    if (selectedPlayer) {
      setIsAddPlayerOpen(true);
    }
  }, [selectedPlayer]);

  return (
    <div className={styles.playersContainer}>
      {!isAddPlayerOpen && (
        <>
          <PlayersList editEnabled={true} setSelectedPlayer={setSelectedPlayer} />
          <Button variant='primary' onClick={() => {
            setIsAddPlayerOpen(true);
            setSelectedPlayer(null);
          }}
          >Add Player</Button>
        </>
      )}
      {isAddPlayerOpen && <AddPlayer selectedPlayer={selectedPlayer} players={players} setPlayers={setPlayers} setIsAddPlayerOpen={setIsAddPlayerOpen} />}
    </div>
  );
};

export default Players;