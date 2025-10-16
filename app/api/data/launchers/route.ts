import launchersData from './launchers.json'

export async function GET() {
  return new Response(JSON.stringify(launchersData), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}