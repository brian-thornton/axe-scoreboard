import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";

const AxeNav = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Axe Scoreboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="leaderboard">Leaderboard</Nav.Link>
            <Nav.Link href="history">Match History</Nav.Link>
            <NavDropdown title="Settings" id="nav-dropdown">
              <NavDropdown.Item eventKey="4.1" onClick={() => {
                localStorage.removeItem("matchHistory");
                window.location.reload();
              }}>Clear Data</NavDropdown.Item>
              <NavDropdown.Item eventKey="4.2">Export Data</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default AxeNav;