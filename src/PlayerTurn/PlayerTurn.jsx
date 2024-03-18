import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

import styles from './PlayerTurn.module.css';
import Target from "../Target/Target";
import ScoreButtons from "../ScoreButtons/ScoreButtons";

const PlayerTurn = ({ endTurn, teamId, showTarget = true, showEndMatch = true, isTie, tiedPlayers, currentPlayer, players, currentRound, setPlayers, completeRound, handleEndMatch }) => {
  let otherPlayersComplete = true;
  players.forEach((player) => {
    if (player.id !== currentPlayer.id && Object.keys(player.matchThrows).length >= player.currentRound) {
      otherPlayersComplete = false;
    }
  });
  
  const recordScore = (score, isKillshot) => {
    const newPlayers = [...players];
    const player = newPlayers.find((player) => player.id === currentPlayer?.id);

    if (score === 'drop') {
      player.matchThrows[currentRound] = 0;
      player.dropped = true;

      if (player.totalKillshots < 3) {
        player.totalKillshots += 1;
        player.remainingKillshots += 1;

        if (!player.killshotOneEnabled && !player.killshotTwoEnabled) {
          player.killshotThreeEnabled = true;
        }
      }
    } else {
      player.matchThrows[currentRound] += score;
      player.matchTotal += score;
    }

    if (isKillshot) {
      player.remainingKillshots -= 1;

      if (player.killshotOneEnabled) {
        player.killshotOneEnabled = false;
        player.killshotTwoEnabled = true;
      } else if (player.killshotTwoEnabled) {
        player.killshotTwoEnabled = false;

        if (currentPlayer.dropped && currentPlayer.totalKillshots === 3) {
          player.killshotThreeEnabled = true;
        }
      } else if (player.killshotThreeEnabled) {
        player.killshotThreeEnabled = false;
      }
    }

    player.currentRound += 1;
    setPlayers(newPlayers, teamId);
    completeRound(teamId);
  };

  const handleRingClick = (e, points) => {
    recordScore(points);
    e.stopPropagation();
  };

  const buttonColumn = (onClick, text, cols = "4", disabled = false) => (
    <Col lg={cols} md={cols} sm={cols} xs={cols}>
      <Button disabled={disabled} style={{ width: '100%' }} variant="outline-primary" onClick={onClick}>{text}</Button>
    </Col>
  );

  const scoreButtonsColWidth = showTarget ? "6" : "12";
  const marginTop = showTarget ? "50px" : "0px";

  return (
    <Container>
      <Row>
        <h4 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{`Now Throwing: ${currentPlayer?.name}`}</h4>
      </Row>
      <Row>
        {showTarget && (
          <div className={styles.target}>
            <Target handleRingClick={handleRingClick} />
          </div>
        )}
        {!isTie && (
          <Col lg={scoreButtonsColWidth} md={scoreButtonsColWidth} sm={scoreButtonsColWidth} xs={scoreButtonsColWidth}>
            <Container fluid style={{ marginTop }}>
              <>
                <ScoreButtons currentPlayer={currentPlayer} onScore={recordScore} />
                {showEndMatch && (
                  <Row className={styles.buttonRow}>
                    {buttonColumn(handleEndMatch, 'End Match', "12")}
                  </Row>
                )}
                {endTurn && (
                  <Row className={styles.buttonRow}>
                    {buttonColumn(() => endTurn(teamId), 'End Turn', "12", otherPlayersComplete)}
                  </Row>
                )}
              </>
            </Container>
          </Col>
        )}
        {isTie && (
          <Col lg={scoreButtonsColWidth} md={scoreButtonsColWidth} sm={scoreButtonsColWidth} xs={scoreButtonsColWidth}>
            <Row className={styles.buttonRow}>
              <Col lg="4" md="4" sm="4" xs="4">
                <Button style={{ width: '100%' }} variant="outline-primary" onClick={() => recordScore(8)}>Killshot</Button>
              </Col>
              <Col lg="4" md="4" sm="4" xs="4">
                <Button style={{ width: '100%' }} variant="outline-primary" onClick={() => recordScore(0)}>Miss</Button>
              </Col>
            </Row>
            <Row className={styles.buttonRow}>
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