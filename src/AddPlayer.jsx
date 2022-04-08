import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import React, { useState } from "react";

const AddPlayer = ({ players, setPlayers, setIsAddPlayerOpen }) => {
  const [name, setName] = useState("");

  return (
    <Form>
      <Form.Group className="mb-3" controlId="playerName">
        <Form.Label>Player Name</Form.Label>
        <Form.Control autoFocus onInput={(event) => setName(event.target.value)} />
        <Form.Text className="text-muted">
          Enter the player's name.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={() => {
        players.push({
          id: crypto.randomUUID(),
          name,
          matchThrows: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
          },
          matchTotal: 0,
        });

        setPlayers(players.filter((player) => player.name !== ''));
        setIsAddPlayerOpen(false);
      }}>
        Add
      </Button>
    </Form>
  );
};

export default AddPlayer;