import { IonButton, IonCard, IonContent, IonLabel, IonModal } from '@ionic/react';
import React, { useState } from 'react';
import { GameDetailItem } from '../reducers/gameDetail';
import './Description.css';

interface DescriptionProps {
  game: GameDetailItem,
}

const Description: React.FC<DescriptionProps> = (props: DescriptionProps) => {
  const [showModal, setShowModal] = useState(false);
  const {game} = props;
  console.log(game.description);
  let desc = null
    if (game.description) {
      desc = game.description.match(/<b[^>]*>([^<]+)<\/b>/);
      if(!desc?.length) {
        desc = [`${game.description.substr(0, 250)}...`]
      }
    } 
  return (
    <>
    {desc ?
      <IonCard className='description'>
        <IonModal isOpen={showModal}>
          <IonContent>
            <div className='description-modal' dangerouslySetInnerHTML={{ __html: game.description }} />
            <IonButton onClick={() => setShowModal(!showModal)}>Close full description</IonButton>
          </IonContent>
        </IonModal>
        <IonLabel >Description:</IonLabel>
        <div dangerouslySetInnerHTML={{ __html: desc?.length ? desc[0] : '' }} />
        <IonButton size='small' onClick={() => setShowModal(!showModal)}>Show full description</IonButton>
      </IonCard>
      : null
    }
    </>
  );
};

export default Description;
