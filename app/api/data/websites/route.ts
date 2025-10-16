import websitesData from './websites.json'

export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify(websitesData), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}