import { Button } from '@/components/ui/button';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { EDIT_ASSIGN_PROJECT } from '@/constants/constants';
import type { AssignProjectDto } from '@/types/assignProject';
import { formatDateToMMDDYYYY } from '@/utils/formatDateToMMDDYYYY';
import { getJwtRoleId } from '@/utils/getJwtRoleId';
import React from 'react'

type AssignProjectTblBodyProps = {
    paginatedAssignProject: AssignProjectDto[] | undefined;
    onRemove: (id: number) => void;
    onCreateUpdateAssignProjectList: (type: string, id: number) => void;
}

const AssignProjectTblBody: React.FC<AssignProjectTblBodyProps> = ({
    paginatedAssignProject,
    onRemove,
    onCreateUpdateAssignProjectList
}) => {
    const roleId = getJwtRoleId();
    const apiRoot = import.meta.env.VITE_APP_API_ROOT_ENDPOINT;
    return (
        <TableBody>
            {paginatedAssignProject && paginatedAssignProject.map((emp) => (
                <TableRow key={emp.Id}>
                    <TableCell>
                        {emp.ProfileImage ? (
                            <img
                                src={apiRoot + emp.ProfileImage} // could be base64 or URL
                                alt="Attendance"
                                className="w-[250px] h-[250px] object-cover rounded-md border"
                            />
                        ) : (
                            <span className="text-gray-400 italic">No Image</span>
                        )}
                    </TableCell>
                    <TableCell>{emp.ClientName}</TableCell>
                    <TableCell>{emp.ProjectName}</TableCell>
                    <TableCell>{emp.Email}</TableCell>
                    <TableCell>{emp.EmployeeNumber}</TableCell>
                    <TableCell>{emp.EmployeeName}</TableCell>
                    <TableCell>{emp.MobileNumber}</TableCell>
                    <TableCell>{emp.Position}</TableCell>
                    <TableCell>{emp.Location}</TableCell>
                    <TableCell>{formatDateToMMDDYYYY(emp.StartDate)}</TableCell>
                    <TableCell>{formatDateToMMDDYYYY(emp.EndDate)}</TableCell>
                    <TableCell className="text-right space-x-2">

                        <Button className='cursor-pointer' variant="outline" size="sm" onClick={(e) => onCreateUpdateAssignProjectList(EDIT_ASSIGN_PROJECT, emp.Id)}>
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

export default AssignProjectTblBody
