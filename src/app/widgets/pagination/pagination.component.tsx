import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "../../../pkg/lib/utils/utils";
import { buttonVariants } from "../../../pkg/theme/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../pkg/theme/ui/pagination";

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

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (page > 1) handlePageChange(page - 1);
            }}
            size={undefined}
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
              size={undefined}
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
            size={undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
