import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import {FC} from "react";
import Table from "react-bootstrap/Table";

import NoMatchData from '../NoMatchData/NoMatchData';
import { IMatchHistory, IPlayer } from 'interface';

import styles from './Leaderboard.module.css';

type LeaderboardProps = {
  startMatch: () => void;
  matchPlayers: any;
  setMatchPlayers: any;
}

const Leaderboard: FC<LeaderboardProps> = ({ startMatch, matchPlayers, setMatchPlayers }) => {
  const uniqueListOfPlayers = () => {
    const players = Array<IPlayer>();

    matchHistory.map((match) => {
      if (!match.teams) {
        match.players?.map((player) => {
          if (!players.map((p) => p.id).includes(player.id)) {
            players.push(player);
          }
        });
      }
    });

    return players;
  };

  const getPlayerWins = (player: IPlayer) => {
    let wins = 0;

    matchHistory.map((match) => {
      match.players?.map((matchPlayer) => {
        if (matchPlayer.id === player.id) {
          wins += match.winner.id === matchPlayer.id ? 1 : 0;
        }
      });
    });

    return wins;
  };

  const getPlayerLosses = (player: IPlayer) => {
    let losses = 0;

    matchHistory.map((match) => {
      match.players?.map((matchPlayer) => {
        if (matchPlayer.id === player.id) {
          losses += match.winner.id === matchPlayer.id ? 0 : 1;
        }
      });
    });

    return losses;
  };

  const rows = () => {
    const rows = Array<JSX.Element>();

    uniqueListOfPlayers().map((player) => {
      if (player.name !== '') {
        rows.push(
          <tr key={player.id}>
            <td>{player.name}</td>
            <td>{getPlayerWins(player)}</td>
            <td>{getPlayerLosses(player)}</td>
            <td><Form.Check
              type="checkbox"
              onChange={(event) => {
                if (event.target.checked) {
                  if (matchPlayers) {
                    setMatchPlayers([...matchPlayers, player]);
                  } else {
                    setMatchPlayers([player]);
                  }
                }
              }}
            /></td>
          </tr>
        );
      }
    });

    return rows;
  }

  const matchHistoryStorage = localStorage.getItem('matchHistory');
  let matchHistory = Array<IMatchHistory>();
  if (matchHistoryStorage) {
    matchHistory = JSON.parse(matchHistoryStorage);
  }

  return (
    <div className={styles.leaderboardContainer}>
      {matchHistory?.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Player</th>
                <th>Matches Won</th>
                <th>Matches Lost</th>
              </tr>
            </thead>
            <tbody>
              {rows()}
            </tbody>
          </Table>
          <Button onClick={startMatch}>Start Match</Button>
        </>
      )}
      {!matchHistory?.length && <NoMatchData startMatch={startMatch} />}
    </div>
  );
};

export default Leaderboard;