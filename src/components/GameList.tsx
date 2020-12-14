import { IonItem, IonLabel, IonList, IonLoading } from '@ionic/react';
import React, { useEffect, useReducer } from 'react';
import { fetchGames } from '../api/gamesList';
import { gameListInitialState, GameListItem, gameListReducer } from '../reducers/gameList';
import './GameList.css';

interface GameListProps { }

const GameList: React.FC<GameListProps> = () => {
  const [state, dispatch] = useReducer(gameListReducer, gameListInitialState);

  const {loading, gameList, error} = state;

  useEffect(() => {
    fetchGames(dispatch);
  }, []);

  if (loading) {
    return (
      <div>
        <IonLoading
          cssClass='my-custom-class'
          isOpen={loading}
          message={'Loading games...'}
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
    <IonList>
      {gameList ? 
        gameList.map((game: GameListItem) => (
          <IonItem>
            <IonLabel>{game.name}</IonLabel>
          </IonItem>
        )) : 
        'nothing loaded'}
    </IonList>
  );
};

export default GameList;
