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
  <div className={styles.container}>
    {players.length > 1 && (
      <div className={styles.winnerLabel}>{`Match Complete. Winner: ${winner.name}`}</div>
    )}
    <Button className={styles.button} onClick={startNextMatch}>Start Next Match</Button>
    <Button className={styles.button} onClick={goToLeaderboard}>Leaderboard</Button>
  </div>
)

export default MatchComplete