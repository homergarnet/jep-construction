import React from 'react'
import useEmployeeListContext from '@/store/employee/employeeList/employeeListContext'
import { cn } from '@/lib/utils'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

type TablePaginationProps = {
    totalPages: number
}

const EmpListPagination: React.FC<TablePaginationProps> = ({ totalPages }) => {

    const zPage = useEmployeeListContext((state) => state.zPage);
    const zSetPage = useEmployeeListContext((state) => state.zSetPage);
    if (totalPages <= 1) return null // hide if only 1 page
    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => zSetPage(Math.max(zPage - 1, 1))}
                        aria-disabled={zPage === 1}
                        className={cn(
                            "cursor-pointer",
                            zPage === 1 && "cursor-not-allowed opacity-50"
                        )}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                        <PaginationItem key={pageNum}>
                            <PaginationLink
                                isActive={zPage === pageNum}
                                onClick={() => zSetPage(pageNum)}
                                className={cn(
                                    "cursor-pointer",
                                    zPage === pageNum && "cursor-default"
                                )}
                            >
                                {pageNum}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => zSetPage(Math.min(zPage + 1, totalPages))}
                        aria-disabled={zPage === totalPages}
                        className={cn(
                            "cursor-pointer",
                            zPage === totalPages && "cursor-not-allowed opacity-50"
                        )}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default EmpListPagination
