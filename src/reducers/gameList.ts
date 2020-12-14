interface CoversUrl {
  service_url: string;
}

export interface GameListItem {
  id: number;
  name: string;
  platforms: string[];
  covers: CoversUrl;
}

interface GameListState {
  loading: boolean;
  error: boolean;
  gameList: GameListItem[] | undefined;
}

export interface GameListAction {
  type: string;
  payload?: GameListItem[];
}

const gameListActionTypes = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const gameListActionCreators = {
  loading: () => ({type: gameListActionTypes.LOADING}),
  failure: () => ({type: gameListActionTypes.FAILURE}),
  success: (payload: GameListItem[]) => ({type: gameListActionTypes.SUCCESS, payload}),
};

export const gameListInitialState: GameListState = {
  loading: true,
  error: false,
  gameList: undefined,
};

export function gameListReducer(
  state: GameListState,
  action: GameListAction,
): GameListState {
  switch (action.type) {
    case gameListActionTypes.LOADING:
      return {...state, loading: true, error: false};
    case gameListActionTypes.FAILURE:
      return {...state, loading: false, error: true};
    case gameListActionTypes.SUCCESS:
      return {...state, loading: false, error: false, gameList: action.payload};
    default:
      return state;
  }
};
