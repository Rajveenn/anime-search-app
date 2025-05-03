// src/pages/AnimeDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AnimeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setAnime(data.data))
      .catch(() => setError(true));
  }, [id]);

  if (error) return <p className="p-6">Anime not found.</p>;
  if (!anime) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6">
      <section className="relative bg-slate-200 min-h-screen pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">{anime.title}</h1>
          <img
            src={anime.images.webp.image_url}
            alt={anime.title}
            className="mb-4 max-w-xs mx-auto"
          />
          <p className="mb-2">
            <strong>Episodes:</strong> {anime.episodes}
          </p>
          <p className="mb-2">
            <strong>Score:</strong> {anime.score}
          </p>
          <p className="mb-2">
            <strong>Genres:</strong>{" "}
            {anime.genres.map((g: any) => g.name).join(", ")}
          </p>
          <p className="mb-6">
            <strong>Synopsis:</strong> {anime.synopsis}
          </p>

          <button
            className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl font-bold rounded-lg text-sm px-5 py-2.5"
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
      </section>
    </main>
  );
}
