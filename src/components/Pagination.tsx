// components/Pagination.tsx
export default function Pagination({ page, setPage, lastPage }: {
    page: number;
    setPage: (page: number) => void;
    lastPage: number;
  }) {
    return (
      <div className="flex justify-center mt-6 space-x-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="px-4 py-1">Page {page} of {lastPage}</span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === lastPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    );
  }