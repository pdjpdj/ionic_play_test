import { IonLabel } from '@ionic/react';
import React from 'react';
import { GameDetailItem } from '../reducers/gameDetail';
import './Price.css';

interface PriceProps {
  game: GameDetailItem,
}

const Price: React.FC<PriceProps> = (props: PriceProps) => {
  const {game} = props;
  return (
    <>
      {game.skus.length ? <IonLabel>Price: {new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: game.skus[0].price_currency
      }).format(game.skus[0].price_cents/100)}</IonLabel> 
      : null}
    </>
  );
};

export default Price;
