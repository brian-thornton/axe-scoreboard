import React from "react";
import { Button, Container, Row } from "react-bootstrap";

const MatchComplete = ({ winner, startNextMatch, goToLeaderboard }) => {
  return (
    <>
      <Container>
        <Row>
          <div style={{ fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{`Match Complete. Winner: ${winner.name}`}</div>
        </Row>
        <Row>
          <Button onClick={startNextMatch}>Start Next Match</Button>
          <Button onClick={goToLeaderboard}>Leaderboard</Button>
        </Row>
      </Container>
    </>
  )
}

export default MatchComplete