import { IonContent, IonLoading,IonLabel, IonCard, IonImg } from '@ionic/react';
import React, { useEffect, useReducer } from 'react';
import { fetchGame } from '../api/gamesDetail';
import { gameDetailInitialState, gameDetailReducer } from '../reducers/gameDetail';
import './GameDetail.css';

interface GameDetailProps {
  slug: string;
}

const GameDetail: React.FC<GameDetailProps> = (props: GameDetailProps) => {
  const [state, dispatch] = useReducer(gameDetailReducer, gameDetailInitialState);

  const {loading, gameDetail, error} = state;

  useEffect(() => {
    fetchGame(props.slug, dispatch);
  }, [props.slug]);

  if (loading) {
    return (
      <div>
        <IonLoading
          isOpen={loading}
          message={'Loading game...'}
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
    <IonContent>
      {gameDetail ? 
        <IonCard className='game-card'>
          <IonImg src={gameDetail.covers.service_url} alt={gameDetail.name} className='cover-image'></IonImg>
          <IonCard className='game-detail'>
            <IonLabel>{gameDetail.name}</IonLabel>
            <IonLabel>Platform: {gameDetail.platforms?.map(platform => platform)}</IonLabel>
            <IonLabel>Publisher: {gameDetail.publishers[0].label}</IonLabel>
            {gameDetail.genres.length 
              ?
              <IonLabel>Genre: {gameDetail.genres[0].value}</IonLabel>
              : null
            }
            <IonLabel>Release date: {(new Date(gameDetail.release_date)).toLocaleDateString()}</IonLabel>
            <IonLabel>Rating: {gameDetail.rating.score}</IonLabel>
            <IonLabel>Price: {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: gameDetail.skus[0].price_currency
              }).format(gameDetail.skus[0].price_cents/100)}</IonLabel>
            <div dangerouslySetInnerHTML={{ __html: gameDetail.description }} />
            <div className='game-trophies'>
              {gameDetail.trophies.length
                ?
                gameDetail.trophies.map(trophy => (
                  <IonImg src={trophy.covers.service_url} key={trophy.id}></IonImg>
                ))
                :
                <IonLabel>No trophies for this game</IonLabel>
              }
            </div>
            {gameDetail.medias.length
              ?
              gameDetail.medias.map(media => {
                if (media.remote_type === 'screenshot') {
                  return <IonImg src={media.covers.service_url} key={media.id}></IonImg>
                } else {
                  return <video controls playsInline preload='none' key={media.id}>
                    <source src={media.covers.service_url} type='video/mp4'/>
                  </video>
                }
              })
              : null
            }
          </IonCard>
        </IonCard>
        : 
        'nothing loaded'
      }
    </IonContent>
  );
};

export default GameDetail;
