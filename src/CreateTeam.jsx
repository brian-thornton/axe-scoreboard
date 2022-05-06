import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import PlayersList from "./PlayersList";

const CreateTeam = ({ selectedTeam, setSelectedTeam, teams, setTeams, setIsCreateTeamOpen }) => {
  const [teamName, setTeamName] = useState("");
  const [teamPlayers, setTeamPlayers] = useState(selectedTeam?.players);

  const onDeleteTeam = () => {
    const newTeams = [];

    teams.map((team) => {
      if (team.id !== selectedTeam.id) {
        newTeams.push(team);
      }
    });

    setTeamName("");
    setTeams(newTeams);
    setSelectedTeam(null);
    localStorage.setItem('teams', JSON.stringify(newTeams));
    setIsCreateTeamOpen(false);
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="playerName">
          <Form.Label>Team Name</Form.Label>
          <Form.Control autoFocus onInput={(event) => setTeamName(event.target.value)} defaultValue={selectedTeam?.name} />
          <Form.Text className="text-muted">
            Enter the team's name.
          </Form.Text>
        </Form.Group>
        <PlayersList selectEnabled={true} selectedPlayers={teamPlayers} setSelectedPlayers={setTeamPlayers} />

        <Button variant="primary" type="submit" onClick={() => {
          if (selectedTeam) {
            const updatedTeams = [...teams];
            updatedTeams[teams.indexOf(selectedTeam)] = {
              ...selectedTeam,
              name: teamName || selectedTeam.name,
              players: teamPlayers,
            }
            setTeams(updatedTeams);
          } else {
            const newTeams = [...teams];
            newTeams.push({
              id: crypto.randomUUID(),
              name: teamName,
              players: teamPlayers,
            })

            localStorage.setItem('teams', JSON.stringify(newTeams));
            setTeams(newTeams);
          }
          setIsCreateTeamOpen(false);
        }}>
          {selectedTeam ? 'Save' : 'Add'}
        </Button>
        {selectedTeam && <Button style={{ marginLeft: '10px' }} variant="primary" onClick={() => setIsCreateTeamOpen(false)}>Cancel</Button>}
        {selectedTeam && <Button style={{ marginLeft: '10px' }} variant="danger" onClick={onDeleteTeam}>Delete</Button>}
      </Form>
    </>
  );
};

export default CreateTeam;