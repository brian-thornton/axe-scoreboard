import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { ListUl } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";

import CreateTeam from './CreateTeam';
import NoTeamData from './NoTeamData';

const Teams = ({ }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState();
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  const loadExistingTeams = () => {
    const existingTeamsRaw = localStorage.getItem('teams');
    if (existingTeamsRaw) {
      setTeams(JSON.parse(existingTeamsRaw));
    }
  };

  useEffect(loadExistingTeams, []);

  return (
    <>
      <Container fluid>
        {isCreateTeamOpen && (
          <Row>
            <CreateTeam selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} teams={teams} setTeams={setTeams} setIsCreateTeamOpen={setIsCreateTeamOpen} />
          </Row>
        )}
        {!isCreateTeamOpen && teams.map((team, index) => {
          return (
            <Row key={index}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{team.name}<ListUl style={{marginLeft: '10px'}} onClick={() => {
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
      {teams.length !== 0 && !isCreateTeamOpen && (
        <Button style={{ marginLeft: '10px' }}  variant="primary" type="submit" onClick={() => setIsCreateTeamOpen(true)}>
          Add
        </Button>
      )}
    </>
  );
};

export default Teams;