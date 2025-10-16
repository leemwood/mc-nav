'use client'

import { useState, useEffect } from 'react'
import { Input, Button, Card, Spin, Alert, Tag, Row, Col, Empty, Space } from 'antd'
import { SearchOutlined, GlobalOutlined, DownloadOutlined } from '@ant-design/icons'

interface SearchResult {
  type: 'website' | 'launcher'
  id: number
  name: string
  description: string
  url?: string
  downloadUrl?: string
  category?: string
  version?: string
  platform?: string
  score: number
}

interface SearchResponse {
  query: string
  total: number
  results: SearchResult[]
}

interface SearchSectionProps {
  searchQuery?: string
}

export default function SearchSection({ searchQuery }: SearchSectionProps) {
  const [query, setQuery] = useState(searchQuery || '')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // 监听外部传入的搜索查询
  useEffect(() => {
    if (searchQuery && searchQuery !== query) {
      setQuery(searchQuery)
      handleSearch(searchQuery)
    }
  }, [searchQuery])

  // 热门搜索关键词
  const hotKeywords = ['Minecraft', '模组', '启动器', '社区', '官方']

  useEffect(() => {
    // 从localStorage加载搜索历史
    const savedHistory = localStorage.getItem('mc-nav-search-history')
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleSearch = async (searchQuery?: string) => {
    const searchTerm = searchQuery || query
    if (!searchTerm.trim()) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
      if (!response.ok) {
        throw new Error('搜索请求失败')
      }
      
      const data: SearchResponse = await response.json()
      setResults(data.results)
      
      // 保存搜索历史
      if (!searchHistory.includes(searchTerm)) {
        const newHistory = [searchTerm, ...searchHistory.slice(0, 9)] // 保留最近10条
        setSearchHistory(newHistory)
        localStorage.setItem('mc-nav-search-history', JSON.stringify(newHistory))
      }
      
    } catch (err) {
      setError('搜索过程中发生错误，请稍后重试')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleHotKeywordClick = (keyword: string) => {
    setQuery(keyword)
    handleSearch(keyword)
  }

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery)
    handleSearch(historyQuery)
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('mc-nav-search-history')
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

  const getCategoryColor = (category: string) => {
    const colors = {
      '官方': 'red',
      '模组': 'green',
      '社区': 'blue',
      '百科': 'orange'
    }
    return colors[category as keyof typeof colors] || 'default'
  }

  return (
    <div className="py-8">
      {/* 搜索框 */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-2">
          <Input
            size="large"
            placeholder="搜索Minecraft相关资源..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            prefix={<SearchOutlined />}
            className="flex-1"
          />
          <Button 
            type="primary" 
            icon={<SearchOutlined />}
            onClick={() => handleSearch()}
            loading={loading}
            size="large"
          >
            搜索
          </Button>
        </div>

        {/* 热门搜索 */}
        {results.length === 0 && !loading && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">热门搜索：</p>
            <Space wrap>
              {hotKeywords.map((keyword, index) => (
                <Button 
                  key={index} 
                  type="text" 
                  size="small"
                  onClick={() => handleHotKeywordClick(keyword)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {keyword}
                </Button>
              ))}
            </Space>
          </div>
        )}

        {/* 搜索历史 */}
        {searchHistory.length > 0 && results.length === 0 && !loading && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">搜索历史：</p>
              <Button type="text" size="small" onClick={clearHistory}>
                清空
              </Button>
            </div>
            <Space wrap>
              {searchHistory.map((historyQuery, index) => (
                <Button 
                  key={index} 
                  type="text" 
                  size="small"
                  onClick={() => handleHistoryClick(historyQuery)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {historyQuery}
                </Button>
              ))}
            </Space>
          </div>
        )}
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="max-w-2xl mx-auto mb-6">
          <Alert message={error} type="error" showIcon />
        </div>
      )}

      {/* 加载状态 */}
      {loading && (
        <div className="text-center py-8">
          <Spin size="large" tip="搜索中..." />
        </div>
      )}

      {/* 搜索结果 */}
      {!loading && results.length > 0 && (
        <div>
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600">
              找到 <span className="font-bold text-blue-600">{results.length}</span> 个相关结果
              {query && <span>，搜索关键词：<span className="font-bold">{query}</span></span>}
            </p>
          </div>

          <Row gutter={[16, 16]}>
            {results.map((result) => (
              <Col xs={24} lg={12} key={`${result.type}-${result.id}`}>
                <Card
                  hoverable
                  className="h-full"
                  actions={[
                    result.type === 'website' ? (
                      <Button 
                        type="primary" 
                        icon={<GlobalOutlined />}
                        onClick={() => window.open(result.url, '_blank')}
                      >
                        访问网站
                      </Button>
                    ) : (
                      <Button 
                        type="primary" 
                        icon={<DownloadOutlined />}
                        onClick={() => window.open(result.downloadUrl, '_blank')}
                      >
                        下载启动器
                      </Button>
                    )
                  ]}
                >
                  <div className="flex items-start mb-2">
                    <Tag color={result.type === 'website' ? 'blue' : 'green'} className="mr-2">
                      {result.type === 'website' ? '网站' : '启动器'}
                    </Tag>
                    <h3 className="text-lg font-semibold mb-1">{result.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{result.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {result.category && (
                      <Tag color={getCategoryColor(result.category)}>
                        分类：{result.category}
                      </Tag>
                    )}
                    {result.version && (
                      <Tag color="orange">版本：{result.version}</Tag>
                    )}
                    {result.platform && (
                      <Tag color={getPlatformColor(result.platform)}>
                        平台：{result.platform}
                      </Tag>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* 无结果 */}
      {!loading && results.length === 0 && query && (
        <div className="text-center py-8">
          <Empty 
            description={
              <div>
                <p className="text-lg mb-2">没有找到相关结果</p>
                <p className="text-gray-600">请尝试使用其他关键词搜索</p>
              </div>
            }
          />
        </div>
      )}
    </div>
  )
}