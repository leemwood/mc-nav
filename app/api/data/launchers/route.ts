import launchersData from './launchers.json'

export const runtime = 'edge';

export async function GET() {
  return new Response(JSON.stringify(launchersData), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}