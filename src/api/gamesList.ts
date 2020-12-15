import React from 'react';
import { GameListAction, gameListActionCreators, GameListItem, GameListMetaData } from '../reducers/gameList';
interface GamesResponse {
  success: boolean;
  games: GameListItem[];
  meta: GameListMetaData;
}

export async function fetchGames(url: string, dispatch: React.Dispatch<GameListAction>) {
  dispatch(gameListActionCreators.loading());
  try {
    const response = await fetch(
      url,
      {
        method: 'GET',
      },
    );
    const games: GamesResponse = await response.json();
    dispatch(gameListActionCreators.success({
      games: games.games, 
      meta: games.meta
    }));
  } catch (e) {
    dispatch(gameListActionCreators.failure());
  }
}