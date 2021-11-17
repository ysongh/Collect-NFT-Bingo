import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Card, Button } from 'antd';

import PrizePoolCard from '../components/PrizePoolCard';

export default function Home({ collectContract }) {
  const router = useRouter();

  const [numberOfCollection, setNumberOfCollection] = useState(0);
  const [collections, setCollections] = useState([]);
  const [transactionHash, setTransactionHash] = useState('');
  const [lootBoxLoading, setLootBoxLoading] = useState(false);
  const [createCollectionLoading, setCreateCollectionLoading] = useState(false);

  useEffect(() => {
    if(collectContract) getCollectionData();
  }, [collectContract])

  async function getCollectionData(){
    const temp = [];
    const num = await collectContract.poolCount();
    setNumberOfCollection(num);

    for(let i = 1; i <= num; i++) {
      const data = await collectContract.pools(i);
      temp.push(data);
    }

    setCollections(temp);
  }

  async function createCollection(){
    try{
      setCreateCollectionLoading(true);
      await collectContract.createPool();
      await getCollectionData();
      setCreateCollectionLoading(false);
    } catch(error) {
      console.error(error);
      setCreateCollectionLoading(false);
    }
  }

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
      <PrizePoolCard 
        collectionsNum={numberOfCollection}
        poolPrize={600}
        awardedWon={300} />

      <center style={{ margin: '2rem 0'}}>
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
      
      <Row gutter={[10, 10]} style={{ marginTop: '1rem' }}>
        {collections.map(collection => (
          <Col key={collection.id} className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 6 }}>
            <Card>
              <Card.Meta title={`Collection #${collection.id}`} description="Prize Pool: $200" />
              <br />
              <Button type="primary" onClick={() => router.push(`/collection/${collection.id}`)}>
                View
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <center style={{ margin: '2rem 0'}}>
        <Button type="primary" size="large" onClick={createCollection} loading={createCollectionLoading}>
          Create your Collection
        </Button>
      </center>
    </div>
  )
}
