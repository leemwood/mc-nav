'use client'

import { useState, useEffect } from 'react'
import { Card, Spin, Tag, Button, Row, Col, Alert } from 'antd'

interface Website {
  id: number
  name: string
  url: string
  description: string
  category: string
}

export default function WebsitesSection() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchWebsites()
  }, [])

  const fetchWebsites = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/data/websites')
      if (!response.ok) {
        throw new Error('获取数据失败')
      }
      const data = await response.json()
      setWebsites(data)
    } catch (err) {
      setError('加载网站数据时出错')
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      '官方': 'blue',
      '模组': 'purple',
      '社区': 'green',
      '百科': 'orange',
      '工具': 'cyan'
    }
    return colors[category as keyof typeof colors] || 'default'
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
      <h2 className="text-3xl font-bold mb-6">实用网站导航</h2>
      <Row gutter={[16, 16]}>
        {websites.map((website) => (
          <Col xs={24} sm={12} lg={8} key={website.id}>
            <Card
              title={website.name}
              extra={
                <Tag color={getCategoryColor(website.category)}>
                  {website.category}
                </Tag>
              }
              hoverable
              actions={[
                <Button 
                  type="link" 
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  访问网站
                </Button>
              ]}
            >
              <p className="text-gray-600">{website.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}