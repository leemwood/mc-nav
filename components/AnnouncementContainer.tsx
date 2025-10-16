'use client'

import React from 'react'
import Announcement from './Announcement'
import { getCurrentAnnouncements } from '../data/announcements'

const AnnouncementContainer: React.FC = () => {
  const announcements = getCurrentAnnouncements()

  if (announcements.length === 0) {
    return null
  }

  return (
    <div className="announcement-container-wrapper">
      {announcements.map((announcement) => (
        <Announcement
          key={announcement.id}
          message={announcement.message}
          type={announcement.type}
          closable={announcement.closable}
          showIcon={announcement.showIcon}
          duration={announcement.duration}
        />
      ))}
      <style jsx>{`
        .announcement-container-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default AnnouncementContainer