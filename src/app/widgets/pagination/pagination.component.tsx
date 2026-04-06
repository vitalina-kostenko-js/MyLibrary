"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "../../../pkg/lib/utils/utils";
import { buttonVariants } from "../../../pkg/theme/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../pkg/theme/ui/pagination";

//helper
const visiblePageItems = (
  current: number,
  total: number,
): (number | "ellipsis")[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const out: (number | "ellipsis")[] = [];

  const push = (v: number | "ellipsis") => {
    if (out[out.length - 1] !== v) out.push(v);
  };
  push(1);

  const left = Math.max(2, current - 1);

  const right = Math.min(total - 1, current + 1);

  if (left > 2) push("ellipsis");

  for (let p = left; p <= right; p++) push(p);

  if (right < total - 1) push("ellipsis");

  push(total);

  return out;
};

//interface
interface IPaginationProps {
  itemsPerPage: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
}

//component
const PaginationComponent = ({
  itemsPerPage,
  totalItems,
}: IPaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = visiblePageItems(page, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={page > 1 ? createPageURL(page - 1) : "#"}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`e-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href={createPageURL(p)}
                isActive={page === p}
                className={cn(
                  page === p &&
                    "hover:!text-secondary-foreground !border-none !shadow-none",
                  page === p &&
                    buttonVariants({ variant: "secondary", size: "icon" }),
                )}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href={page < totalPages ? createPageURL(page + 1) : "#"}
            className={
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            }
            data-testid="pagination-next"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
