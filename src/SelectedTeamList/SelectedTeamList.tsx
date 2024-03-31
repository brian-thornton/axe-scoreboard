import { FC } from "react";
import { ListGroup } from "react-bootstrap";

type SelectedTeamListProps = {
  matchTeams: any[];
  activeRemove: any;
  setActiveRemove: (value: any) => void;
}

const SelectedTeamList: FC<SelectedTeamListProps> = ({ setActiveRemove, activeRemove, matchTeams}) => (
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
);

export default SelectedTeamList;