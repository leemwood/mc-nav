import './globals.css'
import { Inter } from 'next/font/google'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import AnnouncementContainer from '@/components/AnnouncementContainer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Minecraft导航网站',
  description: '专业的Minecraft资源导航网站',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ConfigProvider locale={zhCN}>
          <AnnouncementContainer />
          {children}
        </ConfigProvider>
      </body>
    </html>
  )
}