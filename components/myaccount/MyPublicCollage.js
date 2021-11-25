import React, { useState } from "react";
import { Row, Col, Card } from 'antd';
import { useDrop } from "react-dnd";

import Picture from "../common/Picture";

function MyPublicCollage({ myPublicCollage }) {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (collection) => addImageToBoard(collection),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = ({ collection }) => {
    console.log(collection, board, "pictureList")
    setBoard((board) => [...board, collection]);
  };

  return (
    <div>
      <Row gutter={[10, 10]} style={{ marginTop: '1rem' }}>
        {myPublicCollage.map(collection => (
          <Col key={collection.id.toString()} className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 4 }}>
            <Card cover={<Picture id={collection.id.toString()} collection={collection} />}>
              <Card.Meta title={`Image #${collection.id.toString()}`} />
            </Card>
          </Col>
        ))}
      </Row>
      <div id="signatureBoard" className="Board" ref={drop}>
        <Row gutter={[10, 10]} style={{ marginTop: '1rem' }}>
          {board.map((picture, index) => (
            <Col key={index} className="gutter-row" sm={{ span: 12 }} md={{ span: 8 }} md={{ span: 4 }}> 
              <Picture id={index} collection={picture} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default MyPublicCollage;
