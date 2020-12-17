import { IonLoading,IonLabel, IonCard, IonList, IonItem } from '@ionic/react';
import React, { useEffect, useReducer } from 'react';
import { fetchStore } from '../api/gamesStore';
import { storeInitialState, StoreItem, storeReducer } from '../reducers/gameStore';
import './Store.css';

interface StorePorps {
  slug: string;
}

const Store: React.FC<StorePorps> = (props: StorePorps) => {
  const [state, dispatch] = useReducer(storeReducer, storeInitialState);

  const {loading, gameStore, error} = state;

  useEffect(() => {    
    //TODO: fix the warning caused here: (need to return a cleanup)
    fetchStore(props.slug, dispatch);
  }, [props.slug]);

  if (loading) {
    return (
      <div>
        <IonLoading
          isOpen={loading}
          message={'Loading store...'}
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
    <IonCard className='store'>
      <IonLabel>Store:</IonLabel>
      {gameStore && gameStore.children.length 
        ?
          <IonList>
            {gameStore.children.map((item: StoreItem) => {
              if (item.child.name) {
                return (
                  <IonItem routerLink={`/game/${item.child.name}/${item.child.slug}`} key={item.id}>
                    <div>
                      <IonLabel>{item.child.name}</IonLabel>
                      <IonLabel><div className='category'>{item.child.category}</div></IonLabel>
                    </div>
                  </IonItem>
                );
              }
              return null; 
            })}
          </IonList>
        : <IonLabel>Nothing in store for this game</IonLabel>
      }
    </IonCard>
  );
};

export default Store;
