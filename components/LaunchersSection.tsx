'use client'

import { useState, useEffect } from 'react'
import { Card, Spin, Switch, Button, Row, Col, Alert, Tag, Space } from 'antd'

interface Launcher {
  id: number
  name: string
  description: string
  downloadUrl: string
  version: string
  platform: string
}

export default function LaunchersSection() {
  const [launchers, setLaunchers] = useState<Launcher[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [proxyEnabled, setProxyEnabled] = useState(false)

  useEffect(() => {
    fetchLaunchers()
  }, [])

  const fetchLaunchers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/data/launchers')
      if (!response.ok) {
        throw new Error('获取数据失败')
      }
      const data = await response.json()
      setLaunchers(data)
    } catch (err) {
      setError('加载启动器数据时出错')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (launcher: Launcher) => {
    try {
      let downloadUrl = launcher.downloadUrl
      
      if (proxyEnabled && launcher.downloadUrl.includes('github.com')) {
        // 使用代理下载GitHub资源
        downloadUrl = `/api/proxy?url=${encodeURIComponent(launcher.downloadUrl)}`
      }
      
      window.open(downloadUrl, '_blank')
    } catch (err) {
      alert('下载链接打开失败，请检查网络连接')
    }
  }

  const getPlatformColor = (platform: string) => {
    const colors = {
      'Windows': 'blue',
      'macOS': 'purple',
      'Linux': 'green',
      '跨平台': 'orange'
    }
    return colors[platform as keyof typeof colors] || 'default'
  }

  if (loading) return (
    <div className="text-center py-8">
      <Spin size="large" tip="加载中..." />
    </div>
  )
  
  if (error) return (
    <div className="py-8">
      <Alert message={error} type="error" showIcon />
    </div>
  )

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">启动器下载</h2>
        <Space>
          <Switch 
            checked={proxyEnabled}
            onChange={setProxyEnabled}
          />
          <span className="text-sm text-gray-600">启用GitHub代理下载</span>
        </Space>
      </div>
      
      <Row gutter={[16, 16]}>
        {launchers.map((launcher) => (
          <Col xs={24} lg={12} key={launcher.id}>
            <Card
              title={launcher.name}
              extra={
                <Space>
                  <Tag color="blue">版本: {launcher.version}</Tag>
                  <Tag color={getPlatformColor(launcher.platform)}>
                    {launcher.platform}
                  </Tag>
                </Space>
              }
              hoverable
            >
              <p className="text-gray-600 mb-4">{launcher.description}</p>
              <Button 
                type="primary" 
                onClick={() => handleDownload(launcher)}
                block
              >
                下载启动器
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}