'use client'

import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-transparent text-black py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Minecraft导航网站</p>
          <p className="text-gray-700 mb-4">
            为您提供最全面的Minecraft资源导航服务
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <span>实用网站导航</span>
            <span>•</span>
            <span>启动器下载</span>
            <span>•</span>
            <span>资源整合</span>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            <p>© 2024 Minecraft导航网站. 保留所有权利.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}