import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { ClientRequestDto } from '@/types/clientrequest';
import { formatDateToMMDDYYYYhhmmA } from '@/utils/formatDateToMMDDYYYYhhmmA';
import useClientRequestContext from '@/store/clientRequest/clientRequestContext';


type ClientRequestTblBodyProps = {
    paginatedClientRequests: ClientRequestDto[] | undefined;
    onRemove: (id: number) => void;

}

const ClientRequestTblBody: React.FC<ClientRequestTblBodyProps> = ({
    paginatedClientRequests,
    onRemove,
}) => {
    const zSetIsOpenDialog = useClientRequestContext(
        (state) => state.zSetIsOpenDialog
    );
    const zSetIsOpenDialog2 = useClientRequestContext(
        (state) => state.zSetIsOpenDialog2
    );
    const zSetCRId = useClientRequestContext(
        (state) => state.zSetCRId
    );
    const zSetCREmail = useClientRequestContext(
        (state) => state.zSetCREmail
    );
    return (
        <TableBody>
            {paginatedClientRequests && paginatedClientRequests.map((emp) => (
                <TableRow key={emp.Id}>
                    <TableCell>{emp.ProjectName}</TableCell>
                    <TableCell>{emp.Name}</TableCell>
                    <TableCell>{emp.Email}</TableCell>
                    {/* <TableCell>{emp.MobileNumber}</TableCell>
                    <TableCell>{emp.Message}</TableCell>
                    <TableCell>{formatDateToMMDDYYYYhhmmA(emp.DateTimeCreated)}</TableCell>
                    <TableCell>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${emp.HasReply ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                }`}
                        >
                            {emp.HasReply ? "Sent reply" : "Not yet"}
                        </span>
                    </TableCell> */}

                    <TableCell className="text-right space-x-2">
                        <Button
                            className="cursor-pointer border-blue-300 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                zSetCRId(emp.Id);
                                // zSetCREmail(emp.Email);
                                zSetIsOpenDialog2(true);
                            }}
                        >
                            View
                        </Button>
                        <Button className='cursor-pointer' variant="outline" size="sm" onClick={(e) => {
                            zSetCRId(emp.Id);
                            zSetCREmail(emp.Email)
                            zSetIsOpenDialog(true)
                        }}>
                            Reply
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

export default ClientRequestTblBody
