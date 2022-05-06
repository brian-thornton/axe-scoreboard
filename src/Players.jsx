import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";

import AddPlayer from './AddPlayer';
import PlayersList from "./PlayersList";
import loadFromStorage from './dataHelper';

const Players = () => {
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [players, setPlayers] = useState(loadFromStorage('players'));
  const [selectedPlayer, setSelectedPlayer] = useState();

  useEffect(() => {
    if (selectedPlayer) {
      setIsAddPlayerOpen(true);
    }
  }, [selectedPlayer]);

  return (
    <>
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
    </>
  );
};

export default Players;