import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
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
        <GameList />
      </IonContent>
    </IonPage>
  );
};

export default Home;
