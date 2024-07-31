"use client";

import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(count / itemsPerPage);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    replace(`${pathname}?${params}`);
    onPageChange(page);
  };

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Пред.
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        След.
      </button>
    </div>
  );
};

export default Pagination;
