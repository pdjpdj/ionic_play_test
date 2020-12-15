import { IonItem, IonLabel, IonList, IonLoading, IonThumbnail } from '@ionic/react';
import React, { useEffect, useReducer, useState } from 'react';
import { fetchGames } from '../api/gamesList';
import { gameListInitialState, GameListItem, gameListReducer } from '../reducers/gameList';
import './GameList.css';
import GameListControls from './GameListControls';

interface GameListProps {
  url: string;
}

const GameList: React.FC<GameListProps> = (props: GameListProps) => {
  const [state, dispatch] = useReducer(gameListReducer, gameListInitialState);
  const [gameListUrl, setGameListUrl] = useState(props.url)

  const {loading, gameList, error, meta} = state;

  useEffect(() => {
    fetchGames(gameListUrl, dispatch);
  }, [gameListUrl]);

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
          game.name ?
            <IonItem key={game.id}>
               <IonThumbnail slot='start'>
                  <img src={game.covers.service_url} alt={game.name}/>
                </IonThumbnail>
                <div>
                  <IonLabel>{game.name}</IonLabel>
                  {game.platforms?
                    <IonLabel>{game.platforms.map(platform => (platform))}</IonLabel>
                    : ""
                  }
                </div>
            </IonItem>
            : 
            <IonItem key={game.id}>
              <IonLabel>No data</IonLabel>
            </IonItem>
            
        )) : 
        'nothing loaded'
      }
      {meta ? 
        <GameListControls meta={meta} gameListReloadUrl={setGameListUrl}/>
        : <div></div>
      }
    </IonList>
  );
};

export default GameList;
