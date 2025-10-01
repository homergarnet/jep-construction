import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { ReviewDto } from '@/types/review';
import { formatDateToMMDDYYYYhhmmA } from '@/utils/formatDateToMMDDYYYYhhmmA';


type ReviewTblBodyProps = {
    paginatedReviews: ReviewDto[] | undefined;
    onRemove: (id: number) => void;
}

const ReviewTblBody: React.FC<ReviewTblBodyProps> = ({
    paginatedReviews,
    onRemove,
}) => {

    return (
        <TableBody>
            {paginatedReviews && paginatedReviews.map((emp) => (
                <TableRow key={emp.Id}>
                    <TableCell>{emp.ProjectName}</TableCell>
                    <TableCell>{emp.ClientName}</TableCell>
                    <TableCell>{emp.Email}</TableCell>
                    <TableCell>{emp.MobileNumber}</TableCell>
                    <TableCell>{emp.Rate}</TableCell>
                    <TableCell>{emp.ReviewDescription}</TableCell>
                    <TableCell>{formatDateToMMDDYYYYhhmmA(emp.DateTimeCreated)}</TableCell>
                    <TableCell className="text-right space-x-2">
                        {/* <Button className='cursor-pointer' variant="outline" size="sm" onClick={(e) => onCreateUpdateEmployeeList(EDIT_EMPLOYEE, emp.Id)}>
                            Edit
                        </Button> */}
                        <Button
                            className='cursor-pointer'
                            variant="destructive"
                            size="sm"
                            onClick={() => onRemove(emp.Id)}
                        >
                            Remove
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default ReviewTblBody
