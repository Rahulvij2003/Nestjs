import React from "react";

interface PaginationProps {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  const pagesArr = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div className="flex gap-2 mt-4">
      {pagesArr.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 border rounded ${p === page ? "bg-blue-500 text-white" : "bg-white"}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
