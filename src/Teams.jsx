import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { ListUl } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

import CreateTeam from './CreateTeam';
import NoTeamData from './NoTeamData';

const Teams = ({ }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState();
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState();

  const loadExistingTeams = () => {
    const existingTeamsRaw = localStorage.getItem('teams');
    if (existingTeamsRaw) {
      setTeams(JSON.parse(existingTeamsRaw));
    }
  };

  useEffect(loadExistingTeams, []);

  return (
    <>
      {redirectUrl && (<Navigate to={redirectUrl} />)} 
      <Container fluid>
        {teams.length !== 0 && !isCreateTeamOpen && (
          <Row>
            <Button
              style={{ width: '100px', marginLeft: '10px' }}
              variant="primary"
              type="submit"
              onClick={() => setIsCreateTeamOpen(true)}
            >
              Add
            </Button>
            <Button
              style={{ width: '150px', marginLeft: '10px' }}
              variant="primary"
              type="submit"
              disabled={teams.length <= 1}
              onClick={() => setRedirectUrl('/team-match')}
            >
              Play Team Match
            </Button>
          </Row>
        )}
        {isCreateTeamOpen && (
          <Row>
            <CreateTeam
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
              teams={teams}
              setTeams={setTeams}
              setIsCreateTeamOpen={setIsCreateTeamOpen}
            />
          </Row>
        )}
        {!isCreateTeamOpen && teams.map((team, index) => {
          return (
            <Row key={index}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{team.name}<ListUl style={{ marginLeft: '10px' }} onClick={() => {
                      setSelectedTeam(team);
                      setIsCreateTeamOpen(true);
                    }} /></th>
                  </tr>
                </thead>
                <tbody>
                  {team.players?.map((player, index) => {
                    return (
                      <tr>
                        <td key={index}>{player.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Row>
          )
        })}
      </Container>
      {teams.length === 0 && !isCreateTeamOpen && (
        <NoTeamData createTeam={() => setIsCreateTeamOpen(true)} />
      )}
    </>
  );
};

export default Teams;