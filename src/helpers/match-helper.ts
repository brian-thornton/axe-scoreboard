import { IMatchHistory, IMatchPlayer, IPlayer } from "interface";
import MatchHistory from "MatchHistory";

export const zeroScores = (players: IMatchPlayer[]) => {
  players.map((player) => {
    player.matchThrows = {
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
    };
    player.dropped = false;
    player.matchTotal = 0;
    player.remainingKillshots = 2;
    player.totalKillshots = 2;
    player.killshotOneEnabled = true;
    player.killshotTwoEnabled = false;
    player.killshotThreeEnabled = false;
  });

  return players;
};

export const appendToExistingMatchHistory = (existingHistory: IMatchHistory[], players: IMatchPlayer[], matchWinner: IMatchPlayer) => {
  existingHistory.push({
    matchDate: new Date(),
    // @ts-ignore
    players: players.map((player) => {
      return {
        id: player.id,
        name: player.name,
        matchThrows: player.matchThrows,
        matchTotal: player.matchTotal,
      };
    }),
    winner: matchWinner,
  });

  localStorage.setItem('matchHistory', JSON.stringify(existingHistory));
};

export const initializeMatchPlayers = (players: IPlayer[]) => {
  return players.map((player) => {
    return {
      id: player.id,
      name: player.name,
      wins: player.wins,
      losses: player.losses,
      rating: player.rating,
      team: player.team,
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
      matchTotal: 0,
      remainingKillshots: 2,
      totalKillshots: 2,
      killshotOneEnabled: true,
      killshotTwoEnabled: false,
      killshotThreeEnabled: false,
      dropped: false,
    };
  });
};

export const identifyMatchWinner = (players: IMatchPlayer[]) => {
  const matchWinner = players.reduce(function (prev, current) {
    if (+current.matchTotal > +prev.matchTotal) {
      return current;
    } else {
      return prev;
    }
  });

  return matchWinner;
};

export const formatMatchHistory = (matchHistory: IMatchHistory[], players: IMatchPlayer[], matchWinner: IMatchPlayer) => {
  const newMatchHistory = [...matchHistory];
  newMatchHistory.push({
    matchDate: new Date(),
    // @ts-ignore
    players: players.map((player) => {
      return {
        id: player.id,
        name: player.name,
        matchThrows: player.matchThrows,
        matchTotal: player.matchTotal,
      };
    }),
    winner: matchWinner,
  });

  return newMatchHistory;
};

