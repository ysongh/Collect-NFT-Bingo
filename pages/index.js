import React from 'react';

import PrizePoolCard from '../components/PrizePoolCard';

export default function Home() {
  return (
    <div>
      <PrizePoolCard 
        collectionsNum={3}
        poolPrize={600}
        awardedWon={300} />
    </div>
  )
}
