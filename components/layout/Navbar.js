import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Button } from 'antd';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import CollectNFT from '../../artifacts/contracts/CollectNFT.sol/CollectNFT.json';

function Navbar({ walletAddress, setWalletAddress, setCollectContract }) {
  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);  
    console.log(provider);

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWalletAddress(address);
    console.log();

    let contract = new ethers.Contract(process.env.NEXT_PUBLIC_COLLECTNFTADDRESS, CollectNFT.abi, signer);
    setCollectContract(contract);
  }

  return (
    <Layout.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h2 style={{ color: 'white'}}>Logo</h2>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link href="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/lootbox">
            Lootbox
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/collection/all">
            Collections
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link href="/collection/my-collection">
            My Account
          </Link>
        </Menu.Item>
      </Menu>
      <Button
        style={{ margin: '0 1rem'}}
        type="primary"
        onClick={connectWallet}
      >
        {walletAddress ? walletAddress.substring(0,8) + "..." + walletAddress.substring(34,42) : "Connect to Wallet"}
      </Button>
    </Layout.Header>
  )
}

export default Navbar;