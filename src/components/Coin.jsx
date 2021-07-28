import React from 'react';
import { Image } from 'semantic-ui-react';
import coin from '../images/coin.png';
import '../styles/Coin.css';

export default function Coin({rotating, handleCoinFlip}) {
  return (
    <Image onClick={() => handleCoinFlip()} src={coin} className={rotating ? 'rotate' : ''}/>
  )
}
