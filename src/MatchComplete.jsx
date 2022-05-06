import React from "react";
import { Button, Container, Row } from "react-bootstrap";

import styles from './MatchComplete.module.css';

const MatchComplete = ({ winner, startNextMatch, goToLeaderboard, players }) => {
  return (
    <>
      <Container>
        {players.length > 1 && (
          <Row>
            <div className={styles.winnerLabel}>{`Match Complete. Winner: ${winner.name}`}</div>
          </Row>
        )}
        <Row className={styles.centerRow}>
          <Button className={styles.nextMatchButton} onClick={startNextMatch}>Start Next Match</Button>
          <Button className={styles.leaderboardButton} onClick={goToLeaderboard}>Leaderboard</Button>
        </Row>
      </Container>
    </>
  )
}

export default MatchComplete