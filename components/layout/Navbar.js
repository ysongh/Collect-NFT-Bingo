import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Button } from 'antd';

function Navbar() {
  return (
    <Layout.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h2 style={{ flex: 1, color: 'white'}}>Logo</h2>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link href="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/">
            Lootbox
          </Link>
        </Menu.Item>
				<Menu.Item key="3">
          <Link href="/">
            Collection
          </Link>
        </Menu.Item>
				<Menu.Item key="4">
          <Link href="/">
            My Account
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  )
}

export default Navbar;