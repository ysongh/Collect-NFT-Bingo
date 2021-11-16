import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Card, Divider, Button } from 'antd';

export default function CollectionDetail({ collectContract }) {
  const router = useRouter();
  const { id } = router.query;

  const [collection, setCollection] = useState({});

  useEffect(() => {
    if(collectContract) getCollectionData();
  }, [collectContract])

  async function getCollectionData(){
    const data = await collectContract.pools(id);
    console.log(data)
    setCollection(data);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h1>Collection #{collection.id && collection.id.toString()}</h1>
          <p>Owner {collection.owner && collection.owner.toString()}</p>
        </div>
        
        <Button type="primary" size="large">
          Add Image to Collection
        </Button>
      </div>
      

      <Row gutter={[10, 10]} style={{ marginTop: '1rem' }}>
        <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 6 }}>
          <Card>
            <Card.Meta title="Image" />
          </Card>
        </Col>
        <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 6 }}>
          <Card>
            <Card.Meta title="Image" />
          </Card>
        </Col>
        <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 6 }}>
          <Card>
            <Card.Meta title="Image" />
          </Card>
        </Col>
        <Col className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 6 }}>
          <Card>
            <Card.Meta title="Image" />
          </Card>
        </Col>
      </Row>

      <center style={{ margin: '2rem 0'}}>
        <h2>Prize Pool: $400</h2>
        <Button type="primary" size="large">
          Claim Prize
        </Button>
        <br />
        <br />
        <p>
          To claim prize, you must have all the images in the collection
        </p>
        <p>
          Winners receive 50% of the prize pool.
        </p>
      </center>

      <Divider>Earn a Piece</Divider>
      <p>Comming Soon...</p>
    </div>
  )
}
