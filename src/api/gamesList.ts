import React from 'react';
import { GameListAction, gameListActionCreators, GameListItem } from '../reducers/gameList';

interface GamesResponse {
  success: boolean;
  games: GameListItem[];
  meta: any;
}

export async function fetchGames(dispatch: React.Dispatch<GameListAction>) {
  dispatch(gameListActionCreators.loading());
  try {
    const response = await fetch(
      `https://games.directory/api/v1/play_station/games/`,
      {
        method: 'GET',
      },
    );
    const games: GamesResponse = await response.json();
    dispatch(gameListActionCreators.success(games.games));
  } catch (e) {
    dispatch(gameListActionCreators.failure());
  }
}