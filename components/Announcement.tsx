'use client'

import React, { useState } from 'react'
import { Alert, Button } from 'antd'
import { CloseOutlined, ExclamationCircleOutlined, InfoCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'

interface AnnouncementProps {
  message: string
  type?: 'info' | 'warning' | 'success' | 'error'
  closable?: boolean
  showIcon?: boolean
  duration?: number // 自动关闭时间（毫秒），0表示不自动关闭
}

const Announcement: React.FC<AnnouncementProps> = ({
  message,
  type = 'info',
  closable = true,
  showIcon = true,
  duration = 0
}) => {
  const [visible, setVisible] = useState(true)

  // 获取图标
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <ExclamationCircleOutlined />
      case 'success':
        return <CheckCircleOutlined />
      case 'error':
        return <ExclamationCircleOutlined />
      default:
        return <InfoCircleOutlined />
    }
  }

  // 处理关闭
  const handleClose = () => {
    setVisible(false)
  }

  // 设置自动关闭
  React.useEffect(() => {
    if (duration > 0 && visible) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, visible])

  if (!visible) return null

  return (
    <div className="announcement-container">
      <Alert
        message={message}
        type={type}
        closable={closable}
        showIcon={showIcon}
        icon={showIcon ? getIcon() : undefined}
        onClose={handleClose}
        className="announcement-alert"
        action={
          closable ? (
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={handleClose}
              className="announcement-close-btn"
            />
          ) : null
        }
      />
    </div>
  )
}

export default Announcement