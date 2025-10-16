'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import WebsitesSection from '@/components/WebsitesSection'
import LaunchersSection from '@/components/LaunchersSection'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')

  const renderContent = () => {
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
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8 flex-1">
        {renderContent()}
      </main>
      <Footer />
    </div>
  )
}