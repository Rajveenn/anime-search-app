// src/pages/SearchPage.tsx
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import AnimeCard from "../components/AnimeCard";
import Pagination from "../components/Pagination";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = process.env.REACT_APP_JIKAN_API;

  useEffect(() => {
    const debouncedFetch = debounce(async () => {
      setLoading(true);
      setError(null);
      try {
        const url = query
          ? `${baseUrl}/anime?q=${query}&page=${page}`
          : `${baseUrl}/top/anime?limit=10`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setResults(data.data);
        setLastPage(data.pagination?.last_visible_page || 1);
      } catch (err) {
        console.error(err);
        setResults([]);
        setError("Failed to fetch results. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 250);

    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [query, page, baseUrl]);

  return (
    <main className="pt-6">
      <section className="relative bg-slate-200 min-h-dvh pt-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          {/* Search Input */}
          <div className="relative mb-6">
            <div className="relative px-5">
              <input
                type="text"
                placeholder="Search anime..."
                className="w-full p-3 pr-12 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-2xl"
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
              <svg
                className="absolute right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 15z"
                />
              </svg>
            </div>
          </div>

          {/* Loading, Error, and Results */}
          {loading ? (
            <p className="text-gray-700">Loading...</p>
          ) : error ? (
            <p className="text-red-500 font-medium">{error}</p>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {query ? `Search Results for "${query}"` : "Top 10 Anime"}
              </h2>

              {results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {results.map((anime: any) => (
                    <AnimeCard key={anime.mal_id} anime={anime} />
                  ))}
                </div>
              ) : query ? (
                <p className="text-gray-700">No results found for "{query}".</p>
              ) : null}
            </>
          )}

          {/* Pagination only for search results */}
          <div className="my-6">
            {query && lastPage > 1 && (
              <Pagination page={page} setPage={setPage} lastPage={lastPage} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
