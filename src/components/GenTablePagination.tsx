import { cn } from "@/lib/utils"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

type GenTablePaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const GenTablePagination: React.FC<GenTablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null

  return (
    <Pagination>
      <PaginationContent>

        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            aria-disabled={currentPage === 1}
            className={cn(
              "cursor-pointer",
              currentPage === 1 && "cursor-not-allowed opacity-50"
            )}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={currentPage === pageNum}
                onClick={() => onPageChange(pageNum)}
                className={cn(
                  "cursor-pointer",
                  currentPage === pageNum && "cursor-default"
                )}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              onPageChange(Math.min(currentPage + 1, totalPages))
            }
            aria-disabled={currentPage === totalPages}
            className={cn(
              "cursor-pointer",
              currentPage === totalPages && "cursor-not-allowed opacity-50"
            )}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}