// components/AnimeCard.tsx
import { useNavigate } from 'react-router-dom';

export default function AnimeCard({ anime }: { anime: any }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
      className="cursor-pointer border rounded p-2 shadow-xl hover:shadow-2xl transition bg-slate-300"
    >
      <img src={anime.images.webp.image_url} alt={anime.title} className="mb-2 w-full h-48 object-cover" />
      <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-center">{anime.title}</h2>
    </div>
  );
}