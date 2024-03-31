import { FC } from "react";

import styles from './RoundCell.module.css';

type RoundCellProps = {
  player: any;
  matchThrow: number;
}

const RoundCell: FC<RoundCellProps> = ({ player, matchThrow }) => {
  if (player.matchThrows[matchThrow] === 6) {
    return <td className={styles.bull}>{player.matchThrows[matchThrow]}</td>;
  } else if (player.matchThrows[matchThrow] === 8) {
    return <td className={styles.killshot}>{player.matchThrows[matchThrow]}</td>;
  }

  return <td>{player.matchThrows[matchThrow]}</td>
};

export default RoundCell;
