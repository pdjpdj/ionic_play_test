import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { GAME_LIST_URL } from '../api/gamesList';
import GameList from '../components/GameList';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PlayStation Games</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <GameList url={GAME_LIST_URL}/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
