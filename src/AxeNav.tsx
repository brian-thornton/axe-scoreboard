import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FC } from "react";

const AxeNav: FC = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container fluid>
      <Navbar.Brand href="#home">{localStorage["title"] || 'Axe Scoreboard'}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="leaderboard">Leaderboard</Nav.Link>
          <Nav.Link href="teams">Teams</Nav.Link>
          <Nav.Link href="players">Players</Nav.Link>
          <Nav.Link href="history">Match History</Nav.Link>
          <Nav.Link href="settings">Settings</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default AxeNav;