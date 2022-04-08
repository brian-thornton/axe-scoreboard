import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const NoMatchHistory = () => {
  return (
    <Card style={{ height: '70vh', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container fluid>
          <Row style={{ marginBottom: "20px" }}>
            No match history. Play a match to see results here.
          </Row>
        </Container>
      </Card.Body>
    </Card>
  )
};

export default NoMatchHistory;