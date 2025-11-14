import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

import { formatDateToMMDDYYYY } from '@/utils/formatDateToMMDDYYYY'
import { EDIT_CLIENT, EDIT_EMPLOYEE } from '@/constants/constants'
import { formatNumber } from '@/utils/formatNumber'
import type { UserListDto } from '@/types/clientlist'
import useClientListContext from '@/store/client/clientListContext'

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

    const zIsOpenDialog2 = useClientListContext(
        (state) => state.zIsOpenDialog2
    );
    const zSetIsOpenDialog2 = useClientListContext(
        (state) => state.zSetIsOpenDialog2
    );

    const zSetClientId = useClientListContext(
        (state) => state.zSetClientId
    );

    return (
        <TableBody>
            {paginatedClients && paginatedClients.map((emp) => (
                <TableRow key={emp.Id}>
                    {/* <TableCell>{emp.EmployeeNumber}</TableCell> */}
                    <TableCell>{emp.Email}</TableCell>
                    {/* <TableCell>{emp.Firstname}</TableCell>
                    <TableCell>{emp.Lastname}</TableCell>
                    <TableCell>{emp.MobileNumber}</TableCell> */}
                    <TableCell>
                        <p>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${emp.Status === "active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-red-700"
                                    }`}
                            >
                                {emp.Status}
                            </span>
                        </p>
                    </TableCell>
                    {/* <TableCell>{emp.Address}</TableCell>
                    <TableCell>{formatDateToMMDDYYYY(emp.DateOfBirth)}</TableCell> */}
                    <TableCell className="text-right space-x-2">
                        <Button
                            className="cursor-pointer border-blue-300 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                zSetClientId(emp.Id);
                                // zSetCREmail(emp.Email);
                                zSetIsOpenDialog2(true);
                            }}
                        >
                            View
                        </Button>
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
