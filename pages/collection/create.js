import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Web3Storage } from 'web3.storage';
import { Row, Col, Form, Upload, Input, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_APIKEY });

export default function CreateCollection({ collectContract }) {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();

	const [collectionName, setCollectionName] = useState("");
	const [creatorName, setCreatorName] = useState("");
	const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(false);

  async function createCollection() {
    try {
      setLoading(true);
      console.log(image, collectionName, creatorName, description);

			const prepareImageList = image.map(i => i.originFileObj);
			console.log(prepareImageList);

      const cid = await client.put([...prepareImageList], {
        onRootCidReady: localCid => {
          console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
          console.log('> 📡 sending files to web3.storage ')
        },
        onStoredChunk: bytes => console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
      })
      console.log(`https://dweb.link/ipfs/${cid}`);

			const prepareImageURLs = image.map(i => `https://dweb.link/ipfs/${cid}/${i.name}`);
			console.log(prepareImageURLs);

      await collectContract.createPool(
				collectionName,
				creatorName,
				description,
				prepareImageURLs,
				prepareImageURLs.length
			);
			
      setLoading(false);
      router.push(`/`);
    } catch(error){
      setLoading(false);
    }
  }

  const props = {
    name: 'file',
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        setImage(info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div>
      <h1>Create your collection</h1>

      <Form form={form} layout="vertical">
        <Row style={{ marginTop: '1rem' }}>
          <Col className="gutter-row" sm={{ span: 24 }} md={{ span: 16 }} lg={{ span: 12 }}>
            <h3>Upload Images</h3>
            <Upload.Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                File types supported: JPG, PNG
              </p>
            </Upload.Dragger>

            <br />

            <Form.Item
              name="collectionName"
              label="Collection Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setCollectionName(e.target.value)} />
            </Form.Item>

						<Form.Item
              name="creatorName"
              label="Creator Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input onChange={(e) => setCreatorName(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea rows={5} onChange={(e) => setDescription(e.target.value)}/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" loading={loading} onClick={createCollection}>
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}