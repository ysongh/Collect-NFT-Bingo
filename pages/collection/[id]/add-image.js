import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Form, Upload, Input, Button, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export default function AddImageToColllection({ collectContract }) {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();

  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log(image, values);

      await collectContract.addImageToPool(id, values.name);

      setLoading(false);
      router.push(`/collection/${id}/`);
    } catch(error){
      setLoading(false);
    }
  };

  const props = {
    name: 'file',
    multiple: true,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
        setImage(info.file);
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

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <h1>Add Image for Collection #{id}</h1>

      <Form form={form} name="control-hooks" onFinish={onFinish} layout="vertical">
        <Row style={{ marginTop: '1rem' }}>
          <Col className="gutter-row" sm={{ span: 24 }} md={{ span: 16 }} lg={{ span: 12 }}>
            <h3>Upload an Image</h3>
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
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
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
              <Input.TextArea rows={5} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Create
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
