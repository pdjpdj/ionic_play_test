import { IonImg } from '@ionic/react';
import React from 'react';
import { GameMedia } from '../reducers/gameDetail';
import './MediaItem.css';

interface MediaItemProps {
  media: GameMedia,
  cover: string | undefined,
  isFirst: boolean,
}

const MediaItem: React.FC<MediaItemProps> = (props: MediaItemProps) => {
  const {media, cover, isFirst} = props;
  
  if (media.remote_type === 'screenshot') {
    return <IonImg src={media.covers.service_url} className={isFirst ? 'first' : ''}></IonImg>
  } else {
    if (isFirst) {
      return <video controls playsInline preload='none' className='first video' poster={cover}>
        <source src={media.covers.service_url} type='video/mp4'/>
      </video>
    } else {
      return <IonImg src={cover} ></IonImg>
    }
  }
  
};

export default MediaItem;
