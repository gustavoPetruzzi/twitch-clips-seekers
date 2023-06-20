import Search from "./components/Search/Search";

export default async function Home() {
  return (
    <>
      <header></header>
      <main className="flex min-h-screen flex-col items-center gap-8 p-8">
        <h1 className="text-purple-600 text-4xl font-bold"> Twitch Seeker </h1>
        <Search />
      </main>
    </>
  )
}
