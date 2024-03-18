import { Button } from 'react-bootstrap';
import { FC } from "react";

import ScoreButtons from '../ScoreButtons/ScoreButtons';
import styles from './EditScoreControls.module.css';

type EditScoreControlsProps = {
  isEdit: boolean;
  editCell: any;
  onModifyScore: any;
  setEditCell: any;
}

const EditScoreControls: FC<EditScoreControlsProps> = ({ isEdit, editCell, onModifyScore, setEditCell }) => {
  const buttonColumn = (onClick: any, text: string,) => (
    <Button className={styles.button} variant="outline-primary" onClick={onClick}>{text}</Button>
  );

  return (
    <div className={styles.editScoreControlsContainer}>
      <h4 className={styles.center}>{`Now Editing: Throw ${editCell.matchThrow} for ${editCell.player.name}`}</h4>
      {/* @ts-ignore */}
      <ScoreButtons
        isEdit={isEdit}
        currentPlayer={editCell.player}
        onScore={onModifyScore}
      />
      <div className={styles.cancelButton}>
        {buttonColumn(() => setEditCell(null), 'Cancel Edit')}
      </div>
    </div>
  )
};

export default EditScoreControls;