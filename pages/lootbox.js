import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Row, Col, Button } from 'antd';

export default function Lootbox({ collectContract }) {
  const [transactionHash, setTransactionHash] = useState('');
  const [lootBoxLoading, setLootBoxLoading] = useState(false);
  const [pieceWonList, setPieceWonList] = useState([]);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    getImagesFromContract();
  }, [pieceWonList])

  async function buyLootBox(){
    try{
      setLootBoxLoading(true);

      const ethToWei = ethers.utils.parseUnits('0.5', 'ether');
      const transaction = await collectContract.buyLootBox({ value: ethToWei });
      const tx = await transaction.wait();
      console.log(tx);

      setTransactionHash(tx.transactionHash);
      setPieceWonList(tx.events[4].args[0]);
      setLootBoxLoading(false);
      console.log(tx.events[4].args[0]);
    } catch(error) {
      console.error(error);
      setLootBoxLoading(false);
    }
  }

  async function getImagesFromContract(){
    let temp = [];

    for(let i = 0; i < pieceWonList.length; i++){
      const imageURL = await collectContract.images(pieceWonList[i]);
      temp.push(imageURL[2]);
    }
    console.log(temp);
    setImageList(temp);
  }

  return (
    <div>
      <center style={{ margin: '2rem 0'}}>
        <h1>A lootbox contains a set of 5 random images</h1>
        <p>If you are lucky enough, you might get all the images in one collection from a lootbox and win the prize pool </p>

        <br/>

        <img
          src="https://bafybeihp7nbjque6nbj2airvuhfqzyoxpon7plszajf667zvnndp5lao3i.ipfs.dweb.link/lootbox.png"
          alt="Logo"
          width="100"
          height="100" />

        <br />

        <h2>Price: 0.5 MATIC</h2>
        <Button type="primary" size="large" onClick={buyLootBox} loading={lootBoxLoading}>
          Purchase a lootbox
        </Button>
        {transactionHash &&
          <>
            <p className="transactionHash">
              Success, see transaction {" "}
              <a href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
                {transactionHash.substring(0, 10) + '...' + transactionHash.substring(56, 66)}
              </a>
            </p>
            <p>You got the following</p>
          </>
        }
        
        <Row gutter={[10, 10]} style={{ maxWidth: '600px', marginTop: '2rem'}}>
          {imageList.map((piece, index) => (
            <Col key={index} className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }}>
              <img src={piece} alt="Piece" width={'100%'}/>
            </Col>
          ))}
      </Row>
      </center>
    </div>
  )
}
