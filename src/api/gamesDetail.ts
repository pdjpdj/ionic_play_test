import React from 'react';
import { GameDetailAction, gameDetailActionCreators, GameDetailItem } from '../reducers/gameDetail';
interface GameResponse {
  success: boolean;
  game: GameDetailItem;
}

export const GAME_DETAIL_URL = 'https://games.directory/api/v1/play_station/games/';

export async function fetchGame(slug: string, dispatch: React.Dispatch<GameDetailAction>) {
  dispatch(gameDetailActionCreators.loading());
  try {
    const response = await fetch(
      `${GAME_DETAIL_URL}${slug}`,
      {
        method: 'GET',
      },
    );
    const game: GameResponse = await response.json();
    dispatch(gameDetailActionCreators.success({
      game: game.game
    }));
  } catch (e) {
    dispatch(gameDetailActionCreators.failure());
  }
}