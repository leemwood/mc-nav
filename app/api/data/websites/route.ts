import websitesData from './websites.json'

export async function GET() {
  return new Response(JSON.stringify(websitesData), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}