import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

function AddFundModal({ isModalVisible, setIsModalVisible, fundTransactionHash, addFund }) {
  const [amount, setAmount] = useState(0);

  return (
    <Modal title="Add fund to the Collection" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => addFund(amount)}>
      <Form.Item
          name="code"
          style={{ maxWidth: '500px'}}
        >
          <p>Enter Amount (MATIC)</p>
          <Input onChange={(e) => setAmount(e.target.value)} />
        </Form.Item>

      {fundTransactionHash &&
          <p className="transactionHash">
            Success, see transaction {" "}
            <a href={`https://mumbai.polygonscan.com/tx/${fundTransactionHash}`} target="_blank" rel="noopener noreferrer">
              {fundTransactionHash.substring(0, 10) + '...' + fundTransactionHash.substring(56, 66)}
            </a>
          </p>
        }
    </Modal>
  )
}

export default AddFundModal;