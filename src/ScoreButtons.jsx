import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import styles from './ScoreButtons.module.css';

const ScoreButtons = ({ onScore, currentPlayer, isEdit, setPlayers, players }) => {
  const [activeKillshot, setActiveKillshot] = useState();

  const toggleKillshot = (killshotNumber) => {
    if (activeKillshot === killshotNumber) {
      setActiveKillshot(null);
    } else {
      setActiveKillshot(killshotNumber);
    }
  };

  const activateKillshotButton = (killshotNumber, enabled = false) => {
    const colSize = currentPlayer.totalKillshots === 2 ? "6" : "4";

    return (
      <Col lg={colSize} md={colSize} sm={colSize} xs={colSize}>
        <Button
          disabled={!enabled}
          style={{
            color: activeKillshot === killshotNumber ? 'white' : '',
            width: '100%',
            backgroundColor: activeKillshot === killshotNumber ? 'blue' : '#ffffff',
          }}
          variant="outline-primary"
          onClick={() => toggleKillshot(killshotNumber)}>
          {`Activate Killshot ${killshotNumber}`}
        </Button>
      </Col>
    );
  }

  const killshotResult = (score, text) => (
    <Col lg="6" md="6" sm="6" xs="6">
      <Button
        className={styles.killshotResultButton}
        variant="outline-primary"
        onClick={() => {
          onScore(score, true);
          setActiveKillshot(null);
        }}
      >
        {text}
      </Button>
    </Col>
  );

  const buttonColumn = (onClick, text, cols = "4") => (
    <Col lg={cols} md={cols} sm={cols} xs={cols}>
      <Button className={styles.columnButton} variant="outline-primary" onClick={onClick}>{text}</Button>
    </Col>
  );

  return (
    <>
      <Row>
        {activateKillshotButton(1, currentPlayer.killshotOneEnabled)}
        {activateKillshotButton(2, currentPlayer.killshotTwoEnabled)}
      </Row>
      {(isEdit && !currentPlayer.killshotOneEnabled && !currentPlayer.killshotTwoEnabled) && (
        <Row className={styles.buttonRow}>
          {buttonColumn(() => {
            const newPlayers = [...players];
            const player = newPlayers.find((p) => p.id === currentPlayer.id);

            if (!player.killshotOneEnabled && player.killshotTwoEnabled) {
              player.killshotOneEnabled = true;
              player.killshotTwoEnabled = false;
            } else if (!player.killshotOneEnabled && !player.killshotTwoEnabled) {
              player.killshotTwoEnabled = true;
            }

            setPlayers(newPlayers);
          }, 'Restore Killshot', '12')}
        </Row>
      )}
      {activeKillshot && (
        <>
          <Row className={styles.buttonRow}>
            {killshotResult(8, 'Killshot Successful')}
            {killshotResult(0, 'Killshot Missed')}
          </Row>
        </>
      )}
      {!activeKillshot && (
        <>
          <Row className={styles.buttonRow}>
            {[1, 2, 3].map((score) => buttonColumn(() => onScore(score), `${score}`))}
          </Row>
          <Row className={styles.buttonRow}>
            {[4, 5, 6].map((score) => buttonColumn(() => onScore(score), `${score}`))}
          </Row>
          <Row className={styles.buttonRow}>
            {buttonColumn(() => onScore('drop'), 'Drop', '6')}
            {buttonColumn(() => onScore(0), 'Fault', '6')}
          </Row>
        </>
      )}
    </>
  )
};

export default ScoreButtons;