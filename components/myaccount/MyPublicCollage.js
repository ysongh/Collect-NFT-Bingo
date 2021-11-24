import React from 'react';
import { Row, Col, Card } from 'antd';

function MyPublicCollage({ myPublicCollage }) {
  return (
    <div>
      <Row gutter={[10, 10]} style={{ marginTop: '1rem' }}>
        {myPublicCollage.map(collection => (
          <Col key={collection.id.toString()} className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 4 }}>
            <Card cover={<img src={collection.url} alt="Collection Image" />}>
              <Card.Meta title={`Image #${collection.id.toString()}`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default MyPublicCollage;
