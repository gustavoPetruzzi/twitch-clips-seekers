'use client'
import { useEffect, useRef, useState } from "react";

export default function Search() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const streamerNameRef = useRef<string>(); 
  const titleRef = useRef<string>();
  useEffect(() => {
    const fetcher = async() => {
      try {
        await fetch('/api/auth');
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    };
    fetcher();
  }, []);
  
  const searchButtonHandler = async () => {
    await fetch('/api/search', {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ streamer: streamerNameRef.current, title: titleRef.current})
    });

  } 
  return (
    <div className="flex flex-row w-full justify-evenly">
      <input className="text-black" onChange={e => streamerNameRef.current = e.target.value} />
      <input className="text-black" onChange={e => titleRef.current = e.target.value} />
      <button className="bg-purple-500 hover:bg-purple-700 px-4 py-2" onClick={searchButtonHandler}> Check</button>
    </div>
  )
}


