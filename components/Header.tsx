'use client'

import { useState } from 'react'
import { Menu, Drawer, Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const items: MenuProps['items'] = [
  {
    key: 'home',
    label: '首页',
  },
  {
    key: 'websites',
    label: '实用网站',
  },
  {
    key: 'launchers',
    label: '启动器下载',
  },
  {
    key: 'about',
    label: '关于我们',
  },
]

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [drawerVisible, setDrawerVisible] = useState(false)

  const handleMenuClick = ({ key }: { key: string }) => {
    setActiveTab(key)
    setDrawerVisible(false) // 关闭抽屉菜单
  }

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const closeDrawer = () => {
    setDrawerVisible(false)
  }

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Minecraft导航</h1>
          
          {/* 桌面端菜单 - 隐藏在小屏幕上 */}
          <div className="hidden md:block">
            <Menu
              mode="horizontal"
              selectedKeys={[activeTab]}
              items={items}
              onClick={handleMenuClick}
              className="bg-transparent border-none"
              style={{ 
                background: 'transparent',
                border: 'none',
                color: 'white',
                minWidth: '400px'
              }}
              theme="dark"
            />
          </div>
          
          {/* 移动端汉堡菜单按钮 - 显示在小屏幕上 */}
          <div className="md:hidden">
            <Button 
              type="text" 
              icon={<MenuOutlined />} 
              onClick={showDrawer}
              className="text-white hover:bg-gray-800"
              style={{ color: 'white' }}
            />
          </div>
        </div>
      </div>

      {/* 移动端抽屉菜单 */}
      <Drawer
        title="导航菜单"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        className="md:hidden"
        styles={{
          body: {
            padding: 0,
            background: '#000'
          },
          header: {
            background: '#000',
            borderBottom: '1px solid #333'
          }
        }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[activeTab]}
          items={items}
          onClick={handleMenuClick}
          theme="dark"
          className="bg-black border-none"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white'
          }}
        />
      </Drawer>
    </header>
  )
}