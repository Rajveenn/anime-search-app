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
      if (!query) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${baseUrl}/anime?q=${query}&page=${page}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setResults(data.data);
        setLastPage(data.pagination.last_visible_page);
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
    <main className="p-6">
      <section className="relative bg-slate-200 min-h-screen pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative mb-6">
            <div className="relative">
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
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black"
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

          {loading ? (
            <p className="text-white">Loading...</p>
          ) : error ? (
            <p className="text-red-300 font-medium">{error}</p>
          ) : results.length === 0 && query ? (
            <p className="text-white">No results found for "{query}".</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((anime: any) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          )}

          <div className="mt-10">
            <Pagination page={page} setPage={setPage} lastPage={lastPage} />
          </div>
        </div>
      </section>
    </main>
  );
}
