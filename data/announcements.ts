// 公告数据管理
export interface AnnouncementData {
  id: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  closable: boolean
  showIcon: boolean
  duration: number // 自动关闭时间（毫秒），0表示不自动关闭
  startTime?: string // 开始显示时间
  endTime?: string // 结束显示时间
  priority: number // 优先级，数字越大优先级越高
}

// 当前活动的公告列表
export const activeAnnouncements: AnnouncementData[] = [
  {
    id: 'welcome',
    message: '欢迎来到Minecraft导航网站！我们为您提供最全面的Minecraft资源导航服务。',
    type: 'info',
    closable: true,
    showIcon: true,
    duration: 0,
    priority: 1
  },
  {
    id: 'update-2024',
    message: '网站已更新至最新版本，新增搜索功能和响应式设计优化！',
    type: 'success',
    closable: true,
    showIcon: true,
    duration: 5000,
    priority: 2
  }
]

// 获取当前应该显示的公告（按优先级排序）
export function getCurrentAnnouncements(): AnnouncementData[] {
  const now = new Date()
  
  return activeAnnouncements
    .filter(announcement => {
      // 检查时间范围
      if (announcement.startTime && new Date(announcement.startTime) > now) {
        return false
      }
      if (announcement.endTime && new Date(announcement.endTime) < now) {
        return false
      }
      return true
    })
    .sort((a, b) => b.priority - a.priority) // 按优先级降序排列
}

// 添加新公告
export function addAnnouncement(announcement: Omit<AnnouncementData, 'id'>): string {
  const id = `announcement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const newAnnouncement: AnnouncementData = {
    ...announcement,
    id
  }
  activeAnnouncements.push(newAnnouncement)
  return id
}

// 删除公告
export function removeAnnouncement(id: string): boolean {
  const index = activeAnnouncements.findIndex(announcement => announcement.id === id)
  if (index !== -1) {
    activeAnnouncements.splice(index, 1)
    return true
  }
  return false
}

// 更新公告
export function updateAnnouncement(id: string, updates: Partial<AnnouncementData>): boolean {
  const announcement = activeAnnouncements.find(announcement => announcement.id === id)
  if (announcement) {
    Object.assign(announcement, updates)
    return true
  }
  return false
}