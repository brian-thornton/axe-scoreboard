import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PlayerTurn from "./PlayerTurn/PlayerTurn";

const DoublePlayerTurn = ({ handleEndMatch, isTie, onCompleteRound, currentPlayers, players, currentRound, setPlayers }) => {
  const renderPlayerTurn = (playerIndex) => (
    <PlayerTurn
      showTarget={false}
      handleEndMatch={handleEndMatch}
      isTie={isTie}
      completeRound={onCompleteRound}
      currentPlayer={currentPlayers[playerIndex]}
      players={players}
      currentRound={currentRound}
      setPlayers={setPlayers} />
  );

  return (
    <Container fluid>
      <Row>
        <Col sm="6" md="6" lg="6" xl="6">
          {renderPlayerTurn(0)}
        </Col>
        <Col sm="6" md="6" lg="6" xl="6">
          {renderPlayerTurn(1)}
        </Col>
      </Row>
    </Container>
  )
}

export default DoublePlayerTurn;