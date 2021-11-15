import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'antd';

import PrizePoolCard from '../components/PrizePoolCard';

export default function Home({ collectContract }) {
  const [numberOfCollection, setNumberOfCollection] = useState(0);

  useEffect(() => {
    async function getCollectionNum(){
      const num = await collectContract.poolCount();
      setNumberOfCollection(num);
    }
    if(collectContract) getCollectionNum();
  }, [collectContract])

  return (
    <div>
      <PrizePoolCard 
        collectionsNum={numberOfCollection}
        poolPrize={600}
        awardedWon={300} />

      <center style={{ margin: '2rem 0'}}>
        <Button type="primary" size="large">
          Purchase a lootbox
        </Button>
      </center>
      
      <Row gutter={[10, 10]} style={{ marginTop: '1rem' }}>
        <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 6 }}>
          <Card>
            <Card.Meta title="Collection #1" description="Prize Pool: $200" />
            <br />
            <Button type="primary">View</Button>
          </Card>
        </Col>
        <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 6 }}>
          <Card>
            <Card.Meta title="Collection #1" description="Prize Pool: $200" />
            <br />
            <Button type="primary">View</Button>
          </Card>
        </Col>
        <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 6 }}>
          <Card>
            <Card.Meta title="Collection #1" description="Prize Pool: $200" />
            <br />
            <Button type="primary">View</Button>
          </Card>
        </Col>
        <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 6 }}>
          <Card>
            <Card.Meta title="Collection #1" description="Prize Pool: $200" />
            <br />
            <Button type="primary">View</Button>
          </Card>
        </Col>
        <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 6 }}>
          <Card>
            <Card.Meta title="Collection #1" description="Prize Pool: $200" />
            <br />
            <Button type="primary">View</Button>
          </Card>
        </Col>
      </Row>

      <center style={{ margin: '2rem 0'}}>
        <Button type="primary" size="large">
          Create your Collection
        </Button>
      </center>
    </div>
  )
}
