import { IonContent, IonLoading,IonLabel } from '@ionic/react';
import React, { useEffect, useReducer, useState } from 'react';
import { fetchGame } from '../api/gamesDetail';
import { gameDetailInitialState, gameDetailReducer } from '../reducers/gameDetail';
import './GameDetail.css';

interface GameDetailProps {
  slug: string;
}

const GameDetail: React.FC<GameDetailProps> = (props: GameDetailProps) => {
  const [state, dispatch] = useReducer(gameDetailReducer, gameDetailInitialState);
  const [gameSlug, setGameListUrl] = useState(props.slug);

  const {loading, gameDetail, error} = state;

  useEffect(() => {
    fetchGame(gameSlug, dispatch);
  }, [gameSlug]);

  if (loading) {
    return (
      <div>
        <IonLoading
          isOpen={loading}
          message={'Loading game...'}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        There's been an error!
      </div>
    );
  }

  return (
    <IonContent>
      {gameDetail ? 
        
        <IonLabel>{gameDetail.name}</IonLabel>
        : 
        'nothing loaded'
      }
    </IonContent>
  );
};

export default GameDetail;
