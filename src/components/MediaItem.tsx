import { IonImg } from '@ionic/react';
import React from 'react';
import { GameMedia } from '../reducers/gameDetail';
import './MediaItem.css';

interface MediaItemProps {
  media: GameMedia,
  cover: string | undefined,
}

const MediaItem: React.FC<MediaItemProps> = (props: MediaItemProps) => {
  const {media, cover} = props;
  
  if (media.remote_type === 'screenshot') {
    return <IonImg src={media.covers.service_url}></IonImg>
  } else {
    return <video controls playsInline preload='none' className='video' poster={cover}>
      <source src={media.covers.service_url} type='video/mp4'/>
    </video>
  }
  
};

export default MediaItem;
