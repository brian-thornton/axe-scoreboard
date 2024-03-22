import { IPlayer, IMatchHistory, IMatchPlayer, IMatch } from '../interface';

export const getPlayerWins = (matchHistory: IMatch[], player: IPlayer) => {
  let wins = 0;

  matchHistory.map((match: IMatch) => {
    match.players?.map((matchPlayer: IMatchPlayer) => {
      if (matchPlayer.id === player.id) {
        wins += match.winner.id === matchPlayer.id ? 1 : 0;
      }
    });
  });

  return wins;
};

export const getPlayerLosses = (matchHistory: IMatch[], player: IPlayer) => {
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