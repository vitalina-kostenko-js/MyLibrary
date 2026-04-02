"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

function visiblePageItems(
  current: number,
  total: number,
): (number | "ellipsis")[] {
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
}

//interface
interface IPaginationProps {
  itemsPerPage: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
}

//component
const PaginationComponent = (props: IPaginationProps) => {
  const { itemsPerPage, totalItems, onPageChange } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));

    router.replace(`${pathname}?${params.toString()}`);

    onPageChange?.(newPage);
  };

  const pages = visiblePageItems(page, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (page > 1) handlePageChange(page - 1);
            }}
            size="default"
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
                onClick={() => handlePageChange(p)}
                isActive={page === p}
                className={
                  page === p
                    ? cn(
                        "hover:!text-secondary-foreground !border-none !shadow-none",
                        buttonVariants({ variant: "secondary", size: "icon" }),
                      )
                    : ""
                }
                size="default"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            data-testid="pagination-next"
            onClick={() => {
              if (page < totalPages) handlePageChange(page + 1);
            }}
            size="default"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
