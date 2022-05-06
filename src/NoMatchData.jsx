import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import React from "react";
import { Row } from "react-bootstrap";

import logo from "./target.svg";
import styles from './NoMatchData.module.css';

const NoMatchData = ({ startMatch }) => {
  return (
    <Card className={styles.noHistoryCard}>
      <Card.Body className={styles.noHistoryCardBody}>
        <Container fluid>
          <Row className={styles.noHistoryCardImageRow}>
            <img src={localStorage["wallpaper"] || logo} className={styles.noHistoryCardImage} alt="Axe" />
          </Row>
          <Row className={styles.noHistoryCardTextRow}>
            No Match Data. Play a match to view Leaderboard data.
          </Row>
          <Row>
            <Button onClick={startMatch}>Start Match</Button>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
};

export default NoMatchData;
