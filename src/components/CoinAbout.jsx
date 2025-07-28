// components/CoinAbout.jsx 
import React from 'react';

const CoinAbout = ({ coin }) => {
  if (!coin || !coin.description?.en) return null;

  const description = coin.description.en;

  return (
    <div

    >
      <h3
      
      >
        🧾 About {coin.name}
      </h3>
      <div
       
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default CoinAbout;
