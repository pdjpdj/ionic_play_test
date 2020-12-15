export interface GameListMetaData {
  pagination: {
    Link: {
      first: string | undefined;
      prev: string | undefined;
      next: string | undefined;
      last: string | undefined;
    },
    'Current-Page': string;
    'Total-Pages': string;
  };
}

export interface GameListItem {
  id: number;
  name: string | undefined;
  platforms: string[] | undefined;
  covers: {
    service_url: string | undefined;
  };
}

interface GameListState {
  loading: boolean;
  error: boolean;
  gameList: GameListItem[] | undefined;
  meta: GameListMetaData | undefined;
}

interface GameListActionPayload {
  games: GameListItem[];
  meta: GameListMetaData;
}

export interface GameListAction {
  type: string;
  payload?: GameListActionPayload;
}

const gameListActionTypes = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const gameListActionCreators = {
  loading: () => ({
    type: gameListActionTypes.LOADING
  }),
  failure: () => ({
    type: gameListActionTypes.FAILURE
  }),
  success: (payload: GameListActionPayload) => ({
    type: gameListActionTypes.SUCCESS, 
    payload
  }),
};

export const gameListInitialState: GameListState = {
  loading: true,
  error: false,
  gameList: undefined,
  meta: undefined,
};

export function gameListReducer(
  state: GameListState,
  action: GameListAction,
): GameListState {
  switch (action.type) {
    case gameListActionTypes.LOADING:
      return {...state, loading: true, error: false,};
    case gameListActionTypes.FAILURE:
      return {...state, loading: false, error: true,};
    case gameListActionTypes.SUCCESS:
      return {
        ...state, 
        loading: false, 
        error: false, 
        gameList: action.payload?.games, 
        meta: action.payload?.meta,
      };
    default:
      return state;
  }
};
