import React from "react";
import { Button, Container, Row } from "react-bootstrap";

const MatchComplete = ({ winner, startNextMatch, goToLeaderboard, players }) => {
  return (
    <>
      <Container>
        {players.length > 1 && (
          <Row>
            <div style={{ fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{`Match Complete. Winner: ${winner.name}`}</div>
          </Row>
        )}
        <Row style={{ fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button style={{width: '20%'}} onClick={startNextMatch}>Start Next Match</Button>
          <Button style={{marginLeft: '10px', width: '20%'}} onClick={goToLeaderboard}>Leaderboard</Button>
        </Row>
      </Container>
    </>
  )
}

export default MatchComplete