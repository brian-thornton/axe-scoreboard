import { FC } from "react";
import { Button, Container, Row } from "react-bootstrap";

import styles from './MatchComplete.module.css';

type MatchCompleteProps = {
  winner: any;
  startNextMatch: () => void;
  goToLeaderboard: () => void;
  players: any[];
}

const MatchComplete: FC<MatchCompleteProps> = ({ winner, startNextMatch, goToLeaderboard, players }) => (
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
)

export default MatchComplete