import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

import { formatDateToMMDDYYYY } from '@/utils/formatDateToMMDDYYYY'
import { EDIT_CLIENT, EDIT_EMPLOYEE } from '@/constants/constants'
import { formatNumber } from '@/utils/formatNumber'
import type { UserListDto } from '@/types/clientlist'

type ClientTblBodyProps = {
    paginatedClients: UserListDto[] | undefined;
    onRemove: (id: number) => void;
    onCreateUpdateClientList: (type: string, id: number) => void;
}

const ClientTblBody: React.FC<ClientTblBodyProps> = ({
    paginatedClients,
    onRemove,
    onCreateUpdateClientList
}) => {

    return (
        <TableBody>
            {paginatedClients && paginatedClients.map((emp) => (
                <TableRow key={emp.Id}>
                    <TableCell>{emp.EmployeeNumber}</TableCell>
                    <TableCell>{emp.Email}</TableCell>
                    <TableCell>{emp.Firstname}</TableCell>
                    <TableCell>{emp.Lastname}</TableCell>
                    <TableCell>{emp.MobileNumber}</TableCell>
                    <TableCell>{emp.Status}</TableCell>
                    <TableCell>{emp.Address}</TableCell>
                    <TableCell>{formatDateToMMDDYYYY(emp.DateOfBirth)}</TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button className='cursor-pointer' variant="outline" size="sm" onClick={(e) => onCreateUpdateClientList(EDIT_CLIENT, emp.Id)}>
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

export default ClientTblBody
