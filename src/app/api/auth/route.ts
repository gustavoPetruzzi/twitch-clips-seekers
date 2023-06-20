import { cookies } from 'next/dist/client/components/headers';
import { NextResponse } from 'next/server'
 
export async function GET() {
  let url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.SECRET}&grant_type=client_credentials`;
  const res = await fetch(url, { method: "POST"});
  const data = await res.json();
  const cookieStore = cookies();
  cookieStore.set('token', data.access_token, { httpOnly: true});
  return NextResponse.json({ data })
}


