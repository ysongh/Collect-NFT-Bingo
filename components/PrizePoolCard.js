import React from 'react';
import { ethers } from 'ethers';
import { Card, Row, Col, Statistic } from 'antd';

function PrizePoolCard({ collectionsNum, poolPrize, awardedWon }) {
  return (
    <Card style={{ background: '#94daff'}}>
      <Row gutter={16}>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <center>
            <Statistic title="Number of Collection for Prize" value={`${collectionsNum}`} />
          </center>
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <center>
            <Statistic title="Total Pool Prize" value={`MATIC ${ethers.utils.formatUnits(poolPrize.toString(), 'ether')}`} />
          </center>
        </Col>
        <Col className="gutter-col" sm={{ span: 24 }} md={{ span: 8 }}>
          <center>
            <Statistic title="Total Winnings Awarded" value={`$${awardedWon}`} />
          </center>
        </Col>
        
    	</Row>
    </Card>
  )
}

export default PrizePoolCard;