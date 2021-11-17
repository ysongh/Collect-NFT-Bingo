import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Card, Divider, Button } from 'antd';

export default function CollectionDetail({ collectContract }) {
  const router = useRouter();
  const { id } = router.query;

  const [collection, setCollection] = useState({});
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if(collectContract) getCollectionData();
  }, [collectContract])

  async function getCollectionData(){
    const data = await collectContract.pools(id);
    console.log(data)
    setCollection(data);

    
    const poolImages = await collectContract.getPoolImages(id);
    console.log(poolImages);

    let temp = [];
    for(let i = 0; i < poolImages.length; i++) {
      const imageId = poolImages[i];
      const data = await collectContract.images(imageId);
      temp.push(data);
    }

    setImageList(temp);
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h1>Collection #{collection.id && collection.id.toString()}</h1>
          <p>Owner {collection.owner && collection.owner.toString()}</p>
        </div>
        
        <Button type="primary" size="large"  onClick={() => router.push(`/collection/${id}/add-image`)}>
          Add Image to Collection
        </Button>
      </div>
      

      <Row gutter={[10, 10]} style={{ marginTop: '1rem' }}>
        {imageList.map(image => (
          <Col key={image.id.toString()} className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 6 }}>
            <Card cover={<img src={image.url} alt="Collection Image" />}>
              <Card.Meta title={`Image #${image.id.toString()}`} />
            </Card>
          </Col>
        ))}
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
