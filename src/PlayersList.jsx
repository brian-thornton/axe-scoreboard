import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';

const PlayersList = ({ selectedPlayers, setSelectedPlayers, selectEnabled, editEnabled, selectedPlayer, setSelectedPlayer }) => {
  const [players, setPlayers] = useState([]);

  const loadExistingPlayers = () => {
    const existingPlayersRaw = localStorage.getItem('players');
    if (existingPlayersRaw) {
      setPlayers(JSON.parse(existingPlayersRaw));
    } else {
      setPlayers([])
    }
  };

  useEffect(loadExistingPlayers, []);

  const togglePlayerSelect = (event, player) => {
    if (event.target.checked) {
      if (selectedPlayers) {
        setSelectedPlayers([...selectedPlayers, player]);
      } else {
        setSelectedPlayers([player]);
      }
    } else {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    }
  };

  const rows = () => {
    const rows = [];

    players.map((player) => {
      if (player.name !== '') {
        rows.push(
          <tr onClick={() => {
            if (editEnabled) {
              setSelectedPlayer(player);
            }
          }} key={player.id}>
            <td>{player.name}</td>
            <td></td>
            <td></td>
            {selectEnabled && (
              <td>
                <Form.Check
                  type="checkbox"
                  id={player.id}
                  checked={selectedPlayers?.map((p) => p.id).includes(player.id)}
                  onChange={(event) => togglePlayerSelect(event, player)}
                />
              </td>
            )}
          </tr>
        );
      }
    });

    return rows;
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Matches Won</th>
            <th>Matches Lost</th>
          </tr>
        </thead>
        <tbody>
          {rows()}
        </tbody>
      </Table>
    </>
  )
};

export default PlayersList;