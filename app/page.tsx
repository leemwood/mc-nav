'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import WebsitesSection from '@/components/WebsitesSection'
import LaunchersSection from '@/components/LaunchersSection'
import AboutSection from '@/components/AboutSection'
import SearchSection from '@/components/SearchSection'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)

  // 处理搜索
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setShowSearchResults(true)
    setActiveTab('search') // 切换到搜索标签页显示搜索结果
  }

  // 处理标签切换时隐藏搜索结果
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab !== 'home') {
      setShowSearchResults(false)
    }
  }

  const renderContent = () => {
    // 显示搜索结果
    if (showSearchResults && searchQuery) {
      return <SearchSection searchQuery={searchQuery} />
    }

    switch (activeTab) {
      case 'websites':
        return <WebsitesSection />
      case 'launchers':
        return <LaunchersSection />
      case 'about':
        return <AboutSection />
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-4xl font-bold mb-4">欢迎来到Minecraft导航网站</h2>
            <p className="text-xl text-gray-600">
              这里汇集了最全面的Minecraft资源，包括实用网站导航和启动器下载
            </p>
            <div className="mt-8">
              <p className="text-lg text-gray-500">
                使用顶部的搜索框快速查找您需要的资源
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        onSearch={handleSearch}
      />
      <main className="container mx-auto px-4 py-8 flex-1">
        {renderContent()}
      </main>
      <Footer />
    </div>
  )
}