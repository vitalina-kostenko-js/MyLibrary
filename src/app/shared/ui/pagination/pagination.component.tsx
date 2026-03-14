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

interface PaginationWithSecondaryProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationWithSecondary = ({ currentPage, totalPages, onPageChange }: PaginationWithSecondaryProps) => (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationLink
          href="#"
          onClick={() => onPageChange(2)}
          isActive
          className={cn(
            "hover:!text-secondary-foreground !border-none !shadow-none",
            buttonVariants({ variant: "secondary", size: "icon" })
          )}
        >
          {currentPage}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);
