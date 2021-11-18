import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'antd';

export default function Lootbox({ collectContract }) {
  const [transactionHash, setTransactionHash] = useState('');
  const [lootBoxLoading, setLootBoxLoading] = useState(false);

  async function buyLootBox(){
    try{
      setLootBoxLoading(true);

      const transaction = await collectContract.buyLootBox();
      const tx = await transaction.wait();
      console.log(tx);

      setTransactionHash(tx.transactionHash);
      setLootBoxLoading(false);
    } catch(error) {
      console.error(error);
      setLootBoxLoading(false);
    }
  }

  return (
    <div>
      <center style={{ margin: '2rem 0'}}>
				<h1>A lootbox contains a set of 5 random images</h1>
				<p>If you are lucky enough, you might get all the images in one collection from a lootbox and win the prize pool </p>

				<br/>
				
				<h2>Price: $10</h2>
        <Button type="primary" size="large" onClick={buyLootBox} loading={lootBoxLoading}>
          Purchase a lootbox
        </Button>
        {transactionHash &&
          <p className="transactionHash">
            Success, see transaction {" "}
            <a href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
              {transactionHash.substring(0, 10) + '...' + transactionHash.substring(56, 66)}
            </a>
          </p>
        }
      </center>
    </div>
  )
}
