
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState } from "react";
import { Navigate } from 'react-router-dom';

import { loadFromStorage } from './helpers/dataHelper';
import { Controller } from 'react-bootstrap-icons';

const TeamSelect = ({ setSelectedTeams }) => {
  const [teams, setTeams] = useState(loadFromStorage('teams'));
  const [matchTeams, setMatchTeams] = useState([]);
  const [activeSelect, setActiveSelect] = useState();
  const [activeRemove, setActiveRemove] = useState();
  const [redirectUrl, setRedirectUrl] = useState();

  return (
    <>
      {redirectUrl && (<Navigate to={redirectUrl} />)}
      <Container fluid>
        <Row>
          <Col sm="5" md="5" lg="5" xl="5">
            <h4>Available Teams</h4>
          </Col>
          <Col sm="2" md="2" lg="2" xl="2">
          </Col>
          <Col sm="5" md="5" lg="5" xl="5">
            <h4>Teams in Match</h4>
          </Col>
        </Row>
        <Row>
          <Col sm="5" md="5" lg="5" xl="5">
            <ListGroup>
              {teams.map((team, index) => {

                if (!matchTeams.find(t => t.id === team.id)) {
                  return (
                    <ListGroup.Item active={activeSelect?.id === team.id} onClick={() => {
                      if (activeSelect?.id === team.id) {
                        setActiveSelect(null);
                      } else {
                        setActiveSelect(team)
                      }
                    }
                    }>{team.name}</ListGroup.Item>
                  );
                }
              })}
            </ListGroup>
          </Col>
          <Col sm="2" md="2" lg="2" xl="2">
            <Container>
              <Row>
                <Button
                  disabled={!activeSelect}
                  style={{ width: '100%' }}
                  onClick={() => {
                    const updatedTeams = [...matchTeams];
                    updatedTeams.push(activeSelect);
                    setMatchTeams(updatedTeams);
                    setActiveSelect(null);
                  }}
                >{"Add >>"}</Button>
              </Row>
              <Row style={{ marginTop: '5px' }}>
                <Button
                  disabled={!activeRemove}
                  style={{ width: '100%' }}
                  onClick={() => {
                    const updatedTeams = [...matchTeams];
                    updatedTeams.splice(activeRemove, 1);
                    setMatchTeams(updatedTeams);
                    setActiveRemove(null);
                  }}
                >{"Remove <<"}</Button>
              </Row>
              <Row style={{ marginTop: '5px' }}>
                <Button
                  disabled={matchTeams.length < 2}
                  style={{ width: '100%' }}
                  onClick={() => {
                    const playersReadyForMatch = matchTeams.map((matchTeam) => {
                      return {
                        ...matchTeam,
                        currentPlayer: matchTeam.players[0].id,
                        players: matchTeam.players.map((pending) => {
                          return {
                            id: pending.id,
                            name: pending.name,
                            matchThrows: {
                              1: 0,
                              2: 0,
                              3: 0,
                              4: 0,
                              5: 0,
                              6: 0,
                              7: 0,
                              8: 0,
                              9: 0,
                              10: 0,
                            },
                            currentRound: 1,
                            dropped: false,
                            matchTotal: 0,
                            remainingKillshots: 2,
                            totalKillshots: 2,
                            killshotOneEnabled: true,
                            killshotTwoEnabled: false,
                            killshotThreeEnabled: false,
                          }
                        })
                      }
                    })

                    setSelectedTeams(playersReadyForMatch);
                  }}
                >
                  {"Begin Match"}
                </Button>
              </Row>
              <Row style={{ marginTop: '5px' }}>
                <Button style={{ width: '100%' }} onClick={() => setRedirectUrl('/teams')}>
                  Cancel
                </Button>
              </Row>
            </Container>
          </Col>
          <Col sm="5" md="5" lg="5" xl="5">
            {!matchTeams.length && (
              <ListGroup>
                <ListGroup.Item>No Teams Selected</ListGroup.Item>
              </ListGroup>
            )}
            {matchTeams.length > 0 && (
              <ListGroup>
                {matchTeams.map((team, index) => {
                  return (
                    <ListGroup.Item
                      active={activeRemove?.id === team.id}
                      onClick={() => {
                        if (activeRemove?.id === team.id) {
                          setActiveRemove(null);
                        } else {
                          setActiveRemove(team)
                        }
                      }}
                    >{team.name}</ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TeamSelect;