import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import coin from '../images/coin.png';
import '../styles/Coin.css';

export default function Coin() {
  const [rotating, setRotating] = useState(false)
  
  const handleCoinFlip = () => {
    setRotating(true);
    setTimeout(() => setRotating(false), 1500);
    headsOrTails();
  }

  const headsOrTails = () => {
    const num = Math.random();
    if (num >= 0.5) {
      
    }
  }


  return (
    <Image onClick={() => handleCoinFlip()} src={coin} className={rotating ? 'rotate' : ''}/>
  )
}
