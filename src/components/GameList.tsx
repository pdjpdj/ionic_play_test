import { IonContent, IonFooter, IonInput, IonList, IonHeader, IonLoading, IonToolbar } from '@ionic/react';
import React, { useEffect, useReducer, useState } from 'react';
import { fetchGames, GAME_LIST_SEARCH_URL } from '../api/gamesList';
import { gameListInitialState, GameListItem, gameListReducer } from '../reducers/gameList';
import './GameList.css';
import GameListControls from './GameListControls';
import ListItem from './ListItem';

interface GameListProps {
  url: string;
}

const GameList: React.FC<GameListProps> = (props: GameListProps) => {
  const [state, dispatch] = useReducer(gameListReducer, gameListInitialState);
  const [gameListUrl, setGameListUrl] = useState(props.url);
  const [searchValue, setSearchValue] = useState('');

  const {loading, gameList, error, meta} = state;

  useEffect(() => {
    fetchGames(gameListUrl, dispatch);
  }, [gameListUrl]);

  const setSearchUrl = (searchTerm: string) => {
    setSearchValue(searchTerm);
    setGameListUrl(`${GAME_LIST_SEARCH_URL}${searchTerm}`);
  }

  if (loading) {
    return (
      <div>
        <IonLoading
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
    <>
      <IonHeader className='search-header'>
        <IonInput className='search-input' placeholder='Search games' type='text' value={searchValue} onIonChange={e => setSearchUrl(e.detail.value!)} debounce={500}></IonInput>
      </IonHeader>
      <IonContent>
        <IonList>
          {gameList ? 
            gameList.map((game: GameListItem) => (
              <ListItem game={game} key={game.id} />  
            )) : 
            'nothing loaded'
          }
        </IonList>
      </IonContent>
      {meta ? 
        <IonFooter>
          <IonToolbar>
            <GameListControls meta={meta} gameListReloadUrl={setGameListUrl}/>
          </IonToolbar>
        </IonFooter>
        : null
      }
    </>
  );
};

export default GameList;
