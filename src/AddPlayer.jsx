import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import React, { useState } from "react";

const AddPlayer = ({ players, setPlayers, setIsAddPlayerOpen, selectedPlayer }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setIsAddPlayerOpen(false);
  };

  const onSave = () => {
    const newPlayers = [...players.filter((player) => player.name !== '')];

    if (!selectedPlayer) {
      newPlayers.push({
        id: crypto.randomUUID(),
        name,
        email,
        phone,
      });
    } else {
      newPlayers.map((player) => {
        if (player.id === selectedPlayer.id) {
          player.name = name || selectedPlayer.name;
          player.email = email || selectedPlayer.email;
          player.phone = phone || selectedPlayer.phone;
        }
      });
    }

    setPlayers(newPlayers);
    localStorage.setItem('players', JSON.stringify(newPlayers));
    resetForm();
  };

  const onDeletePlayer = () => {
    const newPlayers = [];

    players.map((player) => {
      if (player.id !== selectedPlayer.id) {
        newPlayers.push(player);
      }
    });

    setPlayers(newPlayers);
    localStorage.setItem('players', JSON.stringify(newPlayers));
    resetForm();
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="playerName">
        <Form.Label>Player Name</Form.Label>
        <Form.Control autoFocus defaultValue={selectedPlayer?.name} onInput={(event) => setName(event.target.value)} />
        <Form.Text className="text-muted">
          Enter the player's name.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="playerEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control autoFocus defaultValue={selectedPlayer?.email} onInput={(event) => setEmail(event.target.value)} />
        <Form.Text className="text-muted">
          Enter the player's email address.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="playerEmail">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control autoFocus defaultValue={selectedPlayer?.phone} onInput={(event) => setPhone(event.target.value)} />
        <Form.Text className="text-muted">
          Enter the player's phone number.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={onSave}>{selectedPlayer ? 'Save' : 'Add'}</Button>
      <Button style={{ marginLeft: '10px' }} variant="primary" onClick={() => setIsAddPlayerOpen(false)}>Cancel</Button>
      {selectedPlayer && <Button style={{ marginLeft: '10px' }} variant="danger" onClick={onDeletePlayer}>Delete</Button>}
    </Form>
  );
};

export default AddPlayer;