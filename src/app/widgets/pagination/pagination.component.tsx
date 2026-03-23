import { cn } from "@/src/pkg/lib/utils/utils";
import { buttonVariants } from "@/src/pkg/theme/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/pkg/theme/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.replace(`${pathname}?${params.toString()}`);
    onPageChange?.(newPage);
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
