import { NextRequest } from 'next/server'
import websites from '../data/websites/websites.json'
import launchers from '../data/launchers/launchers.json'

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase().trim()
  
  if (!query) {
    return new Response(JSON.stringify({ 
      error: '搜索关键词不能为空' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const results: SearchResult[] = []

    // 搜索网站数据
    websites.forEach((website: any) => {
      const nameMatch = website.name.toLowerCase().includes(query)
      const descMatch = website.description.toLowerCase().includes(query)
      const categoryMatch = website.category.toLowerCase().includes(query)
      
      if (nameMatch || descMatch || categoryMatch) {
        let score = 0
        if (nameMatch) score += 3
        if (descMatch) score += 2
        if (categoryMatch) score += 1
        
        results.push({
          type: 'website',
          id: website.id,
          name: website.name,
          description: website.description,
          url: website.url,
          category: website.category,
          score
        })
      }
    })

    // 搜索启动器数据
    launchers.forEach((launcher: any) => {
      const nameMatch = launcher.name.toLowerCase().includes(query)
      const descMatch = launcher.description.toLowerCase().includes(query)
      const versionMatch = launcher.version.toLowerCase().includes(query)
      const platformMatch = launcher.platform.toLowerCase().includes(query)
      
      if (nameMatch || descMatch || versionMatch || platformMatch) {
        let score = 0
        if (nameMatch) score += 3
        if (descMatch) score += 2
        if (versionMatch) score += 1
        if (platformMatch) score += 1
        
        results.push({
          type: 'launcher',
          id: launcher.id,
          name: launcher.name,
          description: launcher.description,
          downloadUrl: launcher.downloadUrl,
          version: launcher.version,
          platform: launcher.platform,
          score
        })
      }
    })

    // 按匹配度排序
    results.sort((a, b) => b.score - a.score)

    return new Response(JSON.stringify({
      query,
      total: results.length,
      results: results.slice(0, 50) // 限制返回数量
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '搜索过程中发生错误'
    return new Response(JSON.stringify({ 
      error: '搜索失败', 
      message: errorMessage 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}