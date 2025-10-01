import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { ClientRequestDto } from '@/types/clientrequest';
import { formatDateToMMDDYYYYhhmmA } from '@/utils/formatDateToMMDDYYYYhhmmA';


type ClientRequestTblBodyProps = {
    paginatedClientRequests: ClientRequestDto[] | undefined;
    onRemove: (id: number) => void;

}

const ClientRequestTblBody: React.FC<ClientRequestTblBodyProps> = ({
    paginatedClientRequests,
    onRemove,
}) => {

    return (
        <TableBody>
            {paginatedClientRequests && paginatedClientRequests.map((emp) => (
                <TableRow key={emp.Id}>
                    <TableCell>{emp.ProjectName}</TableCell>
                    <TableCell>{emp.Name}</TableCell>
                    <TableCell>{emp.Email}</TableCell>
                    <TableCell>{emp.MobileNumber}</TableCell>
                    <TableCell>{emp.Message}</TableCell>
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

export default ClientRequestTblBody
