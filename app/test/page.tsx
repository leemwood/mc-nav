'use client'

import React from 'react'
import Announcement from '@/components/Announcement'

const TestAnnouncementPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <h1>公告功能测试页面</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>信息类型公告</h2>
        <Announcement 
          message="这是一个信息类型的公告，用于一般通知" 
          type="info"
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>成功类型公告</h2>
        <Announcement 
          message="操作成功！这是一个成功类型的公告" 
          type="success"
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>警告类型公告</h2>
        <Announcement 
          message="请注意：这是一个警告类型的公告" 
          type="warning"
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>错误类型公告</h2>
        <Announcement 
          message="发生错误！这是一个错误类型的公告" 
          type="error"
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>自动关闭公告（5秒后关闭）</h2>
        <Announcement 
          message="这个公告将在5秒后自动关闭" 
          type="info"
          duration={5000}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>不可关闭公告</h2>
        <Announcement 
          message="这是一个不可关闭的重要公告" 
          type="warning"
          closable={false}
        />
      </div>
    </div>
  )
}

export default TestAnnouncementPage