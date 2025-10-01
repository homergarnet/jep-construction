import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { Employee, UserListDto } from '@/types/employeelist'
import { formatDateToMMDDYYYY } from '@/utils/formatDateToMMDDYYYY'
import { EDIT_EMPLOYEE } from '@/constants/constants'
import { formatNumber } from '@/utils/formatNumber'

type EmployeTblBodyProps = {
    paginatedEmployees: UserListDto[] | undefined;
    onRemove: (id: number) => void;
    onCreateUpdateEmployeeList: (type: string, id: number) => void;
}

const EmployeeTblBody: React.FC<EmployeTblBodyProps> = ({
    paginatedEmployees,
    onRemove,
    onCreateUpdateEmployeeList
}) => {

    return (
        <TableBody>
            {paginatedEmployees && paginatedEmployees.map((emp) => (
                <TableRow key={emp.Id}>
                    <TableCell>{emp.EmployeeNumber}</TableCell>
                    <TableCell>{emp.Email}</TableCell>
                    <TableCell>{emp.Firstname}</TableCell>
                    <TableCell>{emp.Lastname}</TableCell>
                    <TableCell>{emp.MobileNumber}</TableCell>
                    <TableCell>{emp.Position}</TableCell>
                    <TableCell>{formatNumber(emp.Salary)}</TableCell>
                    <TableCell>{emp.Status}</TableCell>
                    <TableCell>{emp.Address}</TableCell>
                    <TableCell>{formatDateToMMDDYYYY(emp.DateOfBirth)}</TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button className='cursor-pointer' variant="outline" size="sm" onClick={(e) => onCreateUpdateEmployeeList(EDIT_EMPLOYEE, emp.Id)}>
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

export default EmployeeTblBody
