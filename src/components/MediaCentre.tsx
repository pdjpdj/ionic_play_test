import { IonButton, IonCard, IonContent, IonFooter, IonLabel, IonList, IonModal, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { GameDetailItem, GameMedia } from '../reducers/gameDetail';
import './MediaCentre.css';
import MediaItem from './MediaItem';

interface MediaCentreProps {
  game: GameDetailItem,
}

const MediaCentre: React.FC<MediaCentreProps> = (props: MediaCentreProps) => {
  const [showModal, setShowModal] = useState(false);
  const {game} = props;
  const maxMedia = 3;

  const medias = game.medias.length > maxMedia ? game.medias.slice(0, maxMedia) : game.medias;
  
  if (medias.length) {
      return (
        <IonCard className='media-centre'>
          <IonModal isOpen={showModal}>
            <IonContent className='media-centre-modal'>
              <IonList>
                {game.medias.map((media: GameMedia) => 
                    <MediaItem media={media} cover={game.covers.service_url} key={media.id} isFirst={true}/>
                  )
                }
              </IonList>
            </IonContent>
            <IonFooter>
              <IonToolbar className='media-centre-toolbar'>
                <IonButton onClick={() => setShowModal(!showModal)}>Close all media items</IonButton>
              </IonToolbar>
            </IonFooter>
          </IonModal>
          <IonLabel >Media centre:</IonLabel>
          <div>
            <div className='medias'>
              {medias.map((media: GameMedia, index: number) => 
                <MediaItem media={media} cover={game.covers.service_url} key={media.id} isFirst={index===0}/>
              )}
            </div>
            {medias.length < game.medias.length
              ?
              <IonButton size='small' onClick={() => setShowModal(!showModal)}>Show all {game.medias.length} media items</IonButton>
              : null
            }
          </div>
        </IonCard>
      );
    } else {
      return null;
    }
};

export default MediaCentre;
