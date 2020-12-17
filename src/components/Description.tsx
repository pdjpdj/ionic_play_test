import { IonButton, IonCard, IonContent, IonFooter, IonLabel, IonModal, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { GameDetailItem } from '../reducers/gameDetail';
import './Description.css';

interface DescriptionProps {
  game: GameDetailItem,
}

const Description: React.FC<DescriptionProps> = (props: DescriptionProps) => {
  const [showModal, setShowModal] = useState(false);
  const {game} = props;
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
          </IonContent>
          <IonFooter>
            <IonToolbar className='description-toolbar'>
              <IonButton onClick={() => setShowModal(!showModal)}>Close full description</IonButton>
            </IonToolbar>
          </IonFooter>
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
