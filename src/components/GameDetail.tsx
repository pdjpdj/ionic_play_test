import { IonContent, IonLoading,IonLabel, IonCard, IonImg } from '@ionic/react';
import React, { useEffect, useReducer } from 'react';
import { fetchGame } from '../api/gamesDetail';
import { gameDetailInitialState, gameDetailReducer } from '../reducers/gameDetail';
import Description from './Description';
import './GameDetail.css';
import Platform from './Platform';
import Price from './Price';
import TrophyCabinet from './TrophyCabinet';

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
            <IonLabel><h1>{gameDetail.name}</h1></IonLabel>
            <Platform game={gameDetail} />
            <IonCard className='game-info'>
              <IonLabel>Release date: {(new Date(gameDetail.release_date)).toLocaleDateString()}</IonLabel>
              {gameDetail.content_ratings.length ? <IonLabel>Parental rating: {gameDetail.content_ratings[0].label}</IonLabel> : null}
              {gameDetail.rating ? <IonLabel>Star rating: {gameDetail.rating.score}</IonLabel> : null}
              <Price game={gameDetail} />
            </IonCard>
            <Description game={gameDetail} />
            <TrophyCabinet game={gameDetail} />
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
