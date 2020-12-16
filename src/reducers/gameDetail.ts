interface GameInfo {
  name: string;
  label: string;
}

interface GameMeta {
  meta_type: string;
  value: string;
}

interface GameTrophy {
  id: number;
  name: string;
  covers: {
    service_url: string;
  };
}

interface GameMedia {
  id: number;
  remote_type: string;
  covers: {
    service_url: string;
  };
}

interface GameSku {
  id: number;
  price_cents: number;
  price_currency: string;
}

export interface GameDetailItem {
  id: number;
  name: string | undefined;
  platforms: string[] | undefined;
  description: string;
  publishers: GameInfo[];
  genres: GameMeta[];
  trophies: GameTrophy[];
  release_date: string;
  medias: GameMedia[];
  covers: {
    service_url: string | undefined;
  };
  rating: {
    score: number;
  };
  skus: GameSku[];
  slug: string | undefined;
}

interface GameDetailState {
  loading: boolean;
  error: boolean;
  gameDetail: GameDetailItem | undefined;
}

interface GameDetailActionPayload {
  game: GameDetailItem;
}

export interface GameDetailAction {
  type: string;
  payload?: GameDetailActionPayload;
}

const gameDetailActionTypes = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const gameDetailActionCreators = {
  loading: () => ({
    type: gameDetailActionTypes.LOADING
  }),
  failure: () => ({
    type: gameDetailActionTypes.FAILURE
  }),
  success: (payload: GameDetailActionPayload) => ({
    type: gameDetailActionTypes.SUCCESS, 
    payload
  }),
};

export const gameDetailInitialState: GameDetailState = {
  loading: true,
  error: false,
  gameDetail: undefined,
};

export function gameDetailReducer(
  state: GameDetailState,
  action: GameDetailAction,
): GameDetailState {
  switch (action.type) {
    case gameDetailActionTypes.LOADING:
      return {...state, loading: true, error: false,};
    case gameDetailActionTypes.FAILURE:
      return {...state, loading: false, error: true,};
    case gameDetailActionTypes.SUCCESS:
      return {
        ...state, 
        loading: false, 
        error: false, 
        gameDetail: action.payload?.game,
      };
    default:
      return state;
  }
};
