import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import React from "react";
import Row from "react-bootstrap/Row";

import ScoreButtons from './ScoreButtons';
import styles from './EditScoreControls.module.css';

const EditScoreControls = ({ isEdit, editCell, onModifyScore, setEditCell }) => {
  const buttonColumn = (onClick, text, cols = "4") => (
    <Col lg={cols} md={cols} sm={cols} xs={cols}>
      <Button className={styles.button} variant="outline-primary" onClick={onClick}>{text}</Button>
    </Col>
  );

  return (
    <Container style={{width: '100%'}} fluid>
      <Row>
        <h4 className={styles.center}>{`Now Editing: Throw ${editCell.matchThrow} for ${editCell.player.name}`}</h4>
      </Row>
      <Row>
        <Col sm="12" md="12" lg="12" xl="12">
          <ScoreButtons
            isEdit={isEdit}
            currentPlayer={editCell.player}
            onScore={onModifyScore}
          />
        </Col>
      </Row>
      <Row className={styles.row}>
        <Col sm="3" md="3" lg="3" xl="3" />
        {buttonColumn(() => setEditCell(null), 'Cancel Edit', "6")}
      </Row>
    </Container>
  )
};

export default EditScoreControls;