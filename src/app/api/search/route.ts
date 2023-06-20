import { cookies } from "next/dist/client/components/headers";
import { Streamer } from "@/types/Streamer";

const getErrorResponse = (message: string, status: number) => {
  return new Response(JSON.stringify({ message }), {
    status
  });
}

const getStreamerData = async (name: string, token: string): Promise<Streamer> => {
  const url = `https://api.twitch.tv/helix/users?login=${name}`;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${token}`);
  requestHeaders.set('Client-ID', process.env.CLIENT_ID!);
  
  const response = await fetch(url, {
    headers: requestHeaders
  });
  if (response.ok) {
    const json = await response.json();
    return json.data[0];
  } else {
    throw new Error('An error ocurred');

  }
}

const getClips =  async (streamerId: string, token: string) => {
  const url = `https://api.twitch.tv/helix/clips?broadcaster_id=${streamerId}`;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Authorization', `Bearer ${token}`);
  requestHeaders.set('Client-ID', process.env.CLIENT_ID!);
  const response = await fetch(url, {
    headers: requestHeaders
  });

  if (response.ok) {
    const json = await response.json();
    return json.data;
  } else {
    throw new Error("An error has ocurred");
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const {streamer, title} = body;
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  if (token?.value && token.value.length > 0) {
    
    if (!streamer || streamer.length === 0) {
      return getErrorResponse("Invalid streamer name", 400);
    }

    if (!title || title.length === 0) {
      return getErrorResponse("Invalid title", 400);
    }

    try {
      const { id, } = await getStreamerData(streamer, token.value);
      if (id) {
        const clips = await getClips(id, token.value);
        return new Response(JSON.stringify(clips.filter((clip: any) => clip.title.includes(title))))
      } else {

      }
    } catch (error) {
      console.log(error);
      return getErrorResponse("Sadge", 400);
    }

  } else {
    return getErrorResponse("Invalid token", 401);
  }
}