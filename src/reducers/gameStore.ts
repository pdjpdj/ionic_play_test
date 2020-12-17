export interface StoreItem {
  id: number;
  child: {
    name: string;
    category: string;
    slug: string;
  }
}

export interface GameStore {
  id: number;
  children: StoreItem[];
}

interface StoreState {
  loading: boolean;
  error: boolean;
  gameStore: GameStore | undefined;
}

interface StoreActionPayload {
  store: GameStore;
}

export interface StoreAction {
  type: string;
  payload?: StoreActionPayload;
}

const storeActionTypes = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const storeActionCreators = {
  loading: () => ({
    type: storeActionTypes.LOADING
  }),
  failure: () => ({
    type: storeActionTypes.FAILURE
  }),
  success: (payload: StoreActionPayload) => ({
    type: storeActionTypes.SUCCESS, 
    payload
  }),
};

export const storeInitialState: StoreState = {
  loading: true,
  error: false,
  gameStore: undefined,
};

export function storeReducer(
  state: StoreState,
  action: StoreAction,
): StoreState {
  switch (action.type) {
    case storeActionTypes.LOADING:
      return {...state, loading: true, error: false,};
    case storeActionTypes.FAILURE:
      return {...state, loading: false, error: true,};
    case storeActionTypes.SUCCESS:
      return {
        ...state, 
        loading: false, 
        error: false, 
        gameStore: action.payload?.store,
      };
    default:
      return state;
  }
};
