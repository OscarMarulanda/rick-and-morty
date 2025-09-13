interface PaginationProps {
  page: number;
  totalPages?: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
  return (
    <div className="flex gap-4 mt-8 justify-center">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="px-4 py-2 bg-green-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition focus:outline-none"
      >
        Previous
      </button>

      <span className="px-4 py-2">
        Page {page} of {totalPages ?? "-"}
      </span>

      <button
        onClick={onNext}
        disabled={!totalPages || page >= totalPages}
        className="px-4 py-2 bg-blue-200 dark:bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition focus:outline-none"
      >
        Next
      </button>
    </div>
  );
}