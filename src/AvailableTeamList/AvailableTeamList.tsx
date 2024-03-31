import { FC } from "react";
import ListGroup from 'react-bootstrap/ListGroup';

type TeamSelectListProps = {
  activeSelect: any;
  teams: any[];
  matchTeams: any[];
  setActiveSelect: (value: any) => void;
}

const TeamSelectList: FC<TeamSelectListProps> = ({teams, matchTeams, activeSelect, setActiveSelect}) => (
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
);

export default TeamSelectList;
