import { IonButton, IonCard, IonContent, IonFooter, IonImg, IonItem, IonLabel, IonList, IonModal, IonThumbnail, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { GameDetailItem, GameTrophy } from '../reducers/gameDetail';
import './TrophyCabinet.css';

interface TrophyCabinetProps {
  game: GameDetailItem,
}

const TrophyCabinet: React.FC<TrophyCabinetProps> = (props: TrophyCabinetProps) => {
  const [showModal, setShowModal] = useState(false);
  const {game} = props;

  const trophies = game.trophies.length > 3 ? game.trophies.slice(0, 3) : game.trophies;
  
  return (
    <IonCard className='cabinet'>
      <IonModal isOpen={showModal}>
        <IonContent>
          <IonList>
            {game.trophies.map((trophy: GameTrophy) => (
                <IonItem key={trophy.id}>
                  <IonThumbnail slot='start'>
                    <IonImg src={trophy.covers.service_url} alt={game.name}/>
                  </IonThumbnail>
                  <IonLabel>{trophy.name}</IonLabel>
                </IonItem>
              ))}
          </IonList>
        </IonContent>
        <IonFooter>
          <IonToolbar className='cabinet-toolbar'>
            <IonButton onClick={() => setShowModal(!showModal)}>Close all trophies</IonButton>
          </IonToolbar>
        </IonFooter>
      </IonModal>
      <IonLabel >Trophies:</IonLabel>
        {trophies.length
          ?
          <div className='trophies'>
              {trophies.map((trophy: GameTrophy) => (
                <div key={trophy.id}>
                  <IonThumbnail>
                    <IonImg src={trophy.covers.service_url} alt={game.name}/>
                  </IonThumbnail>
                  <IonLabel>{trophy.name}</IonLabel>
                </div>
              ))}
              {trophies.length < game.trophies.length
                ?
                <IonButton size='small' onClick={() => setShowModal(!showModal)}>Show all {game.trophies.length} trophies</IonButton>
                : null
              }
          </div>
          :
          <IonLabel>No trophies for this game</IonLabel>
        }
    </IonCard>
  );
};

export default TrophyCabinet;
