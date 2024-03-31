import { FC } from "react"

import { IMatchPlayer, IMatch } from "interface"
import styles from './TotalCell.module.css';

type TotalCellProps = {
  match: IMatch;
  player: IMatchPlayer;
  winningTeam: boolean;
}

const TotalCell: FC<TotalCellProps> = ({player, match, winningTeam}) => {
  if (winningTeam) {
    return <td className={styles.totalCell}>{player.matchTotal}</td>
  } else {
    if (match.winner?.id === player.id) {
      return <td className={styles.totalCell}>{player.matchTotal}</td>
    } else {
      return <td>{player.matchTotal}</td>
    }
  }
}

export default TotalCell;
