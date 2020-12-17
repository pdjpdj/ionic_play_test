import React from 'react';
import { GameStore, StoreAction, storeActionCreators } from '../reducers/gameStore';
interface StoreResponse {
  success: boolean;
  game: GameStore;
}

export const GAME_DETAIL_URL = 'https://games.directory/api/v1/play_station/games/';

export async function fetchStore(slug: string, dispatch: React.Dispatch<StoreAction>) {
  dispatch(storeActionCreators.loading());
  try {
    const response = await fetch(
      `${GAME_DETAIL_URL}${slug}/addons`,
      {
        method: 'GET',
      },
    );
    const store: StoreResponse = await response.json();
    dispatch(storeActionCreators.success({
      store: store.game
    }));
  } catch (e) {
    dispatch(storeActionCreators.failure());
  }
}