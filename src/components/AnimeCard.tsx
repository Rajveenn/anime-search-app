// components/AnimeCard.tsx
import { useNavigate } from 'react-router-dom';

export default function AnimeCard({ anime }: { anime: any }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
      className="cursor-pointer border rounded p-2 hover:shadow-md transition"
    >
      <img src={anime.images.webp.image_url} alt={anime.title} className="mb-2 w-full h-48 object-cover" />
      <h2 className="text-lg font-medium">{anime.title}</h2>
    </div>
  );
}