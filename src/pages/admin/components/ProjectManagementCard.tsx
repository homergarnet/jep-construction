import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

import { formatNumber } from '@/utils/formatNumber';
import { formatDateToMMDDYYYY } from '@/utils/formatDateToMMDDYYYY';
import { ADMIN_TYPE_NUM, EDIT_PROJECT_MANAGEMENT, EDIT_REVIEW } from '@/constants/constants';
import type { ProjectManagementDto } from '@/types/projectmanagement';
import { getJwtRoleId } from '@/utils/getJwtRoleId';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type ProjectManagementCardProps = {
    paginatedProjectManagements: ProjectManagementDto[] | undefined;
    onRemove: (id: number) => void;
    onCreateUpdateProjectManagement: (type: string, id: number) => void;
    onCreateUpdateReview: (type: string, projectManagementId: number, reviewId: number) => void;
}

const ProjectManagementCard: React.FC<ProjectManagementCardProps> = ({
    paginatedProjectManagements,
    onRemove,
    onCreateUpdateProjectManagement,
    onCreateUpdateReview
}) => {
    const roleId = getJwtRoleId();


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {paginatedProjectManagements?.map((emp) => (
                <Card key={emp.Id} className="shadow-md border rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">{emp.ProjectName}</CardTitle>
                        <p className="text-sm text-muted-foreground">{emp.ClientName}</p>
                    </CardHeader>

                    <CardContent className="space-y-2 text-sm">
                        <p><span className="font-medium">Start Date:</span> {formatDateToMMDDYYYY(emp.StartDate)}</p>
                        <p><span className="font-medium">End Date:</span> {formatDateToMMDDYYYY(emp.EndDate)}</p>
                        <p><span className="font-medium">Location:</span> {emp.Location}</p>
                        <p><span className="font-medium">Description:</span> {emp.Description}</p>
                    </CardContent>

                    <CardFooter className="flex justify-end gap-2">
                        {roleId === ADMIN_TYPE_NUM ? (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="cursor-pointer"
                                    onClick={() => onCreateUpdateProjectManagement("EDIT_PROJECT_MANAGEMENT", emp.Id)}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="cursor-pointer"
                                    onClick={() => onRemove(emp.Id)}
                                >
                                    Remove
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="secondary"
                                size="sm"
                                className="cursor-pointer"
                                onClick={() => onCreateUpdateReview("EDIT_REVIEW", emp.Id, emp.ReviewId)}
                            >
                                Review
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
    // return (
    //     <TableBody>
    //         {paginatedProjectManagements && paginatedProjectManagements.map((emp) => (
    //             <TableRow key={emp.Id}>
    //                 <TableCell>{emp.ProjectName}</TableCell>
    //                 <TableCell>{emp.ClientName}</TableCell>
    //                 <TableCell>{formatDateToMMDDYYYY(emp.StartDate)}</TableCell>
    //                 <TableCell>{formatDateToMMDDYYYY(emp.EndDate)}</TableCell>
    //                 {/* <TableCell>{formatNumber(emp.Budget)}</TableCell> */}
    //                 <TableCell>{emp.Location}</TableCell>
    //                 <TableCell>{emp.Description}</TableCell>
    //                 {/* <TableCell>{emp.CompletionStatus}</TableCell> */}
    //                 <TableCell className="text-right space-x-2">
    //                     {roleId === ADMIN_TYPE_NUM && (
    //                         <>
    //                             <Button className='cursor-pointer' variant="outline" size="sm" onClick={(e) => onCreateUpdateProjectManagement(EDIT_PROJECT_MANAGEMENT, emp.Id)}>
    //                                 Edit
    //                             </Button>
    //                             <Button
    //                                 className='cursor-pointer'
    //                                 variant="destructive"
    //                                 size="sm"
    //                                 onClick={() => onRemove(emp.Id)}
    //                             >
    //                                 Remove
    //                             </Button>
    //                         </>
    //                     )}
    //                     {roleId !== ADMIN_TYPE_NUM && (
    //                         <>
    //                             <Button
    //                                 className='cursor-pointer'
    //                                 variant="secondary"
    //                                 size="sm"
    //                                 onClick={() => onCreateUpdateReview(EDIT_REVIEW, emp.Id, emp.ReviewId)}
    //                             >
    //                                 Review
    //                             </Button>

    //                         </>
    //                     )}


    //                 </TableCell>
    //             </TableRow>
    //         ))
    //         }
    //     </TableBody >
    // )
}

export default ProjectManagementCard
