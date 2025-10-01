import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

import { formatNumber } from '@/utils/formatNumber';
import { formatDateToMMDDYYYY } from '@/utils/formatDateToMMDDYYYY';
import { EDIT_PROJECT_MANAGEMENT } from '@/constants/constants';
import type { ProjectManagementDto } from '@/types/projectmanagement';

type ProjectManagementTblBodyProps = {
    paginatedProjectManagements: ProjectManagementDto[] | undefined;
    onRemove: (id: number) => void;
    onCreateUpdateProjectManagement: (type: string, id: number) => void;
}

const ProjectManagementTblBody: React.FC<ProjectManagementTblBodyProps> = ({
    paginatedProjectManagements,
    onRemove,
    onCreateUpdateProjectManagement
}) => {

    return (
        <TableBody>
            {paginatedProjectManagements && paginatedProjectManagements.map((emp) => (
                <TableRow key={emp.Id}>
                    <TableCell>{emp.ProjectName}</TableCell>
                    <TableCell>{emp.ClientName}</TableCell>
                    <TableCell>{formatDateToMMDDYYYY(emp.StartDate)}</TableCell>
                    <TableCell>{formatDateToMMDDYYYY(emp.EndDate)}</TableCell>
                    <TableCell>{formatNumber(emp.Budget)}</TableCell>
                    <TableCell>{emp.Location}</TableCell>
                    <TableCell>{emp.Description}</TableCell>
                    <TableCell>{emp.CompletionStatus}</TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button className='cursor-pointer' variant="outline" size="sm" onClick={(e) => onCreateUpdateProjectManagement(EDIT_PROJECT_MANAGEMENT, emp.Id)}>
                            Edit
                        </Button>
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

export default ProjectManagementTblBody
