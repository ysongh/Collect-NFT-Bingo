import React from 'react';
import { Row, Col, Card } from 'antd';

function MyCollection({ imageList }) {
  return (
    <div>
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

export default MyCollection;
