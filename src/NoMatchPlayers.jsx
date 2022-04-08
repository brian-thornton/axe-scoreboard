import React from "react";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const NoMatchPlayers = ({ setIsAddPlayerOpen }) => {
  return (
    <Card style={{ height: '70vh', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container fluid>
          <Row style={{ marginBottom: "20px" }}>
            No players have been added. Please add players to begin a match.
          </Row>
          <Row>
            <Button variant='primary' onClick={() => setIsAddPlayerOpen(true)}>Add Player</Button>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
};

export default NoMatchPlayers;