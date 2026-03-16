import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { usePagination } from "../../shared/hooks/usePagination.hook";

interface PaginationWithSecondaryProps {
  itemsPerPage: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
}

export const PaginationComponent = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationWithSecondaryProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { page, totalPages, setPage } = usePagination(totalItems, itemsPerPage);

  const handlePageChange = (page: number) => {
    router.replace(`${pathname}?page=${page}`);
    setPage(page);
    onPageChange?.(page);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (page > 1) handlePageChange(page - 1);
            }}
          />
        </PaginationItem>

        {pages.map((p) => (
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
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            data-testid="pagination-next"
            onClick={() => {
              if (page < totalPages) handlePageChange(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
