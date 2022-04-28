import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PlayerTurn from "./PlayerTurn";

const DoublePlayerTurn = ({ handleEndMatch, isTie, onCompleteRound, currentPlayers, players, currentRound, setPlayers }) => {
  return (
    <Container fluid>
      <Row>
        <Col sm="6" md="6" lg="6" xl="6">
          <PlayerTurn
            showTarget={false}
            handleEndMatch={handleEndMatch}
            isTie={isTie}
            completeRound={onCompleteRound}
            currentPlayer={currentPlayers[0]}
            players={players}
            currentRound={currentRound}
            setPlayers={setPlayers} />
        </Col>
        <Col sm="6" md="6" lg="6" xl="6">
          <PlayerTurn
            showTarget={false}
            handleEndMatch={handleEndMatch}
            isTie={isTie}
            completeRound={onCompleteRound}
            currentPlayer={currentPlayers[1]}
            players={players}
            currentRound={currentRound}
            setPlayers={setPlayers} />
        </Col>
      </Row>
    </Container>
  )
}

export default DoublePlayerTurn;