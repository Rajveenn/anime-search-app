// components/Pagination.tsx
export default function Pagination({
  page,
  setPage,
  lastPage,
}: {
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
}) {
  return (
    <div className="flex justify-center items-center mt-10 space-x-4 flex-wrap">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl font-bold rounded-lg text-sm px-5 py-2.5 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="m14 7l-5 5l5 5z" />
        </svg>
        Prev
      </button>

      <span className="text-sm font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Page {page} of {lastPage}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === lastPage}
        className="inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl font-bold rounded-lg text-sm px-5 py-2.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="m10 17l5-5l-5-5z" />
        </svg>
      </button>
    </div>
  );
}
