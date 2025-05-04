// src/pages/AnimeDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AnimeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<any>(null);
  const [error, setError] = useState(false);
  const baseUrl = process.env.REACT_APP_JIKAN_API;

  useEffect(() => {
    fetch(`${baseUrl}/anime/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched anime details:", data);
        setAnime(data.data);
      })
      .catch(() => setError(true));
  }, [id, baseUrl]);

  if (error) return <p className="p-6">Anime not found.</p>;
  if (!anime) return <p className="p-6">Loading...</p>;

  return (
    <main className="pt-6">
      <section className="relative bg-slate-200 pt-20 px-4 min-h-dvh">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
          <img
            src={anime.images.webp.image_url}
            alt={anime.title}
            className="w-[150px] lg:w-[233px] rounded shadow-md mx-auto md:mx-0"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
              {anime.title}
            </h1>
            <p className="mb-6 text-justify">
              <strong>Synopsis:</strong> {anime.synopsis}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-100 p-4 rounded shadow">
                <p className="text-xl font-bold">{anime.score}</p>
                <p className="text-xs text-blue-700">
                  {anime.scored_by.toLocaleString()} USERS
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded shadow">
                <p className="text-xl font-bold">#{anime.rank}</p>
                <p className="text-xs text-purple-700">RANKED</p>
              </div>
              <div className="bg-pink-100 p-4 rounded shadow">
                <p className="text-xl font-bold">#{anime.popularity}</p>
                <p className="text-xs text-pink-700">POPULARITY</p>
              </div>
              <div className="bg-green-100 p-4 rounded shadow">
                <p className="text-xl font-bold">
                  {anime.members.toLocaleString()}
                </p>
                <p className="text-xs text-green-700">MEMBERS</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2">
                <strong>Episodes:</strong> {anime.episodes}
              </p>
              <p className="mb-2">
                <strong>Genres:</strong>{" "}
                {anime.genres.map((g: any) => g.name).join(", ")}
              </p>
            </div>

            <button
              className="my-6 inline-flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl font-bold rounded-lg text-sm px-5 py-2.5"
              onClick={() => navigate(-1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d="M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2S2 6.48 2 12m10-1h4v2h-4v3l-4-4l4-4z" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
