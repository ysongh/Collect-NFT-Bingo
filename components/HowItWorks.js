import React from 'react';
import Image from 'next/image';
import { Card, Row, Col, Typography } from 'antd';

function HowItWorks() {
  return (
    <div>
      <Typography.Title align="center" style={{ marginTop: '1rem' }}>
        How it Works
      </Typography.Title>
      <Card>
      <Row gutter={20} align="middle">
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <center>
            <Image
              src="/earn.png"
              alt="Logo"
              width="80"
              height="80" />
            <Typography.Paragraph>Purchase Lootboxes</Typography.Paragraph>
            <Typography.Paragraph>Or</Typography.Paragraph>
            <Image
              src="/lootbox.png"
              alt="Logo"
              width="80"
              height="80" />
            <Typography.Paragraph>Earn a Piece</Typography.Paragraph>
          </center>
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <center>
            <Image
              src="/collection.png"
              alt="Logo"
              width="150"
              height="150" />
            <Typography.Paragraph>Complete a Collection</Typography.Paragraph>
          </center>
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <center>
            <Image
              src="/coin.png"
              alt="Logo"
              width="150"
              height="150" />
            <Typography.Paragraph>Complete a Collection</Typography.Paragraph>
          </center>
        </Col>
    	</Row>
    </Card>
    </div>
  )
}

export default HowItWorks;
