import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { Row, Col, Card, Typography, Button } from 'antd';

export default function CollectionAll({ collectContract }) {
  const router = useRouter();

  const [numberOfCollection, setNumberOfCollection] = useState(0);
  const [poolPrize, setPoolPrize] = useState(0);
  const [collections, setCollections] = useState([]);
  const [transactionHash, setTransactionHash] = useState('');
  const [lootBoxLoading, setLootBoxLoading] = useState(false);

  useEffect(() => {
    if(collectContract) getCollectionData();
  }, [collectContract])

  async function getCollectionData(){
    const temp = [];
    const num = await collectContract.poolCount();
    setNumberOfCollection(num);

    const prizeAmount = await collectContract.getPrizePool();
    setPoolPrize(prizeAmount);

    for(let i = 1; i <= num; i++) {
      const data = await collectContract.pools(i);
      temp.push(data);
    }

    setCollections(temp);
  }

  async function buyLootBox(){
    try{
      setLootBoxLoading(true);

      const ethToWei = ethers.utils.parseUnits('1', 'ether');
      const transaction = await collectContract.buyLootBox({ value: ethToWei });
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
      <Typography.Title style={{ marginTop: '1rem' }}>
        Collections
      </Typography.Title>
      <Row gutter={[10, 10]} style={{ marginTop: '1rem' }}>
        {collections.map(collection => (
          <Col key={collection.id} className="gutter-row" sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
            <Card>
              <Card.Meta title={`${collection.collectionName}`}/>
              <Card.Meta description={`Creator: ${collection.creatorName}`} />
              <Card.Meta description={`Prize Pool: MATIC ${ethers.utils.formatUnits(collection.poolPrize.toString(), 'ether')}`} />
              <br />
              <Button type="primary" onClick={() => router.push(`/collection/${collection.id}`)}>
                View
              </Button>
            </Card>
          </Col>
        ))}
        {!collections.length && <p>Connect to your ETH wallet to see collections</p>}
      </Row>
    </div>
  )
}
