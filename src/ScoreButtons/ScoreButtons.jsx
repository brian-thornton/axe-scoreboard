import { useState } from "react";
import Button from "react-bootstrap/Button";

import styles from './ScoreButtons.module.css';

const ScoreButtons = ({ onScore, currentPlayer, isEdit, setPlayers, players }) => {
  const [activeKillshot, setActiveKillshot] = useState();

  const toggleKillshot = (killshotNumber) => {
    setActiveKillshot(activeKillshot === killshotNumber ? null : killshotNumber);
  };

  const activateKillshotButton = (killshotNumber, enabled = false) => (
    <Button
      disabled={!enabled}
      style={{
        color: activeKillshot === killshotNumber ? 'white' : '',
        width: '100%',
        backgroundColor: activeKillshot === killshotNumber ? 'blue' : '#ffffff',
        marginBottom: '10px',
      }}
      variant="outline-primary"
      onClick={() => toggleKillshot(killshotNumber)}>
      {`Activate Killshot ${killshotNumber}`}
    </Button>
  );

  const killshotResult = (score, text) => (
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
  );

  const scoreButton = (onClick, text) => (
    <Button className={styles.columnButton} variant="outline-primary" onClick={onClick}>{text}</Button>
  );

  return (
    <div className={styles.outerContainer}>
      {activateKillshotButton(1, currentPlayer.killshotOneEnabled)}
      {activateKillshotButton(2, currentPlayer.killshotTwoEnabled)}
      {(isEdit && !currentPlayer.killshotOneEnabled && !currentPlayer.killshotTwoEnabled) && (
        <div className={styles.buttonRow}>
          {scoreButton(() => {
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
        </div>
      )}
      {activeKillshot ? (
        <>
          {killshotResult(8, 'Killshot Successful')}
          {killshotResult(0, 'Killshot Missed')}
        </>
      ) : (
        <div styles={styles.buttonContainer}>
          {[1, 2, 3].map((score) => scoreButton(() => onScore(score), `${score}`))}
          {[4, 6].map((score) => scoreButton(() => onScore(score), `${score}`))}
          {scoreButton(() => onScore('drop'), 'Drop')}
        </div>
      )}
    </div>
  )
};

export default ScoreButtons;