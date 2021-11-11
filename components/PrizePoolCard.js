import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

function PrizePoolCard({ collectionsNum, poolPrize, awardedWon }) {
  return (
    <Card>
      <Row gutter={16}>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <Statistic title="Number of Collection for Prize" value={`${collectionsNum}`} />
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <Statistic title="Total Pool Prize" value={`$${poolPrize}`} />
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <Statistic title="Total Winnings Awarded" value={`$${awardedWon}`} />
        </Col>
    	</Row>
    </Card>
  )
}

export default PrizePoolCard;