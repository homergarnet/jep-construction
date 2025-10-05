import TblHeader from '@/components/TblHeader'
import { Input } from '@/components/ui/input'
import { Table, TableCaption } from '@/components/ui/table'
import { reviewColumns } from '@/constants/constants'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useGetReviewList, useRemoveReview } from '@/hooks/useReview'
import useSwal from '@/hooks/useSwal'
import useReviewContext from '@/store/review/reviewContext'
import { debounce } from 'lodash'
import { Users } from 'lucide-react'
import React from 'react'
import ReviewTblBody from './admin/components/ReviewTblBody'
import ReviewPagination from './admin/components/ReviewPagination'

const ReviewPage = () => {

    const zSetIsOpenDialog = useReviewContext((state) => state.zSetIsOpenDialog);
    const zDialogTitle = useReviewContext((state) => state.zDialogTitle);
    const zSetDialogTitle = useReviewContext((state) => state.zSetDialogTitle);
    const zPage = useReviewContext((state) => state.zPage);
    const zSetPage = useReviewContext((state) => state.zSetPage);
    const zPageSize = useReviewContext((state) => state.zPageSize);
    const zStatusFilter = useReviewContext((state) => state.zStatusFilter);
    const zSetStatusFilter = useReviewContext((state) => state.zSetStatusFilter);
    const { showConfirm, showToast } = useSwal();
    const { confirm, ConfirmDialog } = useConfirmDialog();
    const { data: reviewList, isLoading: reviewListLoading } = useGetReviewList({
        keyword: zStatusFilter,
        page: zPage,
        pageSize: zPageSize,
    });

    const removeReview = useRemoveReview();

    const totalRecords = reviewList?.TotalRecords ?? 0;
    const totalPages = Math.ceil(totalRecords / zPageSize);

    const handleReview = (value: string) => {
        console.log("value: ", value);
        zSetStatusFilter(value);
    };

    const debouncedHReviewChange = debounce((value: string) => {
        handleReview(value);
    }, 1500);


    const handleRemove = async (id: number) => {
        const ok = await confirm({
            title: "You won't be able to revert this!",
            description: `Are you sure you want to remove?`,
            confirmLabel: "Yes, Continue",
            cancelLabel: "No",
        })

        if (!ok) return

        removeReview.mutate(id, {
            onSuccess: (res) => showToast(res.ApiMessage, "success"),
            onError: (error: Error) => showToast(error.message, "error"),
        })
    }

    return (
        <>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                        Reviews
                    </h2>
                    {/* <Button>Export Report</Button> */}
                </div>
                <p className="text-muted-foreground mt-1">
                    Manage customer feedback records.
                </p>
                {/* Header with Status Filter, Search + Add review */}
                <div className="flex justify-end items-center mb-4 space-x-2">
                    {/* Search */}
                    <Input
                        placeholder="Search review..."
                        onChange={(e) => debouncedHReviewChange(e.target.value)} // 👈 extract value
                        className="w-64"
                    />
                </div>
                {/* Review Table */}
                <Table>
                    <TableCaption>A list of reviews</TableCaption>
                    <TblHeader columns={reviewColumns} />
                    <ReviewTblBody
                        paginatedReviews={reviewList?.ReviewList}
                        onRemove={handleRemove}
                    />
                </Table>
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <ReviewPagination
                        totalPages={totalPages}
                    />
                </div>
            </div>
            {/* Important: must render this once per component */}
            {ConfirmDialog}
        </>

    )
}

export default ReviewPage
