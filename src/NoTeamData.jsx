import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import React from "react";
import { Row } from "react-bootstrap";

import logo from "./target.svg";
import styles from './NoTeamData.module.css';

const NoTeamData = ({ createTeam }) => {
  return (
    <Card className={styles.noTeamCard}>
      <Card.Body className={styles.noTeamCardBody}>
        <Container fluid>
          <Row className={styles.noTeamCardImageRow}>
            <img src={localStorage["wallpaper"] || logo} className={styles.noTeamCardImage} alt="Axe" />
          </Row>
          <Row className={styles.noTeamCardTextRow}>
            No Team Data. Create a team to set up team play.
          </Row>
          <Row>
            <Button onClick={createTeam}>Create Team</Button>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
};

export default NoTeamData;
