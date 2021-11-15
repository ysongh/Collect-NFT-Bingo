import React, { useState } from 'react';
import { Layout } from 'antd';

import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar'

import "antd/dist/antd.css";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [collectContract, setCollectContract] = useState(null);

  return (
    <div>
      <Header />
      <Navbar
        walletAddress={walletAddress}
        setWalletAddress={setWalletAddress}
        setCollectContract={setCollectContract} />
      <Layout.Content style={{ padding: '10px 50px 20px 50px', minHeight: '82vh' }}>
        <Component
        {...pageProps}
        walletAddress={walletAddress}
        collectContract={collectContract} />
      </Layout.Content>
    </div>
  )
}

export default MyApp;
