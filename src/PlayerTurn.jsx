import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import Target from "./Target";

const PlayerTurn = ({ isTie, currentPlayer, players, currentRound, setPlayers, completeRound }) => {
  const recordScore = (score) => {
    const newPlayers = [...players];
    const player = newPlayers.find((player) => player.id === currentPlayer?.id);
    player.matchThrows[currentRound] += score;
    player.matchTotal += score;
    setPlayers(newPlayers);
    completeRound();
  };

  const handleRingClick = (e, points) => {
    recordScore(points);
    e.stopPropagation();
  };

  const buttonColumn = (onClick, text) => (
  <Col lg="4" md="4" sm="4" xs="4">
    <Button style={{ width: '100%' }} variant="outline-primary" onClick={onClick}>{text}</Button>
  </Col>
  );

  return (
    <Container>
      <Row>
        <div style={{ fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{`Now Throwing: ${currentPlayer?.name}`}</div>
      </Row>
      <Row>
        <Col lg="6" md="6" sm="6" xs="6">
          <Target style={{ width: '100%' }} handleRingClick={handleRingClick} />
        </Col>
        {!isTie && (
          <Col lg="6" md="6" sm="6" xs="6">
            <Container fluid style={{ marginTop: '50px' }}>
              <Row>
                {buttonColumn(() => recordScore(1), '1')}
                {buttonColumn(() => recordScore(2), '2')}
                {buttonColumn(() => recordScore(3), '3')}
              </Row>
              <Row style={{ marginTop: '20px' }}>
                {buttonColumn(() => recordScore(4), '4')}
                {buttonColumn(() => recordScore(5), '5')}
                {buttonColumn(() => recordScore(6), '6')}
              </Row>
              <Row style={{ marginTop: '20px' }}>
                {buttonColumn(() => recordScore(8), 'Killshot')}
                {buttonColumn(() => recordScore(0), 'Drop')}
                {buttonColumn(() => recordScore(0), 'Fault')}
              </Row>
            </Container>
          </Col>
        )}
        {isTie && (
          <Col lg="6" md="6" sm="6" xs="6">
            <Row style={{ marginTop: '20px' }}>
              <Col lg="4" md="4" sm="4" xs="4">
                <Button style={{ width: '100%' }} variant="outline-primary" onClick={() => recordScore(8)}>Killshot</Button>
              </Col>
              <Col lg="4" md="4" sm="4" xs="4">
                <Button style={{ width: '100%' }} variant="outline-primary" onClick={() => recordScore(0)}>Miss</Button>
              </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col lg="4" md="4" sm="4" xs="4">
                <Button style={{ width: '100%' }} variant="outline-primary" onClick={() => recordScore(0)}>Drop</Button>
              </Col>
              <Col lg="4" md="4" sm="4" xs="4">
                <Button style={{ width: '100%' }} variant="outline-primary" onClick={() => recordScore(0)}>Fault</Button>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </Container >
  )
};

export default PlayerTurn;