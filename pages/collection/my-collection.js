import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Card, Typography } from 'antd';

export default function MyCollection({ collectContract }) {
  const router = useRouter();
  const { id } = router.query;

  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if(collectContract) getUserCollectionData();
  }, [collectContract])

  async function getUserCollectionData(){
    const num = await collectContract.poolCount();

    let temp = [];
    for(let p = 1; p <= num; p++) {
      let obj = {};
      let list = [];

      const userImages = await collectContract.getUserImages(p);
      console.log(userImages);

      for(let i = 0; i < userImages.length; i++) {
        const imageId = userImages[i];
        const data = await collectContract.images(imageId);
        list.push(data);
      }

      obj.id = p;
      obj.imageList = list;
      temp.push(obj);
    }
    setImageList(temp);
  }

  

  return (
    <div>
      <Typography.Title style={{ marginTop: '1rem' }}>
        My Collections
      </Typography.Title>
      {imageList.map(image => (
        <div style={{ marginBottom: '1rem'}}>
          <h2>Collection #{image.id.toString()}</h2>

          <Row key={image.id.toString()}gutter={[10, 10]} style={{ marginTop: '1rem' }}>
            {image.imageList.map(collection => (
              <Col key={collection.id.toString()} className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 4 }}>
                <Card cover={<img src={collection.url} alt="Collection Image" />}>
                  <Card.Meta title={`Image #${collection.id.toString()}`} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  )
}
