export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')
  
  if (!url) {
    return new Response(JSON.stringify({ error: 'URL参数缺失' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Minecraft-Navigation-Site/1.0'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status}`)
    }
    
    const data = await response.text()
    return new Response(data, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'text/plain',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: '代理请求失败', 
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}