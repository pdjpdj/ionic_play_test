import { IonButton, IonLabel } from '@ionic/react';
import React from 'react';
import { GameListMetaData } from '../reducers/gameList';
import './GameListControls.css';

interface GameListControlsProps {
  meta: GameListMetaData,
  gameListReloadUrl: (url: string) => void
}

const GameListControls: React.FC<GameListControlsProps> = (props: GameListControlsProps) => {
  const {first, prev, next, last} = props.meta.pagination.Link;
  const currentPage = props.meta.pagination['Current-Page'];
  const totalPages = props.meta.pagination['Total-Pages'];
  return (
    <section>
      <IonButton size="small" disabled={!first} onClick={() => props.gameListReloadUrl(first || "")}>First</IonButton>
      <IonButton size="small" disabled={!prev} onClick={() => props.gameListReloadUrl(prev || "")}>Prev</IonButton>
      <IonLabel>( {currentPage} / {totalPages} )</IonLabel>
      <IonButton size="small" disabled={!next} onClick={() => props.gameListReloadUrl(next || "")}>Next</IonButton>
      <IonButton size="small" disabled={!last} onClick={() => props.gameListReloadUrl(last || "")}>Last</IonButton>
    </section>
  );
};

export default GameListControls;
