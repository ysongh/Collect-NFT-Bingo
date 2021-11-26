import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { Row, Col, Card, Divider, Button } from 'antd';

import CollectionBreadcrumb from '../../../components/common/CollectionBreadcrumb';

export default function CollectionDetail({ collectContract }) {
  const router = useRouter();
  const { id } = router.query;

  const [collection, setCollection] = useState({});
  const [imageList, setImageList] = useState([]);
  const [isWinnerText, setIsWinnerText] = useState("");

  useEffect(() => {
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

    if(collectContract) getCollectionData();
  }, [collectContract])

  async function claimPrize() {
    const isWinner = await collectContract.checkWinner(id);
    console.log(isWinner);

    if(isWinner) setIsWinnerText("You Won!");
    else setIsWinnerText("You did not win!");
  }

  return (
    <div>
      <CollectionBreadcrumb collectionId={id} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h1>Collection:{collection.collectionName && collection.collectionName.toString()}</h1>
          <p>Owner {collection.creatorName && collection.creatorName.toString()} ({collection.owner && collection.owner.toString()})</p>
        </div>
        
        <Button type="primary" size="large"  onClick={() => router.push(`/collection/${id}/add-image`)}>
          Add Image to Collection
        </Button>
      </div>
      
      <p>{collection.description && collection.description.toString()}</p>

      <Row gutter={[10, 10]} style={{ marginTop: '1rem' }}>
        {imageList.map(image => (
          <Col key={image.id.toString()} className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Card cover={<img src={image.url} alt="Collection Image" />}>
              <Card.Meta title={`Image #${image.id.toString()}`} />
            </Card>
          </Col>
        ))}
      </Row>

      <center style={{ margin: '2rem 0'}}>
        <h2>Prize Pool: MATIC {collection.poolPrize ? ethers.utils.formatUnits(collection.poolPrize.toString(), 'ether') : 0}</h2>
        <Button type="primary" size="large" onClick={claimPrize}>
          Claim Prize
        </Button>
        <br />
        <h4>{isWinnerText}</h4>
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
