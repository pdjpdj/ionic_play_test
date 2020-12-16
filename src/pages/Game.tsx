import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import GameDetail from '../components/GameDetail';
import './Game.css';

interface GameProps extends RouteComponentProps<{
  name: string;
  slug: string;
}> {} 

const Game: React.FC<GameProps> = ({match}) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{match.params.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <GameDetail slug={match.params.slug}/>
      </IonContent>
    </IonPage>
  );
};

export default Game;
