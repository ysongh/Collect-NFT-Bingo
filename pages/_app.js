import React from 'react';
import { Layout } from 'antd';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar'

import "antd/dist/antd.css";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Navbar />
      <Layout.Content style={{ padding: '10px 50px 20px 50px', minHeight: '82vh' }}>
        <Component {...pageProps} />
      </Layout.Content>
    </div>
  )
}

export default MyApp;
