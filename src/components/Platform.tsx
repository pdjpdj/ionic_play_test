import { IonLabel } from '@ionic/react';
import React from 'react';
import { GameDetailItem } from '../reducers/gameDetail';
import './Platform.css';

interface PlatformProps {
  game: GameDetailItem,
}

const Platform: React.FC<PlatformProps> = (props: PlatformProps) => {
  const {game} = props;
  return (
    <IonLabel><h2>
      {game.platforms?.map(platform => `${platform} • `)}
      {game.publishers.length ? game.publishers[0].label : null}
      {game.genres.length 
        ?
        ` • ${game.genres[0].value}`
        : null
      }
    </h2></IonLabel>
  );
};

export default Platform;
