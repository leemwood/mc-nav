'use client'

import { useState } from 'react'
import { Menu, Drawer, Button, Input } from 'antd'
import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onSearch?: (query: string) => void
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
  {
    key: 'search',
    label: '搜索',
  },
]

export default function Header({ activeTab, setActiveTab, onSearch }: HeaderProps) {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'search') {
      setSearchVisible(true)
    } else {
      setActiveTab(key)
    }
    setDrawerVisible(false) // 关闭抽屉菜单
  }

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const closeDrawer = () => {
    setDrawerVisible(false)
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setActiveTab('search')
      setSearchVisible(false)
      // 调用父组件的搜索处理函数
      if (onSearch) {
        onSearch(searchQuery)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Minecraft导航</h1>
          
          {/* 桌面端搜索框 - 隐藏在小屏幕上 */}
          <div className="hidden md:flex items-center space-x-4">
            <Input
              placeholder="搜索资源..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              prefix={<SearchOutlined />}
              suffix={
                <Button 
                  type="text" 
                  size="small"
                  onClick={handleSearch}
                  className="text-white hover:bg-gray-700"
                >
                  搜索
                </Button>
              }
              className="w-64"
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}
            />
            
            {/* 桌面端菜单 */}
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
                minWidth: '300px'
              }}
              theme="dark"
            />
          </div>
          
          {/* 移动端汉堡菜单按钮 - 显示在小屏幕上 */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              type="text" 
              icon={<SearchOutlined />} 
              onClick={() => setSearchVisible(true)}
              className="text-white hover:bg-gray-800"
              style={{ color: 'white' }}
            />
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

      {/* 移动端搜索弹窗 */}
      <Drawer
        title="搜索资源"
        placement="top"
        onClose={() => setSearchVisible(false)}
        open={searchVisible}
        className="md:hidden"
        styles={{
          body: {
            padding: '20px',
            background: '#000'
          },
          header: {
            background: '#000',
            borderBottom: '1px solid #333'
          }
        }}
      >
        <div className="space-y-4">
          <Input
            size="large"
            placeholder="输入关键词搜索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            prefix={<SearchOutlined />}
            suffix={
              <Button 
                type="primary" 
                size="small"
                onClick={handleSearch}
              >
                搜索
              </Button>
            }
          />
          <div className="text-center">
            <p className="text-gray-400 text-sm">支持搜索网站、启动器、模组等资源</p>
          </div>
        </div>
      </Drawer>

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