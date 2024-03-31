import Card from 'react-bootstrap/Card';
import Table from "react-bootstrap/Table";

import RoundCell from '../RoundCell/RoundCell';
import TotalCell from '../TotalCell/TotalCell';
import styles from './MatchTable.module.css';

const MatchTable = ({ match }) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const matchDate = new Date(match.matchDate);
  
  const playerRows = (players, winningTeam) => {
    const rows = [];

    players.filter((p) => p.name !== '').map((player) => {
      return rows.push(
        <tr key={player.id}>
          <td>{player.name}</td>
          {Object.keys(player.matchThrows).map((matchThrow) => {
            return <RoundCell player={player} matchThrow={matchThrow} />;
          })}
          <TotalCell player={player} winningTeam={winningTeam} match={match} />
        </tr>
      );
    });

    return rows;
  };

  const TableHeader = ({ matchThrows, isTeam = false, teamName = '', teamScore = 0 }) => (
    <thead>
      <tr>
        <th>{isTeam ? `${teamName} (${teamScore})` : 'Name'}</th>
        {Object.keys(matchThrows).map((matchThrow) => (
          <th style={matchThrow > 10 ? { backgroundColor: '#3de0fd' } : {}}>
            {matchThrow}
          </th>
        ))}
        <th>Total</th>
      </tr>
    </thead>
  );
  
  const TeamTable = ({ team, isWinner }) => (
    <Table className={styles.matchTable} striped bordered hover>
      <TableHeader isTeam={true} teamName={team.name} teamScore={team.totalScore} matchThrows={team.players[0].matchThrows} />
      <tbody>
        {playerRows(team.players, isWinner)}
      </tbody>
    </Table>
  );
  
  const IndividualTable = () => (
    <Table className={styles.matchTable} striped bordered hover>
      <TableHeader matchThrows={match.players[0].matchThrows} />
      <tbody>
        {playerRows(match.players)}
      </tbody>
    </Table>
  );

  const matchTable = () => {
    return (
      <>
        {!match.teams && (
          <Card border="dark" className={styles.matchCard} >
            <Card.Header>Individual Match {matchDate.toLocaleDateString(undefined, options)} {matchDate.toLocaleTimeString('en-US')}</Card.Header>
            <Card.Body>
              <IndividualTable />
            </Card.Body>
          </Card>
        )}
        {match.teams && (
          <Card border="dark" className={styles.matchCard} >
            <Card.Header>Team Match {matchDate.toLocaleDateString(undefined, options)} {matchDate.toLocaleTimeString('en-US')}</Card.Header>
            <Card.Body>
              <TeamTable team={match.teams[0]} isWinner={match.teams[0].totalScore > match.teams[1].totalScore} />
              <TeamTable team={match.teams[1]} isWinner={match.teams[1].totalScore > match.teams[0].totalScore} />
            </Card.Body>
          </Card>
        )}
      </>
    );
  };

  return (
    <>
      {matchTable()}
    </>
  )
};

export default MatchTable;