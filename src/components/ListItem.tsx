import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import React from 'react';
import { GameListItem } from '../reducers/gameList';
import './GameListControls.css';

interface ListProps {
  game: GameListItem,
}

const ListItem: React.FC<ListProps> = (props: ListProps) => {
  const {game} = props;
  return (
    game.name ?
      <IonItem>
        <IonThumbnail slot='start'>
          <img src={game.covers.service_url} alt={game.name}/>
        </IonThumbnail>
        <div>
          <IonLabel>{game.name}</IonLabel>
          {game.platforms?
            <IonLabel>{game.platforms.map(platform => (platform))}</IonLabel>
            : ''
          }
        </div>
      </IonItem>
    : 
      <IonItem key={game.id}>
        <IonLabel>No data</IonLabel>
      </IonItem>
  );
};

export default ListItem;
