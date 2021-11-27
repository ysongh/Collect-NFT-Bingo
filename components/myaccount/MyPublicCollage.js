import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spin } from 'antd';

function MyPublicCollage({ walletAddress }) {
  const [userNFTs, setUserNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMyCollection = async () => {
      try{
        setLoading(true);
        const nft = await fetch(`https://api.covalenthq.com/v1/137/address/${walletAddress}/balances_v2/?nft=true&key=${process.env.NEXT_PUBLIC_COVALENT_APIKEY}`);
        const { data } = await nft.json();
  
        console.log(data);
        console.log(data.items[0].nft_data);
        setUserNFTs(data.items[0].nft_data);
        setLoading(false);
      } catch(error) {
        console.error(error);
        setLoading(false);
      }
    }
    
    if(walletAddress) loadMyCollection();
  }, [walletAddress])

  return (
    <Row gutter={[10, 10]} style={{ marginTop: '1rem' }}>
      {loading
        ? <Spin size="large" style={{ margin: '5rem auto'}}/>
        : userNFTs.map(nft => (
          <Col key={nft.token_id} className="gutter-row" sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
            <Card cover={<img src={nft.external_data.image} alt="Collection NFT" />}>
            </Card>
          </Col>
        ))
      }
      {!walletAddress && <p>Connect to your ETH wallet to see collections</p>}
    </Row>
  )
}

export default MyPublicCollage;
